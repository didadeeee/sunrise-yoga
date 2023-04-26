import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getToken, getUser } from "../../utilities/users-service";
import { SignUpProps } from "../../Type";
import "./Login.css";

export default function Login({ setUser }: SignUpProps) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("This field is required"),
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
      email: "",
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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const body = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setUser(getUser());
        window.alert("Account has login successfully.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box className="LoginFormContainer">
        <form onSubmit={handleLogin} className="LoginForm">
          <br></br>
          <Typography variant="h5">User Login </Typography>
          <Box className="R2">
            <TextField
              type="email"
              label="Enter your email address"
              name="email"
              value={formik.values.email}
              helperText={formik.errors.email ? formik.errors.email : ""}
              onChange={formik.handleChange}
              className="my-textfield"
              InputLabelProps={{
                style: { color: "#000000" },
              }}
              required
            />
          </Box>

          <Box className="R2">
            <TextField
              label="Enter your password"
              name="password"
              value={formik.values.password}
              helperText={formik.errors.password ? formik.errors.password : ""}
              onChange={formik.handleChange}
              className="my-textfield"
              type="password"
              InputLabelProps={{
                style: { color: "#000000", width: "100%" },
              }}
              required
            />
          </Box>

          <Box className="R2" style={{ marginBottom: "1px" }}>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Box>

      <Box className="R2" style={{ marginTop: "1px" }}>
        <Typography variant="subtitle1">No account yet? </Typography>
        <Link to={`/users/signup`}>
          <Button>Sign Up</Button>
        </Link>
      </Box>
    </>
  );
}
