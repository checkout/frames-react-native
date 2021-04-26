import { isValidDate } from "../src/utils/card";
import { getFormattedDate } from "../src/utils/date";
import { getEnvironment } from "../src/utils/http";
import { getEnvironment as loggerGetEnvironment } from "../src/utils/logger";

const PK_SB = "pk_test_4296fd52-efba-4a38-b6ce-cf0d93639d8a";
const PK_PROD = "pk_4296fd52-efba-4a38-b6ce-cf0d93639d8a"; // fake key

describe("Date", () => {
  it("formats date", async () => {
    let outcome = isValidDate("06/");
    expect(outcome).toBe(false);
  });

  it("adds 0 for date values", async () => {
    let outcome = getFormattedDate("6");
    expect(outcome).toBe("06/");
  });

  it("allows leading 0 for date values", async () => {
    let outcome = getFormattedDate("0");
    expect(outcome).toBe("0");
  });

  it("ignores other date values", async () => {
    let outcome = getFormattedDate("!");
    expect(outcome).toBe("!");
  });
});

describe("Environment", () => {
  it("it gets the live environment", async () => {
    let env = getEnvironment(PK_PROD);
    expect(env).toBe("https://api.checkout.com/tokens");
  });

  it("gets the sb environment", async () => {
    let env = getEnvironment(PK_SB);
    expect(env).toBe("https://api.sandbox.checkout.com/tokens");
  });
});

describe("Logger Environment", () => {
  it("it gets the live environment", async () => {
    let env = loggerGetEnvironment(PK_PROD);
    expect(env).toBe("https://cloudevents.integration.checkout.com/logging");
  });

  it("gets the sb environment", async () => {
    let env = loggerGetEnvironment(PK_SB);
    expect(env).toBe(
      "https://cloudevents.integration.sandbox.checkout.com/logging"
    );
  });

  it("returns empty", async () => {
    let date = getFormattedDate("");
    expect(date).toBe("");
  });
});
