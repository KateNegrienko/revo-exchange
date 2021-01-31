import * as constants from "./currency.constants";
import Model from "./currency.model";
import { DataState, Actions } from "./currency.types";

export default function currency(
  state: DataState = Model,
  { type, payload }: Actions
) {
  switch (type) {
    case constants.READ_EXCHANGE_RATES:
      return state.merge({
        loading: true,
        error: undefined,
      });
    case constants.READ_EXCHANGE_RATES_SUCCESS:
      return state.merge({
        loading: false,
        error: undefined,
        rates: payload,
      });
    case constants.READ_EXCHANGE_RATES_ERROR:
      return state.merge({
        loading: false,
        error: payload,
      });

    default:
      return state;
  }
}
