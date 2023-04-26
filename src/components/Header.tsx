import AppBar from "@mui/material/AppBar";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <HomeIcon color="inherit" sx={{ mr: 2 }} />
            </Link>
            <Typography variant="h6" color="inherit" noWrap>
              Sunrise Yoga
            </Typography>
            <Box sx={{ ml: "auto" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/users/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Sign Up
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/users/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
