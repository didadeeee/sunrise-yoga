import.meta.env.VITE_AIRTABLE_API_KEY;
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import type { Yoga } from "../pages/Homepage";

type YogaCardProps = {
  yogas: Yoga[];
};

export default function YogaCard({ yogas }: YogaCardProps) {
  return (
    <>
      <Container sx={{ py: 6 }} maxWidth="xl">
        <Grid container spacing={4}>
          {yogas.map((yoga) => (
            <Grid item key={yoga.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <BookmarkIcon></BookmarkIcon>

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
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    {yoga.title} by {yoga.instructor}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                    {yoga.duration} minutes
                  </Typography>
                  <Button size="small">{yoga.intensity}</Button>
                  <Typography variant="subtitle1">
                    {yoga.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
