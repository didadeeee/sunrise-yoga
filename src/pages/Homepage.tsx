import Banner from "../components/Banner";
import Footer from "../components/Footer";
import YogaCard from "../components/YogaCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
// import { useState, useEffect } from "react";

export default function Homepage() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("https://dummyjson.com/users")
  //     .then((res) => res.json())
  //     .then((users) => setUsers(users));
  // }, []);

  // console.log(users);


  return (
    <>
      <Header />
      <Banner />
      <SearchBar />
      <YogaCard />
      <Footer />
    </>
  );
}
