import React from "react";
import { render, shallow } from "enzyme";
import Card from "../Card";

describe("[Card snapshots]", () => {
  it("Should render properly with only required props", () => {
    const children = <div>children</div>;
    expect(render(<Card>{children}</Card>)).toMatchSnapshot();
  });

  it("Should add className to card component", () => {
    const testclass = "test";
    const wrap = shallow(<Card className={testclass} />);

    expect(wrap.hasClass(testclass)).toEqual(true);
  });
});
