import { render, screen } from "@testing-library/react";
import Home from "./index";
import string from "../../utils/strings";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BrowserRouter as Router } from "react-router-dom";

test("renders home", () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );
  const destinationOneElement = screen.getByText(string.DESTINATION_ONE_LABEL);
  expect(destinationOneElement).toBeInTheDocument();
  const destinationTwoElement = screen.getByText(string.DESTINATION_TWO_LABEL);
  expect(destinationTwoElement).toBeInTheDocument();
  const destinationThreeElement = screen.getByText(
    string.DESTINATION_THREE_LABEL
  );
  expect(destinationThreeElement).toBeInTheDocument();
  const destinationFourElement = screen.getByText(
    string.DESTINATION_FOUR_LABEL
  );
  expect(destinationFourElement).toBeInTheDocument();
});
