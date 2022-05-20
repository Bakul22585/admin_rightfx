import './notification.css';
import React, { useEffect } from "react";
import { Button, CardContent, FormControl, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../global";
import axios from "axios";
const Notification = () => {
    useEffect(()=>{
        fatchdata()
    },[])

       const fatchdata=async()=>{
        const param = new FormData();
        param.append("is_app", 1);
        param.append("AADMIN_LOGIN_ID", 1);
        param.append("draw", 1);
        param.append("start", 1);
        param.append("length", 10);
        param.append("action", "list_notifications");
        await axios.post(`${Url}/datatable/notification_list.php`, param).then((res) => {
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            // setPreview(res.data.popup_image);
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
                                <p className='main-heading'>Notification</p>
                                <CommonFilter />
                                <br/>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <div className='notification-section'>
                                                    <div className='notification-element'>
                                                        <label>Admin deposited $10 into User: Harishbhai Baraiya at 2022-04-28 15:14:32</label>
                                                        <Button variant="contained" className='btn-success'>Mark as Read</Button>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <label>Admin deposited $10 into User: Harishbhai Baraiya at 2022-04-28 15:14:32</label>
                                                        <Button variant="contained" className='btn-success'>Mark as Read</Button>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <label>Admin deposited $10 into User: Harishbhai Baraiya at 2022-04-28 15:14:32</label>
                                                        <Button variant="contained" className='btn-success'>Mark as Read</Button>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <label>Admin deposited $10 into User: Harishbhai Baraiya at 2022-04-28 15:14:32</label>
                                                        <Button variant="contained" className='btn-success'>Mark as Read</Button>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <label>Admin deposited $10 into User: Harishbhai Baraiya at 2022-04-28 15:14:32</label>
                                                        <Button variant="contained" className='btn-success'>Mark as Read</Button>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <label>Admin deposited $10 into User: Harishbhai Baraiya at 2022-04-28 15:14:32</label>
                                                        <Button variant="contained" className='btn-success'>Mark as Read</Button>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <label>Admin deposited $10 into User: Harishbhai Baraiya at 2022-04-28 15:14:32</label>
                                                        <Button variant="contained" className='btn-success'>Mark as Read</Button>
                                                    </div>
                                                    <div className='notification-element'>
                                                        <label>Admin deposited $10 into User: Harishbhai Baraiya at 2022-04-28 15:14:32</label>
                                                        <Button variant="contained" className='btn-success'>Mark as Read</Button>
                                                    </div>
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

export default Notification