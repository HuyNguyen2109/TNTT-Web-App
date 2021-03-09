import {
  Typography,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  List,
} from "@material-ui/icons";
import React from "react";
import { Parallax } from "react-skrollr";
import classNames from 'classnames';
// Styles
import styles from "./imgContainer.module.scss";
import { Button } from "../basic";

export default class ImgContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = { ...this.initialState };

    this.initialState = {
      isMobileMenuOpen: null,
    };
  }

  render = () => {
    const { isMobileMenuOpen } = this.state;
    const { generalData, childRef, refsList, scrollStatus, setActiveNavKey, outputRef } = this.props;

    return (
      <div className={styles.imgContainer} ref={childRef}>
        <Parallax
          data={{
            "data-center": "background-position: 50% 0px",
            "data-top-bottom": "background-position: 50% -100px",
          }}
        >
          <img className={styles.img} alt="cover" src="/images/bg.jpg" />
        </Parallax>
        <div className={styles.cover}>
          <div>
            <Parallax
              data={{
                "data-top-bottom": "opacity:0;transform:translateX(500px)",
                "data-center": "opacity:1;transform:translateX(0px)",
              }}
            >
              <Typography
                align="center"
                variant="h1"
                className={classNames(styles.grandTitle)}
              >
                {generalData.orgName}
              </Typography>
              <Typography
                align="center"
                variant="h3"
                className={classNames(styles.grandTitle, styles.subGrandTitle)}
              >
                {generalData.subGrandTitle}
              </Typography>
              <Button
                className={styles.learnMoreBtn}
                variant="outlined"
                label={generalData.learnMore}
                size="large"
                onClick={() => outputRef('intro')}
              />
            </Parallax>
          </div>
        </div>
        {/* Nav bar for desktop */}
        <Hidden smDown>
          <div
            className={styles.homeNavBar}
            style={{
              height: `${generalData.navHeight}px`,
              backgroundColor:
                scrollStatus === "top" ? "transparent" : "#fff",
              transition: "background-color 0.5s linear",
              backgroundAttachment: "fixed",
            }}
          >
            <img
              alt="TNTT-logo"
              src="/images/logo.png"
              onClick={() => outputRef('home')}
              style={{ cursor: "pointer" }}
            />
            <div style={{ flex: 1 }}></div>
            <div
              className={
                scrollStatus === "top"
                  ? styles.linkList
                  : styles.linkListWithWhiteBG
              }
            >
              <div id="marker" className={styles.marker}></div>
              {generalData.navLinks.map((link) => (
                <Button
                  key={link.key}
                  id={link.key}
                  className={
                    link.key === "signin" ? styles.signIn : styles.link
                  }
                  label={link.name}
                  variant={link.key === "signin" ? "outlined" : "text"}
                  size="large"
                  href={link.key === "signin" ? "/login" : undefined}
                  onClick={() => {
                    link.key !== "signin" &&
                      refsList[link.key] &&
                      (link.key === "home"
                        ? outputRef('home')
                        : outputRef(link.key));
                        setActiveNavKey(link.key);
                  }}
                />
              ))}
            </div>
          </div>
        </Hidden>
        {/* Nav bar for mobile/tablet */}
        <Hidden mdUp>
          <div
            className={classNames(
              styles.homeNavBar,
              scrollStatus === "top"
                ? styles.homeNavBarForMobile
                : styles.homeNavBarForMobilewithWhiteBG
            )}
            style={{
              height: `${generalData.navHeight}px`,
              backgroundColor:
                scrollStatus === "top" ? "transparent" : "#fff",
              transition: "background-color 200ms linear",
            }}
          >
            <img
              alt="TNTT-logo"
              src="/images/logo.png"
              onClick={() => outputRef('home')}
              style={{ cursor: "pointer" }}
            />
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
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: {
                  width: "375px",
                },
              }}
            >
              {generalData.navLinks.map((link) => (
                <MenuItem
                  key={link.key}
                  style={
                    link.key !== "signin"
                      ? { color: "black" }
                      : {
                          backgroundColor: `${styles.primaryColor}`,
                          color: "#fff",
                        }
                  }
                  divider
                  onClick={() => {
                    link.key !== "signin"
                      ? refsList[link.key]
                        ? link.key === "home"
                          ? outputRef('home')
                          : outputRef(link.key)
                        : alert("This ref does not exist")
                      : (window.location.href = "/login");
                    this.setState({ isMobileMenuOpen: null });
                  }}
                >
                  {link.name}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Hidden>
        <div className={styles.scrollDownForMore1}>
          <div className={styles.mouse}></div>
        </div>
      </div>
    );
  };
}
