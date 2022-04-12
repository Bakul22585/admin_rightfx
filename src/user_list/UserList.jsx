import './user_list.css';
import React, { useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import { Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, InputLabel, Menu, MenuItem, OutlinedInput, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonTable from '../common/CommonTable';
import { ColorButton } from '../common/CustomElement';
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
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

const CssTextField = styled(TextField)({
});

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

const UserList = () => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState([]);
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [filterSection, setFilterSection] = useState(false);
    const [filterBy, setFilterBy] = useState('');
    const [clientSearch, setClientSearch] = useState('');
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

    const steps = [
        {
            label: 'Select campaign settings',
            description: `For each ad campaign that you create, you can control how much
                    you're willing to spend on clicks and conversions, which networks
                    and geographical locations you want your ads to show on, and more.`,
        },
        {
            label: 'Create an ad group',
            description:
                'An ad group contains one or more ads which target a shared set of keywords.',
        },
        {
            label: 'Create an ad',
            description: `Try out different ad text to see what brings in the most customers,
                    and learn how to enhance your ads using features like ad extensions.
                    If you run into any problems with your ads, find out how to tell if
                    they're running and how to resolve approval issues.`,
        },
    ];

    const depositColumn = [
        {
            name: 'MT5 ID',
            selector: row => {
                return <span title={row.mt5_id}>{row.mt5_id}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'WALLET ID',
            selector: row => {
                return <span title={row.wallet_code}>{row.wallet_code}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'GROUP LEVEL',
            selector: row => { return <span title={row.group_level}>{row.group_level}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'NAME',
            selector: row => { return <a className='linkColor' title={row.name} onClick={(event) => gotoProfile(row)}>{row.name}</a> },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'EMAIL',
            selector: row => { return <span title={row.user_email}>{row.user_email}</span> },
            sortable: true,
            reorder: true,
            grow: 1.5,
        },
        {
            name: 'PHONE',
            selector: row => { return <span title={row.user_phone}>{row.user_phone}</span> },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'PASSWORD',
            selector: row => {
                return <span title={row.user_visible_password}>{row.user_visible_password}</span>
            },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'KYC',
            selector: row => {
                return <div>
                    <span className={`badge ${(row.kyc_status == "0") ? 'pending' : (row.kyc_status == "1") ? "approved" : "rejected"}`}>{(row.kyc_status == "0") ? 'Pending' : (row.kyc_status == "1") ? "Approved" : "Rejected"}</span>
                </div>
            },
            sortable: true,
            reorder: true,
            grow: 0.8,
        },
        {
            name: 'DATE',
            selector: row => { return <span title={row.date}>{row.date}</span> },
            sortable: true,
            reorder: true,
            grow: 1.2,
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
                        {(row.kyc_status == "1") ?
                            <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                            : <div><MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                                <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons font-color-approved">thumb_up</i>&nbsp;&nbsp;Approved</MenuItem>
                                <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons font-color-rejected">thumb_down</i>&nbsp;&nbsp;Rejected</MenuItem></div>}

                    </Menu>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        }
    ];

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>User List</p>

                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={12}>
                                            <div className='newFilterSection'>
                                                <CssTextField
                                                    id="standard-search"
                                                    label="Search"
                                                    sx={{ width: "100%" }}
                                                    variant="standard"
                                                    name="myclient_search"
                                                    // value={info.myclient_search}
                                                    onChange={input1}
                                                />
                                                <Button onClick={(event) => setFilterSection(!filterSection)}><i className="material-icons"> {(filterSection) ? 'menu' : 'filter_list'}</i></Button>
                                            </div>
                                            <br />
                                            {(filterSection) ? <div>
                                                <div className='SerachBySection'>
                                                    <b class="mr-3">Search By : </b>
                                                    <FormControlLabel
                                                        className='searchByCheckbox'
                                                        control={
                                                            <Checkbox checked={state.first_name} onChange={handleChange} name="first_name" />
                                                        }
                                                        label="First Name"
                                                    />
                                                    <FormControlLabel
                                                        className='searchByCheckbox'
                                                        control={
                                                            <Checkbox checked={state.last_name} onChange={handleChange} name="last_name" />
                                                        }
                                                        label="Last Name"
                                                    />
                                                    <FormControlLabel
                                                        className='searchByCheckbox'
                                                        control={
                                                            <Checkbox checked={state.email} onChange={handleChange} name="email" />
                                                        }
                                                        label="Email"
                                                    />
                                                    <FormControlLabel
                                                        className='searchByCheckbox'
                                                        control={
                                                            <Checkbox checked={state.phone} onChange={handleChange} name="phone" />
                                                        }
                                                        label="Phone"
                                                    />
                                                    <FormControlLabel
                                                        className='searchByCheckbox'
                                                        control={
                                                            <Checkbox checked={state.account_id} onChange={handleChange} name="account_id" />
                                                        }
                                                        label="Account ID"
                                                    />
                                                    <FormControlLabel
                                                        className='searchByCheckbox'
                                                        control={
                                                            <Checkbox checked={state.mt5_account} onChange={handleChange} name="mt5_account" />
                                                        }
                                                        label="MT5 Account"
                                                    />
                                                </div>
                                                <div className='filterBy'>
                                                    <b class="mb-2 d-block">Filter By :</b>
                                                    <FormControl>
                                                        <label className="small font-weight-bold text-dark">
                                                            Category
                                                        </label>
                                                        <Select
                                                            label="Category"
                                                            value={filterBy}
                                                            onChange={filterByChange}
                                                            input={<BootstrapInput />}
                                                            sx={{ width: "200px" }}
                                                        >
                                                            <MenuItem value="">None</MenuItem>
                                                            <MenuItem value="Date">Date</MenuItem>
                                                            <MenuItem value="Sales">Sales</MenuItem>
                                                            <MenuItem value="Country">Country</MenuItem>
                                                            <MenuItem value="Account Type">Account Type</MenuItem>
                                                            <MenuItem value="IB">IB</MenuItem>
                                                            <MenuItem value="Source">Source</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    {(filterBy == 'Date') ? <>
                                                        <FormControl>
                                                            <label className="small font-weight-bold text-dark">
                                                                From
                                                            </label>
                                                            <BootstrapInput type="date"></BootstrapInput>
                                                        </FormControl>
                                                        <FormControl>
                                                            <label className="small font-weight-bold text-dark">
                                                                To
                                                            </label>
                                                            <BootstrapInput type="date"></BootstrapInput>
                                                        </FormControl>
                                                    </> : (filterBy == 'Sales') ?
                                                        <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                            <InputLabel id="demo-multiple-chip-label">Select Sales</InputLabel>
                                                            <Select
                                                                labelId="demo-multiple-chip-label"
                                                                id="demo-multiple-chip"
                                                                multiple
                                                                value={personName}
                                                                onChange={handleChange}
                                                                input={<OutlinedInput id="select-multiple-chip" label="Select Sales" />}
                                                                renderValue={(selected) => (
                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                        {selected.map((value) => (
                                                                            <Chip key={value} label={value} />
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                                MenuProps={MenuProps}
                                                            >
                                                                {names.map((name) => (
                                                                    <MenuItem
                                                                        key={name}
                                                                        value={name}
                                                                        style={getStyles(name, personName, theme)}
                                                                    >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl> : (filterBy == 'Country') ?
                                                            <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                                <InputLabel id="demo-multiple-chip-label">Select Country</InputLabel>
                                                                <Select
                                                                    labelId="demo-multiple-chip-label"
                                                                    id="demo-multiple-chip"
                                                                    multiple
                                                                    value={personName}
                                                                    onChange={handleChange}
                                                                    input={<OutlinedInput id="select-multiple-chip" label="Select Country" />}
                                                                    renderValue={(selected) => (
                                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                            {selected.map((value) => (
                                                                                <Chip key={value} label={value} />
                                                                            ))}
                                                                        </Box>
                                                                    )}
                                                                    MenuProps={MenuProps}
                                                                >
                                                                    {names.map((name) => (
                                                                        <MenuItem
                                                                            key={name}
                                                                            value={name}
                                                                            style={getStyles(name, personName, theme)}
                                                                        >
                                                                            {name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl> : (filterBy == 'Account Type') ?
                                                                <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                                    <label className="small font-weight-bold text-dark">
                                                                        Account Type
                                                                    </label>
                                                                    <Select
                                                                        label="Category"
                                                                        value={filterBy}
                                                                        onChange={filterByChange}
                                                                        input={<BootstrapInput />}
                                                                        sx={{ width: "200px" }}
                                                                    >
                                                                        <MenuItem value="Individual">Individual</MenuItem>
                                                                        <MenuItem value="Individual-IB">Individual-IB</MenuItem>
                                                                        <MenuItem value="Corporate">Corporate</MenuItem>
                                                                    </Select>
                                                                </FormControl> : (filterBy == 'IB') ?
                                                                    <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                                        <InputLabel id="demo-multiple-chip-label">Select IB</InputLabel>
                                                                        <Select
                                                                            labelId="demo-multiple-chip-label"
                                                                            id="demo-multiple-chip"
                                                                            multiple
                                                                            value={personName}
                                                                            onChange={handleChange}
                                                                            input={<OutlinedInput id="select-multiple-chip" label="Select IB" />}
                                                                            renderValue={(selected) => (
                                                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                                    {selected.map((value) => (
                                                                                        <Chip key={value} label={value} />
                                                                                    ))}
                                                                                </Box>
                                                                            )}
                                                                            MenuProps={MenuProps}
                                                                        >
                                                                            {names.map((name) => (
                                                                                <MenuItem
                                                                                    key={name}
                                                                                    value={name}
                                                                                    style={getStyles(name, personName, theme)}
                                                                                >
                                                                                    {name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl> : (filterBy == 'Source') ?
                                                                        <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                                            <InputLabel id="demo-multiple-chip-label">Select Source</InputLabel>
                                                                            <Select
                                                                                labelId="demo-multiple-chip-label"
                                                                                id="demo-multiple-chip"
                                                                                multiple
                                                                                value={sourceName}
                                                                                onChange={handleChange}
                                                                                input={<OutlinedInput id="select-multiple-chip" label="Select Source" />}
                                                                                renderValue={(selected) => (
                                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                                        {selected.map((value) => (
                                                                                            <Chip key={value} label={value} />
                                                                                        ))}
                                                                                    </Box>
                                                                                )}
                                                                                MenuProps={MenuProps}
                                                                            >
                                                                                {source.map((name) => (
                                                                                    <MenuItem
                                                                                        key={name}
                                                                                        value={name}
                                                                                        style={getStyles(name, personName, theme)}
                                                                                    >
                                                                                        {name}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </Select>
                                                                        </FormControl> : ''}
                                                </div>
                                            </div> : ''}
                                        </Grid>
                                        {/* <Grid item sm={6} md={3}>
                                            <FormControl fullWidth={true}>
                                                <label className="small font-weight-bold text-dark">
                                                    From
                                                </label>
                                                <BootstrapInput type="date"></BootstrapInput>
                                            </FormControl>
                                        </Grid>
                                        <Grid item sm={6} md={3}>
                                            <FormControl fullWidth={true}>
                                                <label className="small font-weight-bold text-dark">
                                                    To
                                                </label>
                                                <BootstrapInput type="date"></BootstrapInput>
                                            </FormControl>
                                        </Grid>
                                        <Grid item sm={6} md={3}>
                                            <FormControl fullWidth={true}>
                                                <label className="small font-weight-bold text-dark">
                                                    Status
                                                </label>
                                                <Select
                                                    // value={filterData.deposit_status ? filterData.deposit_status : ''}
                                                    // onChange={(e) => setFilterData({...filterData,'deposit_status': e.target.value})}
                                                    displayEmpty
                                                    inputProps={{ "aria-label": "Without label" }}
                                                    input={<BootstrapInput />}
                                                >
                                                    <MenuItem value="">All</MenuItem>
                                                    <MenuItem value="pending">Pending</MenuItem>
                                                    <MenuItem value="approved">Approved</MenuItem>
                                                    <MenuItem value="rejected">Rejected</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item sm={1} md={1}>
                                            <ColorButton className="d-block ml-auto mb-3 mr-3 btn-filter depositFilter">
                                                Filter
                                            </ColorButton>
                                        </Grid> */}
                                    </Grid>
                                </Paper>
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add New Client</Button>
                                        <Button variant="contained">Add IB</Button>
                                        <Button variant="contained">All</Button>
                                    </div>
                                    <br />
                                    <CommonTable url='https://alphapixclients.com/forex/admin/datatable/users_list.php' column={depositColumn} sort='0' filter={filterData} />
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
                                                                value={clientType}
                                                                onChange={addNewClientType}
                                                                label="Client type"
                                                                style={{width: '100%'}}
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
                                                                style={{width: '100%'}}
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
                                                                style={{width: '100%'}}
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
                                                                style={{width: '100%'}}
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
                                                                style={{width: '100%'}}
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
                                                                style={{width: '100%'}}
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
                                                                style={{width: '100%'}}
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
                                                                style={{width: '100%'}}
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

export default UserList