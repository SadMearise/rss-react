import React, { FC } from "react";
import Container from "../../components/Container";
import styles from "./Header.module.scss";
import Search from "../../components/Search";
import TriggerErrorButton from "../../components/TriggerErrorButton";

type TProps = {
  searchInput: string;
  updateSearchInput: (value: string) => void;
};

const Header: FC<TProps> = ({ searchInput, updateSearchInput }) => (
  <header className={styles.header}>
    <Container>
      <div className={styles.header__wrapper}>
        <Search
          searchInput={searchInput}
          updateSearchInput={updateSearchInput}
        />
        <TriggerErrorButton />
      </div>
    </Container>
  </header>
);

export default Header;
