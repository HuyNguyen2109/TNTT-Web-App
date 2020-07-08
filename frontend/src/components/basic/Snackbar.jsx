import React from "react";
import { Snackbar, IconButton, Typography, Toolbar } from "@material-ui/core";
import {
  InfoOutlined,
  ReportProblemOutlined,
  ErrorOutlineOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@material-ui/icons";
import classNames from "classnames";
import styles from "./Snackbar.module.scss";

export default class CustomizedSnackbar extends React.Component {
  renderIcon = (type) => {
    switch (type) {
      case "info":
        return (
          <InfoOutlined className={classNames(styles.icon, styles.info)} />
        );
      case "error":
        return (
          <ErrorOutlineOutlined className={classNames(styles.icon, styles.error)} />
        );
      case "success":
        return (
          <CheckOutlined className={classNames(styles.icon, styles.success)} />
        );
      case "warning":
        return (
          <ReportProblemOutlined className={classNames(styles.icon, styles.warning)} />
        );
      default:
        return null;
    }
  };

  render = () => {
    const { type, className, message, ...props } = this.props;
    const cn = classNames(styles.Snackbar, className);

    return (
      <Snackbar
        {...props}
        classes={{ root: cn }}
        autoHideDuration={6000}
        ContentProps={{
          classes: { root: styles.content },
          message: (
            <Toolbar className={styles.message}>
              {this.renderIcon(type)}
              <div style={{ marginLeft: "10px" }} />
              <Typography variant="subtitle1">{message}</Typography>
            </Toolbar>
          ),
        }}
        action={
          <IconButton
            size="small"
            aria-label="Close"
            onClick={() => this.props.onClose()}
            className={styles.close}
          >
            <CloseOutlined fontSize="medium" />
          </IconButton>
        }
        transitionDuration={250}
      />
    );
  };
}
