import React from "react";
import { render, shallow, ShallowWrapper } from "enzyme";
import ExchangeAccount from "../ExchangeAccount";
import { INITIAL_ACCOUNTS } from "../../../../../common/constants";
import { TEST_RATES } from "../../../../../common/utils.data";
import { ExchangeAccountType } from "../ExchangeAccount.interface";

describe("[Exchange account component]", () => {
  let wrapper: ShallowWrapper;
  const price = "50";
  const onChangePrice = jest.fn();
  const onChangeAccount = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ExchangeAccount
        account={INITIAL_ACCOUNTS[0]}
        rates={TEST_RATES}
        price={price}
        type={ExchangeAccountType.SOURCE}
        onChangePrice={onChangePrice}
        onChangeAccount={onChangeAccount}
      />
    );
  });

  it("[Exchange account snapshot] Should render properly with only required props ", () => {
    const onChangePrice = (e: any) => {};
    const onChangeAccount = () => {};
    expect(
      render(
        <ExchangeAccount
          account={INITIAL_ACCOUNTS[0]}
          rates={TEST_RATES}
          price=""
          type={ExchangeAccountType.SOURCE}
          onChangePrice={onChangePrice}
          onChangeAccount={onChangeAccount}
        />
      )
    ).toMatchSnapshot();
  });

  it("[input] Should render input with correct initialValue, type, max and properties", () => {
    const input = wrapper.find("input");

    expect(input.prop("value")).toEqual(price);
    expect(input.prop("type")).toEqual("number");
    expect(input.prop("max")).toEqual(INITIAL_ACCOUNTS[0].value);
  });

  it("[input] Should call onChangePrice function after change input component", () => {
    const input = wrapper.find("input");

    expect(onChangePrice).toBeCalledTimes(0);
    input.simulate("change", {
      persist: jest.fn(),
      target: { value: 1 },
    });
    expect(onChangePrice).toBeCalledTimes(1);
    expect(onChangePrice).toHaveBeenCalledWith("source", "1.00");
  });

  it("[select] Should call onChangeAccoun function after change select component", () => {
    const select = wrapper.find(".select");
    expect(onChangeAccount).toBeCalledTimes(0);
    select.simulate("change", {}, { value: TEST_RATES[2].value });
    expect(onChangeAccount).toBeCalledTimes(1);
    expect(onChangeAccount).toHaveBeenCalledWith("source", TEST_RATES[2].value);
  });
});
