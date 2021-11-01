import React from 'react';
import classNames from 'classnames';
import { Typography } from '@mui/material';

import { Paper } from 'components/basic';
import styles from 'components/Dashboard/GeneralFund/GeneralFund.module.scss';
import { convertMillionToString } from 'helpers/functions';
import { AttachMoney } from '@mui/icons-material';

export default class GeneralFund extends React.Component {

  render = () => {
    const { generalFund } = this.props;
    console.log(generalFund)

    return (
      <Paper
        content={(
          <div className={styles.itemContainer}>
            <Typography variant="subtitle1" textAlign="left">{generalFund.title}</Typography>
            <Typography variant="h6" classes={{root: styles.value}} textAlign="left">{`VND ${convertMillionToString(generalFund.value)}`}</Typography>
            <div className={styles.iconContainer}>
              <AttachMoney classes={{root: styles.icon}} />
            </div>
          </div>
        )}
      />
    )
  }
}
