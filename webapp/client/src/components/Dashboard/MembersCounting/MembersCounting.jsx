import React from 'react';
import classNames from 'classnames';
import { Typography } from '@mui/material';

import { Paper } from 'components/basic';
import styles from 'components/Dashboard/MembersCounting/MembersCounting.module.scss';
import { convertMillionToString } from 'helpers/functions';
import { Person } from '@mui/icons-material';

export default class MembersCounting extends React.Component {

  render = () => {
    const { membersCounting } = this.props;

    return (
      <Paper
        content={(
          <div className={styles.itemContainer}>
            <Typography variant="subtitle1" textAlign="left">{membersCounting.title}</Typography>
            <Typography variant="h6" classes={{root: styles.value}} textAlign="left">{`${convertMillionToString(membersCounting.value)}`}</Typography>
            <div className={styles.iconContainer}>
              <Person classes={{root: styles.icon}} />
            </div>
          </div>
        )}
      />
    )
  }
}
