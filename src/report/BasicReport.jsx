import React, { useState, useEffect } from "react";
import {
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from "../common/CommonFilter";
import CommonTable from "../common/CommonTable";
import { Url } from "../global";
import axios from "axios";

const BasicReport = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [param, setParam] = useState({
    start_date: '',
    end_date: ''
  });
  const [salesAgent, setSalesAgent] = useState("")

  const [searchBy, setSearchBy] = useState([
    {
      label: "Name",
      value: false,
      name: "user_name",
    },
    {
      label: "Email",
      value: false,
      name: "user_email",
    },
    {
      label: "Phone",
      value: false,
      name: "user_phone",
    },
    {
      label: "MT5",
      value: false,
      name: "user_mt5",
    },
    {
      label: "Total Deposit",
      value: false,
      name: "total_deposit",
    }, {
      label: "Total Withdraw",
      value: false,
      name: "total_withdraw",
    }, {
      label: "Bonus In",
      value: false,
      name: "bonus_in",
    }, {
      label: "Bonus Out",
      value: false,
      name: "bonus_out",
    }, {
      label: "Remark",
      value: false,
      name: "user_remarks",
    }, {
      label: "Equity",
      value: false,
      name: "equity",
    }, {
      label: "Lot Size",
      value: false,
      name: "lot_size",
    }, {
      label: "Wallet Balance",
      value: false,
      name: "wallet_balance",
    }, {
      label: "P&L",
      value: false,
      name: "row.pnl",
    }, {
      label: "Net P&L",
      value: false,
      name: "net_pnl",
    }, {
      label: "Group Name",
      value: false,
      name: "mt5_group_name",
    }, {
      label: "Sales Person Name",
      value: false,
      name: "sales_person_name",
    }, {
      label: "Ib Name",
      value: false,
      name: "ib_name",
    }, {
      label: "Total Trade Count",
      value: false,
      name: "total_trade_count",
    },
  ]);
  const [resData, setResData] = useState({})

  const column = [
    {
      name: "Name",
      selector: (row) => {
        return <span>{row.user_name}</span>;
      },
      sortable: true,
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Email",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      sortable: true,
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Phone",
      selector: (row) => {
        return <span title={row.user_phone}>{row.user_phone}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "MT5",
      selector: (row) => {
        return <span title={row.user_mt5}>{row.user_mt5}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Total Deposit",
      selector: (row) => {
        return <span title={row.total_deposit}>${row.total_deposit}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Total Withdraw",
      selector: (row) => {
        return <span title={row.total_withdraw}>${row.total_withdraw}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Bonus In",
      selector: (row) => {
        return <span title={row.bonus_in}>${row.bonus_in}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Bonus Out",
      selector: (row) => {
        return <span title={row.bonus_out}>${row.bonus_out}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Remark",
      selector: (row) => {
        return <span title={row.user_remarks}>{row.user_remarks}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Equity",
      selector: (row) => {
        return <span title={row.equity}>${row.equity}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Lot Size",
      selector: (row) => {
        return <span title={row.lot_size}>{row.lot_size}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Wallet Balance",
      selector: (row) => {
        return <span title={row.wallet_balance}>{row.wallet_balance}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "P&L",
      selector: (row) => {
        return <span title={row.pnl}>{row.pnl}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Net P&L",
      selector: (row) => {
        return <span title={row.net_pnl}>{row.net_pnl}</span>;
      },
      reorder: true,
      grow: 0.3,
    }, {
      name: "Date",
      selector: (row) => {
        return <span title={row.register_date}>{row.register_date}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    }, {
      name: "Group Name",
      selector: (row) => {
        return <span title={row.mt5_group_name}>{row.mt5_group_name}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    }, {
      name: "Sales Person Name",
      selector: (row) => {
        return <span title={row.sales_person_name}>{row.sales_person_name}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    }, {
      name: "Rebate",
      selector: (row) => {
        return <span title={row.rebate}>{row.rebate}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    }, {
      name: "Ib Name",
      selector: (row) => {
        return <span title={row.ib_name}>{row.ib_name}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.3,
    }, {
      name: "Total Trade Count",
      selector: (row) => {
        return <span title={row.total_trade_count}>{row.total_trade_count}</span>;
      },
      reorder: true,
      grow: 0.3,
    },
  ];
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className="main-heading">All In One Report</p>
                <CommonFilter search={searchBy} setParam={setParam} searchWord={setSearchKeyword} salesAgent={setSalesAgent}/>
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CardContent className="py-3">
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={12} lg={12}>
                        <CommonTable
                          url={`${Url}/datatable/basic_reports.php`}
                          column={column}
                          sort="1"
                          refresh={refresh}
                          search={searchBy}
                          param={param}
                          searchWord={searchKeyword}
                          setResData={setResData}
                          salesAgent={salesAgent}
                          csv="datatable/basic_reports_export.php"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicReport;
