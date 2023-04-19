import type { Yoga } from "../../src/Type";
import.meta.env.VITE_AIRTABLE_API_KEY;
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import YogaCard from "../components/YogaCard";

type FilteredYogaProps = {
  filteredYogas: Yoga[];
  yogas: Yoga[];
};

export default function FilteredYogas({
  yogas,
  filteredYogas,
}: FilteredYogaProps) {
  return (
    <>
      <br></br>
      {filteredYogas.length === 0 ? (
        <Typography variant="h5">
          No Filtered Yoga Found, Try Other Filters?
        </Typography>
      ) : (
        <></>
      )}
      {filteredYogas.length === 0 ? (
        <YogaCard yogas={yogas} />
      ) : (
        <Container sx={{ py: 6 }} maxWidth="xl">
          <Grid container spacing={4}>
            {filteredYogas.map((yoga) => (
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
                      {yoga.title}
                      {/* by {yoga.instructor} */}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="h2">
                      {yoga.duration} minutes
                    </Typography>
                    <Button size="small">{yoga.intensity}</Button>
                    <Typography variant="subtitle1">
                      {yoga.description}
                    </Typography>
                    <Link to={`/yogas/${yoga.id}`}>Learn More</Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </>
  );
}
