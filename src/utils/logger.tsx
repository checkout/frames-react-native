import { Platform } from "react-native";

import {
  LIVE_LOGGER,
  SANDBOX_LOGGER,
  MBC_LIVE_SECRET_KEY_REGEX,
  NAS_LIVE_SECRET_KEY_REGEX,
} from "./constants";
import { FramesConfig } from "../types/types";

export const log = async (
  loglevel: string,
  type: string,
  config: FramesConfig,
  extra?: object
) => {
  try {
    const pjson = require("../../package.json");
    const date = new Date();
    await fetch(getEnvironment(config.publicKey), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/cloudevents+json",
      },
      body: JSON.stringify({
        specversion: "1.0",
        id: generateUUID(),
        type,
        source: "frames-react-native-sdk",
        time: date.toISOString(),
        data: {
          ...extra,
          os: Platform.OS,
          osVersion: Platform.Version,
          sdkVersion: pjson.version,
          environment:
            MBC_LIVE_SECRET_KEY_REGEX.test(config.publicKey) ||
            NAS_LIVE_SECRET_KEY_REGEX.test(config.publicKey)
              ? `production`
              : `sandbox`,
        },
        cko: {
          ddTags: "source:frames-react-native-sdk",
          loglevel,
        },
      }),
    });
  } catch (error) {
    throw error;
  }
};

const generateUUID = () => {
  var d = new Date().getTime(); //Timestamp
  var d2 = 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const getEnvironment = (key: string) =>
  MBC_LIVE_SECRET_KEY_REGEX.test(key) || NAS_LIVE_SECRET_KEY_REGEX.test(key)
    ? LIVE_LOGGER
    : SANDBOX_LOGGER;
