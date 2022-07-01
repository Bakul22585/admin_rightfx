import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IsApprove, Url } from "../global";
import { Button, Collapse, Grid, Paper, Switch } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import './setting.css';

const MenuItem = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState({
        operation: false,
        trading: false,
        platforms: false,
        contests: false,
    });
    const [data, setData] = useState([]);
    toast.configure();

    const handleClick = (e) => {
        const name = e.target.classList[0];
        if (name.startsWith("menu-")) {
            setOpen((preValue) => {
                return {
                    ...preValue,
                    [name]: !open[name],
                };
            });
        }
    };

    const getViewAllMenu = () => {
        const param = new FormData();
        if (IsApprove !== "") {
            param.append("is_app", IsApprove.is_app);
            param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
        }
        param.append("action", "view_menu_list");
        axios.post(Url + "/ajaxfiles/menu_manage.php", param).then((res) => {
            if (res.data["status"] == "error" && res.data["message"] == "Session has been expired") {
                localStorage.setItem("login", true);
                navigate("/");
            }
            if (res.data.status == "error") {
                toast.error(res.data.message);
            } else {
                setData(res.data.data);
            }
        });
    }

    useEffect(() => {
        getViewAllMenu();
    }, [])

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className="main-heading">Menu Item</p>
                                <Paper
                                    elevation={2}
                                    style={{ borderRadius: "10px" }}
                                    className="pending-all-15px"
                                >
                                    <div className="create-role-content-section">
                                        <div className="createMenuItemButtonEnd">
                                            <Button
                                                variant="contained"
                                                className="btn btn-success"
                                            >
                                                Add Main Menu
                                            </Button>
                                        </div>
                                        {/* <div className="input-section">
                      <input
                        type="text"
                        className="create-role-input"
                        placeholder="Role Name"
                        name="name"
                        value={form.name}
                        onChange={input}
                      />
                    </div>
                    <div className="input-section">
                      <input
                        type="text"
                        className="create-role-input"
                        placeholder="Role Description"
                        name="description"
                        value={form.description}
                        onChange={input}
                      />
                    </div>
                    <div className="input-section">
                      <label>All <small>(select/unselect)</small></label>
                      <Switch
                      onChange={(e) => {
                        data.forEach((element) => {
                          element.active = e.target.checked;
                          element.sub_menu_list.forEach((subMenu) => {
                            subMenu.active = e.target.checked;
                          });
                        });
                        setData([...data]);
                      }}
                    />
                    </div> */}
                                        {/* <br/> */}
                                        <ul className="role-management-section">
                                            {data.map((item, index) => {
                                                return (
                                                    <li className="main-menu-section">
                                                        <a
                                                            className={`menu-${index} ${open[`menu-${index}`] ? "active" : ""
                                                                }`}
                                                            onClick={handleClick}
                                                        >
                                                            <div>
                                                                <i className={`menu-${index} ${open[`menu-${index}`] ? "active" : ""} material-icons`} onClick={handleClick}>
                                                                    {item.icon_class}
                                                                </i>
                                                                <span className={`menu-${index} ${open[`menu-${index}`] ? "active" : ""
                                                                    }`} onClick={handleClick}>{item.menu_name} <small>({item.menu_label})</small> {(item.description == "" || item.description == null) ? "" : "- " + item.description} </span>
                                                            </div>

                                                            <div>
                                                                <Switch
                                                                    checked={item.active ? item.active : false}
                                                                    onChange={(e) => {
                                                                        item.active = e.target.checked;
                                                                        item.sub_menu_list.forEach((element) => {
                                                                            element.active = e.target.checked;
                                                                        });
                                                                        setData([...data]);
                                                                    }}
                                                                />
                                                                {item.sub_menu_list.length > 0 ? (
                                                                    <span
                                                                        className={`menu-${index} ${open[`menu-${index}`] ? "active" : ""} sidebar-icon-indicator`}
                                                                        onClick={handleClick}
                                                                    >
                                                                        {open[`menu-${index}`] ? (
                                                                            <ExpandMore />
                                                                        ) : (
                                                                            <ExpandLess />
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </a>

                                                        {item.sub_menu_list.length > 0 ? (
                                                            <Collapse
                                                                in={open[`menu-${index}`]}
                                                                timeout="auto"
                                                                unmountOnExit
                                                            >
                                                                <ul className="sub-menu-section">
                                                                    {item.sub_menu_list.map((subMenu) => {
                                                                        return (
                                                                            <li className={`sub-menu ${(subMenu.menu_label == "Permission") ? "permission" : ""}`}>
                                                                                <span className="sub-menu-title">{subMenu.menu_name} <small>({subMenu.menu_label})</small>  {(subMenu.description == "" || subMenu.description == null) ? "" : "- " + subMenu.description}</span>
                                                                                <Switch checked={subMenu.active ? subMenu.active : false} onChange={(e) => {
                                                                                    subMenu.active = e.target.checked;
                                                                                    // setData([...data]);
                                                                                    var activeMenu = item.sub_menu_list.filter((x) => x.active == true);
                                                                                    if (activeMenu.length > 0) {
                                                                                        item.active = true;
                                                                                    } else {
                                                                                        item.active = false;
                                                                                    }
                                                                                    setData([...data]);
                                                                                }} />
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            </Collapse>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuItem;