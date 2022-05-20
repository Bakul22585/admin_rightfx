import './currency_rate.css';
import React, { useState ,useEffect} from "react";
import { Button, CardContent, FormControl, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../global";
import axios from "axios";

const CurrencyRate = () => {
    const [loader, setLoader] = useState(false);
    const [data,setData]=useState({
        deposit_rate:"",
        withdrawal_rate:""
    })
    useEffect(() => {
        fatchimage();
      }, []);
    const onChange=(event)=>{
        const { name, value } = event.target;
        setData((prevalue) => {
            return {
                ...prevalue,
                [name]: value,
            }})
    }


    const fatchimage = async() => {
        const param = new FormData();
        param.append("is_app", 1);
        param.append("AADMIN_LOGIN_ID", 1);
        param.append("action", "currency_rate");
        await axios.post(`${Url}/ajaxfiles/common_api.php`, param).then((res) => {
          if (res.data.status == "error") {
            toast.error(res.data.message);
          }else{
              setData({
                deposit_rate:res.data.deposit_rate,
                withdrawal_rate:res.data.withdrawal_rate
              })
          }
        });
      };
    //   useState

const onSubmit=async()=>{
    if(!data.deposit_rate){
toast.error("Deposit rate is requied")
    }else if(!data.withdrawal_rate){
        toast.error("withdrawal rate is requied")
    }else{
        setLoader(true)
        const param = new FormData();
        param.append("is_app", 1);
        param.append("AADMIN_LOGIN_ID", 1);
        param.append("action", "update_rate");
        param.append("deposit_rate", data.deposit_rate);
        param.append("withdrawal_rate", data.withdrawal_rate);
        await axios.post(`${Url}/ajaxfiles/currency_manage.php`, param).then((res) => {
          if (res.data.status == "error") {
            toast.error(res.data.message);
            setLoader(false)
          } else {
              toast.success(res.data.message)
              setLoader(false)
          }
        });
    }
}
    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Currency Rate</p>

                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                                <div className='input-section'>
                                                    <TextField label="Deposit Rate" value={data.deposit_rate} variant="standard" sx={{ width: '100%' }} name='deposit_rate' type='number' onChange={onChange}/>
                                                </div>
                                                <br/>
                                                <div className='input-section'>
                                                    <TextField label="Withdrawal Rate" value={data.withdrawal_rate} variant="standard" sx={{ width: '100%' }} name='withdrawal_rate' type='number' onChange={onChange} />
                                                </div>
                                                <br/>
                                                <div className='action-button-section'>
                                                {loader == true ? (
                            <Button  disabled className="popdisableimage" >
                              <svg class="spinner" viewBox="0 0 50 50">
                                <circle
                                  class="path"
                                  cx="25"
                                  cy="25"
                                  r="20"
                                  fill="none"
                                  stroke-width="5"
                                ></circle>
                              </svg>
                            </Button>
                          ) : (
                            <Button variant="contained" className='btn-success' onClick={onSubmit}>Update</Button>
                          )}
                                                   
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

export default CurrencyRate