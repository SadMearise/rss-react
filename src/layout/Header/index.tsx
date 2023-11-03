import React, { FC } from "react";
import { SetURLSearchParams } from "react-router-dom";
import Container from "../../components/Container";
import styles from "./Header.module.scss";
import Search from "../../components/Search";
import TriggerErrorButton from "../../components/TriggerErrorButton";

type TProps = {
  searchInput: string;
  updateSearchInput: (value: string) => void;
  updateSearchParams: SetURLSearchParams;
  updatePage: (value: React.SetStateAction<number>) => void;
};

const Header: FC<TProps> = ({ searchInput, updateSearchInput, updateSearchParams, updatePage }) => (
  <header className={styles.header}>
    <Container>
      <div className={styles.header__wrapper}>
        <Search
          searchInput={searchInput}
          updateSearchInput={updateSearchInput}
          updatePage={updatePage}
          updateSearchParams={updateSearchParams}
        />
        <TriggerErrorButton />
      </div>
    </Container>
  </header>
);

export default Header;
