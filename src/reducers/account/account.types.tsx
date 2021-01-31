import { Immutable } from "seamless-immutable";
import { Account } from "../../data/Account";

export interface accountState {
  accounts: Account[]; // list of accounts
  sourceAccount: Account;
  destinationAccount: Account;
  sourcePrice: string;
  destinationPrice: string;
}
export type DataState = Immutable<accountState>;

export type Actions = { type: string; payload: any };
