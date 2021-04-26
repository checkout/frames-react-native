import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import {
  CardNumber,
  Frames,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "../src/index";

const PK = "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a";

describe("CardNumber", () => {
  it("triggers the card tokenization", async () => {
    const tokenized = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Frames
        config={{
          publicKey: PK,
          debug: true,
        }}
        cardTokenized={tokenized}
      >
        <CardNumber placeholder="card-number" />
        <ExpiryDate placeholder="expiry-date" />
        <Cvv placeholder="cvv" />
        <SubmitButton title="Pay Now" onPress={() => {}} />
      </Frames>
    );

    let cardNumber = getByPlaceholderText("card-number");
    let expiryDate = getByPlaceholderText("expiry-date");
    let cvv = getByPlaceholderText("cvv");
    let pay = getByText("Pay Now");
    fireEvent.changeText(cardNumber, "4242424242424242");
    fireEvent.changeText(expiryDate, "1128");
    fireEvent.changeText(cvv, "100");
    fireEvent.press(pay);
    await waitFor(() => {
      expect(tokenized).toHaveBeenCalledTimes(1);
    });
    expect(tokenized.mock.calls[0][0].last4).toEqual("4242");
  });

  it("fails the card tokenization when the card number is invalid", async () => {
    const failed = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Frames
        config={{
          publicKey: PK,
        }}
        cardTokenized={() => {}}
        cardTokenizationFailed={failed}
      >
        <CardNumber placeholder="card-number" />
        <ExpiryDate placeholder="expiry-date" />
        <Cvv placeholder="cvv" />
        <SubmitButton title="Pay Now" onPress={() => {}} />
      </Frames>
    );

    let cardNumber = getByPlaceholderText("card-number");
    let expiryDate = getByPlaceholderText("expiry-date");
    let cvv = getByPlaceholderText("cvv");
    let pay = getByText("Pay Now");
    fireEvent.changeText(cardNumber, "12345");
    fireEvent.changeText(expiryDate, "1128");
    fireEvent.changeText(cvv, "100");
    fireEvent.press(pay);
    await waitFor(() => {
      expect(failed).toHaveBeenCalledTimes(1);
    });
  });

  it("throws when the pay button is outside of context", async () => {
    expect(() => {
      render(<SubmitButton title="Pay Now" onPress={() => {}} />);
    }).toThrow(
      "It looks like you are trying to render the SubmitButton outside of the Frames Component."
    );
  });

  it("throws allow then use of the onPress handler", async () => {
    const press = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Frames
        config={{
          publicKey: PK,
          debug: true,
          cardholder: {
            name: "John Smith",
            billingAddress: {
              addressLine1: "Wall Street",
              addressLine2: "Dollar Avenue",
              city: "London",
              state: "London",
              zip: "W1W 8GY",
              country: "GB",
            },
            phone: "07123456789",
          },
        }}
        cardTokenized={() => {}}
      >
        <CardNumber placeholder="card-number" />
        <ExpiryDate placeholder="expiry-date" />
        <Cvv placeholder="cvv" />
        <SubmitButton title="Pay Now" onPress={press} />
      </Frames>
    );
    let cardNumber = getByPlaceholderText("card-number");
    let expiryDate = getByPlaceholderText("expiry-date");
    let cvv = getByPlaceholderText("cvv");
    let pay = getByText("Pay Now");
    fireEvent.changeText(cardNumber, "4242424242424242");
    fireEvent.changeText(expiryDate, "1128");
    fireEvent.changeText(cvv, "100");
    fireEvent.press(pay);

    fireEvent.press(pay);
    expect(press).toHaveBeenCalled();
  });

  it("fails tokenization", async () => {
    const failed = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Frames
        config={{
          publicKey: "pk_test_baabd05f-1cdb-43d9-851e-635a79f6e7ad", // this account does not have Visa enabled
          debug: true,
        }}
        cardTokenized={() => {}}
        frameValidationChanged={(e) => {}}
        paymentMethodChanged={(e) => {}}
        cardValidationChanged={(e) => {}}
        cardTokenizationFailed={failed}
      >
        <CardNumber placeholder="card-number" />
        <ExpiryDate placeholder="expiry-date" />
        <Cvv placeholder="cvv" />
        <SubmitButton title="Pay Now" onPress={() => {}} />
      </Frames>
    );

    let cardNumber = getByPlaceholderText("card-number");
    let expiryDate = getByPlaceholderText("expiry-date");
    let cvv = getByPlaceholderText("cvv");
    let pay = getByText("Pay Now");
    fireEvent.changeText(cardNumber, "4242424242424242");
    fireEvent.changeText(expiryDate, "0628");
    fireEvent.changeText(cvv, "100");
    fireEvent.press(pay);
    await waitFor(() => {
      expect(failed).toHaveBeenCalledTimes(1);
    });
  });

  it("triggers the card tokenization with billing details", async () => {
    const tokenized = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Frames
        config={{
          publicKey: PK,
          debug: true,
          cardholder: {
            name: "John Smith",
            billingAddress: {
              addressLine1: "Wall Street",
              addressLine2: "Dollar Avenue",
              city: "London",
              state: "London",
              zip: "W1W 8GY",
              country: "GB",
            },
            phone: "07123456789",
          },
        }}
        cardTokenized={tokenized}
      >
        <CardNumber placeholder="card-number" />
        <ExpiryDate placeholder="expiry-date" />
        <Cvv placeholder="cvv" />
        <SubmitButton title="Pay Now" onPress={() => {}} />
      </Frames>
    );

    let cardNumber = getByPlaceholderText("card-number");
    let expiryDate = getByPlaceholderText("expiry-date");
    let cvv = getByPlaceholderText("cvv");
    let pay = getByText("Pay Now");
    fireEvent.changeText(cardNumber, "4242424242424242");
    fireEvent.changeText(expiryDate, "1128");
    fireEvent.changeText(cvv, "100");
    fireEvent.press(pay);
    await waitFor(() => {
      expect(tokenized).toHaveBeenCalledTimes(1);
    });
    expect(tokenized.mock.calls[0][0].billing_address.address_line1).toEqual(
      "Wall Street"
    );
  });

  it("triggers the card tokenization with amex", async () => {
    const tokenized = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Frames
        config={{
          publicKey: PK,
        }}
        cardTokenized={tokenized}
      >
        <CardNumber placeholder="card-number" />
        <ExpiryDate placeholder="expiry-date" />
        <Cvv placeholder="cvv" />
        <SubmitButton title="Pay Now" onPress={() => {}} />
      </Frames>
    );

    let cardNumber = getByPlaceholderText("card-number");
    let expiryDate = getByPlaceholderText("expiry-date");
    let cvv = getByPlaceholderText("cvv");
    let pay = getByText("Pay Now");
    fireEvent.changeText(cardNumber, "378282246310005");
    fireEvent.changeText(expiryDate, "1128");
    fireEvent.changeText(cvv, "1000");
    fireEvent.press(pay);
    await waitFor(() => {
      expect(tokenized).toHaveBeenCalledTimes(1);
    });
  });

  it("triggers the card tokenization with minimal billing details", async () => {
    const tokenized = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Frames
        config={{
          publicKey: PK,
          debug: true,
          cardholder: {
            name: "John Smith",
            billingAddress: {
              addressLine1: "Wall Street",
              addressLine2: "Dollar Avenue",
            },
          },
        }}
        cardTokenized={tokenized}
        cardTokenizationFailed={(e) => {
          console.log(e);
        }}
      >
        <CardNumber placeholder="card-number" />
        <ExpiryDate placeholder="expiry-date" />
        <Cvv placeholder="cvv" />
        <SubmitButton title="Pay Now" onPress={() => {}} />
      </Frames>
    );

    let cardNumber = getByPlaceholderText("card-number");
    let expiryDate = getByPlaceholderText("expiry-date");
    let cvv = getByPlaceholderText("cvv");
    let pay = getByText("Pay Now");
    fireEvent.changeText(cardNumber, "4242424242424242");
    fireEvent.changeText(expiryDate, "1128");
    fireEvent.changeText(cvv, "100");
    fireEvent.press(pay);
    await waitFor(() => {
      expect(tokenized).toHaveBeenCalledTimes(1);
    });
    expect(tokenized.mock.calls[0][0].billing_address.address_line1).toEqual(
      "Wall Street"
    );
  });

  it("triggers throws if you render the card number outside of context", async () => {
    let exception;
    try {
      render(<CardNumber placeholder="card-number" />);
    } catch (e) {
      exception = e;
    }
    expect(exception).toEqual(
      "It looks like you are trying to render the CardNumber outside of the Frames Component."
    );
  });

  it("triggers throws if you render the expiry date outside of context", async () => {
    let exception;
    try {
      render(<ExpiryDate placeholder="expiry-date" />);
    } catch (e) {
      exception = e;
    }
    expect(exception).toEqual(
      "It looks like you are trying to render the ExpiryDate outside of the Frames Component."
    );
  });

  it("triggers throws if you render the cvv outside of context", async () => {
    let exception;
    try {
      render(<Cvv placeholder="cvv" />);
    } catch (e) {
      exception = e;
    }
    expect(exception).toEqual(
      "It looks like you are trying to render the Cvv outside of the Frames Component."
    );
  });

  it("triggers throws if you render the submit button outside of context", async () => {
    let exception;
    try {
      render(<SubmitButton title="Pay Now" onPress={() => {}} />);
    } catch (e) {
      exception = e;
    }
    expect(exception).toEqual(
      "It looks like you are trying to render the SubmitButton outside of the Frames Component."
    );
  });
});
