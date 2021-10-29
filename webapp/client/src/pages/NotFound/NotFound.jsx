import React from "react";
import { withRouter } from "react-router-dom";

import styles from "pages/NotFound/NotFound.module.scss";
import { Button, ButtonBase, Typography } from "@mui/material";
import { ChevronLeftOutlined } from "@mui/icons-material";

class NotFound extends React.Component {
  render = () => {
    const { history } = this.props;

    return (
      <div className={styles.backdropImg}>
        <div className={styles.backdrop}></div>
        <div className={styles.modal}>
          <div className={styles.inner}>
            <img src="public/icons/not-found.svg" width="400" height="auto" alt="Not found" />
            <Typography className={styles.text} variant="h5" alignItems="center">{'Opps! Trang bạn tìm kiếm không tồn tại hoặc đang trong giai đoạn sửa chữa'}</Typography>
            <Button component="a" href="/" className={styles.backButton}>
              <ChevronLeftOutlined classes={{root: styles.icon}} />
              <span>Trở về trang chủ</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };
}

export default withRouter(NotFound);
