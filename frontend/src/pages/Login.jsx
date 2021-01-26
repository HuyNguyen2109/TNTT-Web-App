import React from "react";
import { signupFields, TermAnConditions } from "../helpers/constant";
import { Grid, Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import { LockOpenOutlined, PersonAddOutlined } from "@material-ui/icons";
import { LoginForm, SignupForm, TabPanel } from "../components/complex";
import { Snackbar } from "../components/basic";
import { validateEmail, removeWhiteSpace } from "../helpers/functions";
import styles from "./Login.module.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      // for Login form
      isPasswordRevealed: false,
      username: "",
      password: "",
      isError: false,
      errorMessage: "",
      isSaveCredential: false,
      loading: false,
      tabIndex: 0,
      // for Signup form
      isAgreeTermAndCondition: false,
      isShowTermAndCondition: null,
      signupData: signupFields,
      term: TermAnConditions,
      // for forgot dialog
      isForgotDialogOpen: false,
      forgotEmail: "",
      isForgotError: false,
      forgotDialogLoading: false,
      //for snackbar
      isShowSnackbar: false,
      snackbarType: "",
      snackbarMessage: "",
    };

    this.state = { ...this.initialState };
  }

  // Life cycles

  // Sub methods
  handleChangeState = (state, value) => {
    const result = {};
    if (
      typeof value === "object" &&
      value.hasOwnProperty("target") &&
      value.target !== null
    ) {
      value.preventDefault();
      result[state] = removeWhiteSpace(value.target.value);
    } else if (
      typeof value === "object" &&
      value.hasOwnProperty("currentTarget") &&
      value.currentTarget !== null
    ) {
      value.event.preventDefault();
      result[state] = value.currentTarget;
    } else {
      result[state] = value === "null" ? null : value;
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
    if (field === "error") {
      array.forEach((el) => {
        el[field] = value;
      });
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
    array.forEach((el) => {
      el.value = el.type === "date" ? null : "";
      el.error = false;
    });
    this.setState({ signupData: array });
  };
  // Methods
  login = (username, password) => {
    // TODO: integrate with BE
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
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)
    }
  };

  submitForgotPassword = (email) => {
    //TODO: integrate with BE, this block code below for development UI only
    this.handleChangeState("forgotDialogLoading", true);
    if (!validateEmail(email)) {
      this.setState({
        isForgotError: true,
        errorMessage: "Email chưa đúng định dạng!",
        forgotDialogLoading: false,
      });
    } else {
      console.log(email);
      setTimeout(() => {
        this.handleChangeState("isForgotDialogOpen", false);
        this.handleChangeState("forgotDialogLoading", false);
        this.handleChangeState("forgotEmail", "");
        this.setState({
          isShowSnackbar: true,
          snackbarType: "success",
          snackbarMessage: "This is test message without BE integration!",
        });
      }, 6000);
    }
  };

  signUp = (data) => {
    // TODO: integrate with BE
    data.forEach((el) => {
      if (el.value === "") {
        el.error = true;
        this.setState({
          isError: true,
          errorMessage: "Một số trường bị trống, Xin nhập đầy đủ",
        });
      } else if (el.icon === "email" && !validateEmail(el.value)) {
        el.error = true;
        this.setState({
          isError: true,
          errorMessage: "Định dạng email không đúng",
        });
      }
    });
    console.log(data);
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
      tabIndex,
      isAgreeTermAndCondition,
      isShowTermAndCondition,
      signupData,
      term,
      isForgotDialogOpen,
      isForgotError,
      forgotEmail,
      forgotDialogLoading,
      isShowSnackbar,
      snackbarType,
      snackbarMessage,
    } = this.state;

    return (
      <Grid container className={styles.container}>
        <Grid item xs={false} sm={false} md={false} lg={8} className={styles.imgContainer}>
          <img className={styles.img} alt="" src="https://source.unsplash.com/random/1920x1080" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={4}
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
                  icon={<LockOpenOutlined />}
                  {...this.a11yProps(0)}
                  classes={{ selected: styles.selected }}
                />
                <Tab
                  label="Đăng ký"
                  icon={<PersonAddOutlined />}
                  {...this.a11yProps(1)}
                  classes={{ selected: styles.selected }}
                />
              </Tabs>
            </AppBar>
            <div className={styles.transitionContainer}>
              <TabPanel value={tabIndex} index={0}>
                <LoginForm
                  isError={isError}
                  isPasswordRevealed={isPasswordRevealed}
                  errorMessage={errorMessage}
                  username={username}
                  password={password}
                  isSaveCredential={isSaveCredential}
                  loading={loading}
                  handleChangeState={(state, value) =>
                    this.handleChangeState(state, value)
                  }
                  submit={(username, password) =>
                    this.login(username, password)
                  }
                  navigateToSignup={(value) =>
                    this.handleChangeState("tabIndex", value)
                  }
                  isForgotDialogOpen={isForgotDialogOpen}
                  forgotEmail={forgotEmail}
                  isForgotError={isForgotError}
                  forgotDialogLoading={forgotDialogLoading}
                  submitForgotPassword={(email) =>
                    this.submitForgotPassword(email)
                  }
                />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <SignupForm
                  signupData={signupData}
                  isAgreeTermAndCondition={isAgreeTermAndCondition}
                  isShowTermAndCondition={isShowTermAndCondition}
                  loading={loading}
                  isError={isError}
                  errorMessage={errorMessage}
                  returnToLogin={(value) => {
                    this.handleChangeState("tabIndex", value);
                    this.clearState();
                  }}
                  handleChangeState={(state, value) =>
                    this.handleChangeState(state, value)
                  }
                  handleChangeStateArray={(state, field, value, index) =>
                    this.handleChangeStateArray(state, field, value, index)
                  }
                  submitForm={() => this.signUp(signupData)}
                  termAndCondition={term}
                />
              </TabPanel>
            </div>
          </div>
        </Grid>
        <Snackbar
          open={isShowSnackbar}
          type={snackbarType}
          message={snackbarMessage}
          onClose={() => this.handleChangeState("isShowSnackbar", false)}
        />
      </Grid>
    );
  };
}

export default Login;
