import React from "react";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import SwipeableViews from "react-swipeable-views";
import { signupFields } from "../helpers/constant";
import {
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Toolbar,
  AppBar,
  Tabs,
  Tab,
  Box,
  Link,
} from "@material-ui/core";
import { Snackbar, Button } from "../components/basic";
import {
  AccountCircleOutlined,
  VpnKeyOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  TextFieldsOutlined,
  PhoneOutlined,
  MailOutline,
  CalendarTodayOutlined,
  LocationOnOutlined,
} from "@material-ui/icons";
import styles from "./Login.module.scss";

class LoginForm extends React.Component {
  // Render
  render = () => {
    const {
      isError,
      isPasswordRevealed,
      errorMessage,
      username,
      password,
      isSaveCredential,
      loading,
      anonymousLoading,
      handleChangeState,
      submit,
      submitWithoutCredential,
      navigateToSignup,
    } = this.props;

    return (
      <div className={styles.loginForm}>
        <TextField
          classes={{ root: styles.inputField }}
          label="Tài khoản/Email"
          type="text"
          fullWidth
          disabled={loading || anonymousLoading}
          error={isError}
          size="medium"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleOutlined />
              </InputAdornment>
            ),
            classes: {
              underline: isError ? styles.error : styles.underline,
            },
          }}
          InputLabelProps={{
            classes: {
              focused: styles.title,
            },
          }}
          value={username}
          onChange={(user) => handleChangeState("username", user)}
          onFocus={() => handleChangeState("isError", false)}
        />
        <TextField
          classes={{ root: styles.inputField }}
          label="Mật khẩu"
          type={isPasswordRevealed ? "text" : "password"}
          fullWidth
          disabled={loading || anonymousLoading}
          error={isError}
          size="medium"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKeyOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip
                  title={isPasswordRevealed ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeState(
                        "isPasswordRevealed",
                        !isPasswordRevealed
                      );
                    }}
                  >
                    {!isPasswordRevealed ? (
                      <VisibilityOffOutlined />
                    ) : (
                      <VisibilityOutlined />
                    )}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
            classes: {
              underline: isError ? styles.error : styles.underline,
            },
          }}
          InputLabelProps={{
            classes: {
              focused: styles.title,
            },
          }}
          value={password}
          onChange={(pass) => handleChangeState("password", pass)}
          onFocus={() => handleChangeState("isError", false)}
        />
        {isError && (
          <Typography variant="subtitle2" className={styles.errorMessage}>
            {errorMessage}
          </Typography>
        )}
        <FormControlLabel
          className={styles.saveCredential}
          disabled={loading || anonymousLoading}
          control={
            <Checkbox
              value={isSaveCredential}
              onChange={(e) =>
                handleChangeState("isSaveCredential", e.target.checked)
              }
              classes={{
                checked: styles.savedCredential,
              }}
            />
          }
          label="Lưu mật khẩu cho lần đăng nhập tiếp theo"
        />
        <Toolbar className={styles.loginAction} disableGutters>
          <Button
            className={styles.signinButton}
            label="Đăng nhập"
            variant="contained"
            size="large"
            loading={loading}
            disabled={loading || anonymousLoading}
            onClick={() => submit(username, password)}
          />
          <Typography variant="subtitle2" className={styles.or}>
            hoặc
          </Typography>
          <Button
            className={styles.signinButtonWithoutCredential}
            label="Đăng nhập với tư cách khách"
            variant="contained"
            size="large"
            loading={anonymousLoading}
            disabled={loading || anonymousLoading}
            onClick={() => submitWithoutCredential()}
          />
        </Toolbar>
        <Typography variant="caption" className={styles.signupLink}>
          Chưa có tài khoản?
          <Link
            classes={{ root: styles.link }}
            onClick={() => navigateToSignup(1)}
          >
            Đăng ký ngay
          </Link>
        </Typography>
      </div>
    );
  };
}

class SignupForm extends React.Component {
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
      agreeTermAndCondition,
      showTermAndCondition,
      loading,
      isError,
      errorMessage,
      returnToLogin,
      handleChangeState,
      handleChangeStateArray,
      submitForm,
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
              <TextField
                classes={{ root: styles.inputField }}
                label={data.label}
                value={data.value}
                fullWidth
                error={data.error}
                type={data.type === "date" ? "text" : data.type}
                size="medium"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {this.customRenderIcon(data.icon)}
                    </InputAdornment>
                  ),
                  classes: {
                    underline: data.error? styles.error : styles.underline,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    focused: styles.title,
                  },
                }}
                onChange={(value) =>
                  handleChangeStateArray("signupData", "value", value.target.value, index)
                }
                onFocus={() => {
                  handleChangeState("isError", false)
                  handleChangeStateArray("signupData", "error", false, index)
                }}
              />
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
              onChange={(e) => agreeTermAndCondition(e.target.checked)}
            />
          }
          label={
            <Typography variant="subtitle2">
              Tôi đồng ý với các
              {
                <Link
                  classes={{ root: styles.link }}
                  onClick={(e) => {
                    e.preventDefault();
                    showTermAndCondition();
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
      </div>
    );
  };
}

class TabPanel extends React.Component {
  render = () => {
    const { children, value, index, ...props } = this.props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tabpanel-${index}`}
        {...props}
      >
        {value === index && <Box p={1}>{children}</Box>}
      </div>
    );
  };
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      isPasswordRevealed: false,
      username: "",
      password: "",
      isError: false,
      errorMessage: "Test error message",
      isSaveCredential: false,
      loading: false,
      anonymousLoading: false,
      tabIndex: 0,
      isAgreeTermAndCondition: false,
      isShowTermAndCondition: false,
      signupData: signupFields,
    };

    this.state = {...this.initialState};
  }

  // Life cycles

  // Sub methods
  handleChangeState = (state, value) => {
    const result = {};
    if (typeof value === "object" && value.hasOwnProperty("target")) {
      value.preventDefault();
      result[state] = value.target.value;
      console.log("this?");
    } else {
      result[state] = value;
    }
    this.setState(result);
  };

  handleChangeStateArray = (state, field, value, index) => {
    let result = {};
    let array = [...this.state[state]];
    if (typeof this.state[state] === "object") {
      array[index][field] = value;
      result[state] = array;
    }
    if (field === 'error') {
      array.forEach(el => {
        el[field] = value
      })
    }
    this.setState(result);
  };

  a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };

  clearState = () => {
    this.setState(this.initialState);
    let array = [...this.state.signupData];
    array.forEach(el => {
      el.value = '';
      el.error = false
    })
    this.setState({signupData: array})
  }
  // Methods
  login = (username, password) => {
    this.setState({ loading: true });
    if (username === "" || password === "") {
      this.setState({
        isError: true,
        errorMessage: "Tài khoản/Mật khẩu không được để trống",
        loading: false,
      });
    } else {
      console.log(`${username}/${password}`);
      console.log(this.state.isSaveCredential);
    }
  };

  loginWithoutCredential = () => {
    this.setState({ anonymousLoading: true });
    console.log(`anonymous-${uuidv4().replace(/-/g, "")}`);
  };

  signUp = (data) => {
    data.forEach((el) => {
      if(el.value === '') {
        el.error = true;
        this.setState({
          isError: true,
          errorMessage: 'Một số trường bị trống, Xin nhập đầy đủ'
        })
      }
    });
  };
  //Render
  render = () => {
    const {
      isPasswordRevealed,
      username,
      password,
      isError,
      errorMessage,
      isSaveCredential,
      loading,
      anonymousLoading,
      tabIndex,
      isAgreeTermAndCondition,
      isShowTermAndCondition,
      signupData,
    } = this.state;

    return (
      <Grid container className={styles.container}>
        <Grid item xs={false} sm={false} md={6} lg={7}>
          <img className={styles.img} alt="" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={5}
          className={styles.loginContainer}
        >
          <div className={styles.tabContainer}>
            <Typography variant="h4" align="left">
              Title
            </Typography>
            <AppBar position="static" color="transparent">
              <Tabs
                value={tabIndex}
                variant="fullWidth"
                onChange={(e, value) =>
                  this.handleChangeState("tabIndex", value)
                }
                classes={{
                  indicator: styles.indicator,
                }}
              >
                <Tab
                  label="Đăng nhập"
                  {...this.a11yProps(0)}
                  classes={{ selected: styles.selected }}
                />
                <Tab
                  label="Đăng ký"
                  {...this.a11yProps(1)}
                  classes={{ selected: styles.selected }}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis="x"
              index={tabIndex}
              onChangeIndex={(e, index) =>
                this.handleChangeState("tabIndex", index)
              }
            >
              <TabPanel value={tabIndex} index={0} dir="right">
                <LoginForm
                  isError={isError}
                  isPasswordRevealed={isPasswordRevealed}
                  errorMessage={errorMessage}
                  username={username}
                  password={password}
                  isSaveCredential={isSaveCredential}
                  loading={loading}
                  anonymousLoading={anonymousLoading}
                  handleChangeState={(state, value) =>
                    this.handleChangeState(state, value)
                  }
                  submit={(username, password) =>
                    this.login(username, password)
                  }
                  submitWithoutCredential={() => this.loginWithoutCredential()}
                  navigateToSignup={(value) =>
                    this.handleChangeState("tabIndex", value)
                  }
                />
              </TabPanel>
              <TabPanel value={tabIndex} index={1} dir="left">
                <SignupForm
                  signupData={signupData}
                  isAgreeTermAndCondition={isAgreeTermAndCondition}
                  isShowTermAndCondition={isShowTermAndCondition}
                  showTermAndCondition={() =>
                    this.handleChangeState(
                      "isShowTermAndCondition",
                      !isShowTermAndCondition
                    )
                  }
                  agreeTermAndCondition={(value) =>
                    this.handleChangeState("isAgreeTermAndCondition", value)
                  }
                  loading={loading}
                  isError={isError}
                  errorMessage={errorMessage}
                  returnToLogin={(value) =>
                    {
                      this.handleChangeState("tabIndex", value)
                      this.clearState()
                    }
                  }
                  handleChangeState={(state, value) => this.handleChangeState(state, value)}
                  handleChangeStateArray={(state, field, value, index) =>
                    this.handleChangeStateArray(state, field, value, index)
                  }
                  submitForm={() => this.signUp(signupData)}
                />
              </TabPanel>
            </SwipeableViews>
          </div>
        </Grid>
      </Grid>
    );
  };
}

export default Login;
