import React from "react";
import classNames from "classnames";
import { Typography, Drawer, Avatar } from "@mui/material";
import { SidebarNav } from "components/Sidebar";
import { Button } from "components/basic";
import styles from "components/Sidebar/Sidebar.module.scss";
import { sidebarItems, HomePage } from "helpers/constant";

export default class Sidebar extends React.Component {
  render = () => {
    const { open, variant, handleChangeState, className, isFocusable, ...props } = this.props;
    const cn = classNames(styles.Drawer, className);

    return (
      <Drawer
        anchor={"left"}
        classes={{ root: cn, docked: cn, paper: styles.paper }}
        onClose={() => handleChangeState("isOpenDrawer", false)}
        variant={variant}
        elevation={10}
        open={open}
        onMouseEnter={() => handleChangeState('isSidebarFocusable', true)}
        onMouseLeave={() => handleChangeState('isSidebarFocusable', false)}
      >
        <div className={styles.titleBlock}>
          <Avatar alt="TNTT-logo" src="/public/images/logo.png" className={styles.avatar} />
          <Typography variant="h5" textAlign="center" className={styles.grandTitle}>
            {HomePage.documentTitle}
          </Typography>
        </div>

        <div {...props} className={styles.root}>
          <SidebarNav
            className={styles.nav}
            pages={sidebarItems}
            // onSetActive={(val) => handleChangeState("active", val)}
          />
        </div>
        <div className={styles.footerBlock}>
          <Button
            label={'Góp ý'}
            variant="text"
            size="large"
            className={styles.feedBack}
            onClick={() => {
              // TODO: Handle action for Feedback
            }}
          />
        </div>
      </Drawer>
    );
  };
}
