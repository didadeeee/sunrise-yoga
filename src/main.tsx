import React from "react";
import ReactDOM from "react-dom/client";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import App from "./App";
const rootElement = document.getElementById("root") as Element;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}
