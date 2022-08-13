import { render, screen } from "@testing-library/react";
import Header from "./index";
import string from "../../../../utils/strings";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import { BrowserRouter as Router } from "react-router-dom";

test("renders header", () => {
  render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );
  const textElement = screen.getByText(string.HEADER_TITLE);
  expect(textElement).toBeInTheDocument();
});
