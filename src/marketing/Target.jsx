import { Button, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Url } from '../global';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import './link.css';

const Target = () => {

    const navigate = useNavigate();
    var [salesPerson, setSalesPerson] = useState({});
    const [form, setForm] = useState({
        sales_person_ac_target: '',
        sales_person_money_in: '',
        isLoder: false
    });
    toast.configure();

    const getTarget = async () => {
        const param = new FormData();
        // param.append("is_app", 1);
        // param.append("AADMIN_LOGIN_ID", 1);
        // param.append("user_id", id);
        param.append("action", "get_target");
        await axios
            .post(Url + "/ajaxfiles/campaign_manage.php", param)
            .then((res) => {
                if (res.data.message == "Session has been expired") {
                    localStorage.setItem("login", true);
                    navigate("/");
                }

                if (res.data.status == "error") {
                    toast.error(res.data.message);
                } else {
                    salesPerson = res.data.sales_person_target;
                    setSalesPerson({ ...salesPerson });
                    console.log('source master list', salesPerson);
                    setForm({
                        sales_person_ac_target: res.data.sales_person_target.sales_person_ac_target,
                        sales_person_money_in: res.data.sales_person_target.sales_person_money_in
                    });
                }
            });
    }

    const submit = async () => {
        if (form.sales_person_ac_target == "") {
            toast.error("Please enter sales person account target");
        } else if (form.sales_person_money_in == "") {
            toast.error("Please enter sales person money in");
        } else {
            form.isLoder = true;
            setForm({ ...form });
            const param = new FormData();
            // param.append("is_app", 1);
            // param.append("AADMIN_LOGIN_ID", 1);
            // param.append("user_id", id);
            param.append("action", "set_target");
            param.append("sales_person_ac_target", form.sales_person_ac_target);
            param.append("sales_person_money_in", form.sales_person_money_in);
            await axios
                .post(Url + "/ajaxfiles/campaign_manage.php", param)
                .then((res) => {
                    if (res.data.message == "Session has been expired") {
                        localStorage.setItem("login", true);
                        navigate("/");
                    }
                    form.isLoder = false;
                    setForm({ ...form });
                    if (res.data.status == "error") {
                        toast.error(res.data.message);
                    } else {
                        toast.success(res.data.message);
                    }
                });
        }
    }

    const input = (e) => {
        const {name, value} = e.target;

        setForm((prevalue) => {
            return {
              ...prevalue,
              [name]: value,
            };
        })
    }

    useEffect(() => {
        getTarget();
    }, [])

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Target</p>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <Grid container spacing={3} className="grid-handle">
                                        <Grid item md={12} lg={12} xl={12}>
                                            <Paper
                                                elevation={2}
                                                style={{ borderRadius: "10px" }}
                                                className="paper-main-section partnership-main-section">
                                                <div className='table-header-section'>
                                                    <label>Name</label>
                                                    <label>Account Target</label>
                                                    <label>Money In</label>
                                                </div>
                                                <div className='table-body-section'>
                                                    <span>Sales Person</span>
                                                    <div>
                                                        <input type="number" onChange={input} name="sales_person_ac_target" min="1" max="100" placeholder='Target' value={form.sales_person_ac_target} />
                                                    </div>
                                                    <div>
                                                        <input type="number" onChange={input} name="sales_person_money_in" min="1" placeholder='Money In' value={form.sales_person_money_in} />
                                                    </div>
                                                </div>
                                                <div className='button-center'>
                                                    {
                                                        (form.isLoder) ?
                                                            <Button
                                                                size="large"
                                                                className="createMt5Formloder"
                                                                disabled
                                                            >
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
                                                            </Button> : <Button
                                                                variant="contained"
                                                                className="add_master_structure"
                                                                onClick={submit}>
                                                                Save
                                                            </Button>
                                                    }

                                                </div>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Target