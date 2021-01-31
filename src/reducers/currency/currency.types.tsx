import { Immutable } from "seamless-immutable";
import { Rate } from "../../data/Rate";

export interface currencyState {
  rates: Rate[];
  loading: boolean;
  error?: any;
}
export type DataState = Immutable<currencyState>;

export type Actions = { type: string; payload: any };
