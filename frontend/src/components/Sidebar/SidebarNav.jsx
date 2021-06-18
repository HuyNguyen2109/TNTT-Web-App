import React, {forwardRef} from "react";
import {IconButton, List, ListItem, Tooltip} from '@material-ui/core';
import {NavLink as RouterLink} from 'react-router-dom';
import classNames from 'classnames';
import styles from "components/basic/Snackbar/Snackbar.module.scss";
import {DashboardOutlined, DescriptionOutlined, ListOutlined} from "@material-ui/icons";

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{flexGrow: 1}}
  >
    <RouterLink {...props}/>
  </div>)
);

export default class SidebarNav extends React.Component {
  // Methods
  customRenderIcon = (iconType) => {
    switch (iconType) {
      case 'dashboard': return <DashboardOutlined />;
      case 'document': return <DescriptionOutlined />;
      case 'list': return <ListOutlined />;
      default: return null;
    }
  }
  // Render
  render = () => {
    const { pages, className, setActive, ...props } = this.props;
    const cn = classNames(styles.List, className);

    return (
      <List
        {...props}
        className={cn}
      >
        {pages.map((page) => (
          <ListItem
            className={styles.item}
            disableGutters
            key={page.title}
          >
            <Tooltip title={page.title} placement={"right"}>
              <IconButton
                size="medium"
                aria-label={page.title}
                onClick={(e) => setActive(e.currentTarget.innerText)}
                activeClassName={styles.activeItem}
                component={CustomRouterLink}
                className={styles.button}
                to={page.href}
              >
                {this.customRenderIcon(page.icon)}
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    )
  }
}
