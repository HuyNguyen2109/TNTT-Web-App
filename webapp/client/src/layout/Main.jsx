import React from "react";
import classNames from "classnames";
import { Sidebar } from "components/Sidebar";
import { Header } from "components/Dashboard";
import styles from "layout/Main.module.scss";
import { withRouter } from "react-router-dom";

const windowEvents = ["load", "resize"];

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      innerWidth: window.innerWidth,
      isSidebarFocusable: false,
      isSidebarMobileOpen: false,
      headerTitle: "",
    };
  }

  componentDidMount = () => {
    windowEvents.forEach((event) => {
      window.addEventListener(event, () => this.handleWindowWidthEvents());
    });
  };

  componentWillUnmount = () => {
    windowEvents.forEach((event) => {
      window.removeEventListener(event, () => this.handleWindowWidthEvents());
    });
  };

  handleWindowWidthEvents = () => this.setState({ innerWidth: window.innerWidth });

  render = () => {
    const { innerWidth, isSidebarFocusable, isSidebarMobileOpen, headerTitle } = this.state;
    const { children, className, setSidebar, location, history } = this.props;
    const isDesktop = innerWidth > 1024;

    // Some flags to detect mobile or not
    const cn = isDesktop
      ? classNames(styles.main, className)
      : classNames(styles.mainMobile, className);

    return (
      <div className={cn}>
        <Sidebar
          onClose={() => setSidebar(false)}
          open={!isDesktop && isSidebarMobileOpen}
          variant={isDesktop ? "permanent" : "temporary"}
          handleChangeState={(state, val) => this.setState({ [state]: val })}
          currentLocation={location.pathname}
          history={history}
          setHeaderTitle={(val) => this.setState({ headerTitle: val })}
        />
        <main
          className={isDesktop && isSidebarFocusable ? styles.zoomedOutContent : styles.content}
        >
          <div className={styles.inner}>
            <Header
              isDesktop={isDesktop}
              openSidebarHandler={(val) => this.setState({ isSidebarMobileOpen: val })}
              title={headerTitle}
            />
            <div className={styles.childrenContent}>{children}</div>
          </div>
        </main>
      </div>
    );
  };
}

export default withRouter(MainLayout);
