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
    };
  }

  // Life cycles

  // Methods

  //Render
  render = () => {
    const { isPasswordRevealed } = this.state;

    return (
      <Grid container className={styles.container}>
        <Grid item xs={false} sm={false} md={false} lg={7}>
          <img className={styles.img} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
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
              size="medium"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlined fontSize="medium" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              classes={{ root: styles.inputField }}
              label="Mật khẩu"
              type={isPasswordRevealed ? "text" : "password"}
              fullWidth
              size="medium"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlined fontSize="medium" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={isPasswordRevealed? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                      <IconButton
                        onClick={() => {
                          this.setState({
                            isPasswordRevealed: !isPasswordRevealed,
                          });
                        }}
                      >
                        {!isPasswordRevealed ? (
                          <VisibilityOffOutlined fontSize="medium" />
                        ) : (
                          <VisibilityOutlined fontSize="medium" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Grid>
      </Grid>
    );
  };
}

export default Login;
