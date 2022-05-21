import { useTheme } from '@emotion/react';
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
});

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const source = [
    'Website - IB Form',
    'Website - Demo Form',
    'CRM',
    'Live',
    'CRM - Multi Structure',
    'Website - Live Form',
    'Dedicated Link - IB',
];

const CommonFilter = (prop) => {

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState([]);
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [filterData, setFilterData] = useState({});
    const [filterSection, setFilterSection] = useState(false);
    const [filterBy, setFilterBy] = useState('');
    const [clientSearch, setClientSearch] = useState('');
    const [state, setState] = useState({
        first_name: false,
        last_name: false,
        email: false,
        phone: false,
        account_id: false,
        mt5_account: false,
    });
    const [personName, setPersonName] = useState([]);
    const [sourceName, setSourceName] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [clientType, setClientType] = useState('');
    const [propSearchElement, setPropSearchElement] = useState(prop.search);

    const input1 = (event) => {
        const { name, value } = event.target;
        setClientSearch(value);
    };

    const handleChange = (event) => {
        propSearchElement[propSearchElement.findIndex((x) => x.name == event.target.name)].value = event.target.checked;
        setPropSearchElement([...propSearchElement]);
    };

    const filterByChange = (e) => {
        console.log('selected value', e.target.value);
        setFilterBy(e.target.value);
    };

    const dynamicCheckbox = (e) => {
        
        let checkbox = [];
        propSearchElement.forEach(element => {
            checkbox.push(<FormControlLabel
                className='searchByCheckbox'
                control={
                    <Checkbox onChange={handleChange} name={element.name} />
                }
                label={element.label}
            /> );
        });
        return checkbox;
    }
    // console.log(propSearchElement, prop.searchWord);
    return (
        <div>
            <Grid container>
                <Grid item md={12} lg={12} xl={12}>
                    <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                        <Grid container spacing={2}>
                            <Grid item sm={12} md={12}>
                                <div className='newFilterSection'>
                                    <CssTextField
                                        id="standard-search"
                                        label="Search"
                                        sx={{ width: "100%" }}
                                        variant="standard"
                                        name="myclient_search"
                                        // value={prop.searchWord}
                                        onChange={(e) => prop.searchWord(e.target.value)}
                                    />
                                    <Button onClick={(event) => setFilterSection(!filterSection)}><i className="material-icons"> {(filterSection) ? 'menu' : 'filter_list'}</i></Button>
                                </div>
                                <br />
                                {(filterSection) ? <div>
                                    <div className='SerachBySection'>
                                        <b class="mr-3">Search By : </b>
                                        {dynamicCheckbox()}
                                        {/* <FormControlLabel
                                            className='searchByCheckbox'
                                            control={
                                                <Checkbox checked={state.first_name} onChange={handleChange} name="first_name" />
                                            }
                                            label="First Name"
                                        />
                                        <FormControlLabel
                                            className='searchByCheckbox'
                                            control={
                                                <Checkbox checked={state.last_name} onChange={handleChange} name="last_name" />
                                            }
                                            label="Last Name"
                                        />
                                        <FormControlLabel
                                            className='searchByCheckbox'
                                            control={
                                                <Checkbox checked={state.email} onChange={handleChange} name="email" />
                                            }
                                            label="Email"
                                        />
                                        <FormControlLabel
                                            className='searchByCheckbox'
                                            control={
                                                <Checkbox checked={state.phone} onChange={handleChange} name="phone" />
                                            }
                                            label="Phone"
                                        />
                                        <FormControlLabel
                                            className='searchByCheckbox'
                                            control={
                                                <Checkbox checked={state.account_id} onChange={handleChange} name="account_id" />
                                            }
                                            label="Account ID"
                                        />
                                        <FormControlLabel
                                            className='searchByCheckbox'
                                            control={
                                                <Checkbox checked={state.mt5_account} onChange={handleChange} name="mt5_account" />
                                            }
                                            label="MT5 Account"
                                        /> */}
                                    </div>
                                    <div className='filterBy'>
                                        <b class="mb-2 d-block">Filter By :</b>
                                        <FormControl>
                                            <Select
                                                label="Category"
                                                value={filterBy}
                                                onChange={filterByChange}
                                                input={<BootstrapInput />}
                                                sx={{ width: "200px" }}
                                            >
                                                <MenuItem value="">None</MenuItem>
                                                <MenuItem value="Date">Date</MenuItem>
                                                <MenuItem value="Sales">Sales</MenuItem>
                                                <MenuItem value="Country">Country</MenuItem>
                                                <MenuItem value="Account Type">Account Type</MenuItem>
                                                <MenuItem value="IB">IB</MenuItem>
                                                <MenuItem value="Source">Source</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {(filterBy == 'Date') ? <>
                                            <FormControl>
                                                <label className="small font-weight-bold text-dark">
                                                    From
                                                </label>
                                                <BootstrapInput type="date"></BootstrapInput>
                                            </FormControl>
                                            <FormControl>
                                                <label className="small font-weight-bold text-dark">
                                                    To
                                                </label>
                                                <BootstrapInput type="date"></BootstrapInput>
                                            </FormControl>
                                        </> : (filterBy == 'Sales') ?
                                            <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                <InputLabel id="demo-multiple-chip-label">Select Sales</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={personName}
                                                    input={<OutlinedInput id="select-multiple-chip" label="Select Sales" />}
                                                    renderValue={(selected) => (
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {selected.map((value) => (
                                                                <Chip key={value} label={value} />
                                                            ))}
                                                        </Box>
                                                    )}
                                                    MenuProps={MenuProps}
                                                >
                                                    {names.map((name) => (
                                                        <MenuItem
                                                            key={name}
                                                            value={name}
                                                            // style={getStyles(name, personName, theme)}
                                                        >
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl> : (filterBy == 'Country') ?
                                                <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                    <InputLabel id="demo-multiple-chip-label">Select Country</InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-chip-label"
                                                        id="demo-multiple-chip"
                                                        multiple
                                                        value={personName}
                                                        input={<OutlinedInput id="select-multiple-chip" label="Select Country" />}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {selected.map((value) => (
                                                                    <Chip key={value} label={value} />
                                                                ))}
                                                            </Box>
                                                        )}
                                                        MenuProps={MenuProps}
                                                    >
                                                        {names.map((name) => (
                                                            <MenuItem
                                                                key={name}
                                                                value={name}
                                                                // style={getStyles(name, personName, theme)}
                                                            >
                                                                {name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl> : (filterBy == 'Account Type') ?
                                                    <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                        <label className="small font-weight-bold text-dark">
                                                            Account Type
                                                        </label>
                                                        <Select
                                                            label="Category"
                                                            value={filterBy}
                                                            onChange={filterByChange}
                                                            input={<BootstrapInput />}
                                                            sx={{ width: "200px" }}
                                                        >
                                                            <MenuItem value="Individual">Individual</MenuItem>
                                                            <MenuItem value="Individual-IB">Individual-IB</MenuItem>
                                                            <MenuItem value="Corporate">Corporate</MenuItem>
                                                        </Select>
                                                    </FormControl> : (filterBy == 'IB') ?
                                                        <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                            <InputLabel id="demo-multiple-chip-label">Select IB</InputLabel>
                                                            <Select
                                                                labelId="demo-multiple-chip-label"
                                                                id="demo-multiple-chip"
                                                                multiple
                                                                value={personName}
                                                                input={<OutlinedInput id="select-multiple-chip" label="Select IB" />}
                                                                renderValue={(selected) => (
                                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                        {selected.map((value) => (
                                                                            <Chip key={value} label={value} />
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                                MenuProps={MenuProps}
                                                            >
                                                                {names.map((name) => (
                                                                    <MenuItem
                                                                        key={name}
                                                                        value={name}
                                                                        // style={getStyles(name, personName, theme)}
                                                                    >
                                                                        {name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl> : (filterBy == 'Source') ?
                                                            <FormControl sx={{ m: 1, width: 300 }} className='multipleSelect'>
                                                                <InputLabel id="demo-multiple-chip-label">Select Source</InputLabel>
                                                                <Select
                                                                    labelId="demo-multiple-chip-label"
                                                                    id="demo-multiple-chip"
                                                                    multiple
                                                                    value={sourceName}
                                                                    input={<OutlinedInput id="select-multiple-chip" label="Select Source" />}
                                                                    renderValue={(selected) => (
                                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                            {selected.map((value) => (
                                                                                <Chip key={value} label={value} />
                                                                            ))}
                                                                        </Box>
                                                                    )}
                                                                    MenuProps={MenuProps}
                                                                >
                                                                    {source.map((name) => (
                                                                        <MenuItem
                                                                            key={name}
                                                                            value={name}
                                                                            // style={getStyles(name, personName, theme)}
                                                                        >
                                                                            {name}
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl> : ''}
                                    </div>
                                </div> : ''}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default CommonFilter