import { Button, CardContent, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CommonFilter from '../common/CommonFilter'
import CommonTable from '../common/CommonTable'
import { Url } from '../global'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const PammUser = () => {

    const navigate = useNavigate();
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
        {
            'label': 'SPONSOR NAME',
            'value': false,
            'name': 'sponsor_name'
        },
        {
            'label': 'MANAGER NAME',
            'value': false,
            'name': 'manager_name'
        },
        {
            'label': 'MANAGER NAME',
            'value': false,
            'name': 'manager_name'
        },
    ]);
    toast.configure();
    const column = [
        {
            name: 'SR NO',
            selector: row => row.sr_no,
            sortable: true,
            reorder: true,
            grow: 0.4,
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
            grow: 0.5,
        },
        {
            name: 'PASSWORD',
            selector: row => {
                return <span title={row.user_visible_password}>{row.user_visible_password}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'SPONSOR NAME',
            selector: row => {
                return <span title={row.sponsor_name}>{row.sponsor_name}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'MANAGER NAME',
            selector: row => {
                return <span title={row.manager_name}>{row.manager_name}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'DATE',
            selector: row => {
                return <span title={row.date}>{row.date}</span>
            },
            wrap: true,
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'Action',
            button: true,
            cell: row => {
                return <div className='actionButtonGroup'>
                    <Button
                        className='btn-edit'
                        onClick={(event) => edit(row)}
                        {...row}
                        style={{ color: 'rgb(144 145 139)' }}>
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        }
    ];

    const edit = (data) => {
        const param = new FormData();
        // param.append("is_app", 1);
        // param.append("AADMIN_LOGIN_ID", 1);
        param.append("action", "view_user_details");
        param.append("user_id", data.user_id);
        axios.post(Url + "/ajaxfiles/pamm/user_manage.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
        }
        if (res.data.status == "error") {
            toast.error(res.data.message);
        } else {
            
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
                                <p className='main-heading'>User Management</p>
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
                                                <CommonTable url={`${Url}/datatable/pamm/pamm_client_list.php`} column={column} sort='2' search={searchBy} searchWord={searchKeyword} param={param} />
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

export default PammUser