import React from "react";
import classNames from "classnames";
import {
  Dialog,
  DialogTitle,
  Toolbar,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Divider,
} from "@material-ui/core";
import styles from "./Dialog.module.scss";
import { CloseOutlined } from "@material-ui/icons";
import '../complex/LoginSignupForm.module.scss';

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
    const cn = classNames(styles.Dialog, className);

    return (
      <Dialog
        classes={{ root: cn, paper: styles.paper }}
        fullScreen={window.innerWidth < 450? true : false}
        open={open}
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle classes={{ root: styles.title }}>
          <Toolbar>
            <div className={styles.icon}>{icon}</div>
            <Typography variant="h6" className={styles.text}>{title}</Typography>
            <div className={styles.spacer} />
            <IconButton
              size='small'
              aria-label='Close'
              onClick={() => handleClose(false)}
              className={styles.close}
            >
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Toolbar>
        </DialogTitle>
        <Divider />
        <DialogContent classes={{root: styles.content}}>
          {content}
        </DialogContent>
        <Divider />
        <DialogActions>
          {action}
        </DialogActions>
      </Dialog>
    );
  };
}
