import _ from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(
      `https://dummyjson.com/products/search?q=${searchParams.get("name")}`,
      { signal }
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products));

    //* useEffect return -> cleanup function
    return () => {
      console.log("unmount");
      controller.abort();
    };
  }, [searchParams]);

  const handleSearchName = (event) => {
    const name = event.target.value;
    setSearchParams({ ...Object.fromEntries(searchParams), name });
  };

  // const handleSearchModel = (event) => {
  //   const model = event.target.value;
  //   setSearchParams({ ...Object.fromEntries(searchParams), model });
  // };

  return (
    <>
      <h1>Products</h1>
      <label>
        Name:{" "}
        <input
          name="name"
          type="search"
          value={searchParams.get("name")}
          onChange={(event) => _.debounce(handleSearchName(event), 1000)}
        />
      </label>
      {/* <label>
        Model: <input name="model" type="search" onChange={handleSearchModel} />
      </label> */}
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
