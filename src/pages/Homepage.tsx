import Banner from "../components/Banner";
import Footer from "../components/Footer";
import YogaCard from "../components/YogaCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";

interface HomepageProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export interface User {
  name: string;
  email: string;
  password: string;
  birthday: Date;
}

export type Yoga = {
  id: string;
  title: string;
  instructor: string;
  handle: string;
  duration: number;
  intensity: string;
  description: string;
  thumbnailimageurl: string;
  videoembeddedurl: string;
};

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
      <Header user={user} setUser={setUser} />
      <Banner />
      <SearchBar yogas={yogas} />
      <YogaCard yogas={yogas} />
      <Footer />
    </>
  );
}
