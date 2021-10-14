import { Typography, Hidden, IconButton, Menu, MenuItem } from "@material-ui/core";
import { List } from "@material-ui/icons";
import React from "react";
import { Parallax, ParallaxBanner, withController } from "react-scroll-parallax";
import classNames from "classnames";
// Styles
import styles from "components/Homepage/GrandImage/imgContainer.module.scss";
import { Button } from "components/basic";

class ImgContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...this.initialState };

    this.initialState = {
      isMobileMenuOpen: null,
    };
  }

  render = () => {
    const { isMobileMenuOpen } = this.state;
    const { generalData, childRef, refsList, setActiveNavKey, outputRef } = this.props;

    return (
      <div className={styles.imgContainer} ref={childRef}>
        <ParallaxBanner
          className={styles.img}
          layers={[
            {
              image: 'public/images/bg.jpg',
              amount: 1,
              expanded: false
            }
          ]}
          style={{
            height: '100vh'
          }}
        ></ParallaxBanner>
        {/* <img className={styles.img} alt="cover" src="" /> */}
        <div className={styles.cover}>
          <Parallax
            // data={{
            //   "data-top-bottom": "opacity:0;transform:translateX(500px)",
            //   "data-center": "opacity:1;transform:translateX(0px)",
            // }}

            x={[-25, 25]}
          >
            <Typography align="center" variant="h1" className={classNames(styles.grandTitle)}>
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
              onClick={() => outputRef("intro")}
            />
          </Parallax>
        </div>
        {/* Nav bar for desktop */}
        <Hidden smDown>
          <div
            id="desktop-navbar"
            className={styles.homeNavBar}
            style={{
              height: `${generalData.navHeight}px`,
            }}
          >
            <img
              alt="TNTT-logo"
              src="public/images/logo.png"
              onClick={() => outputRef("home")}
              style={{ cursor: "pointer" }}
            />
            <div style={{ flex: 1 }}></div>
            <div id="desktop-navbar-items" className={styles.linkList}>
              <div id="marker" className={styles.marker}></div>
              {generalData.navLinks.map((link) => (
                <Button
                  key={link.key}
                  id={link.key}
                  className={link.key === "signin" ? styles.signIn : styles.link}
                  label={link.name}
                  variant={link.key === "signin" ? "outlined" : "text"}
                  size="large"
                  href={link.key === "signin" ? "/login" : undefined}
                  onClick={() => {
                    link.key !== "signin" &&
                      refsList[link.key] &&
                      (link.key === "home" ? outputRef("home") : outputRef(link.key));
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
            id="mobile-navbar"
            // homeNavBarForMobilewithWhiteBG
            className={classNames(styles.homeNavBar, styles.homeNavBarForMobile)}
            style={{
              height: `${generalData.navHeight}px`,
            }}
          >
            <img
              alt="TNTT-logo"
              src="public/images/logo.png"
              onClick={() => outputRef("home")}
              style={{ cursor: "pointer" }}
            />
            <div style={{ flex: 1 }}></div>
            <IconButton
              className={styles.mobileMenu}
              onClick={(event) => this.setState({ isMobileMenuOpen: event.currentTarget })}
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
                          ? outputRef("home")
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

export default withController(ImgContainer);
