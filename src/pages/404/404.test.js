import { render, screen } from "@testing-library/react";
import NoPage from "./index";
import string from "../../utils/strings";

test("renders 404 page", () => {
  render(<NoPage />);
  const pageTitleElement = screen.getByText(string.NO_PAGE_TEXT);
  expect(pageTitleElement).toBeInTheDocument();
  const redirectPageElement = screen.getByText(string.GO_TO_HOME_PAGE_TEXT);
  expect(redirectPageElement).toBeInTheDocument();
});
