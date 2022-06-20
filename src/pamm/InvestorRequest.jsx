import { Button, CardContent, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import CommonFilter from '../common/CommonFilter'
import CommonTable from '../common/CommonTable'
import { Url } from '../global'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const InvestorRequest = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [param, setParam] = useState("");
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    toast.configure();
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
                return <span title={(row.is_pamm == "0") ? "No" : "Yes"}>{(row.is_pamm == "0") ? "No" : "Yes"}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.3,
        },
        {
            name: 'STATUS',
            selector: row => {
                return <span title={(row.status == "0") ? "Pending" : (row.status == "1") ? "Approved" : "Rejected"}>{(row.status == "0") ? "Pending" : (row.status == "1") ? "Approved" : "Rejected"}</span>
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
        {
            name: 'UPDATE PAMM',
            button: true,
            cell: row => {
                return <div className='actionButtonGroup'>
                    <Button
                        className='btn-edit'
                        onClick={(event) => updatePamm(row)}
                        {...row}
                        style={{ color: 'rgb(144 145 139)' }}>
                        <i className="material-icons">autorenew</i>
                    </Button>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        }
    ];

    const updatePamm = (data) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>Do you want to {(data.is_pamm == "0") ? "add" : "remove"} pamm this?</p>
                        <div className='confirmation-alert-action-button'>
                            <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                            <Button variant="contained" className='btn-gradient btn-success'
                                onClick={() => {
                                    const param = new FormData();
                                    // param.append("is_app", 1);
                                    // param.append("AADMIN_LOGIN_ID", 1);
                                    param.append("action", 'update_is_pamm');
                                    param.append("user_id", data.user_id);
                                    param.append("is_pamm", (data.is_pamm == "0") ? 1 : 0);
                                    axios.post(Url + "/ajaxfiles/pamm/user_manage.php", param).then((res) => {
                                        if (res.data.message == "Session has been expired") {
                                            localStorage.setItem("login", true);
                                            navigate("/");
                                        }
                                        if (res.data.status == "error") {
                                            toast.error(res.data.message);
                                        } else {
                                            toast.success(res.data.message);
                                            setRefresh(!refresh);
                                        }
                                    });
                                    onClose();
                                }}
                            >
                                Yes, {(data.is_pamm == "0") ? "Add" : "Remove"} it!
                            </Button>
                        </div>
                    </div>
                );
            }
        });

    }

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
                                                <CommonTable url={`${Url}/datatable/pamm/pamm_investor_requests.php`} column={activityColumn} sort='2' search={searchBy} searchWord={searchKeyword} param={param} refresh={refresh} />
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