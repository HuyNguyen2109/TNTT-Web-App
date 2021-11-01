import React from 'react';
import classNames from 'classnames';
import { Typography } from '@mui/material';

import { Paper } from 'components/basic';
import styles from 'components/Dashboard/OrganizationFund/OrganizationFund.module.scss';
import { convertMillionToString } from 'helpers/functions';
import { MonetizationOn } from '@mui/icons-material';

export default class OrganizationFund extends React.Component {

  render = () => {
    const { organizationFund } = this.props;

    return (
      <Paper
        content={(
          <div className={styles.itemContainer}>
            <Typography variant="subtitle1" textAlign="left">{organizationFund.title}</Typography>
            <Typography variant="h6" classes={{root: styles.value}} textAlign="left">{`VND ${convertMillionToString(organizationFund.value)}`}</Typography>
            <div className={styles.iconContainer}>
              <MonetizationOn classes={{root: styles.icon}} />
            </div>
          </div>
        )}
      />
    )
  }
}
