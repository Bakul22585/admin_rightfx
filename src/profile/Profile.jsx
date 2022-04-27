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
import draftToHtml from 'draftjs-to-html';
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
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState();

    const [profileForm, setProfileForm] = useState({
        title: '',
        first_name: '',
        last_name: '',
        phone: '',
        mobile: '',
        email: '',
        dob: '',
        nationality: '',
        country_of_residence: '',
        city: '',
        address: '',
        address_2: '',
        gender: '',
        postal_code: '',
        language: '',
        source: '',
        us_citizen: '',
        finacial_work: '',
        tax_number: '',
        politically_exposed: '',
        id_type: '',
        id_number: '',
        country_issuce: '',
        date_issue: '',
        date_expiry: '',
    });
    const [createMt5Form, setCreateMt5Form] = useState({
        account_type: '',
        account_option: ''
    });
    const [Mt5AccessForm, setMt5AccessForm] = useState({
        account_type: '',
        status: ''
    });
    const [linkAccountForm, setLinkAccountForm] = useState({
        account_number: '',
        account_type: '',
        account_name: ''
    });
    const [resetMt5PasswordForm, setResetMt5PasswordForm] = useState({
        account: '',
    });
    const [changeLeverageForm, setChangeLeverageForm] = useState({
        account: '',
        leverage: '',
    });
    const [changeAccountPasswordForm, setChangeAccountPasswordForm] = useState({
        main_password: '',
        view_password: '',
    });
    const [masterStructureForm, setmasterStructureForm] = useState({
        name: '',
        forex_rebate: '',
        forex_commission: '',
        bullion_rebate: '',
        bullion_commission: '',
        indices_rebate: '',
        indices_commission: '',
        energy_rebate: '',
        energy_commission: '',
        crypto_rebate: '',
        crypto_commission: '',
    });
    const [employmentDetailsForm, setEmploymentDetailsForm] = useState({
        status: '',
        industry: '',
    });
    const [sharedStructureForm, setSharedStructureForm] = useState({
        name: '',
        total_rebate: '',
        total_commission: '',
        list: [
            {
                'id': '',
                'name': '',
                'value': ''
            }
        ]
    });
    const [linkClientForm, setLinkClientForm] = useState({
        client: '',
        structure: '',
    });
    const [linkIBForm, setLinkIBForm] = useState({
        master_account: '',
        customer_name: '',
        structure: '',
    });
    const [sendMailForm, setsendMailForm] = useState({
        from: '',
        to: '',
        subject: '',
        template_title: '',
        language: '',
        template: '',
        body: '',
    });
    const [cpAccessForm, setCpAccessForm] = useState({
        status: '',
    });
    const [noteForm, setNoteForm] = useState({
        notes: '',
        call_status: '',
        set_reminder: false,
        date: ''
    });
    const [bankAccountForm, setBankAccountForm] = useState({
        name: '',
        bank_name: '',
        bank_address: '',
        iban_number: '',
        account_number: '',
        swift_code: '',
        currency_code: ''
    });
    const [transactionForm, setTransactionForm] = useState({
        type: '',
        from_account_type: '',
        credit_type: '',
        deposit_to: '',
        transfer_to: '',
        account: '',
        account_to: '',
        payment: '',
        amount: '',
        img: '',
        note: '',
        currency_code: '',
        isLoader: false,
        transation_id: ''
    });
    const [linkCampaignForm, setLinkCampaignForm] = useState({
        account: '',
        campaign: '',
    });
    const [editSharedStructureForm, setEditSharedStructureForm] = useState({
        name: '',
        total_rebate: '',
        total_commission: '',
        list: [
            {
                'id': '',
                'name': '',
                'value': ''
            }
        ]
    });
    const [deleteStructureForm, setDeleteStructureForm] = useState({
        structure: '',
    });
    toast.configure();

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
            setCreateMt5Form({
                account_type: '',
                account_option: ''
            });
        } else if (e.target.classList.contains('mt5_access')) {
            setDialogTitle('MT5 Access');
            setMt5AccessForm({
                account_type: '',
                status: ''
            });
        } else if (e.target.classList.contains('link_mt5')) {
            setDialogTitle('Link Existing Account');
            setLinkAccountForm({
                account_number: '',
                account_type: '',
                account_name: ''
            });
        } else if (e.target.classList.contains('reset_mt5')) {
            setDialogTitle('Reset MT5 Password');
            setResetMt5PasswordForm({
                account: '',
            });
        } else if (e.target.classList.contains('change_leverage')) {
            setDialogTitle('Change Account leverage');
            setChangeLeverageForm({
                account: '',
                leverage: '',
            });
        } else if (e.target.classList.contains('add_master_structure')) {
            setDialogTitle('Add Master Structure');
            setmasterStructureForm({
                name: '',
                forex_rebate: '',
                forex_commission: '',
                bullion_rebate: '',
                bullion_commission: '',
                indices_rebate: '',
                indices_commission: '',
                energy_rebate: '',
                energy_commission: '',
                crypto_rebate: '',
                crypto_commission: '',
            });
        } else if (e.target.classList.contains('add_shared_structure')) {
            setDialogTitle('ADD SHARED STRUCTURE');
            setSharedStructureForm({
                name: '',
                total_rebate: '',
                total_commission: '',
                list: [
                    {
                        'id': '',
                        'name': '',
                        'value': ''
                    }
                ]
            });
        } else if (e.target.classList.contains('link_client')) {
            setDialogTitle('Link Client');
            setLinkClientForm({
                client: '',
                structure: '',
            });
        } else if (e.target.classList.contains('link_ib')) {
            setDialogTitle('Link To IB');
            setLinkIBForm({
                master_account: '',
                customer_name: '',
                structure: '',
            });
        } else if (e.target.classList.contains('unlink_ib')) {
            setDialogTitle('Unlink IB');
        } else if (e.target.classList.contains('send_email')) {
            setDialogTitle('Send Email');
            setsendMailForm({
                from: '',
                to: '',
                subject: '',
                template_title: '',
                language: '',
                template: '',
                body: '',
            });
        } else if (e.target.classList.contains('cp_access')) {
            setDialogTitle('Control Panel Access');
            setCpAccessForm({
                status: '',
            });
        } else if (e.target.classList.contains('view_cp_password')) {
            setDialogTitle('View Control Panel Access Password');
        } else if (e.target.classList.contains('download_application')) {
            setDialogTitle('Download Client PDF');
        } else if (e.target.classList.contains('add_note')) {
            setDialogTitle('Add New Note');
            setNoteForm({
                notes: '',
                call_status: '',
                set_reminder: false,
                date: ''
            });
        } else if (e.target.classList.contains('add_bank')) {
            setDialogTitle('Add Account');
            setBankAccountForm({
                name: '',
                bank_name: '',
                bank_address: '',
                iban_number: '',
                account_number: '',
                swift_code: '',
                currency_code: ''
            });
        } else if (e.target.classList.contains('add_transaction')) {
            setDialogTitle('Add New Transaction');
            setTransactionForm({
                type: '',
                from_account_type: '',
                credit_type: '',
                transfer_to: '',
                account: '',
                account_to: '',
                payment: '',
                amount: '',
                img: '',
                note: '',
                currency_code: '',
                isLoader: false,
                deposit_to: '',
                transation_id: ''
            });
        } else if (e.target.classList.contains('link_campaign')) {
            setDialogTitle('Link to Campaign');
            setLinkCampaignForm({
                account: '',
                campaign: '',
            });
        } else if (e.target.classList.contains('edit_structure')) {
            setDialogTitle('EDIT SHARED STRUCTURE');
            setEditSharedStructureForm({
                name: '',
                total_rebate: '',
                total_commission: '',
                list: [
                    {
                        'id': '',
                        'name': '',
                        'value': ''
                    }
                ]
            });
        } else if (e.target.classList.contains('change_password')) {
            setDialogTitle('Change Password');
            setChangeAccountPasswordForm({
                main_password: '',
                view_password: '',
            });
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
                            label="Account Type"
                            name='account_type'
                            onChange={input}>
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
                            label="Account option"
                            name='account_option'
                            onChange={input}>
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
                            label="Select MT5 Account"
                            name='account_type'
                            onChange={input1}>
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
                            label="Status"
                            name='status'
                            onChange={input1}>
                            <MenuItem value='true'>Activate</MenuItem>
                            <MenuItem value='false'>Deactivate</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == "Link Existing Account") {
            return <div>
                <div>
                    <TextField id="standard-basic" label="Account Number" variant="standard" sx={{ width: '100%' }} name='account_number' onChange={input2} />
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Account Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Account Type"
                            name='account_type'
                            onChange={input2}>
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
                            label="Account Name"
                            name='account_name'
                            onChange={input2}>
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
                            label="Select MT5 Account"
                            name='account'
                            onChange={input3}>
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
                            label="MT5 Account"
                            name='account'
                            onChange={input4}>
                            <MenuItem value='121212'>122121</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Leverage</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Leverage"
                            name='leverage'
                            onChange={input4}>
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
                    <input type='text' className='' placeholder='Structure Name' name='name' onChange={input6} />
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
                                    <input type='text' className='' placeholder='Rebate' name='forex_rebate' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' name='forex_commission' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>bullion</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' name='bullion_rebate' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' name='bullion_commission' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>indices</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' name='indices_rebate' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' name='indices_commission' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>energy</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' name='energy_rebate' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' name='energy_commission' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <label>crypto</label>
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Rebate' name='crypto_rebate' onChange={input6} />
                                </Grid>
                                <Grid item md={4} lg={4} xl={4}>
                                    <input type='text' className='' placeholder='Commission' name='crypto_commission' onChange={input6} />
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
                                <input type='text' className='' placeholder='Structure Name' name='name' onChange={sharedStructurIBInput} />
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
                                    <input type='text' className='' placeholder='Rebate' name='total_rebate' onChange={sharedStructurIBInput} />
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <input type='text' className='' placeholder='Commission' name='total_commission' onChange={sharedStructurIBInput} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <hr className='solid' />
                <div className='structureInputSection'>
                    {sharedStructureForm.list.map((rowData, i) => <Grid container spacing={1}>
                        <Grid item md={4} lg={4} xl={4}>
                            <label>IB</label>
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <input type='text' className='' style={{ width: '70%' }} value={rowData.value} onChange={(e) => inputSteuctureIB(e, i)} />
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <Button variant="contained" className='btn-gradient'>Proceed</Button>
                            <IconButton aria-label="delete" className='btn-danger' onClick={(e) => deleteStructureIB(e, i)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>)}

                </div>
                <hr className='solid' />
                <div className='contentActionButton'>
                    <Button variant="contained" className='btn-gradient' onClick={sharedStructurAddNewIB}>Add another IB</Button>
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
                            label="Client"
                            name='client'
                            onChange={linkClientInput}>
                            <MenuItem value='Mehul'>Mehul</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Structure</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Structure"
                            name='structure'
                            onChange={linkClientInput}>
                            <MenuItem value='Test'>Test</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'Link To IB') {
            return <div>
                <div className='margeField'>
                    <TextField id="standard-basic" label="Master Account ID" variant="standard" sx={{ width: '50%' }} name='master_account' onChange={linkIBInput} />
                    <TextField id="standard-basic" label="Customer Name" variant="standard" sx={{ width: '50%' }} name='customer_name' onChange={linkIBInput} />
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Structure</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Structure"
                            name='structure'
                            onChange={linkIBInput}>
                            <MenuItem value='test'>Test</MenuItem>
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
                            label="FROM"
                            name='from'
                            onChange={sendMailInput}>
                            <MenuItem value='1'>admin@gmail.com</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="To" variant="standard" sx={{ width: '100%' }} name='to' onChange={sendMailInput} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Subject" variant="standard" sx={{ width: '100%' }} name='subject' onChange={sendMailInput} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Template Title" variant="standard" sx={{ width: '100%' }} name='template_title' onChange={sendMailInput} />
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Language"
                            name='language'
                            onChange={sendMailInput}>
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
                            label="Template"
                            name='template'
                            onChange={sendMailInput}>
                            <MenuItem value='1'>Test</MenuItem>
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
                        name='body'
                        onChange={onContentStateChange}
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
                            label="Status"
                            name='status'
                            onChange={input7}>
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
                    <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} name='notes' onChange={input8} />
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Call Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Call Status"
                            name='call_status'
                            onChange={input8}>
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
                            <Checkbox name="set_reminder" size="small" onChange={input8} />
                        }
                        label="Set Reminder"
                    />
                </div>
                <br />
                {(noteForm.set_reminder == true) ? <div>
                    <TextField type='date' id="standard-textarea" label="Date" variant="standard" sx={{ width: '100%' }} name='date' onChange={input8} focused />
                </div> : ''}
            </div>;
        } else if (dialogTitle == 'Add Account') {
            return <div>
                <div>
                    <TextField id="standard-basic" label="Beneficiary Name" variant="standard" sx={{ width: '100%' }} name='name' onChange={bankInput} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Beneficiary Bank Name" variant="standard" sx={{ width: '100%' }} name='bank_name' onChange={bankInput} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Beneficiary Bank Address" variant="standard" sx={{ width: '100%' }} name='bank_address' onChange={bankInput} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="IBAN Number" variant="standard" sx={{ width: '100%' }} name='iban_number' onChange={bankInput} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Account Number" variant="standard" sx={{ width: '100%' }} name='account_number' onChange={bankInput} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="SWIFT Code" variant="standard" sx={{ width: '100%' }} name='swift_code' onChange={bankInput} />
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Currency Code" variant="standard" sx={{ width: '100%' }} name='currency_code' onChange={bankInput} />
                </div>
            </div>;
        } else if (dialogTitle == 'Add New Transaction') {
            if (transactionForm.type == '') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type"
                                name='type'
                                value={transactionForm.type}
                                onChange={transactionInput}>
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>;
            } else if (transactionForm.type == 'DEPOSIT') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type"
                                value={transactionForm.type}
                                name='type'
                                onChange={transactionInput}>
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Deposit To</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Deposit To"
                                name='deposit_to'
                                onChange={transactionInput}>
                                <MenuItem value='Wallet'>Wallet</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Payment Gateway</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Payment Gateway"
                                name='payment'
                                onChange={transactionInput}>
                                <MenuItem value='Bank'>Bank</MenuItem>
                                <MenuItem value='UPI'>UPI</MenuItem>
                                <MenuItem value='USDT'>USDT</MenuItem>
                                <MenuItem value='Cash'>Cash</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <TextField id="standard-basic" label="Transation ID" variant="standard" sx={{ width: '100%' }} name='transation_id' onChange={transactionInput} />
                    </div>
                    <br />
                    <div className='margeField'>
                        <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} name='amount' onChange={transactionInput} />
                        <label htmlFor="contained-button-file" className='fileuploadButton'>
                            <Input accept="image/*" id="contained-button-file" multiple type="file" name='img' />
                            <Button variant="contained" component="span">
                                <i className="material-icons">backup</i>Upload
                            </Button>
                        </label>
                    </div>
                    <br />
                    <div className='margeField'>
                        <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} name='note' onChange={transactionInput} />
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Currency Code</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Currency Code"
                                name='currency_code'
                                onChange={transactionInput}>
                                <MenuItem value='USD'>USD</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>;
            } else if (transactionForm.type == 'WITHDRAWAL') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type"
                                value={transactionForm.type}
                                name='type'
                                onChange={transactionInput}>
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <FormControl variant="standard" sx={{ width: '100%' }} focused>
                            <InputLabel id="demo-simple-select-standard-label">From Account Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account Type"
                                name='from_account_type'
                                onChange={transactionInput}>
                                <MenuItem value='live'>Live Accounts</MenuItem>
                                <MenuItem value='ib'>IB Account</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">From Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account"
                                name='account'
                                onChange={transactionInput}>
                                <MenuItem value='1'>1212</MenuItem>
                            </Select>
                        </FormControl> */}
                    </div>
                    <br />
                    <div className='margeField'>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Payment Gateway</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Payment Gateway"
                                name='payment'
                                onChange={transactionInput}>
                                <MenuItem value='BANK'>BANK</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} name='amount' onChange={transactionInput} />
                    </div>
                    <br />
                    <div className='margeField'>
                        <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} name='note' onChange={transactionInput} />
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Currency Code</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Currency Code"
                                name='currency_code'
                                onChange={transactionInput}>
                                <MenuItem value='USD'>USD</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>;
            } else if (transactionForm.type == 'INTERNAL_TRANSFER') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type"
                                value={transactionForm.type}
                                name='type'
                                onChange={transactionInput}>
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <FormControl variant="standard" sx={{ width: '100%' }} focused>
                            <InputLabel id="demo-simple-select-standard-label">From Account Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account Type"
                                name='from_account_type'
                                onChange={transactionInput}>
                                <MenuItem value='live'>Live Accounts</MenuItem>
                                <MenuItem value='ib'>IB Account</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transfer To</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Transfer To"
                                name='transfer_to'
                                onChange={transactionInput}>
                                <MenuItem value='own'>Own Account</MenuItem>
                                <MenuItem value='clients'>Client's Account</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">From Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account"
                                name='account'
                                onChange={transactionInput}>
                                <MenuItem value='Wallet'>Wallet</MenuItem>
                                <MenuItem value='MT5'>MT5</MenuItem>
                            </Select>
                        </FormControl>
                        {(transactionForm.account == 'MT5') ? <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">To Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="To Account"
                                name='account_to'
                                onChange={transactionInput}>
                                <MenuItem value='Wallet'>Wallet</MenuItem>
                            </Select>
                        </FormControl> : <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">To Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="To Account"
                                name='account_to'
                                onChange={transactionInput}>
                                <MenuItem value='Wallet'>Wallet</MenuItem>
                                <MenuItem value='MT5'>MT5</MenuItem>
                            </Select>
                        </FormControl>}

                    </div>
                    <br />
                    {(transactionForm.account_to == 'MT5') ? <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">MT5 Account ID</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="MT5 Account ID"
                                name='type'
                                onChange={transactionInput}>
                                <MenuItem value=''></MenuItem>
                            </Select>
                        </FormControl>
                    </div> : (transactionForm.account_to != '') ? (transactionForm.account == 'MT5' && transactionForm.account_to == 'Wallet') ? <div><TextField id="standard-basic" label="Wallet Code" variant="standard" sx={{ width: '100%' }} name='wallet_code' onChange={transactionInput} value='120454' disabled focused/></div> : <div><TextField id="standard-basic" label="Wallet Code" variant="standard" sx={{ width: '100%' }} name='wallet_code' onChange={transactionInput}/></div>  : ''}
                    <div className='margeField'>
                        <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} name='amount' onChange={transactionInput} />
                        <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} name='note' onChange={transactionInput} />
                    </div>
                </div>;
            } else if (transactionForm.type == 'CREDIT') {
                return <div>
                    <div>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Transaction Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Transaction Type"
                                value={transactionForm.type}
                                name='type'
                                onChange={transactionInput}>
                                <MenuItem value='DEPOSIT'>Deposit</MenuItem>
                                <MenuItem value='WITHDRAWAL'>Withdraw</MenuItem>
                                <MenuItem value='INTERNAL_TRANSFER'>Internal Transfer</MenuItem>
                                <MenuItem value='CREDIT'>Credit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <FormControl variant="standard" sx={{ width: '100%' }} focused>
                            <InputLabel id="demo-simple-select-standard-label">Credit Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="Credit Type"
                                name='credit_type'
                                onChange={transactionInput}>
                                <MenuItem value='CREDIT_IN'>Credit In</MenuItem>
                                <MenuItem value='CREDIT_OUT'>Credit Out</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-standard-label">Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                label="From Account"
                                name='account'
                                onChange={transactionInput}>
                                <MenuItem value='1'>121212</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div className='margeField'>
                        <TextField id="standard-basic" label="Amount" variant="standard" sx={{ width: '100%' }} name='amount' onChange={transactionInput} />
                        <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} name='note' onChange={transactionInput} />
                    </div>
                    <br />
                </div>;
            }
        } else if (dialogTitle == 'Link to Campaign') {
            return <div>
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Live Account</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Live Account"
                            name='account'
                            onChange={campaignInput}>
                            <MenuItem value='1'>12122</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                        <InputLabel id="demo-simple-select-standard-label">Campaign</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            label="Campaign"
                            name='campaign'
                            onChange={campaignInput}>
                            <MenuItem value='2'>525252</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>;
        } else if (dialogTitle == 'EDIT SHARED STRUCTURE') {
            return <div>
                <div className='structureInputSection'>
                    <Grid container>
                        <Grid item md={4} lg={4} xl={4} className='label-center'>
                            <div className='structureNameSection'>
                                <label>Structure Name</label>
                                <input type='text' className='' placeholder='Structure Name' name='name' onChange={inputEditSteuctureIB} />
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
                                    <input type='text' className='' placeholder='Rebate' name='total_rebate' onChange={inputEditSteuctureIB} />
                                </Grid>
                                <Grid item md={3} lg={3} xl={3}>
                                    <input type='text' className='' placeholder='Commission' name='total_commission' onChange={inputEditSteuctureIB} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <hr className='solid' />
                <div className='structureInputSection'>
                    {editSharedStructureForm.list.map((rowData, i) => <Grid container spacing={1}>
                        <Grid item md={4} lg={4} xl={4}>
                            <label>IB</label>
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <input type='text' className='' style={{ width: '70%' }} value={rowData.value} onChange={(e) => inputEditSteuctureIB(e, i)} />
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <Button variant="contained" className='btn-gradient'>Proceed</Button>
                            <IconButton aria-label="delete" className='btn-danger' onClick={(e) => deleteEditStructureIB(e, i)}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>)}
                    {/* <Grid container spacing={1}>
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
                    </Grid> */}
                </div>
                <hr className='solid' />
                <div className='contentActionButton'>
                    <Button variant="contained" className='btn-gradient' onClick={editSharedStructurAddNewIB}>Add another IB</Button>
                    <Button variant="contained" onClick={editSharedStructureIBSave}>Update For New Clients Only</Button>
                </div>
            </div>;
        } else if (dialogTitle == 'Change Password') {
            return <div>
                <div className='margeField'>
                    <TextField id="standard-basic" label="Main Password" variant="standard" sx={{ width: '100%' }} name='main_password' onChange={input5} />
                </div>
                <br />
                <div className='margeField'>
                    <TextField id="standard-basic" label="View Password" variant="standard" sx={{ width: '100%' }} name='view_password' onChange={input5} />
                </div>
            </div>;
        }
    }

    const manageDialogActionButton = () => {
        if (dialogTitle == 'Create MT5 Account') {
            return <div>
                <Button variant="contained" className='btn-success' onClick={createMt5AccountSubmit}>Create</Button>
            </div>;
        } else if (dialogTitle == 'MT5 Access') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={Mt5AccountAccessSubmit}>Update</Button>
            </div>;
        } else if (dialogTitle == "Link Existing Account") {
            return <div>
                <Button variant="contained" className='btn-success' onClick={linkAccountSubmit}>Link</Button>
            </div>;
        } else if (dialogTitle == 'Reset MT5 Password') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-danger font-color-white' onClick={resetAccountPasswordSubmit}>Reset</Button>
            </div>;
        } else if (dialogTitle == 'Change Account leverage') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={changeLeverageSubmit}>Change</Button>
            </div>;
        } else if (dialogTitle == 'Control Panel Access') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={cpAccessSubmit}>Update</Button>
            </div>;
        } else if (dialogTitle == 'Add Account') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={bankAccountSubmit}>Add Account</Button>
            </div>;
        } else if (dialogTitle == 'Add New Note') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={noteSubmit}>Add Note</Button>
            </div>;
        } else if (dialogTitle == 'Add New Transaction') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                {(transactionForm.isLoader == true) ? <Button variant="contained" className='btn-gradient btn-success' disabled><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i></Button> : <Button variant="contained" className='btn-gradient btn-success' onClick={transactionSubmit}>Add Transaction</Button>}

            </div>;
        } else if (dialogTitle == 'Link To IB') {
            return <div>
                <Button variant="contained" className='btn-success' onClick={linkIBFormSubmit}>Next</Button>
            </div>;
        } else if (dialogTitle == 'Link Client') {
            return <div>
                <Button variant="contained" className='btn-success' onClick={linkClientSubmit}>Save</Button>
            </div>;
        } else if (dialogTitle == 'Add Master Structure') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={masterStructureSubmit}>Add Structure</Button>
            </div>;
        } else if (dialogTitle == 'ADD SHARED STRUCTURE') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={sharedStructureSubmit}>Add</Button>
            </div>;
        } else if (dialogTitle == 'Send Email') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='btn-gradient btn-success' onClick={sendMailSubmit}>Send</Button>
            </div>;
        } else if (dialogTitle == 'Link to Campaign') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={linkCampaignSubmit}>Link</Button>
            </div>;
        } else if (dialogTitle == 'EDIT SHARED STRUCTURE') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
            </div>;
        } else if (dialogTitle == 'Change Password') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success' onClick={changeAccountPasswordSubmit}>Submit</Button>
            </div>;
        }
    }

    const input = (event) => {
        const { name, value } = event.target;
        setCreateMt5Form((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const createMt5AccountSubmit = () => {
        console.log(createMt5Form);
        if (createMt5Form.account_type == '') {
            toast.error('Please select account type');
        } else if (createMt5Form.account_option == '') {
            toast.error('Please select account option');
        } else {
            toast.success('Mt5 account has been created successfully.');
            setOpen(false);
        }
    };

    const input1 = (event) => {
        const { name, value } = event.target;
        setMt5AccessForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const Mt5AccountAccessSubmit = () => {
        console.log(Mt5AccessForm);
        if (Mt5AccessForm.account_type == '') {
            toast.error('Please select account type');
        } else if (Mt5AccessForm.status == '') {
            toast.error('Please select status');
        } else {
            toast.success('Mt5 account status has been updated successfully.');
            setOpen(false);
        }
    };

    const input2 = (event) => {
        const { name, value } = event.target;
        setLinkAccountForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const linkAccountSubmit = () => {
        console.log(linkAccountForm);
        if (linkAccountForm.account_number == '') {
            toast.error('Please enter account number');
        } else if (linkAccountForm.account_type == '') {
            toast.error('Please select account type');
        } else if (linkAccountForm.account_name == '') {
            toast.error('Please select account name');
        } else {
            toast.success('Mt5 account has been successfully linked.');
            setOpen(false);
        }
    };

    const input3 = (event) => {
        const { name, value } = event.target;
        setResetMt5PasswordForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const resetAccountPasswordSubmit = () => {
        console.log(linkAccountForm);
        if (resetMt5PasswordForm.account == '') {
            toast.error('Please select account');
        } else {
            toast.success('Mt5 account password has been successfully reset.');
            setOpen(false);
        }
    };

    const input4 = (event) => {
        const { name, value } = event.target;
        setChangeLeverageForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const changeLeverageSubmit = () => {
        console.log(changeLeverageForm);
        if (changeLeverageForm.account == '') {
            toast.error('Please select account');
        } else if (changeLeverageForm.leverage == '') {
            toast.error('Please select leverage');
        } else {
            toast.success('Leverage has been successfully changed.');
            setOpen(false);
        }
    };

    const input5 = (event) => {
        const { name, value } = event.target;
        setChangeAccountPasswordForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const changeAccountPasswordSubmit = () => {
        console.log(changeAccountPasswordForm);
        if (changeAccountPasswordForm.main_password == '') {
            toast.error('Please enter main password');
        } else if (changeAccountPasswordForm.view_password == '') {
            toast.error('Please enter view password');
        } else {
            toast.success('Account password has been successfully changed.');
            setOpen(false);
        }
    };

    const input6 = (event) => {
        const { name, value } = event.target;
        setmasterStructureForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const masterStructureSubmit = () => {
        console.log(masterStructureForm);
        if (masterStructureForm.name == '') {
            toast.error('Please enter name');
        } else if (masterStructureForm.forex_rebate == '') {
            toast.error('Please enter forex rebate');
        } else if (masterStructureForm.forex_commission == '') {
            toast.error('Please enter forex commission');
        } else if (masterStructureForm.bullion_rebate == '') {
            toast.error('Please enter bullion rebate');
        } else if (masterStructureForm.bullion_commission == '') {
            toast.error('Please enter bullion commission');
        } else if (masterStructureForm.indices_rebate == '') {
            toast.error('Please enter indices rebate');
        } else if (masterStructureForm.indices_commission == '') {
            toast.error('Please enter indices commission');
        } else if (masterStructureForm.energy_rebate == '') {
            toast.error('Please enter energy rebate');
        } else if (masterStructureForm.energy_commission == '') {
            toast.error('Please enter energy commission');
        } else if (masterStructureForm.crypto_rebate == '') {
            toast.error('Please enter crypto rebate');
        } else if (masterStructureForm.crypto_commission == '') {
            toast.error('Please enter crypto commission');
        } else {
            toast.success('Master Structure has been created.');
            setOpen(false);
        }
    };

    const profileInput = (event) => {
        const { name, value } = event.target;
        setProfileForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const profileSubmit = () => {
        console.log(profileForm);
        if (profileForm.title == '') {
            toast.error('Please select title');
        } else if (profileForm.first_name == '') {
            toast.error('Please enter first name');
        } else if (profileForm.last_name == '') {
            toast.error('Please enter last name');
        } else if (profileForm.phone == '') {
            toast.error('Please enter phone number');
        } else if (profileForm.mobile == '') {
            toast.error('Please enter mobile number');
        } else if (profileForm.email == '') {
            toast.error('Please enter email address');
        } else if (profileForm.dob == '') {
            toast.error('Please select date of birth');
        } else if (profileForm.nationality == '') {
            toast.error('Please select nationality');
        } else if (profileForm.country_of_residence == '') {
            toast.error('Please select country of residence');
        } else if (profileForm.city == '') {
            toast.error('Please enter city');
        } else if (profileForm.address == '') {
            toast.error('Please enter address');
        } else if (profileForm.gender == '') {
            toast.error('Please select gender');
        } else if (profileForm.postal_code == '') {
            toast.error('Please enter postal code');
        } else if (profileForm.language == '') {
            toast.error('Please select language');
        } else if (profileForm.source == '') {
            toast.error('Please enter source');
        } else if (profileForm.us_citizen == '') {
            toast.error('Please select us citizen');
        } else if (profileForm.finacial_work == '') {
            toast.error('Please select worked in financial');
        } else if (profileForm.tax_number == '') {
            toast.error('Please enter tax identification number');
        } else if (profileForm.politically_exposed == '') {
            toast.error('Please select politically exposed');
        } else if (profileForm.id_type == '') {
            toast.error('Please select id type');
        } else if (profileForm.id_number == '') {
            toast.error('Please enter id number');
        } else if (profileForm.country_issuce == '') {
            toast.error('Please enter country issuce');
        } else if (profileForm.date_issue == '') {
            toast.error('Please select issue date');
        } else if (profileForm.date_expiry == '') {
            toast.error('Please select expiry date');
        } else {
            toast.success('Client profile has been updated');
        }
    }

    const employementInput = (event) => {
        const { name, value } = event.target;
        setEmploymentDetailsForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const employmentDetailsSubmit = () => {
        console.log(employmentDetailsForm);

        if (employmentDetailsForm.status == '') {
            toast.error('Please select employment status');
        } else if (employmentDetailsForm.industry == '') {
            toast.error('Please select employment industry');
        } else {
            toast.success('Employment details information has been updated successfully.');
        }
    }

    const sharedStructureSubmit = () => {
        if (sharedStructureForm.name == '') {
            toast.error('Please enter structure name');
        } else if (sharedStructureForm.total_rebate == '') {
            toast.error('Please enter total rebate');
        } else if (sharedStructureForm.total_commission == '') {
            toast.error('Please enter total commission');
        } else if (sharedStructureForm.list.length > 0) {
            var emptyIb = false;
            sharedStructureForm.list.map((rowData, i) => {
                if (rowData.value == '') {
                    emptyIb = true;
                    toast.error('Please enter IB');
                }
            });

            if (!emptyIb) {
                toast.success("Shared Structure has been added successfully");
                setOpen(false);
            }
        } else {
            toast.success("Shared Structure has been added successfully");
            setOpen(false);
        }
    }

    const sharedStructurAddNewIB = () => {
        sharedStructureForm.list.push({
            'id': '',
            'name': '',
            'value': ''
        });
        setSharedStructureForm({ ...sharedStructureForm });
    }

    const editSharedStructurAddNewIB = () => {
        editSharedStructureForm.list.push({
            'id': '',
            'name': '',
            'value': ''
        });
        setEditSharedStructureForm({ ...editSharedStructureForm });
    }

    const editSharedStructureIBSave = () => {
        if (editSharedStructureForm.list.length > 0) {
            var emptyIb = false;
            editSharedStructureForm.list.map((rowData, i) => {
                if (rowData.value == '') {
                    emptyIb = true;
                    toast.error('Please enter IB');
                }
            });

            if (!emptyIb) {
                toast.success("Edit Shared Structure has been added successfully");
                setOpen(false);
            }
        } else {
            toast.success("Edit Shared Structure has been added successfully");
            setOpen(false);
        }
    }

    const deleteEditStructureIB = (e, index) => {
        console.log(index);
        editSharedStructureForm.list.splice(index, 1);
        setEditSharedStructureForm({ ...editSharedStructureForm });
    }

    const inputEditSteuctureIB = (e, index) => {
        const { name, value } = e.target;
        editSharedStructureForm.list[index].value = value;
        setEditSharedStructureForm({ ...editSharedStructureForm });
    }

    const deleteStructureIB = (e, index) => {
        console.log(index);
        sharedStructureForm.list.splice(index, 1);
        setSharedStructureForm({ ...sharedStructureForm });
    }

    const inputSteuctureIB = (e, index) => {
        const { name, value } = e.target;
        sharedStructureForm.list[index].value = value;
        setSharedStructureForm({ ...sharedStructureForm });
    }

    const sharedStructurIBInput = (event) => {
        const { name, value } = event.target;
        setSharedStructureForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const linkClientInput = (event) => {
        const { name, value } = event.target;
        setLinkClientForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const linkClientSubmit = () => {
        console.timeLog(linkClientForm);
        if (linkClientForm.client == '') {
            toast.error('Please select client');
        } else if (linkClientForm.structure == '') {
            toast.error('Please select structure');
        } else {
            toast.success('Client has been linked to structure');
            setOpen(false);
        }
    }

    const linkIBInput = (event) => {
        const { name, value } = event.target;
        setLinkIBForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const linkIBFormSubmit = () => {
        console.log(linkIBForm);
        if (linkIBForm.master_account == '') {
            toast.error('Please enter master account id');
        } else if (linkIBForm.customer_name == '') {
            toast.error('Please enter customer name');
        } else if (linkIBForm.structure == '') {
            toast.error('Please select structure');
        } else {
            toast.success('IB has been linked to account number');
            setOpen(false);
        }
    }

    const sendMailInput = (event) => {
        const { name, value } = event.target;
        setsendMailForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const sendMailSubmit = () => {
        console.log(sendMailForm);
        if (sendMailForm.from == '') {
            toast.error('Please select from e-mail address');
        } else if (sendMailForm.to == '') {
            toast.error('Please enter to e-mail address');
        } else if (sendMailForm.subject == '') {
            toast.error('Please enter subject');
        } else if (sendMailForm.template_title == '') {
            toast.error('Please enter template title');
        } else if (sendMailForm.language == '') {
            toast.error('Please select language');
        } else if (sendMailForm.template == '') {
            toast.error('Please enter template');
        } else if (sendMailForm.body == '') {
            toast.error('Please enter body');
        } else {
            toast.success('Mail has been sent successfully.');
            setOpen(false);
        }
    }

    const onContentStateChange = (event) => {
        sendMailForm.body = draftToHtml(event);
        setsendMailForm({ ...sendMailForm });
    }

    const input7 = (event) => {
        const { name, value } = event.target;
        setCpAccessForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const cpAccessSubmit = () => {
        console.log(cpAccessForm);
        if (cpAccessForm.status == '') {
            toast.error('Please select control panel access');
        } else {
            toast.success('control panel access has been successfully updated');
            setOpen(false);
        }
    }

    const input8 = (event) => {
        var { name, value } = event.target;
        if (event.target.getAttribute) {
            if (event.target.getAttribute('type') == 'checkbox') {
                value = event.target.checked;
            }
        }

        setNoteForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const noteSubmit = () => {
        console.log(noteForm);

        if (noteForm.notes == '') {
            toast.error('Please enter note');
        } else if (noteForm.call_status == '') {
            toast.error('Please select call status');
        } else if (noteForm.set_reminder == true && noteForm.date == '') {
            toast.error('Please select date');
        } else {
            toast.success("Note has been successfully added.");
            setOpen(false);
        }
    }

    const bankInput = (event) => {
        const { name, value } = event.target;
        setBankAccountForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const bankAccountSubmit = () => {
        console.log(bankAccountForm);

        if (bankAccountForm.name == '') {
            toast.error('Please enter beneficiary name');
        } else if (bankAccountForm.bank_name == '') {
            toast.error('Please enter beneficiary bank name');
        } else if (bankAccountForm.bank_address == '') {
            toast.error('Please enter beneficiary bank address');
        } else if (bankAccountForm.iban_number == '') {
            toast.error('Please enter IBAN Number');
        } else if (bankAccountForm.account_number == '') {
            toast.error('Please enter account number');
        } else if (bankAccountForm.swift_code == '') {
            toast.error('Please enter SWIFT Code');
        } else if (bankAccountForm.currency_code == '') {
            toast.error('Please enter currency code');
        } else {
            toast.success('Bank account has been successfully created.');
            setOpen(false);
        }
    }

    const transactionInput = (event) => {
        const { name, value } = event.target;
        if (name == 'type') {
            setTransactionForm({
                type: '',
                from_account_type: '',
                credit_type: '',
                transfer_to: '',
                account: '',
                account_to: '',
                payment: '',
                amount: '',
                img: '',
                note: '',
                currency_code: '',
                isLoader: false,
                deposit_to: '',
                transation_id: ''
            });
        }
        setTransactionForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const transactionSubmit = async () => {
        console.log(transactionForm);

        if (transactionForm.type == '') {
            toast.error('Please select transaction type');
        } else if (transactionForm.type == 'DEPOSIT') {
            if (transactionForm.deposit_to == '') {
                toast.error('Please select deposit to');
            } else if (transactionForm.payment == '') {
                toast.error('Please select payment gateway');
            } else if (transactionForm.transation_id == '') {
                toast.error('Please enter transation id');
            } else if (transactionForm.amount == '') {
                toast.error('Please enter amount');
            } else if (transactionForm.note == '') {
                toast.error('Please enter note');
            } else if (transactionForm.currency_code == '') {
                toast.error('Please select currency code');
            } else {
                transactionForm.isLoader = true;
                setTransactionForm({ ...transactionForm });
                const param = new FormData();
                param.append('action', 'add_deposit');
                param.append('is_react', '1');
                param.append('user_id', id);
                param.append('deposit_to', transactionForm.deposit_to);
                param.append('payment_method', transactionForm.payment);
                param.append('transactionid', transactionForm.transation_id);
                param.append('amount', transactionForm.amount);
                param.append('currency', transactionForm.currency_code);
                param.append('note', transactionForm.note);
                await axios.post(`https://alphapixclients.com/forex/admin/ajaxfiles/user_manage.php`, param).then((res) => {
                    transactionForm.isLoader = false;
                    setTransactionForm({ ...transactionForm });
                    if (res.data.status == 'error') {
                        toast.error(res.data.message);
                    } else {
                        toast.success(res.data.message);
                        setOpen(false);
                    }
                });
                /* toast.success('Deposit has been successfully added.');
                setOpen(false); */
            }
        } else if (transactionForm.type == 'WITHDRAWAL') {
            if (transactionForm.from_account_type == '') {
                toast.error('Please select from account type');
            } else if (transactionForm.payment == '') {
                toast.error('Please select payment gateway');
            } else if (transactionForm.amount == '') {
                toast.error('Please enter amount');
            } else if (transactionForm.note == '') {
                toast.error('Please enter note');
            } else if (transactionForm.currency_code == '') {
                toast.error('Please select currency code');
            } else {
                transactionForm.isLoader = true;
                setTransactionForm({ ...transactionForm });
                const param = new FormData();
                param.append('action', 'add_withdraw');
                param.append('is_react', '1');
                param.append('user_id', id);
                param.append('account_type', transactionForm.from_account_type);
                param.append('payment_method', transactionForm.payment);
                param.append('amount', transactionForm.amount);
                param.append('currency', transactionForm.currency_code);
                param.append('note', transactionForm.note);
                await axios.post(`https://alphapixclients.com/forex/admin/ajaxfiles/user_manage.php`, param).then((res) => {
                    // setLoader(false);
                    transactionForm.isLoader = false;
                    setTransactionForm({ ...transactionForm });
                    if (res.data.status == 'error') {
                        toast.error(res.data.message);
                    } else {
                        toast.success(res.data.message);
                        setOpen(false);
                    }
                });
            }
        } else if (transactionForm.type == 'INTERNAL_TRANSFER') {
            if (transactionForm.from_account_type == '') {
                toast.error('Please select from account type');
            } else if (transactionForm.transfer_to == '') {
                toast.error('Please select transfer to');
            } else if (transactionForm.account == '') {
                toast.error('Please select from account');
            } else if (transactionForm.account_to == '') {
                toast.error('Please select to account');
            } else if (transactionForm.amount == '') {
                toast.error('Please enter amount');
            } else if (transactionForm.note == '') {
                toast.error('Please enter note');
            } else {
                toast.success('Internal transfer has been successfully added.');
                setOpen(false);
            }
        } else if (transactionForm.type == 'CREDIT') {
            if (transactionForm.credit_type == '') {
                toast.error('Please select credit type');
            } else if (transactionForm.account == '') {
                toast.error('Please select account');
            } else if (transactionForm.amount == '') {
                toast.error('Please enter amount');
            } else if (transactionForm.note == '') {
                toast.error('Please enter note');
            } else {
                toast.success('Credit has been successfully added.');
                setOpen(false);
            }
        }
    }

    const campaignInput = (event) => {
        const { name, value } = event.target;
        setLinkCampaignForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    }

    const linkCampaignSubmit = () => {
        console.log(linkCampaignForm);

        if (linkCampaignForm.account == '') {
            toast.error("Please select account");
        } else if (linkCampaignForm.campaign == '') {
            toast.error("Please select campaign");
        } else {
            toast.success("Campaign has been successfully linked.");
            setOpen(false);
        }
    }

    const input9 = (event) => {
        var { name, value } = event.target;

        setDeleteStructureForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const deleteStructureSubmit = () => {
        if (deleteStructureForm.structure == "") {
            toast.error('Please select structure');
        } else {
            toast.success('Structure has been successfully deleted');
            setDeleteStructureForm({
                structure: ''
            });
        }
    }

    useEffect(() => {
        console.log('call get user details api');
    }, []);

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
                                                                    onChange={profileInput}
                                                                    label="Title"
                                                                    name='title'
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
                                                            <TextField id="standard-basic" label="First Name" variant="standard" focused name='first_name' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Last Name" variant="standard" focused name='last_name' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Phone" variant="standard" focused name='phone' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Mobile" variant="standard" focused name='mobile' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Email" variant="standard" focused name='email' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField type='date' id="standard-basic" label="Date of Birth" variant="standard" sx={{ width: '100%' }} focused name='dob' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Nationality</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    onChange={profileInput}
                                                                    label="Nationality"
                                                                    name='nationality'
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
                                                                    onChange={profileInput}
                                                                    label="Country of Residence"
                                                                    name='country_of_residence'
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
                                                            <TextField id="standard-basic" label="City" variant="standard" focused name='city' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Address" variant="standard" focused name='address' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Address Line 2" variant="standard" focused name='address_2' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Gendere</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    onChange={profileInput}
                                                                    label="Gender"
                                                                    name='gender'
                                                                >
                                                                    <MenuItem value='male'>Male</MenuItem>
                                                                    <MenuItem value='female'>Female</MenuItem>
                                                                    <MenuItem value='other'>Other</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Postal Code" variant="standard" focused name='postal_code' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    onChange={profileInput}
                                                                    label="Language"
                                                                    name='language'
                                                                >
                                                                    <MenuItem value='en-gb'>English</MenuItem>
                                                                    <MenuItem value='ar-ae'>عربي</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Source" variant="standard" focused name='source' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">US citizen ?</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    onChange={profileInput}
                                                                    label="US citizen ?"
                                                                    name='us_citizen'
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
                                                                    onChange={profileInput}
                                                                    label="Worked in Financial?"
                                                                    name='finacial_work'
                                                                >
                                                                    <MenuItem value='yes'>Yes</MenuItem>
                                                                    <MenuItem value='no'>No</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Tax Identification Number" variant="standard" focused name='tax_number' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <FormControl variant="standard" sx={{ width: '100%' }} focused>
                                                                <InputLabel id="demo-simple-select-standard-label">Politically exposed ?</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-standard-label"
                                                                    id="demo-simple-select-standard"
                                                                    // value={age}
                                                                    onChange={profileInput}
                                                                    label="Politically exposed ?"
                                                                    name='politically_exposed'
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
                                                                    onChange={profileInput}
                                                                    label="ID Type"
                                                                    name='id_type'
                                                                >
                                                                    <MenuItem value='PASSPORT'>Passport</MenuItem>
                                                                    <MenuItem value='ID'>ID</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="ID Number" variant="standard" focused name='id_number' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField id="standard-basic" label="Country of Issue" variant="standard" focused name='country_issuce' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField type='date' id="standard-basic" label="Date of Issue" variant="standard" sx={{ width: '100%' }} focused name='date_issue' onChange={profileInput} />
                                                        </div>
                                                        <div className='element'>
                                                            <TextField type='date' id="standard-basic" label="Date of Expiry" variant="standard" sx={{ width: '100%' }} focused name='date_expiry' onChange={profileInput} />
                                                        </div>
                                                    </div>
                                                    <div className='btnActionSection'>
                                                        <Button variant="contained" className='btn-success' onClick={profileSubmit}>Update Profile</Button>
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
                                                            <Button variant="contained" className='change_password' onClick={openDialogbox}>Change Password</Button>
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
                                                                            onChange={employementInput}
                                                                            label="Employment Status"
                                                                            name='status'
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
                                                                            onChange={employementInput}
                                                                            label="Inudstry"
                                                                            name='industry'
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
                                                                    <Button variant="contained" className='btn-success' onClick={employmentDetailsSubmit}>Update Information</Button>
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
                                                                    label="Structure"
                                                                    name='structure'
                                                                    onChange={input9}>
                                                                    <MenuItem value='1'>Test</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                            <Button variant="contained" className='add_master_structure btn-danger' onClick={deleteStructureSubmit}>Structure Delete</Button>
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