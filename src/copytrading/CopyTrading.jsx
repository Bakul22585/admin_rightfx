import './copytrading.css';
import { Button, FormControl, Grid, Input, InputBase, InputLabel, MenuItem, Paper, Select, Slider, TextField } from '@mui/material'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from "@mui/material/styles";

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

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#52af77',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

const CopyTrading = () => {

    const [openAddCopyTradingAccountSection, setOpenAddCopyTradingAccountSection] = useState(false);
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('md');
    const [dialogTitle, setDialogTitle] = useState('');

    const manageDialogActionButton = () => {
        if (dialogTitle == 'Create Copy Trading Account') {
            return <div className='dialogMultipleActionButton'>
                <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className='btn-gradient btn-success'>Add Account</Button>
            </div>;
        }
    }

    const manageContent = () => {
        if (dialogTitle == 'Create Copy Trading Account') {
            return <div className='copy-trading-main-section'>
                <div className='copy-trading-popup-card-section'>
                    <div className='card-header'>
                        <label htmlFor="contained-button-file" className='fileuploadButton'>
                            <Input accept="image/*" id="contained-button-file" multiple type="file"/>
                            <img src={'./assets/img/testimony.png'} className='user-avatar-img'/>
                        </label>
                        <div className='name-infor-section'>
                            <input type='text' name="name" placeholder='Name' className='formControl-input'/>
                            <div className='achiever-section'>
                                <i className="material-icons">star</i>
                                <select className='formControl-input'>
                                    <option>Very Low</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>Hight</option>
                                    <option>Very Hight</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='card-contant'>
                        <div className='risk-score-section'>
                            <p>RISK SCORE</p>
                            <div className='risk-score-silder-section'>
                                <PrettoSlider
                                    size="small"
                                    valueLabelDisplay="auto"
                                    aria-label="pretto slider"
                                    defaultValue={1}
                                    // step={1}
                                    marks
                                    min={1}
                                    max={10}
                                />
                            </div>
                        </div>
                        <div className='gain-copies-section'>
                            <div className='gain-element'>
                                <p>GAIN</p>
                                <input type='text' name="name" placeholder='15' className='formControl-input'/>
                            </div>
                            <div className='copiers-element'>
                                <p>COPIERS</p>
                                <div className='input-section'>
                                    <input type='text' name="name" placeholder='5872' className='formControl-input'/>
                                    <i className="material-icons">arrow_upward</i>
                                    <input type='text' name="name" placeholder='5200' className='formControl-input'/>
                                </div>
                            </div>
                        </div>
                        <div className='profit-loss-section'>
                            <p>PROFIT AND LOSS</p>
                            <div className='input-element'>
                                <input type='text' name="name" placeholder='15' className='formControl-input'/>
                                <input type='text' name="name" placeholder='15' className='formControl-input'/>
                            </div>
                        </div>
                        <div className='commission-section'>
                            <p>COMMISSION</p>
                            <input type='text' name="name" placeholder='15' className='formControl-input'/>
                        </div>
                    </div>
                </div>
            </div>;
        } else if (dialogTitle == 'View') {
            return <div>
            </div>;
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (e) => {
        setDialogTitle('Create Copy Trading Account');
        setOpen(true);
    };

  return (
    <div>
        <div className="app-content--inner">
            <div className="app-content--inner__wrapper mh-100-vh">
                <div style={{ opacity: 1 }}>
                    <Grid container>
                        <Grid item md={12} lg={12} xl={12}>
                            <p className='main-heading'>Copy Trading</p>
                            {/* <CommonFilter /> */}
                            <br/>
                            <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                <div className='actionGroupButton'>
                                    <Button variant="contained" className='add_new_copy_trading_account' onClick={handleClickOpen}>Add Copy Trading Account</Button>
                                </div>
                                <br />
                            </Paper>
                        </Grid>
                    </Grid>
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
                </div>
            </div>
        </div>
    </div>
  )
}

export default CopyTrading