// test-utils.js
import React from "react";
import { render } from "@testing-library/react";
import { NotificationProvider } from "../lib/index";

const AllTheProviders = ({ children }) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
