import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import logo1 from "../sidebar/logo1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Url, UserInfo } from "../global";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ff0000"),
  backgroundColor: "black",
  textTransform: "initial",
  fontSize: "13px",
  padding: "15px 22px",
  borderRadius: "100px",
  "&:hover": {
    color: "#3d9730",
    borderRadius: "100px",
    backgroundColor: "black",
  },
}));

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    // color: "white",
    fontWeight: "700",
    color: "#7a7b97 !important",
    fontFamily: "Cairo, sans-serif",
    fontSize: "19px !important",
  },
  "& label": {
    fontWeight: "700",
    color: "#7a7b97 !important",
    fontSize: "19px !important",
    fontFamily: "Cairo, sans-serif",
  },
  "& .MuiInputBase-root": {
    fontSize: "20px !important",
    color: "#7a7b97 !important",
    padding: "4px 0 5px !important",
    fontWeight: "500",
    fontFamily: "Cairo, sans-serif",
  },
  "& .MuiInput-underline:after": {
    // borderBottomColor: "#7a7b97 !important"",
  },
});

export default function Login1(prop) {
  const navigate = useNavigate();
  const [isSubmit, setisSubmit] = useState(false);
  const [infoErrors, setInfoErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [info, setinfo] = useState({
    email: "",
    password: "",
  });
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
    setInfoErrors(validate(info));
    setisSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is requied";
      notify("Email is requied");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
      notify("Email format is invaild ");
      errors.email = "Email format is invaild";
    } else if (!values.password) {
      errors.password = " password is requied";
      notify("Password is requied");
    }
    return errors;
  };
  const notify = (p) => {
    toast.error(p);
  };
  const notify1 = (p) => {
    toast.success(p);
  };

  toast.configure();
  useEffect(() => {
    if (Object.keys(infoErrors).length === 0 && isSubmit) {
      setLoader(true);
      const param = new FormData();
      param.append("username", info.email);
      param.append("password", info.password);
      axios.post(`${Url}/ajaxfiles/login_check.php`, param).then((res) => {
        setLoader(false);
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          notify1("Login successful");
          localStorage.setItem("login", false);
          UserInfo.AADMIN_LOGIN_ID = res.data.user_data.AADMIN_LOGIN_ID;
          UserInfo.AADMIN_LOGIN_NAME = res.data.user_data.AADMIN_LOGIN_NAME;
          UserInfo.AADMIN_LOGIN_ROLE_ID =
            res.data.user_data.AADMIN_LOGIN_ROLE_ID;
          prop.setLogin("false");
          navigate("/dashboard");
        }
      });
    }
  }, [infoErrors]);

  return (
    <>
      <div className="loginCard">
        <div className="card1">
          <div className="loginPading">
            <div className="textCenter">
              <img src={logo1} className="m-3" style={{ width: "70%" }} />
            </div>
            {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <CssTextField
                  id="standard-search"
                  label="Email address"
                  sx={{ width: "100%", fontsize: "19px !important" }}
                  variant="standard"
                  name="email"
                  value={info.email}
                  onChange={input1}
                />
              </div>

              <div className="mb-3">
                <CssTextField
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  variant="standard"
                  sx={{ width: "100%", fontsize: "19px !important" }}
                  value={info.password}
                  onChange={input1}
                />
              </div>

              <div className="text-center w-50 mx-auto mt-5">
                {loader == true ? (
                  <button
                    type="submit"
                    className="btn btn-primary loginbutton"
                    disabled
                  >
                    <svg
                      class="spinner"
                      style={{ position: "unset" }}
                      viewBox="0 0 50 50"
                    >
                      <circle
                        class="path"
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke-width="5"
                      ></circle>
                    </svg>
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary loginbutton">
                    Log In
                  </button>
                )}
                {/* {loader == true ? (
                  <ColorButton
                    tabindex="0"
                    type="submit"
                    size="large"
                    className=" font-weight-bold w-100 my-2 p-3"
                  >
                    <i
                      class="fa fa-refresh fa-spin fa-3x fa-fw"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <span style={{ textTransform: "capitalize" }}>Log In</span>
                    <span className="MuiTouchRipple-root"></span>
                  </ColorButton>
                ) : (
                  <ColorButton
                    tabindex="0"
                    type="submit"
                    size="large"
                    className=" font-weight-bold w-100 my-2 p-3"
                  >
                    <span style={{ textTransform: "capitalize" }}>Log In</span>
                    <span className="MuiTouchRipple-root"></span>
                  </ColorButton> */}
                {/* )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
