# Frames React Native

[![codecov](https://codecov.io/gh/checkout/frames-react-native/branch/main/graph/badge.svg?token=0UA86P7NKO)](https://codecov.io/gh/checkout/frames-react-native)
[![Test and Deploy](https://github.com/checkout/frames-react-native/actions/workflows/cd.yml/badge.svg)](https://github.com/checkout/frames-react-native/actions/workflows/cd.yml)

Start accepting online card payments in just a few minutes with Frames. It's quick and easy to integrate, accepts online card payments from all major credit cards, and is customizable to your brand.

<p align="center">
	<img src="https://i.ibb.co/zbjF2NQ/React-Native-Gif.gif" alt="Demo frames react native"/>
</p>

# :nerd_face: How does it work?

- Accepting card payments generally has 2 main stages. The first is collecting the _card details securely_ (client-side), and the second is _processing a payment_ via the API (server-side). Frames is addressing only the first stage. The server-side interaction can easily be achieved by using our various [server side SDKs](https://docs.checkout.com/integrate/sdks#SDKs-WebSDKlibraries).
- The Frames React Nave project provides customisable inputs for the card details with the core purpose of tokenising the sensitive information and giving back a secure token (alongside various card metadata, like the BIN information).

> Frames is meant to be used in conjunction with the rest of your checkout page elements as opposed to being an independent view. That way, you have full control of the UI, and you can implement other payment methods or collect other details (like billing details) alongside it.

<p align="center">
	<img src="https://s3.gifyu.com/images/FramesforAndroid.png" alt="Demo frames react native" width="500px"/>
</p>

# :rocket: Install

```bash
yarn add frames-react-native
```

# :computer: Import

```js
import {
  Frames,
  CardNumber,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "frames-react-native";
```

# :tada: Example

```js
import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
  Frames,
  CardNumber,
  ExpiryDate,
  Cvv,
  SubmitButton,
} from "frames-react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Frames
        config={{
          debug: true,
          publicKey: "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a",
        }}
        cardTokenized={(e) => {
          alert(e.token);
        }}
      >
        <CardNumber
          style={styles.cardNumber}
          placeholderTextColor="#9898A0"
          // showIcon={false} in case you don't want to see the card scheme logo
        />

        <View style={styles.dateAndCode}>
          <ExpiryDate
            style={styles.expiryDate}
            placeholderTextColor="#9898A0"
          />
          <Cvv style={styles.cvv} placeholderTextColor="#9898A0" />
        </View>

        <SubmitButton
          title="Pay Now"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() => console.log("merchant action")}
        />
      </Frames>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateAndCode: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardNumber: {
    fontSize: 18,
    height: 50,
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderColor: "#3A4452",
    borderRadius: 5,
    borderWidth: 0,
  },
  expiryDate: {
    fontSize: 18,
    height: 50,
    width: "48%",
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderWidth: 0,
  },
  cvv: {
    fontSize: 18,
    height: 50,
    width: "48%",
    color: "#FEFFFF",
    backgroundColor: "#1B1C1E",
    borderWidth: 0,
  },
  button: {
    height: 50,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    backgroundColor: "#4285F4",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
```

## Trigger tokenization

The tokenization is triggered when the SubmitButton is pressed. The process of getting the token is async, so the outcome of the tokenization will be shared in the _cardTokenized_ or _cardTokenizationFailed_ handlers.

## The `props` for the Frames wrapper component

| prop              | type    | description                                   |
| ----------------- | ------- | --------------------------------------------- |
| config.publicKey  | string  | The public key from your Checkout.com account |
| config.debug      | boolean | Trigger the debug mode ()                     |
| config.cardholder | object  | The cardholder name and billing details       |

## The `cardholder` information

| prop                                   | type   | description                      |
| -------------------------------------- | ------ | -------------------------------- |
| cardholder.name                        | string | The name of the cardholder       |
| cardholder.phone                       | string | The phone number of the customer |
| cardholder.billingAddress              | object | The cardholder billing address   |
| cardholder.billingAddress.addressLine1 | string | Address line 1                   |
| cardholder.billingAddress.addressLine2 | string | Address line 2                   |
| cardholder.billingAddress.zip          | string | Zip                              |
| cardholder.billingAddress.city         | string | City                             |
| cardholder.billingAddress.state        | string | State                            |
| cardholder.billingAddress.country      | string | Country                          |

## The `handlers`

| prop                   | type     | description                                                                                              |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| frameValidationChanged | function | Triggered when a field's validation status has changed. Use it to show error messages or update the UI.  |
| paymentMethodChanged   | function | Triggered when a valid payment method is detected based on the card number being entered.                |
| cardValidationChanged  | function | Triggered when the state of the card validation changes.                                                 |
| cardTokenized          | function | Triggered after a card is tokenized. Here you will get the card token alongside general card information |
| cardTokenizationFailed | function | Triggered after the card tokenization fails.                                                             |
| cardBinChanged         | function | Triggered when the user inputs or changes the first 8 digits of a card.                                  |
