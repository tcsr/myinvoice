import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { UserDetailsProvider } from "./context/UserDetailsContext";
import KeycloakProvider from "./context/KeycloakProvider";
import AppRoutes from "./config/AppRoutes";

const App = () => {
  return (
    <>
      <UserDetailsProvider>
        <KeycloakProvider>
          <Router>
            <CssBaseline />
            <Header />
            <div className="border-none layout-main-container">
              <AppRoutes />
            </div>
          </Router>
          <Footer />
        </KeycloakProvider>
      </UserDetailsProvider>
    </>
  );
};

export default App;
