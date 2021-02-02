import {
  Container,
  Typography,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { List } from "@material-ui/icons";
import React from "react";
import classNames from "classnames";
import { Button } from "../components/basic";
import { HomePage } from "../helpers/constant";
import styles from "./Home.module.scss";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.initialState = {
      isMobileMenuOpen: null,
      scrollStatus: "top",
    };

    this.state = { ...this.initialState };
    // Initialize the event listener
    this.scrollEvent = null;
    // Initialize the ref for scrolling
    this.intro = React.createRef();
  }

  // Life cycle
  componentDidMount = () => {
    //handle scroll event
    this.setState({ scrollStatus: document.scrollingElement.scrollTop >= HomePage.navHeight ? 'amir' : 'top' })
    this.scrollEvent = document.addEventListener("scroll", (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= HomePage.navHeight) {
        if (this.state.scrollStatus !== "amir") {
          this.setState({ scrollStatus: "amir" });
        }
      } else {
        if (this.state.scrollStatus !== "top") {
          this.setState({ scrollStatus: "top" });
        }
      }
    });
  };
  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.scrollEvent, false);
  };
  // Methods

  //Render
  render = () => {
    const { isMobileMenuOpen } = this.state;

    return (
      <Container className={styles.container} disableGutters maxWidth={false}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
          />
          <div className={styles.cover}>
            <div>
              <Typography
                align="center"
                variant="h1"
                className={classNames(styles.grandTitle)}
              >
                {HomePage.grandTitle}
              </Typography>
              <Typography
                align="center"
                variant="h3"
                className={classNames(styles.grandTitle)}
              >
                {HomePage.subGrandTitle}
              </Typography>
              <Button
                className={styles.learnMoreBtn}
                variant='outlined'
                label={HomePage.learnMore}
                size='large'
                onClick={() => this.intro.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              />
            </div>
          </div>
          {/* Nav bar for desktop */}
          <Hidden lgDown>
            <div
              className={styles.homeNavBar}
              style={{
                height: `${HomePage.navHeight}px`,
                backgroundColor:
                  this.state.scrollStatus === "top" ? "transparent" : "#fff",
                transition: 'background-color 200ms linear'
              }}
            >
              <img alt="TNTT-logo" src="/logo.png" />
              <div style={{ flex: 1 }}></div>
              <div className={this.state.scrollStatus === 'top'? styles.linkList : styles.linkListWithWhiteBG}>
                {HomePage.navLinks.map((link) => (
                  <Button
                    key={link.key}
                    className={
                      link.key === "signin" ? styles.signIn : styles.link
                    }
                    label={link.name}
                    variant={link.key === "signin" ? "outlined" : "text"}
                    size="large"
                    onClick={() => alert("clicked")}
                  />
                ))}
              </div>
            </div>
          </Hidden>
          {/* Nav bar for mobile/tablet */}
          <Hidden lgUp>
            <div
              className={classNames(
                styles.homeNavBar,
                this.state.scrollStatus === 'top' ? styles.homeNavBarForMobile : styles.homeNavBarForMobilewithWhiteBG
              )}
              style={{
                height: `${HomePage.navHeight}px`,
                backgroundColor:
                  this.state.scrollStatus === "top" ? "transparent" : "#fff",
                transition: 'background-color 200ms linear'
              }}
            >
              <img alt="TNTT-logo" src="/logo.png" />
              <div style={{ flex: 1 }}></div>
              <IconButton
                className={styles.mobileMenu}
                onClick={(event) =>
                  this.setState({ isMobileMenuOpen: event.currentTarget })
                }
              >
                <List className={styles.icon} />
              </IconButton>
              <Menu
                anchorEl={isMobileMenuOpen}
                open={Boolean(isMobileMenuOpen)}
                onClose={() => this.setState({ isMobileMenuOpen: null })}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  style: {
                    width: "375px",
                  },
                }}
              >
                {HomePage.navLinks.map(
                  (link) =>
                  (
                    <MenuItem 
                      key={link.key} 
                      style={ link.key !== 'signin'?
                        {color: 'black'}
                        :
                        {
                          backgroundColor: `${styles.primaryColor}`,
                          color: '#fff'
                        }
                      } 
                      divider>
                      {link.name}
                    </MenuItem>
                  )
                )}
              </Menu>
            </div>
          </Hidden>
          <div className={styles.scrollDownForMore1}>
            <Typography variant="subtitle1">{HomePage.scrollDownForMore}</Typography>
          </div>
        </div>
        <div className={styles.introductionContainer} ref={this.intro}>
          <div className={styles.scrollDownForMore2}></div>
        </div>
      </Container>
    );
  };
}

export default Home;
