import './history_kyc.css';
import React, { useEffect, useState } from "react";
import { Button, CardContent, Checkbox, FormControl, FormControlLabel, Grid, Input, InputLabel, Menu, MenuItem, Paper, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from '../global';
import CustomImageModal from '../common/CustomImageModal';

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

const HistoryKYC = () => {

    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [dialogTitle, setDialogTitle] = useState('');
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedAadharCardFrontFile, setSelectedAadharCardFrontFile] = useState()
    const [previewAadharCardFront, setPreviewAadharCardFront] = useState();
    const [selectedAadharCardBackFile, setSelectedAadharCardBackFile] = useState()
    const [previewAadharCardBack, setPreviewAadharCardBack] = useState();
    const [selectedPanCardFile, setSelectedPanCardFile] = useState()
    const [previewPancard, setPreviewPancard] = useState();
    const [selectedPassbookFile, setSelectedPassbookFile] = useState()
    const [previewPassbook, setPreviewPassbook] = useState();
    const [form, setForm] = useState({
        name: '',
        email: '',
        aadhar_card_number: '',
        aadhar_front_img: '',
        aadhar_back_img: '',
        pan_card_img: '',
        passbook_img: '',
        account_number: '',
        bank_name: '',
        bank_holder_name: '',
        bank_ifsc_code: '',
        remark: '',
        status: '',
        first_name: '',
        last_name: '',
        isLoader: false,
    });
    toast.configure();

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
        {
            name: 'STATUS',
            selector: row => { return <span className={`status-${(row.status == '1') ? 'active' : 'in-active'}`}>{(row.status == '1') ? 'Active' : 'In-Active'}</span> },
            sortable: true,
            reorder: true,
            grow: 0.3,
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

    const editkycDetails = async (e, data, status) => {
        const param = new FormData();
        if (status == 'View KYC Details') {
            param.append('action', 'view_kyc');
        } else if (status == 'Edit KYC Details') {
            param.append('action', 'view_kyc');
        }
        param.append('is_react', '1');
        param.append('is_app', '1');
        param.append('user_id', data.user_id);
        param.append('kyc_id', data.kyc_id);
        await axios.post(`${Url}admin/ajaxfiles/kyc_manage.php`, param).then((res) => {
            if (res.data.status == 'error') {
                toast.error(res.data.message);
            } else {
                setForm((prevalue) => {
                    return {
                        ...prevalue,
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        name: res.data.first_name + ' ' + res.data.last_name,
                        email: res.data.email,
                        aadhar_card_number: res.data.aadhar_card_number,
                        aadhar_front_img: res.data.aadhar_front_img,
                        aadhar_back_img: res.data.aadhar_back_img,
                        pan_card_img: res.data.pancard_img,
                        passbook_img: res.data.passbook_img,
                        account_number: res.data.bank_account_number,
                        bank_name: res.data.bank_name,
                        bank_holder_name: res.data.bank_holder_name,
                        bank_ifsc_code: res.data.bank_ifsc_code,
                        remark: res.data.remark,
                        isLoader: false
                    };
                });
            }
        });
    }

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
        } else if (e.target.classList.contains('view')) {
            setForm({
                name: '',
                email: '',
                aadhar_card_number: '',
                aadhar_front_img: '',
                aadhar_back_img: '',
                pan_card_img: '',
                passbook_img: '',
                account_number: '',
                bank_name: '',
                bank_holder_name: '',
                bank_ifsc_code: '',
                remark: '',
                status: '',
                isLoader: true,
            });
            editkycDetails(e, data, 'View KYC Details');
            setDialogTitle('View KYC Details');
            setOpen(true);
        } else if (e.target.classList.contains('edit')) {
            setForm({
                name: '',
                email: '',
                aadhar_card_number: '',
                aadhar_front_img: '',
                aadhar_back_img: '',
                pan_card_img: '',
                passbook_img: '',
                account_number: '',
                bank_name: '',
                bank_holder_name: '',
                bank_ifsc_code: '',
                remark: '',
                status: '',
                isLoader: true,
            });
            editkycDetails(e, data, 'Edit KYC Details');
            setDialogTitle('Edit KYC Details');
            setOpen(true);
        }
    };

    const handleClickOpen = (e) => {
        setForm({
            name: '',
            email: '',
            aadhar_card_number: '',
            aadhar_front_img: '',
            aadhar_back_img: '',
            pan_card_img: '',
            passbook_img: '',
            account_number: '',
            bank_name: '',
            bank_holder_name: '',
            bank_ifsc_code: '',
            remark: '',
            status: '',
            isLoader: false,
        });
        setDialogTitle('Add MT5 Groups');
        setOpen(true);
    };

    const manageContent = () => {
        if (dialogTitle == 'View KYC Details') {
            if (form.isLoader == true) {
                return <div className='popup-loader'>
                    <div className='loader'>
                        <div className="clock">
                            <div className="pointers"></div>
                        </div>
                    </div>
                </div>
            } else {
                return <div>
                    <div className='view-margeField'>
                        <div className='element'>
                            <label>Name :</label>
                            <label>{form.name}</label>
                        </div>
                        <div className='element'>
                            <label>Email :</label>
                            <label>{form.email}</label>
                        </div>
                        <div className='element'>
                            <label>Aadhar Card Number :</label>
                            <label>{form.aadhar_card_number}</label>
                        </div>
                        <div className='element'>
                            <label>Bank Account Number :</label>
                            <label>{form.account_number}</label>
                        </div>
                        <div className='element'>
                            <label>Bank Name :</label>
                            <label>{form.bank_name}</label>
                        </div>
                        <div className='element'>
                            <label>Bank Holder Name :</label>
                            <label>{form.bank_holder_name}</label>
                        </div>
                        <div className='element'>
                            <label>Bank IFSC Code :</label>
                            <label>{form.bank_ifsc_code}</label>
                        </div>
                        <div className='element'>
                            <label>Remark :</label>
                            <label>{form.remark}</label>
                        </div>
                    </div>
                    <br />
                    <div className='view-image-section'>
                        {(form.aadhar_front_img != "") ? <div className='element'>
                            <label>Aadhar Card Front Img :</label>
                            <CustomImageModal image={`${form.aadhar_front_img}`} />
                        </div> : ''}
                        {(form.aadhar_back_img != '') ? <div className='element'>
                            <label>Aadhar Card Back Img :</label>
                            <CustomImageModal image={`${form.aadhar_back_img}`} />
                        </div> : ''}
                        {(form.pan_card_img != '') ? <div className='element'>
                            <label>Pan Card Img :</label>
                            <CustomImageModal image={`${form.pan_card_img}`} />
                        </div> : ''}
                        {(form.passbook_img != '') ? <div className='element'>
                            <label>Passbook Img :</label>
                            <CustomImageModal image={`${form.passbook_img}`} />
                        </div> : ''}
                    </div>
                    {/* <br />
                    <div className='margeField'>
                        <CustomImageModal image={`${form.aadhar_front_img}`}/>
                        <CustomImageModal image={`${form.aadhar_back_img}`}/>
                        <CustomImageModal image={`${form.pan_card_img}`}/>
                        <CustomImageModal image={`${form.passbook_img}`}/>
                    </div>
                    <br />
                    <div className='margeField'>
                        <FormControlLabel
                            control={
                                <Checkbox name="isActive" size="small" onChange={input}/>
                            }
                            label="Active"
                        />
                    </div> */}
                </div>;
            }
        } else if (dialogTitle == 'Edit KYC Details') {
            if (form.isLoader == true) {
                return <div className='popup-loader'>
                    <div className='loader'>
                        <div className="clock">
                            <div className="pointers"></div>
                        </div>
                    </div>
                </div>
            } else {
                return <div>
                    <div className='view-margeField'>
                        <div className='element'>
                            <TextField label="First Name" variant="standard" sx={{ width: '100%' }} value={form.first_name} name='account_number'/>
                        </div>
                        <div className='element'>
                            <TextField label="Last Name" variant="standard" sx={{ width: '100%' }} value={form.last_name} name='account_number'/>
                        </div>
                        <div className='element'>
                            <TextField label="Email" variant="standard" sx={{ width: '100%' }} value={form.email} name='email'/>
                        </div>
                        <div className='element'>
                            <TextField label="Aadhar Card Number" variant="standard" sx={{ width: '100%' }} value={form.aadhar_card_number} name='email'/>
                        </div>
                        <div className='element'>
                            <TextField label="Bank Account Number" variant="standard" sx={{ width: '100%' }} name='email' value={form.bank_account_number}/>
                        </div>
                        <div className='element'>
                            <TextField label="Bank Name" variant="standard" sx={{ width: '100%' }} name='email' value={form.bank_name}/>
                        </div>
                        <div className='element'>
                            <TextField label="Bank Holder Name" variant="standard" sx={{ width: '100%' }} name='email' value={form.bank_holder_name}/>
                        </div>
                        <div className='element'>
                            <TextField label="Bank IFSC Code" variant="standard" sx={{ width: '100%' }} name='email' value={form.bank_ifsc_code}/>
                        </div>
                        <div className='element'>
                            <TextField label="Remark" variant="standard" sx={{ width: '100%' }} name='email' value={form.remark}/>
                        </div>
                        <div className='element'>
                            <FormControl variant="standard" sx={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    label="Status"
                                    name='status'>
                                    <MenuItem value='0'>Pending</MenuItem>
                                    <MenuItem value='1'>Approved</MenuItem>
                                    <MenuItem value='2'>Rejected</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <br />
                    <div className='view-image-section'>
                        <div className='element'>
                            <label>Aadhar Card Front Img :</label>
                            {/* {(form.aadhar_front_img != "") ? <div className='element'>
                            <label>Aadhar Card Front Img :</label>
                                <CustomImageModal image={`${form.aadhar_front_img}`} />
                            </div> : ''} */}
                            <label htmlFor="contained-button-file" className='fileuploadButton'>
                                <Input accept="image/*" id="contained-button-file" type="file" onChange={onSelectFile} />
                                {selectedAadharCardFrontFile ? <img src={previewAadharCardFront} className='deposit-upload-image-preview' /> : <Button variant="contained" component="span">
                                    <i className="material-icons">backup</i>&nbsp;Upload
                                </Button>}
                            </label>
                        </div>
                        
                        {(form.aadhar_back_img != '') ? <div className='element'>
                            <label>Aadhar Card Back Img :</label>
                            <CustomImageModal image={`${form.aadhar_back_img}`} />
                        </div> : ''}
                        {(form.pan_card_img != '') ? <div className='element'>
                            <label>Pan Card Img :</label>
                            <CustomImageModal image={`${form.pan_card_img}`} />
                        </div> : ''}
                        {(form.passbook_img != '') ? <div className='element'>
                            <label>Passbook Img :</label>
                            <CustomImageModal image={`${form.passbook_img}`} />
                        </div> : ''}
                    </div>
                </div>;
            }
        } else if (dialogTitle == 'Edit MT5 Groups') {
            return <div>
                <div className='margeField'>
                    <TextField label="Group Name" variant="standard" sx={{ width: '100%' }} name='group_name' value={form.group_name} onChange={input} />
                </div>
                <br />
                <div className='margeField'>
                    <TextField label="MT5 Group Name" variant="standard" sx={{ width: '100%' }} name='mt5_group_name' value={form.mt5_group_name} onChange={input} />
                </div>
                <br />
                <div className='margeField'>
                    <FormControlLabel
                        control={
                            <Checkbox name="isActive" size="small" checked={form.isActive} onChange={input} />
                        }
                        label="Active"
                    />
                </div>
            </div>;
        } else if (dialogTitle == 'View') {
            return <div>
            </div>;
        } else if (dialogTitle == 'Reject') {
            return <div>
                <div className='deposit-action-popup-text'>
                    <label>Are you want to sure reject this deposit ?</label>
                </div>
            </div>;
        } else if (dialogTitle == 'Approve') {
            return <div>
                <div className='deposit-action-popup-text'>
                    <label>Are you want to sure approve this deposit ?</label>
                </div>
            </div>;
        }
    }

    const manageDialogActionButton = () => {
        if (dialogTitle == 'Add MT5 Groups' || dialogTitle == 'Edit MT5 Groups') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                {(form.isLoader == true) ? <Button variant="contained" className='btn-gradient btn-success' disabled><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i></Button> : <Button variant="contained" className='btn-gradient btn-success' onClick={formSubmit}>Add</Button>}

            </div>;
        } else if (dialogTitle == 'Edit KYC Details') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success'>Update</Button>
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
        } else if (dialogTitle == 'View KYC Details') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
            </div>;
        }
    }

    const formSubmit = async () => {
        console.log(form);
        if (form.group_name == '') {
            toast.error('Please enter group name');
        } else if (form.mt5_group_name == '') {
            toast.error('Please enter MT5 group name');
        } else {
            form.isLoader = true;
            setForm({ ...form });
            const param = new FormData();
            if (form.faqId == '') {
                param.append('action', 'add_mt5_group');
            } else {
                param.append('group_id', form.groupId);
                param.append('action', 'update_mt5_group');
            }
            param.append('is_app', '1');
            param.append('group_name', form.group_name);
            param.append('mt5_group_name', form.mt5_group_name);
            param.append('status', form.isActive ? 1 : 0);
            await axios.post(`${Url}admin/ajaxfiles/mt5_group_manage.php`, param).then((res) => {
                form.isLoader = false;
                setForm({ ...form });
                if (res.data.status == 'error') {
                    toast.error(res.data.message);
                } else {
                    setRefresh(!refresh);
                    toast.success(res.data.message);
                    setOpen(false);
                    setForm({
                        name: '',
                        email: '',
                        aadhar_card_number: '',
                        aadhar_front_img: '',
                        aadhar_back_img: '',
                        pan_card_img: '',
                        passbook_img: '',
                        account_number: '',
                        bank_name: '',
                        bank_holder_name: '',
                        bank_ifsc_code: '',
                        remark: '',
                        status: '',
                        isLoader: false,
                    });
                }
            });
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const input = (event) => {
        var { name, value } = event.target;
        if (event.target.getAttribute) {
            if (event.target.getAttribute('type') == 'checkbox') {
                value = event.target.checked;
            }
        }

        setForm((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            };
        });
    };

    const changeStatus = (status, data) => {
        console.log(status, data);
        if (status == 'approved') {
            toast.success('KYC has been successfully completed.');
        } else if (status == 'rejected') {
            toast.success('KYC has been successfully rejected.');
        }
    }

    useEffect(() => {
        if (!selectedAadharCardFrontFile) {
            setPreviewAadharCardFront(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedAadharCardFrontFile)
        setPreviewAadharCardFront(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedAadharCardFrontFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setPreviewAadharCardFront(undefined)
            return
        }
        
        setSelectedAadharCardFrontFile(e.target.files[0])
    }

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>History KYC</p>
                                <CommonFilter />
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    {/* <div className='actionGroupButton'>
                                        <Button variant="contained" className='add-group' onClick={handleClickOpen}>Add</Button>
                                    </div>
                                    <br /> */}
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url={`${Url}admin/datatable/kyc_list.php`} column={column} sort='1' refresh={refresh} />
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

export default HistoryKYC