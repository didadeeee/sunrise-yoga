import axios from "axios";
import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import type { Yoga } from "../../src/Type";


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
