import React, { Component } from "react";
import styles from "./Search.module.scss";

type TProps = {
  searchInput: string;
  updateSearchInput: (value: string) => void;
};

class Search extends Component<TProps> {
  input: React.RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);
    this.input = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { updateSearchInput } = this.props;
    const value: string = this.input.current!.value.trim();

    localStorage.setItem("searchInput", value);
    updateSearchInput(value);
  }

  render() {
    const { searchInput } = this.props;

    return (
      <div>
        <input
          className={styles.input}
          placeholder={searchInput || "Search..."}
          type="text"
          aria-label="search"
          ref={this.input}
        />
        <button
          type="submit"
          onClick={this.handleClick}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
