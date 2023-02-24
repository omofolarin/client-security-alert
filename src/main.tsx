import "react-toastify/dist/ReactToastify.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { store } from "./store";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer />
        </React.Fragment>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
