import React from "react";
import {Popover, Divider, Typography, Fade} from "@material-ui/core";
import { InfoOutlined } from '@material-ui/icons';
import { Button } from "../basic";
import classNames from "classnames";

import styles from "./TermAndCondition.module.scss";

export default class TermAndCondition extends React.Component {
  render = () => {
    const { anchorEl, title, data, className, onHandleClose } = this.props;
    const open = Boolean(anchorEl);
    const cn = classNames(styles.Popover, className);

    return (
      <Popover
        classes={{ root: cn }}
        open={open}
        onClose={() => onHandleClose(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          elevation: 15,
          classes: {root: styles.paper}
        }}
        transitionDuration={250}
        TransitionComponent={Fade}
      >
        <Typography variant="h6" className={styles.title}>
          <InfoOutlined fontSize='large' className={styles.iconTitle} />
          {title}
        </Typography>
        <Divider />
        <div className={styles.content}>
          {Array.isArray(data) ? (
            <React.Fragment>
              {data.map((el, idx) => (
                <React.Fragment key={idx}>
                  <Typography variant="body1">{el}</Typography>
                  <div style={{marginBottom: '10px'}}/>
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>{data}</React.Fragment>
          )}
        </div>
        <Divider />
        <Button
          label="Đóng"
          className={styles.button}
          variant="contained"
          onClick={() => onHandleClose()}
        />
      </Popover>
    );
  };
}
