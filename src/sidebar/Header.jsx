import React, { useEffect } from "react";
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
import { List, ListItem, Menu } from "@mui/material";
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
        <ButtonBase onClick={handleClick}>
          <span className="MuiButton-label">
            <Avatar sx={{ bgcolor: red[900] }}>DB</Avatar>{" "}
          </span>
          <span className="d-none d-md-inline-block mx-2">
            Dhaval Bhayani
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
            <div className="d-flex p-4">
              <Avatar sx={{ bgcolor: red[900] }}>DB</Avatar>
              <div className="mx-3">
                <h6 className="font-weight-bold mb-1 text-black">
                  Dhiren Bhayani
                </h6>
                <p className="text-black-50 mb-0">bhayanidhiren777@gmail.com</p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="divider"></div>
            {/* <div className="bg-secondary d-flex align-items-center flex-column py-4">
              <div className="display-3 mb-0 text-center font-weight-bold">
                <small className="opacity-6">$</small>
                <span className="pl-1">
                  <span> 0.00</span>
                </span>
              </div>
              <small className="text-center font-weight-bold opacity-6 text-uppercase">
                {" "}
                Total balance
              </small>
            </div>
            <div className="divider"></div> */}
            {/* <List className="nav-neutral-first nav-pills-rounded flex-column p-3">
              <ListItem button={true}>
                  <div className="mr-2 ">
                    <GppGoodIcon />
                  </div>
                  <span className="font-size-md">Profile</span>
              </ListItem>
            </List>
            <div className="divider"></div> */}
            <List className="nav-neutral-danger nav-pills-rounded flex-column p-3">
              <ListItem button={true} onClick={()=>prop.setLogin(true)}>
                <div className="mr-2">
                  <ExitToAppIcon />
                </div>
                <span className="font-size-md">Log out</span>
              </ListItem>
            </List>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
