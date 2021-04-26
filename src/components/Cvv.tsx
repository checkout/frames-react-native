import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { FramesConsumer } from "../Frames";
import { DEFAULT_CVV_PLACEHOLDER } from "../utils/constants";
import { CVV_CHANGE } from "../utils/actions";
import { FramesFieldProps } from "../types/types";

const Cvv: React.SFC<FramesFieldProps> = (props) => {
  return (
    <FramesConsumer>
      {({ state, dispatch }) => {
        if (state?.cvv === undefined) {
          throw "It looks like you are trying to render the Cvv outside of the Frames Component.";
        }
        return (
          <TextInput
            autoCompleteType="cc-csc"
            keyboardType="number-pad"
            returnKeyType="done"
            secureTextEntry={true}
            placeholder={DEFAULT_CVV_PLACEHOLDER}
            {...props}
            style={[styles.cvv, props.style]}
            value={state.cvv}
            maxLength={state.cvvLength}
            onChangeText={(val: string) =>
              dispatch({ type: CVV_CHANGE, payload: val })
            }
          />
        );
      }}
    </FramesConsumer>
  );
};

const styles = StyleSheet.create({
  cvv: {
    paddingLeft: 15,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 30,
  },
});

export default Cvv;
