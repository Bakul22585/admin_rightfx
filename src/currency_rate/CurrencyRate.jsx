import './currency_rate.css';
import React from "react";
import { Button, CardContent, FormControl, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const CurrencyRate = () => {

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Currency Rate</p>

                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <div className='input-section'>
                                                    <TextField label="Deposit Rate" variant="standard" sx={{ width: '100%' }} name='deposit_rate' />
                                                </div>
                                                <br/>
                                                <div className='input-section'>
                                                    <TextField label="Withdrawal Rate" variant="standard" sx={{ width: '100%' }} name='withdrawal_rate' />
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

export default CurrencyRate