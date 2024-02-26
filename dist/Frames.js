var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { framesReducer } from "./utils/reducer";
import { log } from "./utils/logger";
import { tokenize, formatDataForTokenization } from "./utils/http";
export var FramesContext = React.createContext({});
var Frames = function (props) {
    // @ts-ignore
    var _a = React.useReducer(framesReducer, {
        cardNumber: null,
        cardBin: {
            bin: null,
            scheme: null,
        },
        cardType: null,
        cardIcon: undefined,
        expiryDate: null,
        cvv: null,
        cvvLength: 3,
        validation: {
            cardNumber: false,
            expiryDate: false,
            cvv: false,
            card: false,
        },
    }), state = _a[0], dispatch = _a[1];
    var submitCard = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    log("info", "com.checkout.frames-mobile-sdk.token_requested", props.config);
                    return [4 /*yield*/, tokenize(formatDataForTokenization(state, props.config))];
                case 1:
                    response = _a.sent();
                    if (props.config.debug)
                        console.info("Emitting \"cardTokenized\"", response);
                    if (props.cardTokenized)
                        props.cardTokenized(response);
                    log("info", "com.checkout.frames-mobile-sdk.token_response", props.config);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (props.config.debug)
                        console.info("Emitting \"cardTokenizationFailed\"", error_1);
                    if (props.cardTokenizationFailed)
                        props.cardTokenizationFailed(error_1);
                    log("error", "com.checkout.frames-mobile-sdk.exception", props.config, error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        if (state.cardBin.bin !== null) {
            if (props.config.debug)
                console.info("Emitting \"cardBinChanged\"", state.cardBin);
            if (props.cardBinChanged)
                props.cardBinChanged(state.cardBin);
        }
    }, [state.cardBin]);
    useEffect(function () {
        if (state.cardNumber !== null) {
            var payload = {
                element: "card-number",
                isValid: state.validation.cardNumber,
                isEmpty: state.cardNumber.length === 0,
            };
            if (props.config.debug)
                console.info("Emitting \"frameValidationChanged\"", payload);
            if (props.frameValidationChanged)
                props.frameValidationChanged(payload);
        }
    }, [state.validation.cardNumber]);
    useEffect(function () {
        if (state.expiryDate !== null) {
            var payload = {
                element: "expiry-date",
                isValid: state.validation.expiryDate,
                isEmpty: state.expiryDate.length === 0,
            };
            if (props.config.debug)
                console.info("Emitting \"frameValidationChanged\"", payload);
            if (props.frameValidationChanged)
                props.frameValidationChanged(payload);
        }
    }, [state.validation.expiryDate]);
    useEffect(function () {
        if (state.cvv !== null) {
            var payload = {
                element: "cvv",
                isValid: state.validation.cvv,
                isEmpty: state.cvv.length === 0,
            };
            if (props.config.debug)
                console.info("Emitting \"frameValidationChanged\"", payload);
            if (props.frameValidationChanged)
                props.frameValidationChanged(payload);
        }
    }, [state.validation.cvv]);
    useEffect(function () {
        if (state.cardType !== null) {
            var payload = {
                isValid: state.validation.cardNumber &&
                    state.validation.expiryDate &&
                    state.validation.cvv,
                paymentMethod: state.cardType,
            };
            if (props.config.debug)
                console.info("Emitting \"paymentMethodChanged\"", payload);
            if (props.paymentMethodChanged)
                props.paymentMethodChanged(payload);
        }
    }, [state.cardType]);
    useEffect(function () {
        if (state.cardNumber) {
            var payload = {
                isValid: state.validation.card,
                isElementValid: {
                    cardNumber: state.validation.cardNumber,
                    expiryDate: state.validation.expiryDate,
                    cvv: state.validation.cvv,
                },
            };
            if (props.config.debug)
                console.info("Emitting \"cardValidationChanged\"", payload);
            if (props.cardValidationChanged)
                props.cardValidationChanged(payload);
        }
    }, [state.validation.card]);
    return (<View style={[styles.container, props.style]}>
      <FramesContext.Provider value={{ state: state, dispatch: dispatch, submitCard: submitCard }}>
        {props.children}
      </FramesContext.Provider>
    </View>);
};
export default Frames;
export var FramesConsumer = FramesContext.Consumer;
export var FramesProvider = FramesContext.Provider;
var styles = StyleSheet.create({
    container: {
        width: "100%",
    },
});
//# sourceMappingURL=Frames.js.map