import React, { FC } from "react";
import classNames from "classnames";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./CatalogItem.module.scss";
import { IProduct } from "../../models/interfaces";
import fetchProductById from "../../services/fetchProductById";

type TProps = {
  product: IProduct;
  updateSearchParams: SetURLSearchParams;
  page: number;
  updateId: React.Dispatch<React.SetStateAction<number>>;
  updateProduct: (product: IProduct | null) => void;
  updateDetailsLoading: (value: boolean) => void;
};

const CatalogItem: FC<TProps> = ({
  product,
  updateSearchParams,
  page,
  updateId,
  updateProduct,
  updateDetailsLoading,
}) => {
  const handleOpenDetails = async () => {
    updateId(product.id);
    updateSearchParams({ page: String(page), details: String(product.id) });

    updateDetailsLoading(true);
    const fetchUpdatedProduct = await fetchProductById(product.id);
    updateProduct(fetchUpdatedProduct);

    updateDetailsLoading(false);
  };

  return (
    <div className={styles.item}>
      <div className={styles.item__wrapper}>
        <button
          type="button"
          onClick={handleOpenDetails}
          className={styles["item__body-button"]}
        >
          <span className={classNames(styles.item__text, styles.item__text_title)}>{product.title}</span>
          <span className={styles.item__text}>
            Description:&nbsp;
            {product.description}
          </span>
          <span className={styles.item__text}>
            Price:&nbsp;
            {product.price}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CatalogItem;
