import React from 'react';
import {
  Paper
} from '@material-ui/core';
import classNames from 'classnames'
import styles from './Paper.module.scss';

export default class CustomizedPaper extends React.Component {
  render = () => {
    const { content, className, ...props } = this.props;
    const cn = classNames(styles.Paper, className);

    return (
      <Paper
        className={cn}
        {...props}
      >
        {content}
      </Paper>
    )
  }
}