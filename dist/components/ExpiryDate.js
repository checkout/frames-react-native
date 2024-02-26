import React, { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { FramesConsumer } from "../Frames";
import { DEFAULT_CARD_EXPIRY_DATE_PLACEHOLDER } from "../utils/constants";
import { DATE_CHANGE } from "../utils/actions";
var ExpiryDate = forwardRef(function (props, ref) {
    return (<FramesConsumer>
            {function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        if ((state === null || state === void 0 ? void 0 : state.expiryDate) === undefined) {
            throw "It looks like you are trying to render the ExpiryDate outside of the Frames Component.";
        }
        return (<TextInput autoCompleteType="cc-exp" keyboardType="number-pad" maxLength={5} returnKeyType="done" placeholder={DEFAULT_CARD_EXPIRY_DATE_PLACEHOLDER} {...props} ref={ref} style={[styles.expiryDate, props.style]} value={state.expiryDate} onChangeText={function (val) {
            return dispatch({ type: DATE_CHANGE, payload: val });
        }}/>);
    }}
        </FramesConsumer>);
});
var styles = StyleSheet.create({
    expiryDate: {
        paddingLeft: 15,
        borderColor: "black",
        borderWidth: 1,
        justifyContent: "center",
        minHeight: 30,
    },
});
export default ExpiryDate;
//# sourceMappingURL=ExpiryDate.js.map