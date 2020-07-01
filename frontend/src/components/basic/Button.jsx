import React from 'react'
import { Button } from '@material-ui/core'
import classNames from 'classnames';

import styles from './Button.scss';

export default class CustomizedButton extends React.Component {
  render = () => {
    const { label, classnames, ...props } = this.props;
    const cn = classNames(styles.root, classnames);

    return (
      <Button
        className={cn}
        {...props}
    >{label}</Button>
    )
  }
}