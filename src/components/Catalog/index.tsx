import { Component } from "react";
import Container from "../Container";
import fetchData from "../../services/fetchLocations.service";
import { ILocation } from "../../models/interfaces";
import CatalogItem from "../CatalogItem";
import styles from "./Catalog.module.scss";

type TProps = {
  searchInput: string;
};

type TState = {
  locations: ILocation[] | undefined;
  page: number;
};

class Catalog extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      locations: [],
      page: 1,
    };
  }

  componentDidMount(): void {
    this.updateLocations();
  }

  componentDidUpdate(): void {
    this.updateLocations();
  }

  async updateLocations(): Promise<void> {
    const { page } = this.state;
    const { searchInput } = this.props;

    const locations = await fetchData(page, searchInput);

    this.setState({ locations: locations?.results });
  }

  render() {
    const { locations } = this.state;

    return (
      <section className={styles.section}>
        <Container>
          <div className={styles.items}>
            {locations &&
              locations.length &&
              locations.map((location) => (
                <CatalogItem
                  key={location.id}
                  location={location}
                />
              ))}
          </div>
        </Container>
      </section>
    );
  }
}

export default Catalog;
