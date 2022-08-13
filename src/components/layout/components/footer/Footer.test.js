import { render, screen } from "@testing-library/react";
import Footer from "./index";
import string from "../../../../utils/strings";

test("renders footer", () => {
  render(<Footer />);
  const textElement = screen.getByText(string.FOOTER_TEXT);
  expect(textElement).toBeInTheDocument();
});
