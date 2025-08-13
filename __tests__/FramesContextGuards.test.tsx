import React from "react";
import { render } from "@testing-library/react-native";

import { CardNumber, ExpiryDate, Cvv, SubmitButton } from "../src/index";

describe("Component context guards", () => {
  it("throws when CardNumber is rendered outside Frames", () => {
    expect(() => render(<CardNumber />)).toThrow(
      "It looks like you are trying to render the CardNumber outside of the Frames Component."
    );
  });

  it("throws when ExpiryDate is rendered outside Frames", () => {
    expect(() => render(<ExpiryDate />)).toThrow(
      "It looks like you are trying to render the ExpiryDate outside of the Frames Component."
    );
  });

  it("throws when Cvv is rendered outside Frames", () => {
    expect(() => render(<Cvv />)).toThrow(
      "It looks like you are trying to render the Cvv outside of the Frames Component."
    );
  });

  it("throws when SubmitButton is rendered outside Frames", () => {
    expect(() => render(<SubmitButton title="Pay" />)).toThrow(
      "It looks like you are trying to render the SubmitButton outside of the Frames Component."
    );
  });
});
