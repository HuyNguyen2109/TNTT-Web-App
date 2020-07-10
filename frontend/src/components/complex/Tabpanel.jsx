import React from "react";
import {
  Box,
} from "@material-ui/core";

export default class TabPanel extends React.Component {
  render = () => {
    const { children, value, index, ...props } = this.props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tabpanel-${index}`}
        {...props}
      >
        {value === index && <Box p={1}>{children}</Box>}
      </div>
    );
  };
}
