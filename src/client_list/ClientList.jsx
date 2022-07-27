import "./client_list.css";
import React, { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonTable from "../common/CommonTable";
import { ColorButton } from "../common/CustomElement";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import CommonFilter from "../common/CommonFilter";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ClientUrl, IsApprove, Url } from "../global";
import axios from "axios";

const CssTextField = styled(TextField)({});

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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    // borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    // border: "1px solid #ced4da",
    fontSize: 16,
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ClientList = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [resData, setResData] = useState({});
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [dialogTitle, setDialogTitle] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState([]);
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [filterSection, setFilterSection] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [transactionAccessUserId, setTransactionAccessUserId] = useState("");
  const [state, setState] = useState({
    first_name: false,
    last_name: false,
    email: false,
    phone: false,
    account_id: false,
    mt5_account: false,
  });
  const [personName, setPersonName] = useState([]);
  const [sourceName, setSourceName] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [clientType, setClientType] = useState("");
  const [searchBy, setSearchBy] = useState([
    {
      label: "MT5 Id",
      value: false,
      name: "mt5_acc_no",
    },
    {
      label: "Wallet Id",
      value: false,
      name: "wallet_code",
    },
    {
      label: "Name",
      value: false,
      name: "name",
    },
    {
      label: "Email",
      value: false,
      name: "user_email",
    },
    {
      label: "Phone",
      value: false,
      name: "user_phone",
    },
    {
      label: "Password",
      value: false,
      name: "user_password",
    },
  ]);
  const [salesList, setSalesList] = useState([]);
  const [param, setParam] = useState({
    filter: id,
  });
  const [transactionAccessData, setTransactionAccessData] = useState({});
  const [transactionAccessLoader, setTransactionAccessLoader] = useState(false);
  toast.configure();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addNewClientType = (event) => {
    setClientType(event.target.value);
  };

  /* const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }; */

  const handleContextClick = (event, index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };

  const handleContextClose = (index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = null;
    setOpenTableMenus(tableMenus);
  };

  const depositApproved = (e) => {
  };

  const gotoProfile = (e) => {
    navigate("/profile/" + e.user_id);
  };

  const input1 = (event) => {
    const { name, value } = event.target;
    setClientSearch(value);
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const filterByChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const depositColumn = [
    {
      name: "MT5 ID",
      selector: (row) => {
        return <span title={row.mt5_id}>{row.mt5_id}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "WALLET ID",
      selector: (row) => {
        return <span title={row.wallet_code}>{row.wallet_code}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "NAME",
      selector: (row) => {
        return (
          <a
            className="linkColor"
            title={row.name}
            onClick={(event) => gotoProfile(row)}
          >
            {row.name}
          </a>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.7,
    },
    {
      name: "EMAIL",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "PHONE",
      selector: (row) => {
        return <span title={row.user_phone}>{row.user_phone}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.7,
    },
    {
      name: "PASSWORD",
      selector: (row) => {
        return (
          <span title={row.user_visible_password}>
            {row.user_visible_password}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "SALES",
      selector: (row) => {
        return (
          <div>
            <Select
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
              }}
              className="table-dropdown"
              input={<BootstrapInput />}
              name="interest"
              value={row.manager_id}
              onChange={(e) => changeSales(e, row)}
            >
              {salesList.map((item) => {
                return (
                  <MenuItem value={item.manager_id}>
                    {item.manager_name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        );
      },
      reorder: true,
      wrap: true,
      grow: 0.7,
    },
    {
      name: "IB Name",
      selector: (row) => {
        return row.sponsor_id != "0" ? (
          <NavLink
            className="linkColor"
            title={row.sponsor_name}
            to={`/profile/${row.sponsor_id}`}
          >
            {row.sponsor_name}
          </NavLink>
        ) : (
          ""
        );
      },
      reorder: true,
      wrap: true,
      grow: 0.7,
    },
    {
      name: "KYC",
      selector: (row) => {
        return (
          <div>
            <span
              className={`status-text-${
                row.kyc_status == "0"
                  ? "pending"
                  : row.kyc_status == "1"
                  ? "approved"
                  : "rejected"
              }`}
            >
              {row.kyc_status == "0" ? (
                <i className="material-icons">new_releases</i>
              ) : row.kyc_status == "1" ? (
                <i className="material-icons">check_circle</i>
              ) : (
                <i className="material-icons">cancel</i>
              )}
            </span>
          </div>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.date}>{row.date}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "Updated By",
      selector: (row) => {
        return <span title={row.modified_by_name}>{row.modified_by_name}</span>;
      },
      reorder: true,
      grow: 0.3,
      wrap: true,
    },
    {
      name: "Lead Close",
      button: true,
      cell: (row) => {
        return (
          <div className="actionButton">
            {row.lead_user == "1" ? (
              <Button
                className={`${
                  row.lead_closed == "0"
                    ? "lead_close_status"
                    : "lead_completed_status"
                }`}
                onClick={(e) => changeLeadStatus(row)}
              >
                {row.lead_closed == "0" ? (
                  <i className="material-icons">cancel</i>
                ) : (
                  <i className="material-icons">check_circle</i>
                )}
              </Button>
            ) : (
              ""
            )}
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      grow: 0.1,
    },
    {
      name: "Client Login",
      button: true,
      cell: (row) => {
        return (
          <div>
            <Button
              onClick={(e) => {
                userLogin(row);
              }}
            >
              <i className="material-icons">login</i>
            </Button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      grow: 0.1,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <div>
            <Button
              onClick={(e) => {
                transactionStatus(row);
              }}
            >
              <i className="material-icons">manage_accounts</i>
            </Button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      grow: 0.1,
    },
    /* {
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
                        {...row}
                        style={{ color: 'rgb(144 145 139)' }}
                    >
                        <i className="material-icons">more_horiz</i>
                    </Button>
                    <Menu
                        id={`basic-menu-${row.sr_no}`}
                        anchorEl={openTableMenus[row.sr_no]}
                        open={Boolean(openTableMenus[row.sr_no])}
                        onClose={(event) => handleContextClose(row.sr_no)}
                    >
                        {(row.kyc_status == "1") ?
                            <MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                            : <div><MenuItem {...row} onClick={(event) => handleContextClose(row.sr_no)}><i className="material-icons">receipt</i>&nbsp;&nbsp;View</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">edit_note</i>&nbsp;&nbsp;Edit User</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">manage_accounts</i>&nbsp;&nbsp;Change Sponser</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">thumb_up</i>&nbsp;&nbsp;MT5 Bonus</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">add_circle_outline</i>&nbsp;&nbsp;Deposit</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons ">download_for_offline</i>&nbsp;&nbsp;Withdraw</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">currency_exchange</i>&nbsp;&nbsp;Transfer</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">password</i>&nbsp;&nbsp;Change Password</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">password</i>&nbsp;&nbsp;Change MT5 Password</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">login</i>&nbsp;&nbsp;Login As</MenuItem>
                                <MenuItem className='approve' {...row} onClick={(event) => actionMenuPopup(event, row)}><i className="material-icons">settings</i>&nbsp;&nbsp;Settings</MenuItem></div>}

                    </Menu>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        } */
  ];

  const actionMenuPopup = (e, data) => {

    handleContextClose(data.sr_no);
    if (e.target.classList.contains("reject")) {
      // setDialogTitle('Reject');
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>Are you sure?</h1>
              <p>Do you want to rejected this?</p>
              <div className="confirmation-alert-action-button">
                <Button
                  variant="contained"
                  className="cancelButton"
                  onClick={onClose}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  className="btn-gradient btn-danger"
                  onClick={() => {
                    changeStatus("rejected", data);
                    onClose();
                  }}
                >
                  Yes, Reject it!
                </Button>
              </div>
            </div>
          );
        },
      });
    } else if (e.target.classList.contains("approve")) {
      // setDialogTitle('Approve');
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>Are you sure?</h1>
              <p>Do you want to approved this?</p>
              <div className="confirmation-alert-action-button">
                <Button
                  variant="contained"
                  className="cancelButton"
                  onClick={onClose}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  className="btn-gradient btn-success"
                  onClick={() => {
                    changeStatus("approved", data);
                    onClose();
                  }}
                >
                  Yes, Approve it!
                </Button>
              </div>
            </div>
          );
        },
      });
    }
  };

  const changeStatus = (status, data) => {
    if (status == "approved") {
      toast.success("Client has been completed successfully.");
    } else if (status == "rejected") {
      toast.success("Client has been rejected successfully.");
    }
  };

  const changeSales = (e, data) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>Do you want to change sales person ?</p>
            <div className="confirmation-alert-action-button">
              <Button
                variant="contained"
                className="cancelButton"
                onClick={onClose}
              >
                No
              </Button>
              <Button
                variant="contained"
                className="btn-gradient btn-success"
                onClick={() => {
                  changeUserSales(data, e.target.value);
                  onClose();
                }}
              >
                Yes, Apply it!
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  const changeLeadStatus = (data) => {
    if (data.lead_closed == "0") {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>Are you sure?</h1>
              <p>Do you want to close lead status ?</p>
              <div className="confirmation-alert-action-button">
                <Button
                  variant="contained"
                  className="cancelButton"
                  onClick={onClose}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  className="btn-gradient btn-success"
                  onClick={() => {
                    closeLead(data);
                    onClose();
                  }}
                >
                  Yes, Lead Close!
                </Button>
              </div>
            </div>
          );
        },
      });
    }
  };

  const closeLead = async (data) => {
    const param = new FormData();
    if (IsApprove != "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
    }
    param.append("action", "change_lead_status");
    param.append("user_id", data.user_id);
    param.append("lead_closed", 1);

    await axios
      .post(`${Url}/ajaxfiles/update_user_profile.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }

        if (res.data.message == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setRefresh(!refresh);
        }
      });
  };

  const getSalesList = () => {
    
    const param = new FormData();
    if (IsApprove != "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
    }
    param.append("action", "list_salesman");

    axios
      .post(Url + "/ajaxfiles/update_user_profile.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          // toast.error(res.data.message);
        } else {
          setSalesList(res.data.managers);
        }
      });
  };

  const changeUserSales = (row, managerId) => {
    const param = new FormData();
    if (IsApprove != "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
    }
    param.append("action", "assign_salesman");
    param.append("user_id", row.user_id);
    param.append("manager_id", managerId);

    axios
      .post(Url + "/ajaxfiles/update_user_profile.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          setRefresh(!refresh);
        }
      });
  };

  const userLogin = (row) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>Do you want to sure login this user ?</p>
            <div className="confirmation-alert-action-button">
              <Button
                variant="contained"
                className="cancelButton"
                onClick={onClose}
              >
                No
              </Button>
              <Button
                variant="contained"
                className="btn-gradient btn-success"
                onClick={() => {
                  onClose();
                  getUserLoginToken(row);
                }}
              >
                Yes, Login it!
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  const getUserLoginToken = (data) => {
    const param = new FormData();
    if (IsApprove != "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
    }
    param.append("action", "login_as_user");
    param.append("user_id", data.user_id);

    axios.post(Url + "/ajaxfiles/user_manage.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        window.open(res.data.redirect_url, "_blank");
      }
    });
  };
  
  const transactionStatus = (data) => {
    const param = new FormData();
    if (IsApprove != "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "transaction_access_status");
    param.append("user_id", data.user_id);

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        setTransactionAccessUserId(data.user_id);
        setTransactionAccessData({...res.data});
        setDialogTitle('Transaction Access');
        setOpen(true);
      }
    });
  }

  const manageContent = () => {
    if (dialogTitle == "Transaction Access"){
      return(
        <div className="transaction-access-section">
          <div className="input-access-element">
            <label>Copy Invest Access</label>
            <Switch checked={(transactionAccessData.is_copy_invest_active == "1") ? true: false} onChange={(e) => {
              transactionAccessData.is_copy_invest_active = (transactionAccessData.is_copy_invest_active == "1")? "0" : "1";
              setTransactionAccessData({...transactionAccessData});
            }} />
          </div>
          <div className="input-access-element">
          <label>Copy Withdraw Access</label>
            <Switch checked={(transactionAccessData.is_copy_withdraw_active == "1") ? true: false} onChange={(e) => {
              transactionAccessData.is_copy_withdraw_active = (transactionAccessData.is_copy_withdraw_active == "1")? "0" : "1";
              setTransactionAccessData({...transactionAccessData});
            }} />
          </div>
          <div className="input-access-element">
          <label>Deposit Access</label>
            <Switch checked={(transactionAccessData.is_deposit_active == "1") ? true: false} onChange={(e) => {
              transactionAccessData.is_deposit_active = (transactionAccessData.is_deposit_active == "1")? "0" : "1";
              setTransactionAccessData({...transactionAccessData});
            }} />
          </div>
          <div className="input-access-element">
          <label>IB Withdraw Access</label>
            <Switch checked={(transactionAccessData.is_ib_withdraw_active == "1") ? true: false} onChange={(e) => {
              transactionAccessData.is_ib_withdraw_active = (transactionAccessData.is_ib_withdraw_active == "1")? "0" : "1";
              setTransactionAccessData({...transactionAccessData});
            }} />
          </div>
          <div className="input-access-element">
          <label>Pamm Invest Access</label>
            <Switch checked={(transactionAccessData.is_pamm_invest_active == "1") ? true: false} onChange={(e) => {
              transactionAccessData.is_pamm_invest_active = (transactionAccessData.is_pamm_invest_active == "1")? "0" : "1";
              setTransactionAccessData({...transactionAccessData});
            }} />
          </div>
          <div className="input-access-element">
          <label>Pamm Withdraw Access</label>
            <Switch checked={(transactionAccessData.is_pamm_withdraw_active == "1") ? true: false} onChange={(e) => {
              transactionAccessData.is_pamm_withdraw_active = (transactionAccessData.is_pamm_withdraw_active == "1")? "0" : "1";
              setTransactionAccessData({...transactionAccessData});
            }} />
          </div>
          <div className="input-access-element">
          <label>Transfer Access</label>
            <Switch checked={(transactionAccessData.is_transfer_active == "1") ? true: false} onChange={(e) => {
              transactionAccessData.is_transfer_active = (transactionAccessData.is_transfer_active == "1")? "0" : "1";
              setTransactionAccessData({...transactionAccessData});
            }} />
          </div>
          <div className="input-access-element">
          <label>Withdrawal Access</label>
            <Switch checked={(transactionAccessData.is_withdrawal_active == "1") ? true: false} onChange={(e) => {
              transactionAccessData.is_withdrawal_active = (transactionAccessData.is_withdrawal_active == "1")? "0" : "1";
              setTransactionAccessData({...transactionAccessData});
            }} />
          </div>
        </div>
      )
    }
  }

  const manageDialogActionButton = () => {
    if (dialogTitle == "Transaction Access") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {transactionAccessLoader == true ? (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              disabled>
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            </Button>
          ) : (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              onClick={accessSubmit}>
              Submit
            </Button>
          )}
        </div>
      )
    }
  }

  const accessSubmit = () => {
    setTransactionAccessLoader(true);
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "update_transaction_access");
    param.append("user_id", transactionAccessUserId);
    param.append("transaction_status", JSON.stringify(transactionAccessData));

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      setTransactionAccessLoader(false);
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        setTransactionAccessUserId('');
        setTransactionAccessData({});
        setOpen(false);
      }
    });
  }

  useEffect(() => {
    getSalesList();
  }, []);

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className="main-heading">Client List</p>

                <CommonFilter
                  search={searchBy}
                  searchWord={setSearchKeyword}
                  setParam={setParam}
                  kycStatus={true}
                  lastUpdatedBy={resData.modified_by_users}
                />
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  {/* <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add New Client</Button>
                                        <Button variant="contained">Add IB</Button>
                                        <Button variant="contained">All</Button>
                                    </div>
                                    <br /> */}
                  <CommonTable
                    className="client_table"
                    url={`${Url}/datatable/users_list.php`}
                    column={depositColumn}
                    sort="0"
                    refresh={refresh}
                    filter={filterData}
                    search={searchBy}
                    searchWord={searchKeyword}
                    param={param}
                    setResData={setResData}
                  />
                </Paper>

                <BootstrapDialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                >
                  <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    {dialogTitle}
                  </BootstrapDialogTitle>
                  <DialogContent dividers>{manageContent()}</DialogContent>
                  <DialogActions>{manageDialogActionButton()}</DialogActions>
                </BootstrapDialog>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
