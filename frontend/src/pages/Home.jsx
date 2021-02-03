import {
  Container,
  Typography,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Avatar,
} from "@material-ui/core";
import { List, Person } from "@material-ui/icons";
import React from "react";
import classNames from "classnames";
import { Button, Paper } from "../components/basic";
import { HomePage } from "../helpers/constant";
import styles from "./Home.module.scss";
import { Parallax } from "react-skrollr";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.initialState = {
      isMobileMenuOpen: null,
      scrollStatus: "top",
      scrolled: 0,
      isTeamMemberOpen: false,
    };

    this.state = { ...this.initialState };
    // Initialize the event listener
    this.scrollEvent = null;
    // Initialize the ref for scrolling
    this.teamMember = React.createRef();
  }

  // Life cycle
  componentDidMount = () => {
    //handle scroll event
    this.scrollEvent = document.addEventListener("scroll", this.handleScroll);
  };
  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.scrollEvent, false);
  };
  // Methods
  handleScroll = () => {
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
  };
  //Render
  render = () => {
    const { isMobileMenuOpen } = this.state;

    return (
      <Container className={styles.container} disableGutters maxWidth={false}>
        <div className={styles.imgContainer}>
          <img className={styles.img} alt="" />
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
                  variant="outlined"
                  label={HomePage.learnMore}
                  size="large"
                  onClick={() =>
                    this.teamMember.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                />
              </Parallax>
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
                transition: "background-color 200ms linear",
              }}
            >
              <img alt="TNTT-logo" src="/logo.png" />
              <div style={{ flex: 1 }}></div>
              <div
                className={
                  this.state.scrollStatus === "top"
                    ? styles.linkList
                    : styles.linkListWithWhiteBG
                }
              >
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
                this.state.scrollStatus === "top"
                  ? styles.homeNavBarForMobile
                  : styles.homeNavBarForMobilewithWhiteBG
              )}
              style={{
                height: `${HomePage.navHeight}px`,
                backgroundColor:
                  this.state.scrollStatus === "top" ? "transparent" : "#fff",
                transition: "background-color 200ms linear",
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
                {HomePage.navLinks.map((link) => (
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
                  >
                    {link.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Hidden>
          <div className={styles.scrollDownForMore1}>
            <Typography variant="subtitle1">
              {HomePage.scrollDownForMore}
            </Typography>
          </div>
        </div>
        <div className={styles.teamMemberContainer} ref={this.teamMember}>
          <div className={styles.scrollDownForMore2}></div>
          <Parallax
            data={{
              "data-bottom-top": "opacity:0;transform:translateX(-500px)",
              "data-center": "opacity:1;transform:translateX(0px)",
            }}
          >
            <Typography variant="h3" className={styles.teamMemberTitle}>
              {HomePage.teamMemberTitle}
            </Typography>
          </Parallax>
          <Grid
            container
            className={styles.keyMemberContainer}
            spacing={2}
            justify="center"
          >
            {HomePage.alphaKeyMembers.map((mem, i) => (
              <Grid
                item
                key={mem.key}
                md="auto"
                xs={12}
                className={styles.keyMemberAlphaContainer}
              >
                <Parallax
                  data={{
                    "data-bottom-top": "opacity:0;transform:translateX(-100px)",
                    "data-50-center": "opacity:1;transform:translateX(0px)",
                  }}
                >
                  <Paper
                    className={styles.keyMember}
                    content={
                      <Paper
                        className={styles.avatar}
                        // TODO: Replace with real avatar in future
                        content={
                          <Avatar className={styles.avatarImg}>
                            <Person
                              style={{ fontSize: "100px", color: "#000" }}
                            />
                          </Avatar>
                        }
                      />
                    }
                  />
                </Parallax>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            className={styles.keyMemberContainer}
            spacing={2}
            justify="center"
          >
            {HomePage.betaKeyMembers.map((mem) => (
              <Grid
                item
                key={mem.key}
                md="auto"
                xs={12}
                className={styles.keyMemberAlphaContainer}
              >
                <Parallax
                  data={{
                    "data-bottom-top": "opacity:0;transform:translateX(100px)",
                    "data-300-center": "opacity:1;transform:translateX(0px)",
                  }}
                >
                  <Paper
                    className={styles.keyMember}
                    content={
                      <Paper
                        className={styles.avatar}
                        // TODO: Replace with real avatar in future
                        content={
                          <Avatar className={styles.avatarImg}>
                            <Person
                              style={{ fontSize: "100px", color: "#000" }}
                            />
                          </Avatar>
                        }
                      />
                    }
                  />
                </Parallax>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={styles.teamMemberContainer}></div>
      </Container>
    );
  };
}

export default Home;
