import React, { Component } from "react";
import Container from "../../components/Container";
import styles from "./header.module.scss";
import Search from "../../components/Search";
import TriggerErrorButton from "../../components/TriggerErrorButton";

type TProps = {
  searchInput: string;
  updateSearchInput: (value: string) => void;
};

class Header extends Component<TProps> {
  render() {
    const { searchInput, updateSearchInput } = this.props;

    return (
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
  }
}

export default Header;
