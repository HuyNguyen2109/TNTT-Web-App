import React, { forwardRef } from "react";
import { List, ListItem, Button } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import classNames from "classnames";
import styles from "components/Sidebar/Sidebar.module.scss";
import { DashboardOutlined, DescriptionOutlined, ListOutlined } from "@mui/icons-material";

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

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
      // case "login":
      //   return <LoginOutlined classes={{root: styles.icon}} />;
      default:
        return null;
    }
  };
  // Render
  render = () => {
    const { pages, className, setActive, isExpandable, ...props } = this.props;
    const cn = classNames(styles.List, className);

    return (
      <List {...props} className={cn}>
        {pages.map((page) => (
          <ListItem className={styles.item} disableGutters key={page.title}>
            <Button
              size="medium"
              aria-label={page.title}
              onClick={(e) => setActive(e.currentTarget.innerText)}
              // component={CustomRouterLink}
              className={styles.button}
              to={page.href}
            >
              {this.customRenderIcon(page.icon)}
              <span>{page.title}</span>
            </Button>
          </ListItem>
        ))}
      </List>
    );
  };
}
