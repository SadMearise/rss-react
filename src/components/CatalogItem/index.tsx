import { FC } from "react";
import classNames from "classnames";
import styles from "./CatalogItem.module.scss";
import { IProduct } from "../../models/interfaces";

type TProps = {
  product: IProduct;
};

const CatalogItem: FC<TProps> = ({ product }) => (
  <div className={styles.item}>
    <div className={styles.item__wrapper}>
      <span className={classNames(styles.item__text, styles.item__text_title)}>{product.title}</span>
      <span className={styles.item__text}>
        Description:&nbsp;
        {product.description}
      </span>
      <span className={styles.item__text}>
        Price:&nbsp;
        {product.price}
      </span>
    </div>
  </div>
);

export default CatalogItem;
