import "./withdraw.css";
import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import CommonFilter from "../common/CommonFilter";
import CommonTable from "../common/CommonTable";
import CustomImageModal from "../common/CustomImageModal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IsApprove, Url } from "../global";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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
      {/* {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null} */}
    </DialogTitle>
  );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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

const Withdraw = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [dialogTitle, setDialogTitle] = useState("");
  const [accountOption, setAccountOption] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [param, setParam] = useState({});
  const [checkStatus, setcheckStatus] = useState("");
  const[buttonDis,setButttonDis]=useState()
  const [resData, setResData] = useState({});
  const [Form, setForm] = useState({
    account_type: "",
    account: "",
    customer_name: "",
    payment_gateway: "",
    amount: "",
    currency_code: "",
    note: "",
    user_id: "",
    isLoader: false,
  });
  const [viewWithdrawForm, setviewWithdrawForm] = useState({
    date: "",
    name: "",
    email: "",
    phone: "",
    withdraw_method: "",
    amount: "",
    remark: "",
    status: "",
    withdrawal_id: "",
    isLoader: false,
  });
  const [searchBy, setSearchBy] = useState([
    {
      label: "NAME",
      value: false,
      name: "name",
    },
    {
      label: "ACCOUNT NO",
      value: false,
      name: "account_no",
    },
    {
      label: "PAYMENT METHOD",
      value: false,
      name: "payment_method",
    },
    {
      label: "AMOUNT",
      value: false,
      name: "amount",
    },
    {
      label: "REMARKS",
      value: false,
      name: "remarks",
    },
  ]);
  toast.configure();

  const columns = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span>{row.sr_no}</span>;
      },
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
      name: "NAME",
      selector: (row) => {
        return <span title={row.name}>{row.name}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "ACCOUNT NO",
      selector: (row) => {
        return <span title={row.wallet_code}>{row.wallet_code}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => {
        return <span title={row.method}>{row.method}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.3,
    },
    {
      name: "AMOUNT",
      selector: (row) => {
        return <span title={row.amount}>{row.amount}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.5,
    },
    {
      name: "REMARKS",
      selector: (row) => {
        return <span title={row.remarks}>{row.remarks}</span>;
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "STATUS",
      selector: (row) => {
        return (
          <span
            className={
              row.status == "1"
                ? "status-text-approved"
                : row.status == "2"
                ? "status-text-rejected"
                : "status-text-pending"
            }
            title={
              row.status == "1"
                ? "Approved"
                : row.status == "2"
                ? "Rejected"
                : "Pending"
            }
          >
            {row.status == "1"
              ? "Approved"
              : row.status == "2"
              ? "Rejected"
              : "Pending"}
          </span>
        );
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
      wrap: true,
      grow: 0.5,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <div>
            <Button
              id={`actionButton_${row.withdrawal_id}`}
              aria-controls={
                open ? `basic-menu-${row.withdrawal_id}` : undefined
              }
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => handleContextClick(event, row.withdrawal_id)}
              {...row}
              style={{ color: "rgb(144 145 139)" }}
            >
              <i className="material-icons">more_horiz</i>
            </Button>
            <Menu
              id={`basic-menu-${row.withdrawal_id}`}
              anchorEl={openTableMenus[row.withdrawal_id]}
              open={Boolean(openTableMenus[row.withdrawal_id])}
              onClose={(event) => handleContextClose(row.withdrawal_id)}
            >
              {row.status != "0" ? (
                <MenuItem
                  className="view"
                  {...row}
                  onClick={(event) => viewWithdrawl(row.withdrawal_id)}
                >
                  <i className="material-icons">receipt</i>&nbsp;&nbsp;View
                </MenuItem>
              ) : (
                <div>
                  <MenuItem
                    className="view"
                    {...row}
                    onClick={(event) => viewWithdrawl(row.withdrawal_id)}
                  >
                    <i className="material-icons">receipt</i>&nbsp;&nbsp;View
                  </MenuItem>
                  <MenuItem
                    className="approve"
                    {...row}
                    onClick={(event) =>
                      actionMenuPopup(event, row.withdrawal_id)
                    }
                  >
                    <i className="material-icons font-color-approved">
                      task_alt
                    </i>
                    &nbsp;&nbsp;Approved
                  </MenuItem>
                  <MenuItem
                    className="reject"
                    {...row}
                    onClick={(event) =>
                      actionMenuPopup(event, row.withdrawal_id)
                    }
                  >
                    <i className="material-icons font-color-rejected">cancel</i>
                    &nbsp;&nbsp;Rejected
                  </MenuItem>
                </div>
              )}
            </Menu>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
    },
  ];

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

  const manageDialogActionButton = () => {
    if (dialogTitle == "Add New Withdrawal") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {Form.isLoader == true ? (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              disabled
            >
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            </Button>
          ) : (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              onClick={submitForm}
            >
              Add
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Reject") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" className="btn-gradient btn-danger">
            Reject
          </Button>
        </div>
      );
    } else if (dialogTitle == "Approve") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" className="btn-gradient btn-success">
            Approve
          </Button>
        </div>
      );
    } else if (dialogTitle == "Update Withdrawal Request") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {buttonDis == "0" ? (
            viewWithdrawForm.isLoader == true ? (
              <Button
                variant="contained"
                className="btn-gradient btn-success"
                disabled
              >
                <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              </Button>
            ) : (
              <Button
                variant="contained"
                className="btn-gradient btn-success"
                onClick={submitUpdate}
              >
                Update
              </Button>
            )
          ) : (
            ""
          )}
          {/* {(viewWithdrawForm.isLoader == true) ? <Button variant="contained" className='btn-gradient btn-success' disabled><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i></Button> : <Button variant="contained" className='btn-gradient btn-success' onClick={submitUpdate}>Update</Button>} */}
        </div>
      );
    }
  };

  const manageContent = () => {
    if (dialogTitle == "Add New Withdrawal") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Account Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                label="Account"
                name="account_type"
                onChange={input}
              >
                <MenuItem value="live">Live</MenuItem>
                <MenuItem value="demo">Demo</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div className="margeField">
            {/* <TextField id="standard-basic" label="Account" variant="standard" sx={{ width: '100%' }} name='account' onChange={input}/> */}
            <Autocomplete
              disablePortal
              options={accountOption}
              getOptionLabel={(option) =>
                option ? option.mt_live_account_id : ""
              }
              onInputChange={(event, newInputValue) => {
                fetchAccount(event, newInputValue);
              }}
              onChange={(event, newValue) => {
                // setValue(newValue);
                setForm((prevalue) => {
                  return {
                    ...prevalue,
                    customer_name:
                      newValue != null
                        ? newValue["user_first_name"] +
                          " " +
                          newValue["user_last_name"]
                        : "",
                    account: newValue != null ? newValue["user_id"] : "",
                  };
                });
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Account" variant="standard" />
              )}
            />
            <TextField
              id="standard-basic"
              label="Customer Name"
              variant="standard"
              sx={{ width: "100%" }}
              value={Form.customer_name}
              name="customer_name"
              onChange={input}
            />
          </div>
          <br />
          <div className="margeField">
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Payment Gateway
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                label="Payment Gateway"
                name="payment_gateway"
                onChange={input}
              >
                <MenuItem value="BANK">BANK</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Amount"
              variant="standard"
              sx={{ width: "100%" }}
              name="amount"
              onChange={input}
            />
          </div>
          <br />
          <div className="margeField">
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                Currenct Code
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                label="Currenct Code"
                name="currency_code"
                onChange={input}
              >
                <MenuItem value="USD">USD</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="standard-basic"
              label="Note"
              variant="standard"
              sx={{ width: "100%" }}
              name="note"
              onChange={input}
            />
          </div>
          {/* <br />
                <div>
                    <TextField id="standard-textarea" label="Notes" multiline variant="standard" sx={{ width: '100%' }} name='note' onChange={input}/>
                </div> */}
        </div>
      );
    } else if (dialogTitle == "Update Withdrawal Request") {
      return (
        <div>
          <div className="update-withdraw-request-section">
            <TextField
              id="standard-basic"
              label="Date"
              variant="standard"
              sx={{ width: "100%" }}
              name="date"
              value={viewWithdrawForm.date}
              onChange={input1}
              focused
              disabled
            />
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              sx={{ width: "100%" }}
              name="name"
              value={viewWithdrawForm.name}
              onChange={input1}
              focused
              disabled
            />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              sx={{ width: "100%" }}
              name="email"
              value={viewWithdrawForm.email}
              onChange={input1}
              focused
              disabled
            />
          </div>
          <br />
          <div className="update-withdraw-request-section">
            <TextField
              id="standard-basic"
              label="Phone"
              variant="standard"
              sx={{ width: "100%" }}
              name="phone"
              value={viewWithdrawForm.phone}
              onChange={input1}
              focused
              disabled
            />
            <TextField
              id="standard-basic"
              label="Method"
              variant="standard"
              sx={{ width: "100%" }}
              name="withdraw_method"
              value={viewWithdrawForm.withdraw_method}
              onChange={input1}
              focused
              disabled
            />
            <TextField
              id="standard-basic"
              label="Amount"
              variant="standard"
              sx={{ width: "100%" }}
              name="amount"
              value={viewWithdrawForm.amount}
              onChange={input1}
              focused
              disabled={buttonDis == "0" ? false : true}
            />
          </div>
          <br />
          <div className="update-withdraw-request-section">
            <TextField
              id="standard-basic"
              label="Remark"
              variant="standard"
              sx={{ width: "100%" }}
              name="remark"
              value={viewWithdrawForm.remark}
              onChange={input1}
              focused
              disabled={buttonDis == "0" ? false : true}
            />
            {/* <TextField id="standard-basic" label="Status" variant="standard" sx={{ width: '100%' }} name='customer_name' value={viewWithdrawForm.status} onChange={input1} focused/> */}
            <FormControl variant="standard" sx={{ width: "100%" }} focused>
              <InputLabel>Status</InputLabel>
              <Select
                value={viewWithdrawForm.status}
                name="status"
                onChange={input1}
                disabled={buttonDis == "0" ? false : true}
              >
                <MenuItem value="0">Pending</MenuItem>
                <MenuItem value="1">Approve</MenuItem>
                <MenuItem value="2">Reject</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Reject") {
      return (
        <div>
          <div className="withdrawal-action-popup-text">
            <label>Are you want to sure reject this withdrawal ?</label>
          </div>
        </div>
      );
    } else if (dialogTitle == "Approve") {
      return (
        <div>
          <div className="withdrawal-action-popup-text">
            <label>Are you want to sure approve this withdrawal ?</label>
          </div>
        </div>
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e) => {
    setForm({
      account_type: "",
      account: "",
      customer_name: "",
      payment_gateway: "",
      amount: "",
      currency_code: "",
      note: "",
      user_id: "",
      isLoader: false,
    });
    setDialogTitle("Add New Withdrawal");
    setOpen(true);
  };

  const actionMenuPopup = (e, index) => {
    handleContextClose(index);
    if (e.target.classList.contains("reject")) {
      setDialogTitle("Reject");
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>Are you sure?</h1>
              <p>Do you want to reject this?</p>
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
                    handleAction(index, "reject_withdrawal");
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
      setDialogTitle("Approve");
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui">
              <h1>Are you sure?</h1>
              <p>Do you want to approve this?</p>
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
                    handleAction(index, "approve");
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

  const input = (event) => {
    const { name, value } = event.target;
    setForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const input1 = (event) => {
    const { name, value } = event.target;
    setviewWithdrawForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const fetchAccount = async (event, search) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
    }
    param.append("search", search);
    param.append("type", Form.account_type);
    await axios
      .post(`${Url}/ajaxfiles/fetch_user_account.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          setAccountOption(res.data.data);
        }
      });
  };

  const submitForm = async () => {
    if (Form.account_type == "") {
      toast.error("Please select account type");
    } else if (Form.account == "") {
      toast.error("Please enter account");
    } else if (Form.customer_name == "") {
      toast.error("Please enter customer name");
    } else if (Form.payment_gateway == "") {
      toast.error("Please select any one payment gateway");
    } else if (Form.amount == "") {
      toast.error("Please enter amount");
    } else if (Form.currency_code == "") {
      toast.error("Please select currency code");
    } else if (Form.note == "") {
      toast.error("Please enter note");
    } else {
      Form.isLoader = true;
      setForm({ ...Form });
      const param = new FormData();
      param.append("action", "add_withdraw");
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      }
      param.append("user_id", Form.account);
      param.append("account_type", Form.account_type);
      param.append("payment_method", Form.payment_gateway);
      param.append("amount", Form.amount);
      param.append("currency", Form.currency_code);
      param.append("note", Form.note);
      await axios
        .post(`${Url}/ajaxfiles/user_manage.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          // setLoader(false);
          Form.isLoader = false;
          setForm({ ...Form });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            setRefresh(!refresh);
            toast.success(res.data.message);
            setOpen(false);
          }
        });
    
    }
  };

  const submitUpdate = async () => {
    if (viewWithdrawForm.amount == "") {
      toast.error("Please enter amount");
    } else if (viewWithdrawForm.remark == "") {
      toast.error("Please enter remark");
    } else if (viewWithdrawForm.status == "") {
      toast.error("Please select status");
    } else {
      viewWithdrawForm.isLoader = true;
      setviewWithdrawForm({ ...viewWithdrawForm });
      const param = new FormData();
      param.append("action", "view_update_withdrawal");
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      }
      param.append("withdrawal_id", viewWithdrawForm.withdrawal_id);
      param.append("withdrawal_status", viewWithdrawForm.status);
      param.append("withdrawal_remarks", viewWithdrawForm.remark);
      param.append("amount", viewWithdrawForm.amount);
      await axios
        .post(`${Url}/ajaxfiles/withdrawal_manage.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          viewWithdrawForm.isLoader = false;
          setviewWithdrawForm({ ...viewWithdrawForm });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            setRefresh(!refresh);
            toast.success(res.data.message);
            setOpen(false);
          }
        });
     
    }
  };

  const handleAction = async (id, flag) => {
    const param = new FormData();
    if (flag == "approve") {
      param.append("action", "approve_withdrawal");
    } else {
      param.append("action", "reject_withdrawal");
    }
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
    }
    param.append("withdrawal_id", id);
    await axios
      .post(`${Url}/ajaxfiles/withdrawal_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setRefresh(!refresh);
        }
      });
  };

  const viewWithdrawl = async (id) => {
    handleContextClose(id);
    const param = new FormData();
    param.append("action", "view_withdrawal");
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
    }
    param.append("withdrawal_id", id);
    await axios
      .post(`${Url}/ajaxfiles/withdrawal_manage.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          setviewWithdrawForm({
            date: res.data.withdrawal_data.withdrawal_datetime,
            name: res.data.withdrawal_data.name,
            email: res.data.withdrawal_data.user_email,
            phone: res.data.withdrawal_data.user_phone,
            withdraw_method: res.data.withdrawal_data.withdrawal_method,
            amount: res.data.withdrawal_data.withdrawal_amount,
            remark: res.data.withdrawal_data.withdrawal_remarks,
            status: res.data.withdrawal_data.withdrawal_status,
            user_id: "",
            withdrawal_id: id,
            isLoader: false,
          });
          setButttonDis(res.data.withdrawal_data.withdrawal_status)
          setDialogTitle("Update Withdrawal Request");
          setOpen(true);
        }
      });
  };

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className="main-heading">Withdrawal</p>
                <CommonFilter
                  search={searchBy}
                  searchWord={setSearchKeyword}
                  setParam={setParam}
                  setcheckStatus={setcheckStatus}
                  lastUpdatedBy={resData.modified_by_users}
                />
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  {/* <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={handleClickOpen}>Add</Button>
                                    </div>
                                    <br /> */}
                  <CardContent className="py-3">
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={12} lg={12}>
                        <CommonTable
                          url={`${Url}/datatable/withdraw_list.php`}
                          column={columns}
                          sort="1"
                          refresh={refresh}
                          search={searchBy}
                          searchWord={searchKeyword}
                          param={param}
                          checkStatus={checkStatus}
                          setResData={setResData}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <div className="d-flex">
                    <Grid container>
                      <Grid item md={6}>
                        <div className="row1 boxSection">
                          <div className="card padding-9 animate fadeLeft boxsize">
                            <div className="row">
                              <div className="col s12 m12 text-align-center">
                                <h5 className="mb-0">
                                  {resData.total_withdrawal_footer}
                                </h5>
                                <p className="no-margin">Total Withdrawal</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div className="row1 boxSection">
                          <div className="card padding-9 animate fadeLeft boxsize">
                            <div className="row">
                              <div className="col s12 m12 text-align-center">
                                <h5 className="mb-0">
                                  {resData.total_withdraw}
                                </h5>
                                <p className="no-margin">Withdrawal</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
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

export default Withdraw;
