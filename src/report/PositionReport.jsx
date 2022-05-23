import React, { useState ,useEffect} from "react";
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

const PositionReport = () => {
  const [refresh, setRefresh] = useState(false);
  const [searchBy, setSearchBy] = useState([
    {
      label: "DATE",
      value: false,
      name: "date",
    },
    {
      label: "NAME",
      value: false,
      name: "name",
    },
    {
      label: "MT5 A/C NO.",
      value: false,
      name: "mt5_acc_no",
    },
    {
      label: "AMOUNT",
      value: false,
      name: "amount",
    },
  ]);
  const [resData,setResData]=useState({})


  const column = [
    {
      name: "LOGIN",
      selector: (row) => {
        return <span>{row.trade_login}</span>;
      },
      sortable: true,
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "SYMBOL",
      selector: (row) => {
        return <span title={row.trade_symbol}>{row.trade_symbol}</span>;
      },
      sortable: true,
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "NAME",
      selector: (row) => {
        return <span title={row.name}>{row.name}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "TRADE NO.",
      selector: (row) => {
        return <span title={row.trade_no}>{row.trade_no}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "TIME",
      selector: (row) => {
        return <span title={row.trade_time}>{row.trade_time}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
        name: "TYPE",
        selector: (row) => {
          return <span title={row.trade_type}>{row.trade_type}</span>;
        },
        sortable: true,
        reorder: true,
        grow: 0.3,
      },
      {
        name: "LOT",
        selector: (row) => {
          return <span title={row.trade_volume}>{row.trade_volume}</span>;
        },
        sortable: true,
        reorder: true,
        grow: 0.3,
      },
      {
        name: "TRADE PRICE	",
        selector: (row) => {
          return <span title={row.trade_open_rate}>{row.trade_open_rate}</span>;
        },
        sortable: true,
        reorder: true,
        grow: 0.3,
      },
      {
        name: "S/L",
        selector: (row) => {
          return <span title={row.trade_s_l}>{row.trade_s_l}</span>;
        },
        sortable: true,
        reorder: true,
        grow: 0.3,
      },
      {
        name: "T/P",
        selector: (row) => {
          return <span title={row.trade_t_p}>{row.trade_t_p}</span>;
        },
        sortable: true,
        reorder: true,
        grow: 0.3,
      },
      {
        name: "CURRENT PRICE",
        selector: (row) => {
          return <span title={row.trade_curr_rate}>{row.trade_curr_rate}</span>;
        },
        sortable: true,
        reorder: true,
        grow: 0.3,
      },
      {
        name: "PROFIT",
        selector: (row) => {
          return <span title={row.trade_profit}>{row.trade_profit}</span>;
        },
        sortable: true,
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
              <p className="main-heading">Position Report</p>
                <div className="setBoxs">
                  {" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.mt_balance}</h5>
                          <p className="no-margin">MT Balance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.mt_credit} </h5>
                          <p className="no-margin">MT Credit</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.mt_equity}</h5>
                          <p className="no-margin">MT Equity</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">{resData.mt_free_margin} </h5>
                          <p className="no-margin">MT Free Margin</p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="row1 boxSection">
                    <div className="card padding-9 animate fadeLeft boxsize">
                      <div className="row">
                        <div className="col s12 m12 text-align-center">
                          <h5 className="mb-0">
                            {resData.total_earnings}{" "}
                          </h5>
                          <p className="no-margin">
                            Total Earning
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                
                </div>
                <CommonFilter search={searchBy} />
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
                          url={`${Url}/datatable/position_list.php`}
                          column={column}
                          sort="1"
                          refresh={refresh}
                          search={searchBy}
                          setResData={setResData}
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

export default PositionReport;
