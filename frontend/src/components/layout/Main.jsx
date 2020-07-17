import React from 'react';
import classNames from 'classnames';
import { Sidebar } from "../Sidebar";
import styles from './Main.module.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openSidebar: false,
    }
  }
  render = () => {
    const { children, className } = this.props;
    const cn = classNames(styles.main, className);
    const isDesktop = window.innerWidth > '450px';
    const shouldOpenSidebar = isDesktop ? true : this.state.openSidebar;

    return (
      <div className={cn}>
        <Sidebar
          onClose={() => this.setState({openSidebar: false})}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
        />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    )
  }
}

export default Main