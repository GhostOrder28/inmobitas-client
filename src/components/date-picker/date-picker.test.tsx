import DatePicker from "./date-picker.component";
import { render } from "@testing-library/react";

//Date.now = jest.fn(() => new Date(2022, 7, 9).valueOf());


jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

it("should render DatePicker without errors", () => {
  const date = new Date(2022, 7, 9);
  expect(render(
    <DatePicker
      value={date} 
      onChange={() => {}}
    />
  )).toMatchSnapshot();
});
