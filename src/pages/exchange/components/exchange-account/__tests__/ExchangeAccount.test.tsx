import React from "react";
import { render, shallow, ShallowWrapper, mount } from "enzyme";
import ExchangeAccount from "../ExchangeAccount";
import { INITIAL_ACCOUNTS } from "../../../../../common/constants";
import { TEST_RATES } from "../../../../../common/utils.data";
import { ExchangeAccountType } from "../ExchangeAccount.interface";

describe("[Exchange account component]", () => {
  let wrapperForSourceType: ShallowWrapper;
  const price = "50";
  const onChangePrice = jest.fn();
  const onChangeAccount = jest.fn();
  const sourceExchangeAccountNode = (
    <ExchangeAccount
      account={INITIAL_ACCOUNTS[0]}
      rates={TEST_RATES}
      price={price}
      type={ExchangeAccountType.SOURCE}
      onChangePrice={onChangePrice}
      onChangeAccount={onChangeAccount}
    />
  );
  beforeEach(() => {
    wrapperForSourceType = shallow(sourceExchangeAccountNode);
  });

  it("[Exchange account snapshot] Should render properly with only required props ", () => {
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
    const input = wrapperForSourceType.find("input");

    expect(input.prop("value")).toEqual(price);
    expect(input.prop("type")).toEqual("number");
    expect(input.prop("max")).toEqual(INITIAL_ACCOUNTS[0].value);
  });

  it("[icon] Should render minus icon if type === source ", () => {
    const icon = wrapperForSourceType.find("Icon");
    expect(icon.prop("name")).toEqual("minus");
  });

  it("[icon] Should render plus icon if type === destination ", () => {
    const icon = shallow(
      <ExchangeAccount
        account={INITIAL_ACCOUNTS[0]}
        rates={TEST_RATES}
        price={price}
        type={ExchangeAccountType.DESTINATION}
        onChangePrice={onChangePrice}
        onChangeAccount={onChangeAccount}
      />
    ).find("Icon");
    expect(icon.prop("name")).toEqual("plus");
  });

  it("[input] Should call onChangePrice function after change input component", () => {
    const input = wrapperForSourceType.find("input");
    expect(onChangePrice).toBeCalledTimes(0);
    input.simulate("change", {
      persist: jest.fn(),
      target: { value: 1 },
    });
    expect(onChangePrice).toBeCalledTimes(1);
    expect(onChangePrice).toHaveBeenCalledWith(
      ExchangeAccountType.SOURCE,
      "1.00"
    );
  });

  it("[select] Should call onChangeAccoun function after change select component", () => {
    const select = wrapperForSourceType.find(".select");
    expect(onChangeAccount).toBeCalledTimes(0);
    select.simulate("change", {}, { value: TEST_RATES[2].value });
    expect(onChangeAccount).toBeCalledTimes(1);
    expect(onChangeAccount).toHaveBeenCalledWith(
      ExchangeAccountType.SOURCE,
      TEST_RATES[2].value
    );
  });

  it("[balance] Should change balance hint after price pops changed", () => {
    expect(wrapperForSourceType.find(".hint")).toMatchSnapshot();
    wrapperForSourceType.setProps({ account: { value: 10 } });
    wrapperForSourceType.update();
    expect(wrapperForSourceType.find(".hint")).toMatchSnapshot();
  });
});
