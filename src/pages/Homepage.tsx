import.meta.env.VITE_AIRTABLE_API_KEY;
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import type { Yoga } from "../../src/Type";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

export default function Homepage() {
  const [yogas, setYogas] = useState<Yoga[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api")
      .then((response) => setYogas(response.data))
      .catch((error) => console.error(error));
    setIsLoading(false);
  }, []);

  return (
    <>
      <Banner />
      {isLoading ? <LoadingSpinner /> : <SearchBar yogas={yogas} />}
    </>
  );
}
