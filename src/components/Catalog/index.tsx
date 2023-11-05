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
import Details from "../Details";
import fetchProductById from "../../services/fetchProductById";

type TProps = {
  searchInput: string;
  updateSearchParams: SetURLSearchParams;
  page: number;
  updatePage: (value: React.SetStateAction<number>) => void;
  searchParams: URLSearchParams;
};

const Catalog: FC<TProps> = ({ searchInput, updateSearchParams, page, updatePage, searchParams }) => {
  const [id, setId] = useState(Number(searchParams.get("details")));
  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [countPages, setCountPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(20);

  const updateProduct: (product: IProduct | null) => void = (product) => {
    if (product) {
      setProduct(product);
    }
  };
  const updateDetailsLoading = (value: boolean) => {
    setIsLoadingDetails(value);
  };

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

  useEffect(() => {
    const getProduct = async () => {
      const fetchProduct = await fetchProductById(id);

      setProduct(fetchProduct);
    };

    getProduct();
  }, [id]);

  const isPagination = () => {
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

  const isCatalogItems = () => {
    if (countPages === 0) {
      return <div>Content not found</div>;
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
                updateSearchParams={updateSearchParams}
                page={page}
                updateId={setId}
                key={product.id}
                product={product}
                updateProduct={updateProduct}
                updateDetailsLoading={updateDetailsLoading}
              />
            ))}
        </div>
        {isPagination()}
      </>
    );
  };

  return (
    <main>
      <section className={styles.section}>
        <Container>{isLoading ? <div>Loading...</div> : isCatalogItems()}</Container>
      </section>
      {!!id && !!products.length && (
        <Details
          updateSearchParams={updateSearchParams}
          page={page}
          product={product}
          updateId={setId}
          isLoading={isLoadingDetails}
        />
      )}
    </main>
  );
};

export default Catalog;
