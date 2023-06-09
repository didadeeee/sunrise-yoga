import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import YogaCard from "../components/YogaCard";
import { Link } from "react-router-dom";
import type { Yoga } from "../Type";

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
        <>
          <Typography variant="h5">
            No Filtered Yoga Found, Try Other Filters?
          </Typography>
          <YogaCard yogas={yogas} />
        </>
      ) : (
        <Container sx={{ py: 6 }} maxWidth="xl">
          <Grid container spacing={4}>
            {filteredYogas.map((yoga) => (
              <Grid item key={yoga.id} xs={12} sm={6} md={4}>
                <Link
                  to={`/yogas/${yoga.id}`}
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
