import React from 'react';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import styles from './Button.module.scss';

export default class CustomizeButton extends React.Component {
  render = () => {
    const { label, className, ...props } = this.props;
    const cn = classNames(styles.Button, className)

    return (
      <Button {...props} classes={{root: cn}}>
        {label}
      </Button>
    )
  }
}