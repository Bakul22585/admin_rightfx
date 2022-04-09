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
        text: "Deposit & Withdraw"
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
                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                <p className='main-heading'>Dashboard</p>
                                <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <div className='chartSection'>
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={options}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item sm={6} md={3}>
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

export default Dashboard