import { ImageSourcePropType } from "react-native";
const Card = require("creditcards/card");
const Cvc = require("creditcards/cvc");
const expiration = require("creditcards/expiration");
import { EXPIRY_DATE_DELIMITER } from "./constants";
const acceptedTypes = [
  require("creditcards-types/types/visa"),
  require("creditcards-types/types/mastercard"),
  require("creditcards-types/types/american-express"),
  require("creditcards-types/types/discover"),
  require("creditcards-types/types/jcb"),
  require("creditcards-types/types/diners-club"),
  require("creditcards-types/types/maestro"),
];
const cards = new Card(acceptedTypes);
const cvc = new Cvc(acceptedTypes);

export const Icons = {
  Visa: require("../icons/visa.png"),
  Mastercard: require("../icons/mastercard.png"),
  "American Express": require("../icons/amex.png"),
  Discover: require("../icons/discover.png"),
  JCB: require("../icons/jcb.png"),
  "Diners Club": require("../icons/dinersclub.png"),
  Maestro: require("../icons/maestro.png"),
};

export const formatCard = (text: string): string => {
  return cards.format(cards.parse(text));
};

export const getCardType = (text: string) => {
  const sanitizedValue = cards.parse(text);
  const cardType: IconKey = cards.type(sanitizedValue, true);
  return cardType;
};

export const isValidCard = (text: string) => {
  return cards.isValid(cards.parse(text));
};

export const cvvLength = (text: string) => {
  const type = getCardType(cards.parse(text));
  if (!type) return 3;

  return type === "American Express" ? 4 : 3;
};

export const isValidCvv = (text: string, type: string) => {
  return cvc.isValid(text, getCardType(cards.parse(type)));
};

export const isValidDate = (text: string) => {
  const [expiry_month, expiry_year] = text.split(EXPIRY_DATE_DELIMITER);

  if (!expiry_month || !expiry_year) return false;

  return !expiration.isPast(
    expiry_month,
    expiration.year.parse(expiry_year, true)
  );
};

export const getIcon = (cardType: IconKey): ImageSourcePropType | undefined => {
  return Icons[cardType] || undefined;
};

export type IconKey = keyof typeof Icons;
