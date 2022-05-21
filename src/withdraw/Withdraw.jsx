import './withdraw.css';
import React, { useState, useEffect } from "react";
import { Autocomplete, FormControl, Grid, Input, InputLabel, Menu, MenuItem, Select, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import CustomImageModal from '../common/CustomImageModal';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { Url } from '../global';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {/* {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null} */}
        </DialogTitle>
    );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(0),
    },
    "& .MuiInputBase-input": {
        // borderRadius: 9,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        // border: "1px solid #ced4da",
        fontSize: 16,
        padding: "8px 26px 8px 10px",
        // transition: theme.transitions.create(["border-color", "box-shadow"]),
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
            // borderRadius: 9,
            borderColor: "#80bdff",
        },
    },
}));

const Withdraw = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [dialogTitle, setDialogTitle] = useState('');
    const [accountOption, setAccountOption] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [Form, setForm] = useState({
        account_type: '',
        account: '',
        customer_name: '',
        payment_gateway: '',
        amount: '',
        currency_code: '',
        note: '',
        user_id: '',
        isLoader: false
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

    const manageDialogActionButton = () => {
        if (dialogTitle == 'Add New Withdrawal') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                {(Form.isLoader == true) ? <Button variant="contained" className='btn-gradient btn-success' disabled><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i></Button> : <Button variant="contained" className='btn-gradient btn-success' onClick={submitForm}>Add</Button>}
                
            </div>;
        } else if (dialogTitle == 'Reject') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-danger'>Reject</Button>
            </div>;
        } else if (dialogTitle == 'Approve') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success'>Approve</Button>
            </div>;
        }
    }

    const manageContent = () => {
        if (dialogTitle == 'Add New Withdrawal') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Account Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Account"
                            name='account_type'
                            onChange={input}>
                            <MenuItem value='live'>Live</MenuItem>
                            <MenuItem value='demo'>Demo</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div className='margeField'>
                    {/* <TextField id="standard-basic" label="Account" variant="standard" sx={{ width: '100%' }} name='account' onChange={input}/> */}
                    <Autocomplete
                        disablePortal
                        options={accountOption}
                        getOptionLabel={(option) => (option ? option.mt_live_account_id : "")}
                        onInputChange={(event, newInputValue) => {
                            fetchAccount(event, newInputValue);
                        }}
                        onChange={(event, newValue) => {
                            // setValue(newValue);
                            console.log(event, newValue);
                            setForm((prevalue) => {
                                return {
                                    ...prevalue,
                                    'customer_name': (newValue != null) ? newValue['user_first_name'] + ' '+ newValue['user_last_name'] : '',
                                    'account': (newValue != null) ? newValue['user_id']: ''
                                };
                            });
                        }}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Account" variant="standard" />}
                    />
                    <TextField id="standard-basic" label="Customer Name" variant="standard" sx={{ width: '100%' }} value={Form.customer_name} name='customer_name' onChange={input} />
                </div>
                <br />
                <div className='margeField'>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Payment Gateway</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Payment Gateway"
                            name='payment_gateway'
                            onChange={input}>
                            <MenuItem value='BANK'>BANK</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} name='amount' onChange={input} />
                </div>
                <br />
                <div className='margeField'>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Currenct Code</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Currenct Code"
                            name='currency_code'
                            onChange={input}>
                            <MenuItem value='USD'>USD</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="standard-basic" label="Note" variant="standard" sx={{ width: '100%' }} name='note' onChange={input} />
                </div>
                {/* <br />
                <div>
                    <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} name='note' onChange={input}/>
                </div> */}
            </div>;
        } else if (dialogTitle == 'View') {
            return <div>
            </div>;
        } else if (dialogTitle == 'Reject') {
            return <div>
                <div className='withdrawal-action-popup-text'>
                    <label>Are you want to sure reject this withdrawal ?</label>
                </div>
            </div>;
        } else if (dialogTitle == 'Approve') {
            return <div>
                <div className='withdrawal-action-popup-text'>
                    <label>Are you want to sure approve this withdrawal ?</label>
                </div>
            </div>;
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (e) => {
        setForm({
            account_type: '',
            account: '',
            customer_name: '',
            payment_gateway: '',
            amount: '',
            currency_code: '',
            note: '',
            user_id: '',
            isLoader: false
        });
        setDialogTitle('Add New Withdrawal');
        setOpen(true);
    };

    const actionMenuPopup = (e, index) => {
        console.log(e.target.getAttribute('class'));
        console.log(e.target.classList.contains('reject'));
        if (e.target.classList.contains('reject')) {
            setDialogTitle('Reject');
        } else if (e.target.classList.contains('approve')) {
            setDialogTitle('Approve');
        }

        setOpen(true);
    };

    const input = (event) => {
        const { name, value } = event.target;
        setForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const fetchAccount = async (event, search) => {
        console.log(search);
        const param = new FormData();
        /* param.append('is_app', 1);
        param.append('AADMIN_LOGIN_ID', 1); */
        param.append('search', search);
        param.append('type', Form.account_type);
        await axios.post(`${Url}/ajaxfiles/fetch_user_account.php`, param).then((res) => {
            if (res.data.message == "Session has been expired") {
                localStorage.setItem("login", true);
                navigate("/");
            }
            if (res.data.status == 'error') {
                toast.error(res.data.message);
            } else {
                setAccountOption(res.data.data);
            }
        });
    }

    const submitForm = async() => {
        console.log(Form);
        if (Form.account_type == '') {
            toast.error('Please select account type');
        } else if (Form.account == '') {
            toast.error('Please enter account');
        } else if (Form.customer_name == '') {
            toast.error('Please enter customer name');
        } else if (Form.payment_gateway == '') {
            toast.error('Please select any one payment gateway');
        } else if (Form.amount == '') {
            toast.error('Please enter amount');
        } else if (Form.currency_code == "") {
            toast.error('Please select currency code');
        } else if (Form.note == '') {
            toast.error('Please enter note');
        } else {
            Form.isLoader = true;
            setForm({ ...Form });
            const param = new FormData();
            param.append('action', 'add_withdraw');
            /* param.append('is_app', 1);
            param.append('AADMIN_LOGIN_ID', 1); */
            param.append('user_id', Form.account);
            param.append('account_type', Form.account_type);
            param.append('payment_method', Form.payment_gateway);
            param.append('amount', Form.amount);
            param.append('currency', Form.currency_code);
            param.append('note', Form.note);
            await axios.post(`${Url}/ajaxfiles/user_manage.php`, param).then((res) => {
                if (res.data.message == "Session has been expired") {
                    localStorage.setItem("login", true);
                    navigate("/");
                }
                // setLoader(false);
                Form.isLoader = false;
                setForm({ ...Form });
                if (res.data.status == 'error') {
                    toast.error(res.data.message);
                } else {
                    setRefresh(!refresh);
                    toast.success(res.data.message);
                    setOpen(false);
                }
            });
            /* handleClose();
            toast.success('withdraw has been added successfully.'); */
        }
    };

    const tableRefresh = () => {
        var status = (refresh) ? false : true;
        setRefresh(status);
    }

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Withdrawal</p>
                                <CommonFilter search={searchBy}/>
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add</Button>
                                        {/* <Button variant="contained" onClick={tableRefresh}>Refresh</Button> */}
                                    </div>
                                    <br />
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url={`${Url}/datatable/withdraw_list.php`} column={columns} sort='1' refresh={refresh} search={searchBy}/>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Paper>

                                <BootstrapDialog
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open}
                                    fullWidth={fullWidth}
                                    maxWidth={maxWidth}
                                >
                                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                        {dialogTitle}
                                    </BootstrapDialogTitle>
                                    <DialogContent dividers>
                                        {manageContent()}
                                    </DialogContent>
                                    <DialogActions>
                                        {manageDialogActionButton()}
                                    </DialogActions>
                                </BootstrapDialog>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Withdraw