var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { formatCard, getCardType, getIcon, isValidCard, cvvLength, isValidCvv, isValidDate, } from "./card";
import { getFormattedDate } from "./date";
import { CARD_CHANGE, DATE_CHANGE, CVV_CHANGE, BIN_CHANGE } from "./actions";
export var framesReducer = function (prevState, dispatchArg) {
    switch (dispatchArg.type) {
        case CARD_CHANGE:
            return __assign(__assign({}, prevState), { cardNumber: formatCard(dispatchArg.payload), cardIcon: getIcon(getCardType(dispatchArg.payload)), cardType: getCardType(dispatchArg.payload), validation: __assign(__assign({}, prevState.validation), { cardNumber: isValidCard(formatCard(dispatchArg.payload)), card: isValidCard(formatCard(dispatchArg.payload)) &&
                        prevState.validation.expiryDate &&
                        prevState.validation.cvv }), cvvLength: cvvLength(dispatchArg.payload) });
        case DATE_CHANGE:
            return __assign(__assign({}, prevState), { expiryDate: getFormattedDate(dispatchArg.payload), validation: __assign(__assign({}, prevState.validation), { expiryDate: isValidDate(getFormattedDate(dispatchArg.payload)), card: isValidDate(getFormattedDate(dispatchArg.payload)) &&
                        prevState.validation.cardNumber &&
                        prevState.validation.cvv }) });
        case CVV_CHANGE:
            return __assign(__assign({}, prevState), { cvv: dispatchArg.payload, validation: __assign(__assign({}, prevState.validation), { cvv: isValidCvv(dispatchArg.payload, prevState.cardNumber), card: isValidCvv(dispatchArg.payload, prevState.cardNumber) &&
                        prevState.validation.cardNumber &&
                        prevState.validation.expiryDate }) });
        case BIN_CHANGE:
            return __assign(__assign({}, prevState), { cardBin: __assign(__assign({}, prevState.cardBin), { bin: dispatchArg.payload + "", scheme: getCardType(dispatchArg.payload) }) });
        default:
            return prevState;
    }
};
//# sourceMappingURL=reducer.js.map