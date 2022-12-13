import React from 'react';
import classNames from 'classnames';
import { Typography } from '@mui/material';

import { Paper } from 'components/basic';
import styles from 'components/Dashboard/ChildrenCounting/ChildrenCounting.module.scss';
import { convertMillionToString } from 'helpers/functions';
import { Group } from '@mui/icons-material';

export default class ChildrenCounting extends React.Component {

  render = () => {
    const { childrenCounting } = this.props;

    return (
      <Paper
        content={(
          <div className={styles.itemContainer}>
            <Typography variant="subtitle1" textAlign="left">{childrenCounting.title}</Typography>
            <Typography variant="h6" classes={{root: styles.value}} textAlign="left">{`${convertMillionToString(childrenCounting.value)}`}</Typography>
            <div className={styles.iconContainer}>
              <Group classes={{root: styles.icon}} />
            </div>
          </div>
        )}
      />
    )
  }
}
