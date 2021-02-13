import React from "react";
import * as redux from "react-redux";
import { shallow, ShallowWrapper } from "enzyme";
import Exchange from "../Exchange";
import { INITIAL_ACCOUNT_MODEL } from "../../../reducers/account/account.model";

import { TEST_RATES } from "../../../common/utils.data";
import { INITIAL_ACCOUNTS } from "../../../common/constants";

describe("[Exchange component]", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ ...INITIAL_ACCOUNT_MODEL, rates: TEST_RATES });
    wrapper = shallow(<Exchange />);
  });

  it("Should render properly with only required props ", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should add disable props if sourceAccount == destinationAccount ", () => {
    expect(wrapper.find("Button").prop("disabled")).toBeFalsy();
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({
      ...INITIAL_ACCOUNT_MODEL,
      rates: TEST_RATES,
      sourceAccount: INITIAL_ACCOUNTS[1],
      destinationAccount: INITIAL_ACCOUNTS[1],
    });
    wrapper = shallow(<Exchange />);

    expect(wrapper.find("Button").prop("disabled")).toBeTruthy();
  });

  it("Should add disable props if sourcePrice < sourceAccountValue ", () => {
    expect(wrapper.find("Button").prop("disabled")).toBeFalsy();
    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({
      ...INITIAL_ACCOUNT_MODEL,
      rates: TEST_RATES,
      sourcePrice: 7000,
    });
    wrapper = shallow(<Exchange />);

    expect(wrapper.find("Button").prop("disabled")).toBeTruthy();
  });
});
