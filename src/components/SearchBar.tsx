import * as z from "zod";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Yoga } from "../../src/Type";

type YogaCardProps = {
  yogas: Yoga[];
};

export default function SearchBar({ yogas }: YogaCardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [duration, setDuration] = useState(searchParams.get("duration"));
  const [intensity, setIntensity] = useState(searchParams.get("intensity"));
  const [instructor, setInstructor] = useState(searchParams.get("instructor"));
  const page = searchParams.get("page") || 0;

  // const res = useFetch(query ? `/search/${query}` : "/");

  const instructors = [...new Set(yogas.map((yoga) => yoga.instructor))];
  const levels = [...new Set(yogas.map((yoga) => yoga.intensity))];
  const durations = [...new Set(yogas.map((yoga) => yoga.duration))].sort();

  const handleDuration = (event: any) => {
    const newDuration = event.target.value;
    setSearchParams({
      ...searchParams,
      duration: newDuration,
    });
    console.log(event.target.value);
  };

  const handleIntensity = (event: any) => {
    const newIntensity = event.target.value;
    setSearchParams({
      ...searchParams,
      intensity: newIntensity,
    });
    console.log(event.target.value);
  };

  const handleInstructor = (event: any) => {
    const newInstructor = event.target.value;
    setSearchParams({
      ...searchParams,
      instructor: newInstructor,
    });
    console.log(event.target.value);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", p: 0.2, mt: 3 }}>
      <FormControl sx={{ m: 2, minWidth: 100, display: "inline" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Duration
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={searchParams.get("duration")}
          onChange={handleDuration}
          autoWidth
          label="Duration"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {durations.map((duration) => (
            <MenuItem key={duration} value={duration}>
              {duration}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 100, display: "inline" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Intensity
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={searchParams.get("intensity")}
          onChange={handleIntensity}
          autoWidth
          label="Intensity"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 100, display: "inline" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          instructor
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={searchParams.get("instructor")}
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
