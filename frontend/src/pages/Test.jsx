import React from "react";
import classNames from "classnames";

import styles from "./Test.module.scss";
import { Button, Snackbar } from "../components/basic";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render = () => {
    const { open } = this.state;

    return (
      <div className={styles.root}>
        <Button
          label={"Test"}
          variant="contained"
          className={styles.button}
          size="medium"
          onClick={() => {
            this.setState({ open: !open });
          }}
        />
        <Snackbar open={open} message={"Test message"} type="info" onClose={() => {this.setState({open: false})}} />
      </div>
    );
  };
}

export default Test;
