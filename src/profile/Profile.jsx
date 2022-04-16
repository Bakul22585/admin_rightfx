import './profile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, Grid, MenuItem, Select, Menu, Tabs, Tab, Typography, InputLabel, FormControlLabel, Checkbox, Input } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import CustomImageModal from '../common/CustomImageModal';
import CommonTable from '../common/CommonTable';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from '@mui/system';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@emotion/react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            className='panding-left-right-0'
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

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

const Profile = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const [value, setValue] = useState(0);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogTransactionType, setDialogTransactionType] = useState('');
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [filterSection, setFilterSection] = useState(false);
    const [filterBy, setFilterBy] = useState('');

    const depositColumn = [
        {
            name: 'Bank Name',
            selector: row => {
                return <span title={row.mt5_id}>{row.mt5_id}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'Swift',
            selector: row => {
                return <span title={row.wallet_code}>{row.wallet_code}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'Bank Address',
            selector: row => { return <span title={row.group_level}>{row.group_level}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'IBAN',
            selector: row => { return <a className='linkColor' title={row.name} onClick={(event) => gotoProfile(row)}>{row.name}</a> },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'Account Number',
            selector: row => { return <span title={row.user_email}>{row.user_email}</span> },
            sortable: true,
            reorder: true,
            grow: 1.5,
        },
        {
            name: 'CURRENCY',
            selector: row => { return <span title={row.user_phone}>{row.user_phone}</span> },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'BENEFICiary Name',
            selector: row => {
                return <span title={row.user_visible_password}>{row.user_visible_password}</span>
            },
            sortable: true,
            reorder: true,
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

    const activityColumn = [
        {
            name: 'USER NAME',
            selector: row => row.full_name,
            sortable: true,
            reorder: true,
            grow: 0.4,
        },
        {
            name: 'IP ADDRESS',
            selector: row => row.ip_address,
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'DATETIME',
            selector: row => row.datetime,
            sortable: true,
            reorder: true,
            grow: 1,
        }
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const openDialogbox = (e) => {
        console.log(e.target.getAttribute("class"));
        console.log(e.target.classList.contains('createMt5'));
        console.log(e.target.classList.contains('edit_structure'));
        if (e.target.classList.contains('createMt5')) {
            setDialogTitle('Create MT5 Account');
        } else if (e.target.classList.contains('mt5_access')) {
            setDialogTitle('MT5 Access');
        } else if (e.target.classList.contains('link_mt5')) {
            setDialogTitle('Link Existing Account');
        } else if (e.target.classList.contains('reset_mt5')) {
            setDialogTitle('Reset MT5 Password');
        } else if (e.target.classList.contains('change_leverage')) {
            setDialogTitle('Change Account leverage');
        } else if (e.target.classList.contains('add_master_structure')) {
            setDialogTitle('Add Master Structure');
        } else if (e.target.classList.contains('add_shared_structure')) {
            setDialogTitle('ADD SHARED STRUCTURE');
        } else if (e.target.classList.contains('link_client')) {
            setDialogTitle('Link Client');
        } else if (e.target.classList.contains('link_ib')) {
            setDialogTitle('Link To IB');
        } else if (e.target.classList.contains('unlink_ib')) {
            setDialogTitle('Unlink IB');
        } else if (e.target.classList.contains('send_email')) {
            setDialogTitle('Send Email');
        } else if (e.target.classList.contains('cp_access')) {
            setDialogTitle('Control Panel Access');
        } else if (e.target.classList.contains('view_cp_password')) {
            setDialogTitle('View Control Panel Access Password');
        } else if (e.target.classList.contains('download_application')) {
            setDialogTitle('Download Client PDF');
        } else if (e.target.classList.contains('add_note')) {
            setDialogTitle('Add New Note');
        } else if (e.target.classList.contains('add_bank')) {
            setDialogTitle('Add Account');
        } else if (e.target.classList.contains('add_transaction')) {
            setDialogTitle('Add New Transaction');
        } else if (e.target.classList.contains('link_campaign')) {
            setDialogTitle('Link to Campaign');
        } else if (e.target.classList.contains('edit_structure')) {
            setDialogTitle('Edit SHARED STRUCTURE');
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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

    const gotoProfile = (e) => {
        console.log('goto profile page', e);
        navigate("/profile/" + e.name);
    }

    const manageContent = () => {
        if (dialogTitle == 'Create MT5 Account') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Account Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Account Type">
                            <MenuItem value='live'>Live</MenuItem>
                            <MenuItem value='demo'>Demo</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Account option</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Account option">
                            <MenuItem value='executive'>Executive</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'MT5 Access') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Select MT5 Account</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Select MT5 Account">
                            <MenuItem value='live'>Live</MenuItem>
                            <MenuItem value='demo'>Demo</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Status">
                            <MenuItem value='true'>Activate</MenuItem>
                            <MenuItem value='false'>Deactivate</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == "Link Existing Account") {
            return <div>
                <div>
                    <TextField id="standard-basic" label="Account Number" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Account Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Account Type">
                            <MenuItem value='live'>Live</MenuItem>
                            <MenuItem value='demo'>Demo</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Account Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Account Name">
                            <MenuItem value='0'>Executive</MenuItem>
                            <MenuItem value='1'>Other</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'Reset MT5 Password') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Select MT5 Account</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Select MT5 Account">
                            <MenuItem value='60002830'>60002830 - individual-ib</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'Change Account leverage') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">MT5 Account</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="MT5 Account">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Leverage</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Leverage">
                            <MenuItem value='1:1'>1:1</MenuItem>
                            <MenuItem value='1:30'>1:30</MenuItem>
                            <MenuItem value='1:50'>1:50</MenuItem>
                            <MenuItem value='1:100'>1:100</MenuItem>
                            <MenuItem value='1:200'>1:200</MenuItem>
                            <MenuItem value='1:300'>1:300</MenuItem>
                            <MenuItem value='1:400'>1:400</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'Add Master Structure') {
            return <div>
                <div className='structureNameSection'>
                    <label>Structure Name</label>
                    <input type='text' className='' placeholder='Structure Name' />
                </div>
                <hr className='solid' />
                <br />
                <div className='structureInputSection'>
                    <Grid container>
                        <Grid item md={4} lg={4} xl={4} className='label-center'>
                            <label>Executive</label>
                        </Grid>
                        <Grid item md={8} lg={8} xl={8}>
                            <Grid container spacing={1}>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>forex</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>bullion</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>indices</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>energy</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>crypto</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>;
        } else if (dialogTitle == 'ADD SHARED STRUCTURE') {
            return <div>
                <div className='structureInputSection'>
                    <Grid container>
                        <Grid item md={4} lg={4} xl={4} className='label-center'>
                            <div className='structureNameSection'>
                                <label>Structure Name</label>
                                <input type='text' className='' placeholder='Structure Name' />
                            </div>
                        </Grid>
                        <Grid item md={8} lg={8} xl={8}>
                            <Grid container spacing={1}>
                                <Grid item md={3} lg={3} xl={3}>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <label>Account Type</label>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <label>Total Rebate</label>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <label>Total Commission</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item md={3} lg={3} xl={3}>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <label>Executive</label>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <input type='text' className='' placeholder='Rebate' />
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <input type='text' className='' placeholder='Commission' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <hr className='solid' />
                <div className='structureInputSection'>
                    <Grid container spacing={1}>
                        <Grid item md={4} lg={4} xl={4}>
                            <label>IB</label>
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <input type='text' className='' value='60002830' style={{ width: '70%' }} />
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <Button variant="contained" className='btn-gradient'>Proceed</Button>
                            <IconButton aria-label="delete" className='btn-danger'>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                <hr className='solid' />
                <div className='contentActionButton'>
                    <Button variant="contained" className='btn-gradient'>Add another IB</Button>
                    <Button variant="contained" disabled>Add Structure</Button>
                </div>
            </div>;
        } else if (dialogTitle == 'Link Client') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Client</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Client">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Structure</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Structure">
                            <MenuItem value='Test'>Test</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'Link To IB') {
            return <div>
                <div className='margeField'>
                    <TextField id="standard-basic" label="Account Number" variant="standard" sx={{ width: '50%' }} />
                    <TextField id="standard-basic" label="Account Number" variant="standard" sx={{ width: '50%' }} />
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Structure</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Structure">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'Unlink IB') {
        } else if (dialogTitle == 'Send Email') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">FROM</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="FROM">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">TO</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="TO">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Subject" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Template Title" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Language">
                            <MenuItem value='en-gb'>English</MenuItem>
                            <MenuItem value='ar-ae'>عربي</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Template</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Template">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div className='editor-section-border'>
                    <Editor
                        // editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        // onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
            </div>;
        } else if (dialogTitle == 'Control Panel Access') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Status">
                            <MenuItem value='true'>Active</MenuItem>
                            <MenuItem value='false'>Blocked</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'View Control Panel Access Password') {
        } else if (dialogTitle == 'Download Client PDF') {
        } else if (dialogTitle == 'Add New Note') {
            return <div>
                <div>
                    <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Call Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Call Status">
                            <MenuItem value='1'>1st Call Attempted</MenuItem>
                            <MenuItem value='2'>2nd Call Attempted</MenuItem>
                            <MenuItem value='3'>3rd Call Attempted</MenuItem>
                            <MenuItem value='4'>4th Call Attempted</MenuItem>
                            <MenuItem value='5'>Busy Tune</MenuItem>
                            <MenuItem value='6'>Not Interested</MenuItem>
                            <MenuItem value='7'>Archived</MenuItem>
                            <MenuItem value='8'>Qualified</MenuItem>
                            <MenuItem value='9'>Interested</MenuItem>
                            <MenuItem value='10'>Language Not Support</MenuItem>
                            <MenuItem value='11'>Converted</MenuItem>
                            <MenuItem value='12'>Wrong Number</MenuItem>
                            <MenuItem value='13'>Fake Registration</MenuItem>
                            <MenuItem value='14'>Duplicate</MenuItem>
                            <MenuItem value='15'>Poor quality but can follow up</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControlLabel className='declarationCheckbox'
                        control={
                            // <Checkbox checked={true} name="declaration" size="small"/>
                            <Checkbox defaultChecked name="declaration" size="small" />
                        }
                        label="Set Reminder"
                    />
                </div>
            </div>;
        } else if (dialogTitle == 'Add Account') {
            return <div>
                <div>
                    <TextField id="standard-basic" label="Beneficiary Name" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Beneficiary Bank Name" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Beneficiary Bank Address" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="IBAN Number" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Account Number" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="SWIFT Code" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Currency Code" variant="standard" sx={{ width: '100%' }} />
                </div>
            </div>;
        } else if (dialogTitle == 'Add New Transaction') {
            if (dialogTransactionType == '') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                onChange={(e) => setDialogTransactionType(e.target.value)}
                                value={dialogTransactionType}
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type">
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>;
            } else if (dialogTransactionType == 'DEPOSIT') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                onChange={(e) => setDialogTransactionType(e.target.value)}
                                value={dialogTransactionType}
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type">
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Account">
                                <MenuItem value=''></MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Payment Gateway</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Payment Gateway">
                                <MenuItem value='Wire Transfer'>Wire Transfer</MenuItem>
                                <MenuItem value='Crypto'>Crypto</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} />
                        <label htmlFor="contained-button-file" className='fileuploadButton'>
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span">
                                <i className="material-icons">backup</i>Upload
                            </Button>
                        </label>
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} />
                    </div>
                </div>;
            } else if (dialogTransactionType == 'WITHDRAWAL') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                onChange={(e) => setDialogTransactionType(e.target.value)}
                                value={dialogTransactionType}
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type">
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }} focused>
                            <InputLabel id="demo-simple-select-standard-label">From Account Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account Type">
                                <MenuItem value='live'>Live Accounts</MenuItem>
                                <MenuItem value='ib'>IB Account</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">From Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account">
                                <MenuItem value=''></MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Payment Gateway</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Payment Gateway">
                                <MenuItem value='Wire Transfer'>Wire Transfer</MenuItem>
                                <MenuItem value='Crypto'>Crypto</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} />
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} />
                    </div>
                </div>;
            } else if (dialogTransactionType == 'INTERNAL_TRANSFER') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                onChange={(e) => setDialogTransactionType(e.target.value)}
                                value={dialogTransactionType}
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type">
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }} focused>
                            <InputLabel id="demo-simple-select-standard-label">From Account Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account Type">
                                <MenuItem value='live'>Live Accounts</MenuItem>
                                <MenuItem value='ib'>IB Account</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transfer To</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Transfer To">
                                <MenuItem value='own'>Own Account</MenuItem>
                                <MenuItem value='clients'>Client's Account</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">From Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account">
                                <MenuItem value=''></MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">To Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="To Account">
                                <MenuItem value=''></MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} />
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} />
                    </div>
                </div>;
            } else if (dialogTransactionType == 'CREDIT') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                onChange={(e) => setDialogTransactionType(e.target.value)}
                                value={dialogTransactionType}
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type">
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }} focused>
                            <InputLabel id="demo-simple-select-standard-label">Credit Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Credit Type">
                                <MenuItem value='CREDIT_IN'>Credit In</MenuItem>
                                <MenuItem value='CREDIT_OUT'>Credit Out</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account">
                                <MenuItem value=''></MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} />
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} />
                    </div>
                </div>;
            }
        } else if (dialogTitle == 'Link to Campaign') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Live Account</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Live Account">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Campaign</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Campaign">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'Edit SHARED STRUCTURE') {
            return <div>
                <div className='structureInputSection'>
                    <Grid container>
                        <Grid item md={4} lg={4} xl={4} className='label-center'>
                            <div className='structureNameSection'>
                                <label>Structure Name</label>
                                <input type='text' className='' placeholder='Structure Name' />
                            </div>
                        </Grid>
                        <Grid item md={8} lg={8} xl={8}>
                            <Grid container spacing={1}>
                                <Grid item md={3} lg={3} xl={3}>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <label>Account Type</label>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <label>Total Rebate</label>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <label>Total Commission</label>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item md={3} lg={3} xl={3}>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <label>Executive</label>
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <input type='text' className='' placeholder='Rebate' />
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <input type='text' className='' placeholder='Commission' />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <hr className='solid' />
                <div className='structureInputSection'>
                    <Grid container spacing={1}>
                        <Grid item md={4} lg={4} xl={4}>
                            <label>IB</label>
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <input type='text' className='' value='60002830' style={{ width: '70%' }} />
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <Button variant="contained" className='btn-gradient'>Proceed</Button>
                            <IconButton aria-label="delete" className='btn-danger'>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>
                <hr className='solid' />
                <div className='contentActionButton'>
                    <Button variant="contained" className='btn-gradient'>Add another IB</Button>
                    <Button variant="contained">Update For New Clients Only</Button>
                </div>
            </div>;
        }
    }

    const manageDialogActionButton = () => {
        if (dialogTitle == 'Create MT5 Account') {
            return <div>
                <Button variant="contained">Create</Button>
            </div>;
        } else if (dialogTitle == 'MT5 Access') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient'>Update</Button>
            </div>;
        } else if (dialogTitle == "Link Existing Account") {
            return <div>
                <Button variant="contained">Link</Button>
            </div>;
        } else if (dialogTitle == 'Reset MT5 Password') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-danger font-color-white'>Reset</Button>
            </div>;
        } else if (dialogTitle == 'Change Account leverage') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient'>Change</Button>
            </div>;
        } else if (dialogTitle == 'Control Panel Access') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient'>Update</Button>
            </div>;
        } else if (dialogTitle == 'Add Account') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient'>Add Account</Button>
            </div>;
        } else if (dialogTitle == 'Add New Note') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient'>Add Note</Button>
            </div>;
        } else if (dialogTitle == 'Add New Transaction') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient'>Add Transaction</Button>
            </div>;
        } else if (dialogTitle == 'Link To IB') {
            return <div>
                <Button variant="contained">Next</Button>
            </div>;
        } else if (dialogTitle == 'Link Client') {
            return <div>
                <Button variant="contained">Save</Button>
            </div>;
        } else if (dialogTitle == 'Add Master Structure') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient'>Add Structure</Button>
            </div>;
        } else if (dialogTitle == 'ADD SHARED STRUCTURE') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
            </div>;
        } else if (dialogTitle == 'Send Email') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='btn-gradient'>Send</Button>
            </div>;
        } else if (dialogTitle == 'Link to Campaign') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient'>Link</Button>
            </div>;
        } else if (dialogTitle == 'Edit SHARED STRUCTURE') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
            </div>;
        }
    }

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <div className='client-detail-header'>
                                    <div className='client-name'>
                                        <label>{id}</label>
                                        <p>CU96331414</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Created On</label>
                                        <p>March 21st 2022, 4:13 pm</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Total Accounts</label>
                                        <p>0</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Account Currency</label>
                                        <p>USD</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Balance</label>
                                        <p>$ 0.00</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Sales Agent</label>
                                        <p>Not Assigned</p>
                                    </div>
                                </div>
                                <br />
                                {/* <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}> */}
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="scrollable auto tabs example"
                                    className='tabsBar'
                                >
                                    <Tab label="PROFILE PAGE" />
                                    <Tab label="BANK DETAILS" />
                                    <Tab label="DOCUMENTS" />
                                    <Tab label="ACCOUNTS" />
                                    <Tab label="ACTIVITIES" />
                                    <Tab label="LOGS" />
                                    <Tab label="TRANSACTIONS" />
                                    <Tab label="REFERRALS" />
                                    <Tab label="PARTNERSHIP" />
                                    <Tab label="STATEMENT" />
                                </Tabs>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={9} lg={9} xl={9}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <p className='header-title'>General Information</p>
                                                    <div className='contentSection formSection'>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Title</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // // onChange={handleChange}
                                                                    label="Title"
                                                                >
                                                                    <MenuItem value='Mr.'>Mr.</MenuItem>
                                                                    <MenuItem value='Mrs'>Mrs</MenuItem>
                                                                    <MenuItem value='Miss'>Miss</MenuItem>
                                                                    <MenuItem value='Ms'>Ms</MenuItem>
                                                                    <MenuItem value='Dr'>Dr</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="First Name" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Last Name" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Phone" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Mobile" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Email" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField type='date' id="standard-basic" label="Date of Birth" variant="standard" sx={{ width: '100%' }} focused />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Nationality</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                    label="Nationality"
                                                                >
                                                                    <MenuItem value='Mr.'>Mr.</MenuItem>
                                                                    <MenuItem value='Mrs'>Mrs</MenuItem>
                                                                    <MenuItem value='Miss'>Miss</MenuItem>
                                                                    <MenuItem value='Ms'>Ms</MenuItem>
                                                                    <MenuItem value='Dr'>Dr</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Country of Residence</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                    label="Country of Residence"
                                                                >
                                                                    <MenuItem value='Mr.'>Mr.</MenuItem>
                                                                    <MenuItem value='Mrs'>Mrs</MenuItem>
                                                                    <MenuItem value='Miss'>Miss</MenuItem>
                                                                    <MenuItem value='Ms'>Ms</MenuItem>
                                                                    <MenuItem value='Dr'>Dr</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="City" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Address" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Address Line 2" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Gendere</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                    label="Gender"
                                                                >
                                                                    <MenuItem value='male'>Male</MenuItem>
                                                                    <MenuItem value='female'>Female</MenuItem>
                                                                    <MenuItem value='other'>Other</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Postal Code" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                    label="Language"
                                                                >
                                                                    <MenuItem value='en-gb'>English</MenuItem>
                                                                    <MenuItem value='ar-ae'>عربي</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Source" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">US citizen ?</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                    label="US citizen ?"
                                                                >
                                                                    <MenuItem value='yes'>Yes</MenuItem>
                                                                    <MenuItem value='no'>No</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Worked in Financial?</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                    label="Worked in Financial?"
                                                                >
                                                                    <MenuItem value='yes'>Yes</MenuItem>
                                                                    <MenuItem value='no'>No</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Tax Identification Number" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Politically exposed ?</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                    label="Politically exposed ?"
                                                                >
                                                                    <MenuItem value='yes'>Yes</MenuItem>
                                                                    <MenuItem value='no'>No</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <p className='newSection-title'>ID Details</p>
                                                    <div className='contentSection formSection'>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">ID Type</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    // onChange={handleChange}
                                                                    label="ID Type"
                                                                >
                                                                    <MenuItem value='PASSPORT'>Passport</MenuItem>
                                                                    <MenuItem value='ID'>ID</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="ID Number" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Country of Issue" variant="standard" focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField type='date' id="standard-basic" label="Date of Issue" variant="standard" sx={{ width: '100%' }} focused />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField type='date' id="standard-basic" label="Date of Expiry" variant="standard" sx={{ width: '100%' }} focused />
                                                        </div>
                                                    </div>
                                                    <div className='btnActionSection'>
                                                        <Button variant="contained">Update Profile</Button>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={3} lg={3} xl={3}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                                    <p className='header-title'>Quick Actions</p>
                                                    <div className='contentSection'>
                                                        <p className='group-header'>Trading Account</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained" className='createMt5' onClick={openDialogbox}>Create MT5</Button>
                                                            <Button variant="contained" className='mt5_access' onClick={openDialogbox}>MT5 Access</Button>
                                                            <Button variant="contained" className='link_mt5' onClick={openDialogbox}>Link MT5</Button>
                                                            <Button variant="contained" className='reset_mt5' onClick={openDialogbox}>Reset MT5</Button>
                                                            <Button variant="contained" className='change_leverage' onClick={openDialogbox}>Change Leverage</Button>
                                                        </div>
                                                        <br />
                                                        <p className='group-header'>IB</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained" className='add_master_structure' onClick={openDialogbox}>Add Master Structure</Button>
                                                            <Button variant="contained" className='add_shared_structure' onClick={openDialogbox}>Add Shared Structure</Button>
                                                            <Button variant="contained" className='link_client' onClick={openDialogbox} >Link Client</Button>
                                                            <Button variant="contained" className='link_ib' onClick={openDialogbox}>Link To IB</Button>
                                                            <Button variant="contained" className='unlink_ib' onClick={openDialogbox} >Unlink IB</Button>
                                                        </div>
                                                        <br />
                                                        <p className='group-header'>Communication</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained" className='send_email' onClick={openDialogbox}>Send Email</Button>
                                                        </div>
                                                        <br />
                                                        <p className='group-header'>Client Portal</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained" className='cp_access' onClick={openDialogbox}>CP Access</Button>
                                                            <Button variant="contained" className='view_cp_password' onClick={openDialogbox} >View CP Password</Button>
                                                        </div>
                                                        <br />
                                                        <p className='group-header'>Misc.</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained" className='download_application' onClick={openDialogbox}>Download Application</Button>
                                                            <Button variant="contained" className='add_note' onClick={openDialogbox}>Add Note</Button>
                                                            <Button variant="contained" className='add_bank' onClick={openDialogbox}>Add Bank</Button>
                                                            <Button variant="contained" className='add_transaction' onClick={openDialogbox}>Add Transaction</Button>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={6} lg={6} xl={6}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <p className='header-title'>Financial Information</p>
                                                    <div className='contentSection'>
                                                        <Grid container spacing={3} className='grid-handle'>
                                                            <Grid item md={6} lg={6} xl={6}>
                                                                <p className='subtitle'>Annual Income</p>
                                                            </Grid>
                                                            <Grid item md={6} lg={6} xl={6}>
                                                                <p className='subtitle'>Source of Funds</p>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={6} lg={6} xl={6}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <p className='header-title'>Employment Details</p>
                                                    <div className='contentSection'>
                                                        <Grid container spacing={3} className='grid-handle'>
                                                            <Grid item md={6} lg={6} xl={6}>
                                                                <div className='element' style={{ width: '100%' }}>
                                                                    <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                        <InputLabel id="demo-simple-select-standard-label">Employment Status</InputLabel>
                                                                        <Select
                                                                            labelId="demo-simple-select-standard-label"
                                                                            id="demo-simple-select-standard"
                                                                            // value={age}
                                                                            // // onChange={handleChange}
                                                                            label="Employment Status"
                                                                        >
                                                                            <MenuItem value='Employed (full time)'>Employed (full time)</MenuItem>
                                                                            <MenuItem value='Self Employed'>Self Employed</MenuItem>
                                                                            <MenuItem value='Employed (part time )'>Employed (part time )</MenuItem>
                                                                            <MenuItem value='unemployed'>unemployed</MenuItem>
                                                                            <MenuItem value='Student'>Student</MenuItem>
                                                                            <MenuItem value='Retired'>Retired</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </div>
                                                            </Grid>
                                                            <Grid item md={6} lg={6} xl={6}>
                                                                <div className='element' style={{ width: '100%' }}>
                                                                    <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                        <InputLabel id="demo-simple-select-standard-label">Inudstry</InputLabel>
                                                                        <Select
                                                                            labelId="demo-simple-select-standard-label"
                                                                            id="demo-simple-select-standard"
                                                                            // value={age}
                                                                            // // onChange={handleChange}
                                                                            label="Inudstry"
                                                                        >
                                                                            <MenuItem value='Aviation'>Aviation</MenuItem>
                                                                            <MenuItem value='Agricultural'>Agricultural</MenuItem>
                                                                            <MenuItem value='Financial industry'>Financial industry</MenuItem>
                                                                            <MenuItem value='Marketing'>Marketing</MenuItem>
                                                                            <MenuItem value='Retail industry'>Retail industry</MenuItem>
                                                                            <MenuItem value='HR'>HR</MenuItem>
                                                                            <MenuItem value='Management'>Management</MenuItem>
                                                                            <MenuItem value='Healthcare'>Healthcare</MenuItem>
                                                                            <MenuItem value='Administration'>Administration</MenuItem>
                                                                            <MenuItem value='Academic'>Academic</MenuItem>
                                                                            <MenuItem value='Engineering'>Engineering</MenuItem>
                                                                            <MenuItem value='Civil Engineering'>Civil Engineering</MenuItem>
                                                                            <MenuItem value='Architecture'>Architecture</MenuItem>
                                                                            <MenuItem value='Media'>Media</MenuItem>
                                                                            <MenuItem value='Chemical engineering'>Chemical engineering</MenuItem>
                                                                            <MenuItem value='Power engineering'>Power engineering</MenuItem>
                                                                            <MenuItem value='Other'>Other</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </div>
                                                                <div className='btnActionSection employment-details'>
                                                                    <Button variant="contained">Update Information</Button>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={6} lg={6} xl={6}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <p className='header-title'>Declarations</p>
                                                    <div className='contentSection'>
                                                        <FormControlLabel className='declarationCheckbox'
                                                            control={
                                                                <Checkbox defaultChecked name="declaration" />
                                                            }
                                                            label="By clicking here I give my consent for Exiniti to contact me for marketing purposes. You can opt out at any time. For further details please see ourMarketing and Communication Policy Statement."
                                                        />
                                                        {/* <div className='element'>
                                                        </div> */}
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>Bank Accounts</p>
                                                        <Button variant="contained" className='add_bank' onClick={openDialogbox}>Add New Bank Account</Button>
                                                    </div>
                                                    {/* <br/> */}
                                                    <div className='bankDetailsTabSection'>
                                                        <CommonTable url='https://alphapixclients.com/forex/admin/datatable/users_list.php' column={depositColumn} sort='0' filter={filterData} />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={6} lg={6} xl={6}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>Upload New Document</p>
                                                        {/* <Button variant="contained" className='add_bank' onClick={openDialogbox}>Add New Bank Account</Button> */}
                                                    </div>
                                                    {/* <br/> */}
                                                    <div className='documentDetailsTabSection'>
                                                        <div className='documentSelectionSection'>
                                                            <FormControl variant="standard" sx={{ width: '70%' }}>
                                                                {/* <InputLabel id="demo-simple-select-standard-label">Client</InputLabel> */}
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    label="Client">
                                                                    <MenuItem value='ID_PROOF'>Proof of ID</MenuItem>
                                                                    <MenuItem value='ADDRESS_PROOF'>Proof of Address</MenuItem>
                                                                    <MenuItem value='ADDITIONAL_DOCUMENTS'>Additional Documents</MenuItem>
                                                                    <MenuItem value='AGREEMENTS_INTERNAL'>Agreements Internal</MenuItem>
                                                                    <MenuItem value='WORLD_CHECK'>World Check</MenuItem>
                                                                    <MenuItem value='APPLICATIONS'>Applications</MenuItem>
                                                                    <MenuItem value='IB_STRUCTURE'>IB Structure</MenuItem>
                                                                    <MenuItem value='AGREEMENT'>Agreement</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <FormControl variant="standard" sx={{ width: '30%' }}>
                                                                {/* <InputLabel id="demo-simple-select-standard-label">Client</InputLabel> */}
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    label="Client">
                                                                    <MenuItem value='ID'>ID</MenuItem>
                                                                    <MenuItem value='PASSPORT'>PASSPORT</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={3} dir={theme.direction}>
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>Accounts</p>
                                                        <div className='groun-button'>
                                                            <Button variant="contained" className='link_campaign' onClick={openDialogbox}>Link to Campaign</Button>
                                                            <Button variant="contained" className='link_mt5' onClick={openDialogbox}>Link Account</Button>
                                                            <Button variant="contained" className='createMt5' onClick={openDialogbox}>Create Account</Button>
                                                        </div>
                                                    </div>
                                                    {/* <br/> */}
                                                    <div className='bankDetailsTabSection'>
                                                        <CommonTable url='https://alphapixclients.com/forex/admin/datatable/users_list.php' column={depositColumn} sort='0' filter={filterData} />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={4} dir={theme.direction}>
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>Activities</p>
                                                    </div>
                                                    {/* <br/> */}
                                                    <div className='bankDetailsTabSection'>
                                                        <CommonTable url='https://alphapixclients.com/forex/admin/datatable/activity_log_list.php' column={activityColumn} sort='2' />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={5} dir={theme.direction}>
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>Notes</p>
                                                        <Button variant="contained" className='add_note' onClick={openDialogbox}>Add Note</Button>
                                                    </div>
                                                    <div className='bankDetailsTabSection'>
                                                        <CommonTable url='https://alphapixclients.com/forex/admin/datatable/activity_log_list.php' column={activityColumn} sort='2' />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>Individual Stage History</p>
                                                        {/* <Button variant="contained" className='add_note' onClick={openDialogbox}>Add Note</Button> */}
                                                    </div>
                                                    <div className='bankDetailsTabSection'>
                                                        <CommonTable url='https://alphapixclients.com/forex/admin/datatable/activity_log_list.php' column={activityColumn} sort='2' />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>IB Stage History</p>
                                                        {/* <Button variant="contained" className='add_note' onClick={openDialogbox}>Add Note</Button> */}
                                                    </div>
                                                    <div className='bankDetailsTabSection'>
                                                        <CommonTable url='https://alphapixclients.com/forex/admin/datatable/activity_log_list.php' column={activityColumn} sort='2' />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <br />
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>Status History</p>
                                                        {/* <Button variant="contained" className='add_note' onClick={openDialogbox}>Add Note</Button> */}
                                                    </div>
                                                    <div className='bankDetailsTabSection'>
                                                        <CommonTable url='https://alphapixclients.com/forex/admin/datatable/activity_log_list.php' column={activityColumn} sort='2' />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={6} dir={theme.direction}>
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <p className='margin-0'>Transactions</p>
                                                        <Button variant="contained" className='add_transaction' onClick={openDialogbox}>Add New Transaction</Button>
                                                    </div>
                                                    <div className='bankDetailsTabSection'>
                                                        <CommonTable url='https://alphapixclients.com/forex/admin/datatable/activity_log_list.php' column={activityColumn} sort='2' />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={7} dir={theme.direction}>
                                        Item 8
                                    </TabPanel>
                                    <TabPanel value={value} index={8} dir={theme.direction}>
                                        <Grid container spacing={3} className='grid-handle'>
                                            <Grid item md={12} lg={12} xl={12}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='paper-main-section'>
                                                    <div className='headerSection header-title'>
                                                        <div className='header-search-section'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }}>
                                                                <InputLabel id="demo-simple-select-standard-label">Structure</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    label="Structure">
                                                                    <MenuItem value=''></MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <Button variant="contained" className='add_master_structure'>Structure Delete</Button>
                                                        </div>
                                                        <div className='groun-button'>
                                                            <Button variant="contained" className='add_master_structure' onClick={openDialogbox}>Add Master Structure</Button>
                                                            <Button variant="contained" className='add_shared_structure' onClick={openDialogbox}>Add Shared Structure</Button>
                                                            <Button variant="contained" className='edit_structure' onClick={openDialogbox}>Edit Structure</Button>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={9} dir={theme.direction}>
                                        Item 10
                                    </TabPanel>
                                </SwipeableViews>
                                {/* </Box> */}
                            </Grid>
                        </Grid>

                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            className='modalWidth100'
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" className='dialogTitle' onClose={handleClose}>
                                {dialogTitle}
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                {manageContent()}
                            </DialogContent>
                            <DialogActions>
                                {manageDialogActionButton()}
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile