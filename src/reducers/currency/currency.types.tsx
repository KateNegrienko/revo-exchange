import { Immutable } from "seamless-immutable";
import { IRate } from "../../data/Rate";

export interface currencyState {
  rates: IRate[];
  loading: boolean;
  error?: any;
}
export type DataState = Immutable<currencyState>;

export type Actions = { type: string; payload: any };
