import React from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";

import { CARD_CHANGE } from "../utils/actions";
import { FramesConsumer } from "../Frames";
import { FramesFieldProps } from "../types/types";
import { DEFAULT_CARD_NUMBER_PLACEHOLDER } from "../utils/constants";

const CardNumber: React.FC<FramesFieldProps> = (props) => {
  return (
    <FramesConsumer>
      {({ state, dispatch }) => {
        if (state?.cardNumber === undefined) {
          throw "It looks like you are trying to render the CardNumber outside of the Frames Component.";
        }
        return (
          <View style={styles.wrapper}>
            <TextInput
              autoCompleteType="cc-number"
              keyboardType="number-pad"
              returnKeyType="done"
              placeholder={DEFAULT_CARD_NUMBER_PLACEHOLDER}
              {...props}
              value={state.cardNumber}
              style={[styles.cardNumber, props.style]}
              onChangeText={(val: string) => {
                dispatch({ type: CARD_CHANGE, payload: val });
              }}
            />
            <View style={styles.schemeIconContainer}>
              <Image style={styles.scheme} source={state.cardIcon} />
            </View>
          </View>
        );
      }}
    </FramesConsumer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#00000000",
  },
  cardNumber: {
    borderColor: "black",
    borderWidth: 1,
    minHeight: 30,
    paddingLeft: 15,
  },
  schemeIconContainer: {
    height: "100%",
    right: 10,
    width: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  scheme: {
    height: "50%",
    width: "100%",
    resizeMode: "contain",
    alignItems: "center",
  },
});

export default CardNumber;
