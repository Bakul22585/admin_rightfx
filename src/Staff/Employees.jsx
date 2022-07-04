import React, { useState } from "react";
import "./employees.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
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
import CommonTable from "../common/CommonTable";
import { useNavigate } from "react-router-dom";
import CustomImageModal from "../common/CustomImageModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IsApprove, Url } from "../global";
import CommonFilter from "../common/CommonFilter";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
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
const Employees = () => {
  const [param, setParam] = useState({
    start_date: "",
    end_date: "",
  });
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [checkStatus, setcheckStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [searchBy, setSearchBy] = useState([
    {
      label: "ROLE NAME",
      value: false,
      name: "role",
    },
    {
      label: "NAME",
      value: false,
      name: "user_first_name",
    },
    {
      label: "Email",
      value: false,
      name: "user_email",
    },
    {
      label: "PAYMENT METHOD",
      value: false,
      name: "payment_method",
    },
    {
      label: "Phone Number",
      value: false,
      name: "user_phone",
    },
    {
      label: "MANAGER",
      value: false,
      name: "master_manager_name",
    },
    {
      label: "ACCOUNT TARGET",
      value: false,
      name: "ac_target",
    },
    {
      label: "MONEY IN TARGET",
      value: false,
      name: "master_manager_name",
    },
  ]);
  const [list, setList] = useState({
    roleList: [],
    mangerList: [],
  });
  const [form, setForm] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_password: "",
    role_id: "",
    manger_master_id: "",
    ac_target: "",
    money_in_target: "",
    user_status: "",
    user_phone: "",
    user_id: "",
    isLoader: false,
  });
  toast.configure();
  const handleClose = () => {
    setOpen(false);
  };
  const input = (e) => {
    const { name, value } = e.target;
    setForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const getRoleList = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "get_roles");
    axios.post(Url + "/ajaxfiles/employee_manage.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      list.roleList = res.data.data;
      setList({ ...list });
    });
  };
  const getManagerList = () => {
    const param = new FormData();

    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "get_manager_master");
    axios.post(Url + "/ajaxfiles/employee_manage.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      list.mangerList = res.data.data;
      setList({ ...list });
    });
  };
  const formSubmit = () => {
    if (form.user_first_name == "") {
      toast.error("First Name is required");
    } else if (form.user_last_name == "") {
      toast.error("Last Name is required");
    } else if (form.user_email == "") {
      toast.error("Email is required");
    } else if (form.user_phone == "") {
      toast.error("Phone number is required");
    } else if (form.role_id == "" || form.role_id == "0") {
      toast.error("Role is required");
    } else if (form.manger_master_id == "" && form.role_id == "3") {
      toast.error("Manger is required");
    } else if (form.ac_target == "" && form.role_id == "3") {
      toast.error("Account target is required");
    } else if (form.money_in_target == "" && form.role_id == "3") {
      toast.error("Money in target is required");
    } else if (form.user_status == "") {
      toast.error("Status is required");
    } else {
      const param = new FormData();

      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
        param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
      }
      if(form.role_id == "3"){
        param.append("manger_master_id", form.manger_master_id);
        param.append("ac_target", form.ac_target);
        param.append("money_in_target", form.money_in_target);
      }
      param.append("action", "edit_employee");
      param.append("user_first_name", form.user_first_name);
      param.append("user_last_name", form.user_last_name);
      param.append("user_email", form.user_email);
      param.append("user_password", form.user_password);
      param.append("employee_role_id", form.role_id);
     
      param.append("user_status", form.user_status);
      param.append("user_phone", form.user_phone);

      param.append("user_id", form.user_id);
      form.isLoader = true;
      setForm({ ...form });
      axios.post(Url + "/ajaxfiles/employee_manage.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          form.isLoader = false;
          setForm({ ...form });
        } else {
          toast.success(res.data.message);
          setOpen(false);
          setRefresh(!refresh);
          form.isLoader = false;
          setForm({ ...form });
        }
      });
    }
  };
  const formDelete = () => {
    const param = new FormData();

    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "delete_employee");
    param.append("user_id", form.user_id);
    form.isLoader = true;
    setForm({ ...form });
    axios.post(Url + "/ajaxfiles/employee_manage.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
        form.isLoader = false;
        setForm({ ...form });
      } else {
        toast.success(res.data.message);
        setOpen(false);
        setRefresh(!refresh);
        form.isLoader = false;
        setForm({ ...form });
      }
    });
  };
  const formAdd = () => {
    if (form.user_first_name == "") {
      toast.error("First Name is required");
    } else if (form.user_last_name == "") {
      toast.error("Last Name is required");
    } else if (form.user_email == "") {
      toast.error("Email is required");
    } else if (form.user_phone == "") {
      toast.error("Email is required");
    } else if (form.role_id == "" || form.role_id == "0") {
      toast.error("Role is required");
    } else if (form.manger_master_id == "" && form.role_id == "3") {
      toast.error("Manger is required");
    } else if (form.ac_target == "" && form.role_id == "3") {
      toast.error("Account target is required");
    } else if (form.money_in_target == "" && form.role_id == "3") {
      toast.error("Money in target is required");
    } else if (form.user_status == "") {
      toast.error("Status is required");
    } else {
      const param = new FormData();

      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
        param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
      }
      if(form.role_id == "3")
      {
        param.append("manger_master_id", form.manger_master_id);
        param.append("ac_target", form.ac_target);
        param.append("money_in_target", form.money_in_target);
      }
      param.append("action", "add_employee");
      param.append("user_first_name", form.user_first_name);
      param.append("user_last_name", form.user_last_name);
      param.append("user_email", form.user_email);
      param.append("user_password", form.user_password);
      param.append("employee_role_id", form.role_id);
     
      param.append("user_status", form.user_status);
      param.append("user_phone", form.user_phone);
      form.isLoader = true;
      setForm({ ...form });
      axios.post(Url + "/ajaxfiles/employee_manage.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          form.isLoader = false;
          setForm({ ...form });
        } else {
          toast.success(res.data.message);
          setOpen(false);
          setRefresh(!refresh);
          form.isLoader = false;
          setForm({ ...form });
        }
      });
    }
  };
  const manageContent = () => {
    if (dialogTitle == "Update Employees" || dialogTitle == "Add Employees") {
      return (
        <div>
          <div className="d-flex">
            <div className="element twofild">
              <TextField
                label="First Name"
                variant="standard"
                sx={{ width: "100%" }}
                name="user_first_name"
                onChange={input}
                value={form.user_first_name}
              />
            </div>
            <div className="element w-100">
              <TextField
                label="Last Name"
                variant="standard"
                sx={{ width: "100%" }}
                name="user_last_name"
                onChange={input}
                value={form.user_last_name}
              />
            </div>
          </div>
          <br />
          <div className="d-flex">
            <div className="element twofild">
              <TextField
                label="Email"
                variant="standard"
                disabled={dialogTitle == "Add Employees" ? false : true}
                sx={{ width: "100%" }}
                name="user_email"
                onChange={input}
                value={form.user_email}
              />
            </div>{" "}
            <div className="element w-100">
              <TextField
                label="Phone"
                variant="standard"
                sx={{ width: "100%" }}
                type="number"
                name="user_phone"
                onChange={input}
                value={form.user_phone}
              />
            </div>{" "}
          </div>
          <br />
          <div className="element">
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Role</InputLabel>
              <Select
                label
                value={form.role_id}
                // className="select-font-small"
                name="role_id"
                onChange={input}
              >
                {list.roleList.map((item) => {
                  return (
                    <MenuItem value={item.role_id}>{item.role_name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>{" "}
          <br />
          {form.role_id == "3" ? (
            <>
              <div className="element">
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>Manger</InputLabel>
                  <Select
                    label
                    value={form.manger_master_id}
                    // className="select-font-small"
                    name="manger_master_id"
                    onChange={input}
                  >
                    {list.mangerList.map((item) => {
                      return (
                        <MenuItem value={item.manger_master_id}>
                          {item.manger_master_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <br />
            </>
          ) : (
            ""
          )}
          {form.role_id == "3" ? (
            <>
              <div className="d-flex">
                <div className="element twofild">
                  <TextField
                    label="Account Target"
                    variant="standard"
                    type="number"
                    sx={{ width: "100%" }}
                    name="ac_target"
                    onChange={input}
                    value={form.ac_target}
                  />
                </div>{" "}
                <div className="element w-100">
                  <TextField
                    label="Money In Target"
                    type="number"
                    variant="standard"
                    sx={{ width: "100%" }}
                    name="money_in_target"
                    onChange={input}
                    value={form.money_in_target}
                  />
                </div>{" "}
              </div>
              <br />
            </>
          ) : (
            ""
          )}
          <div className="d-flex">
            <div className="element twofild">
              <TextField
                label="Password"
                type="password"
                variant="standard"
                sx={{ width: "100%" }}
                name="user_password"
                onChange={input}
                value={form.user_password}
              />
            </div>{" "}
            <div className="element  w-100">
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  label
                  value={form.user_status}
                  name="user_status"
                  onChange={input}
                >
                  <MenuItem value="0">Pending</MenuItem>

                  <MenuItem value="1">Approve</MenuItem>
                </Select>
              </FormControl>
            </div>{" "}
          </div>
          <br />
        </div>
      );
    } else if (dialogTitle == "Delete Employees") {
      return (
        <>
          <div>
            <h1>Are you sure ?</h1>
            Do you want to sure delete this employee ?
          </div>
        </>
      );
    }
  };
  const manageDialogActionButton = () => {
    if (dialogTitle == "Update Employees") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {form.isLoader ? (
            <Button
              tabindex="0"
              size="large"
              className=" btn-gradient  btn-success addbankloder"
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
            </Button>
          ) : (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              onClick={formSubmit}
            >
              Update
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Add Employees") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {form.isLoader ? (
            <Button
              tabindex="0"
              size="large"
              className=" btn-gradient  btn-success addbankloder"
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
            </Button>
          ) : (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              onClick={formAdd}
            >
              Add
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Delete Employees") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {form.isLoader ? (
            <Button
              tabindex="0"
              size="large"
              className=" btn-gradient  btn-danger addbankloder"
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
            </Button>
          ) : (
            <Button
              variant="contained"
              className="btn-gradient btn-danger"
              onClick={formDelete}
            >
              Delete
            </Button>
          )}
        </div>
      );
    }
  };
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
      name: "ROLE NAME",
      selector: (row) => {
        return <span title={row.role}>{row.role}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
      wrap: true,
    },
    {
      name: "Name",
      selector: (row) => {
        return (
          <span
            title={`${row.user_first_name} ${row.user_last_name}`}
          >{`${row.user_first_name} ${row.user_last_name}`}</span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 0.5,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.7,
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => {
        return (
          <span title={row.user_added_datetime}>{row.user_added_datetime}</span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 0.7,
      wrap: true,
    },
    {
      name: "Phone Number",
      selector: (row) => {
        return <span title={row.user_phone}>{row.user_phone}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.7,
      wrap: true,
    },
    {
      name: "MANAGER",
      selector: (row) => {
        return (
          <span title={row.master_manager_name}>{row.master_manager_name}</span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 0.5,
      wrap: true,
    },
    {
      name: "ACCOUNT TARGET",
      selector: (row) => {
        return <span title={row.ac_target}>{row.ac_target}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
      wrap: true,
    },
    {
      name: "MONEY IN TARGET",
      selector: (row) => {
        return <span title={row.money_in_target}>{row.money_in_target}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
      wrap: true,
    },
    {
      name: "STATUS",
      selector: (row) => {
        return (
          <span
            className={
              row.user_status == "1"
                ? "status-text-approved"
                : row.user_status == "2"
                ? "status-text-rejected"
                : "status-text-pending"
            }
            title={
              row.user_status == "1"
                ? "Approved"
                : row.user_status == "2"
                ? "Rejected"
                : "Pending"
            }
          >
            {row.user_status == "1"
              ? "Approved"
              : row.user_status == "2"
              ? "Rejected"
              : "Pending"}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 0.5,
      wrap: true,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <span style={{ display: "flex" }}>
            {" "}
            <Button>
              <span
                className="material-icons  icon_Mar"
                style={{ color: "green" }}
                onClick={() => {
                  getRoleList();
                  getManagerList();
                  setDialogTitle("Update Employees");
                  setOpen(true);
                  setForm({
                    user_first_name: row.user_first_name,
                    user_last_name: row.user_last_name,
                    user_email: row.user_email,
                    user_password: row.user_password,
                    role_id: row.role_id,
                    user_phone: row.user_phone,
                    manger_master_id: row.manger_master_id,
                    ac_target: row.ac_target,
                    money_in_target: row.money_in_target,
                    user_status: row.user_status,
                    user_id: row.user_id,
                    isLoader: false,
                  });
                }}
              >
                edit
              </span>
            </Button>
            <Button
              onClick={() => {
                setDialogTitle("Delete Employees");
                setOpen(true);
                form.user_id = row.user_id;
                form.isLoader = false;
                setForm({ ...form });
              }}
            >
              <span
                className="material-icons  icon_Mar"
                style={{ color: "red" }}
              >
                delete
              </span>
            </Button>
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
      wrap: true,
    },
  ];

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className="main-heading">Employees</p>
                <CommonFilter
                  search={searchBy}
                  setParam={setParam}
                  searchWord={setSearchKeyword}
                  setcheckStatus={setcheckStatus}
                />
                <br />

                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <CardContent className="py-3">
                    <Grid container spacing={2}>
                      <Grid item sm={12} md={12} lg={12}>
                        <ColorButton
                          onClick={() => {
                            getRoleList();
                            getManagerList();
                            setDialogTitle("Add Employees");
                            setOpen(true);
                            setForm({
                              user_first_name: "",
                              user_last_name: "",
                              user_email: "",
                              user_password: "",
                              role_id: "",
                              manger_master_id: "",
                              ac_target: "",
                              money_in_target: "",
                              user_status: "",
                              user_phone: "",
                              user_id: "",
                              isLoader: false,
                            });
                          }}
                        >
                          Add Employees
                        </ColorButton>
                        <CommonTable
                          url={`${Url}/datatable/employees_list.php`}
                          column={columns}
                          sort="2"
                          refresh={refresh}
                          search={searchBy}
                          param={param}
                          searchWord={searchKeyword}
                          checkStatus={checkStatus}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Paper>
              </Grid>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className="modalWidth100"
                fullWidth={fullWidth}
                maxWidth={maxWidth}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  className="dialogTitle"
                  onClose={handleClose}
                >
                  {dialogTitle}
                </BootstrapDialogTitle>
                <DialogContent dividers>{manageContent()}</DialogContent>
                <DialogActions>{manageDialogActionButton()}</DialogActions>
              </BootstrapDialog>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
