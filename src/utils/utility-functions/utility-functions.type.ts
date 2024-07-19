import { ContractPreset, EstatePreset } from "../../pages/listing-page/listing-page.types";
import { AnyAction } from "redux";

export type FormattedError = {
  name: string;
  error: string;
}

export type Preset = ContractPreset | EstatePreset;

export type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
}
