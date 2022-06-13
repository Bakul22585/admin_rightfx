import './ticket.css';
import React, { useState } from "react";
import { Button, CardContent, FormControl, Grid, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';
import { useNavigate } from 'react-router-dom';

const Ticket = () => {

    const navigate = useNavigate()
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchBy, setSearchBy] = useState([
        {
          'label': 'Ticket Title',
          'value': false,
          'name': 'ticket_title'
        },
        {
          'label': 'Subject',
          'value': false,
          'name': 'subject'
        },
        {
          'label': 'Message',
          'value': false,
          'name': 'message'
        },
        {
          'label': 'Date',
          'value': false,
          'name': 'date'
        }
      ]);

    const column = [
        {
            name: 'Ticket ID',
            selector: row => row.ticketChatID,
            sortable: true,
            reorder: true,
            grow: 0.4,
            wrap: true,
        },
        {
            name: 'Ticket Title',
            selector: row => row.ticketTitle,
            sortable: true,
            reorder: true,
            grow: 1,
            wrap: true,
        },
        {
            name: 'Subject',
            selector: row => row.subject,
            sortable: true,
            reorder: true,
            grow: 1,
            wrap: true,
        },
        {
            name: 'Message',
            selector: row => row.ticketBody,
            sortable: true,
            reorder: true,
            grow: 1,
            wrap: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            reorder: true,
            grow: 0.5,
            wrap: true,
        },
        {
            name: 'Date',
            selector: row => row.ticketDateTime,
            sortable: true,
            reorder: true,
            grow: 1,
            wrap: true,
        },
        {
            name: 'Action',
            button: true,
            cell: row => {
                return <div>
                    <Button onClick={(e) => {chatSection(row)}}>
                        View
                    </Button>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        }
    ];

    const chatSection = (data) => {
        console.log(data);
        navigate(`/view_ticket/${data.ticketChatID}`);
    }

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Ticket</p>
                                <CommonFilter search={searchBy} searchWord={setSearchKeyword}/>
                                <br/>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    {/* <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add Deposit</Button>
                                    </div>
                                    <br /> */}
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <CommonTable url={`${Url}/datatable/ticket_list.php`} column={column} sort='0'  search={searchBy} searchWord={searchKeyword}/>
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