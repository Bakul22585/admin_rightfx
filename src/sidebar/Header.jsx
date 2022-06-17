import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import GppGoodIcon from '@mui/icons-material/GppGood';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { red } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, List, ListItem, Menu } from "@mui/material";
import TextField from "@mui/material/TextField";
import { NavLink, useNavigate } from "react-router-dom"
import { Logout } from "@mui/icons-material";
import axios from 'axios';
import { Url } from '../global';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { styled } from "@mui/material/styles";
// import i18next, { use } from "i18next";
// import { useTranslation } from "react-i18next";
// import cookies from "js-cookie";
const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
    dir: "ltr",

  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "sa",
  },
  {
    code: "jp",
    name: "日本",
    country_code: "sa",
    dir: "ltr",

  },
  {
    code: "ru",
    name: "русский",
    country_code: "gb",
    dir: "ltr",

  },
  {
    code: "es",
    name: "española",
    country_code: "gb",
    dir: "ltr",

  },
  {
    code: "fa",
    name: "English",
    country_code: "gb",
    dir: "rtl",

  },
  {
    code: "cn",
    name: "English",
    country_code: "gb",
    dir: "ltr",

  }
];
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
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

const CssTextField = styled(TextField)({
  // "& label.Mui-focused": {
  //     color: "white",
  // },
  // "& .MuiInputBase-root": {
  //     color: "white",
  //     fontSize: "20px",
  //     fontWeight: "500",
  // },
  // "& .MuiInput-underline:after": {
  //     borderBottomColor: "white",
  // },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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

const Header = (prop) => {
  // const { t } = useTranslation();

  // const currentLanguageCode = cookies.get("i18next") || "en";
  // const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  /*  useEffect(() => {
     console.log(currentLanguage.dir);
     document.body.dir = currentLanguage.dir || 'ltr'
     // document.title = t('app_title')
     prop.setClang(currentLanguage.dir)
   }, [currentLanguage]); */
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event.target.value);
    // i18next.changeLanguage(event.target.value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [info, setinfo] = useState({
    search: "",
  });
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
    isLoader: false,
  });
  toast.configure();

  const [openModel, setOpenModel] = useState(false);

  const openDialogbox = (e) => {
    setOpenModel(true);
    handleClose();
    setForm({
      current_password: "",
      new_password: "",
      confirm_password: "",
      isLoader: false,
    });
  };
  const CloseDialogbox = () => {
    setOpenModel(false);
  };

  const input1 = (event) => {
    const { name, value } = event.target;
    setinfo((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info['search'] && info['search'].trim() != '') {
      navigate("/master/" + info['search']);
    }
  };

  const Logout = async () => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1)
    await axios.post(Url + '/ajaxfiles/logout.php', param).then((res) => {
      localStorage.setItem("login", true);
      prop.setLogin("true");
      navigate("/login");
    })

  }

  const MyAccount = () => {
    setAnchorEl(null);
    navigate("/myAccount");
  }

  const changePasswordSubmit = async() => {
    if (form.current_password == "") {
      toast.error('Please enter current password');
    } else if (form.new_password == "") {
      toast.error('Please enter new password');
    } else if (form.confirm_password == "") {
      toast.error('Please enter confirm password');
    } else if (form.new_password != form.confirm_password) {
      toast.error('Confirm password must be same like to password');
    } else {
      form.isLoader = true;
      setForm({...form});
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1)
      param.append("current_password", form.current_password);
      param.append("new_password", form.new_password);
      param.append("confirm_password", form.confirm_password);
      await axios.post(Url + '/ajaxfiles/logout.php', param).then((res) => {
        localStorage.setItem("login", true);
        prop.setLogin("true");
        navigate("/login");

        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          CloseDialogbox();
        }
      })
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

  return (
    <div className="app-header app-header--shadow app-header--opacity-bg">
      <div className="app-header--pane">
        <button
          className="navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn"
          onClick={() => prop.setSidebar(true)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <FormControl sx={{ m: 1, minWidth: 70 }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            input={<BootstrapInput />}
          >
            <MenuItem value="">EN</MenuItem>

            <MenuItem value="en">EN</MenuItem>
            <MenuItem value="ar">AR</MenuItem>
            <MenuItem value="jp">JP</MenuItem>
            <MenuItem value="ru">RU</MenuItem>
            <MenuItem value="es">ES</MenuItem>
            <MenuItem value="fa">FA</MenuItem>
            <MenuItem value="cn">CN</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="app-header--pane">
        {/* <form onSubmit={handleSubmit}>
          <CssTextField
            id="standard-search"
            label="Search"
            sx={{ width: "100%" }}
            variant="standard"
            name="search"
            value={info.search}
            onChange={input1}
          />
        </form> */}
        <ButtonBase onClick={handleClick}>
          <span className="MuiButton-label">
            <Avatar sx={{ bgcolor: '#2a3f73' }}>RA</Avatar>{" "}
          </span>
          <span className="d-none d-md-inline-block mx-2">
            RightFx Admin
          </span>
          <KeyboardArrowDownIcon />
        </ButtonBase>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div className="dropdown-menu-xl overflow-hidden p-0">
            <div className="d-flex p-4 cursor-pointer" onClick={() => MyAccount()}>
              <Avatar sx={{ bgcolor: '#2a3f73' }}>RA</Avatar>
              <div className="mx-3">
                <h6 className="font-weight-bold mb-1 text-black">
                  RightFx Admin
                </h6>
                <p className="text-black-50 mb-0">rightfx@gmail.com</p>
              </div>
            </div>
            <div className="divider"></div>
            <List className="nav-neutral-danger nav-pills-rounded flex-column" style={{ padding: '0 15px' }}>
              <ListItem button={true} onClick={() => openDialogbox()}>
                <div className="mr-2">
                  <i className="material-icons">password</i>
                </div>
                <span className="font-size-md">Change Password</span>
              </ListItem>
            </List>
            {/* <div style={{padding: "0 25px"}}>
              <Button onClick={openDialogbox}><i className="material-icons">password</i>&nbsp;&nbsp;Change Password</Button>
            </div> */}
            <div className="divider"></div>
            <List className="nav-neutral-danger nav-pills-rounded flex-column p-3">
              <ListItem button={true} onClick={() => Logout()}>
                <div className="mr-2">
                  <ExitToAppIcon />
                </div>
                <span className="font-size-md">Log out</span>
              </ListItem>
            </List>
          </div>
        </Menu>

        <BootstrapDialog
          onClose={CloseDialogbox}
          aria-labelledby="customized-dialog-title"
          open={openModel}
          className='modalWidth100'
        >
          <BootstrapDialogTitle id="customized-dialog-title" className='dialogTitle' onClose={CloseDialogbox}>
            Change Your Password
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div className='changePasswordSection'>
              <div className='element'>
                <TextField name="current_password" onChange={input} label="Current Password" variant="standard" sx={{ width: '100%' }} focused />
              </div>
              <br />
              <div className='element'>
                <TextField name="new_password" onChange={input} label="New Password" variant="standard" sx={{ width: '100%' }} focused />
              </div>
              <br />
              <div className='element'>
                <TextField name="confirm_password" onChange={input} label="Confirm Password" variant="standard" sx={{ width: '100%' }} focused />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <div className='dialogMultipleActionButton'>
              <Button variant="contained" className='cancelButton' onClick={CloseDialogbox}>Cancel</Button>
              {
                (form.isLoader) ? <Button
              tabindex="0"
              size="large"
              className=" btn-gradient createMt5Formloder"
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
            </Button> : <Button variant="contained" className='btn-gradient' onClick={changePasswordSubmit}>Change Password</Button>
              }
              
            </div>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
};

export default Header;
