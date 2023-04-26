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
import { useNavigate, Link } from "react-router-dom";

type HeaderProps = {
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function UserHeader({ setUser }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setAnchorEl(null);
    navigate("/");
    console.log("user has been logged out successfully.");
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
                <MenuItem onClick={handleClose} className="menuLink">
                  <Link
                    to="/users/account"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    My Account
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/users/bookmarks"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Favourite Tutorials
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Link
                    to=""
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Log Out
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
