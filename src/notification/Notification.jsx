import "./notification.css";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Button,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from "../common/CommonFilter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Notification = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [withoutButton, setWithoutButton] = useState([])
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchBy, setSearchBy] = useState([
    {
      'label': 'DESCRIPTION',
      'value': false,
      'name': 'description'
    }
  ]);
  const [page, setPage] = useState({
    index: "",
    totalPage: 0
  });
  const [param, setParam] = useState("");
  const loader = useRef(null);
  var entriys = 0;
  useEffect(() => {
    fatchdata();
  }, []);
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      console.log("page", page);
      if (page.totalPage - 10 > page.index) {
        fatchdata(page.index + 10);
      }
    }
  }, []);
  useEffect(() => {
    fatchdata(page.index, param.start_date, param.end_date, searchKeyword);
  }, [param, searchKeyword]);

  const makeAsRead = async (item, index) => {
    // toast.error(item)
    console.log(item)
    const param = new FormData();
    /* param.append("is_app", 1);
    param.append("AADMIN_LOGIN_ID", 1); */
    param.append("action", "mark_as_read");
    param.append("id", item.notification_id.index);
    await axios.post(`${Url}/ajaxfiles/notification_manage.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        setWithoutButton((prev) => [item, ...prev])
        toast.success(res.data.message);
        setData(
          data.filter(
            (v, i) => i !== index
          )
        );
      }
    });
  }
  console.log("withoutButton", withoutButton)

  const fatchdata = async (start = 0, start_date = '', end_date = '', search = '') => {
    console.log(start);
    // entriys = start;
    // page = start;
    page.index = start;
    setPage({ ...page });
    console.log("api page", page);
    const param = new FormData();
    /* param.append("is_app", 1);
    param.append("AADMIN_LOGIN_ID", 1); */
    param.append("draw", 1);
    param.append("start", start);
    param.append("length", 10);
    if (start_date != "") {
      param.append("start_date", start_date);
    }

    if (end_date != "") {
      param.append("start_date", end_date);
    }

    if (search != "") {
      param.append("description", search);
    }
    param.append("action", "list_notifications");
    await axios
      .post(`${Url}/datatable/notification_list.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          page.totalPage = res.data.iTotalRecords
          setPage({ ...page })
          //   setData(...data,res.data.aaData);
          setData((prev) => [...prev, ...res.data.aaData]);
        }
      });
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    console.log("page kjdlkjasdg");
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  toast.configure();
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className="main-heading">Notification</p>
                <CommonFilter search={searchBy} searchWord={setSearchKeyword} setParam={setParam}/>
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CardContent className="py-3">
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={12} lg={12}>
                        <div className="notification-section">
                          {data.map((item, index) => {
                            return (
                              <>
                                <div className="notification-element">
                                  <label>{item.description}</label>
                                  {item.is_read == 0 ? <Button
                                    variant="contained"
                                    className="btn-success"
                                    onClick={(e) => makeAsRead(item, index)}
                                  >
                                    Mark as Read
                                  </Button> : ""}
                                </div>
                              </>
                            );
                          })}

                          {withoutButton.map((item, index) => {
                            return (
                              <>
                                <div className="notification-element">
                                  <label>{item.description}</label>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <div ref={loader} />
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
  );
};

export default Notification;
