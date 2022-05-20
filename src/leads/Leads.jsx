import './leads.css';
import React, { useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import { Autocomplete, Button, Checkbox, Chip, FormControl, FormControlLabel, Grid, Input, InputLabel, Menu, MenuItem, OutlinedInput, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonTable from '../common/CommonTable';
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CommonFilter from '../common/CommonFilter';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Url } from '../global';
import axios from 'axios';

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
    fontSize: 13,
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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [param, setParam] = useState({});
  const [form, setForm] = useState({
    customer_name: '',
    customer_mobile: '',
    customer_email: '',
    customer_address: '',
    source_id: '',
    source_desc: '',
    interest: '',
    assign: '',
    date: '',
    time: '',
    remark: '',
    cp_access: '0',
    create_demo_mt5: '0',
    isCustomerSendMail: true,
    isCustomerSendsms: true,
    isAssignSendsms: false,
    isAdminSendsms: false,
    isLoader: false
  });
  const [newFollowupForm, setNewFollowupForm] = useState({
    date: '',
    time: '',
    interest: '',
    remark: '',
    inquiry_id: '',
    lead_assign_user_id: '',
    isCustomerSendsms: true,
    isAssignSendsms: false,
    isAdminSendsms: false,
    isLoader: false,
  });
  const [leadDetails, setLeadDetails] = useState({
    customer_name: '',
    customer_mobile: '',
    customer_email: '',
    source_id: '',
    followup: '',
    lead_added: '',
    lead_added_by: '',
    reference: ''
  });
  const [searchBy, setSearchBy] = useState([
    {
      'label': 'CUSTOMER',
      'value': false,
      'name': 'customer'
    },
    {
      'label': 'Interest',
      'value': false,
      'name': 'interest'
    },
    {
      'label': 'Assign To',
      'value': false,
      'name': 'assign_to'
    },
    {
      'label': 'Followup Date',
      'value': false,
      'name': 'followup_date'
    },
    {
      'label': 'Source',
      'value': false,
      'name': 'source'
    }
  ]);

  toast.configure();
  const interest = ['Very Low', 'Low', 'Average', 'High', 'Very High'];
  var csvData = `Customer Name, Customer Mobile, Customer Email, Customer Address, Source, Source Description, Interest, Assign To Sales Executive, Follow Up Date, Follow Up Time, Remark
  Demo, 1234567890, demo@gmail.com, 000 demo society demo Nager Near demo market demo., Web, test, Low, 7475717273, 11-05-2022, 01:51 PM, Test
  Demo 1, 0987654321, demo1@gmail.com, 0 demo1 society demo1 Nager Near demo1 market demo1., Banner, test, High, 7475717273, 11-05-2022, 01:51 PM, Test`;

  const handleClickOpen = (e) => {
    setForm(
      {
        customer_name: '',
        customer_mobile: '',
        customer_email: '',
        customer_address: '',
        source_id: '',
        source_desc: '',
        interest: '',
        assign: '',
        date: '',
        time: '',
        remark: '',
        cp_access: '0',
        create_demo_mt5: '0',
        isCustomerSendMail: true,
        isCustomerSendsms: true,
        isAssignSendsms: false,
        isAdminSendsms: false,
        isLoader: false
      }
    );
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
    navigate("/profile/" + e.user_id);
  }

  const viewFollowup = (e) => {
    console.log('view followup', e);
    setNewFollowupForm({
      date: '',
      time: '',
      interest: '',
      remark: '',
      inquiry_id: e.inquiry_id,
      lead_assign_user_id: e.lead_assign_user_id,
      isCustomerSendsms: true,
      isAssignSendsms: false,
      isAdminSendsms: false,
      isLoader: false,
    });
    setLeadDetails({
      customer_name: e.customer,
      customer_mobile: e.customer_mobile,
      customer_email: e.customer_email,
      source_id: e.source,
      followup: e.followup_date,
      lead_added: e.added_datetime,
      lead_added_by: 'Test',
      reference: ''
    });
    setParam({...param,'inquiry_id': e.inquiry_id});
    setDialogTitle('View Lead (' + e.customer + ')');
    setMaxWidth('lg');
    setOpen(true);
  }

  const manageDialogActionButton = () => {
    if (dialogTitle == 'Add Lead') {
      return <div className='dialogMultipleActionButton'>
        <Button variant="contained" className='cancelButton' onClick={handleClose}>Cancel</Button>
        {(form.isLoader) ? <Button variant="contained" className='btn-gradient btn-success' disabled><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i></Button> : <Button variant="contained" className='btn-gradient btn-success' onClick={submitForm}>Add Lead</Button>}
      </div>;
    }
  }

  const manageContent = () => {

    if (dialogTitle == 'Add Lead') {
      return <div>
        <div className='margeTwoField element'>
          <TextField type='text' label="Customer Name" variant="standard" sx={{ width: '100%' }} focused name='customer_name' onChange={input} />
          <TextField type='text' label="Customer Mobile" variant="standard" sx={{ width: '100%' }} focused name='customer_mobile' onChange={input} />
        </div>
        <br />
        <div className='margeTwoField element'>
          <TextField type='text' label="Customer Email" variant="standard" sx={{ width: '100%' }} focused name='customer_email' onChange={input} />
          <TextField type='text' label="Customer Address" multiline variant="standard" sx={{ width: '100%' }} focused name='customer_address' onChange={input} />
        </div>
        <br />
        <div className='element margeTwoField'>
          {/* <Autocomplete
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
              setForm({ ...form, customer: newTeam.id });
            }}
          /> */}
          <FormControl variant="standard" sx={{ width: '100%' }} focused>
            <InputLabel id="demo-simple-select-standard-label">Source</InputLabel>
            <Select
              onChange={input}
              label="Source"
              name='source_id'
            >
              <MenuItem value='1'>Newspaper Ads</MenuItem>
              <MenuItem value='2'>Banner Ads</MenuItem>
              <MenuItem value='3'>Billboards</MenuItem>
              <MenuItem value='4'>Paper</MenuItem>
              <MenuItem value='5'>Broker</MenuItem>
              <MenuItem value='6'>Facebook Ads</MenuItem>
              <MenuItem value='7'>Instagram Ads</MenuItem>
              <MenuItem value='8'>Whatsapp ads</MenuItem>
              <MenuItem value='9'>Website</MenuItem>
            </Select>
          </FormControl>
          <TextField type='text' label="Source Description" multiline variant="standard" sx={{ width: '100%' }} focused name='source_desc' onChange={input} />
        </div>
        <br />
        <div className='margeTwoField element'>
          <FormControl variant="standard" sx={{ width: '100%' }} focused>
            <InputLabel id="demo-simple-select-standard-label">Interest</InputLabel>
            <Select
              onChange={input}
              label="Interest"
              name='interest'
            >
              <MenuItem value="Very Low">Very Low</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Average">Average</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Very High">Very High</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ width: '100%' }} focused>
            <InputLabel id="demo-simple-select-standard-label">Assign To Sales-Executive</InputLabel>
            <Select
              onChange={input}
              label="Assign To Sales-Executive"
              name='assign'
            >
              <MenuItem value="1">Test</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        <div className='element margeTwoField'>
          <TextField type='date' label="Follow Up Date" variant="standard" sx={{ width: '100%' }} focused name='date' onChange={input} />
          <TextField type='time' label="Follow Up Time" variant="standard" sx={{ width: '100%' }} focused name='time' onChange={input} />
        </div>
        <br />
        <div className='element'>
          <TextField label="Remarks" multiline variant="standard" focused sx={{ width: '100%' }} name='remark' onChange={input} />
        </div>
        <br />
        <div className='element margeTwoField'>
          <FormControl variant="standard" sx={{ width: '100%' }} focused>
            <InputLabel id="demo-simple-select-standard-label">CP Access</InputLabel>
            <Select
              onChange={input}
              label="CP Access"
              name='cp_access'
              value={form.cp_access}
            >
              <MenuItem value="1">Yes</MenuItem>
              <MenuItem value="0">No</MenuItem>
            </Select>
          </FormControl>
          {(form.cp_access == '1') ? <FormControl variant="standard" sx={{ width: '100%' }} focused>
            <InputLabel id="demo-simple-select-standard-label">Create Demo MT5</InputLabel>
            <Select
              onChange={input}
              label="Create Demo MT5"
              name='create_demo_mt5'
              value={form.create_demo_mt5}
            >
              <MenuItem value="1">Yes</MenuItem>
              <MenuItem value="0">No</MenuItem>
            </Select>
          </FormControl> : ''}

        </div>
        {/* <br />
        <div className='element margeTwoField'>
          <div className='checkboxSection' style={{ width: '100%' }}>
            <label>Do you want to send project details to Customer?</label>
            <FormControlLabel control={<Checkbox defaultChecked size="small" name='isCustomerSendMail' onChange={input} />} label="Send Mail?" />
          </div>
          <div className='checkboxSection' style={{ width: '100%' }}>
            <label>Please select user type to send SMS.</label>
            <div className='checkbox-group'>
              <FormControlLabel control={<Checkbox defaultChecked size="small" name='isCustomerSendsms' onChange={input} />} label="Client" />
              <FormControlLabel control={<Checkbox size="small" name='isAssignSendsms' onChange={input} />} label="Sales-Executive" />
              <FormControlLabel control={<Checkbox size="small" name='isAdminSendsms' onChange={input} />} label="Admin" />
            </div>
          </div>
        </div> */}
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
                  <p>{leadDetails.customer_name}</p>
                </div>
                <div className='user-details'>
                  <label>Source:</label>
                  <p>{leadDetails.source_id}</p>
                </div>
                <div className='user-details'>
                  <label>Customer Mobile:</label>
                  <p>{leadDetails.customer_mobile}</p>
                </div>
                <div className='user-details'>
                  <label>Customer Email:</label>
                  <p>{leadDetails.customer_email}</p>
                </div>
                <div className='user-details'>
                  <label>Lead Added By:</label>
                  <p>{leadDetails.lead_added_by}</p>
                </div>
                <div className='user-details'>
                  <label>Lead Added:</label>
                  <p>{leadDetails.lead_added}</p>
                </div>
                <div className='user-details'>
                  <label>Current Followup:</label>
                  <p>{leadDetails.followup}</p>
                </div>
                <div className='user-details'>
                  <label>Reference:</label>
                  <p>{leadDetails.reference}</p>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item md={6} lg={6} xl={6} sm={12}>
            <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }} className='pending-all-15px'>
              <p className='view-lead-popup-header-title'>Add New Follow Up</p>
              <div className='margeTwoField element'>
                <TextField type='date' label="Follow Up Date" variant="standard" sx={{ width: '100%' }} name='date' value={newFollowupForm.date} onChange={input1} focused />
                <TextField type='time' label="Follow Up Time" variant="standard" sx={{ width: '100%' }} name='time' value={newFollowupForm.time} onChange={input1} focused />
              </div>
              <br />
              <div className='element'>
                <FormControl variant="standard" sx={{ width: '100%' }} focused>
                  <InputLabel id="demo-simple-select-standard-label">Interest</InputLabel>
                  <Select
                    // value={age}
                    onChange={input1}
                    label="Interest"
                    name='interest'
                    value={newFollowupForm.interest}
                  >
                    <MenuItem value="Very Low">Very Low</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Average">Average</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Very High">Very High</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <br />
              <div className='element'>
                <TextField label="Remarks" multiline variant="standard" focused sx={{ width: '100%' }} name='remark' value={newFollowupForm.remark} onChange={input1} />
              </div>
              <br />
              {/* <div className='checkboxSection' style={{ width: '100%' }}>
                <label>Please select user type to send SMS.</label>
                <div className='checkbox-group'>
                  <FormControlLabel control={<Checkbox defaultChecked size="small" name='isCustomerSendsms' onChange={input1} />} label="Client" />
                  <FormControlLabel control={<Checkbox size="small" name='isAssignSendsms' onChange={input1} />} label="Sales-Executive" />
                  <FormControlLabel control={<Checkbox size="small" name='isAdminSendsms' onChange={input1} />} label="Admin" />
                </div>
              </div>
              <br /> */}
              <div className='popup-add-lead-section'>
                {(newFollowupForm.isLoader) ? <Button className='btn btn-success' disabled><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i></Button> : <Button className='btn btn-success' onClick={addNewFollowup}>Add</Button>}
              </div>
            </Paper>
          </Grid>
          <Grid item md={12} lg={12} xl={12} sm={12}>
            <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
              <p className='view-lead-popup-header-title'>Follow Up History</p>
              <CommonTable url={`${Url}/datatable/fetch_inquiey_master.php`} column={column} sort='0' filter={filterData} refresh={refresh} param={param}/>
            </Paper>
          </Grid>
          {/* <Grid item md={12} lg={12} xl={12} sm={12}>
            <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
              <p className='view-lead-popup-header-title'>Call History</p>
              <CommonTable url={`${Url}/datatable/users_list.php`} column={callColumn} sort='0' filter={filterData} />
            </Paper>
          </Grid> */}
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
      reorder: true,
      wrap: true,
      grow: 0.1,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
    },
    {
      name: 'CUSTOMER',
      selector: row => {
        return <a className='linkColor' title={row.customer} onClick={(event) => gotoProfile(row)}>{row.customer}</a>
      },
      sortable: true,
      reorder: true,
      grow: 1,
      wrap: true,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
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
            name='interest'
            value={row.interest}
            onChange={(e) => changeInterestStatus(e, row)}
          >
            <MenuItem value="Very Low">Very Low</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Average">Average</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Very High">Very High</MenuItem>
          </Select>
        </div>
      },
      reorder: true,
      grow: 1,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
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
            name='assign_to'
            onChange={(e) => changeAssign(e, row)}
          >
            <MenuItem value={row.name}>{row.name}</MenuItem>
          </Select>
        </div>
      },
      reorder: true,
      grow: 1,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
    },
    {
      name: 'Followup Date',
      selector: row => { return <span title={row.followup_date}>{row.followup_date}</span> },
      sortable: true,
      reorder: true,
      grow: 1,
      wrap: true,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
    },
    {
      name: 'Source',
      selector: row => { return <span title={row.source}>{row.source}</span> },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 1,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
    },
    {
      name: 'Next Date',
      selector: row => {
        return <input type='date' className="table-date-picker-border-0" name='next_date' onChange={(e) => changeFollowupDate(e, row)} />
      },
      reorder: true,
      wrap: true,
      grow: 1,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
    },
    {
      name: 'STATUS',
      selector: row => { return <span title={row.leads_status}>{row.leads_status}</span> },
      reorder: true,
      wrap: true,
      grow: 1,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
    },
    {
      name: 'Followup',
      selector: row => {
        return <div>
          <i className="material-icons" onClick={(e) => viewFollowup(row)}>visibility</i>
        </div>
      },
      reorder: true,
      grow: 0.3,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
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
            style={{ color: 'black' }}
          >
            <i className="material-icons">more_horiz</i>
          </Button>
          <Menu
            id={`basic-menu-${row.sr_no}`}
            anchorEl={openTableMenus[row.sr_no]}
            open={Boolean(openTableMenus[row.sr_no])}
            onClose={(event) => handleContextClose(row.sr_no)}
          >
            <MenuItem className='completed' {...row} onClick={(e) => actionMenuPopup(e, row)}><i className="material-icons font-color-approved">task_alt</i>&nbsp;&nbsp;Complete</MenuItem>
            <MenuItem className='not_interested' {...row} onClick={(e) => actionMenuPopup(e, row)}><i className="material-icons font-color-rejected">thumb_down</i>&nbsp;&nbsp;Not Interested</MenuItem>
            <MenuItem className='rejected' {...row} onClick={(e) => actionMenuPopup(e, row)}><i className="material-icons font-color-rejected">cancel</i>&nbsp;&nbsp;Reject</MenuItem>
          </Menu>
        </div>
      },
      ignoreRowClick: true,
      allowOverflow: true,
      grow: 0.5,
      conditionalCellStyles: [
        {
          when: row => row.color == "f4510b",
          style: {
            backgroundColor: '#ffe6e6'
          },
        },
        {
          when: row => row.color == "ff8000",
          style: {
            backgroundColor: '#fff2e6'
          },
        },
        {
          when: row => row.color == "00d5d5",
          style: {
            backgroundColor: '#00d5d5'
          },
        },
        {
          when: row => row.color == "0080ff",
          style: {
            backgroundColor: '#e6ffff'
          },
        },
        {
          when: row => row.color == "25138c",
          style: {
            backgroundColor: '#ebe9fc'
          },
        },
      ]
    }
  ];

  const column = [
    {
      name: 'SR NO',
      selector: row => {
        return <span>{row.sr_no}</span>
      },
      reorder: true,
      grow: 0.1,
    },
    {
      name: 'Interest',
      selector: row => { return <span title={row.followup_status}>{row.followup_status}</span> },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Followup Date',
      selector: row => { return <span title={row.followup_date}>{row.followup_date}</span> },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: 'Remarks',
      selector: row => { return <span title={row.remarks}>{row.remarks}</span> },
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

  const submitForm = async () => {
    console.log(form);
    if (form.customer_name == '') {
      toast.error('Please enter customer name');
    } else if (form.customer_mobile == '') {
      toast.error('Please enter customer mobile');
    } else if (form.customer_email == '') {
      toast.error('Please enter customer email');
    } else if (form.customer_address == '') {
      toast.error('Please enter customer address');
    } else if (form.source_id == '') {
      toast.error('Please select source');
    } else if (form.interest == '') {
      toast.error('Please select interest');
    } else if (form.assign == '') {
      toast.error('Please select Assign To Sales-Executive');
    } else if (form.date == '') {
      toast.error('Please select follow up date');
    } else if (form.time == '') {
      toast.error('Please select follow up time');
    } else if (form.remark == '') {
      toast.error('Please enter remark');
    } else {
      form.isLoader = true;
      setForm({ ...form });
      const param = new FormData();
      /* if (form.faqId == '') {
        param.append('action', 'add_faq');
      } else {
        param.append('faq_id', form.faqId);
        param.append('action', 'update_faq');
      } */
      /* param.append('is_app', 1);
      param.append('AADMIN_LOGIN_ID', 1); */
      param.append('customer_name', form.customer_name);
      param.append('customer_mobile', form.customer_mobile);
      param.append('customer_email', form.customer_email);
      param.append('customer_address', form.customer_address);
      param.append('status_id', form.interest);
      param.append('source_id', form.source_id);
      param.append('source_desc', form.source_desc);
      param.append('lead_assign_user_id', form.assign);
      param.append('followup_date', form.date);
      param.append('followup_time', form.time);
      param.append('cp_access', form.cp_access);
      param.append('demo_mt5', form.create_demo_mt5);
      param.append('remarks', form.remark);
      await axios.post(`${Url}/ajaxfiles/add_inquiry.php`, param).then((res) => {
        form.isLoader = false;
        setForm({ ...form });
        if (res.data.status == 'error') {
          toast.error(res.data.message);
        } else {
          setRefresh(!refresh);
          toast.success(res.data.message);
          setOpen(false);
          setForm({
            customer_name: '',
            customer_mobile: '',
            customer_email: '',
            customer_address: '',
            source_id: '',
            source_desc: '',
            interest: '',
            assign: '',
            date: '',
            time: '',
            remark: '',
            cp_access: '0',
            create_demo_mt5: '0',
            isCustomerSendMail: true,
            isCustomerSendsms: true,
            isAssignSendsms: false,
            isAdminSendsms: false,
            isLoader: false
          });
        }
      });

      /* handleClose();
      toast.success('Lead has been added successfully.'); */
    }
  }

  const input = (event) => {
    var { name, value } = event.target;
    if (event.target.getAttribute) {
      if (event.target.getAttribute('type') == 'checkbox') {
        value = event.target.checked;
      }
    }

    setForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const input1 = (event) => {
    var { name, value } = event.target;
    if (event.target.getAttribute) {
      if (event.target.getAttribute('type') == 'checkbox') {
        value = event.target.checked;
      }
    }

    setNewFollowupForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const changeInterestStatus = (e, data) => {
    console.log(e.target, data);
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>Do you want to change interest status {interest[e.target.value - 1]} ?</p>
            <div className='confirmation-alert-action-button'>
              <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
              <Button variant="contained" className='btn-gradient btn-success'
                onClick={() => {
                  approveInterestStatus(e, data);
                  onClose();
                }}
              >
                Yes, Apply it!
              </Button>
            </div>
          </div>
        );
      }
    });
  }

  const approveInterestStatus = (e, data) => {
    console.log(e.target.value, data);
    toast.success('Interest status has been updated successfully.');
  }

  const changeAssign = (e, data) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>Do you want to change assign sales executive ?</p>
            <div className='confirmation-alert-action-button'>
              <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
              <Button variant="contained" className='btn-gradient btn-success'
                onClick={() => {
                  approvechangeAssign(e, data);
                  onClose();
                }}
              >
                Yes, Apply it!
              </Button>
            </div>
          </div>
        );
      }
    });
  }

  const approvechangeAssign = (e, data) => {
    toast.success('Assign sales executive has been updated successfully.');
  }

  const changeFollowupDate = (e, data) => {
    console.log(e.target.value, data);
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>Do you want to change followup date ?</p>
            <div className='confirmation-alert-action-button'>
              <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
              <Button variant="contained" className='btn-gradient btn-success'
                onClick={() => {
                  approvechangeFollowupDate(e, data);
                  onClose();
                }}
              >
                Yes, Apply it!
              </Button>
            </div>
          </div>
        );
      }
    });
  }

  const approvechangeFollowupDate = (e, data) => {
    console.log(e.target.value, data);
    toast.success('Assign sales executive has been updated successfully.');
  }

  const addNewFollowup = async () => {
    console.log(newFollowupForm);
    const param = new FormData();
    param.append('inquiry_id', newFollowupForm.inquiry_id);
    if (newFollowupForm.date == '') {
      toast.error('Please select followup date');
    } else if (newFollowupForm.time == '') {
      toast.error('Please select followup time');
    } else if (newFollowupForm.interest == '') {
      toast.error('Please select followup interest');
    } else if (newFollowupForm.remark == '') {
      toast.error('Please enter followup remark');
    } else {
      newFollowupForm.isLoader = true;
      setNewFollowupForm({ ...newFollowupForm });
      /* param.append('is_app', 1);
      param.append('AADMIN_LOGIN_ID', 1); */
      param.append('status_id', newFollowupForm.interest);
      param.append('lead_assign_user_id', newFollowupForm.lead_assign_user_id);
      param.append('remarks', newFollowupForm.remark);
      param.append('followup_date', newFollowupForm.date);
      param.append('followup_time', newFollowupForm.time);
      await axios.post(`${Url}/ajaxfiles/add_followup.php`, param).then((res) => {
        newFollowupForm.isLoader = false;
        setNewFollowupForm({ ...newFollowupForm });
        if (res.data.status == 'error') {
          toast.error(res.data.message);
        } else {
          setRefresh(!refresh);
          toast.success(res.data.message);
          setNewFollowupForm({
            date: '',
            time: '',
            interest: '',
            remark: '',
            inquiry_id: '',
            lead_assign_user_id: '',
            isCustomerSendsms: true,
            isAssignSendsms: false,
            isAdminSendsms: false,
            isLoader: false,
          });
        }
      });
      // toast.success('Followup hsa been added successfully.');
    }
  }

  const actionMenuPopup = (e, data) => {
    console.log(e.target.getAttribute('class'));
    console.log(e.target.classList.contains('reject'));
    handleContextClose(data.sr_no);
    if (e.target.classList.contains('not_interested')) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Are you sure?</h1>
              <p>Do you want to not interest this?</p>
              <div className='confirmation-alert-action-button'>
                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                <Button variant="contained" className='btn-gradient btn-danger'
                  onClick={() => {
                    changeLeadStatus('not_interested', data);
                    onClose();
                  }}
                >
                  Yes, Not Interested it!
                </Button>
              </div>
            </div>
          );
        }
      });
    } else if (e.target.classList.contains('completed')) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Are you sure?</h1>
              <p>Do you want to completed this?</p>
              <div className='confirmation-alert-action-button'>
                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                <Button variant="contained" className='btn-gradient btn-success'
                  onClick={() => {
                    changeLeadStatus('completed', data);
                    onClose();
                  }}
                >
                  Yes, Completed it!
                </Button>
              </div>
            </div>
          );
        }
      });
    } else if (e.target.classList.contains('rejected')) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Are you sure?</h1>
              <p>Do you want to rejected this?</p>
              <div className='confirmation-alert-action-button'>
                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                <Button variant="contained" className='btn-gradient btn-danger'
                  onClick={() => {
                    changeLeadStatus('rejected', data);
                    onClose();
                  }}
                >
                  Yes, Rejected it!
                </Button>
              </div>
            </div>
          );
        }
      });
    }

    // setOpen(true);
  };

  const changeLeadStatus = async (status, data) => {
    console.log(status, data);
    const param = new FormData();
    param.append('inquiry_id', data.inquiry_id);
    if (status == 'not_interested') {
      param.append('leads_status', 2);
    } else if (status == 'completed') {
      param.append('leads_status', 1);
    } else if (status == 'rejected') {
      param.append('leads_status', 3);
    }
    /* param.append('is_app', 1);
    param.append('AADMIN_LOGIN_ID', 1); */
    await axios.post(`${Url}/ajaxfiles/update_lead_status.php`, param).then((res) => {
      if (res.data.status == 'error') {
        toast.error(res.data.message);
      } else {
        setRefresh(!refresh);
        toast.success(res.data.message);
      }
    });
  }

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className='main-heading'>Leads List</p>

                <CommonFilter search={searchBy} searchWord={setSearchKeyword} />
                <br />
                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                  <div className='lead actionGroupButton'>
                    <div className='export-import-buttons'>
                      <a href={`data:text/csv;charset=utf-8,${escape(csvData)}`} className='btn-export-style' download="lead.csv">
                        <i className="material-icons">cloud_download</i>&nbsp;Export
                      </a>
                      <label htmlFor="contained-button-file" className='fileuploadButton'>
                        <input accept=".csv" id="contained-button-file" type="file" />
                        <Button variant="contained" component="span">
                          <i className="material-icons">backup</i>&nbsp;Import
                        </Button>
                      </label>
                    </div>
                    <Button variant="contained" onClick={handleClickOpen} className='addLead'>Add</Button>
                    {/* <Button variant="contained">Add IB</Button>
                    <Button variant="contained">All</Button> */}
                  </div>
                  <br />
                  {/* <CommonTable url={`${Url}/datatable/users_list.php`} column={depositColumn} sort='0' refresh={refresh} filter={filterData} search={searchBy} searchWord={searchKeyword} /> */}
                  <CommonTable url={`${Url}/datatable/fetch_lead.php`} column={depositColumn} sort='0' refresh={refresh} filter={filterData} search={searchBy} searchWord={searchKeyword} />
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