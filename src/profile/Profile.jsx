import './profile.css';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { FormControl, Grid, MenuItem, Select, Menu, Tabs, Tab, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import CustomImageModal from '../common/CustomImageModal';
import CommonTable from '../common/CommonTable';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from '@mui/system';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@emotion/react';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        className='panding-left-right-0'
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

const Profile = () => {

    const theme = useTheme();
    const { id } = useParams();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    console.log(id);
    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <div className='client-detail-header'>
                                    <div className='client-name'>
                                        <label>test IB</label>
                                        <p>CU96331414</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Created On</label>
                                        <p>March 21st 2022, 4:13 pm</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Total Accounts</label>
                                        <p>0</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Account Currency</label>
                                        <p>USD</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Balance</label>
                                        <p>$ 0.00</p>
                                    </div>
                                    <div className='header-highlight'>
                                        <label>Sales Agent</label>
                                        <p>Not Assigned</p>
                                    </div>
                                </div>
                                <br />
                                {/* <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}> */}
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="scrollable auto tabs example"
                                    className='tabsBar'
                                >
                                    <Tab label="PROFILE PAGE" />
                                    <Tab label="BANK DETAILS" />
                                    <Tab label="DOCUMENTS" />
                                    <Tab label="ACCOUNTS" />
                                    <Tab label="ACTIVITIES" />
                                    <Tab label="LOGS" />
                                    <Tab label="TRANSACTIONS" />
                                    <Tab label="REFERRALS" />
                                    <Tab label="PARTNERSHIP" />
                                    <Tab label="STATEMENT" />
                                </Tabs>
                                <SwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={value}
                                    onChangeIndex={handleChangeIndex}
                                >
                                    <TabPanel value={value} index={0} dir={theme.direction}>
                                        <Grid container className='grid-handle'>
                                            <Grid item md={8} lg={8} xl={8}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                                    <p className='header-title'>General Information</p>
                                                    <div className='contentSection'>
                                                        <div className='element'>
                                                            
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={3} lg={3} xl={3}>
                                                <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                                    <p className='header-title'>Quick Actions</p>
                                                    <div className='contentSection'>
                                                        <p className='group-header'>Trading Account</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained">Create MT5</Button>
                                                            <Button variant="contained" disabled>MT5 Access</Button>
                                                            <Button variant="contained" disabled>Link MT5</Button>
                                                            <Button variant="contained" disabled>Reset MT5</Button>
                                                            <Button variant="contained" disabled>Change Leverage</Button>
                                                        </div>
                                                        <br/>
                                                        <p className='group-header'>IB</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained">Add Master Structure</Button>
                                                            <Button variant="contained">Add Shared Structure</Button>
                                                            <Button variant="contained" disabled>Link Client</Button>
                                                            <Button variant="contained">Link To IB</Button>
                                                            <Button variant="contained" disabled>Unlink IB</Button>
                                                        </div>
                                                        <br/>
                                                        <p className='group-header'>Communication</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained">Send Email</Button>
                                                        </div>
                                                        <br/>
                                                        <p className='group-header'>Client Portal</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained">CP Access</Button>
                                                            <Button variant="contained">View CP Pasword</Button>
                                                        </div>
                                                        <br/>
                                                        <p className='group-header'>Misc.</p>
                                                        <div className='mt5btngroup'>
                                                            <Button variant="contained">Download Application</Button>
                                                            <Button variant="contained">Add Note</Button>
                                                            <Button variant="contained">Add Bank</Button>
                                                            <Button variant="contained">Add Transaction</Button>
                                                        </div>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>
                                        Item 2
                                    </TabPanel>
                                    <TabPanel value={value} index={2} dir={theme.direction}>
                                        Item 3
                                    </TabPanel>
                                    <TabPanel value={value} index={3} dir={theme.direction}>
                                        Item 4
                                    </TabPanel>
                                    <TabPanel value={value} index={4} dir={theme.direction}>
                                        Item 5
                                    </TabPanel>
                                    <TabPanel value={value} index={5} dir={theme.direction}>
                                        Item 6
                                    </TabPanel>
                                    <TabPanel value={value} index={6} dir={theme.direction}>
                                        Item 7
                                    </TabPanel>
                                    <TabPanel value={value} index={7} dir={theme.direction}>
                                        Item 8
                                    </TabPanel>
                                    <TabPanel value={value} index={8} dir={theme.direction}>
                                        Item 9
                                    </TabPanel>
                                    <TabPanel value={value} index={9} dir={theme.direction}>
                                        Item 10
                                    </TabPanel>
                                </SwipeableViews>
                                {/* </Box> */}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile