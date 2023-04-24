import Homepage from "./pages/Homepage";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Login from "./pages/Users/Login";
import SignUp from "./pages/Users/SignUp";
import EditAccount from "./pages/Users/EditAccount";
import YogaPage from "../src/pages/YogaPage";
import YogaBookmarksPage from "../src/pages/YogaBookmarkPage";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import AccountPage from "./pages/Users/AccountPage";
import { getToken, getUser } from "../src/utilities/users-service";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "./Type";
import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await fetch("/api/users/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <Header user={user} setUser={setUser} />
        <CssBaseline />
        <Routes>
          <Route path="/users/signup" element={<SignUp />} />
          <Route path="/users/login" element={<Login setUser={setUser} />} />
          <Route path="/users/account" element={<AccountPage user={user} setUser={setUser} />} />
          <Route path="/users/edit" element={<EditAccount user={user} setUser={setUser} />} />
          <Route path="/users/bookmarks" element={<YogaBookmarksPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/yogas/:id" element={<YogaPage />} />
        </Routes>
        <Footer></Footer>
      </>
    </LocalizationProvider>
  );
}

export default App;
