import React, { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { FramesConsumer } from "../Frames";
import { DEFAULT_CVV_PLACEHOLDER } from "../utils/constants";
import { CVV_CHANGE } from "../utils/actions";
var Cvv = forwardRef(function (props, ref) {
    return (<FramesConsumer>
            {function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        if ((state === null || state === void 0 ? void 0 : state.cvv) === undefined) {
            throw "It looks like you are trying to render the Cvv outside of the Frames Component.";
        }
        return (<TextInput autoCompleteType="cc-csc" keyboardType="number-pad" returnKeyType="done" secureTextEntry={true} placeholder={DEFAULT_CVV_PLACEHOLDER} ref={ref} {...props} style={[styles.cvv, props.style]} value={state.cvv} maxLength={state.cvvLength} onChangeText={function (val) {
            return dispatch({ type: CVV_CHANGE, payload: val });
        }}/>);
    }}
        </FramesConsumer>);
});
var styles = StyleSheet.create({
    cvv: {
        paddingLeft: 15,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: "center",
        minHeight: 30,
    },
});
export default Cvv;
//# sourceMappingURL=Cvv.js.map