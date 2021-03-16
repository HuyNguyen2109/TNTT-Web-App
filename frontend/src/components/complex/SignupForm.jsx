import React from "react";
import moment from "moment";
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Link,
} from "@material-ui/core";
import { Button, Input } from "../basic";
import {
  TermAndCondition,
  DatePicker,
  CustomToolbarDatePicker,
} from "../complex";
import {
  TextFieldsOutlined,
  PhoneOutlined,
  MailOutline,
  CalendarTodayOutlined,
  LocationOnOutlined,
} from "@material-ui/icons";
import styles from "./LoginSignupForm.module.scss";
import { formatPhoneNumber, removeWhiteSpace } from "../../helpers/functions";

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
                <Input
                  label={data.label}
                  value={data.value}
                  isError={data.error}
                  type={data.type}
                  icon={this.customRenderIcon(data.icon)}
                  onChange={(value) =>
                    handleChangeStateArray(
                      "signupData",
                      "value",
                      data.type === "tel"
                        ? formatPhoneNumber(
                            value.target.value
                              .replace(/[^0-9.]/g, "")
                              .replace(/(\..*)\./g, "$1")
                          )
                        : data.icon === "address"
                        ? value.target.value
                        : removeWhiteSpace(value.target.value),
                      index
                    )
                  }
                  placeholder={data.placeholder && data.placeholder}
                  onFocus={() => {
                    handleChangeState("isError", false);
                    handleChangeStateArray("signupData", "error", false, index);
                  }}
                  inputProps={data.type === "tel" ? { maxLength: 12 } : {}}
                />
              ) : data.label === "Bổn mạng" ? (
                <DatePicker
                  label={data.label}
                  value={data.value}
                  initialFocusedDate={moment().format("YYYY-MM-DD")}
                  isError={data.error}
                  icon={this.customRenderIcon(data.icon)}
                  handleChangeState={(date) =>
                    handleChangeStateArray(
                      "signupData",
                      "value",
                      moment(date).format("MM-DD").toString(),
                      index
                    )
                  }
                  format="DD/MM"
                  ToolbarComponent={CustomToolbarDatePicker}
                />
              ) : (
                <DatePicker
                  label={data.label}
                  value={data.value}
                  initialFocusedDate={moment().format("YYYY-MM-DD")}
                  isError={data.error}
                  icon={this.customRenderIcon(data.icon)}
                  handleChangeState={(date) =>
                    handleChangeStateArray(
                      "signupData",
                      "value",
                      moment(date).format("YYYY-MM-DD").toString(),
                      index
                    )
                  }
                  format="DD/MM/YYYY"
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
            <Typography variant="body1">
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                className={styles.signinButtonWithoutCredential}
                label="Hủy"
                variant="contained"
                size="large"
                loading={loading}
                disabled={loading}
                onClick={() => returnToLogin(0)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                className={styles.signinButton}
                label="Đăng ký"
                variant="contained"
                size="large"
                loading={loading}
                disabled={loading || !isAgreeTermAndCondition}
                onClick={() => submitForm()}
              />
            </Grid>
          </Grid>
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
