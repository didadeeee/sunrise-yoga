import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FilteredYogas from "./FilteredYogas";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Yoga } from "../../src/Type";

type YogaCardProps = {
  yogas: Yoga[];
};

const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function SearchBar({ yogas }: YogaCardProps) {
  const [filters, setFilters] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const instructors = [...new Set(yogas.map((yoga) => yoga.instructor))];
  const levels = [...new Set(yogas.map((yoga) => yoga.intensity))];
  const durations = [...new Set(yogas.map((yoga) => yoga.duration))].sort();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const duration = searchParams.get("duration");
    const intensity = searchParams.get("intensity");
    if (duration && intensity)
      fetch(`/api/yogas?duration=${duration}&intensity=${intensity}`, {
        signal,
      })
        .then((res) => res.json())
        .then((data) => setFilters(data.filters));

    //* useEffect return -> cleanup function
    return () => {
      console.log("unmount");
      controller.abort();
    };
  }, [searchParams]);

  const filteredYogas = yogas.filter(
    (yoga) =>
      (searchParams.get("duration") === "" ||
        yoga.duration === Number(searchParams.get("duration"))) &&
      (searchParams.get("intensity") === "" ||
        yoga.intensity === searchParams.get("intensity"))
  );

  const handleDuration = (event: any) => {
    const duration = event.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), duration });
  };

  const handleIntensity = (event: any) => {
    const intensity = event.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), intensity });
  };

  const handleInstructor = (event: any) => {
    const instructor = event.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), instructor });
  };

  const handlePage = (event: any) => {
    const page = event.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", p: 0.2, mt: 3 }}>
        <FormControl
          sx={{
            m: 2,
            minWidth: 100,
            display: "inline",
            "& > *": { mr: 2, mb: 2 },
          }}
        >
          <FormControl sx={{ m: 2, minWidth: 100, display: "inline" }}>
            <InputLabel shrink={true} id="demo-simple-select-autowidth-label">
              Duration
            </InputLabel>
            <Select
              sx={{ minWidth: "100px" }}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={searchParams.get("duration")}
              onChange={handleDuration}
              autoWidth
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
            <InputLabel shrink={true} id="demo-simple-select-autowidth-label">
              Intensity
            </InputLabel>
            <Select
              sx={{ minWidth: "150px" }}
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
            <InputLabel shrink={true} id="demo-simple-select-autowidth-label">
              Instructor
            </InputLabel>
            <Select
              sx={{ minWidth: "100px" }}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={searchParams.get("instructor")}
              onChange={handleInstructor}
              autoWidth
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

          <FormControl sx={{ m: 2, minWidth: 100, display: "inline" }}>
            <InputLabel shrink={true} id="demo-simple-select-autowidth-label">
              Page
            </InputLabel>
            <Select
              sx={{ minWidth: "100px" }}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={searchParams.get("page")}
              onChange={handlePage}
              autoWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem key={page} value={page}>
                  {page}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormControl>
      </Box>
      <FilteredYogas yogas={yogas} filteredYogas={filteredYogas} />
    </>
  );
}
