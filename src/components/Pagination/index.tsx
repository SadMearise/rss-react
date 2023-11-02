import React, { FC } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./Pagination.module.scss";

type TProps = {
  page: number;
  updatePage: React.Dispatch<React.SetStateAction<number>>;
  updateSearchParams: SetURLSearchParams;
  countPages: number;
};

const Pagination: FC<TProps> = ({ page, updatePage, updateSearchParams, countPages }) => {
  const handlePrevButton = () => {
    if (page > 1) {
      updatePage((page) => page - 1);
      updateSearchParams({ page: String(page - 1) });
    }
  };

  const handleNextButton = () => {
    if (page < countPages) {
      updatePage((page) => page + 1);
      updateSearchParams({ page: String(page + 1) });
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={handlePrevButton}
      >
        prev
      </button>
      <span>{page}</span>
      <button
        type="button"
        onClick={handleNextButton}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
