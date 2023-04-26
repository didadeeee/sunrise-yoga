import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { State } from "../../Type";
import "./SignUp.css";

export default function SignUp() {
  const [state, setState] = useState<State>({
    name: "",
    email: "",
    password: "",
    birthday: "",
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
      setTimeout(() => {
        resetForm();
      }, 1000 * 2);
    },
  });

  const signUpEmail = async () => {
    const response = await fetch("/api/users/signupemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: {
          ...state,
          name: formik.values.name,
          email: formik.values.email,
          birthday: formik.values.birthday,
        },
      }),
    });
    const data = await response.json();
    console.log("data", data);
    return;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      window.alert(
        state.email + " Account has been created successfully. Please Login."
      );
      fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formik.values),
      })
        .then((response) => response.json())
        .then((data) => console.log("data", data));
      signUpEmail();
      console.log("submitted");
      navigate("/users/login");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handlechange");
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Box className="SignUpFormContainer">
      <form autoComplete="off" onSubmit={handleSubmit} className="SignUpForm">
        <Typography variant="h5">Sign Up a new Account </Typography>
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
            Sign Up
          </Button>
          <p className="error-message">&nbsp;{state.error}</p>
        </Box>

        <Box className="R1">
          <Typography variant="subtitle1">
            Already have an account?
            <Link to={`/users/login`}>
              <Button>Login</Button>
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
