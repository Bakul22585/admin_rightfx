import './activity_log.css';
import React from "react";
import { CardContent, FormControl, Grid, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';

const ActivityLog = () => {

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

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Activity Log</p>
                                <CommonFilter />
                                <br/>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    {/* <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add Deposit</Button>
                                    </div>
                                    <br /> */}
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url={`${Url}/admin/datatable/activity_log_list.php`} column={activityColumn} sort='2' />
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

export default ActivityLog