import React from "react";

import styles from "pages/Dashboard/Dashboard.module.scss";
import { Button, Snackbar, Paper } from "components/basic";
import { GeneralFund, OrganizationFund, MembersCounting, ChildrenCounting } from "components/Dashboard";
import { withRouter } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      loading: false,
      data: null,
    };
  }

  componentDidMount = () => {
    console.log("Dashboard component mounted");
    // TODo: Call API to get all data for dashboard, below is sample data to create UI
    const response = {
      generalFund: {
        title: "Quỹ Thiếu Nhi",
        value: 100000000,
      },
      organizationFund: {
        title: "Quỹ Xứ Đoàn",
        value: 40000000,
      },
      membersCounting: {
        title: "Số lượng GLV",
        value: 45,
      },
      childrenCounting: {
        title: "Số lượng Thiếu Nhi",
        value: 600,
      },
    };
    this.setState({ data: response }, () => console.log(this.state.data));
  };
  componentWillUnmount = () => console.log("Dashboard component unmounted");

  render = () => {
    const { open, loading, data } = this.state;

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
        {data && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <GeneralFund generalFund={data.generalFund} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <OrganizationFund organizationFund={data.organizationFund} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MembersCounting membersCounting={data.membersCounting} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <ChildrenCounting childrenCounting={data.childrenCounting} />
            </Grid>
          </Grid>
        )}
      </div>
    );
  };
}

export default withRouter(Dashboard);
