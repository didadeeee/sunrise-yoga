import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Yoga } from "../Type";
import ReactPlayer from "react-player";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
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

  return (
    <>
      {yoga && (
        <>
          <Typography variant="h4" component="h2">
            {yoga.title}
          </Typography>
          <Box className="YogaPage">
            <Grid container spacing={2}>
              <Grid xs={12}>
                <ReactPlayer
                  url={yoga.videoembeddedurl}
                  controls
                  width="100%"
                  aspectRatio="16:9"
                />
                <Typography variant="body1" color="text.primary">
                  {yoga.description}
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  Duration:{yoga.duration}
                </Typography>
                <Box className="YogaPageButton">
                  <Button variant="outlined">
                    <Link to="" style={{ textDecoration: "none" }}>
                      Bookmark
                    </Link>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}
