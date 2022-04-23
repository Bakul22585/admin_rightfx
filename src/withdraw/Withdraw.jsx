import './withdraw.css';
import React, { useState, useEffect } from "react";
import { FormControl, Grid, Input, InputLabel, Menu, MenuItem, Select, TextField } from "@mui/material";
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

    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [dialogTitle, setDialogTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const columns = [
        {
            name: 'SR.NO',
            selector: row => {
                return <span>{row.sr_no}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'DATE',
            selector: row => { return <span title={row.date}>{row.date}</span> },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'NAME',
            selector: row => { return <span title={row.name}>{row.name}</span> },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'ACCOUNT NO',
            selector: row => { return <span title={row.wallet_code}>{row.wallet_code}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'PAYMENT METHOD',
            selector: row => { return <span title={row.method}>{row.method}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'AMOUNT',
            selector: row => { return <span title={row.amount}>{row.amount}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'REMARKS',
            selector: row => { return <span title={row.remarks}>{row.remarks}</span> },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'STATUS',
            selector: row => { return <span className={(row.status == "1") ? "status-text-approved" : (row.status == "2") ? "status-text-rejected" : "status-text-pending"} title={(row.status == "1") ? "Approved" : (row.status == "2") ? "Rejected" : "Pending"}>{(row.status == "1") ? "Approved" : (row.status == "2") ? "Rejected" : "Pending"}</span> },
            sortable: true,
            reorder: true,
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
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event,row.sr_no)}><i className="material-icons font-color-approved">task_alt</i>&nbsp;&nbsp;Approved</MenuItem>
                                <MenuItem className='reject' {...row} onClick={(event) => actionMenuPopup(event,row.sr_no)}><i className="material-icons font-color-rejected">cancel</i>&nbsp;&nbsp;Rejected</MenuItem></div>}

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
                <Button variant="contained" className='btn-gradient btn-success'>Add</Button>
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
                            label="Account">
                            <MenuItem value=''></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div>
                    <TextField id="standard-basic" label="Account" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br/>
                <div>
                    <TextField id="standard-basic" label="Customer Name" variant="standard" sx={{ width: '100%' }} />
                </div>
                <br/>
                
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
                    {/* <label htmlFor="contained-button-file" className='fileuploadButton'>
                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={onSelectFile}/>
                        {selectedFile ?  <img src={preview} className='deposit-upload-image-preview'/>  : <Button variant="contained" component="span">
                            <i className="material-icons">backup</i>&nbsp;Upload
                        </Button>}
                    </label> */}
                </div>
                <br />
                <div>
                    <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} />
                </div>
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
        setSelectedFile(undefined)
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

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Withdrawal</p>
                                <CommonFilter />
                                <br/>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>New</Button>
                                    </div>
                                    <br />
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url='https://alphapixclients.com/forex/admin/datatable/withdraw_list.php' column={columns} sort='1' />
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
                                {/* <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                    <div className="card-header font-weight-bold text-dark border-bottom py-2">
                                        Filter Criteria
                                    </div>
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={6} md={3}>
                                                <FormControl fullWidth={true}>
                                                    <label className="small font-weight-bold text-dark">
                                                        Transaction Type
                                                    </label>
                                                    <Select
                                                        value={age}
                                                        onChange={handleChange}
                                                        displayEmpty
                                                        inputProps={{ "aria-label": "Without label" }}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="All">All</MenuItem>

                                                        <MenuItem value="deposit">Deposit</MenuItem>
                                                        <MenuItem value="withdrawal">Withdrawal</MenuItem>
                                                        <MenuItem value="internal_transfer">
                                                            Internal Transfer
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item sm={6} md={3}>
                                                <FormControl fullWidth={true}>
                                                    <label className="small font-weight-bold text-dark">
                                                        Trading Account
                                                    </label>
                                                    <Select
                                                        value={age}
                                                        onChange={handleChange}
                                                        displayEmpty
                                                        inputProps={{ "aria-label": "Without label" }}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="All">All</MenuItem>
                                                        <MenuItem value="deposit">19861</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item sm={6} md={3}>
                                                <FormControl fullWidth={true}>
                                                    <label className="small font-weight-bold text-dark">
                                                        Date From
                                                    </label>
                                                    <BootstrapInput type="date"></BootstrapInput>
                                                </FormControl>
                                            </Grid>
                                            <Grid item sm={6} md={3}>
                                                <FormControl fullWidth={true}>
                                                    <label className="small font-weight-bold text-dark">
                                                        Date To
                                                    </label>
                                                    <BootstrapInput type="date" ></BootstrapInput>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12}>
                                                <div className="filter-submit">
                                                    <ColorButton className=" d-block ml-auto mb-3 mr-3 ">
                                                        Sumbit
                                                    </ColorButton>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Paper> */}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Withdraw