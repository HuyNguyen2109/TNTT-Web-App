import React from 'react';
import classNames from 'classnames';
import { Sidebar } from "components/Sidebar";
import styles from 'layout/Main.module.scss';

const windowEvents = ['load', 'resize'];

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      innerWidth: window.innerWidth,
      isSidebarFocusable: false,
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
    const { innerWidth, isSidebarFocusable } = this.state;
    const { children, className, openSidebar, setSidebar } = this.props;
    const isDesktop = innerWidth > 450;

    // Some flags to detect mobile or not
    const cn = isDesktop ? classNames(styles.main, className) : classNames(styles.mainMobile, className);
    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
      <div className={cn}>
        <Sidebar
          onClose={() => setSidebar(false)}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'permanent' : 'temporary'}
          handleChangeState={(state, val) => this.setState({[state]: val})}
        />
        <main className={isDesktop && isSidebarFocusable ? styles.zoomedOutContent : styles.content}>
          <div className={styles.inner}>
            {children}
          </div>
        </main>
      </div>
    )
  }
}
