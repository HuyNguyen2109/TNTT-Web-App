import React, { forwardRef } from "react";
import { List, ListItem, Button, Typography } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import classNames from "classnames";
import styles from "components/Sidebar/Sidebar.module.scss";
import {
  DashboardOutlined,
  DescriptionOutlined,
  ListOutlined,
  LoginOutlined,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";

export default class SidebarNav extends React.Component {
  // Methods
  customRenderIcon = (iconType) => {
    switch (iconType) {
      case "dashboard":
        return <DashboardOutlined classes={{ root: styles.icon }} />;
      case "document":
        return <DescriptionOutlined classes={{ root: styles.icon }} />;
      case "list":
        return <ListOutlined classes={{ root: styles.icon }} />;
      default:
        return null;
    }
  };
  // Render
  render = () => {
    const { pages, className, isExpandable, currentLocation, history, setHeaderTitle, ...props } = this.props;
    const cn = classNames(styles.List, className);

    return (
      <List {...props} className={cn}>
        {pages.map((page) => (
          <ListItem className={styles.item} disableGutters key={page.title}>
            <Button
              size="medium"
              aria-label={page.title}
              className={currentLocation === page.href ? classNames(styles.button, styles.active) : styles.button}
              // href={page.href}
              onClick={() => {
                history.push(page.href)
                setHeaderTitle(page.title)
              }}
            >
              {this.customRenderIcon(page.icon)}
              <span>{page.title}</span>
            </Button>
          </ListItem>
        ))}
        <div className={styles.accountBlock}>
          <Typography variant="h6" textAlign="left" className={styles.accountPage}>
            Tài khoản
          </Typography>
            <div>
              <Button
                size="medium"
                aria-label="Signin"
                component="a"
                className={styles.button}
                href="/login"
              >
                <LoginOutlined classes={{ root: styles.icon }} />
                <span>{"Đăng nhập"}</span>
              </Button>
            </div>
            <div>
              <Button
                size="medium"
                aria-label="Signin"
                component="a"
                className={styles.button}
                href="/login?signup=true"
              >
                <PersonAddAlt1Outlined classes={{ root: styles.icon }} />
                <span>{"Đăng ký"}</span>
              </Button>
            </div>
        </div>
      </List>
    );
  };
}
