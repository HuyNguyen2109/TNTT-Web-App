import React from "react";

import styles from "./Test.module.scss";
import { Button, Snackbar, Paper } from "../basic";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loading: false
    };
  }

  render = () => {
    const { open, loading } = this.state;

    return (
      <div className={styles.root}>
        <Button
          label={"Test"}
          variant="contained"
          className={styles.button}
          loading={this.state.loading}
          disabled={this.state.loading}
          size="medium"
          onClick={() => {
            this.setState({ open: !open, loading: !loading});
          }}
        />
        <Snackbar
          open={open}
          message="Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message Test message "
          type="warning"
          onClose={() => {
            this.setState({ open: false, loading: false });
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        />
        <Paper 
          className={styles.paper}
          content={'Test'}
        />
      </div>
    );
  };
}

export default Test;
