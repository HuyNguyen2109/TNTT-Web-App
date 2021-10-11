import React from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, InputAdornment } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import variables from 'base.module.scss';
import styles from "components/complex/DateTimePicker/DateTimePicker.module.scss";

moment.locale("vi");

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: variables.primary,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      },
    },
    MuiButton: {
      textPrimary: {
        marginRight: "5px !important",
        transition: "0.15s ease",
        borderRadius: "7px",
        "&:first-child": {
          backgroundColor: "transparent",
          border: `1px solid ${variables.primary}`,
          color: variables.primary,
          "&:hover": {
            backgroundColor: variables.secondary,
            border: `1px solid ${variables.secondary}`,
            transform: "scale(1.2)",
            color: "#000",
          },
        },
        "&:last-child": {
          backgroundColor: variables.primary,
          color: "#fff",
          "&:hover": {
            backgroundColor: variables.secondary,
            transform: "scale(1.2)",
            color: "#000",
          },
        },
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: variables.primary,
        "&:hover": {
          backgroundColor: variables.secondary,
          color: "#000",
        },
      },
      current: {
        color: variables.primary,
        border: `1px solid ${variables.primary}`
      },
    },
    MuiPickersYear:{
      yearSelected:{
        color: variables.primary
      }
    },
    MuiPickersCalendarHeader: {
      transitionContainer: {
        display: "none",
      },
    },
  },
});

export default class CustomizedDatePicker extends React.Component {
  render = () => {
    const {
      label,
      value,
      handleChangeState,
      customToolbar,
      isError,
      icon,
      ...props
    } = this.props;
    return (
      <ThemeProvider theme={materialTheme}>
        <MuiPickersUtilsProvider
          libInstance={moment}
          utils={MomentUtils}
          locale="vi"
        >
          <DatePicker
            classes={{ root: styles.inputField }}
            value={value}
            onChange={(date) => handleChangeState(date)}
            label={label}
            fullWidth
            variant="dialog"
            inputVariant="standard"
            margin="normal"
            size="medium"
            allowKeyboardControl
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{icon}</InputAdornment>
              ),
              classes: {
                input: styles.input,
                underline: isError ? styles.error : styles.underline,
              },
            }}
            InputLabelProps={{
              classes: {
                focused: styles.title,
              },
            }}
            {...props}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  };
}
