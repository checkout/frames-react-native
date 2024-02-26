export declare const Icons: {
    Visa: any;
    Mastercard: any;
    "American Express": any;
    Discover: any;
    JCB: any;
    "Diners Club": any;
    Maestro: any;
    Mada: any;
};
export declare const formatCard: (text: string) => string;
export declare const getCardType: (text: string) => "Discover" | "Visa" | "Mastercard" | "American Express" | "JCB" | "Diners Club" | "Maestro" | "Mada";
export declare const isValidCard: (text: string) => any;
export declare const cvvLength: (text: string) => 4 | 3;
export declare const isValidCvv: (text: string, type: string) => any;
export declare const isValidDate: (text: string) => boolean;
export declare const getIcon: (cardType: "Discover" | "Visa" | "Mastercard" | "American Express" | "JCB" | "Diners Club" | "Maestro" | "Mada") => number | import("react-native").ImageURISource | import("react-native").ImageURISource[] | undefined;
export declare type IconKey = keyof typeof Icons;
