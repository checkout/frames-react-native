import { FramesConfig } from "../types/types";
export declare const log: (loglevel: string, type: string, config: FramesConfig, extra?: object | undefined) => Promise<void>;
export declare const getEnvironment: (key: string) => "https://cloudevents.integration.checkout.com/logging" | "https://cloudevents.integration.sandbox.checkout.com/logging";
