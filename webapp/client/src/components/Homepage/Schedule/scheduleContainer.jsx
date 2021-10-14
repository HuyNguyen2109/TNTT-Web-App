import {
  Typography,
  Hidden,
  Grid,
} from "@mui/material";
import {
  WbSunnyOutlined,
  Brightness2Outlined,
} from "@mui/icons-material";
import React from "react";
import { Parallax as SkrollrParallax } from "react-skrollr";
// Styles
import styles from "components/Homepage/Schedule/scheduleContainer.module.scss";

export default class ScheduleContainer extends React.Component {
  render = () => {
    const { generalData, childRef } = this.props;

    return (
      <div className={styles.scheduleContainer} ref={childRef}>
        <div className={styles.scheduleGridContainer}>
          <Grid container alignItems="center" alignContent="center">
            <Grid item md={6} xs={12} className={styles.item}>
              <SkrollrParallax
                data={{
                  "data-bottom-top": "opacity:0;transform:translateX(-500px)",
                  "data-bottom": "opacity:1;transform:translateX(0px)",
                }}
              >
                <img
                  src="public/images/dayClass.jpg"
                  alt="Day class"
                  className={styles.daylightImg}
                />
              </SkrollrParallax>
            </Grid>
            <Grid item md={6} xs={12} className={styles.item}>
              <SkrollrParallax
                data={{
                  "data-bottom-top": "opacity:0;transform:translateX(500px)",
                  "data-bottom": "opacity:1;transform:translateX(0px)",
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
              </SkrollrParallax>
            </Grid>
          </Grid>
          <Hidden mdUp>
            <Grid container alignItems="center" alignContent="center">
              <Grid item md={6} xs={12} className={styles.item}>
                <SkrollrParallax
                  data={{
                    "data-bottom-top": "opacity:0;transform:translateX(500px)",
                    "data-bottom": "opacity:1;transform:translateX(0px)",
                  }}
                >
                  <img
                    src="public/images/nightClass.JPG"
                    alt="Night class"
                    className={styles.nightImg}
                  />
                </SkrollrParallax>
              </Grid>
              <Grid item md={6} xs={12} className={styles.item}>
                <SkrollrParallax
                  data={{
                    "data-bottom-top":
                      "opacity:0;transform:translateX(-500px)",
                    "data-bottom": "opacity:1;transform:translateX(0px)",
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
                </SkrollrParallax>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden mdDown>
            <Grid container alignItems="center" alignContent="center">
              <Grid item md={6} xs={12} className={styles.item}>
                <SkrollrParallax
                  data={{
                    "data-bottom-top":
                      "opacity:0;transform:translateX(-500px)",
                    "data-bottom": "opacity:1;transform:translateX(0px)",
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
                </SkrollrParallax>
              </Grid>
              <Grid item md={6} xs={12} className={styles.item}>
                <SkrollrParallax
                  data={{
                    "data-bottom-top": "opacity:0;transform:translateX(500px)",
                    "data-bottom": "opacity:1;transform:translateX(0px)",
                  }}
                >
                  <img
                    src="public/images/nightClass.JPG"
                    alt="Night class"
                    className={styles.nightImg}
                  />
                </SkrollrParallax>
              </Grid>
            </Grid>
          </Hidden>
        </div>
      </div>
    );
  };
}
