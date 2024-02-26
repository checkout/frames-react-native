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
import fetch from "node-fetch";
import { EXPIRY_DATE_DELIMITER, MBC_LIVE_PUBLIC_KEY_REGEX, NAS_LIVE_PUBLIC_KEY_REGEX, SANDBOX_BASE_URL, LIVE_BASE_URL, } from "../utils/constants";
export var tokenize = function (e) { return __awaiter(void 0, void 0, void 0, function () {
    var pjson, response, json, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                pjson = require("../../package.json");
                return [4 /*yield*/, fetch(getEnvironment(e.key), {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "User-Agent": "frames-react-native/" + pjson.version,
                            Authorization: e.key,
                        },
                        body: JSON.stringify(e.body),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                if (response.ok) {
                    return [2 /*return*/, json];
                }
                else {
                    throw json;
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
export var formatDataForTokenization = function (state, config) {
    var _a, _b, _c, _d, _e, _f, _g;
    var number = state.cardNumber.replace(/[^A-Z0-9]+/gi, "");
    var expiry_month = state.expiryDate.split(EXPIRY_DATE_DELIMITER)[0];
    var expiry_year = "" + new Date().getFullYear().toString().substring(0, 2) + state.expiryDate.split(EXPIRY_DATE_DELIMITER)[1];
    var billing_address = {
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip: "",
        country: undefined,
    };
    if ((_b = (_a = config.cardholder) === null || _a === void 0 ? void 0 : _a.billingAddress) === null || _b === void 0 ? void 0 : _b.addressLine1) {
        billing_address.address_line1 =
            config.cardholder.billingAddress.addressLine1;
    }
    if ((_d = (_c = config.cardholder) === null || _c === void 0 ? void 0 : _c.billingAddress) === null || _d === void 0 ? void 0 : _d.addressLine2) {
        billing_address.address_line2 =
            config.cardholder.billingAddress.addressLine2;
    }
    if ((_e = config.cardholder) === null || _e === void 0 ? void 0 : _e.billingAddress) {
        billing_address.city = config.cardholder.billingAddress.city || "";
        billing_address.state = config.cardholder.billingAddress.state || "";
        billing_address.zip = config.cardholder.billingAddress.zip || "";
        billing_address.country = config.cardholder.billingAddress.country;
    }
    else {
        // @ts-ignore
        billing_address = null;
    }
    return {
        key: config.publicKey,
        body: {
            type: "card",
            number: number,
            expiry_month: expiry_month,
            expiry_year: expiry_year,
            cvv: state.cvv,
            name: (_f = config.cardholder) === null || _f === void 0 ? void 0 : _f.name,
            billing_address: billing_address,
            phone: {
                number: (_g = config.cardholder) === null || _g === void 0 ? void 0 : _g.phone,
            },
        },
    };
};
export var getEnvironment = function (key) {
    return MBC_LIVE_PUBLIC_KEY_REGEX.test(key) || NAS_LIVE_PUBLIC_KEY_REGEX.test(key)
        ? LIVE_BASE_URL + "/tokens"
        : SANDBOX_BASE_URL + "/tokens";
};
//# sourceMappingURL=http.js.map