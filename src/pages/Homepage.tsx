import.meta.env.VITE_AIRTABLE_API_KEY;
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import type { Yoga } from "../../src/Type";
import axios from "axios";

export default function Homepage() {
  const [yogas, setYogas] = useState<Yoga[]>([]);

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => setYogas(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Banner />
      <SearchBar yogas={yogas} />
    </> 
  );
}
