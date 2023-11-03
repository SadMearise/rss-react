import React, { FC } from "react";
import styles from "./Limit.module.scss";

type TProps = {
  limit: number;
  updateLimit: React.Dispatch<React.SetStateAction<number>>;
};

const Limit: FC<TProps> = ({ limit, updateLimit }) => {
  const select: React.RefObject<HTMLSelectElement> = React.createRef();
  const steps = [10, 20, 30, 40, 50];

  const handleSelect = () => updateLimit(Number(select.current?.value));

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
