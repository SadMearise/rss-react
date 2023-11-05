import { FC } from "react";
import styles from "./CloseIcon.module.scss";

type TProps = {
  onClick: () => void;
};

const CloseIcon: FC<TProps> = ({ onClick }) => (
  <button
    className={styles["close-icon"]}
    onClick={onClick}
    type="button"
  >
    <span />
    <span />
  </button>
);

export default CloseIcon;
