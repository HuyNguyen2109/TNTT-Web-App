import React from "react";
import classNames from "classnames";
import {
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Toolbar,
  Link,
} from "@material-ui/core";
import { Snackbar, Button, Input } from "../basic";
import {
  AccountCircleOutlined,
  VpnKeyOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@material-ui/icons";
import styles from "./LoginSignupForm.module.scss";
import { signinFields } from "../../helpers/constant";

export default class LoginForm extends React.Component {
  customRenderIcon = (iconType) => {
    switch (iconType) {
      case "username":
        return <AccountCircleOutlined />;
      case "password":
        return <VpnKeyOutlined />;
      default:
        return;
    }
  };
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
        {signinFields.map((data, idx) => (
          <Input
            key={idx}
            label={data.label}
            isError={isError}
            type={
              data.type === "password" && isPasswordRevealed
                ? 'text'
                : data.type
            }
            disabled={loading || anonymousLoading}
            icon={this.customRenderIcon(data.key)}
            onChange={(val) => handleChangeState(data.key, val)}
            onFocus={() => {
              console.log(data.type)
              handleChangeState("isError", false)
            }}
            customAction={
              data.isCustomAction && (
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
              )
            }
            revealPassword={isPasswordRevealed}
          />
        ))}
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
        <Typography
          variant="caption"
          className={classNames(styles.signupLink, styles.displayBlock)}
        >
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
