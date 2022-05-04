import './list_request.css';
import React, { useState } from "react";
import { Button, FormControl, Grid, Menu, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';

const ListRequest = () => {

    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [open, setOpen] = useState(false);
    const column = [
        {
            name: 'SR.NO',
            selector: row => {
                return <span>{row.sr_no}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'DATE',
            selector: row => {
                return <span title={row.date}>{row.date}</span>
            },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'NAME',
            selector: row => { return <span title={row.name}>{row.name}</span> },
            sortable: true,
            reorder: true,
            grow: 1,
        },
        {
            name: 'IS COMPOUND',
            selector: row => { return <span title={row.is_compound}>{row.is_compound}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'INVESTMENT TILL MONTHS',
            selector: row => { return <span title={row.investment_till_month}>{row.investment_till_month}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'AUTO WITHDRAWAL MONTHS',
            selector: row => { return <span title={row.auto_withdraw_month}>{row.auto_withdraw_month}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'STATUS',
            selector: row => { return <span className={(row.status == "1") ? "status-text-approved" : (row.status == "2") ? "status-text-rejected" : "status-text-pending"} title={(row.status == "1") ? "Approved" : (row.status == "2") ? "Rejected" : "Pending"}>{(row.status == "1") ? "Approved" : (row.status == "2") ? "Rejected" : "Pending"}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'Action',
            button: true,
            cell: row => {
                return <div>
                    <Button
                        id={`actionButton_${row.sr_no}`}
                        aria-controls={open ? `basic-menu-${row.sr_no}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => handleContextClick(event, row.sr_no)}
                        {...row}
                        style={{ color: 'rgb(144 145 139)' }}
                    >
                        <i className="material-icons">more_horiz</i>
                    </Button>
                    <Menu
                        id={`basic-menu-${row.sr_no}`}
                        anchorEl={openTableMenus[row.sr_no]}
                        open={Boolean(openTableMenus[row.sr_no])}
                        onClose={(event) => handleContextClose(row.sr_no)}
                    >
                        {(row.status == "1") ?
                            <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                            : <div><MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                                <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons font-color-approved">task_alt</i>&nbsp;&nbsp;Approved</MenuItem>
                                <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons font-color-rejected">cancel</i>&nbsp;&nbsp;Rejected</MenuItem></div>}

                    </Menu>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        }
    ];
    const [searchBy, setSearchBy] = useState([
        {
          'label': 'DATE',
          'value': false,
          'name': 'date'
        },
        {
          'label': 'NAME',
          'value': false,
          'name': 'name'
        },
        {
          'label': 'INVESTMENT TILL MONTHS',
          'value': false,
          'name': 'investment_till_months'
        },
        {
          'label': 'AUTO WITHDRAWAL MONTHS',
          'value': false,
          'name': 'auto_withdrawal_months'
        }
      ]);

    const handleContextClick = (event, index) => {
        console.log(event.currentTarget.getAttribute('id'), index);
        let tableMenus = [...openTableMenus];
        tableMenus[index] = event.currentTarget;
        setOpenTableMenus(tableMenus);
    };

    const handleContextClose = (index) => {
        let tableMenus = [...openTableMenus];
        tableMenus[index] = null;
        setOpenTableMenus(tableMenus);
    };

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Partnership Request List</p>
                                <CommonFilter search={searchBy}/>
                                <br/>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <CommonTable url={`${Url}/admin/datatable/partnership_request_list.php`} column={column} sort='0' />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListRequest