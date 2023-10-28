import { Component } from "react";
import Header from "../../layout/Header";
import Catalog from "../../components/Catalog";

class HomePage extends Component {
  state = {
    searchInput: localStorage.getItem("searchInput") || "",
  };

  updateSearchInput = (value: string) => {
    this.setState({ searchInput: value });
  };

  render() {
    const { searchInput } = this.state;

    return (
      <>
        <Header
          searchInput={searchInput}
          updateSearchInput={this.updateSearchInput}
        />
        <Catalog searchInput={searchInput} />
      </>
    );
  }
}

export default HomePage;
