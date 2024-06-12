import MSLog from "../assets/Mindsprint_logo.svg";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, bgcolor: "white", color: "black" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" component="span" className="mb-1">
              POWERED BY
            </Typography>
            <a href="https://www.mindsprint.org" target="_blank" rel="noopener noreferrer">
              <img src={MSLog} alt="Logo" height="30" className="mr-1" />
            </a>
          </Box>
          <Box display="flex" alignItems="center">
            <Link
              href="/terms-and-conditions"
              variant="body2"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Terms & Conditions
            </Link>
            <Typography variant="body2" component="span" sx={{ mx: 1 }}>
              -
            </Typography>
            <Link
              href="/privacy-policy"
              variant="body2"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Privacy Policy
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
