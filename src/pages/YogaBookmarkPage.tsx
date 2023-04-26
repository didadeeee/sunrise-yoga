import.meta.env.VITE_AIRTABLE_API_KEY;
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoadingSpinner from "./LoadingSpinner";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./YogaBookmarksPage.css";
import axios from "axios";
import type { Yoga, User } from "../Type";

export default function YogaBookmarksPage() {
  const [yogas, setYogas] = useState<Yoga[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login to View your favourite Yoga Tutorials! :)");
      return;
    }
    axios
      .get("/api/users/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setYogas(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container sx={{ py: 6 }} maxWidth="xl">
          {yogas.length === 0 ? (
            <Typography variant="h5">
              No Bookmark Found, Check Out All Yoga Tutorials{" "}
              <Link to="/">Here</Link>
            </Typography>
          ) : (
            <Typography variant="h5">Bookmark Yoga Tutorials</Typography>
          )}
          <br></br>
          <Grid container spacing={4}>
            {yogas.map((yoga) => (
              <Grid item key={yoga.id} xs={12} sm={6} md={4}>
                <Link
                  to={`/yogas/${yoga.yoga_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: "10%",
                      }}
                      image={yoga.thumbnailimageurl}
                      alt={yoga.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="h2"
                      >
                        {yoga.title} by {yoga.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="h2"
                      >
                        {yoga.duration} minutes
                      </Typography>
                      <Button size="small">{yoga.intensity}</Button>
                      <Typography variant="subtitle1">
                        {yoga.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
}
