var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Card = require("creditcards/card");
var Cvc = require("creditcards/cvc");
var expiration = require("creditcards/expiration");
import { EXPIRY_DATE_DELIMITER } from "./constants";
import creditcardsTypes from "creditcards-types";
import mada from "creditcards-types/types/mada";
var types = __spreadArrays([mada], creditcardsTypes);
var cards = new Card(types);
var cvc = new Cvc(types);
var extendedCardTypeMapWhitelist = { 6011111111111117: "Discover" };
export var Icons = {
    Visa: require("../icons/visa.png"),
    Mastercard: require("../icons/mastercard.png"),
    "American Express": require("../icons/amex.png"),
    Discover: require("../icons/discover.png"),
    JCB: require("../icons/jcb.png"),
    "Diners Club": require("../icons/dinersclub.png"),
    Maestro: require("../icons/maestro.png"),
    Mada: require("../icons/mada.png"),
};
export var formatCard = function (text) {
    return cards.format(cards.parse(text));
};
export var getCardType = function (text) {
    var sanitizedValue = cards.parse(text);
    var cardType = extendedCardTypeMapWhitelist[sanitizedValue] ||
        cards.type(sanitizedValue, true);
    return cardType;
};
export var isValidCard = function (text) {
    return cards.isValid(cards.parse(text));
};
export var cvvLength = function (text) {
    var type = getCardType(cards.parse(text));
    if (!type)
        return 3;
    return type === "American Express" ? 4 : 3;
};
export var isValidCvv = function (text, type) {
    return cvc.isValid(text, getCardType(cards.parse(type)));
};
export var isValidDate = function (text) {
    var _a = text.split(EXPIRY_DATE_DELIMITER), expiry_month = _a[0], expiry_year = _a[1];
    if (!expiry_month || !expiry_year)
        return false;
    return !expiration.isPast(expiry_month, expiration.year.parse(expiry_year, true));
};
export var getIcon = function (cardType) {
    return Icons[cardType] || undefined;
};
//# sourceMappingURL=card.js.map