import React, { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../layout/Header";
import Catalog from "../../components/Catalog";

const HomePage: FC = () => {
  const [searchInput, setSearchInput] = useState(localStorage.getItem("searchInput") || "");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") || "") || 1);

  const updateSearchInput = (value: string) => {
    setSearchInput(value);
  };

  const updatePage = (value: React.SetStateAction<number>) => {
    setPage(value);
  };

  return (
    <>
      <Header
        searchInput={searchInput}
        updateSearchInput={updateSearchInput}
        updateSearchParams={setSearchParams}
        updatePage={updatePage}
      />
      <Catalog
        searchInput={searchInput}
        updateSearchParams={setSearchParams}
        page={page}
        updatePage={updatePage}
      />
    </>
  );
};

export default HomePage;
