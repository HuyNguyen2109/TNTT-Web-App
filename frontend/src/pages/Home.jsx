import { Container } from '@material-ui/core';
import React from 'react';
import { Button } from '../components/basic';
import styles from './Home.module.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    // state 
    this.initialState = {
      links: [
        {
          'key': 'home',
          'name': 'Trang chủ',
          'url': '#'
        },
        {
          'key': 'intro',
          'name': 'Giới thiệu',
          'url': '#'
        },
        {
          'key': 'schedule',
          'name': 'Lịch học',
          'url': '#'
        },
        {
          'key': 'team',
          'name': 'Ban quản trị',
          'url': '#'
        },
        {
          'key': 'signin',
          'name': 'Đăng nhập',
          'url': '#'
        },
      ]
    }

    this.state = { ...this.initialState };
  }

  // Life cycle

  // Methods

  //Render
  render = () => {
    const {links} = this.state

    return (
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img className={styles.img} alt="" src="https://source.unsplash.com/random/1920x1080" />
          <div className={styles.cover}></div>
          <div className={styles.homeNavBar}>
            <img alt="TNTT-logo" src="/logo.png"/>
            <div style={{'flex': 1}}></div>
            <div className={styles.linkList}>
              {links.map(link => (
                <Button
                  key={link.key} 
                  className={link.key === 'signin'? styles.signIn : styles.link}
                  label={link.name}
                  variant={link.key === 'signin'? "outlined" : "text"}
                  size="large"
                  onClick={() => alert('clicked')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
