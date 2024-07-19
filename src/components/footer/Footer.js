import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ height: "5vh", backgroundColor: "#232f3f" }}
        position="static"
      >
        <Toolbar>
          <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
            © 2024 Fake Ticketeer. All rights reserved.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
