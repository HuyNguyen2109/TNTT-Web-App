import React from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import "../../base.module.scss";
import { primaryColor, secondaryColor } from "../../helpers/constant";

moment.locale("vi");

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: primaryColor,
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
          backgroundColor: 'transparent',
          border: `1px solid ${primaryColor}`,
          color: primaryColor,
          "&:hover": {
            backgroundColor: secondaryColor,
            border: `1px solid ${secondaryColor}`,
            transform: "scale(1.2)",
            color: "#000",
          },
        },
        "&:last-child": {
          backgroundColor: primaryColor,
          color: "#fff",
          "&:hover": {
            backgroundColor: secondaryColor,
            transform: "scale(1.2)",
            color: "#000",
          },
        },
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: primaryColor,
        "&:hover": {
          backgroundColor: secondaryColor,
          color: "#000",
        },
      },
      current: {
        color: primaryColor,
      },
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
            value={value}
            onChange={(date) => handleChangeState(date)}
            label={label}
            fullWidth
            variant="dialog"
            inputVariant="standard"
            {...props}
          />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  };
}
