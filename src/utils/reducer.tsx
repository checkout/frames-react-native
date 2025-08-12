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
import { CARD_CHANGE, DATE_CHANGE, CVV_CHANGE, BIN_CHANGE } from "./actions";

export type FramesAction = { type: string; payload: any };

export const framesReducer: React.Reducer<FramesState, FramesAction> = (
  prevState,
  action
) => {
  switch (action.type) {
    case CARD_CHANGE:
      return {
        ...prevState,
        cardNumber: formatCard(action.payload),
        cardIcon: getIcon(getCardType(action.payload)),
        cardType: getCardType(action.payload),
        validation: {
          ...prevState.validation,
          cardNumber: isValidCard(formatCard(action.payload)),
          card:
            isValidCard(formatCard(action.payload)) &&
            prevState.validation.expiryDate &&
            prevState.validation.cvv,
        },
        cvvLength: cvvLength(action.payload),
      };

    case DATE_CHANGE:
      return {
        ...prevState,
        expiryDate: getFormattedDate(action.payload),
        validation: {
          ...prevState.validation,
          expiryDate: isValidDate(getFormattedDate(action.payload)),
          card:
            isValidDate(getFormattedDate(action.payload)) &&
            prevState.validation.cardNumber &&
            prevState.validation.cvv,
        },
      };
    case CVV_CHANGE:
      return {
        ...prevState,
        cvv: action.payload,
        validation: {
          ...prevState.validation,
          cvv: isValidCvv(action.payload, prevState.cardNumber || ""),
          card:
            isValidCvv(action.payload, prevState.cardNumber || "") &&
            prevState.validation.cardNumber &&
            prevState.validation.expiryDate,
        },
      };
    case BIN_CHANGE:
      return {
        ...prevState,
        cardBin: {
          ...prevState.cardBin,
          bin: action.payload + "",
          scheme: getCardType(action.payload),
        },
      };
    default:
      return prevState;
  }
};
