import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { User, SignUpProps } from "../../Type";
import "./AccountPage.css";

type AccountPageProp = {
  user: User;
  setUser: any;
};

export default function AccountPage({ user, setUser }: AccountPageProp) {
  return (
    <Box>
      <Typography variant="h5">Account Details</Typography>
      <Typography>{user.name}</Typography>
      <Typography>{user.email}</Typography>
      <Typography>{dayjs(user.birthday).format("DD/MM/YYYY")}</Typography>
      <Box className="R2">
        <Link to={"/users/edit"}>
          <Button>Edit Details</Button>
        </Link>
      </Box>
    </Box>
  );
}
