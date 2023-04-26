import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Yoga } from "../Type";
import ReactPlayer from "react-player";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./YogaPage.css";

interface UserYoga {
  yoga_id: number;
  users_id: number;
}

export default function YogaPage() {
  const [yoga, setYoga] = useState<Yoga | null>(null);
  const [userYoga, setUserYoga] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchYoga = async () => {
      try {
        const response = await fetch(`/api/yogas/${id}`);
        const yoga = await response.json();
        setYoga(yoga);
      } catch (error) {
        console.error(error);
      }
    };
    fetchYoga();
  }, [id]);

  useEffect(() => {
    console.log("id", id);
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/checkbookmark", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userYoga = await response.json();
        console.log("userYoga", userYoga);
        if (userYoga.length === 0) {
          setIsBookmarked(false);
        }
        const isBookmarked = userYoga.some(
          (item: UserYoga) => item.yoga_id === Number(id)
        );
        setUserYoga(userYoga);
        setIsBookmarked(isBookmarked);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id, setIsBookmarked]);

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
      console.log("bookmark", isBookmarked);
      setIsBookmarked(true);
      return data;
    } catch (error) {
      console.error(error);
      return { error: (error as Error).message };
    }
  };

  const handleUnbookmark = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login to Bookmark your favourite Yoga Tutorials! :)");
        throw new Error("No token found");
      }
      const response = await fetch(`/api/yogas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          yoga_id: id,
        }),
      });
      const data = await response.json();
      setIsBookmarked(false);
      return data;
    } catch (error) {
      console.error(error);
      return { error: (error as Error).message };
    }
  };

  return (
    <Container maxWidth="sm">
      {yoga && (
        <Box
          sx={{ bgcolor: "#FAF6F4", minHeight: "80vh", m: 2, mt: 3 }}
          className="YogaPage"
        >
          <Typography variant="h6" sx={{ m: 1 }}>
            {yoga.title} by {yoga.name}
          </Typography>
          <Stack spacing={2}>
            <Container style={{ paddingTop: "56.25%", position: "relative" }}>
              <ReactPlayer
                url={yoga.videoembeddedurl}
                controls
                width="100%"
                height="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
              />
            </Container>
            <Container sx={{ maxWidth: "xl", padding: 2 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                spacing={{ xs: 1, md: 2 }}
                sx={{ p: { xs: 1, md: 2 } }}
              >
                {/* <Avatar
                  alt={yoga.title}
                  src={yoga.avatar}
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 72, md: 96 },
                    borderRadius: "50%",
                  }}
                /> */}
                <SubscriptionsIcon
                  sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
                />
                <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
                 <Link to={yoga.channel}> {yoga.handle}</Link>
                </Typography>
                <Button variant="outlined">
                  {isBookmarked ? (
                    <BookmarkIcon onClick={handleUnbookmark} />
                  ) : (
                    <BookmarkBorderIcon onClick={handleBookmark} />
                  )}
                </Button>
              </Stack>

              <Typography
                variant="body1"
                color="text.primary"
                sx={{ m: 2, mb: 1 }}
              >
                {yoga.description}
              </Typography>
              <Typography variant="h6" color="text.primary" sx={{ m: 2 }}>
                Duration: {yoga.duration} Minutes
              </Typography>
            </Container>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
