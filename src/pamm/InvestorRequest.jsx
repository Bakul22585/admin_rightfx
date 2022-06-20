import { CardContent, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import CommonFilter from '../common/CommonFilter'
import CommonTable from '../common/CommonTable'
import { Url } from '../global'

const InvestorRequest = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [param, setParam] = useState("");
    const [searchBy, setSearchBy] = useState([
        {
            'label': 'USER NAME',
            'value': false,
            'name': 'name'
        },
        {
            'label': 'WALLET CODE',
            'value': false,
            'name': 'wallet_code'
        },
        {
            'label': 'EMAIL',
            'value': false,
            'name': 'user_email'
        },
        {
            'label': 'MOBILE',
            'value': false,
            'name': 'user_phone'
        },
        {
            'label': 'COUNTRY',
            'value': false,
            'name': 'user_country'
        },
    ]);

    const activityColumn = [
        {
            name: 'SR NO',
            selector: row => row.sr_no,
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'USER NAME',
            selector: row => {
                return <span title={row.name}>{row.name}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'WALLET CODE',
            selector: row => {
                return <span title={row.wallet_code}>{row.wallet_code}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'EMAIL',
            selector: row => {
                return <span title={row.user_email}>{row.user_email}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'MOBILE',
            selector: row => {
                return <span title={row.user_phone}>{row.user_phone}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'COUNTRY',
            selector: row => {
                return <span title={row.user_country}>{row.user_country}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.3,
        },
        {
            name: 'PAMM ACCOUNT',
            selector: row => {
                return <span title={(row.is_pamm == "0")? "No" : "Yes"}>{(row.is_pamm == "0")? "No" : "Yes"}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.3,
        },
        {
            name: 'STATUS',
            selector: row => {
                return <span title={(row.status == "0")? "Pending" : (row.status == "1") ? "Approved" : "Rejected"}>{(row.status == "0")? "Pending" : (row.status == "1") ? "Approved" : "Rejected"}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.3,
        },
        {
            name: 'DATETIME',
            selector: row => {
                return <span title={row.user_added_datetime}>{row.user_added_datetime}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'APPROVE DATETIME',
            selector: row => {
                return <span title={row.approved_date_time}>{row.approved_date_time}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
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
                                <p className='main-heading'>Investor Request</p>
                                <CommonFilter search={searchBy} searchWord={setSearchKeyword} setParam={setParam} />
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    {/* <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add Deposit</Button>
                                    </div>
                                    <br /> */}
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url={`${Url}/datatable/pamm/pamm_investor_requests.php`} column={activityColumn} sort='2' search={searchBy} searchWord={searchKeyword} param={param} />
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

export default InvestorRequest