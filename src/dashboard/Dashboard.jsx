import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './dashboard.css';
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";

const options = {
    chart: {
        type: "spline"
    },
    title: {
        text: "Finance"
    },
    series: [
        {
            name: 'Deposit',
            data: [1, 2, 1, 4, 3, 6, 20, 10, 15],
            color: '#009900',
        },
        {
            name: 'Withdraw',
            data: [10, 20, 10, 20, 2, 1, 0, 2, 10],
            color: '#ff1a1a',
        }
    ]
};

const Dashboard = () => {
    return (
        // <div className='dashboard'>
        //     <div className='chartSection'>
        //         <HighchartsReact
        //             highcharts={Highcharts}
        //             options={options}
        //         />
        //     </div>
        //     {/* <br></br>
        //     <div>
        //         <div className='chartSection'>
        //             <HighchartsReact
        //                 highcharts={Highcharts}
        //                 options={options}
        //             />
        //         </div>
        //     </div> */}
        // </div>

        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Dashboard</p>
                                <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                    {/* <div className="card-header font-weight-bold text-dark border-bottom py-2">
                                        Filter Criteria
                                    </div> */}
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                {/* <FormControl fullWidth={true}>
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
                                                </FormControl> */}
                                                <div className='chartSection'>
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={options}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item sm={6} md={3}>
                                                {/* <FormControl fullWidth={true}>
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
                                                </FormControl> */}
                                            </Grid>
                                            {/* <Grid item sm={6} md={3}>
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
                                            </Grid> */}
                                        </Grid>
                                        {/* <Grid container spacing={2}>
                                            <Grid item sm={12} md={12}>
                                                <div className="filter-submit">
                                                    <ColorButton className=" d-block ml-auto mb-3 mr-3 ">
                                                        Sumbit
                                                    </ColorButton>
                                                </div>
                                            </Grid>
                                        </Grid> */}
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

export default Dashboard