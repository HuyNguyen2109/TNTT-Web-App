import React from "react";
import classNames from "classnames";
import styles from './Loading.module.scss';

export default class Loading extends React.Component {
  render = () => {
    const { className } = this.props;
    const cn = classNames(styles.loading, className);

    return (
      <div className={cn}>
        <div className={styles.bounce1}></div>
        <div className={styles.bounce2}></div>
        <div className={styles.bounce3}></div>
      </div>
    );
  };
}
