import Homepage from "./pages/Homepage";
import CssBaseline from "@mui/material/CssBaseline";

import Login from "./pages/Users/Login";
import SignUp from "./pages/Users/SignUp";
import YogaPage from "../src/pages/YogaPage";
import YogaBookmarksPage from "../src/pages/YogaBookmarkPage";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { getToken, getUser } from "../src/utilities/users-service";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <Header user={user} setUser={setUser} />
      <CssBaseline />
      <Routes>
        <Route path="/users/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/users/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
        <Route path="/yogas/:id" element={<YogaPage />} />
        <Route path="/users/bookmarks" element={<YogaBookmarksPage />} />
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
