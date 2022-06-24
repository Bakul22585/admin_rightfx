import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { Url } from "../global";
import { Button, CardContent, Grid, Paper } from "@mui/material";
import "./pamm.css";

const PammDashboard = () => {
  const navigate = useNavigate();
  var [resData, setResData] = useState({});
  toast.configure();

  const dashboardData = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
    }
    axios.post(Url + "/ajaxfiles/pamm/dashboard.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        resData = res.data;
        setResData({ ...resData });
        console.log("resData", resData);
      }
    });
  };

  useEffect(() => {
    dashboardData();
  }, []);

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className="main-heading">Pamm Dashboard</p>
                <Grid container spacing={2}>
                  <Grid item sm={12} md={6} lg={6}>
                    <div className="setBoxs">
                      <div className="row1 boxSection">
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <NavLink to="/pamm_user_management">
                              <div className="col s12 m12 text-align-center">
                                <h5 className="mb-0">
                                  {resData.total_pamm_user}
                                </h5>
                                <p className="no-margin">Total Client</p>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                      <div className="row1 boxSection">
                        <div className="card padding-9 animate fadeLeft boxsize">
                          <div className="row">
                            <NavLink to="/pamm_mm_management">
                              <div className="col s12 m12 text-align-center">
                                <h5 className="mb-0">
                                  {resData.total_pamm_manager == null
                                    ? "0"
                                    : resData.total_pamm_manager}
                                </h5>
                                <p className="no-margin">Total Manager</p>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={12} md={6} lg={6}>
                    <Paper
                      elevation={2}
                      style={{ borderRadius: "10px" }}
                      className="paper-main-section"
                    >
                      <div className="headerSection header-title">
                        <p className="margin-0">Latest Members</p>
                        <span className="new-pamm-member-count">
                          {resData.recent_pamm_users
                            ? resData.recent_pamm_users.length
                            : "0"}{" "}
                          New Member
                        </span>
                      </div>
                      <div className="new-pamm-member-section">
                        {resData.recent_pamm_users
                          ? resData.recent_pamm_users.map((item) => {
                              return (
                                <div className="new-pamm-member-element">
                                  <label>{item.name}</label>
                                  <span>{item.user_added_datetime}</span>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                      {resData.recent_pamm_users ? (
                        <div className="footer-section">
                          <NavLink to="/pamm_user_management">
                            View All Users
                          </NavLink>
                        </div>
                      ) : (
                        ""
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PammDashboard;
