import React, { FC } from "react";
import styles from "./Search.module.scss";

type TProps = {
  searchInput: string;
  updateSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const Search: FC<TProps> = ({ searchInput, updateSearchInput }) => {
  const input: React.RefObject<HTMLInputElement> = React.createRef();

  const handleClick = () => {
    const value: string = input.current!.value.trim();

    localStorage.setItem("searchInput", value);
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
