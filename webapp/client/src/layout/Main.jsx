import React from 'react';
import classNames from 'classnames';
import { Sidebar } from "components/Sidebar";
import { Header } from "components/Dashboard";
import styles from 'layout/Main.module.scss';

const windowEvents = ['load', 'resize'];

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      innerWidth: window.innerWidth,
      isSidebarFocusable: false,
      isSidebarMobileOpen: false,
    }
  }

  componentDidMount = () => {
    windowEvents.forEach(event => {
      window.addEventListener(event, () => this.handleWindowWidthEvents())
    })
  }

  componentWillUnmount = () => {
    windowEvents.forEach(event => {
      window.removeEventListener(event, () => this.handleWindowWidthEvents())
    })
  }

  handleWindowWidthEvents = () => this.setState({innerWidth: window.innerWidth})

  render = () => {
    const { innerWidth, isSidebarFocusable, isSidebarMobileOpen } = this.state;
    const { children, className, setSidebar } = this.props;
    const isDesktop = innerWidth > 1024;

    // Some flags to detect mobile or not
    const cn = isDesktop ? classNames(styles.main, className) : classNames(styles.mainMobile, className);

    return (
      <div className={cn}>
        <Sidebar
          onClose={() => setSidebar(false)}
          open={!isDesktop && isSidebarMobileOpen}
          variant={isDesktop ? 'permanent' : 'temporary'}
          handleChangeState={(state, val) => this.setState({[state]: val})}
        />
        <main className={isDesktop && isSidebarFocusable ? styles.zoomedOutContent : styles.content}>
          <div className={styles.inner}>
            <Header isDesktop={isDesktop} openSidebarHandler={(val) => this.setState({isSidebarMobileOpen: val})} />
            <div className={styles.childrenContent}>{children}</div>
          </div>
        </main>
      </div>
    )
  }
}
