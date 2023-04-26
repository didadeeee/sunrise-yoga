## **Sunrise Yoga**

<br/>

### **App Description**

<br/>

#### **Getting Started** : https://sunrise-yoga.onrender.com/

<br/>
Sunrise Yoga is an app that allow users to access yoga tutorials through search and bookmark features based on their preferences. The app also leverages Nodemailer, Formik, and Yup to enhance the user experience and ensure a seamless, userfriendly interface.
<br/>
<br/>

### **User Stories**

As a visitor, I want to view all the yoga guide on the homepage.<br/>
As a visitor, I want to view individual yoga tutorials.<br/>
As a visitor, I want to search and filter the yoga tutorials according to my preferences.<br/>
As a user, I want to receive welcome promotion through email.<br/>
As a user, I want to bookmark my favorite yoga tutorials.<br/>
As a user, I want to update my user details.<br/>

### **Model**<br/>

![model](/public/images/model.png "Model")

### **REST CRUD Chart(User)**

| Method | Path                     | Purpose                      |
| ------ | ------------------------ | ---------------------------- |
| get    | /api/users/signup        | R View Sign up Page          |
| post   | /api/users/signup        | C Sign up User               |
| post   | /api/users/signupemail   | C Send Sign Up Email         |
| get    | /api/users/login         | R View Login Page            |
| post   | /api/users/login         | C Login User (Authorisation) |
| get    | /api/users/account       | R View Account Page          |
| get    | /api/users/edit          | R View Edit Account Page     |
| put    | /api/users/edit          | U Edit User Details          |
| get    | /api/users/checkbookmark | R Check Bookmark Status      |
| get    | /api/users/bookmarks     | R Bookmark Tutorials         |

<br/>

### **REST CRUD Chart(Yoga)**

| Method | Path                                   | Purpose                          |
| ------ | -------------------------------------- | -------------------------------- |
| get    | /api/                                  | R View All Yoga Tutorials        |
| get    | /api/yogas/:id                         | R View Individual Yoga Tutorial  |
| get    | /api/yogas/?duration=&intensity=&name= | R Search & Filter Yoga Tutorials |
| get    | /api/users/bookmarks                   | R View Bookmark Tutorials        |
| post   | /api/yogas/:id                         | C Bookmark Yoga Tutorials        |
| delete | /api/yogas/:id                         | D Unbookmark Yoga Tutorials      |
| get    | /\*                                    | R Page Do Not Exist              |

<br/>

## **Screenshots**

### **Homepage**</br>

![homepage](/public/images/homepage.png "Home page")

### **Sign Up Account**</br>

![sign up account](/public/images/signupaccount.png "Sign Up Account")

### **Account Detail**</br>

![account details](/public/images/accountdetails.png "Account Details")

### **Sign Up Email**</br>

![sign up email](/public/images/email.png "Sign Up Email")

### **Filter Function**</br>

![filter](/public/images/filterfunctions.png "Filter Function")

### **Yoga Page**</br>

![yogapage](/public/images/yogapage.png "Yoga Page")

### **Technology Stack: PERN (TypeScript)**

| **Front End** | **Back End**      | **Database** | **Deployment** |
| ------------- | ----------------- | ------------ | -------------- |
| React (MUI)   | Node.JS & Express | PostgreSQL   | Render         |

### **Technologies & Tools Used**

1. React
2. React Material UI
3. Node.js
4. Express Framework
5. PostgreSQL
6. JavaScript
7. TypeScript
8. Render deployment
9. Git & GitHub
10. Other libraries: Dayjs, Yup, Formik, Nodemailer, Jsonwebtoken

### **Future Plan**

1. Pagination
2. Appointment Booking
3. Increased Type of Contents
   </br>

## **Biggest Challenges**

- Finalising PostgreSQL Tables

```sql
CREATE TABLE yoga (
  id SERIAL PRIMARY KEY UNIQUE,
  title VARCHAR NOT NULL,
  intensity VARCHAR NOT NULL,
  duration INT NOT NULL,
  thumbnailimageurl VARCHAR UNIQUE NOT NULL,
  videoembeddedurl VARCHAR UNIQUE NOT NULL,
  description VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY UNIQUE,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  birthday DATE NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usersyoga (
  id SERIAL PRIMARY KEY,
  users_id INT,
  FOREIGN KEY (users_id) REFERENCES users(id),
  yoga_id INT,
  FOREIGN KEY (yoga_id) REFERENCES yoga(id)
);
```

- Validate input with Formik & Yup

```js
const validateSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("This field is required"),
  birthday: Yup.date().required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .min(5, "Pasword must be 5 or more characters")
    .matches(/\d/, "Password should contain at least one number")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      "Password ahould contain at least one uppercase and lowercase character"
    )
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      "Password should contain at least one special character"
    ),
});

const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    birthday: "",
    password: "",
  },
  validationSchema: validateSchema,
  onSubmit: (values, { resetForm }) => {
    console.log(values);
    setTimeout(() => {
      resetForm();
    }, 1000 * 2);
  },
});

  return (
    <Box className="SignUpFormContainer">
      <form autoComplete="off" onSubmit={handleSubmit} className="SignUpForm">
        <Typography variant="h5">Sign Up a new Account </Typography>
        <Box className="R1">
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="text"
            label="Name"
            name="name"
            value={formik.values.name}
            helperText={formik.errors.name ? formik.errors.name : ""}
            InputLabelProps={{
              style: { color: "#000000" },
            }}
            onChange={formik.handleChange}
            className="my-textfield"
            required
          />
        </Box>
```

- Filter yoga tutorials according to filters

```tsx
export default function SearchBar({ yogas }: YogaCardProps) {
  const [filters, setFilters] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const durations = [...new Set(yogas.map((yoga) => yoga.duration))].sort();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const duration = searchParams.get("duration");

    if (duration || intensity || name)
      fetch(
        `/api/yogas?duration=${duration}&intensity=${intensity}&name=${name}`,
        {
          signal,
        }
      )
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
      searchParams.get("duration") === "" ||
      yoga.duration === Number(searchParams.get("duration"))
  );

  const handleDuration = (event: any) => {
    const duration = event.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), duration });
  };

  return (
    <>
      <Box sx={{ bgcolor: "background.paper", p: 0.2, mt: 1 }}>
        <FormControl
          sx={{
            m: 1,
            minWidth: 100,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            "& > *": { mx: 1, my: 2 },
          }}
        >
          <FormControl sx={{ m: 2, minWidth: 100, display: "inline" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
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
        </FormControl>
      </Box>
      <FilteredYogas yogas={yogas} filteredYogas={filteredYogas} />
    </>
  );
}
```

- Check bookmark status during initial fetch

```tsx
const [isBookmarked, setIsBookmarked] = useState(false);
const { id } = useParams<{ id?: string }>();

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  const fetchUser = async () => {
    try {
      const response = await fetch("/api/users/checkbookmark", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userYoga = await response.json();
      if (userYoga.length === 0) {
        setIsBookmarked(false);
      }
      const isBookmarked = userYoga.some(
        (item: UserYoga) => item.yoga_id === Number(id)
      );
      setUserYoga(userYoga);
      setIsBookmarked(isBookmarked);
    } catch (error) {
      console.error(error);
    }
  };
  fetchUser();
}, [id, setIsBookmarked]);
```

- Retrieve data from database

```js
const showBookmarkYogas = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const users_id = decodedToken.user.id;
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return res.status(500).json({ message: "Error acquiring client" });
    }
    client.query(
      `SELECT *FROM yoga LEFT JOIN usersyoga ON yoga.id = usersyoga.yoga_id LEFT JOIN users ON usersyoga.users_id = users.id WHERE users.id = '${users_id}'`,
      (err, result) => {
        if (err) {
          console.error("Error executing query", err.stack);
          return res.status(500).json({ message: "Error executing query" });
        }
        res.json(result.rows);
        client.release();
      }
    );
  });
};
```

- Client side routing

```ts
 {user ? <UserHeader setUser={setUser} /> : <Header />}
      <CssBaseline />
      <Routes>
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/users/login" element={<Login setUser={setUser} />} />
        <Route path="/users/account" element={<AccountPage user={user} />} />
        <Route
          path="/users/edit"
          element={<EditAccount user={user} setUser={setUser} />}
        />
        <Route path="/users/bookmarks" element={<YogaBookmarksPage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/yogas/:id" element={<YogaPage />} />
        <Route path="/*" element={<PageNotExist />} />
      </Routes>
      <Footer />
```

## **Key Learnings**

1. Getting familiar with api fetch + route + controller functions
2. Learning to use external libraries - Formik, Yup, MUI, Dayjs, Nodemailer
3. Debugging issues patiently through tools such as Beekeeper & Insomnia
4. Key Benefits of TypeScript

- Type annotations improve code maintainability and prevent errors
- Better developer experience with code completion and refactoring tools
- Supports modern ECMAScript features and provides better browser compatibility
- Better tooling and integration with popular frameworks
- Enables easier code sharing and collaboration between teams
- Offers better scalability and maintainability for large-scale applications
- Provides functional programming features
- Provides better integration with interfaces and generics

5. Learning the difference between MongoDB and SQL

| Difference             | PostgreSQL                                                                | MongoDB                                                                 |
| ---------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Database Type          | Relational database management system                                     | NoSQL document-oriented database                                        |
| Schema                 | Strict schema requirements                                                | Flexible schema with dynamic document structures                        |
| Data Storage           | Tables with predefined schema                                             | JSON-like documents without a fixed schema                              |
| Query Language         | SQL (Structured Query Language)                                           | MongoDB Query Language (MQL)                                            |
| Joins and Transactions | Supports joins and complex transactions                                   | Does not support joins and complex transactions                         |
| Use Case               | Better suited for complex queries and analytical applications             | Better suited for rapid development and scalability                     |
| Performance            | Offers better performance for large datasets and high-volume transactions | Offers better performance for read-heavy workloads and high concurrency |
| Ecosystem              | Has strong community support and a rich set of add-ons and extensions     | Has a less mature ecosystem with fewer add-ons and extensions           |

</br>

## **Q&A**

</br>

## **Resources**

Inspirations: <a href="https://mindline.sg/youth/home">Mindline</a> | <a href="https://adplist.org/explore">adplist</a> | <a href="https://www.doyogawithme.com/yoga-classes">Do Yoga with Me</a> | <a href="https://www.airbnb.com.sg/">Airbnb</a> | <a href="https://www.headspace.com/radioheadspace">Headspace (Free Trial Available)</a><br/>
MUI Template: <a href="https://mui.com/material-ui/getting-started/templates/album/">Material UI</a><br/>
MUI Theme Creator: <a href="https://zenoo.github.io/mui-theme-creator/">zenoo</a><br/>
ERD Diagram: <a href="https://drawsql.app/">drawSQL</a><br/>
Quote API: <a href="https://api.goprogram.ai/inspiration/docs/">Inspiration</a></br>
Airtable API: <a href="https://airtable.com/developers/web/api/introduction">Inspiration</a></br>
Formik & Yup Tutorial: <a href="https://blog.shahednasser.com/how-to-create-and-validate-forms-in-react-using-formik-and-yup/">Shahed Nasser</a><br/>
SQL Tutorial (freeCodeCamp): <a href="https://www.youtube.com/watch?v=qw--VYLpxG4&t=11817s&ab_channel=freeCodeCamp.org">Amigos Code</a> | <a href="https://www.youtube.com/watch?v=HXV3zeQKqGY&t=11400s&ab_channel=freeCodeCamp.org">Giraffe Academy</a><br/>
Presentation Slide: <a href="https://docs.google.com/presentation/d/1nJLZi4Ax_p5ikjxHTQmwlBLoFtt0W8XlPaLV6UMrM0E/edit?usp=sharing">Google Slides</a><br/>
