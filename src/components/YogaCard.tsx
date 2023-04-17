import.meta.env.VITE_AIRTABLE_API_KEY;
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import Airtable from "airtable";

type Fieldset = {
    title: string;
    instructor: string;
    handle: string;
    duration: number;
    intensity: string;
    description: string;
    thumbnailImageURL: string;
    videoEmbeddedURL: string;
}

type recordsProps = {
  id: string;
  fields: Fieldset;
}[];

const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

const base = new Airtable({
  apiKey:
    apiKey,
}).base("appTRgzORZHZWBcKn");

const table = base("Projects");

export default function YogaCard() {
  const [records, setRecords] = useState<recordsProps>([]);

  useEffect(() => {
    const getRecords = async () => {
      const fetchedRecords = await table.select().firstPage();
      const recordsArray = fetchedRecords.map((record) => ({
        id: record.id,
        fields: record.fields,
      }));
      setRecords(recordsArray);
    };

    getRecords();
  }, []);

  // Check if records is null before rendering
  if (records === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ py: 6 }} maxWidth="xl">
      <Grid container spacing={4}>
        {records.map((record) => (
          <Grid item key={record.id} xs={12} sm={6} md={4}>
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
                image={record.fields.thumbnailImageURL}
                alt={record.fields.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="subtitle1" component="h2">
                  {record.fields.title} by {record.fields.instructor}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="h2">
                  {record.fields.duration} minutes
                </Typography>
                <Button size="small">{record.fields.intensity}</Button>
                <Typography variant="subtitle1">
                  {record.fields.description}
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">View</Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
