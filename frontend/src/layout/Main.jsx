import React from 'react';
import classNames from 'classnames';
import { Sidebar } from "components/Sidebar";
import styles from 'layout/Main.module.scss';

export default class MainLayout extends React.Component {
  render = () => {
    const { children, className, openSidebar, setSidebar } = this.props;
    const cn = classNames(styles.main, className);
    const isDesktop = window.innerWidth > 450;
    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
      <div className={cn}>
        <Sidebar
          onClose={() => setSidebar(false)}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'permanent' : 'temporary'}
        />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    )
  }
}
