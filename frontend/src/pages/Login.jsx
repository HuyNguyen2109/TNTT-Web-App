import React from "react";
import { v4 as uuidv4 } from "uuid";
import SwipeableViews from "react-swipeable-views";
import { signupFields, TermAnConditions } from "../helpers/constant";
import {
  Grid,
  Typography,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import { LoginForm, SignupForm, TabPanel } from '../components/complex';
import styles from "./Login.module.scss";

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
      isShowTermAndCondition: null,
      signupData: signupFields,
      term: TermAnConditions,
      isforgotDialogOpen: false,
    };

    this.state = {...this.initialState};
  }

  // Life cycles

  // Sub methods
  handleChangeState = (state, value) => {
    const result = {};
    if (typeof value === "object" && value.hasOwnProperty("target") && value.target !== null) {
      value.preventDefault();
      result[state] = value.target.value;
    } else if (typeof value === "object" && value.hasOwnProperty("currentTarget") && value.currentTarget !== null) {
      value.event.preventDefault();
      result[state] = value.currentTarget;
    } else {
      result[state] = value === 'null'? null : value;
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
      el.value = el.type === 'date' ? null : '';
      el.error = false
    })
    this.setState({signupData: array})
  }
  // Methods
  login = (username, password) => {
    // TODO
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
    // TODO
    data.forEach((el) => {
      if(el.value === '') {
        el.error = true;
        this.setState({
          isError: true,
          errorMessage: 'Một số trường bị trống, Xin nhập đầy đủ'
        })
      }
    });
    console.log(data)
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
      term,
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
              animateHeight
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
                  termAndCondition={term}
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
