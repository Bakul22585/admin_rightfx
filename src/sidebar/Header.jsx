import React, { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
        <ButtonBase>
          <span className="MuiButton-label">
            <Avatar sx={{ bgcolor: red[900] }}>DB</Avatar>{" "}
          </span>
          <span className="d-none d-md-inline-block mx-2">
            Dhaval Bhayani
          </span>
          <KeyboardArrowDownIcon />
        </ButtonBase>
      </div>
    </div>
  );
};

export default Header;
