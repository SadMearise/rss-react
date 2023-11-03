import { FC, useState } from "react";
import Header from "../../layout/Header";
import Catalog from "../../components/Catalog";

const HomePage: FC = () => {
  const [searchInput, setSearchInput] = useState(localStorage.getItem("searchInput") || "");

  const updateSearchInput = (value: string) => {
    setSearchInput(value);
  };

  return (
    <>
      <Header
        searchInput={searchInput}
        updateSearchInput={updateSearchInput}
      />
      <Catalog searchInput={searchInput} />
    </>
  );
};

export default HomePage;
