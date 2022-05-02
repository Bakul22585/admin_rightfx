import './ticket.css';
import React from "react";
import { CardContent, FormControl, Grid, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';

const Ticket = () => {

    const column = [
        {
            name: 'Ticket ID',
            selector: row => row.ticketID,
            sortable: true,
            reorder: true,
            grow: 0.4,
        },
        {
            name: 'Ticket Title',
            selector: row => row.ticketTitle,
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'Subject',
            selector: row => row.subject,
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'Message',
            selector: row => row.ticketBody,
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'Date',
            selector: row => row.ticketDateTime,
            sortable: true,
            reorder: true,
            grow: 1,
        },
        /* {
            name: 'Action',
            selector: row => row.datetime,
            sortable: true,
            reorder: true,
            grow: 1,
        } */
    ];

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Ticket</p>
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
                                                <CommonTable url={`${Url}/admin/datatable/ticket_list.php`} column={column} sort='0' />
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

export default Ticket