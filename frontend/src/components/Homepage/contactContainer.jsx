import {
  Typography,
  IconButton,
  Grid,
  Tooltip
} from "@material-ui/core";
import {
  Facebook,
  Mail,
} from "@material-ui/icons";
import React from "react";
import classNames from "classnames";
import { Parallax } from "react-skrollr";
// Styles
import styles from "./contactContainer.module.scss";

export default class ContactContainer extends React.Component {
  render = () => {
    const { generalData, childRef, currDate } = this.props;

    return (
      <div className={styles.contactContainer} ref={childRef}>
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
              {generalData.contactUs}
            </Typography>
            <Typography
              variant="h5"
              className={classNames(styles.copyRight, styles.contactUsSubtitle)}
            >
              {generalData.contactUsSubtitle}
            </Typography>
          </Parallax>
          <Grid
            container
            alignContent="center"
            alignItems="center"
            className={styles.socialLinks}
          >
            <Grid
              item
              xs={6}
              style={{ position: "relative", height: "inherit" }}
            >
              <div className={styles.socialLinkContainer}>
                <Tooltip title={generalData.facebookLink} placement="top">
                  <IconButton
                    component="a"
                    href={generalData.facebookLink}
                    target="_blank"
                  >
                    <Facebook classes={{ root: styles.icon }} />
                  </IconButton>
                </Tooltip>
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              style={{ position: "relative", height: "inherit" }}
            >
              <div className={styles.socialLinkContainerR}>
                <Tooltip title={generalData.gmailLink} placement="top">
                  <IconButton
                    component="a"
                    href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${generalData.gmailLink}`}
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
            {`${generalData.orgName} @ `}
            <strong>{currDate.getFullYear()}</strong>
          </Typography>
        </div>
      </div>
    );
  };
}
