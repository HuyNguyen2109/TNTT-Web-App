import React from "react";
import classNames from 'classnames';
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Link,
} from "@material-ui/core";
import { Snackbar, Button } from "../basic";
import {
  AccountCircleOutlined,
  VpnKeyOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@material-ui/icons";
import styles from "./LoginSignupForm.module.scss";

export default class LoginForm extends React.Component {
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
              input: styles.input,
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
              input: isPasswordRevealed ? styles.input : styles.password,
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
        <Typography variant="caption" className={classNames(styles.signupLink, styles.displayBlock)}>
          <Link
            classes={{ root: styles.link }}
            onClick={() => handleChangeState("isforgotDialogOpen", true)}
          >
            Quên mật khẩu?
          </Link>
        </Typography>
      </div>
    );
  };
}
