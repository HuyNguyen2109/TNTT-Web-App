import React from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import styles from "./DateTimePicker.module.scss";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import * as color from "../../base.module.scss";

moment.locale("vi");

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: color.$primaryColor,
      },
    },
  },
});

export default class CustomizedDatePicker extends React.Component {
  render = () => {
    const { label, value, handleChangeState, ...props } = this.props;
    return (
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        locale="vi"
      >
        <ThemeProvider theme={materialTheme}>
          <DatePicker
            classes={{ root: styles.root }}
            value={value}
            onChange={(date) => handleChangeState(date)}
            label={label}
            fullWidth
            variant="inline"
            inputVariant="standard"
            format="DD/MM/YYYY"
            {...props}
          />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    );
  };
}
