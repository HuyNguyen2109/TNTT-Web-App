import {
  Typography,
  Hidden,
  Grid,
} from "@material-ui/core";
import {
  WbSunnyOutlined,
  Brightness2Outlined,
} from "@material-ui/icons";
import React from "react";
import { Parallax } from "react-skrollr";
// Styles
import styles from "./scheduleContainer.module.scss";

export default class ScheduleContainer extends React.Component {
  render = () => {
    const { generalData, childRef } = this.props;

    return (
      <div className={styles.scheduleContainer} ref={childRef}>
        <div className={styles.scheduleGridContainer}>
          <Grid container alignItems="center" alignContent="center">
            <Grid item md={6} xs={12} className={styles.item}>
              <Parallax
                data={{
                  "data--100-bottom": "opacity:0;transform:translateX(-500px)",
                  "data-300-top": "opacity:1;transform:translateX(0px)",
                }}
              >
                <img
                  src="/images/dayClass.jpg"
                  alt="Day class"
                  className={styles.daylightImg}
                />
              </Parallax>
            </Grid>
            <Grid item md={6} xs={12} className={styles.item}>
              <Parallax
                data={{
                  "data--200-bottom": "opacity:0;transform:translateX(500px)",
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
                    <strong>{generalData.dayClassTitle}</strong>
                  </Typography>
                  <Typography
                    variant="h5"
                    align="right"
                    className={styles.classDesc}
                  >
                    {generalData.dayClassDesc}
                  </Typography>
                </div>
              </Parallax>
            </Grid>
          </Grid>
          <Hidden mdUp>
            <Grid container alignItems="center" alignContent="center">
              <Grid item md={6} xs={12} className={styles.item}>
                <Parallax
                  data={{
                    "data--100-bottom": "opacity:0;transform:translateX(500px)",
                    "data-300-top": "opacity:1;transform:translateX(0px)",
                  }}
                >
                  <img
                    src="/images/nightClass.JPG"
                    alt="Night class"
                    className={styles.nightImg}
                  />
                </Parallax>
              </Grid>
              <Grid item md={6} xs={12} className={styles.item}>
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
                      <strong>{generalData.nightClassTitle}</strong>
                    </Typography>
                    <Typography
                      variant="h5"
                      align="left"
                      className={styles.classDesc}
                    >
                      {generalData.nightClassDesc}
                    </Typography>
                  </div>
                </Parallax>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden smDown>
            <Grid container alignItems="center" alignContent="center">
              <Grid item md={6} xs={12} className={styles.item}>
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
                      <strong>{generalData.nightClassTitle}</strong>
                    </Typography>
                    <Typography
                      variant="h5"
                      align="left"
                      className={styles.classDesc}
                    >
                      {generalData.nightClassDesc}
                    </Typography>
                  </div>
                </Parallax>
              </Grid>
              <Grid item md={6} xs={12} className={styles.item}>
                <Parallax
                  data={{
                    "data--100-bottom": "opacity:0;transform:translateX(500px)",
                    "data-300-top": "opacity:1;transform:translateX(0px)",
                  }}
                >
                  <img
                    src="/images/nightClass.JPG"
                    alt="Night class"
                    className={styles.nightImg}
                  />
                </Parallax>
              </Grid>
            </Grid>
          </Hidden>
        </div>
      </div>
    );
  };
}
