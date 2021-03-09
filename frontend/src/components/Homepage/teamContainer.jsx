import {
  Typography,
  Grid,
  Avatar,
} from "@material-ui/core";
import {
  Person,
} from "@material-ui/icons";
import React from "react";
import { Paper } from "../basic";
import { Parallax } from "react-skrollr";
// Styles
import styles from "./teamContainer.module.scss";
// Helpers
import { formatName } from "../../helpers/functions";

export default class TeamContainer extends React.Component {
  render = () => {
    const { generalData, childRef } = this.props;

    return (
      <div className={styles.teamMemberContainer} ref={childRef}>
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
            {generalData.teamMemberTitle}
          </Typography>
        </Parallax>
        <Grid
          container
          className={styles.keyMemberContainer}
          spacing={2}
          justify="center"
        >
          {generalData.alphaKeyMembers.map((mem, i) => (
            <Grid
              item
              key={mem.key}
              sm="auto"
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
                    <React.Fragment>
                      <Paper
                        className={styles.avatar}
                        // TODO: Replace with real avatar in future
                        content={
                          <Avatar className={styles.avatarImg} src={mem.avatar}>
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
          {generalData.betaKeyMembers.map((mem) => (
            <Grid
              item
              key={mem.key}
              sm="auto"
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
                    <React.Fragment>
                      <Paper
                        className={styles.avatar}
                        // TODO: Replace with real avatar in future
                        content={
                          <Avatar className={styles.avatarImg} src={mem.avatar}>
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
    );
  };
}
