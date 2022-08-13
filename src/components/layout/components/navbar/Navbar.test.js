import { render, screen } from "@testing-library/react";
import Navbar from "./index";
import string from "../../../../utils/strings";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import { BrowserRouter as Router } from "react-router-dom";

test("renders navbar", () => {
  render(
    <Provider store={store}>
      <Router>
        <Navbar />
      </Router>
    </Provider>
  );
  const homeTextElement = screen.getByText("Home");
  expect(homeTextElement).toBeInTheDocument();
  const resetTextElement = screen.getByText("Reset");
  expect(resetTextElement).toBeInTheDocument();
});
