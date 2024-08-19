import FieldErrorMessage from "./field-error-message.component";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"

describe("FieldErrorMessage", () => {
  it("should render with message", () => {
    const wrapper = render(<FieldErrorMessage message={"this is an error"} />)
    expect(wrapper).toMatchSnapshot();
  })

  it("should render nothing", () => {
    render(<FieldErrorMessage message={undefined} />);
    const errorMessageContainer = screen.queryByTestId("error-message-container");
    expect(errorMessageContainer).not.toBeInTheDocument();
  })
})
