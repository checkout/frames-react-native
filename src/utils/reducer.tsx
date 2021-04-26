import {
  formatCard,
  getCardType,
  getIcon,
  isValidCard,
  cvvLength,
  isValidCvv,
  isValidDate,
} from "./card";
import { getFormattedDate } from "./date";
import { FramesState } from "../types/types";
import { CARD_CHANGE, DATE_CHANGE, CVV_CHANGE } from "./actions";

export const framesReducer = (prevState: FramesState, dispatchArg?: any) => {
  switch (dispatchArg.type) {
    case CARD_CHANGE:
      return {
        ...prevState,
        cardNumber: formatCard(dispatchArg.payload),
        cardIcon: getIcon(getCardType(dispatchArg.payload)),
        cardType: getCardType(dispatchArg.payload),
        validation: {
          ...prevState.validation,
          cardNumber: isValidCard(formatCard(dispatchArg.payload)),
          card:
            isValidCard(formatCard(dispatchArg.payload)) &&
            prevState.validation.expiryDate &&
            prevState.validation.cvv,
        },
        cvvLength: cvvLength(dispatchArg.payload),
      };

    case DATE_CHANGE:
      return {
        ...prevState,
        expiryDate: getFormattedDate(dispatchArg.payload),
        validation: {
          ...prevState.validation,
          expiryDate: isValidDate(getFormattedDate(dispatchArg.payload)),
          card:
            isValidDate(getFormattedDate(dispatchArg.payload)) &&
            prevState.validation.cardNumber &&
            prevState.validation.cvv,
        },
      };
    case CVV_CHANGE:
      return {
        ...prevState,
        cvv: dispatchArg.payload,
        validation: {
          ...prevState.validation,
          cvv: isValidCvv(dispatchArg.payload, prevState.cardNumber),
          card:
            isValidCvv(dispatchArg.payload, prevState.cardNumber) &&
            prevState.validation.cardNumber &&
            prevState.validation.expiryDate,
        },
      };
    default:
      return prevState;
  }
};
