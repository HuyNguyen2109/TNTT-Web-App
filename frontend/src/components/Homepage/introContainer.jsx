import { Typography, Grid } from "@material-ui/core";
import { FormatQuote } from "@material-ui/icons";
import React from "react";
import { Button } from "../basic";
import { Parallax } from "react-skrollr";
// Styles
import styles from "./introContainer.module.scss";

export default class IntroComponent extends React.Component {

  setToggle = (bool) => {
    return this.props.toggleDialog(!bool)
  }

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
                    <div className={styles.border}>
                      <div style={{ height: "300px", position: "relative" }}>
                        <img
                          src={item.image}
                          alt={item.key}
                          className={styles.sloganImage}
                        />
                        <Typography variant="h5" className={styles.sloganTitle}>
                          {item.title}
                        </Typography>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.desc }}
                          className={styles.sloganDesc}
                        ></div>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
          <img src="/images/bg2.png" alt="Slogans" className={styles.img} />
        </div>
      </div>
    );
  };
}
