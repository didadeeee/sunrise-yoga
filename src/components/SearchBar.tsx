import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import type { Yoga } from "../pages/Homepage";

type YogaCardProps = {
  yogas: Yoga[];
};

export default function SearchBar({ yogas }: YogaCardProps) {
  const [intensity, setIntensity] = useState("");
  const [instructor, setInstructor] = useState("");

  const handleIntensity = (event: SelectChangeEvent) => {
    setIntensity(event.target.value);
  };

  const handleInstructor = (event: SelectChangeEvent) => {
    setInstructor(event.target.value);
  };

  const instructors = [...new Set(yogas.map((yoga) => yoga.instructor))];

  return (
    <Box sx={{ bgcolor: "background.paper", p: 0.2, mt: 3 }}>
      <FormControl sx={{ m: 2, minWidth: 100, display: "inline" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Intensity
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={intensity}
          onChange={handleIntensity}
          autoWidth
          label="Intensity"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 100, display: "inline" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          instructor
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={instructor}
          onChange={handleInstructor}
          autoWidth
          label="Instructor"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {instructors.map((instructor) => (
            <MenuItem key={instructor} value={instructor}>
              {instructor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
