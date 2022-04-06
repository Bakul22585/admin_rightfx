import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import logo1 from "./loginLogo.png";
import { useNavigate } from "react-router-dom"

// import logo from './logo2.png';
// import ForgotPassword from './ForgotPassword';
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
//import CssTextField from './CssTextField';
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
        color: "#ff0000",
        borderRadius: "100px",
        backgroundColor: "black",
    },
}));

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInputBase-root": {
        color: "white",
        fontSize: "20px",
        fontWeight: "500",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "white",
    },
});

export default function Login1(prop) {
    const navigate = useNavigate();
    console.log(prop.setLogin);
    const [isSubmit, setisSubmit] = useState(false);
    const [infoErrors, setInfoErrors] = useState({});
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

        console.log(info);
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
            console.log(values.email);
            notify("Email format is invaild ");
            errors.email = "Email format is invaild";
        }
        if (!values.password) {
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
            notify1("Login successful");
            prop.setLogin(false);
            navigate("/dashboard");
        }
    }, [infoErrors]);

    // const { label, value, error=null, onChange } = props

    // const [values, setValues] = useState({ email: "", password: "" });
    //   const [errors, setErrors] = useState({});
    //   const [isSubmit, setIsSubmit] = useState(true);

    //   const handleInputChange = e => {
    //     const { name, value } = e.target
    //     setValues({
    //         ...values,
    //         [name]: value
    //     })

    // }

    // const validate = (fieldValues = values) => {
    //   let temp = { ...errors }
    //   if ('email' in fieldValues)
    //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Invalid email address"
    //   if ('password' in fieldValues)
    //     temp.password = fieldValues.password ? "" : "Invalid password"
    //     setErrors({
    //       ...temp
    //   })
    //   if (fieldValues == values)
    //           return Object.values(temp).every(x => x == "")
    // }

    //   const handleSubmit = (e) => {
    //        e.preventDefault();
    //        setErrors(validate(values));
    //       setIsSubmit(true);
    //      };

    // const {
    //   values,
    //   setValues,
    //   errors,
    //   setErrors,
    //   handleInputChange,
    // }= useForm(initialFValues, true, validate);

    // const [formValues, setFormValues] = useState({ email: "", password: "" });
    // const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState(false);

    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormValues({ ...formValues, [name]: value });
    // }

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   setFormErrors(validate(formValues));
    //   setIsSubmit(true);
    // };

    // useEffect(() => {
    //   console.log(formErrors);
    //   if (Object.keys(formErrors).length == 0 && isSubmit) {
    //     console.log(formValues);
    //   }
    // }, [formErrors]);

    // const validate = (values) => {
    //   const errors = {};
    //   if (!values.email) {
    //     errors.email = "Requied";
    //   }
    //   if (!values.password) {
    //     errors.password = "Requied";
    //   }
    // }
    return (
        <>
            <div className="loginCard">
                <div className="textCenter">
                    <img src={logo1} className="m-3 m-5" style={{ width: "70%" }} />
                </div>
                <div className="card1">
                    <div className="loginPading">
                        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}
                        <form onSubmit={handleSubmit}>
                            <div className="my-4">
                                <CssTextField
                                    id="standard-search"
                                    label="Email address"
                                    sx={{ width: "100%" }}
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
                                    sx={{ width: "100%" }}
                                    value={info.password}
                                    onChange={input1}
                                />
                            </div>

                            <div className="text-center w-50 mx-auto">
                                <ColorButton
                                    tabindex="0"
                                    type="submit"
                                    size="large"
                                    className=" font-weight-bold w-100 my-2 p-3"
                                >
                                    <span style={{ textTransform: "capitalize" }}>Log In</span>
                                    <span className="MuiTouchRipple-root"></span>
                                </ColorButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
