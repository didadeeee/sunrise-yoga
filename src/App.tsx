import Homepage from "./pages/Homepage";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import { getToken, getUser } from "../src/utilities/users-service";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/users/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
