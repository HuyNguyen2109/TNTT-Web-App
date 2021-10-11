import React from "react";
import styles from "components/basic/PageLoading/LoadingPage.module.scss";
import classNames from "classnames";
import { Container } from "@material-ui/core";

export default class LoadingPage extends React.Component {
  render = () => {
    const { className } = this.props;
    const cn = classNames(styles.loadingContainer, className);

    return (
      <Container disableGutters className={cn} maxWidth={false}>
        <div className={styles.bg}>
          <img
            alt="Loading logo"
            src="public/images/logo.png"
            className={styles.loadingImg}
          />
          <div className={styles.loader}>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 3 }}></span>
            <span style={{ "--i": 4 }}></span>
            <span style={{ "--i": 5 }}></span>
            <span style={{ "--i": 6 }}></span>
            <span style={{ "--i": 7 }}></span>
            <span style={{ "--i": 8 }}></span>
            <span style={{ "--i": 9 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 15 }}></span>
            <span style={{ "--i": 16 }}></span>
            <span style={{ "--i": 17 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 19 }}></span>
            <span style={{ "--i": 20 }}></span>
          </div>
        </div>
      </Container>
    );
  };
}
