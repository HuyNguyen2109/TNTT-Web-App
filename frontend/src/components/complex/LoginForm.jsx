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
import { Snackbar, Button, Input, Dialog } from "../basic";
import {
  AccountCircleOutlined,
  VpnKeyOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  HelpOutlineOutlined,
  MailOutlined,
} from "@material-ui/icons";
import styles from "./LoginSignupForm.module.scss";
import { signinFields, forgotMessage } from "../../helpers/constant";
import { forgotForm } from "../../helpers/styles";

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
      navigateToSignup,
      isForgotDialogOpen,
      forgotEmail,
      isForgotError,
      forgotDialogLoading,
      submitForgotPassword,
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
            value={data.type === "password" ? password : username}
            disabled={loading || anonymousLoading}
            icon={this.customRenderIcon(data.key)}
            onChange={(val) => handleChangeState(data.key, val)}
            onFocus={() => handleChangeState("isError", false)
            }
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
            onClick={() => handleChangeState("isForgotDialogOpen", true)}
          >
            Quên mật khẩu?
          </Link>
        </Typography>
        <Dialog
          title='Gặp vấn đề với tài khoản?'
          icon={<HelpOutlineOutlined style={forgotForm.icon}/>}
          open={isForgotDialogOpen}
          handleClose={(val) => {
            handleChangeState('isForgotDialogOpen', val)
            handleChangeState('forgotEmail', '')
          }}
          content={(
            <React.Fragment>
              <Typography variant='body1'>{forgotMessage}</Typography>
              <Input
                label='Email'
                type='text'
                icon={<MailOutlined />}
                value={forgotEmail}
                isError={isForgotError}
                onFocus={() => handleChangeState("isForgotError", false)}
                onChange={(val) => handleChangeState("forgotEmail", val)}
              />
            </React.Fragment>
          )}
          action={(
            <Toolbar>
              <div style={{flexGlow: '1'}} />
              <Button
                style={forgotEmail === '' ? forgotForm.primaryButtonDisabled : forgotForm.primaryButton}
                label='Xác nhận'
                variant="contained"
                size="large"
                disabled={forgotEmail === '' ? true : false}
                loading={forgotDialogLoading}
                onClick={() => submitForgotPassword(forgotEmail)}
              />
            </Toolbar>
          )}
        />
      </div>
    );
  };
}
