import AppBar from "@mui/material/AppBar";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Link to="https://github.com/didadeeee">
            <HomeIcon color="inherit" sx={{ mr: 2 }} />
          </Link>
          <Typography variant="h6" color="inherit" noWrap>
            Sunrise Yoga
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <a href="https://github.com/didadeeee">
            <AccountCircleIcon />
          </a>
        </Toolbar>
      </AppBar>
    </>
  );
}
