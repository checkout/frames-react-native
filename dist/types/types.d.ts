import { ImageSourcePropType, TextInputProps, ViewStyle, StyleProp, TouchableOpacityProps, TextStyle } from "react-native";
export interface Schemes {
    Visa: string;
    Mastercard: string;
    "American Express": string;
    Discover: string;
    JCB: string;
    "Diners Club": string;
    Maestro: string;
    Mada: string;
}
export interface CardNumberState {
    value: string;
    icon: any;
    valid: boolean;
}
export declare type FramesFieldProps = Omit<TextInputProps, "value" | "onChangeText">;
export interface FramesCardFieldProps extends FramesFieldProps {
    showIcon?: boolean;
}
interface Validation {
    cardNumber: boolean;
    expiryDate: boolean;
    cvv: boolean;
    card: boolean;
}
export interface FramesState {
    cardNumber: string;
    cardBin: CardBinChangedEvent;
    cardIcon: ImageSourcePropType;
    cardType: string;
    expiryDate: string;
    cvv: string;
    cvvLength: number;
    validation: Validation;
}
export declare type FramesDispatch = ({ type, payload, }: {
    type: string;
    payload: any;
}) => void;
export interface FramesBillingAddress {
    addressLine1?: string;
    addressLine2?: string;
    zip?: string;
    city?: string;
    state?: string;
    country?: string;
}
export interface FramesCardholder {
    name?: string;
    billingAddress?: FramesBillingAddress;
    phone?: string;
}
export interface FramesConfig {
    publicKey: string;
    debug?: boolean;
    cardholder?: FramesCardholder;
}
export interface PaymentMethodChangeParams {
    isValid: boolean;
    paymentMethod: string;
}
export interface FrameValidationChangedParams {
    element: string;
    isValid: boolean;
    isEmpty: boolean;
}
export interface FramesProps extends ViewStyle {
    style?: StyleProp<ViewStyle>;
    children: any;
    config: FramesConfig;
    frameValidationChanged?: (e: FrameValidationChangedParams) => void;
    paymentMethodChanged?: (e: PaymentMethodChangeParams) => void;
    cardValidationChanged?: (e: FrameCardValidationChangedEvent) => void;
    cardTokenized: (e: FrameCardTokenizedEvent) => void;
    cardTokenizationFailed?: (e: FrameCardTokenizationFailedEvent) => void;
    cardBinChanged?: (e: CardBinChangedEvent) => void;
}
export interface FrameCardValidationChangedEvent {
    isValid: boolean;
    isElementValid: ValidationChange;
}
interface ValidationChange {
    cardNumber: boolean;
    expiryDate: boolean;
    cvv: boolean;
}
export declare type FramesContextType = {
    state: FramesState;
    dispatch: FramesDispatch;
    submitCard: () => void;
};
export interface TokenizationParams {
    key: string;
    body: TokenizationBody;
}
export interface TokenizationBody {
    type: string;
    number: string;
    expiry_month: string;
    expiry_year: string;
    cvv: string;
    name?: string;
    billing_address?: GatewayBillingAddress;
    phone?: Phone;
}
export interface Phone {
    number?: string;
}
export declare type Scheme = "Visa" | "Mastercard" | "AMERICAN EXPRESS" | "Diners Club International" | "Maestro" | "Discover" | "Mada";
export declare type CardType = "Credit" | "Debit" | "Prepaid" | "Charge";
export declare type CardCategory = "Consumer" | "Commercial";
export interface GatewayBillingAddress {
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}
export interface GatewayPhone {
    number?: string;
}
export interface FrameCardTokenizedEvent {
    type: string;
    token: string;
    expires_on: string;
    expiry_month: string;
    expiry_year: string;
    scheme?: Scheme;
    last4: string;
    bin: string;
    card_type?: CardType;
    card_category?: CardCategory;
    issuer?: string;
    issuer_country?: string;
    product_id?: string;
    product_type?: string;
    billing_address?: GatewayBillingAddress;
    phone?: GatewayPhone;
    name?: string;
}
export interface FrameCardTokenizationFailedEvent {
    error_codes: Array<string>;
    error_type: string;
    request_id: string;
}
export interface CardBinChangedEvent {
    bin: string;
    scheme: string;
}
export interface SubmitButtonProps extends TouchableOpacityProps {
    title: string;
    textStyle?: TextStyle;
}
export {};
