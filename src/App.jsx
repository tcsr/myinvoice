import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { UserDetailsProvider } from "./context/UserDetailsContext";
import AppRoutes from "./config/AppRoutes";
import KeycloakInit from "./config/KeycloakInit";

const App = () => {
  return (
    <UserDetailsProvider>
      <Router>
        <CssBaseline />
        <KeycloakInit />
        <Header />
        <div className="border-none layout-main-container">
          <AppRoutes />
        </div>
      </Router>
      <Footer />
    </UserDetailsProvider>
  );
};

export default App;
