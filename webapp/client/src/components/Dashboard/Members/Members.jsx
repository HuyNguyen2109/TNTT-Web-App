import React from "react";
import classNames from "classnames";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Avatar,
} from "@mui/material";

import { Paper, Input } from "components/basic";
import styles from "components/Dashboard/Members/Members.module.scss";
import { SearchOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";

export default class Members extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
    };
  }

  render = () => {
    const { members } = this.props;
    const { searchValue } = this.state;

    return (
      <Paper
        content={
          <div className={styles.memberContainer}>
            <Toolbar disableGutters sx={{ display: { xs: "block", sm: "flex" } }}>
              <div>
                <Typography variant="h6" textAlign="left" className={styles.title}>
                  Danh sách Thiếu Nhi
                </Typography>
                <Typography variant="subtitle1" textAlign="left" className={styles.subTitle}>
                  {" "}
                  Tổng hợp các thông tin chung về Thiếu Nhi
                </Typography>
              </div>
              <Box
                sx={{ flexGrow: "1", minWidth: "50px", display: { xs: "none", sm: "initial" } }}
              ></Box>
              <Input
                className={styles.searchBar}
                autoComplete="new-password"
                label={""}
                type={"text"}
                value={searchValue}
                icon={<SearchOutlined />}
                onChange={(data) => this.setState({ searchValue: data.target.value })}
              />
            </Toolbar>
            <TableContainer classes={{root: styles.table}}>
              <Table stickyHeader sx={{ minWidth: 1100 }} >
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Tên Thánh</TableCell>
                    <TableCell>Họ và tên</TableCell>
                    <TableCell>Số ĐT</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Địa chỉ</TableCell>
                    <TableCell>Giáo khu</TableCell>
                    <TableCell>Lớp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((mem) => (
                    <TableRow
                      key={mem.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Avatar
                          src={mem.avatar}
                          alt={`${mem.lastName} avatar`}
                          sx={{ width: 30, height: 30 }}
                        />
                      </TableCell>
                      <TableCell>{mem.holyName}</TableCell>
                      <TableCell>{mem.firstName + ' ' + mem.lastName}</TableCell>
                      <TableCell>{mem.phone}</TableCell>
                      <TableCell>{mem.email}</TableCell>
                      <TableCell>{mem.address.street + ' ' + mem.address.city}</TableCell>
                      <TableCell>{mem.area}</TableCell>
                      <TableCell>{mem.class.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        }
      />
    );
  };
}
