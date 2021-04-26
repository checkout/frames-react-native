export const CARD_NUMBER_DELIMITER = " ";
export const EXPIRY_DATE_DELIMITER = "/";
export const DEFAULT_CARD_NUMBER_PLACEHOLDER = "•••• •••• •••• ••••";
export const DEFAULT_CARD_EXPIRY_DATE_PLACEHOLDER = "MM/YY";
export const DEFAULT_CVV_PLACEHOLDER = "•••";

export const SANDBOX_BASE_URL = "https://api.sandbox.checkout.com";
export const LIVE_BASE_URL = "https://api.checkout.com";
export const LIVE_LOGGER =
  "https://cloudevents.integration.checkout.com/logging";
export const SANDBOX_LOGGER =
  "https://cloudevents.integration.sandbox.checkout.com/logging";
export const MBC_LIVE_SECRET_KEY_REGEX = /^pk_?(\w{8})-(\w{4})-(\w{4})-(\w{4})-(\w{12})$/;
export const NAS_LIVE_SECRET_KEY_REGEX = /^pk_?(\w{27})$/;
