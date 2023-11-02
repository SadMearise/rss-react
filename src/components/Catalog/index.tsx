import { FC, useState, useEffect, useCallback } from "react";
import Container from "../Container";
import fetchData from "../../services/fetchLocations.service";
import CatalogItem from "../CatalogItem";
import styles from "./Catalog.module.scss";
import { ILocation } from "../../models/interfaces";

type TProps = {
  searchInput: string;
};

const Catalog: FC<TProps> = ({ searchInput }) => {
  const [locations, setLocations] = useState<ILocation[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const page = 1;

  const updateLocations: () => Promise<void> = useCallback(async () => {
    setIsLoading(true);

    const locations = await fetchData(page, searchInput);

    setIsLoading(false);
    setLocations(locations?.results);
  }, [searchInput]);

  useEffect(() => {
    updateLocations();
  }, [updateLocations]);

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
};

export default Catalog;
