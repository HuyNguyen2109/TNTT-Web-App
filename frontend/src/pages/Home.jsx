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
  Tooltip,
  Toolbar,
} from "@material-ui/core";
import {
  List,
  Person,
  Facebook,
  Mail,
  WbSunnyOutlined,
  Brightness2Outlined,
  FormatQuote,
  InfoOutlined,
} from "@material-ui/icons";
import React from "react";
import classNames from "classnames";
import { Button, Paper, LoadingPage, Dialog } from "../components/basic";
import { Parallax } from "react-skrollr";
// Styles
import styles from "./Home.module.scss";
// Helpers
import { HomePage } from "../helpers/constant";
import { formatName, setDocumentTitle } from "../helpers/functions";
import { bioForm } from "../helpers/styles";
import { html as htmlApis } from "../helpers/api";

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
      isSaintBioDialog: false,
      saintExternalHtml: '',
    };

    this.state = { ...this.initialState };
    // Initialize the event listener
    this.scrollEvent = null;
    // Initialize the ref for scrolling
    this.refList = {
      home: (this.homePage = React.createRef()),
      intro: (this.introduction = React.createRef()),
      schedule: (this.classSchedule = React.createRef()),
      team: (this.teamMember = React.createRef()),
      contact: (this.contactInfo = React.createRef()),
    };
  }

  // Life cycle

  componentWillMount = () => {
    htmlApis.getContent()
      .then(res => {
        this.setState({saintExternalHtml: res})
      })
      .catch(err => console.log(err))
  }

  componentDidMount = () => {
    setDocumentTitle(HomePage.documentTitle);
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
    this.scrollEvent = document.addEventListener("scroll", this.handleScroll, {
      passive: true,
    });
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

    switch (true) {
      case window.innerHeight + window.scrollY >= document.body.offsetHeight:
        return this.setActiveNavItem("contact");
      case this.refList.intro.current &&
        this.isZoneEl(this.refList.intro.current):
        return this.setActiveNavItem("intro");
      case this.refList.schedule.current &&
        this.isZoneEl(this.refList.schedule.current):
        return this.setActiveNavItem("schedule");
      case this.refList.team.current &&
        this.isZoneEl(this.refList.team.current):
        return this.setActiveNavItem("team");
      default:
        return this.setActiveNavItem("home");
    }
  };

  setActiveNavItem = (el) => {
    if (el && document.querySelector("#marker")) {
      let marker = document.querySelector("#marker");
      if (el !== "home") {
        marker.style.left = document.getElementById(el).offsetLeft + "px";
        marker.style.width = document.getElementById(el).offsetWidth + "px";
      } else {
        marker.style.left = "0px";
        marker.style.width = "0px";
      }
    }
  };

  isZoneEl = (el) => {
    return (
      el.getBoundingClientRect().top - HomePage.navHeight < 0 &&
      el.getBoundingClientRect().bottom - HomePage.navHeight >= 0
    );
  };

  //Render
  render = () => {
    const { isMobileMenuOpen, isDataLoading, currentDate, isSaintBioDialog } = this.state;

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
              <img className={styles.img} alt="cover" src="/bg.jpg" />
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
                      {HomePage.orgName}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h3"
                      className={classNames(
                        styles.grandTitle,
                        styles.subGrandTitle
                      )}
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
                            this.refList.intro.current.offsetTop -
                            HomePage.navHeight +
                            1,
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
                    transition: "background-color 0.5s linear",
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
                    <div id="marker" className={styles.marker}></div>
                    {HomePage.navLinks.map((link) => (
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
                                    HomePage.navHeight +
                                    1,
                                }));
                          this.setActiveNavItem(link.key);
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
                <div className={styles.mouse}></div>
              </div>
            </div>
            <div className={styles.introContainer} ref={this.refList.intro}>
              <div className={styles.inner}>
                <Grid
                  container
                  alignContent="center"
                  alignItems="center"
                  className={styles.saintIntro}
                >
                  <Grid item xs={12} lg={4}>
                    <div
                      style={{
                        overflow: "hidden",
                        width: "333px",
                        height: "546px",
                        margin: "auto",
                      }}
                    >
                      <img
                        src="./anethanh.jpeg"
                        alt="anethanh"
                        className={styles.img}
                      />
                    </div>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontFamily: '"Pacifico", cursive',
                      }}
                    >
                      {HomePage.saintIntro.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={8}>
                    <div>
                      <FormatQuote classes={{ root: styles.qoute }} />
                      <Typography variant="h4" className={styles.bigSentence}>
                        {HomePage.saintIntro.bigSentence}
                      </Typography>
                      <Button
                        className={styles.bio}
                        variant="outlined"
                        label={'Tiểu sử'}
                        size="large"
                        onClick={() => this.setState({isSaintBioDialog: true})}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div
              className={styles.scheduleContainer}
              ref={this.refList.schedule}
            >
              <div className={styles.scheduleGridContainer}>
                <Grid container alignItems="center" alignContent="center">
                  <Grid item lg={6} xs={12} className={styles.item}>
                    <Parallax
                      data={{
                        "data--100-bottom":
                          "opacity:0;transform:translateX(-500px)",
                        "data-center": "opacity:1;transform:translateX(0px)",
                      }}
                    >
                      <img
                        src="/dayClass.jpg"
                        alt="Day class"
                        className={styles.daylightImg}
                      />
                    </Parallax>
                  </Grid>
                  <Grid item lg={6} xs={12} className={styles.item}>
                    <Parallax
                      data={{
                        "data--200-bottom":
                          "opacity:0;transform:translateX(500px)",
                        "data-center": "opacity:1;transform:translateX(0px)",
                      }}
                    >
                      <div className={styles.classContent}>
                        <WbSunnyOutlined className={styles.sunIcon} />
                        <Typography
                          variant="h3"
                          align="center"
                          classes={{ root: styles.nightClassTitle }}
                        >
                          <strong>{HomePage.dayClassTitle}</strong>
                        </Typography>
                        <Typography
                          variant="h5"
                          align="right"
                          className={styles.classDesc}
                        >
                          {HomePage.dayClassDesc}
                        </Typography>
                      </div>
                    </Parallax>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" alignContent="center">
                  <Grid item lg={6} xs={12} className={styles.item}>
                    <Parallax
                      data={{
                        "data--200-bottom":
                          "opacity:0;transform:translateX(-500px)",
                        "data-center": "opacity:1;transform:translateX(0px)",
                      }}
                    >
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
                          align="left"
                          className={styles.classDesc}
                        >
                          {HomePage.nightClassDesc}
                        </Typography>
                      </div>
                    </Parallax>
                  </Grid>
                  <Grid item lg={6} xs={12} className={styles.item}>
                    <Parallax
                      data={{
                        "data--100-bottom":
                          "opacity:0;transform:translateX(500px)",
                        "data-center": "opacity:1;transform:translateX(0px)",
                      }}
                    >
                      <img
                        src="/nightClass.JPG"
                        alt="Night class"
                        className={styles.nightImg}
                      />
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
              <div className={styles.inner}>
                <Parallax
                  data={{
                    "data-bottom-top": "opacity:0;transform:translateX(500px)",
                    "data-bottom": "opacity:1;transform:translateX(0px)",
                  }}
                >
                  <Typography
                    variant="h3"
                    className={classNames(styles.copyRight, styles.contactUs)}
                  >
                    {HomePage.contactUs}
                  </Typography>
                  <Typography
                    variant="h5"
                    className={classNames(
                      styles.copyRight,
                      styles.contactUsSubtitle
                    )}
                  >
                    {HomePage.contactUsSubtitle}
                  </Typography>
                </Parallax>
                <Grid
                  container
                  alignContent="center"
                  alignItems="center"
                  className={styles.socialLinks}
                >
                  <Grid item xs={6} style={{position: 'relative', height: 'inherit'}}>
                    <div className={styles.socialLinkContainer}>
                      <Tooltip title={HomePage.facebookLink} placement="top">
                        <IconButton
                          component="a"
                          href={HomePage.facebookLink}
                          target="_blank"
                        >
                          <Facebook classes={{ root: styles.icon }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Grid>
                  <Grid item xs={6} style={{position: 'relative', height: 'inherit'}}>
                    <div className={styles.socialLinkContainerR}>
                      <Tooltip title={HomePage.gmailLink} placement="top">
                        <IconButton
                          component="a"
                          href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${HomePage.gmailLink}`}
                          target="_blank"
                        >
                          <Mail classes={{ root: styles.icon }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </Grid>
                </Grid>
                <Typography
                  variant="h6"
                  className={classNames(styles.copyRight, styles.orgName)}
                >
                  {`${HomePage.orgName} @ `}
                  <strong>{currentDate.getFullYear()}</strong>
                </Typography>
              </div>
            </div>
          </Container>
        )}
        <Dialog 
          title={`Tiểu sử ${HomePage.saintIntro.name}`}
          icon={<InfoOutlined style={bioForm.icon} />}
          open={isSaintBioDialog}
          handleClose={(val) => this.setState({isSaintBioDialog: val})}
          content={
            <React.Fragment>
              <div className={styles.bioContainer} style={bioForm.container}>
                <div className={styles.externalHtml} dangerouslySetInnerHTML={{__html: this.state.saintExternalHtml}}></div>
              </div>
            </React.Fragment>
          }
          action={
            <Toolbar>
              <div style={{ flexGlow: "1" }} />
              <Button 
                label="đóng"
                variant="contained"
                size="large"
                style={bioForm.closeButton}
                onClick={() => this.setState({isSaintBioDialog: false})}
              />
            </Toolbar>
          }
        />
      </div>
    );
  };
}

export default Home;
