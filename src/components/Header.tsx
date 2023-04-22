import AppBar from "@mui/material/AppBar";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { logout } from "../utilities/users-service";

interface HeaderProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

interface User {
  name: string;
  email: string;
  password: string;
  birthday: Date;
}


export default function Header({ user, setUser }: HeaderProps) {
  
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    console.log("user has been logged out successfully.");
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Link to="/">
            <HomeIcon color="inherit" sx={{ mr: 2 }} />
          </Link>
          <Typography variant="h6" color="inherit" noWrap>
            Sunrise Yoga
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
          <a href="/users/bookmarks" style={{ marginRight: "16px" }}>
              <TurnedInNotIcon />
            </a>
            <a href="/users/signup" style={{ marginRight: "16px" }}>
              <AccountCircleIcon />
            </a>
            <LogoutIcon
              onClick={handleLogout}
              style={{ marginBottom: "4px" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
