import React from "react";
import moment from "moment";
import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Link,
} from "@material-ui/core";
import { Button } from "../basic";
import { TermAndCondition, DatePicker } from "../complex";
import {
  TextFieldsOutlined,
  PhoneOutlined,
  MailOutline,
  CalendarTodayOutlined,
  LocationOnOutlined,
} from "@material-ui/icons";
import styles from "./LoginSignupForm.module.scss";

export default class SignupForm extends React.Component {
  customRenderIcon = (iconType) => {
    switch (iconType) {
      case "name":
        return <TextFieldsOutlined />;
      case "phone":
        return <PhoneOutlined />;
      case "email":
        return <MailOutline />;
      case "address":
        return <LocationOnOutlined />;
      case "date":
        return <CalendarTodayOutlined />;
      default:
        return;
    }
  };

  render = () => {
    const {
      signupData,
      isAgreeTermAndCondition,
      isShowTermAndCondition,
      loading,
      isError,
      errorMessage,
      returnToLogin,
      handleChangeState,
      handleChangeStateArray,
      submitForm,
      termAndCondition,
    } = this.props;

    return (
      <div className={styles.signupForm}>
        <Grid container spacing={2}>
          {signupData.map((data, index) => (
            <Grid
              item
              key={index}
              md={data.size.colMd}
              sm={data.size.colSM}
              xs={data.size.colXs}
            >
              {data.type !== "date" ? (
                <TextField
                  classes={{ root: styles.inputField }}
                  label={data.label}
                  value={data.value}
                  fullWidth
                  error={data.error}
                  type={data.type}
                  size="medium"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {this.customRenderIcon(data.icon)}
                      </InputAdornment>
                    ),
                    classes: {
                      input: styles.input,
                      underline: data.error ? styles.error : styles.underline,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      focused: styles.title,
                    },
                  }}
                  onChange={(value) =>
                    handleChangeStateArray(
                      "signupData",
                      "value",
                      value.target.value,
                      index
                    )
                  }
                  onFocus={() => {
                    handleChangeState("isError", false);
                    handleChangeStateArray("signupData", "error", false, index);
                  }}
                />
              ) : (
                <DatePicker
                  classes={{ root: styles.inputField }}
                  label={data.label}
                  margin="normal"
                  size="medium"
                  value={
                    data.value !== ""
                      ? data.value
                      : moment().format("YYYY-DD-MM")
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {this.customRenderIcon(data.icon)}
                      </InputAdornment>
                    ),
                    classes: {
                      input: styles.input,
                      underline: data.error ? styles.error : styles.underline,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      focused: styles.title,
                    },
                  }}
                  handleChangeState={(date) =>
                    handleChangeStateArray(
                      "signupData",
                      "value",
                      moment(date).format("YYYY-DD-MM").toString(),
                      index
                    )
                  }
                />
              )}
            </Grid>
          ))}
        </Grid>
        {isError && (
          <Typography variant="subtitle2" className={styles.errorMessage}>
            {errorMessage}
          </Typography>
        )}
        <FormControlLabel
          className={styles.saveCredential}
          disabled={false}
          control={
            <Checkbox
              value={isAgreeTermAndCondition}
              classes={{
                checked: styles.savedCredential,
              }}
              onChange={(e) =>
                handleChangeState("isAgreeTermAndCondition", e.target.checked)
              }
            />
          }
          label={
            <Typography variant="subtitle2">
              Tôi đồng ý với các
              {
                <Link
                  classes={{ root: styles.link }}
                  onClick={(e) => {
                    const value = {
                      event: e,
                      currentTarget: e.currentTarget,
                    };
                    handleChangeState("isShowTermAndCondition", value);
                  }}
                >
                  Điều khoản
                </Link>
              }
              của Xứ đoàn
            </Typography>
          }
        />
        <Toolbar className={styles.loginAction} disableGutters>
          <Button
            className={styles.signinButtonWithoutCredential}
            label="Hủy"
            variant="contained"
            size="large"
            loading={loading}
            disabled={loading}
            onClick={() => returnToLogin(0)}
          />
          <div className={styles.or} />
          <Button
            className={styles.signinButton}
            label="Đăng ký"
            variant="contained"
            size="large"
            loading={loading}
            disabled={loading || !isAgreeTermAndCondition}
            onClick={() => submitForm()}
          />
        </Toolbar>
        <TermAndCondition
          title="Điều khoản đăng ký"
          data={termAndCondition}
          anchorEl={isShowTermAndCondition}
          onHandleClose={() => {
            handleChangeState("isShowTermAndCondition", "null");
          }}
        />
      </div>
    );
  };
}
