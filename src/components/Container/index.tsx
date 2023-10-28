import { ReactNode, Component } from "react";
import styles from "./Container.module.scss";

type TProps = {
  children: ReactNode;
};

class Container extends Component<TProps> {
  render() {
    const { children } = this.props;

    return <div className={styles.container}>{children}</div>;
  }
}

export default Container;
