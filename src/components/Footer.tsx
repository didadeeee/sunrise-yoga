import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useState, useEffect } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.primary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/didadeeee">
        didadeeee
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {


  return (
    <Box sx={{ bgcolor: "background.paper", p: 4 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Mindfulness | Yoga | LifeStyle
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.primary"
        component="p"
        sx={{ mb: 2 }}
      >

      </Typography>
      <Copyright />
    </Box>
  );
}
