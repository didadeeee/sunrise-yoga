import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { EditUser, SignUpProps } from "../../Type";
import "./EditAccount.css";

type EditAccountProps = {
  user: EditUser;
  setUser: any;
};

export default function EditAccount({ user, setUser }: EditAccountProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("This field is required"),
    birthday: Yup.date().required("This field is required"),
    // password: Yup.string()
    //   .required("This field is required")
    //   .min(5, "Pasword must be 5 or more characters")
    //   .matches(/\d/, "Password should contain at least one number")
    //   .matches(
    //     /(?=.*[a-z])(?=.*[A-Z])\w+/,
    //     "Password ahould contain at least one uppercase and lowercase character"
    //   )
    //   .matches(
    //     /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
    //     "Password should contain at least one special character"
    //   ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthday: "",
      // password: "",
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
          alert("Login to View Account Details");
          throw new Error("No token found");
        }
        const response = await fetch("/api/users/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await response.json();
        setUser(user);
        formik.setValues({
          name: user.name,
          email: user.email,
          birthday: user.birthday,
          // password: user.password,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const birthdayPlusOne = dayjs(user.birthday).add(1, "day").toDate();
      const valueswithUpdatedBirthday = {
        ...formik.values,
        birthday: birthdayPlusOne,
      };
      const token = localStorage.getItem("token");
      window.alert("Account has been updated successfully.");
      const response = await fetch("/api/users/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(valueswithUpdatedBirthday),
      });
      const updatedUser = await response.json();
      setUser(updatedUser);
      navigate("/users/account");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handlechange");
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleBirthday = (date: any) => {
    if (date) {
      const dateObject = dayjs(date).toDate();
      setUser({
        ...user,
        birthday: dateObject,
      });
    }
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

        {/* <Box className="R1">
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
        </Box> */}

        <DatePicker
          label="birthday"
          value={dayjs(formik.values.birthday)}
          onChange={handleBirthday}
        />

        <Box className="R1">
          <Button variant="contained" type="submit">
            Update
          </Button>
          <p className="error-message">&nbsp;{user.error}</p>
        </Box>
      </form>
    </Box>
  );
}
