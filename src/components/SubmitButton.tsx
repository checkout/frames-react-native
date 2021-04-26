import React from "react";
import { Button, ButtonProps } from "react-native";
import { FramesConsumer } from "../Frames";

const SubmitButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <FramesConsumer>
      {({ submitCard }) => {
        if (!submitCard) {
          throw "It looks like you are trying to render the SubmitButton outside of the Frames Component.";
        }
        return (
          <Button
            {...props}
            title={props.title}
            onPress={(e) => {
              submitCard();
              if (props.onPress) props.onPress(e);
            }}
          >
            {props.children}
          </Button>
        );
      }}
    </FramesConsumer>
  );
};

export default SubmitButton;
