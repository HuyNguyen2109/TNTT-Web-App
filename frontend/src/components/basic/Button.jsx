import React from "react";
import { Button } from "@material-ui/core";
import classNames from "classnames";
import styles from "./Button.module.scss";
import Loading from './Loading';

export default class CustomizeButton extends React.Component {
  render = () => {
    const { label, className, loading, loadingStyle, ...props } = this.props;
    const cn = classNames(styles.Button, className);

    return (
      <Button {...props} classes={{ root: cn }}>
        {loading ? (
          <Loading className={styles.loading}/>
        ) : (
          <React.Fragment>{label}</React.Fragment>
        )}
      </Button>
    );
  };
}
