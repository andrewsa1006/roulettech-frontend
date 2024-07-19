import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// import logo192.png from src/assets folder
import logo from "../../assets/logo192.png";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ height: "5vh", backgroundColor: "#232f3f" }}
        position="static"
      >
        <Toolbar>
          <img src={logo} alt="logo" width="32" height="32" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticketeer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
