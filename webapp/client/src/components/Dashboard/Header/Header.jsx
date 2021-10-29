import React from "react";
import { AppBar, Avatar, Toolbar, Typography, useScrollTrigger, IconButton } from "@mui/material";
import classNames from "classnames";
import styles from "components/Dashboard/Header/Header.module.scss";
import { Box } from "@mui/system";
import { Menu } from "@mui/icons-material";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    const { isDesktop, openSidebarHandler, ...props } = this.props;

    return (
      <React.Fragment>
        <div className={styles.headerContainer} id="sub-header">
            <Toolbar disableGutters={!isDesktop ? true : false} style={{ position: "relative" }}>
              <Box sx={{ display: { xs: "flex", lg: "none" } }}>
                <IconButton size="large" onClick={() => openSidebarHandler(true)}>
                  <Menu />
                </IconButton>
              </Box>
              <Typography variant="h4">Test</Typography>
              <Box
                sx={{ position: "absolute", right: "24px", display: "flex", alignItems: "center" }}
              >
                <Avatar></Avatar>

                {/* TODO: This block will be availabled when implement login function */}
                <Box sx={{ display: { xs: "none", md: "initial" }, paddingLeft: '10px' }}>
                  <Typography variant="h6">{"Huy"}</Typography>
                </Box>
              </Box>
            </Toolbar>
          </div>
      </React.Fragment>
    );
  };
}
