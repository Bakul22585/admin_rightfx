import "./copytrading.css";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IsApprove, Url } from "../global";
import { fromJS } from "draft-js/lib/CharacterMetadata";
import { useNavigate } from "react-router-dom";
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

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const CopyTrading = () => {
  const [
    openAddCopyTradingAccountSection,
    setOpenAddCopyTradingAccountSection,
  ] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");
  const [dialogTitle, setDialogTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [form, setForm] = useState({
    img: "",
    name: "",
    status: "",
    risk_score: "",
    gain: "",
    copiers_left: "",
    copiers_right: "",
    profit: "",
    loss: "",
    commission: "",
    phone: "",
    address: "",
    email: "",
  });
  toast.configure();

  const manageDialogActionButton = () => {
    if (dialogTitle == "Create Copy Trading Account") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="btn-gradient btn-success"
            onClick={submitForm}
          >
            Add
          </Button>
        </div>
      );
    }
  };

  const manageContent = () => {
    if (dialogTitle == "Create Copy Trading Account") {
      return (
        <div className="copy-trading-main-section">
          <div className="copy-trading-popup-card-section">
            <div className="card-header">
              <label
                htmlFor="contained-button-file"
                className="fileuploadButton"
              >
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onSelectFile}
                />
                <img
                  src={
                    selectedFile == undefined
                      ? "./assets/img/testimony.png"
                      : preview
                  }
                  className="user-avatar-img"
                />
              </label>
              <div className="name-infor-section">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="formControl-input"
                  value={form.name}
                  onChange={input}
                />
                <div className="achiever-section">
                  <i className="material-icons">star</i>
                  <select
                    className="formControl-input"
                    name="status"
                    onChange={input}
                    value={form.status}
                  >
                    <option>Very Low</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>Hight</option>
                    <option>Very Hight</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card-contant">
              <div className="risk-score-section">
                <p>RISK SCORE</p>
                <div className="risk-score-silder-section">
                  <PrettoSlider
                    size="small"
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={1}
                    // step={1}
                    marks
                    min={1}
                    max={10}
                    name="risk_score"
                    value={form.risk_score}
                    onChange={input}
                  />
                </div>
              </div>
              <div className="gain-copies-section">
                <div className="gain-element">
                  <p>GAIN</p>
                  <input
                    type="text"
                    name="gain"
                    placeholder="15"
                    className="formControl-input"
                    value={form.gain}
                    onChange={(e) => {
                      if (!isNaN(Number(e.target.value))) {
                        form.gain = e.target.value;
                        setForm({...form});
                      } else if (e.target.value == "" || e.target.value == 0) {
                        form.gain = 0;
                        setForm({...form});
                      }
                    }}
                  />
                </div>
                <div className="copiers-element">
                  <p>COPIERS</p>
                  <div className="input-section">
                    <input
                      type="text"
                      name="copiers_left"
                      placeholder="5872"
                      className="formControl-input"
                      value={form.copiers_left}
                      onChange={(e) => {
                        if (!isNaN(Number(e.target.value))) {
                          form.copiers_left = e.target.value;
                          setForm({...form});
                        } else if (e.target.value == "" || e.target.value == 0) {
                          form.copiers_left = 0;
                          setForm({...form});
                        }
                      }}
                    />
                    <i className="material-icons">arrow_upward</i>
                    <input
                      type="text"
                      name="copiers_right"
                      placeholder="5200"
                      className="formControl-input"
                      value={form.copiers_right}
                      onChange={(e) => {
                        if (!isNaN(Number(e.target.value))) {
                          form.copiers_right = e.target.value;
                          setForm({...form});
                        } else if (e.target.value == "" || e.target.value == 0) {
                          form.copiers_right = 0;
                          setForm({...form});
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="profit-loss-section">
                <p>PROFIT AND LOSS</p>
                <div className="input-element">
                  <input
                    type="text"
                    name="profit"
                    placeholder="15"
                    className="formControl-input"
                    value={form.profit}
                    onChange={(e) => {
                      if (!isNaN(Number(e.target.value))) {
                        form.profit = e.target.value;
                        setForm({...form});
                      } else if (e.target.value == "" || e.target.value == 0) {
                        form.profit = 0;
                        setForm({...form});
                      }
                    }}
                  />
                  <input
                    type="text"
                    name="loss"
                    placeholder="15"
                    className="formControl-input"
                    value={form.loss}
                    onChange={(e) => {
                      if (!isNaN(Number(e.target.value))) {
                        form.loss = e.target.value;
                        setForm({...form});
                      } else if (e.target.value == "" || e.target.value == 0) {
                        form.loss = 0;
                        setForm({...form});
                      }
                    }}
                  />
                </div>
              </div>
              <div className="commission-section">
                <p>COMMISSION</p>
                <input
                  type="text"
                  name="commission"
                  placeholder="15"
                  className="formControl-input"
                  value={form.commission}
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value))) {
                      form.commission = e.target.value;
                      setForm({...form});
                    } else if (e.target.value == "" || e.target.value == 0) {
                      form.commission = 0;
                      setForm({...form});
                    }
                  }}
                />
              </div>
              <div className="extra-field-element">
                <p>PHONE</p>
                <input
                  type="text"
                  name="phone"
                  placeholder="+91 99099 99099"
                  className="formControl-input"
                  value={form.phone}
                  onChange={(e) => {
                    if (Number(e.target.value) > 0) {
                      form.phone = Number(e.target.value);
                      setForm({...form});
                    } else if (e.target.value == "" || e.target.value == 0) {
                      form.phone = 0;
                      setForm({...form});
                    }
                  }}
                />
              </div>
              <div className="extra-field-element">
                <p>ADDRESS</p>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="formControl-input"
                  value={form.address}
                  onChange={input}
                />
              </div>
              <div className="extra-field-element">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="formControl-input"
                  value={form.email}
                  onChange={input}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (dialogTitle == "View") {
      return <div></div>;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (e) => {
    setForm({
      img: "",
      name: "",
      status: "",
      risk_score: "",
      gain: "",
      copiers_left: "",
      copiers_right: "",
      profit: "",
      loss: "",
      commission: "",
      phone: "",
      address: "",
      email: "",
    });
    setSelectedFile(undefined);
    setDialogTitle("Create Copy Trading Account");
    setOpen(true);
  };

  const submitForm = async () => {
    if (form.img == "") {
      toast.error("Please select profile image");
    } else if (form.name == "") {
      toast.error("Please enter name");
    } else if (form.status == "") {
      toast.error("Please select any one status");
    } else if (form.risk_score == "") {
      toast.error("Please select risk score");
    } else if (form.gain == "") {
      toast.error("Please enter gain");
    } else if (form.copiers_left == "") {
      toast.error("Please enter copiers left box");
    } else if (form.copiers_right == "") {
      toast.error("Please enter copiers right box");
    } else if (form.profit == "") {
      toast.error("Please enter profit");
    } else if (form.loss == "") {
      toast.error("Please enter loss");
    } else if (form.commission == "") {
      toast.error("Please enter commission");
    } else if (form.phone == "") {
      toast.error("Please enter Phone");
    } else if (form.address == "") {
      toast.error("Please enter Address");
    } else if (form.email == "") {
      toast.error("Please enter email");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
    ) {
      toast.error("Email format is invaild ");
    } else {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      }
      param.append("copy_master_name", form.name);
      param.append("copy_master_email", form.email);
      param.append("copy_master_phone", form.phone);
      param.append("copy_master_address", form.address);
      param.append("copy_master_profile_pic", form.img);
      param.append("copy_position", 1);
      param.append("copy_risk_score", form.risk_score);
      param.append("copy_gain", form.gain);
      param.append("copy_profit", form.loss);
      param.append("copy_loss", form.loss);
      param.append("current_copier", form.copiers_left);
      param.append("all_time_copier", form.copiers_right);
      param.append("commission_percentage", form.commission);
      param.append("copier_country", "india");

      axios
        .post(`${Url}/ajaxfiles/create_copy_trading_account.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            handleClose();
            toast.success("Copy trading account has been added successfully.");
          }
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

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setForm({ ...form, img: e.target.files[0] });
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item md={12} lg={12} xl={12}>
                <p className="main-heading">Copy Trading</p>
                {/* <CommonFilter /> */}
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <div className="actionGroupButton">
                    <Button
                      variant="contained"
                      className="add_new_copy_trading_account"
                      onClick={handleClickOpen}
                    >
                      Add Copy Trading Account
                    </Button>
                  </div>
                  <br />
                </Paper>
              </Grid>
            </Grid>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyTrading;
