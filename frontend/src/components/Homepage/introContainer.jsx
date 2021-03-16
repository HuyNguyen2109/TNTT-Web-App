import { Typography, Grid } from "@material-ui/core";
import { FormatQuote, StyleRounded } from "@material-ui/icons";
import React from "react";
import { Button } from "../basic";
import { Parallax } from "react-skrollr";
// Styles
import styles from "./introContainer.module.scss";
import classNames from "classnames";

export default class IntroComponent extends React.Component {
  setToggle = (bool) => {
    return this.props.toggleDialog(!bool);
  };

  handleTimelineSelection = (year) => {
    this.props.generalData.timelines.forEach((tl) => {
      document
        .querySelector(`#timeline-${tl.year}`)
        .classList.remove(styles.active);
      document.querySelector(`#timeline-${year}`).classList.add(styles.active);
    });
  };

  render = () => {
    const { generalData, childRef, dialogFlag } = this.props;

    return (
      <div className={styles.introContainer} ref={childRef}>
        <div className={styles.inner}>
          <Grid
            container
            alignContent="center"
            alignItems="center"
            className={styles.saintIntro}
          >
            <Grid item xs={12} md={4}>
              <div
                style={{
                  overflow: "hidden",
                  width: "333px",
                  height: "546px",
                  margin: "auto",
                }}
              >
                <img
                  src="./images/anethanh.jpeg"
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
                {generalData.saintIntro.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <div>
                <FormatQuote classes={{ root: styles.qoute }} />
                <Typography variant="h4" className={styles.bigSentence}>
                  {generalData.saintIntro.bigSentence}
                </Typography>
                <Button
                  className={styles.bio}
                  variant="outlined"
                  label={"Tiểu sử"}
                  size="large"
                  onClick={() => this.setToggle(dialogFlag)}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={styles.slogansContainer}>
          <div className={styles.cover}>
            <div className={styles.inner}>
              <Grid container className={styles.slogansGridContainer}>
                {generalData.slogans.map((item) => (
                  <Grid
                    item
                    key={item.key}
                    xs={3}
                    className={styles.slogansGridItem}
                  >
                    <Parallax
                      data={item['skrollr-data']}
                    >
                      <div className={styles.border}>
                        <div style={{ height: "300px", position: "relative" }}>
                          <img
                            src={item.image}
                            alt={item.key}
                            className={styles.sloganImage}
                          />
                          <Typography
                            variant="h5"
                            className={styles.sloganTitle}
                          >
                            {item.title}
                          </Typography>
                          <div
                            dangerouslySetInnerHTML={{ __html: item.desc }}
                            className={styles.sloganDesc}
                          ></div>
                        </div>
                      </div>
                    </Parallax>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
          <img src="/images/bg2.png" alt="Slogans" className={styles.img} />
        </div>
        <div className={styles.timelineContainer}>
          <div className={styles.inner}>
            <Grid
              container
              alignContent="center"
              alignItems="center"
              style={{ width: "inherit", height: "inherit" }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                className={styles.timelineItemContainer}
              >
                <div className={styles.timelineKey}>
                  <div>
                    {generalData.timelines.map((time) => (
                      <Button
                        key={time.year}
                        id={`timeline-${time.year}`}
                        className={
                          time.year === "2016"
                            ? classNames(styles.time, styles.active)
                            : styles.time
                        }
                        variant="text"
                        label={time.year}
                        size="large"
                        onClick={() => this.handleTimelineSelection(time.year)}
                      />
                    ))}
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={9}
                className={styles.timelineItemContainer}
              ></Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  };
}
