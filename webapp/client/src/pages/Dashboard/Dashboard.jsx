import React from "react";

import styles from "pages/Dashboard/Dashboard.module.scss";
import { Button, Snackbar, Paper } from "components/basic";
import { withRouter } from 'react-router-dom'
import { Typography } from "@mui/material";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loading: false,
    };
  }

  componentDidMount = () => console.log('Dashboard component mounted');
  componentWillUnmount = () => console.log('Dashboard component unmounted');

  render = () => {
    const { open, loading } = this.state;

    return (
      <div id="content" className={styles.root}>
        {/* <Button
          label={"Test"}
          variant="contained"
          className={styles.button}
          loading={this.state.loading}
          disabled={this.state.loading}
          size="medium"
          onClick={() => {
            this.setState({ open: !open, loading: !loading });
          }}
        /> */}
        <Typography variant="h6">Dashboard Page</Typography>
      </div>
    );
  };
}

export default withRouter(Dashboard);
