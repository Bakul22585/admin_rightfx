import './commision_group.css';
import React, { useState } from "react";
import { Button, FormControl, Grid, Menu, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomImageModal from '../common/CustomImageModal';

const CommisionGroup = () => {

    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [dialogTitle, setDialogTitle] = useState('');
    const [form, setForm] = useState({
        group_name: '',
        commission_type: '',
        level: '',
        will_get: '',
        will_passon: '',
        partnership: '',
        isLoader: false,
    });
    const [searchBy, setSearchBy] = useState([
        {
            'label': 'REFERENCE NO',
            'value': false,
            'name': 'reference_no'
        },
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
            'label': 'WALLET CODE',
            'value': false,
            'name': 'wallet_code'
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
    ]);

    const column = [
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
            name: 'REFERENCE NO.',
            selector: row => {
                return <span title={row.refrence_no}>{row.refrence_no}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.7,
            wrap: true,
        },
        {
            name: 'DATE',
            selector: row => { return <span title={row.date}>{row.date}</span> },
            sortable: true,
            reorder: true,
            grow: 1,
            wrap: true,
        },
        {
            name: 'NAME',
            selector: row => { return <span title={row.name}>{row.name}</span> },
            sortable: true,
            reorder: true,
            grow: 1,
            wrap: true,
        },
        {
            name: 'WALLET CODE',
            selector: row => { return <span title={row.wallet_code}>{row.wallet_code}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
            wrap: true,
        },
        {
            name: 'PAYMENT METHOD',
            selector: row => { return <span title={row.method}>{row.method}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
            wrap: true,
        },
        {
            name: 'AMOUNT',
            selector: row => { return <span title={row.amount}>{row.amount}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
            wrap: true,
        },
        {
            name: 'PROOF',
            selector: row => { return (row.proof != "") ? <CustomImageModal image={row.proof} isIcon={true} className='tableImg' /> : "" },
            sortable: true,
            reorder: true,
            grow: 0.5,
            wrap: true,
        },
        {
            name: 'STATUS',
            selector: row => { return <span className={(row.status == "1") ? "status-text-approved" : (row.status == "2") ? "status-text-rejected" : "status-text-pending"} title={(row.status == "1") ? "Approved" : (row.status == "2") ? "Rejected" : "Pending"}>{(row.status == "1") ? "Approved" : (row.status == "2") ? "Rejected" : "Pending"}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
            wrap: true,
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
                        {(row.status == "1") ?
                            <MenuItem className='view' {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                            : <div><MenuItem className='view' {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row.sr_no)}><i className="material-icons font-color-approved">task_alt</i>&nbsp;&nbsp;Approved</MenuItem>
                                <MenuItem className='reject' {...row} onClick={(event) => actionMenuPopup(event, row.sr_no)}><i className="material-icons font-color-rejected">cancel</i>&nbsp;&nbsp;Rejected</MenuItem></div>}

                    </Menu>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        }
    ];

    const handleContextClose = (index) => {
        let tableMenus = [...openTableMenus];
        tableMenus[index] = null;
        setOpenTableMenus(tableMenus);
    };

    const actionMenuPopup = (e, index) => {
        console.log(e.target.getAttribute('class'));
        console.log(e.target.classList.contains('reject'));
        handleContextClose(index);
        if (e.target.classList.contains('reject')) {
            setDialogTitle('Reject');
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>Are you sure?</h1>
                            <p>Do you want to reject this?</p>
                            <div className='confirmation-alert-action-button'>
                                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                                <Button variant="contained" className='btn-gradient btn-danger'
                                    onClick={() => {
                                        handleClickReject();
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
            setDialogTitle('Approve');
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>Are you sure?</h1>
                            <p>Do you want to approve this?</p>
                            <div className='confirmation-alert-action-button'>
                                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                                <Button variant="contained" className='btn-gradient btn-success'
                                    onClick={() => {
                                        handleClickapprove();
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

    const handleClickapprove = () => {
        toast.success('Deposit has been approved successfully.');
    }

    const handleClickReject = () => {
        toast.success('Deposit has been rejected successfully.');
    }

    const handleContextClick = (event, index) => {
        console.log(event.currentTarget.getAttribute('id'), index);
        let tableMenus = [...openTableMenus];
        tableMenus[index] = event.currentTarget;
        setOpenTableMenus(tableMenus);
    };

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Commision Group</p>
                                <CommonFilter search={searchBy}/>
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <div className='actionGroupButton'>
                                        {/* <Button variant="contained" onClick={gotoRoleCreate}>Add Role</Button> */}
                                    </div>
                                    <br />
                                    <CommonTable url={`${Url}/admin/datatable/ib_commision_group_list.php`} column={column} sort='0' />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommisionGroup