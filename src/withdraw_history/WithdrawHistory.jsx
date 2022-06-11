import './withdraw_history.css';
import React, { useState } from "react";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(0),
    },
    "& .MuiInputBase-input": {
        borderRadius: 9,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "8px 26px 8px 10px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            borderRadius: 9,
            borderColor: "#80bdff",
        },
    },
}));

const WithdrawHistory = () => {
    const [param, setParam] = useState({
        start_date: '',
        end_date: ''
    });
    const navigate = useNavigate();
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
          'label': 'ACCOUNT NO',
          'value': false,
          'name': 'account_no'
        },
        {
          'label': 'PAYMENT METHOD',
          'value': false,
          'name': 'payment_method'
        },
        {
          'label': 'AMOUNT',
          'value': false,
          'name': 'amount'
        },
        {
          'label': 'REMARKS',
          'value': false,
          'name': 'remarks'
        },
      ]);
    toast.configure();

    const columns = [
        {
            name: 'SR.NO',
            selector: row => {
                return <span>{row.sr_no}</span>
            },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.1,
        },
        {
            name: 'DATE',
            selector: row => { return <span title={row.date}>{row.date}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'NAME',
            selector: row => { return <span title={row.name}>{row.name}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'ACCOUNT NO',
            selector: row => { return <span title={row.wallet_code}>{row.wallet_code}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        },
        {
            name: 'PAYMENT METHOD',
            selector: row => { return <span title={row.method}>{row.method}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        },
        {
            name: 'AMOUNT',
            selector: row => { return <span title={row.amount}>{row.amount}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        },
        {
            name: 'REMARKS',
            selector: row => { return <span title={row.remarks}>{row.remarks}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'STATUS',
            selector: row => { return <span className={(row.status == "1") ? "status-text-approved" : (row.status == "2") ? "status-text-rejected" : "status-text-pending"} title={(row.status == "1") ? "Approved" : (row.status == "2") ? "Rejected" : "Pending"}>{(row.status == "1") ? "Approved" : (row.status == "2") ? "Rejected" : "Pending"}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        }
    ];

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Withdraw History</p>
                                <CommonFilter search={searchBy} setParam={setParam} searchWord={setSearchKeyword}/>
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url={`${Url}/datatable/withdraw_list.php`} column={columns} sort='1' refresh={refresh} search={searchBy} param={param} searchWord={searchKeyword}/>
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

export default WithdrawHistory