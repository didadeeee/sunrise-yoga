import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import type { Yoga } from "../../src/Type";

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
              <Link to={`/yogas/${yoga.id}`} style={{ textDecoration: "none" }}>
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
                      pt: "10%",
                    }}
                    image={yoga.thumbnailimageurl}
                    alt={yoga.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="subtitle1" component="h2">
                      {yoga.title} by {yoga.name}
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
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
