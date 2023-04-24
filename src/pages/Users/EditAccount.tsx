import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { getUser, signUp } from "../../utilities/users-service";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { User } from "../../Type";
import "./EditAccount.css";

export default function EditAccount() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User>({
    name: "",
    email: "",
    password: "",
    birthday: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });

  const navigate = useNavigate();

  const validateSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("This field is required"),
    birthday: Yup.date().required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(5, "Pasword must be 5 or more characters")
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthday: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        resetForm();
      }, 1000 * 2);
    },
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
        formik.setValues({
          name: userData.name,
          email: userData.email,
          birthday: userData.birthday,
          password: userData.password,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const token = localStorage.getItem("token");
      window.alert("Dear " + userData.name + ", account has been updated successfully.");
      fetch("/api/users/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formik.values),
      })
        .then((response) => response.json())
        .then((data) => console.log("data", data));
      console.log("updated");
      navigate("/users/account");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handlechange");
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box className="SignUpFormContainer">
      <form autoComplete="off" onSubmit={handleUpdate} className="SignUpForm">
        <Typography variant="h5">Update Account Details</Typography>
        <Box className="R1">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Name"
            name="name"
            value={formik.values.name}
            helperText={formik.errors.name ? formik.errors.name : ""}
            InputLabelProps={{
              style: { color: "#000000" },
            }}
            onChange={formik.handleChange}
            className="my-textfield"
            required
          />
        </Box>

        <Box className="R1">
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            type="email"
            name="email"
            value={formik.values.email}
            helperText={formik.errors.email ? formik.errors.email : ""}
            InputLabelProps={{
              style: { color: "#000000" },
            }}
            onChange={formik.handleChange}
            className="my-textfield"
            required
          />
        </Box>

        <Box className="R1">
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formik.values.password}
            helperText={formik.errors.password ? formik.errors.password : ""}
            InputLabelProps={{
              style: { color: "#000000" },
            }}
            onChange={formik.handleChange}
            className="my-textfield"
            required
          />
        </Box>

        <Box className="R1">
          <TextField
            id="outlined-basic"
            label="Birthday"
            variant="outlined"
            type="date"
            name="birthday"
            value={formik.values.birthday}
            helperText={formik.errors.birthday ? formik.errors.birthday : ""}
            InputLabelProps={{
              style: { color: "#000000" },
              shrink: true,
            }}
            onChange={formik.handleChange}
            className="my-textfield"
            required
          />
        </Box>

        <Box className="R1">
          <Button variant="contained" type="submit">
            Update
          </Button>
          <p className="error-message">&nbsp;{userData.error}</p>
        </Box>
      </form>
    </Box>
  );
}
