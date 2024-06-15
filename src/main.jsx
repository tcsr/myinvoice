import React from "react";
import ReactDOM from "react-dom/client";

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const invoiceTheme = createTheme({
  palette: {
    primary: {
      main: "#1E6091",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={invoiceTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
