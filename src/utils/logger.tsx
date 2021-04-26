import { Platform } from "react-native";

import {
  LIVE_LOGGER,
  SANDBOX_LOGGER,
  MBC_LIVE_SECRET_KEY_REGEX,
  NAS_LIVE_SECRET_KEY_REGEX,
} from "./constants";
import { v4 as uuidv4 } from "uuid";
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
        id: uuidv4(),
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
          correlationId: uuidv4(),
          loglevel,
        },
      }),
    });
  } catch (error) {
    throw error;
  }
};

export const getEnvironment = (key: string) =>
  MBC_LIVE_SECRET_KEY_REGEX.test(key) || NAS_LIVE_SECRET_KEY_REGEX.test(key)
    ? LIVE_LOGGER
    : SANDBOX_LOGGER;
