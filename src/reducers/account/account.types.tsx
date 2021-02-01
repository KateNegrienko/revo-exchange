import { Immutable } from "seamless-immutable";
import { IBankAccount } from "../../data/Account";

export interface accountState {
  accounts: IBankAccount[]; // list of accounts
  sourceAccount: IBankAccount;
  destinationAccount: IBankAccount;
  sourcePrice: string;
  destinationPrice: string;
}
export type DataState = Immutable<accountState>;

export type Actions = { type: string; payload: any };
