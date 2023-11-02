import { FC } from "react";
import classNames from "classnames";
import { ILocation } from "../../models/interfaces";
import styles from "./CatalogItem.module.scss";

type TProps = {
  location: ILocation;
};

const CatalogItem: FC<TProps> = ({ location }) => (
  <div className={styles.item}>
    <div className={styles.item__wrapper}>
      <span className={classNames(styles.item__text, styles.item__text_title)}>{location.name}</span>
      <span className={styles.item__text}>
        Dimension:&nbsp;
        {location.dimension}
      </span>
      <span className={styles.item__text}>
        Type:&nbsp;
        {location.type}
      </span>
    </div>
  </div>
);

export default CatalogItem;
