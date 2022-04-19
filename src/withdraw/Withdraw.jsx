import './withdraw.css';
import React from "react";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import CommonFilter from '../common/CommonFilter';

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

const Withdraw = () => {
    // const [age, setAge] = React.useState('');

    /* const handleChange = (event: SelectChangeEvent) => {
        console.log(event);
        setAge(event.target.value);
    }; */

    const [value, setValue] = React.useState(new Date());

    const [age, setAge] = React.useState("");
    const handleChange = (event) => {
        setAge(event.target.value);
        console.log(event.target.value);
    };

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Withdrawal</p>
                                <CommonFilter />
                                <br/>
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
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Withdraw