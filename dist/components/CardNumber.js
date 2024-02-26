import React, { forwardRef } from "react";
import { StyleSheet, View, TextInput, Image } from "react-native";
import { BIN_CHANGE, CARD_CHANGE } from "../utils/actions";
import { FramesConsumer } from "../Frames";
import { DEFAULT_CARD_NUMBER_PLACEHOLDER } from "../utils/constants";
var CardNumber = forwardRef(function (props, ref) {
    return (<FramesConsumer>
            {function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        if ((state === null || state === void 0 ? void 0 : state.cardNumber) === undefined) {
            throw "It looks like you are trying to render the CardNumber outside of the Frames Component.";
        }
        return (<View style={styles.wrapper}>
                        <TextInput autoCompleteType="cc-number" keyboardType="number-pad" returnKeyType="done" placeholder={DEFAULT_CARD_NUMBER_PLACEHOLDER} {...props} value={state.cardNumber} ref={ref} style={[styles.cardNumber, props.style]} onChangeText={function (val) {
            dispatch({ type: CARD_CHANGE, payload: val });
            if (val.replace(/[^0-9]/g, "").length >= 8 &&
                val
                    .replace(/[^0-9]/g, "")
                    .substring(0, 8) !== state.cardBin.bin) {
                dispatch({
                    type: BIN_CHANGE,
                    payload: val
                        .replace(/[^0-9]/g, "")
                        .substring(0, 8),
                });
            }
        }}/>
                        {props.showIcon === undefined || props.showIcon ? (<View style={styles.schemeIconContainer}>
                                {state.cardIcon ? (<Image style={styles.scheme} source={state.cardIcon}/>) : undefined}
                            </View>) : undefined}
                    </View>);
    }}
        </FramesConsumer>);
});
var styles = StyleSheet.create({
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
//# sourceMappingURL=CardNumber.js.map