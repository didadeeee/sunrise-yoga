import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Homepage() {
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          backgroundImage:
            "url('https://cdn.yogajournal.com/wp-content/uploads/2021/01/yoga-poses-graphic_getty-images.jpg?crop=535:301&width=1070&enable=upscale')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.8",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            ♡ Welcome to Sunrise Yoga ♡
          </Typography>
          {/* <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            What do you feel like today?
          </Typography> */}
          {/* <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="outlined">Yoga</Button>
            <Button variant="outlined">Make an Appointment</Button>
          </Stack> */}
        </Container>
      </Box>
    </main>
  );
}
