import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo1 from "./logo1.png";
import "./sidebar.css";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IsApprove, Url, UserInfo } from "../global";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { useTranslation } from "react-i18next";
// import Dashboard from "./Dashboard.svg"
const style = {
  margin: "0 10px 0 0",
};
const Sidebar = (prop) => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [open, setOpen] = React.useState({
    operation: false,
    trading: false,
    platforms: false,
    contests: false,
    staff: false,
  });
  const CloseSidebar = () => {
    prop.setSidebar(false);
  };
  const handleClick = (e) => {
    const name = e.target.classList[0];
    if (name == "logout") {
      localStorage.setItem("login", true);
      prop.setLogin("true");
      navigate("/login");
    } else {
      setOpen((preValue) => {
        return {
          // ...preValue,
          [name]: !open[name],
        };
      });
    }
  };

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getSidebarMenu = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "sidebar_menus");
    axios.post(`${Url}/ajaxfiles/menu_manage.php`, param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        setMenuData([...res.data.data]);
      }
    });
  };

  useEffect(() => {
    getSidebarMenu();
  }, []);

  return (
    <div
      className={`main-sidebar-content  ${
        isSidebarOpen ? "sidebar-with-4rem" : ""
      }`}
    >
      <div className={`app-sidebar app-sidebar--light app-sidebar--shadow`}>
        <div className="app-sidebar--header">
          <div className="app-sidebar-logo">
            <a className="app-sidebar-logo" title="RightFx">
              <div className="py-2">
                <img
                  src={logo1}
                  style={{ width: "144px" }}
                  className="open-sidebar-logo-image"
                />
                <img
                  src="./assets/img/favicon.png"
                  className="close-sidebar-logo-image"
                />
              </div>
            </a>
          </div>
          <Button
            className="navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn is-active"
            onClick={CloseSidebar}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </Button>
        </div>
        {isSidebarOpen ? (
          <Button
            title="Collapse Sidebar"
            className="collapse-sidebar-open-close"
            onClick={handleSidebar}
          >
            <i className="material-icons">adjust</i>
          </Button>
        ) : (
          <Button
            title="Expand Sidebar"
            className="sidebar-open-close"
            onClick={handleSidebar}
          >
            <i className="material-icons">sync_alt</i>
          </Button>
        )}

        <div className="app-sidebar--content">
          <div>
            <div className="sidebar-navigation">
              <ul className="pt-2">
                {menuData.map((item, index) => {
                  return item.sub_menu_list.length > 0 ? (
                    <li>
                      <a
                        className={`menu-${index} ${
                          open[`menu-${index}`] ? "active" : ""
                        }`}
                        onClick={handleClick}
                      >
                        <span className="material-icons" style={style}>
                          {item.icon_class}
                        </span>
                        {item.menu_name}
                        <span className="sidebar-icon-indicator">
                          {open[`menu-${index}`] ? (
                            <ExpandMore />
                          ) : (
                            <ExpandLess />
                          )}
                        </span>
                      </a>
                      <Collapse
                        in={open[`menu-${index}`]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <ul>
                          {item.sub_menu_list.map((subMenu) => {
                            return (
                              <li>
                                <NavLink
                                  to={`/${subMenu.menu_url}`}
                                  onClick={CloseSidebar}
                                >
                                  {subMenu.menu_name}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </Collapse>
                    </li>
                  ) : (
                    <li>
                      <NavLink
                        className="nav-link-simple"
                        to={`/${item.menu_url}`}
                        onClick={CloseSidebar}
                      >
                        <span className="material-icons" style={style}>
                          {item.icon_class}
                        </span>
                        {item.menu_name}
                      </NavLink>
                    </li>
                  );
                })}
                {/* <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/dashboard"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      dashboard
                    </span>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <a
                    className={`staff ${open.staff ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      list_alt
                    </span>
                    Staff
                    <span className="sidebar-icon-indicator">
                      {open.staff ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.staff} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/employees" onClick={CloseSidebar}>
                          Employees
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/role_management" onClick={CloseSidebar}>
                          Role Management
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/client_list"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      view_list
                    </span>
                    Client List
                  </NavLink>
                </li>
                <li>
                  <a
                    className={`leads ${open.leads ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      list_alt
                    </span>
                    Lead
                    <span className="sidebar-icon-indicator">
                      {open.leads ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.leads} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/leads_list" onClick={CloseSidebar}>
                          Leads List
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/reminder" onClick={CloseSidebar}>
                          Reminder
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <a
                    className={`kyc ${open.kyc ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      admin_panel_settings
                    </span>
                    KYC
                    <span className="sidebar-icon-indicator">
                      {open.kyc ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.kyc} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/pending_kyc" onClick={CloseSidebar}>
                          Pending
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/history_kyc" onClick={CloseSidebar}>
                          History
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <a
                    className={`ibManagement ${open.ibManagement ? "active" : ""
                      }`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      engineering
                    </span>
                    IB Management
                    <span className="sidebar-icon-indicator">
                      {open.ibManagement ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.ibManagement} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/commision_group" onClick={CloseSidebar}>
                          Commision Group
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/list_request" onClick={CloseSidebar}>
                          IB Requests List
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/Deposit"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      add
                    </span>
                    Deposit
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/Withdrawal"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      file_upload
                    </span>
                    Withdrawal
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/ib_withdraw"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      file_upload
                    </span>
                    IB Withdraw
                  </NavLink>
                </li>
                <li>
                  <a
                    className={`pamm ${open.pamm ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      soap
                    </span>
                    Pamm
                    <span className="sidebar-icon-indicator">
                      {open.pamm ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.pamm} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/pamm_dashboard" onClick={CloseSidebar}>
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pamm_user_management"
                          onClick={CloseSidebar}
                        >
                          User Management
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pamm_mm_management"
                          onClick={CloseSidebar}
                        >
                          MM Management
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/pamm_investor_request"
                          onClick={CloseSidebar}
                        >
                          Investor Requests
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/pamm_activity_log" onClick={CloseSidebar}>
                          Activity Log
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <a
                    className={`marketing ${open.marketing ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      link
                    </span>
                    Marketing
                    <span className="sidebar-icon-indicator">
                      {open.marketing ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.marketing} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/link" onClick={CloseSidebar}>
                          Link
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/Salesman" onClick={CloseSidebar}>
                          Salesman
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <a
                    className={`trading ${open.trading ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      auto_graph
                    </span>
                    Reports
                    <span className="sidebar-icon-indicator">
                      {open.trading ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.trading} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/basic_report" onClick={CloseSidebar}>
                          All In One Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/basic_ib_report" onClick={CloseSidebar}>
                          All In One IB Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/deposit_report" onClick={CloseSidebar}>
                          Deposit
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/withdraw_report" onClick={CloseSidebar}>
                          Withdraw
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/mt5_bonus" onClick={CloseSidebar}>
                          MT5 Bonus
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/position" onClick={CloseSidebar}>
                          Position
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/trade_history" onClick={CloseSidebar}>
                          Trade History
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/ib_commision_report"
                          onClick={CloseSidebar}
                        >
                          IB Commision
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/user_profit_and_loss"
                          onClick={CloseSidebar}
                        >
                          User Profit & Loss
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/sales_incentive" onClick={CloseSidebar}>
                          Sales Incentive
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/sales_report" onClick={CloseSidebar}>
                          Sales Report
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <a
                    className={`platforms ${open.platforms ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      auto_graph
                    </span>
                    Admin Accounts
                    <span className="sidebar-icon-indicator">
                      {open.platforms ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.platforms} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/ib_commisions" onClick={CloseSidebar}>
                          IB Commisions
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/faq_editor"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      border_color
                    </span>
                    FAQ Editor
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/activity_log"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      list_alt
                    </span>
                    Activity Log
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/notification"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      ballot
                    </span>
                    Notification
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/ticket"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      receipt_long
                    </span>
                    Ticket
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/currency_rate"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      calculate
                    </span>
                    Currency Rate
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/popup_image"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      dashboard
                    </span>
                    Popup Image
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link-simple "
                    to="/setting"
                    onClick={CloseSidebar}
                  >
                    <span className="material-icons" style={style}>
                      settings
                    </span>
                    Settings
                  </NavLink>
                </li>
                <li>
                  <a
                    className={`menu_setting ${open.menu_setting ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      room_preferences
                    </span>
                    Menu Setting
                    <span className="sidebar-icon-indicator">
                      {open.menu_setting ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.menu_setting} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/menu_item" onClick={CloseSidebar}>
                          Menu Items
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/change_menu_order" onClick={CloseSidebar}>
                          Change Menu Order
                        </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <a
                    className={`logout ${open.logout ? "active" : null}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      power_settings_new
                    </span>
                    Logout
                  </a>
                </li> */}
              </ul>
            </div>
            <div
              className="ps__rail-x"
              style={{ left: "0px", bottom: "-288px" }}
            >
              <div
                className="ps__thumb-x"
                tabIndex="0"
                style={{ left: "0px", width: "0px" }}
              ></div>
            </div>
            <div
              className="ps__rail-y"
              style={{ top: "300px", right: "-288px", height: "64" }}
            >
              <div
                className="ps__thumb-xy"
                tabIndex="0"
                style={{ top: "60px", height: "5px" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {prop.cside ? (
        <div
          className="app-sidebar-overlay is-active"
          onClick={() => prop.setSidebar(false)}
        ></div>
      ) : (
        ""
      )}
      {/* <div className="app-sidebar-overlay is-active" onClick={()=>setSidebar(false)}></div> */}
    </div>
  );
};

export default Sidebar;
