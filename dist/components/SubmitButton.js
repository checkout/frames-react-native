var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { FramesConsumer } from "../Frames";
var SubmitButton = function (props) {
    return (<FramesConsumer>
      {function (_a) {
        var submitCard = _a.submitCard;
        if (!submitCard) {
            throw "It looks like you are trying to render the SubmitButton outside of the Frames Component.";
        }
        var textStyle = props.textStyle, title = props.title, touchableProps = __rest(props, ["textStyle", "title"]);
        return (<TouchableOpacity {...touchableProps} style={[styles.buttonContainer, touchableProps.style]} onPress={function (e) {
            submitCard();
            if (props.onPress)
                props.onPress(e);
        }}>
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          </TouchableOpacity>);
    }}
    </FramesConsumer>);
};
var styles = StyleSheet.create({
    buttonText: {
        textAlign: "center",
    },
    buttonContainer: {
        justifyContent: "center",
    },
});
export default SubmitButton;
//# sourceMappingURL=SubmitButton.js.map