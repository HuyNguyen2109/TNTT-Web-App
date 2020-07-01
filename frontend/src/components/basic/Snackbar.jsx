import React from 'react';
import { Snackbar } from '@material-ui/core';
import {
  InfoOutlined,
  ReportProblemOutlined,
  ErrorOutlineOutlined,
  CheckOutlined,
} from '@material-ui/icons'
import classNames from 'classnames';
import styles from './Snackbar.module.scss';

export default class CustomizedSnackbar extends React.Component {
  renderIcon = (type) => {
    switch(type) {
      case 'info':
        return <InfoOutlined className={classNames(styles.icon, styles.info)}/>
      default:
        return null
    }
  }

  render = () => {
    const { type, className, ...props } = this.props;
    const cn = classNames(styles.Snackbar, className)

    return (
      <Snackbar
        {...props}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{root: cn}}
        autoHideDuration={6000}
      >
        {this.renderIcon(type)}
      </Snackbar>
    )
  }
}