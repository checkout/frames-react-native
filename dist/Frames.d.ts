import React from "react";
import { FramesContextType, FramesProps } from "./types/types";
export declare const FramesContext: React.Context<FramesContextType>;
declare const Frames: (props: FramesProps) => JSX.Element;
export default Frames;
export declare const FramesConsumer: React.Consumer<FramesContextType>;
export declare const FramesProvider: React.Provider<FramesContextType>;
