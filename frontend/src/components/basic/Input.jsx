import React from 'react';
import {
  TextField, InputAdornment
} from '@material-ui/core';
import classNames from 'classnames';
import styles from './Input.module.scss';

export default class Input extends React.Component {
  render = () => {
    const { icon, isError, className, customAction, revealPassword, ...props} = this.props;
    const cn = classNames(styles.inputField, className);

    return (
      <TextField 
        classes={{root: cn}}
        fullWidth
        size='medium'
        margin='normal'
        error={isError}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              {icon}
            </InputAdornment>
          ),
          endAdornment: customAction && customAction,
          classes: {
            input: this.props.type === 'password' ? styles.password : styles.input,
            underline: isError? styles.error : styles.underline
          }
        }}
        InputLabelProps={{
          classes: {
            focused: styles.title,
          },
        }}
        {...props}
      />
    )
  }
}