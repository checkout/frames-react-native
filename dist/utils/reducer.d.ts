import { FramesState } from "../types/types";
export declare const framesReducer: (prevState: FramesState, dispatchArg?: any) => {
    cardNumber: string;
    cardIcon: number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
    cardType: "Discover" | "Visa" | "Mastercard" | "American Express" | "JCB" | "Diners Club" | "Maestro" | "Mada";
    validation: {
        cardNumber: any;
        card: boolean;
        expiryDate: boolean;
        cvv: boolean;
    };
    cvvLength: number;
    cardBin: import("../types/types").CardBinChangedEvent;
    expiryDate: string;
    cvv: string;
} | {
    cvv: any;
    validation: {
        cvv: any;
        card: boolean;
        cardNumber: boolean;
        expiryDate: boolean;
    };
    cardNumber: string;
    cardBin: import("../types/types").CardBinChangedEvent;
    cardIcon: import("react-native").ImageSourcePropType;
    cardType: string;
    expiryDate: string;
    cvvLength: number;
};
