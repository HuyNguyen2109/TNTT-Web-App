import React from 'react';
import classNames from 'classnames';
import { Button, Typography } from '@mui/material';

import { Paper } from 'components/basic';
import styles from 'components/Dashboard/SaintInfo/SaintInfo.module.scss';
import { HomePage } from 'helpers/constant';
import { ArrowForward } from '@mui/icons-material';

export default class SaintInfo extends React.Component {

  render = () => {

    return (
      <Paper
        content={(
          <div className={styles.saintContainer}>
            <div className={styles.typoContainer}>
              <Typography variant="subtitle1" textAlign="left" className={styles.bigTitle}>Tiểu sử thánh bổn mạng</Typography>
              <Typography variant="h6" textAlign="right" className={styles.subTitle}>{HomePage.saintIntro.bigSentence}</Typography>
              <Typography variant="subtitle2" textAlign="right" className={styles.tinyTitle}>{HomePage.saintIntro.name}</Typography>
              <Button className={styles.readMore} component="a" href="http://conggiao.info/thanh-ane-le-thi-thanh-ba-thanh-de-1781-1841-d-9138" target="_blank">
                <span>Tìm hiểu thêm</span>
                <ArrowForward classes={{root: styles.icon}} fontSize="small" />
              </Button>
            </div>
            <img src="public/images/anethanh.jpeg" alt="Saint Image" width="200" className={styles.img} />
          </div>
        )}
      />
    )
  }
}
