import Banner from "../components/Banner";
import Footer from "../components/Footer";
import YogaCard from "../components/YogaCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

interface HomepageProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

interface User {
  name: string;
  email: string;
  password: string;
  birthday: Date;
}

export default function Homepage({ user, setUser }: HomepageProps) {
  // useEffect(() => {
  //   fetch("https://dummyjson.com/users")
  //     .then((res) => res.json())
  //     .then((users) => setUsers(users));
  // }, []);

  // console.log(users);

  return (
    <>
      <Header user={user} setUser={setUser} />
      <Banner />
      <SearchBar />
      <YogaCard />
      <Footer />
    </>
  );
}
