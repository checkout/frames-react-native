import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { FramesConsumer } from "../Frames";
import { DEFAULT_CARD_EXPIRY_DATE_PLACEHOLDER } from "../utils/constants";
import { DATE_CHANGE } from "../utils/actions";
import { FramesFieldProps } from "../types/types";

const ExpiryDate: React.SFC<FramesFieldProps> = (props) => {
  return (
    <FramesConsumer>
      {({ state, dispatch }) => {
        if (state?.expiryDate === undefined) {
          throw "It looks like you are trying to render the ExpiryDate outside of the Frames Component.";
        }
        return (
          <TextInput
            autoCompleteType="cc-exp"
            keyboardType="number-pad"
            maxLength={5}
            returnKeyType="done"
            placeholder={DEFAULT_CARD_EXPIRY_DATE_PLACEHOLDER}
            {...props}
            style={[styles.expiryDate, props.style]}
            value={state.expiryDate}
            onChangeText={(val: string) =>
              dispatch({ type: DATE_CHANGE, payload: val })
            }
          />
        );
      }}
    </FramesConsumer>
  );
};

const styles = StyleSheet.create({
  expiryDate: {
    paddingLeft: 15,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 30,
  },
});

export default ExpiryDate;
