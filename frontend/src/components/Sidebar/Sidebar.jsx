import React from 'react';
import classNames from 'classnames';
import { Divier, Typography, Drawer } from '@material-ui/core';
import { SidebarNav } from "./SidebarNav";
import styles from 'Sidebar.module.scss';
import { pages } from '../../helpers/constant';

export default class Sidebar extends React.Component {
  render = () => {
    const { open, variant, handleChangeState, className, ...props } = this.props;
    const cn = classNames(styles.Drawer, className)

    return (
      <Drawer
        anchor={'left'}
        classes={{paper: styles.paper}}
        onClose={() => handleChangeState('isOpenDrawer', false)}
        variant={variant}
        elevation={10}
      >
        <div {...props} className={styles.root}>
          <SidebarNav
            className={styles.nav}
            pages={pages}
            onSetActive={(val) => handleChangeState('active', val)}
          />
        </div>
      </Drawer> 
    )
  }
}