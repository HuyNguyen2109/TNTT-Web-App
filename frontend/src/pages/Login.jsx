import React from "react";
import classNames from "classnames";
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
} from "@material-ui/core";
import { Snackbar, Button } from "../components/basic";
import {
  AccountCircleOutlined,
  VpnKeyOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@material-ui/icons";
import styles from "./Login.module.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPasswordRevealed: false,
      username: "",
      password: "",
      isError: false,
      errorMessage: "Test error message",
      isSaveCredential: false,
    };
  }

  // Life cycles

  // Methods
  login = (username, password) => {
    if(username === '' || password === '') {
      this.setState({
        isError: true,
        errorMessage: 'Tài khoản/Mật khẩu không được để trống'
      })
    }
    else {
      console.log(`${username}/${password}`)
      console.log(this.state.isSaveCredential)
    }
  }
  // Sub Methods
  handleChangeValue = (e, state) => {
    if (this.state.isError) {
      this.setState({ isError: false });
    }
    e.preventDefault();
    const result = {};
    result[state] = e.target.value;
    this.setState(result);
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
          <div className={styles.loginForm}>
            <Typography variant="h4" align="left">
              Title
            </Typography>
            <TextField
              classes={{ root: styles.inputField }}
              label="Tài khoản/Email"
              fullWidth
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
              onChange={(user) => this.handleChangeValue(user, "username")}
              onFocus={() => this.setState({ isError: false })}
            />
            <TextField
              classes={{ root: styles.inputField }}
              label="Mật khẩu"
              type={isPasswordRevealed ? "text" : "password"}
              fullWidth
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
                      title={
                        isPasswordRevealed ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      <IconButton
                        onClick={() => {
                          this.setState({
                            isPasswordRevealed: !isPasswordRevealed,
                          });
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
              onChange={(pass) => this.handleChangeValue(pass, "password")}
              onFocus={() => this.setState({ isError: false })}
            />
            {isError && (
              <Typography variant="subtitle2" className={styles.errorMessage}>
                {errorMessage}
              </Typography>
            )}
            <FormControlLabel
              className={styles.saveCredential}
              control={
                <Checkbox
                  value={isSaveCredential}
                  onChange={(e) =>
                    this.setState({ isSaveCredential: e.target.checked })
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
                onClick={() => this.login(username, password)}
              />
              <Typography variant="subtitle2" className={styles.or}>
                hoặc
              </Typography>
              <Button
                className={styles.signinButtonWithoutCredential}
                label="Đăng nhập với tư cách khách"
                variant="contained"
                size="large"
                onClick={() => {
                  alert("Clicked");
                }}
              />
            </Toolbar>
          </div>
        </Grid>
      </Grid>
    );
  };
}

export default Login;
