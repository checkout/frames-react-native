import { EXPIRY_DATE_DELIMITER } from "../utils/constants";

export const getFormattedDate = (val: string) => {
  if (val.length === 1 && Number(val) === 0) {
    return val;
  } else if (val.length === 1 && Number(val) > 1) {
    return "0" + val + EXPIRY_DATE_DELIMITER;
  } else if (val.length > 1) {
    return addInnerSlash(val.replace(/\D/g, ""));
  } else {
    return val;
  }
};

export const addInnerSlash = (val: string) => {
  var chuncks: Array<string> = val.match(/.{1,2}/g) || [];
  return chuncks.join(EXPIRY_DATE_DELIMITER);
};
