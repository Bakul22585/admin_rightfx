import React, { useState } from "react";
import { CardContent, FormControl, Grid, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';

const UserProfitAndLoss = () => {
    const [param, setParam] = useState({
        start_date: '',
        end_date: ''
    });
    const [searchKeyword, setSearchKeyword] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [searchBy, setSearchBy] = useState([
        {
            'label': 'DATE',
            'value': false,
            'name': 'date'
        },
        {
            'label': 'NAME',
            'value': false,
            'name': 'name'
        },
        {
            'label': 'MT5 A/C NO.',
            'value': false,
            'name': 'mt5_acc_no'
        },
        {
            'label': 'AMOUNT',
            'value': false,
            'name': 'amount'
        },
    ]);

    const column = [
        {
            name: 'NAME',
            selector: row => {
                return <span>{row.name}</span>
            },
            sortable: true,
            wrap: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'MT5 ACCOUNT ID',
            selector: row => {
                return <span title={row.mt5}>{row.mt5}</span>
            },
            sortable: true,
            wrap: true,
            reorder: true,
            grow: 0.3,
        },
        {
            name: 'PROFIT & LOSS',
            selector: row => { return <span title={row.profit_loss}>{row.profit_loss}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        },
    ];
    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Users Profit and Loss Report</p>
                                <CommonFilter search={searchBy} setParam={setParam} searchWord={setSearchKeyword}/>
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url={`${Url}/datatable/user_wise_filter_report.php`} column={column} sort='1' refresh={refresh} search={searchBy} param={param} searchWord={searchKeyword}/>
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
    )
}

export default UserProfitAndLoss