import { Immutable } from "seamless-immutable";
import { Account } from "../../data/Account";

export interface accountState {
  loading: boolean;
  error: any;
  accounts: Account[]; // list of accounts
}
export type DataState = Immutable<accountState>;

export type Actions = { type: string; payload: any };
