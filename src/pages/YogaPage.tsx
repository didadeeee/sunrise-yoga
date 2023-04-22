import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Yoga } from "../Type";
import ReactPlayer from "react-player";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./YogaPage.css";

export default function YogaPage() {
  const [yoga, setYoga] = useState<Yoga | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYoga = async () => {
      const response = await fetch(`/api/yogas/${id}`);
      const yoga = await response.json();
      setYoga(yoga);
    };
    fetchYoga();
  }, [id]);

  const handleBookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login to Bookmark your favourite Yoga Tutorials! :)");
        throw new Error("No token found");
      }
      const response = await fetch(`/api/yogas/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          yoga_id: id,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return { error: (error as Error).message };
    }
  };

  return (
    <Container maxWidth="xl">
      {yoga && (
        <>
          <Box
            sx={{ bgcolor: "#FAF6F4", height: "100vh", mt: 4 }}
            className="YogaPage"
          >
            <Typography variant="h5" sx={{ m: 1 }}>
              {yoga.title} by {yoga.name}
            </Typography>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Container
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <ReactPlayer
                    url={yoga.videoembeddedurl}
                    controls
                    width="80%"
                    aspectRatio="16:9"
                  />
                </Container>
                <Grid
                  container
                  alignItems="center"
                  spacing={2}
                  sx={{ m: 2, ml: 25 }}
                >
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      alt={yoga.title}
                      src={yoga.avatar}
                      sx={{ width: 100, height: 120, borderRadius: "50%" }}
                    />
                  </Stack>
                  <SubscriptionsIcon sx={{ fontSize: "3rem", ml: 2 }} />
                  <Typography variant="h4" component="h2">
                    {yoga.handle}
                  </Typography>
                  <Box className="YogaPageButton" sx={{ ml: 13 }}>
                    <Button variant="outlined">
                      <BookmarkBorderIcon onClick={handleBookmark} />
                    </Button>
                  </Box>
                </Grid>
                <Typography variant="body1" color="text.primary" sx={{ m: 2 }}>
                  {yoga.description}
                </Typography>
                <Typography variant="h6" color="text.primary" sx={{ m: 2 }}>
                  Duration:{yoga.duration} Minutes
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      )}{" "}
      <br></br>
    </Container>
  );
}
