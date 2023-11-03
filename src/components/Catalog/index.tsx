import React, { FC, useState, useEffect, useCallback } from "react";
import { SetURLSearchParams } from "react-router-dom";
import Container from "../Container";
import fetchProducts from "../../services/fetchProducts.service";
import CatalogItem from "../CatalogItem";
import styles from "./Catalog.module.scss";
import Pagination from "../Pagination";
import { IProduct } from "../../models/interfaces";
import Limit from "../Limit";
import { getCountPages, getSkip } from "../../utils/helpers";

type TProps = {
  searchInput: string;
  updateSearchParams: SetURLSearchParams;
  page: number;
  updatePage: (value: React.SetStateAction<number>) => void;
};

const Catalog: FC<TProps> = ({ searchInput, updateSearchParams, page, updatePage }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countPages, setCountPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(20);

  const updateData: () => Promise<void> = useCallback(async () => {
    setIsLoading(true);

    const skip = (page && getSkip(limit, page)) || getSkip(limit, page);
    const results = await fetchProducts(skip, limit, searchInput);

    if (results) {
      const { products, total } = results;
      setProducts(products);

      setTotalItems(total);
      setCountPages(getCountPages(total, limit));
    } else {
      setTotalItems(0);
    }

    setIsLoading(false);
  }, [limit, searchInput, page]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  const pagination = () => {
    if (totalItems > limit) {
      return (
        <Pagination
          page={page}
          updatePage={updatePage}
          updateSearchParams={updateSearchParams}
          countPages={countPages}
        />
      );
    }

    return "";
  };

  const catalogItems = () => {
    if (countPages === 0) {
      return <h2>Content not found</h2>;
    }

    return (
      <>
        <Limit
          limit={limit}
          updateLimit={setLimit}
          updateSearchParams={updateSearchParams}
          updatePage={updatePage}
        />
        <div className={styles.items}>
          {products &&
            products.length &&
            products.map((product) => (
              <CatalogItem
                key={product.id}
                product={product}
              />
            ))}
        </div>
        {pagination()}
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
