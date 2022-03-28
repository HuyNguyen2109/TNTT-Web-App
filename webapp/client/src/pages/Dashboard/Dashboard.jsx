import React from "react";

import styles from "pages/Dashboard/Dashboard.module.scss";
import { Button, Snackbar, Paper, LoadingPage } from "components/basic";
import {
  GeneralFund,
  OrganizationFund,
  MembersCounting,
  ChildrenCounting,
  SaintInfo,
  VNSaintsInfo,
  Members,
} from "components/Dashboard";
import { withRouter } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { dashboard as dashboardAPIs } from "helpers/api";

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
    this.setState({ loading: true });
    setTimeout(() => {
      return Promise.all([dashboardAPIs.getFunds(), dashboardAPIs.getMembersInfo()]).then(
        ([fundInfo, membersInfo]) =>
          this.setState(
            { data: { ...this.state.data, fundInfo, membersInfo }, loading: false },
            () => console.log(this.state.data)
          )
      );
    }, 3000);
  };
  componentWillUnmount = () => console.log("Dashboard component unmounted");

  render = () => {
    const { open, loading, data } = this.state;

    return (
      <div id="content" className={styles.root}>
        {loading && <LoadingPage className={styles.dashboardLoading} />}

        {!loading && data && (
          <React.Fragment>
            {/* General information */}
            <Grid container spacing={3} className={styles.gridContainer}>
              <Grid item xs={12} sm={6} xl={3}>
                <GeneralFund generalFund={data.fundInfo.generalFund} />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <OrganizationFund organizationFund={data.fundInfo.organizationFund} />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <MembersCounting membersCounting={data.fundInfo.membersCounting} />
              </Grid>
              <Grid item xs={12} sm={6} xl={3}>
                <ChildrenCounting childrenCounting={data.fundInfo.childrenCounting} />
              </Grid>
            </Grid>

            {/* General information about Saints */}
            {/* <Grid container spacing={3} className={styles.gridContainer}>
              <Grid item xs={12} md={6} xl={5}>
                <SaintInfo />
              </Grid>
              <Grid item xs={12} md={6} xl={7}>
                <VNSaintsInfo />
              </Grid>
            </Grid> */}

            {/* Members and so on */}
            <Grid container spacing={3} className={styles.gridContainer}>
              <Grid item xs={12}>
                <Members members={data.membersInfo} />
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </div>
    );
  };
}

export default withRouter(Dashboard);
