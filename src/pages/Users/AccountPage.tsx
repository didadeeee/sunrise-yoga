import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { User } from "../../Type";
import "./AccountPage.css";

export default function AccountPage() {
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    password: "",
    birthday: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });

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
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Box>
      <Typography variant="h5">Account Details</Typography>
      <Typography>{userData.name}</Typography>
      <Typography>{userData.email}</Typography>
      <Typography>{dayjs(userData.birthday).format("DD/MM/YYYY")}</Typography>
      <Box className="R2">
        <Link to={"/users/edit"}>
          <Button>Edit Details</Button>
        </Link>
      </Box>
    </Box>
  );
}
