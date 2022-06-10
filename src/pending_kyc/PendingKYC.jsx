import './pending_kyc.css';
import React, { useState } from "react";
import { Button, CardContent, FormControl, Grid, Menu, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import CustomImageModal from '../common/CustomImageModal';

const PendingKYC = () => {

    const [open, setOpen] = useState(false);
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [param, setParam] = useState({
        'kyc_status': ''
    });
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
            'label': 'EMAIL',
            'value': false,
            'name': 'email'
        },
        {
            'label': 'AADHAR NUMBER',
            'value': false,
            'name': 'aadhar_number'
        },
        {
            'label': 'BANK ACCOUNT NO',
            'value': false,
            'name': 'bank_account_no'
        }
    ]);

    const column = [
        {
            name: 'SR.NO',
            selector: row => {
                return <span>{row.sr_no}</span>
            },
            sortable: true,
            wrap: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'DATE',
            selector: row => {
                return <span title={row.added_datetime}>{row.added_datetime}</span>
            },
            sortable: true,
            wrap: true,
            reorder: true,
            grow: 0.3,
        },
        {
            name: 'NAME',
            selector: row => { return <span title={row.name}>{row.name}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        },
        {
            name: 'EMAIL',
            selector: row => { return <span title={row.email}>{row.email}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        },
        {
            name: 'AADHAR NUMBER',
            selector: row => { return <span title={row.aadhar_card_number}>{row.aadhar_card_number}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        },
        {
            name: 'BANK ACCOUNT NO',
            selector: row => { return <span title={row.bank_account_number}>{row.bank_account_number}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.5,
        },
        // {
        //     name: 'FRONT SIDE',
        //     selector: row => { return <span title={row.bank_account_number}><CustomImageModal image={row.aadhar_card_front_image}/></span> },
        //     sortable: true,
        //     reorder: true,
        //     wrap: true,
        //     grow: 0.5,
        // }, {
        //     name: 'BACK SIDE',
        //     selector: row => { return <span title={row.bank_account_number}><CustomImageModal image={row.aadhar_card_back_image}/></span> },
        //     sortable: true,
        //     reorder: true,
        //     wrap: true,
        //     grow: 0.5,
        // },
        {
            name: "STATUS",
            selector: (row) => {
                return (
                    <span
                        title={row.status}
                        className={`text-color-${row.status == "1" ? "green" : row.status == "2" ? "red" : "yellow"
                            }`}
                    >
                        {row.status == "1"
                            ? "APPROVED"
                            : row.status == "2"
                                ? "REJECTED"
                                : "PENDING"}
                    </span>
                );
            },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'Action',
            button: true,
            cell: row => {
                return <div>
                    <Button
                        id={`actionButton_${row.sr_no}`}
                        aria-controls={open ? `basic-menu-${row.sr_no}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => handleContextClick(event, row.sr_no)}
                        {...row}
                        style={{ color: 'rgb(144 145 139)' }}
                    >
                        <i className="material-icons">more_horiz</i>
                    </Button>
                    <Menu
                        id={`basic-menu-${row.sr_no}`}
                        anchorEl={openTableMenus[row.sr_no]}
                        open={Boolean(openTableMenus[row.sr_no])}
                        onClose={(event) => handleContextClose(row.sr_no)}
                    >
                        <MenuItem className='view' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                        <MenuItem className='edit' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">visibility</i>&nbsp;&nbsp;Edit</MenuItem>
                        {(row.status != '1') ? <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons font-color-approved">thumb_up</i>&nbsp;&nbsp;Approved</MenuItem> : ''}
                        <MenuItem className='reject' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons font-color-rejected">thumb_down</i>&nbsp;&nbsp;Rejected</MenuItem>

                    </Menu>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        }
    ];

    const handleContextClick = (event, index) => {
        console.log(event.currentTarget.getAttribute('id'), index);
        let tableMenus = [...openTableMenus];
        tableMenus[index] = event.currentTarget;
        setOpenTableMenus(tableMenus);
    };

    const handleContextClose = (index) => {
        let tableMenus = [...openTableMenus];
        tableMenus[index] = null;
        setOpenTableMenus(tableMenus);
    };

    const actionMenuPopup = (e, data) => {
        handleContextClose(data.sr_no);
        if (e.target.classList.contains('reject')) {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>Are you sure?</h1>
                            <p>Do you want to rejected this?</p>
                            <div className='confirmation-alert-action-button'>
                                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                                <Button variant="contained" className='btn-gradient btn-danger'
                                    onClick={() => {
                                        changeStatus('rejected', data);
                                        onClose();
                                    }}
                                >
                                    Yes, Reject it!
                                </Button>
                            </div>
                        </div>
                    );
                }
            });
        } else if (e.target.classList.contains('approve')) {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>Are you sure?</h1>
                            <p>Do you want to approved this?</p>
                            <div className='confirmation-alert-action-button'>
                                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                                <Button variant="contained" className='btn-gradient btn-success'
                                    onClick={() => {
                                        changeStatus('approved', data);
                                        onClose();
                                    }}
                                >
                                    Yes, Approve it!
                                </Button>
                            </div>
                        </div>
                    );
                }
            });
        }
    };

    const changeStatus = (status, data) => {
        console.log(status, data);
        if (status == 'approved') {
            console.log("data", data)
            const param = new FormData();
            // param.append("is_app", 1);
            // param.append("AADMIN_LOGIN_ID", 1);
            param.append("kyc_id", data.kyc_id);
            param.append("action", "approve_kyc");
            axios
                .post(Url + "/ajaxfiles/kyc_manage.php", param)
                .then((res) => {
                    setRefresh(!refresh)
                    toast.success('KYC has been successfully completed.');
                });

        } else if (status == 'rejected') {
            console.log("data", data)
            const param = new FormData();
            // param.append("is_app", 1);
            // param.append("AADMIN_LOGIN_ID", 1);
            param.append("kyc_id", data.kyc_id);
            param.append("action", "reject_kyc");
            axios
                .post(Url + "/ajaxfiles/kyc_manage.php", param)
                .then((res) => {
                    setRefresh(!refresh)
                    toast.success('KYC has been successfully rejected.');
                });


        }
    }

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Pending KYC</p>
                                <CommonFilter search={searchBy} searchWord={setSearchKeyword} />
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    {/* <div className='actionGroupButton'>
                                        <Button variant="contained" className='add-group' onClick={handleClickOpen}>Add</Button>
                                    </div>
                                    <br /> */}
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url={`${Url}/datatable/kyc_list.php`} column={column} sort='1' refresh={refresh} param={param} search={searchBy} searchWord={searchKeyword} />
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

export default PendingKYC