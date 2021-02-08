import {
  Container,
  Typography,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Avatar,
  Link,
} from "@material-ui/core";
import {
  List,
  Person,
  Facebook,
  Mail,
  WbSunnyOutlined,
  Brightness2Outlined,
} from "@material-ui/icons";
import React from "react";
import classNames from "classnames";
import { Button, Paper, LoadingPage } from "../components/basic";
import { HomePage } from "../helpers/constant";
import { formatName } from "../helpers/functions";
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
      isDataLoading: true,
      currentDate: new Date(),
    };

    this.state = { ...this.initialState };
    // Initialize the event listener
    this.scrollEvent = null;
    // Initialize the ref for scrolling
    this.refList = {
      home: (this.homePage = React.createRef()),
      schedule: (this.classSchedule = React.createRef()),
      team: (this.teamMember = React.createRef()),
      contact: (this.contactInfo = React.createRef()),
    };
  }

  // Life cycle
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ isDataLoading: false });
    }, 3000);
    //handle scroll event
    this.setState({
      scrollStatus:
        document.scrollingElement.scrollTop >= HomePage.navHeight
          ? "amir"
          : "top",
    });
    this.scrollEvent = document.addEventListener("scroll", this.handleScroll);
  };

  componentDidUpdate = (prevState) => {
    if (
      prevState.isDataLoading !== this.state.isDataLoading &&
      this.state.isDataLoading
    ) {
      document.body.style.height = "100vh";
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflowY = "auto";
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.handleScroll, false);
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
    const { isMobileMenuOpen, isDataLoading, currentDate } = this.state;

    return (
      <div>
        {isDataLoading ? (
          <LoadingPage />
        ) : (
          <Container
            className={styles.container}
            disableGutters
            maxWidth={false}
            ref={this.refList.home}
          >
            <div className={styles.imgContainer}>
                <img className={styles.img} alt="" />
              <div className={styles.cover}>
                <div>
                  <Parallax
                    data={{
                      "data-top-bottom":
                        "opacity:0;transform:translateX(500px)",
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
                        window.scrollTo({
                          behavior: "smooth",
                          top:
                            this.refList.schedule.current.offsetTop -
                            HomePage.navHeight,
                        })
                      }
                    />
                  </Parallax>
                </div>
              </div>
              {/* Nav bar for desktop */}
              <Hidden smDown>
                <div
                  className={styles.homeNavBar}
                  style={{
                    height: `${HomePage.navHeight}px`,
                    backgroundColor:
                      this.state.scrollStatus === "top"
                        ? "transparent"
                        : "#fff",
                    transition: "background-color 0.25s linear",
                  }}
                >
                  <img
                    alt="TNTT-logo"
                    src="/logo.png"
                    onClick={() => {
                      window.scrollTo({
                        behavior: "smooth",
                        top: this.refList.home.current.offsetTop,
                      });
                    }}
                    style={{ cursor: "pointer" }}
                  />
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
                        href={link.key === "signin" ? "/login" : undefined}
                        onClick={() => {
                          link.key !== "signin" &&
                            this.refList[link.key] &&
                            (link.key === "home"
                              ? window.scrollTo({
                                  behavior: "smooth",
                                  top: this.refList[link.key].current.offsetTop,
                                })
                              : window.scrollTo({
                                  behavior: "smooth",
                                  top:
                                    this.refList[link.key].current.offsetTop -
                                    HomePage.navHeight,
                                }));
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
                    this.state.scrollStatus === "top"
                      ? styles.homeNavBarForMobile
                      : styles.homeNavBarForMobilewithWhiteBG
                  )}
                  style={{
                    height: `${HomePage.navHeight}px`,
                    backgroundColor:
                      this.state.scrollStatus === "top"
                        ? "transparent"
                        : "#fff",
                    transition: "background-color 200ms linear",
                  }}
                >
                  <img
                    alt="TNTT-logo"
                    src="/logo.png"
                    onClick={() => {
                      window.scrollTo({
                        behavior: "smooth",
                        top: this.refList.home.current.offsetTop,
                      });
                    }}
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
                        onClick={() => {
                          link.key !== "signin"
                            ? this.refList[link.key]
                              ? link.key === "home"
                                ? window.scrollTo({
                                    behavior: "smooth",
                                    top: this.refList[link.key].current
                                      .offsetTop,
                                  })
                                : window.scrollTo({
                                    behavior: "smooth",
                                    top:
                                      this.refList[link.key].current.offsetTop -
                                      HomePage.navHeight,
                                  })
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
                <Typography variant="subtitle1">
                  {HomePage.scrollDownForMore}
                </Typography>
                <div className={styles.mouse}></div>
              </div>
            </div>
            <div
              className={styles.scheduleContainer}
              ref={this.refList.schedule}
            >
              <div className={styles.scrollDownForMore}>
                <Parallax
                data={{
                  "data-center-top":
                    "opacity:0;transform:translateX(100px)",
                  "data-250-top": "opacity:1;transform:translateX(0px)"
                }}>
                  <Typography variant="h3" className={styles.scheduleTitle}>
                    {HomePage.scheduleTitle}
                  </Typography>
                </Parallax>
              </div>
              <div className={styles.scheduleGridContainer}>
                <Grid container style={{ height: "100%" }}>
                  <Grid item lg={6} xs={12} className={styles.item}>
                    <Parallax
                      data={{
                        "data-center-top":
                          "opacity:0;transform:translateX(-500px)",
                        "data-250-top": "opacity:1;transform:translateX(0px)",
                      }}
                    >
                      <img
                        src="/dayClass.jpg"
                        alt="Day class"
                        className={styles.daylightImg}
                      />
                      <div className={styles.dayCover}>
                        <div className={styles.classContent}>
                          <WbSunnyOutlined className={styles.sunIcon} />
                          <Typography variant="h3" align="center">
                            <strong>{HomePage.dayClassTitle}</strong>
                          </Typography>
                          <Typography variant="h5" align="center">
                            {HomePage.dayClassDesc}
                          </Typography>
                        </div>
                      </div>
                    </Parallax>
                  </Grid>
                  <Grid item lg={6} xs={12} className={styles.item}>
                    <Parallax
                      data={{
                        "data-center-top":
                          "opacity:0;transform:translateX(500px)",
                        "data-250-top": "opacity:1;transform:translateX(0px)",
                      }}
                    >
                      <img
                        src="/nightClass.JPG"
                        alt="Night class"
                        className={styles.nightImg}
                      />
                      <div className={styles.nightCover}>
                        <div className={styles.classContent}>
                          <Brightness2Outlined className={styles.moonIcon} />
                          <Typography
                            variant="h3"
                            align="center"
                            classes={{ root: styles.nightClassTitle }}
                          >
                            <strong>{HomePage.nightClassTitle}</strong>
                          </Typography>
                          <Typography
                            variant="h5"
                            classes={{ root: styles.nightClassTitle }}
                            align="center"
                          >
                            {HomePage.nightClassDesc}
                          </Typography>
                        </div>
                      </div>
                    </Parallax>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className={styles.teamMemberContainer} ref={this.refList.team}>
              <div className={styles.scrollDownForMore2}></div>
              <Parallax
                data={{
                  "data-bottom-top":
                    "opacity:0;transform:translateX(-500px);pointer-event:none",
                  "data-center":
                    "opacity:1;transform:translateX(0px);pointer-event:auto",
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
                    sm="auto"
                    xs={12}
                    className={styles.keyMemberAlphaContainer}
                  >
                    <Parallax
                      data={{
                        "data-bottom-top":
                          "opacity:0;transform:translateX(-100px)",
                        "data-50-center": "opacity:1;transform:translateX(0px)",
                      }}
                    >
                      <Paper
                        className={styles.keyMember}
                        content={
                          <React.Fragment>
                            <Paper
                              className={styles.avatar}
                              // TODO: Replace with real avatar in future
                              content={
                                <Avatar
                                  className={styles.avatarImg}
                                  src={mem.avatar}
                                >
                                  <Person
                                    style={{ fontSize: "100px", color: "#000" }}
                                  />
                                </Avatar>
                              }
                            />
                            <Typography variant="h6" className={styles.keyName}>
                              <p>{formatName(mem.fullName)}</p>
                              <strong>{mem.name}</strong>
                            </Typography>
                          </React.Fragment>
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
                    sm="auto"
                    xs={12}
                    className={styles.keyMemberAlphaContainer}
                  >
                    <Parallax
                      data={{
                        "data-bottom-top":
                          "opacity:0;transform:translateX(100px)",
                        "data-300-center":
                          "opacity:1;transform:translateX(0px)",
                      }}
                    >
                      <Paper
                        className={styles.keyMember}
                        content={
                          <React.Fragment>
                            <Paper
                              className={styles.avatar}
                              // TODO: Replace with real avatar in future
                              content={
                                <Avatar
                                  className={styles.avatarImg}
                                  src={mem.avatar}
                                >
                                  <Person
                                    style={{ fontSize: "100px", color: "#000" }}
                                  />
                                </Avatar>
                              }
                            />
                            <Typography variant="h6" className={styles.keyName}>
                              <p>{formatName(mem.fullName)}</p>
                              <strong>{mem.name}</strong>
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Parallax>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className={styles.contactContainer} ref={this.refList.contact}>
              <Parallax
                data={{
                  "data-bottom-top": "opacity:0;transform:translateX(-100px)",
                  "data-bottom": "opacity:1;transform:translateX(0px)",
                }}
              >
                <Typography variant="h5" className={styles.copyRight}>
                  <strong>{currentDate.getFullYear()}</strong>
                  {`, ${HomePage.orgName}`}
                </Typography>
              </Parallax>
              <div style={{ flex: 1 }}></div>
              <Parallax
                data={{
                  "data-bottom-top": "opacity:0;transform:translateX(50px)",
                  "data-bottom": "opacity:1;transform:translateX(0px)",
                }}
              >
                <div className={styles.socialLinks}>
                  <div className={styles.socialLinkContainer}>
                    <span className={styles.title}>
                      <Link href={HomePage.facebookLink} target="_blank">
                        Facebook
                      </Link>
                    </span>
                    <Facebook classes={{ root: styles.icon }} />
                  </div>
                  <div className={styles.socialLinkContainer}>
                    <span className={styles.title}>
                      <Link
                        href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${HomePage.gmailLink}`}
                        target="_blank"
                      >
                        Gmail
                      </Link>
                    </span>
                    <Mail classes={{ root: styles.icon }} />
                  </div>
                </div>
              </Parallax>
              <Parallax
                data={{
                  "data-bottom-top": "opacity:0;transform:translateX(100px)",
                  "data-bottom": "opacity:1;transform:translateX(0px)",
                }}
              >
                <Typography
                  variant="h5"
                  className={classNames(styles.copyRight, styles.contactUs)}
                >
                  {HomePage.contactUs}
                </Typography>
              </Parallax>
            </div>
          </Container>
        )}
      </div>
    );
  };
}

export default Home;
