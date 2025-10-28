export type ControlKind =
  | "select"
  | "radio"
  | "chips"
  | "switch"
  | "slider"
  | "input"
  | "group"
  | "discriminated";

export interface BaseField {
  key: string;
  label: string;
  help?: string;
  required?: boolean;
  visibleIf?: (model: any) => boolean;
}

export interface SelectField extends BaseField {
  kind: "select";
  options: readonly string[];
}

export interface SliderField extends BaseField {
  kind: "slider";
  min: number;
  max: number;
  step?: number;
  integer?: boolean;
  suffix?: string;
}

export interface SwitchField extends BaseField {
  kind: "switch";
}

export interface InputField extends BaseField {
  kind: "input";
  type?: "text" | "number";
  placeholder?: string;
}

export interface GroupField extends BaseField {
  kind: "group";
  children: Field[];
}

export interface DiscriminatedField extends BaseField {
  kind: "discriminated";
  discriminatorKey: string;
  cases: Record<string, Field[]>;
}

export type Field =
  | SelectField
  | SliderField
  | SwitchField
  | InputField
  | GroupField
  | DiscriminatedField;
