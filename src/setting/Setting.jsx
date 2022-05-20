import './setting.css';
import React from "react";
import { Button, CardContent, Checkbox, FormControl, FormControlLabel, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Setting = () => {

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Setting</p>

                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    {/* <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add</Button>
                                    </div>
                                    <br /> */}
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <div className='checkbox-section'>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox defaultChecked name="deposit_status" />
                                                        }
                                                        label="Deposit Status"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox defaultChecked name="withdrawal_status" />
                                                        }
                                                        label="Withdrawal Status"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox defaultChecked name="transafer_status" />
                                                        }
                                                        label="Transafer Status"
                                                    />
                                                </div>
                                                <br/>
                                                <div className='input-section'>
                                                    <TextField label="Wallet to Wallet Transfer Charges ($)" variant="standard" sx={{ width: '100%' }} name='wallet_transfer_changes' />
                                                    <TextField label="Bank Account Name" variant="standard" sx={{ width: '100%' }} name='bank_ac_name' />
                                                    <TextField label="Bank Account Number" variant="standard" sx={{ width: '100%' }} name='bank_acc_number' />
                                                </div>
                                                <br/>
                                                <div className='input-section'>
                                                    <TextField label="Bank Name" variant="standard" sx={{ width: '100%' }} name='wallet_transfer_changes' />
                                                    <TextField label="Bank IFSC Code" variant="standard" sx={{ width: '100%' }} name='bank_ac_name' />
                                                </div>
                                                <br/>
                                                <div className='input-section qr-code-section'>
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" />
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" />
                                                </div>
                                                <br/>
                                                <div className='action-button-section'>
                                                    <Button variant="contained" className='btn-success'>Update</Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting