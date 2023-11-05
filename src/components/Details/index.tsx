import React, { FC } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./Details.module.scss";
import { IProduct } from "../../models/interfaces";
import CloseIcon from "../CloseIcon";

type TProps = {
  product: IProduct | null;
  updateSearchParams: SetURLSearchParams;
  page: number;
  updateId: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

const Details: FC<TProps> = ({ product, updateSearchParams, page, updateId, isLoading }) => {
  const handleClick = () => {
    updateId(0);
    updateSearchParams({ page: String(page) });
  };

  return (
    <div className={styles.details}>
      <button
        type="button"
        className={styles.details__background}
        onClick={handleClick}
        aria-label="close details"
      />
      <div className={styles.details__body}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className={styles.details__content}>
              <span className={styles["details__content-text_title"]}>{product?.title}</span>
              <span className={styles["details__content-text"]}>
                Description:&nbsp;
                {product?.description}
              </span>
              <span className={styles["details__content-text"]}>
                Price:&nbsp;
                {product?.price}
              </span>
            </div>
            <div className={styles.details__icon}>
              <CloseIcon onClick={handleClick} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
