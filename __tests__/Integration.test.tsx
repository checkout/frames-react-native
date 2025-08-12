import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import {
  Frames,
  CardNumber,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "../src/index";

// Mock network-dependent modules to avoid real HTTP requests
jest.mock("../src/utils/http", () => {
  const actual = jest.requireActual("../src/utils/http");
  return {
    ...actual,
    tokenize: jest.fn(),
  };
});

jest.mock("../src/utils/logger", () => {
  const actual = jest.requireActual("../src/utils/logger");
  return {
    ...actual,
    log: jest.fn(),
  };
});

describe("Frames integration", () => {
  const validVisa = "4242 4242 4242 4242"; // Visa test number
  const validExpiry = "12/30"; // future year
  const validCvv = "123";

  const config = {
    publicKey: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
    debug: true,
    cardholder: {
      name: "John Doe",
      phone: "+1234567890",
      billingAddress: {
        addressLine1: "123 Test St",
        city: "Test City",
        state: "TS",
        zip: "12345",
        country: "US",
      },
    },
  };

  it("emits validation and bin events, and tokenizes on submit", async () => {
    const { tokenize } = require("../src/utils/http");

    const mockTokenResponse = {
      type: "card",
      token: "tok_test_123",
      expires_on: "2030-12-31T23:59:59Z",
      expiry_month: "12",
      expiry_year: "2030",
      scheme: "Visa",
      last4: "4242",
      bin: "424242",
    };

    tokenize.mockResolvedValueOnce(mockTokenResponse);

    const frameValidationChanged = jest.fn();
    const paymentMethodChanged = jest.fn();
    const cardValidationChanged = jest.fn();
    const cardTokenized = jest.fn();
    const cardTokenizationFailed = jest.fn();
    const cardBinChanged = jest.fn();

    const screen = render(
      <Frames
        config={config}
        frameValidationChanged={frameValidationChanged}
        paymentMethodChanged={paymentMethodChanged}
        cardValidationChanged={cardValidationChanged}
        cardTokenized={cardTokenized}
        cardTokenizationFailed={cardTokenizationFailed}
        cardBinChanged={cardBinChanged}
      >
        <CardNumber />
        <ExpiryDate />
        <Cvv />
        <SubmitButton title="Pay" />
      </Frames>
    );

    const cardNumberInput = screen.getByPlaceholderText("•••• •••• •••• ••••");
    const expiryInput = screen.getByPlaceholderText("MM/YY");
    const cvvInput = screen.getByPlaceholderText("•••");

    // Enter card number -> should emit bin and payment method changes
    fireEvent.changeText(cardNumberInput, validVisa);

    await waitFor(() => expect(paymentMethodChanged).toHaveBeenCalled());
    expect(paymentMethodChanged).toHaveBeenCalledWith(
      expect.objectContaining({ paymentMethod: "Visa", isValid: false })
    );

    await waitFor(() => expect(cardBinChanged).toHaveBeenCalled());
    expect(cardBinChanged).toHaveBeenCalledWith(
      expect.objectContaining({
        bin: expect.stringMatching(/^42424242/),
        scheme: "Visa",
      })
    );

    // Enter expiry date
    fireEvent.changeText(expiryInput, validExpiry);

    // Enter cvv
    fireEvent.changeText(cvvInput, validCvv);

    // After all fields valid, cardValidationChanged should report isValid: true
    await waitFor(() => expect(cardValidationChanged).toHaveBeenCalled());
    expect(cardValidationChanged).toHaveBeenLastCalledWith(
      expect.objectContaining({
        isValid: true,
        isElementValid: expect.objectContaining({
          cardNumber: true,
          expiryDate: true,
          cvv: true,
        }),
      })
    );

    // Submit and expect tokenization to be called and success event emitted
    const payButton = screen.getByText("Pay");
    fireEvent.press(payButton);

    await waitFor(() => expect(tokenize).toHaveBeenCalledTimes(1));
    expect(cardTokenized).toHaveBeenCalledWith(mockTokenResponse);
    expect(cardTokenizationFailed).not.toHaveBeenCalled();
  });
});
