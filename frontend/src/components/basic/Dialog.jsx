import React from "react";
import classNames from "classnames";
import {
  Dialog,
  useMediaQuery,
  DialogTitle,
  Toolbar,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import styles from "./Dialog.module.scss";
import { CloseOutlined } from "@material-ui/icons";

export default class CustomizedDialog extends React.Component {
  render = () => {
    const {
      className,
      icon,
      open,
      title,
      content,
      action,
      handleClose,
    } = this.props;
    const fullScreen = useMediaQuery("(min-width: 450px)");
    const cn = classNames(styles.Dialog, className);

    return (
      <Dialog
        classes={{ root: cn, paper: styles.paper }}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle classes={{ root: styles.title }}>
          <Toolbar>
            {icon}
            <div className={styles.spacer} />
            <Typography variant="h6">{title}</Typography>
            <div className={styles.spacer} />
            <IconButton
              size='small'
              aria-label='Close'
              onClick={handleClose()}
              className={styles.close}
            >
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Toolbar>
        </DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
        <DialogActions>
          {action}
        </DialogActions>
      </Dialog>
    );
  };
}
