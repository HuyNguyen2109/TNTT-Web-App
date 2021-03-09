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
  Fab,
  Zoom,
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
  ArrowUpward,
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
// Child components
import { ContactContainer, ImgContainer, IntroContainer, ScheduleContainer, TeamContainer } from "../components/Homepage";

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
      saintExternalHtml: "",
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

  UNSAFE_componentWillMount = () => {
    htmlApis
      .getContent()
      .then((res) => {
        this.setState({ saintExternalHtml: res });
      })
      .catch((err) => console.log(err));
  };

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

  setActiveRef = (keyName) => {
    window.scrollTo({
      behavior: "smooth",
      top: keyName === 'home' ? 
            this.refList[keyName].current.offsetTop : 
            this.refList[keyName].current.offsetTop -
                                HomePage.navHeight + 1
    })
  }

  isZoneEl = (el) => {
    return (
      el.getBoundingClientRect().top - HomePage.navHeight < 0 &&
      el.getBoundingClientRect().bottom - HomePage.navHeight >= 0
    );
  };

  //Render
  render = () => {
    const {
      isDataLoading,
      currentDate,
      isSaintBioDialog,
    } = this.state;

    return (
      <div style={{ position: "relative" }}>
        {isDataLoading ? (
          <LoadingPage />
        ) : (
          <Container
            className={styles.container}
            disableGutters
            maxWidth={false}
          >
            <ImgContainer
              childRef={this.refList.home}
              refsList={this.refList}
              scrollStatus={this.state.scrollStatus}
              setActiveNavKey={(data) => this.setActiveNavItem(data)}
              outputRef={(keyName) => this.setActiveRef(keyName)}
              generalData={HomePage}
            />

            <IntroContainer
              childRef={this.refList.intro}
              generalData={HomePage}
              dialogFlag={isSaintBioDialog}
              toggleDialog={(val) => this.setState({isSaintBioDialog: val})}
            />
            
            <ScheduleContainer 
              childRef={this.refList.schedule}
              generalData={HomePage}
            />
            
            <TeamContainer 
              childRef={this.refList.team}
              generalData={HomePage}
            />

            <ContactContainer 
              childRef={this.refList.contact}
              generalData={HomePage}
              currDate={currentDate}
            />
          </Container>
        )}
        <Dialog
          title={`Tiểu sử ${HomePage.saintIntro.name}`}
          icon={<InfoOutlined style={bioForm.icon} />}
          open={isSaintBioDialog}
          handleClose={(val) => this.setState({ isSaintBioDialog: val })}
          content={
            <React.Fragment>
              <div className={styles.bioContainer} style={bioForm.container}>
                <Hidden mdUp>
                  <div className={styles.bioImage}>
                    <img
                      src="/images/anethanh.jpeg"
                      width="200"
                      alt="Saint-bio"
                    />
                  </div>
                </Hidden>
                <div
                  className={styles.externalHtml}
                  dangerouslySetInnerHTML={{
                    __html: this.state.saintExternalHtml,
                  }}
                ></div>
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
                onClick={() => this.setState({ isSaintBioDialog: false })}
              />
            </Toolbar>
          }
        />

        <Zoom
          unmountOnExit
          in={this.state.scrollStatus === "amir"}
          timeout={{ enter: 200, exit: 200 }}
          style={{
            transitionDelay: `${
              this.state.scrollStatus === "amir" ? 200 : 0
            }ms`,
          }}
        >
          <Tooltip title="Lên đầu trang">
            <Fab
              className={styles.goToHomeBtn}
              onClick={() => this.setActiveRef('home')}
            >
              <ArrowUpward className={styles.goToHomeIcon} />
            </Fab>
          </Tooltip>
        </Zoom>
      </div>
    );
  };
}

export default Home;
