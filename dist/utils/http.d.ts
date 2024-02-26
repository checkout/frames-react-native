import { TokenizationParams, FramesState, FramesConfig } from "../types/types";
export declare const tokenize: (e: TokenizationParams) => Promise<any>;
export declare const formatDataForTokenization: (state: FramesState, config: FramesConfig) => TokenizationParams;
export declare const getEnvironment: (key: string) => string;
