import './leads.css';
import React, { useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import { Autocomplete, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, InputLabel, Menu, MenuItem, OutlinedInput, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonTable from '../common/CommonTable';
import { ColorButton } from '../common/CustomElement';
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import CommonFilter from '../common/CommonFilter';

const CssTextField = styled(TextField)({
});

/* const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
})); */

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {/* {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null} */}
    </DialogTitle>
  );
};

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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    // borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    fontSize: 16,
    padding: "8px 26px 8px 10px",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
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
      // borderRadius: 9,
      borderColor: "#80bdff",
    },
  },
}));

interface FilmOptionType {
  title: string;
  year: number;
}
const nbaTeams = [
  { id: 1, name: 'Atlanta Hawks' },
  { id: 2, name: 'Boston Celtics' },
  { id: 3, name: 'Brooklyn Nets' },
  { id: 4, name: 'Charlotte Hornets' },
  { id: 5, name: 'Chicago Bulls' },
  { id: 6, name: 'Cleveland Cavaliers' },
  { id: 7, name: 'Dallas Mavericks' },
  { id: 8, name: 'Denver Nuggets' },
  { id: 9, name: 'Detroit Pistons' },
  { id: 10, name: 'Golden State Warriors' },
  { id: 11, name: 'Houston Rockets' },
  { id: 12, name: 'Indiana Pacers' },
  { id: 13, name: 'Los Angeles Clippers' },
  { id: 14, name: 'Los Angeles Lakers' },
  { id: 15, name: 'Memphis Grizzlies' },
  { id: 16, name: 'Miami Heat' },
  { id: 17, name: 'Milwaukee Bucks' },
  { id: 18, name: 'Minnesota Timberwolves' },
  { id: 19, name: 'New Orleans Pelicans' },
  { id: 20, name: 'New York Knicks' },
  { id: 21, name: 'Oklahoma City Thunder' },
  { id: 22, name: 'Orlando Magic' },
  { id: 23, name: 'Philadelphia 76ers' },
  { id: 24, name: 'Phoenix Suns' },
  { id: 25, name: 'Portland Trail Blazers' },
  { id: 26, name: 'Sacramento Kings' },
  { id: 27, name: 'San Antonio Spurs' },
  { id: 28, name: 'Toronto Raptors' },
  { id: 29, name: 'Utah Jazz' },
  { id: 30, name: 'Washington Wizards' },
];

const Leads = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState('md');
  const navigate = useNavigate();
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [dialogTitle, setDialogTitle] = useState('');

  /* const defaultProps = {
    options: top100Films,
    getOptionLabel: (option: FilmOptionType) => option.title,
  }; */

  /* const flatProps = {
    options: top100Films.map((option) => option.title),
  }; */

  const handleClickOpen = (e) => {
    setDialogTitle('Add Lead');
    setMaxWidth('md');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const gotoProfile = (e) => {
    console.log('goto profile page', e);
    navigate("/profile/" + e.name);
  }

  const viewFollowup = (e) => {
    console.log('view followup', e);
    setDialogTitle('View Lead (' + e.name + ')');
    setMaxWidth('lg');
    setOpen(true);
  }

  const manageDialogActionButton = () => {
    if (dialogTitle == 'Add Lead') {
      return <div className='dialogMultipleActionButton'>
        <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
        <Button variant="contained" className='btn-gradient btn-success'>Add Lead</Button>
      </div>;
    }
  }

  const manageContent = () => {
    console.log(dialogTitle.substring(0, 9));
    if (dialogTitle == 'Add Lead') {
      return <div>
        <div className='element margeTwoField'>
          <Autocomplete
            options={nbaTeams}
            id="disable-close-on-select"
            Customer
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} label="Customer" variant="standard" />
            )}
            getOptionLabel={option => option.name}
            // value={selectedTeam}
            onChange={(_event, newTeam) => {
              // setSelectedTeam(newTeam);
              console.log(_event, newTeam);
            }}
          />
          <FormControl variant="standard" sx={{ width: '100%' }} focused>
            <InputLabel id="demo-simple-select-standard-label">Source</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={age}
              // onChange={handleChange}
              label="Source"
            >
              <MenuItem value='1'>Newspaper Ads</MenuItem>
              <MenuItem value='2'>Banner Ads</MenuItem>
              <MenuItem value='3'>Billboards</MenuItem>
              <MenuItem value='4'>Walk-In</MenuItem>
              <MenuItem value='5'>Facebook Ads</MenuItem>
              <MenuItem value='6'>Instagram Ads</MenuItem>
              <MenuItem value='7'>Whatsapp ads</MenuItem>
              <MenuItem value='8'>Website</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        <div className='margeTwoField element'>
          <TextField type='date' id="standard-basic" label="Follow Up Date" variant="standard" sx={{ width: '100%' }} focused />
          <TextField type='time' id="standard-basic" label="Follow Up Time" variant="standard" sx={{ width: '100%' }} focused />
        </div>
        <br />
        <div className='element margeTwoField'>
          <FormControl variant="standard" sx={{ width: '100%' }} focused>
            <InputLabel id="demo-simple-select-standard-label">Interest</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={age}
              // onChange={handleChange}
              label="Interest"
            >
              <MenuItem value="1">Very Low</MenuItem>
              <MenuItem value="2">Low</MenuItem>
              <MenuItem value="3">Average</MenuItem>
              <MenuItem value="4">High</MenuItem>
              <MenuItem value="5">Very High</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ width: '100%' }} focused>
            <InputLabel id="demo-simple-select-standard-label">Assign To Sales-Executive</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={age}
              // onChange={handleChange}
              label="Assign To Sales-Executive"
            >
              <MenuItem value=""></MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        <div className='element'>
          <TextField id="standard-basic" label="Remarks" multiline variant="standard" focused sx={{ width: '100%' }} />
        </div>
        <br />
        <div className='element margeTwoField'>
          <div className='checkboxSection' style={{ width: '100%' }}>
            <label>Do you want to send project details to Customer?</label>
            <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Send Mail?" />
          </div>
          <div className='checkboxSection' style={{ width: '100%' }}>
            <label>Please select user type to send SMS.</label>
            <div className='checkbox-group'>
              <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Client" />
              <FormControlLabel control={<Checkbox size="small" />} label="Sales-Executive" />
              <FormControlLabel control={<Checkbox size="small" />} label="Admin" />
            </div>
          </div>
        </div>
      </div>;
    } else if (dialogTitle.substring(0, 9) == 'View Lead') {
      return <div>
        <Grid container spacing={3}>
          <Grid item md={6} lg={6} xl={6} sm={12}>
            <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }} className='pending-all-15px'>
              <p className='view-lead-popup-header-title'>Lead Details</p>
              <div className='popup-content-section'>
                <div className='user-details'>
                  <label>Customer Name:</label>
                  <p>yogeshbhai</p>
                </div>
                <div className='user-details'>
                  <label>Source:</label>
                  <p>Walk-In</p>
                </div>
                <div className='user-details'>
                  <label>Customer Mobile:</label>
                  <p>9824386783</p>
                </div>
                <div className='user-details'>
                  <label>Customer Email:</label>
                  <p>9824386783</p>
                </div>
                <div className='user-details'>
                  <label>Lead Added By:</label>
                  <p>Nirav bhai Sutariya</p>
                </div>
                <div className='user-details'>
                  <label>Lead Added:</label>
                  <p>2022-03-31 18:42:17</p>
                </div>
                <div className='user-details'>
                  <label>Current Followup:</label>
                  <p>5 Apr 2022</p>
                </div>
                <div className='user-details'>
                  <label>Reference:</label>
                  <p></p>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item md={6} lg={6} xl={6} sm={12}>
            <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }} className='pending-all-15px'>
              <p className='view-lead-popup-header-title'>Add New Follow Up</p>
              <div className='margeTwoField element'>
                <TextField type='date' id="standard-basic" label="Follow Up Date" variant="standard" sx={{ width: '100%' }} focused />
                <TextField type='time' id="standard-basic" label="Follow Up Time" variant="standard" sx={{ width: '100%' }} focused />
              </div>
              <br />
              <div className='element'>
                <FormControl variant="standard" sx={{ width: '100%' }} focused>
                  <InputLabel id="demo-simple-select-standard-label">Interest</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={age}
                    // onChange={handleChange}
                    label="Interest"
                  >
                    <MenuItem value="1">Very Low</MenuItem>
                    <MenuItem value="2">Low</MenuItem>
                    <MenuItem value="3">Average</MenuItem>
                    <MenuItem value="4">High</MenuItem>
                    <MenuItem value="5">Very High</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <br />
              <div className='element'>
                <TextField id="standard-basic" label="Remarks" multiline variant="standard" focused sx={{ width: '100%' }} />
              </div>
              <br />
              <div className='checkboxSection' style={{ width: '100%' }}>
                <label>Please select user type to send SMS.</label>
                <div className='checkbox-group'>
                  <FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Client" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Sales-Executive" />
                  <FormControlLabel control={<Checkbox size="small" />} label="Admin" />
                </div>
              </div>
              <br/>
              <div className='popup-add-lead-section'>
                <Button className='btn btn-success'>Add</Button>
              </div>
            </Paper>
          </Grid>
          <Grid item md={12} lg={12} xl={12} sm={12}>
            <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
              <p className='view-lead-popup-header-title'>Follow Up History</p>
              <CommonTable url='https://alphapixclients.com/forex/admin/datatable/users_list.php' column={column} sort='0' filter={filterData} />
            </Paper>
          </Grid>
          <Grid item md={12} lg={12} xl={12} sm={12}>
            <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
              <p className='view-lead-popup-header-title'>Call History</p>
              <CommonTable url='https://alphapixclients.com/forex/admin/datatable/users_list.php' column={callColumn} sort='0' filter={filterData} />
            </Paper>
          </Grid>
        </Grid>
      </div>;
    }
  }

  const depositColumn = [
    {
      name: 'SR NO',
      selector: row => {
        return <span>{row.sr_no}</span>
      },
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: 'CUSTOMER',
      selector: row => {
        return <a className='linkColor' title={row.name} onClick={(event) => gotoProfile(row)}>{row.name}</a>
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Interest',
      selector: row => {
        return <div>
          <Select
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
            }}
            input={<BootstrapInput />}
          >
            <MenuItem value="1">Very Low</MenuItem>
            <MenuItem value="2">Low</MenuItem>
            <MenuItem value="3">Average</MenuItem>
            <MenuItem value="4">High</MenuItem>
            <MenuItem value="5">Very High</MenuItem>
          </Select>
        </div>
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Assign To',
      selector: row => {
        return <div>
          <Select
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
            }}
            input={<BootstrapInput />}
          >
            <MenuItem value={row.name}>{row.name}</MenuItem>
          </Select>
        </div>
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Followup Date',
      selector: row => { return <span title={row.date}>{row.date}</span> },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Source',
      selector: row => { return <span title={row.user_country}>{row.user_country}</span> },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Next Date',
      selector: row => {
        return <input type='date' className="table-date-picker-border-0" />
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Followup',
      selector: row => {
        return <div>
          <i className="material-icons viewLead" onClick={(e) => viewFollowup(row)}>visibility</i>
        </div>
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
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
            <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons font-color-approved">task_alt</i>&nbsp;&nbsp;Complete</MenuItem>
            <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons font-color-rejected">thumb_down</i>&nbsp;&nbsp;Not Interested</MenuItem>
            <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons font-color-rejected">cancel</i>&nbsp;&nbsp;Reject</MenuItem>
          </Menu>
        </div>
      },
      ignoreRowClick: true,
      allowOverflow: true,
      grow: 0.5,
    }
  ];

  const column = [
    {
      name: 'SR NO',
      selector: row => {
        return <span>{row.sr_no}</span>
      },
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: 'Interest',
      selector: row => { return <span title={row.kyc_status}>{row.kyc_status}</span> },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Followup Date',
      selector: row => { return <span title={row.date}>{row.date}</span> },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Remarks',
      selector: row => { return <span title={row.user_visible_password}>{row.user_visible_password}</span> },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Added By',
      selector: row => {
        return <div>
          <Select
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
            }}
            input={<BootstrapInput />}
          >
            <MenuItem value={row.name}>{row.name}</MenuItem>
          </Select>
        </div>
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Recording',
      button: true,
      cell: row => {
        return <div></div>
      },
      ignoreRowClick: true,
      allowOverflow: true,
      grow: 0.5,
    }
  ];

  const callColumn = [
    {
      name: 'SR NO',
      selector: row => {
        return <span>{row.sr_no}</span>
      },
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: 'Mobile No',
      selector: row => { return <span title={row.user_phone}>{row.user_phone}</span> },
      sortable: true,
      reorder: true,
    },
    {
      name: 'Type',
      selector: row => { return <span title={row.kyc_status}>{row.kyc_status}</span> },
      sortable: true,
      reorder: true,
    },
    {
      name: 'Call Duration',
      selector: row => { return <span title={row.user_visible_password}>{row.user_visible_password}</span> },
      sortable: true,
      reorder: true,
    },
    {
      name: 'Call Datetime',
      selector: row => {
        return <div>
        </div>
      },
      sortable: true,
      reorder: true,
    },
  ];

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className='main-heading'>Leads List</p>

                <CommonFilter />
                <br />
                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                  <div className='actionGroupButton'>
                    <Button variant="contained" onClick={handleClickOpen} className='addLead'>Add Lead</Button>
                    {/* <Button variant="contained">Add IB</Button>
                    <Button variant="contained">All</Button> */}
                  </div>
                  <br />
                  <CommonTable url='https://alphapixclients.com/forex/admin/datatable/users_list.php' column={depositColumn} sort='0' filter={filterData} />
                </Paper>

                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {dialogTitle}
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    {manageContent()}
                  </DialogContent>
                  <DialogActions>
                    {manageDialogActionButton()}
                  </DialogActions>
                </BootstrapDialog>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leads