import './deposit.css';
import React, { useState, useEffect } from "react";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import DataTable from 'react-data-table-component';
import axios from 'axios';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(0),
    },
    "& .MuiInputBase-input": {
        borderRadius: 9,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "8px 26px 8px 10px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
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
            borderRadius: 9,
            borderColor: "#80bdff",
        },
    },
}));

const Deposit = () => {
    const columns = [
        {
            name: 'First Name',
            selector: row => row.first_name,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Last Name',
            selector: row => row.last_name,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            reorder: true,
        },
        {
            name: 'Action',
            button: true,
            cell: row => <Button onClick={actionClick}>Action</Button>,
            ignoreRowClick: true,
            allowOverflow: true
        },
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [value, setValue] = React.useState(new Date());

    const [age, setAge] = React.useState("");
    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(event.target.value);
    };

    const fetchUsers = async page => {
        setLoading(true);

        const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=1`);

        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        console.log("page", page);
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);
        console.log(newPerPage, page);
        const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

        setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    const handleSort = async (column, sortDirection) => {
        console.log('cusotm sort', column, sortDirection);
    };

    function actionClick(data) {
        console.log("Action data", data);
    }

    useEffect(() => {
        fetchUsers(1); // fetch page 1 of users

    }, []);

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Deposit</p>
                                <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                    <div className="card-header font-weight-bold text-dark border-bottom py-2">
                                        Filter Criteria
                                    </div>
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={6} md={3}>
                                                <FormControl fullWidth={true}>
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
                                                </FormControl>
                                            </Grid>
                                            <Grid item sm={6} md={3}>
                                                <FormControl fullWidth={true}>
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
                                                </FormControl>
                                            </Grid>
                                            <Grid item sm={6} md={3}>
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
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12}>
                                                <div className="filter-submit">
                                                    <ColorButton className=" d-block ml-auto mb-3 mr-3 ">
                                                        Sumbit
                                                    </ColorButton>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Paper>
                                <br />
                                <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                    {/* <div className="card-header font-weight-bold text-dark border-bottom py-2">
                                        Filter Criteria
                                    </div> */}
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                {/* <DataTable
                                                    columns={columns}
                                                    data={data}
                                                /> */}
                                                <DataTable
                                                    title="Users"
                                                    columns={columns}
                                                    data={data}
                                                    progressPending={loading}
                                                    onSort={handleSort}
                                                    sortServer
                                                    pagination
                                                    paginationServer
                                                    paginationTotalRows={totalRows}
                                                    onChangeRowsPerPage={handlePerRowsChange}
                                                    onChangePage={handlePageChange}
                                                    highlightOnHover
                                                    pointerOnHover
                                                />
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

export default Deposit