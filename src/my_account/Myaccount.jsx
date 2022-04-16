import './myaccount.css';
import React, { useState } from 'react'
import { Button, CardContent, Grid, IconButton, Paper, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import { useTheme } from '@emotion/react';

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

const Myaccount = () => {

    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const openDialogbox = (e) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container spacing={3} className='margin-bottom-30px'>
                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                <p className='main-heading'>&nbsp;</p>
                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                    <div className='headerSection header-title'>
                                        <p className='margin-0'>My Account</p>
                                        <IconButton aria-label="delete" className='padding-0px'>
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={12} lg={12}>
                                            <div className='from-section'>
                                                <div className='input-section'>
                                                    <div className='full-section'>
                                                        <div className='element'>
                                                            <label>First Name</label>
                                                            <span>Test</span>
                                                        </div>
                                                        <div className='element'>
                                                            <label>Last Name</label>
                                                            <span>Admin</span>
                                                        </div>
                                                    </div>
                                                    <div className='full-section'>
                                                        <div className='element'>
                                                            <label>E-mail</label>
                                                            <span>testadmin@mailinator.com</span>
                                                        </div>
                                                        <div className='element'>
                                                            <label>Mobile</label>
                                                            <span></span>
                                                        </div>
                                                        <div className='element'>
                                                            <label>Phone</label>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                    <div className='full-section'>
                                                        <div className='element'>
                                                            <label>Password</label>
                                                            <span>*********</span>
                                                        </div>
                                                        <div className='element'>
                                                            <label className='margeIcon'>Change Password
                                                                <button className="copy_link" onClick={openDialogbox}>
                                                                    <span className="blinking">
                                                                        <i className="material-icons">edit</i>
                                                                    </span>
                                                                </button>
                                                            </label>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                <p className='main-heading'>&nbsp;</p>
                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                    <div className='headerSection header-title'>
                                        <p className='margin-0'>Referal Links</p>
                                    </div>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={12} lg={12}>
                                            <div className='referal-links-section'>
                                                <div className='referal-link-element'>
                                                    <p className='title'>Register Demo:</p>
                                                    <div className='content'>
                                                        <span>https://alphapixclients.com/forex/registerdemo.php?ref=541879</span>
                                                        <button className="copy_link">
                                                            <span className="blinking">
                                                                <i className="material-icons">content_copy</i>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='referal-link-element'>
                                                    <p className='title'>Register Live:</p>
                                                    <div className='content'>
                                                        <span>https://alphapixclients.com/forex/registerlive.php?ref=541879</span>
                                                        <button className="copy_link">
                                                            <span className="blinking">
                                                                <i className="material-icons">content_copy</i>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='referal-link-element'>
                                                    <p className='title'>Register IB:</p>
                                                    <div className='content'>
                                                        <span>https://alphapixclients.com/forex/registerib.php?ref=541879</span>
                                                        <button className="copy_link">
                                                            <span className="blinking">
                                                                <i className="material-icons">content_copy</i>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                <p className='main-heading'>&nbsp;</p>
                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                    <div className='headerSection header-title'>
                                        <p className='margin-0'>SMTP Settings</p>
                                    </div>
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={12} lg={12}>
                                            <div className='fromSection'>
                                                <div className='inputSection'>
                                                    <div className='element'>
                                                        <TextField label="Server" variant="outlined" sx={{ width: '100%' }} focused />
                                                    </div>
                                                    <div className='element'>
                                                        <TextField label="Port" variant="outlined" sx={{ width: '100%' }} focused />
                                                    </div>
                                                    <div className='element'>
                                                        <TextField label="Authentication Email" variant="outlined" sx={{ width: '100%' }} focused />
                                                    </div>
                                                    <div className='element'>
                                                        <TextField label="Password" variant="outlined" sx={{ width: '100%' }} focused />
                                                    </div>
                                                </div>
                                                <div className='buttonSection'>
                                                    <Button variant="contained">Add SMTP</Button>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>

                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                            className='modalWidth100'
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" className='dialogTitle' onClose={handleClose}>
                                Change Your Password
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <div className='changePasswordSection'>
                                    <div className='element'>
                                        <TextField id="standard-basic" label="Current Password" variant="standard" sx={{ width: '100%' }} focused/>
                                    </div>
                                    <br />
                                    <div className='element'>
                                        <TextField id="standard-basic" label="New Password" variant="standard" sx={{ width: '100%' }} focused/>
                                    </div>
                                    <br />
                                    <div className='element'>
                                        <TextField id="standard-basic" label="Confirm Password" variant="standard" sx={{ width: '100%' }} focused/>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <div className='dialogMultipleActionButton'>
                                    <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                                    <Button variant="contained" className='btn-gradient'>Change Password</Button>
                                </div>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Myaccount