import React, { FC } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./Search.module.scss";

type TProps = {
  searchInput: string;
  updateSearchInput: (value: string) => void;
  updatePage: (value: React.SetStateAction<number>) => void;
  updateSearchParams: SetURLSearchParams;
};

const Search: FC<TProps> = ({ searchInput, updateSearchInput, updatePage, updateSearchParams }) => {
  const input: React.RefObject<HTMLInputElement> = React.createRef();

  const handleClick = () => {
    const value: string = input.current!.value.trim();

    localStorage.setItem("searchInput", value);
    updateSearchParams({ page: String(1) });
    updatePage(1);
    updateSearchInput(value);
  };

  return (
    <div>
      <input
        className={styles.input}
        placeholder={searchInput || "Search..."}
        type="text"
        aria-label="search"
        ref={input}
      />
      <button
        type="submit"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
