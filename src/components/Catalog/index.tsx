import { FC, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../Container";
import fetchData from "../../services/fetchLocations.service";
import CatalogItem from "../CatalogItem";
import styles from "./Catalog.module.scss";
import { ILocation } from "../../models/interfaces";
import Pagination from "../Pagination";

type TProps = {
  searchInput: string;
};

const Catalog: FC<TProps> = ({ searchInput }) => {
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countPages, setCountPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = searchParams.get("page") || "";
  const [page, setPage] = useState(Number(pageQuery) || 1);

  const updateLocations: () => Promise<void> = useCallback(async () => {
    setIsLoading(true);

    const locations = await fetchData(pageQuery || String(page), searchInput);

    if (locations) {
      const { results, info } = locations;

      setLocations(results);

      if (info) {
        setCountPages(info.pages);
      } else {
        setCountPages(0);
      }
    }

    setIsLoading(false);
  }, [pageQuery, page, searchInput]);

  useEffect(() => {
    updateLocations();
  }, [updateLocations]);

  const catalogItems = () => {
    if (countPages === 0) {
      return <h2>Content not found</h2>;
    }

    return (
      <>
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
        <Pagination
          page={page}
          updatePage={setPage}
          updateSearchParams={setSearchParams}
          countPages={countPages}
        />
      </>
    );
  };

  return (
    <section className={styles.section}>
      <Container>{isLoading ? <h2>Loading...</h2> : catalogItems()}</Container>
    </section>
  );
};

export default Catalog;
