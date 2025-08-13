import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import {
  Frames,
  CardNumber,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "../src/index";

import { SANDBOX_LOGGER, LIVE_LOGGER } from "../src/utils/constants";

describe("http.tokenize and helpers", () => {
  const { tokenize, formatDataForTokenization, getEnvironment } =
    jest.requireActual("../src/utils/http");

  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn();
  });

  it("tokenize returns json when response ok", async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ ok: true }),
    });

    const res = await tokenize({
      key: "pk_sbox_dummy",
      body: {
        type: "card",
        number: "4242424242424242",
        expiry_month: "12",
        expiry_year: "2030",
        cvv: "123",
      },
    });

    expect(res).toEqual({ ok: true });
  });

  it("tokenize throws json when response not ok", async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: "bad" }),
    });

    await expect(
      tokenize({
        key: "pk_sbox_dummy",
        body: {
          type: "card",
          number: "4242424242424242",
          expiry_month: "12",
          expiry_year: "2030",
          cvv: "123",
        },
      })
    ).rejects.toEqual({ error: "bad" });
  });

  it("formatDataForTokenization maps fields and billing address including addressLine2", () => {
    const { EXPIRY_DATE_DELIMITER } = require("../src/utils/constants");
    const state = {
      cardNumber: "4242 4242 4242 4242",
      cardBin: { bin: null, scheme: null },
      cardIcon: undefined,
      cardType: null,
      expiryDate: `12${EXPIRY_DATE_DELIMITER}30`,
      cvv: "123",
      cvvLength: 3,
      validation: { cardNumber: true, expiryDate: true, cvv: true, card: true },
    };

    const config = {
      publicKey: "pk_sbox_dummy",
      cardholder: {
        name: "John Doe",
        phone: "+1234567890",
        billingAddress: {
          addressLine1: "Line 1",
          addressLine2: "Line 2",
          city: "City",
          state: "ST",
          zip: "12345",
          country: "US",
        },
      },
    };

    const params = formatDataForTokenization(state, config);
    expect(params.key).toBe(config.publicKey);
    expect(params.body.number).toBe("4242424242424242");
    expect(params.body.expiry_month).toBe("12");
    expect(params.body.expiry_year).toMatch(/^20\d{2}$/);
    expect(params.body.cvv).toBe("123");
    expect(params.body.name).toBe("John Doe");
    expect(params.body.billing_address).toEqual({
      address_line1: "Line 1",
      address_line2: "Line 2",
      city: "City",
      state: "ST",
      zip: "12345",
      country: "US",
    });
    expect(params.body.phone).toEqual({ number: "+1234567890" });
  });

  it("formatDataForTokenization sets billing_address to null when not provided", () => {
    const state = {
      cardNumber: "4242 4242 4242 4242",
      cardBin: { bin: null, scheme: null },
      cardIcon: undefined,
      cardType: null,
      expiryDate: "12/30",
      cvv: "123",
      cvvLength: 3,
      validation: { cardNumber: true, expiryDate: true, cvv: true, card: true },
    };

    const config = {
      publicKey: "pk_sbox_dummy",
      cardholder: { name: "John Doe" },
    };

    const params = formatDataForTokenization(state, config);
    // @ts-ignore
    expect(params.body.billing_address).toBeNull();
  });

  it("getEnvironment returns expected token URL", () => {
    expect(getEnvironment("pk_sbox_dummy")).toBe(
      "https://api.sandbox.checkout.com/tokens"
    );
  });
});

describe("logger.log", () => {
  const { log, getEnvironment } = require("../src/utils/logger");

  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({});
  });

  it("posts to sandbox logger with structured body", async () => {
    await log("info", "type_event", { publicKey: "pk_sbox_dummy" }, { a: 1 });

    expect(global.fetch).toHaveBeenCalledWith(
      SANDBOX_LOGGER,
      expect.anything()
    );
    const [, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body.specversion).toBe("1.0");
    expect(body.type).toBe("type_event");
    expect(body.data.environment).toBe("sandbox");
    expect(body.cko.loglevel).toBe("info");
  });

  it("getEnvironment returns live logger for prod keys", () => {
    expect(getEnvironment("pk_4296fd52-efba-4a38-b6ce-cf0d93639d8a")).toBe(
      LIVE_LOGGER
    );
  });
});

describe("Frames error path on tokenization failure", () => {
  it("emits cardTokenizationFailed when tokenization rejects", async () => {
    const httpMod = require("../src/utils/http");
    jest.spyOn(httpMod, "tokenize").mockRejectedValueOnce({ error: "failure" });

    const { Frames } = require("../src/index");

    const cardTokenizationFailed = jest.fn();

    const screen = render(
      <Frames
        config={{ publicKey: "pk_sbox_dummy", debug: true }}
        cardTokenizationFailed={cardTokenizationFailed}
      >
        <CardNumber />
        <ExpiryDate />
        <Cvv />
        <SubmitButton title="Pay" />
      </Frames>
    );

    fireEvent.changeText(
      screen.getByPlaceholderText("•••• •••• •••• ••••"),
      "4242 4242 4242 4242"
    );
    fireEvent.changeText(screen.getByPlaceholderText("MM/YY"), "12/30");
    fireEvent.changeText(screen.getByPlaceholderText("•••"), "123");

    fireEvent.press(screen.getByText("Pay"));

    await waitFor(() => expect(cardTokenizationFailed).toHaveBeenCalled());
    expect(cardTokenizationFailed).toHaveBeenCalledWith({ error: "failure" });
  });
});
