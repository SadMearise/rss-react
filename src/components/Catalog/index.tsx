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
  isLoading: boolean;
};

class Catalog extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      locations: [],
      page: 1,
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.updateLocations();
  }

  componentDidUpdate(prevProps: TProps): void {
    const { searchInput } = this.props;

    if (prevProps.searchInput !== searchInput.toString()) {
      this.updateLocations();
    }
  }

  async updateLocations(): Promise<void> {
    this.setState({ isLoading: true });
    const { page } = this.state;
    const { searchInput } = this.props;

    const locations = await fetchData(page, searchInput);

    this.setState({ locations: locations?.results, isLoading: false });
  }

  render() {
    const { locations, isLoading } = this.state;

    return (
      <section className={styles.section}>
        <Container>
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
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
          )}
        </Container>
      </section>
    );
  }
}

export default Catalog;
