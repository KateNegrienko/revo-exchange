import React from "react";
import { render, shallow } from "enzyme";
import Button from "../Button";

describe("[Button snapshots]", () => {
  it("Should render properly with only required props", () => {
    const children = <div>New Button</div>;
    const onClick = () => {};
    expect(
      render(<Button onClick={onClick}>{children}</Button>)
    ).toMatchSnapshot();
  });

  it("Should call appropriate handler when onClick event emits", () => {
    const mockedOnClick = jest.fn();

    const wrap = shallow(<Button onClick={mockedOnClick}>Ok</Button>);

    wrap.simulate("click");

    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });

  it("Should not call appropriate handler when onClick event emits on disabled button", () => {
    const mockedOnClick = jest.fn();
    const wrap = shallow(
      <Button disabled onClick={mockedOnClick}>
        Ok
      </Button>
    );

    wrap.simulate("click");

    expect(mockedOnClick).toHaveBeenCalledTimes(0);
  });
});
