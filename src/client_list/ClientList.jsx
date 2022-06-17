import './client_list.css';
import React, { useEffect, useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import { Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, InputLabel, Menu, MenuItem, OutlinedInput, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonTable from '../common/CommonTable';
import { ColorButton } from '../common/CustomElement';
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import CommonFilter from '../common/CommonFilter';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Url } from '../global';
import axios from 'axios';

const CssTextField = styled(TextField)({
});

/* const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
})); */

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
            {onClose ? (
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
            ) : null}
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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const source = [
    'Website - IB Form',
    'Website - Demo Form',
    'CRM',
    'Live',
    'CRM - Multi Structure',
    'Website - Live Form',
    'Dedicated Link - IB',
];

const ClientList = () => {

    const { id } = useParams();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState([]);
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [filterSection, setFilterSection] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [filterBy, setFilterBy] = useState('');
    const [clientSearch, setClientSearch] = useState('');
    const [searchKeyword, setSearchKeyword] = useState("");
    const [state, setState] = React.useState({
        first_name: false,
        last_name: false,
        email: false,
        phone: false,
        account_id: false,
        mt5_account: false,
    });
    const [personName, setPersonName] = useState([]);
    const [sourceName, setSourceName] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [clientType, setClientType] = useState('');
    const [searchBy, setSearchBy] = useState([
        {
            'label': 'MT5 ID',
            'value': false,
            'name': 'mt5_acc_no'
        },
        {
            'label': 'WALLET ID',
            'value': false,
            'name': 'wallet_code'
        },
        {
            'label': 'NAME',
            'value': false,
            'name': 'name'
        },
        {
            'label': 'EMAIL',
            'value': false,
            'name': 'user_email'
        },
        {
            'label': 'PHONE',
            'value': false,
            'name': 'user_phone'
        },
        {
            'label': 'PASSWORD',
            'value': false,
            'name': 'user_password'
        },
        {
            'label': 'KYC',
            'value': false,
            'name': 'kyc'
        },
        {
            'label': 'DATE',
            'value': false,
            'name': 'user_added_datetime'
        },
    ]);
    const [salesList, setSalesList] = useState([])
    const [param, setParam] = useState({
        filter: id
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addNewClientType = (event) => {
        setClientType(event.target.value);
    };

    /* const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }; */

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

    const depositApproved = (e) => {
        console.log('deposit approved', e);
    }

    const gotoProfile = (e) => {
        console.log('goto profile page', e);
        navigate("/profile/" + e.user_id);
    }

    const input1 = (event) => {
        const { name, value } = event.target;
        setClientSearch(value);
    };

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const filterByChange = (e) => {
        console.log('selected value', e.target.value);
        setFilterBy(e.target.value);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const depositColumn = [
        {
            name: 'MT5 ID',
            selector: row => {
                return <span title={row.mt5_id}>{row.mt5_id}</span>
            },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.1,
        },
        {
            name: 'WALLET ID',
            selector: row => {
                return <span title={row.wallet_code}>{row.wallet_code}</span>
            },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.1,
        },
        {
            name: 'NAME',
            selector: row => { return <a className='linkColor' title={row.name} onClick={(event) => gotoProfile(row)}>{row.name}</a> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'EMAIL',
            selector: row => { return <span title={row.user_email}>{row.user_email}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1.5,
        },
        {
            name: 'PHONE',
            selector: row => { return <span title={row.user_phone}>{row.user_phone}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'PASSWORD',
            selector: row => {
                return <span title={row.user_visible_password}>{row.user_visible_password}</span>
            },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'SALES',
            selector: row => {
                return <div>
                    <Select
                        displayEmpty
                        inputProps={{
                            "aria-label": "Without label",
                        }}
                        className='table-dropdown'
                        input={<BootstrapInput />}
                        name='interest'
                        value={row.manager_id}
                        onChange={(e) => changeSales(e, row)}
                    >
                        {
                            salesList.map((item) => {
                                return <MenuItem value={item.manager_id}>{item.manager_name}</MenuItem>
                            })
                        }
                    </Select>
                </div>
            },
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'IB Name',
            selector: row => {
                return (row.sponsor_id != "0") ? <NavLink className='linkColor' title={row.sponsor_name} to={`/profile/${row.sponsor_id}`}>{row.sponsor_name}</NavLink>: ""
            },
            reorder: true,
            wrap: true,
            grow: 1,
        },
        {
            name: 'KYC',
            selector: row => {
                return <div>
                    <span className={`status-text-${(row.kyc_status == "0") ? 'pending' : (row.kyc_status == "1") ? "approved" : "rejected"}`}>{(row.kyc_status == "0") ? <i className="material-icons">new_releases</i> : (row.kyc_status == "1") ? <i className="material-icons">check_circle</i> : <i className="material-icons">cancel</i>}</span>
                </div>
            },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 0.2,
        },
        {
            name: 'DATE',
            selector: row => { return <span title={row.date}>{row.date}</span> },
            sortable: true,
            reorder: true,
            wrap: true,
            grow: 1.2,
        },
        {
            name: 'Lead Close',
            button: true,
            cell: row => {
                return <div className='actionButton'>
                    {
                        row.lead_user == "1" ? <Button className={`${(row.lead_closed == "0") ? 'lead_close_status' : 'lead_completed_status'}`} onClick={(e) => changeLeadStatus(row)}>{(row.lead_closed == "0") ? <i className="material-icons">cancel</i> : <i className="material-icons">check_circle</i>}</Button> : ""
                    }
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        },
        /* {
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
                        {(row.kyc_status == "1") ?
                            <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                            : <div><MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">edit_note</i>&nbsp;&nbsp;Edit User</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">manage_accounts</i>&nbsp;&nbsp;Change Sponser</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">thumb_up</i>&nbsp;&nbsp;MT5 Bonus</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">add_circle_outline</i>&nbsp;&nbsp;Deposit</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons ">download_for_offline</i>&nbsp;&nbsp;Withdraw</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">currency_exchange</i>&nbsp;&nbsp;Transfer</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">password</i>&nbsp;&nbsp;Change Password</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">password</i>&nbsp;&nbsp;Change MT5 Password</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">login</i>&nbsp;&nbsp;Login As</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">settings</i>&nbsp;&nbsp;Settings</MenuItem></div>}

                    </Menu>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        } */
    ];

    const actionMenuPopup = (e, data) => {
        console.log(e.target.getAttribute('class'));
        console.log(e.target.classList.contains('reject'));
        handleContextClose(data.sr_no);
        if (e.target.classList.contains('reject')) {
            // setDialogTitle('Reject');
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
            // setDialogTitle('Approve');
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
            toast.success('Client has been completed successfully.');
        } else if (status == 'rejected') {
            toast.success('Client has been rejected successfully.');
        }
    }

    const changeSales = (e, data) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>Do you want to change sales person ?</p>
                        <div className='confirmation-alert-action-button'>
                            <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                            <Button variant="contained" className='btn-gradient btn-success'
                                onClick={() => {
                                    changeUserSales(data,e.target.value);
                                    onClose();
                                }}
                            >
                                Yes, Apply it!
                            </Button>
                        </div>
                    </div>
                );
            }
        });
    }

    const changeLeadStatus = (data) => {
        if (data.lead_closed == "0") {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui'>
                            <h1>Are you sure?</h1>
                            <p>Do you want to close lead status ?</p>
                            <div className='confirmation-alert-action-button'>
                                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                                <Button variant="contained" className='btn-gradient btn-success'
                                    onClick={() => {
                                        closeLead(data);
                                        onClose();
                                    }}
                                >
                                    Yes, Lead Close!
                                </Button>
                            </div>
                        </div>
                    );
                }
            });
        }
    }

    const closeLead = async (data) => {
        const param = new FormData();
        /* param.append('is_app', 1);
        param.append('AADMIN_LOGIN_ID', 1); */
        param.append('action', 'change_lead_status');
        param.append('user_id', data.user_id);
        param.append('lead_closed', 1);

        await axios.post(`${Url}/ajaxfiles/update_user_profile.php`, param).then((res) => {
            if (res.data.message == "Session has been expired") {
                localStorage.setItem("login", true);
                navigate("/");
            }

            if (res.data.message == "error") {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                setRefresh(!refresh);
            }
        });
    }

    const getSalesList = () => {
        const param = new FormData();
        // param.append('is_app', 1);
        // param.append('AADMIN_LOGIN_ID', 1);
        param.append('action', "list_salesman");

        axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
            if (res.data.status == "error") {
                // toast.error(res.data.message);
            } else {
                setSalesList(res.data.managers)
            }
        });
    }

    const changeUserSales = (row, managerId) => {
        const param = new FormData();
        // param.append('is_app', 1);
        // param.append('AADMIN_LOGIN_ID', 1);
        param.append('action', "assign_salesman");
        param.append('user_id', row.user_id);
        param.append('manager_id', managerId);

        axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
            if (res.data.status == "error") {
                toast.error(res.data.message);
            } else {
                setRefresh(!refresh);
            }
        });
    }

    useEffect(() => {
        getSalesList()
    }, [])

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Client List</p>

                                <CommonFilter search={searchBy} searchWord={setSearchKeyword} />
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    {/* <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add New Client</Button>
                                        <Button variant="contained">Add IB</Button>
                                        <Button variant="contained">All</Button>
                                    </div>
                                    <br /> */}
                                    <CommonTable url={`${Url}/datatable/users_list.php`} column={depositColumn} sort='0' refresh={refresh} filter={filterData} search={searchBy} searchWord={searchKeyword} param={param}/>
                                </Paper>

                                <BootstrapDialog
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open}
                                    className='modalWidth100'
                                >
                                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                        Create new client
                                    </BootstrapDialogTitle>
                                    <DialogContent dividers>
                                        <Stepper activeStep={activeStep} orientation="vertical">
                                            {/* {steps.map((step, index) => (
                                                <Step key={step.label}>
                                                    <StepLabel
                                                        optional={
                                                            index === 2 ? (
                                                                <Typography variant="caption">Last step</Typography>
                                                            ) : null
                                                        }
                                                    >
                                                        {step.label}
                                                    </StepLabel>
                                                    <StepContent>
                                                        <Typography>{step.description}</Typography>
                                                        <Box sx={{ mb: 2 }}>
                                                            <div>
                                                                <Button
                                                                    variant="contained"
                                                                    onClick={handleNext}
                                                                    sx={{ mt: 1, mr: 1 }}
                                                                >
                                                                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                                                </Button>
                                                                <Button
                                                                    disabled={index === 0}
                                                                    onClick={handleBack}
                                                                    sx={{ mt: 1, mr: 1 }}
                                                                >
                                                                    Back
                                                                </Button>
                                                            </div>
                                                        </Box>
                                                    </StepContent>
                                                </Step>
                                            ))} */}
                                            <Step key='PERSONAL INFORMATION'>
                                                <StepLabel>
                                                    PERSONAL INFORMATION
                                                </StepLabel>
                                                <StepContent>
                                                    <div className='elementSection'>
                                                        <FormControl variant="standard" className='w-100'>
                                                            <InputLabel id="demo-simple-select-standard-label">Client type</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                onChange={addNewClientType}
                                                                label="Client type"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <MenuItem value='Individual'>Individual</MenuItem>
                                                                <MenuItem value='Corporate'>Corporate</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='elementSection'>
                                                        <FormControl variant="standard" className='w-30'>
                                                            <InputLabel id="demo-simple-select-standard-label">Title</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                onChange={addNewClientType}
                                                                label="Title"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <MenuItem value='Mr.'>Mr.</MenuItem>
                                                                <MenuItem value='Mrs'>Mrs</MenuItem>
                                                                <MenuItem value='Miss'>Miss</MenuItem>
                                                                <MenuItem value='Ms'>Ms</MenuItem>
                                                                <MenuItem value='Dr'>Dr</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-45' label="First Name" variant="standard" />
                                                        <TextField id="standard-basic" className='w-45' label="Last Name" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-100' label="Email" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-100' label="Phone" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField type='date' id="standard-basic" className='w-100' label="Date of birth" variant="standard" focused />
                                                    </div>

                                                    <Box sx={{ mb: 2 }}>
                                                        <div className='btnStepperAction'>
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleNext}
                                                                sx={{ mt: 1, mr: 1 }}
                                                            >
                                                                Next
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </StepContent>
                                            </Step>
                                            <Step key='CLIENT DETAILS'>
                                                <StepLabel>
                                                    CLIENT DETAILS
                                                </StepLabel>
                                                <StepContent>
                                                    <div className='elementSection'>
                                                        <FormControl variant="standard" className='w-100'>
                                                            <InputLabel id="demo-simple-select-standard-label">Client type</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                value={clientType}
                                                                onChange={addNewClientType}
                                                                label="Client type"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <MenuItem value='Individual'>Individual</MenuItem>
                                                                <MenuItem value='Corporate'>Corporate</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='elementSection'>
                                                        <FormControl variant="standard" className='w-30'>
                                                            <InputLabel id="demo-simple-select-standard-label">Title</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                value={clientType}
                                                                onChange={addNewClientType}
                                                                label="Title"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <MenuItem value='Mr.'>Mr.</MenuItem>
                                                                <MenuItem value='Mrs'>Mrs</MenuItem>
                                                                <MenuItem value='Miss'>Miss</MenuItem>
                                                                <MenuItem value='Ms'>Ms</MenuItem>
                                                                <MenuItem value='Dr'>Dr</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-45' label="First Name" variant="standard" />
                                                        <TextField id="standard-basic" className='w-45' label="Last Name" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-100' label="Email" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-100' label="Phone" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField type='date' id="standard-basic" className='w-100' label="Date of birth" variant="standard" />
                                                    </div>

                                                    <Box sx={{ mb: 2 }}>
                                                        <div className='btnStepperAction'>
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleNext}
                                                                sx={{ mt: 1, mr: 1 }}
                                                            >
                                                                Next
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </StepContent>
                                            </Step>
                                            <Step key='KYC DOCUMENTS (optional)'>
                                                <StepLabel>
                                                    KYC DOCUMENTS (optional)
                                                </StepLabel>
                                                <StepContent>
                                                    <div className='elementSection'>
                                                        <FormControl variant="standard" className='w-100'>
                                                            <InputLabel id="demo-simple-select-standard-label">Client type</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                value={clientType}
                                                                onChange={addNewClientType}
                                                                label="Client type"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <MenuItem value='Individual'>Individual</MenuItem>
                                                                <MenuItem value='Corporate'>Corporate</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='elementSection'>
                                                        <FormControl variant="standard" className='w-30'>
                                                            <InputLabel id="demo-simple-select-standard-label">Title</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                value={clientType}
                                                                onChange={addNewClientType}
                                                                label="Title"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <MenuItem value='Mr.'>Mr.</MenuItem>
                                                                <MenuItem value='Mrs'>Mrs</MenuItem>
                                                                <MenuItem value='Miss'>Miss</MenuItem>
                                                                <MenuItem value='Ms'>Ms</MenuItem>
                                                                <MenuItem value='Dr'>Dr</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-45' label="First Name" variant="standard" />
                                                        <TextField id="standard-basic" className='w-45' label="Last Name" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-100' label="Email" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-100' label="Phone" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField type='date' id="standard-basic" className='w-100' label="Date of birth" variant="standard" />
                                                    </div>

                                                    <Box sx={{ mb: 2 }}>
                                                        <div className='btnStepperAction'>
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleNext}
                                                                sx={{ mt: 1, mr: 1 }}
                                                            >
                                                                Next
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </StepContent>
                                            </Step>
                                            <Step key='ACCOUNT INFO'>
                                                <StepLabel>
                                                    ACCOUNT INFO
                                                </StepLabel>
                                                <StepContent>
                                                    <div className='elementSection'>
                                                        <FormControl variant="standard" className='w-100'>
                                                            <InputLabel id="demo-simple-select-standard-label">Client type</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                value={clientType}
                                                                onChange={addNewClientType}
                                                                label="Client type"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <MenuItem value='Individual'>Individual</MenuItem>
                                                                <MenuItem value='Corporate'>Corporate</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='elementSection'>
                                                        <FormControl variant="standard" className='w-30'>
                                                            <InputLabel id="demo-simple-select-standard-label">Title</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-standard-label"
                                                                id="demo-simple-select-standard"
                                                                value={clientType}
                                                                onChange={addNewClientType}
                                                                label="Title"
                                                                style={{ width: '100%' }}
                                                            >
                                                                <MenuItem value='Mr.'>Mr.</MenuItem>
                                                                <MenuItem value='Mrs'>Mrs</MenuItem>
                                                                <MenuItem value='Miss'>Miss</MenuItem>
                                                                <MenuItem value='Ms'>Ms</MenuItem>
                                                                <MenuItem value='Dr'>Dr</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-45' label="First Name" variant="standard" />
                                                        <TextField id="standard-basic" className='w-45' label="Last Name" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-100' label="Email" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField id="standard-basic" className='w-100' label="Phone" variant="standard" />
                                                    </div>
                                                    <div className='elementSection'>
                                                        <TextField type='date' id="standard-basic" className='w-100' label="Date of birth" variant="standard" />
                                                    </div>

                                                    <Box sx={{ mb: 2 }}>
                                                        <div className='btnStepperAction'>
                                                            <Button
                                                                variant="contained"
                                                                onClick={handleNext}
                                                                sx={{ mt: 1, mr: 1 }}
                                                            >
                                                                Next
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </StepContent>
                                            </Step>
                                        </Stepper>
                                    </DialogContent>
                                    {/* <DialogActions>
                                        <Button autoFocus onClick={handleClose}>
                                            Save changes
                                        </Button>
                                    </DialogActions> */}
                                </BootstrapDialog>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientList