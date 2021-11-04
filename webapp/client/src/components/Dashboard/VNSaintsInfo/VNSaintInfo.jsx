import React from "react";
import classNames from "classnames";
import { Button, Typography } from "@mui/material";

import { Paper } from "components/basic";
import styles from "components/Dashboard/VNSaintsInfo/VNSaintInfo.module.scss";
import { HomePage } from "helpers/constant";
import { ArrowForward } from "@mui/icons-material";

export default class VNSaintsInfo extends React.Component {
  render = () => {
    return (
      <Paper
        content={
          <div className={styles.vnSaintContainer}>
            <div className={styles.vnSaintInner}>
              <div className={styles.vnSaintContent}>
                <Typography variant="h6" textAlign="left" className={styles.title}>
                  Trường Ca Tử Đạo
                </Typography>
                <Typography variant="subtitle1" textAlign="right" className={styles.subTitle}>
                  Trong lịch sử Giáo hội Công giáo Việt Nam, ước tính có đến hàng trăm ngàn người đã
                  làm chứng đức tin Kitô Giáo, trong số đó có 118 Thánh Tử đạo, với 117 vị được Giáo
                  hoàng Gioan Phaolô II phong Thánh ngày 19 tháng 6 năm 1988 và Á Thánh An-rê Phú
                  Yên, phong Chân phước ngày 5 tháng 3 năm 2000.
                </Typography>
                <Button className={styles.readMore} component="a" href="http://conggiao.info/danh-sach-cac-thanh-tu-dao-viet-nam-d-7187" target="_blank">
                  <span>Tìm hiểu thêm</span>
                  <ArrowForward classes={{root: styles.icon}} fontSize="small" />
                </Button>
              </div>
            </div>
          </div>
        }
      />
    );
  };
}
