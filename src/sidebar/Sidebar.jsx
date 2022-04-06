import React from "react";
import { NavLink } from "react-router-dom";
import logo1 from "./logo1.png";
import "./sidebar.css";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"
// import { useTranslation } from "react-i18next";
// import Dashboard from "./Dashboard.svg"
const style = {
  margin: "0 1.42857rem 0 0",
};
const Sidebar = (prop) => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState({
    operation: false,
    trading: false,
    platforms: false,
    contests: false,
  });
  const CloseSidebar = () => {
    prop.setSidebar(false);
    console.log(prop)
  }
  const handleClick = (e) => {
    const name = e.target.classList[0];
    console.log(name);
    if (name == "logout") {
      prop.setLogin(true);
      navigate("/login");
    } else {
      setOpen((preValue) => {
        return {
          ...preValue,
          [name]: !open[name],
        };
      });
    }
    
  };
  console.log(prop)

  return (
    <div>
      <div className="app-sidebar app-sidebar--light app-sidebar--shadow">
        <div className="app-sidebar--header">
          <div className="app-sidebar-logo">
            <a className="app-sidebar-logo" title="RightFx">
              <div className="py-2">
                <img src={logo1} style={{ width: "144px" }} />
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
        <div className="app-sidebar--content">
          <div>
            <div className="sidebar-navigation">
              <ul className="pt-2">
                <li>
                  <NavLink className="nav-link-simple " to="/Dashboard" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      dashboard
                    </span>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link-simple " to="/Deposit" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      attach_money
                    </span>
                    Deposit
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link-simple " to="/Withdrawal" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      attach_money
                    </span>

                    Withdrawal
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link-simple " to="/Internal_Transfer" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      auto_graph
                    </span>
                    Internal_Transfer
                  </NavLink>
                </li>
                <li>
                  <a
                    className={`operation ${open.operation ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      people
                    </span>
                    Operation_Account
                    <span className="sidebar-icon-indicator">

                      {open.operation ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.operation} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/deposit_history" onClick={CloseSidebar}>Deposit_History</NavLink>
                      </li>
                      <li>
                        <NavLink to="/withdraw_history" onClick={CloseSidebar}>
                          Withdraw_History   </NavLink>
                      </li>
                      <li>
                        <NavLink to="/transfer_history" onClick={CloseSidebar}>
                          Transfer_History   </NavLink>
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
                      people
                    </span>
                    Trading_Accounts
                    <span className="sidebar-icon-indicator">

                      {open.trading ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.trading} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/account_list" onClick={CloseSidebar}>Account_List   </NavLink>
                      </li>
                      <li>
                        <NavLink to="/manage_bonuses" onClick={CloseSidebar}>Manage_Bonuses   </NavLink>
                      </li>
                      <li>
                        <NavLink to="/open_real_account" onClick={CloseSidebar}>

                          OReal_Account   </NavLink>
                      </li>
                      <li>
                        <NavLink to="/open_demo_account">
                          ODemo_Account   </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <NavLink className="nav-link-simple " to="/Reports" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      auto_graph
                    </span>

                    Reports   </NavLink>
                </li>
                <li>
                  <a
                    className={`platforms ${open.platforms ? "active" : ""}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      computer
                    </span>
                    Platforms
                    <span className="sidebar-icon-indicator">
                      {open.platforms ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.platforms} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/Platforms/destop" onClick={CloseSidebar}>Destop   </NavLink>
                      </li>
                      <li>
                        <NavLink to="/Platforms/android" onClick={CloseSidebar}>Android   </NavLink>
                      </li>
                      <li>
                        <NavLink to="/Platforms/iphone" onClick={CloseSidebar}>Iphone   </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <NavLink className="nav-link-simple " to="/partnership" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      align_vertical_bottom
                    </span>

                    Partnership   </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link-simple " to="/Web_Trader" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      align_vertical_bottom
                    </span>

                    Web_Trader   </NavLink>
                </li>
                <li>
                  <a
                    className={`contests ${open.Contests ? "active" : null}`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      account_circle
                    </span>
                    Contests
                    <span className="sidebar-icon-indicator">
                      {open.contests ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.contests} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/Champion_Demo_Contes" onClick={CloseSidebar}>

                          cdc   </NavLink>
                      </li>
                      <li>
                        <NavLink to="Open_Champion_Demo_Contest_account" onClick={CloseSidebar}>

                          ocdca   </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <NavLink className="nav-link-simple " to="/copytrading" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      align_vertical_bottom
                    </span>

                    Copytrading   </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link-simple " to="/promo_code" onClick={CloseSidebar}>
                    <span className="material-icons" style={style}>
                      align_vertical_bottom
                    </span>

                    Promo_code   </NavLink>
                </li>
                <li>
                  <a
                    className={`my_profile ${open.my_profile ? "active" : null
                      }`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      account_circle
                    </span>

                    Profile
                    <span className="sidebar-icon-indicator">
                      {open.my_profile ? <ExpandMore /> : <ExpandLess />}
                    </span>
                  </a>
                  <Collapse in={open.my_profile} timeout="auto" unmountOnExit>
                    <ul>
                      <li>
                        <NavLink to="/User-Profile" onClick={CloseSidebar}>User_Profile   </NavLink>
                      </li>
                      <li>
                        <NavLink to="My-Documents" onClick={CloseSidebar}>My_Documents   </NavLink>
                      </li>
                      <li>
                        <NavLink to="My-Applications" onClick={CloseSidebar}>My_Applications   </NavLink>
                      </li>
                      <li>
                        <NavLink to="Bank-Accounts" onClick={CloseSidebar}>Bank_Accounts   </NavLink>
                      </li>
                      <li>
                        <NavLink to="Activities" onClick={CloseSidebar}>Activities   </NavLink>
                      </li>
                    </ul>
                  </Collapse>
                </li>
                <li>
                  <a
                    className={`logout ${open.logout ? "active" : null
                      }`}
                    onClick={handleClick}
                  >
                    <span className="material-icons" style={style}>
                      power_settings_new
                    </span>
                    Logout
                  </a>
                </li>
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
