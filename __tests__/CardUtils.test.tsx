import {
  formatCard,
  getCardType,
  getIcon,
  isValidCard,
  cvvLength,
  isValidCvv,
  isValidDate,
} from "../src/utils/card";

describe("card utils", () => {
  it("formats and validates card number", () => {
    expect(formatCard("4242424242424242")).toBe("4242 4242 4242 4242");
    expect(isValidCard("4242 4242 4242 4242")).toBe(true);
  });

  it("detects card type including extended whitelist (Discover)", () => {
    expect(getCardType("6011111111111117")).toBe("Discover");
  });

  it("cvvLength varies by type (Amex -> 4)", () => {
    // Amex test number
    const amex = "378282246310005";
    expect(cvvLength(amex)).toBe(4);
    expect(cvvLength("4242 4242 4242 4242")).toBe(3);
  });

  it("validates cvv by inferred type", () => {
    // Amex 4-digit CVC (It's an AMEX Test card number)
    expect(isValidCvv("1234", "345678901234564")).toBe(true);
    // Visa 3-digit CVC
    expect(isValidCvv("123", "4242 4242 4242 4242")).toBe(true);
  });

  it("getIcon returns undefined for unknown type", () => {
    // @ts-ignore
    expect(getIcon("UnknownBrand")).toBeUndefined();
  });

  it("isValidDate rejects incomplete or past dates", () => {
    expect(isValidDate("06/")).toBe(false);
  });
});
