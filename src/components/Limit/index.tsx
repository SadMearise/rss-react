import React, { FC } from "react";
import { SetURLSearchParams } from "react-router-dom";
import styles from "./Limit.module.scss";

type TProps = {
  limit: number;
  updateLimit: React.Dispatch<React.SetStateAction<number>>;
  updateSearchParams: SetURLSearchParams;
  updatePage: React.Dispatch<React.SetStateAction<number>>;
};

const Limit: FC<TProps> = ({ limit, updateLimit, updateSearchParams, updatePage }) => {
  const select: React.RefObject<HTMLSelectElement> = React.createRef();
  const steps = [10, 20, 30, 40, 50];

  const handleSelect = () => {
    updateLimit(Number(select.current?.value));
    updateSearchParams({ page: String(1) });
    updatePage(1);
  };

  return (
    <div className={styles.limit}>
      <h3 className={styles.limit__title}>Number of items:</h3>
      <select
        className={styles.limit__options}
        onChange={handleSelect}
        ref={select}
        defaultValue={limit}
      >
        {steps.map((step) => (
          <option key={step}>{step}</option>
        ))}
      </select>
    </div>
  );
};

export default Limit;
