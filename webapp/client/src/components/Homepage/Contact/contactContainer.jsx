import { Typography, IconButton, Grid, Tooltip, Hidden } from "@mui/material";
import { ChevronRight, Facebook, LocationOn, Mail } from "@mui/icons-material";
import React from "react";
import classNames from "classnames";
import { Parallax } from "react-skrollr";
// Styles
import styles from "components/Homepage/Contact/contactContainer.module.scss";
import { Button } from "components/basic";

export default class ContactContainer extends React.Component {
  render = () => {
    const {
      generalData,
      childRef,
      currDate,
      outputRef,
      setActiveNavKey,
    } = this.props;

    return (
      <div className={styles.contactContainer} ref={childRef}>
        <div className={styles.inner}>
          <Parallax
            data={{
              "data-bottom-top": "opacity:0;transform:translateX(500px)",
              "data-bottom": "opacity:1;transform:translateX(0px)",
            }}
          >
            <Grid
              container
              className={styles.contactGridContainer}
              alignContent="center"
            >
              <Hidden mdDown>
                <Grid item xs={12} md={6} lg={4}>
                  <div className={styles.img}>
                    <img src="public/images/logo.png" width="150" height="150" />
                    <Typography
                      variant="subtitle1"
                      className={styles.copyRight}
                    >
                      {generalData.subGrandTitle}
                    </Typography>
                  </div>
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={4} md={6} lg={4}>
                <div className={styles.links}>
                  <Typography
                    variant="h5"
                    className={classNames(styles.copyRight, styles.contactUs)}
                  >
                    {"Đường dẫn"}
                  </Typography>
                  {generalData.navLinks.map(
                    (link) =>
                      link.key !== "signin" && (
                        <div className={styles.link} key={link.key}>
                          <span>
                            <ChevronRight
                              classes={{ root: styles.copyRight }}
                            />
                          </span>
                          <Button
                            label={link.name}
                            variant="text"
                            size="large"
                            className={styles.copyRight}
                            onClick={() => {
                              outputRef(link.key);
                              setActiveNavKey(link.key);
                            }}
                          />
                        </div>
                      )
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <div className={styles.contact}>
                  <Typography
                    variant="h5"
                    className={classNames(styles.copyRight, styles.contactUs)}
                  >
                    {generalData.contactUs}
                  </Typography>
                  <div className={styles.socialLinkContainer}>
                    <IconButton
                      component="a"
                      href={generalData.ggMapLocation}
                      target="_blank"
                      size="large">
                      <LocationOn classes={{ root: styles.icon }} />
                      <span className={styles.copyRight}>
                        {generalData.location}
                      </span>
                    </IconButton>
                  </div>
                  <div className={styles.socialLinkContainer}>
                    <IconButton
                      component="a"
                      href={generalData.facebookLink}
                      target="_blank"
                      size="large">
                      <Facebook classes={{ root: styles.icon }} />
                      <span className={styles.copyRight}>
                        {generalData.facebookLink}
                      </span>
                    </IconButton>
                  </div>
                  <div className={styles.socialLinkContainer}>
                    <IconButton
                      component="a"
                      href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${generalData.gmailLink}`}
                      target="_blank"
                      size="large">
                      <Mail classes={{ root: styles.icon }} />
                      <span className={styles.copyRight}>
                        {generalData.gmailLink}
                      </span>
                    </IconButton>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Parallax>
          <Typography
            variant="h6"
            className={classNames(styles.copyRight, styles.orgName)}
          >
            {`${generalData.orgName} @ `}
            <strong>{"2016 - " + currDate.getFullYear()}</strong>
          </Typography>
        </div>
      </div>
    );
  };
}
