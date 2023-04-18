import.meta.env.VITE_AIRTABLE_API_KEY;
import YogaCard from "../components/YogaCard";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import type { Yoga, User } from "../../src/Type";
import axios from "axios";

interface HomepageProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function Homepage({ user, setUser }: HomepageProps) {
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
      <YogaCard yogas={yogas} />
    </>
  );
}
