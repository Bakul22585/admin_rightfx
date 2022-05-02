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
                                                    <TextField label="Wallet to Wallet Transfer Charges ($)" variant="standard" sx={{ width: '100%' }} name='rate' />
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