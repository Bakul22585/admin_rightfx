import "./client_list.css";
import React, { useEffect, useState } from "react";
import { Theme, useTheme } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
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
import { BootstrapInput, ColorButton } from "../common/CustomElement";
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

const BootstrapInput1 = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: "8px 26px 8px 10px",

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

const ClientList = (prop) => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [resData, setResData] = useState({});
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("md");
  const [dialogTitle, setDialogTitle] = useState("");
  const navigate = useNavigate();
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [transactionAccessUserId, setTransactionAccessUserId] = useState("");
  const [countryData, setCountryData] = useState({
    data: [],
  });
  const [updateDate, setUpdateDate] = useState({
    structure_id: "",
    structure_name: "",
    user_id: "",
    structure_data: [],
    list_ib_users: [],
    list_ib_users_structure: [],
  });
  const [selectedAadharCardFrontFile, setSelectedAadharCardFrontFile] =
    useState();
  const [previewAadharCardFront, setPreviewAadharCardFront] = useState();
  const [selectedAadharCardBackFile, setSelectedAadharCardBackFile] =
    useState();
  const [previewAdditionalDocumentsBack, setPreviewAdditionalDocumentsBack] =
    useState();
  const [selectedAdditionalDocumentsBack, setSelectedAdditionalDocumentsBack] =
    useState();

  const [previewAdditionalDocuments, setPreviewAdditionalDocuments] =
    useState();
  const [selectedAdditionalDocuments, setSelectedAdditionalDocuments] =
    useState();

  const [previewAadharCardBack, setPreviewAadharCardBack] = useState();
  const [activeStep, setActiveStep] = useState(0);
  // const [clientType, setClientType] = useState("");
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
  const [cilentAdd, setCilentAdd] = useState({
    title: "",
    ibLevel: "",
    firstName: "",
    lastName: "",
    countryResidency: "",
    phone: "",
    email: "",
    portalPassword: "",
    portalPasswordConfirm: "",
    idnumber: "",
    maincheck: false,
    sencons: false,
    isLoader: false,
  });
  const [cilentAddtf, setCilentAddtf] = useState({
    title: false,
    firstName: false,
    lastName: false,
    ibLevel: false,
    countryResidency: false,
    phone: false,
    email: false,
    portalPassword: false,
    portalPasswordConfirm: false,
  });
  console.log("previewAadharCardFront", previewAadharCardFront);
  const [salesList, setSalesList] = useState([]);
  const [param, setParam] = useState({
    filter: id,
  });
  const [isDefaultStructure, setIsDefaultStructure] = useState(true);

  const [transactionAccessData, setTransactionAccessData] = useState({});
  const [transactionAccessLoader, setTransactionAccessLoader] = useState(false);
  toast.configure();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleContextClose = (index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = null;
    setOpenTableMenus(tableMenus);
  };
  useEffect(() => {
    if (!selectedAdditionalDocuments) {
      setPreviewAdditionalDocuments(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedAdditionalDocuments);
    setPreviewAdditionalDocuments(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAdditionalDocuments]);
  useEffect(() => {
    if (!selectedAdditionalDocumentsBack) {
      setPreviewAdditionalDocumentsBack(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedAdditionalDocumentsBack);
    setPreviewAdditionalDocumentsBack(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAdditionalDocumentsBack]);
  useEffect(() => {
    if (!selectedAadharCardFrontFile) {
      setPreviewAadharCardFront(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedAadharCardFrontFile);
    setPreviewAadharCardFront(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAadharCardFrontFile]);

  useEffect(() => {
    if (!selectedAadharCardBackFile) {
      setPreviewAadharCardBack(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedAadharCardBackFile);
    setPreviewAadharCardBack(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedAadharCardBackFile]);
  const getcontry = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    axios.post(Url + "/datatable/get_countries.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        countryData.data = res.data.aaData;
        setCountryData({ ...countryData });
      }
    });
  };
  const ibUsersStructure = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "list_ib_users_structure");
    param.append("ib_user_id", updateDate.user_id);

    axios.post(Url + "/ajaxfiles/user_manage.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        updateDate.list_ib_users_structure = res.data.data;
        setUpdateDate({ ...updateDate });
      }
    });
  };
  const listIbUsers = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "list_ib_users");

    axios.post(Url + "/ajaxfiles/user_manage.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        updateDate.structure_id = "";
        updateDate.user_id = "";
        updateDate.list_ib_users_structure = [];
        updateDate.structure_data = [];
        updateDate.list_ib_users = res.data.data;
        setUpdateDate({ ...updateDate });
      }
    });
  };
  const getStructure2 = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "view_ib_user_structure");
    param.append("user_id", updateDate.user_id);
    param.append("structure_id", updateDate.structure_id);

    axios.post(Url + "/ajaxfiles/user_manage.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        setIsDefaultStructure(false);
        updateDate.structure_data = res.data.data;
        if (res.data.structure_id) {
          updateDate.structure_id = res.data.structure_id;
          updateDate.structure_name = res.data.structure_name;
        }
        updateDate.structure_name = "";
        setUpdateDate({ ...updateDate });
      }
    });
  };
  const getStructure = () => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("action", "get_ib_default_structure");

    axios.post(Url + "/ajaxfiles/user_manage.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        setIsDefaultStructure(true);
        updateDate.structure_data = res.data.data;
        if (res.data.structure_id) {
          updateDate.structure_id = res.data.structure_id;
          updateDate.structure_name = res.data.structure_name;
        }
        updateDate.structure_name = "";
        setUpdateDate({ ...updateDate });
      }
    });
  };
  const gotoProfile = (e) => {
    navigate("/profile/" + e.user_id);
  };
  const onSelectFile = (e, flag) => {
    if (flag == "aadhar_front") {
      if (!e.target.files || e.target.files.length === 0) {
        setPreviewAadharCardFront(undefined);
        return;
      }

      setSelectedAadharCardFrontFile(e.target.files[0]);
    } else if (flag == "aadhar_back") {
      if (!e.target.files || e.target.files.length === 0) {
        setPreviewAadharCardBack(undefined);
        return;
      }

      setSelectedAadharCardBackFile(e.target.files[0]);
    } else if (flag == "additional_documents") {
      if (!e.target.files || e.target.files.length === 0) {
        setPreviewAdditionalDocuments(undefined);
        return;
      }

      setSelectedAdditionalDocuments(e.target.files[0]);
    } else if (flag == "additional_documents_back") {
      if (!e.target.files || e.target.files.length === 0) {
        setPreviewAdditionalDocumentsBack(undefined);
        return;
      }

      setSelectedAdditionalDocumentsBack(e.target.files[0]);
    }
  };
  const input1 = (event) => {
    const { name, value } = event.target;
    setCilentAdd((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const trueFalse = (event) => {
    var { name, value } = event.target;
    setCilentAddtf((prevalue) => {
      return {
        ...prevalue,
        [name]: true,
      };
    });
  };
  const personalsubmit = () => {
    if (dialogTitle == "Add IB" && cilentAdd.ibLevel == "") {
      toast.error("IB Level is requied");
    } else if (cilentAdd.title == "") {
      toast.error("Title is requied");
    } else if (cilentAdd.firstName == "") {
      toast.error("First name is required");
    } else if (cilentAdd.lastName == "") {
      toast.error("Last name is required");
    } else if (cilentAdd.countryResidency == "") {
      toast.error("country is required");
    } else if (cilentAdd.email == "") {
      toast.error("Email is required");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(cilentAdd.email)
    ) {
      toast.error("Enter a valid email");
    } else if (cilentAdd.phone == "") {
      toast.error("Phone is required");
    } else if (
      cilentAdd.phone.toString().length <= 3 ||
      cilentAdd.phone.toString().length > 12
    ) {
      toast.error("Phone number is not valid");
    } else if (cilentAdd.portalPassword == "") {
      toast.error("Password is required");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        cilentAdd.portalPassword
      )
    ) {
      toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (cilentAdd.portalPasswordConfirm == "") {
      toast.error("Confirm Password is required");
    } else if (cilentAdd.portalPasswordConfirm !== cilentAdd.portalPassword) {
      toast.error("Confirm password did not matched.");
    } else {
      console.log("true", false);
      const param = new FormData();

      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
        param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
      }

      param.append("user_phone", cilentAdd.phone);
      param.append("user_email_address", cilentAdd.email);

      param.append("action", "validate_email_phone");
      cilentAdd.isLoader = true;
      setCilentAdd({ ...cilentAdd });
      axios.post(Url + "/ajaxfiles/user_manage.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          cilentAdd.isLoader = false;
          setCilentAdd({ ...cilentAdd });
        } else {
          if (cilentAdd.ibLevel == "Master IB") {
            getStructure();
          } else if (cilentAdd.ibLevel == "Sub IB") {
            listIbUsers();
          }
          cilentAdd.isLoader = false;
          setCilentAdd({ ...cilentAdd });
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    }
  };
  const formSubmit = () => {
    if (
      cilentAdd.maincheck == true &&
      !selectedAadharCardFrontFile &&
      selectedAadharCardBackFile
    ) {
      toast.error("ID Front Image  is requied");
    } else if (
      cilentAdd.sencons == true &&
      !selectedAdditionalDocuments &&
      selectedAdditionalDocumentsBack
    ) {
      toast.error("Additional ID Front Image  is requied");
    } else {
      if (dialogTitle == "Create new client") {
        const param = new FormData();
        if (IsApprove !== "") {
          param.append("is_app", IsApprove.is_app);
          param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
          param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
        }

        param.append("action", "add_user");
        param.append("user_title", cilentAdd.title);
        param.append("user_first_name", cilentAdd.firstName);
        param.append("user_last_name", cilentAdd.lastName);
        param.append("user_email_address", cilentAdd.email);
        param.append("user_country", cilentAdd.countryResidency);
        param.append("user_phone", cilentAdd.phone);
        param.append("user_password", cilentAdd.portalPassword);
        param.append("user_conf_password", cilentAdd.portalPasswordConfirm);
        param.append("double_sided_documents", cilentAdd.maincheck);
        param.append("additional_double_sided", cilentAdd.sencons);
        param.append("additional_double_sided", cilentAdd.sencons);
        if (cilentAdd.idnumber !== "") {
          param.append("aadhar_card_number", selectedAadharCardFrontFile);
        }
        if (selectedAadharCardFrontFile) {
          param.append("aadhar_card_front_image", selectedAadharCardFrontFile);
        }

        if (selectedAadharCardBackFile) {
          param.append("aadhar_card_back_image", selectedAadharCardBackFile);
        }
        if (selectedAdditionalDocumentsBack) {
          param.append(
            "additional_documents_back",
            selectedAdditionalDocumentsBack
          );
        }
        if (selectedAdditionalDocuments) {
          param.append("additional_documents", selectedAdditionalDocuments);
        }

        cilentAdd.isLoader = true;
        setCilentAdd({ ...cilentAdd });
        axios.post(Url + "/ajaxfiles/user_manage.php", param).then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          if (res.data.status == "error") {
            toast.error(res.data.message);
            cilentAdd.isLoader = false;
            setCilentAdd({ ...cilentAdd });
          } else {
            toast.success(res.data.message);
            cilentAdd.isLoader = false;
            setCilentAdd({ ...cilentAdd });
            setRefresh(!refresh);
            setOpen(false);
          }
        });
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const formSubmitwithstr = () => {
    if (updateDate.structure_name == "" && cilentAdd.ibLevel == "Master IB") {
      toast.error("Structure name is required");
    } else if (updateDate.user_id == "" && cilentAdd.ibLevel == "Sub IB") {
      toast.error("IB User is required");
    } else if (updateDate.structure_id == "" && cilentAdd.ibLevel == "Sub IB") {
      toast.error("Users Strctures is required");
    } else {
      const param = new FormData();
      if (IsApprove !== "") {
        param.append("is_app", IsApprove.is_app);
        param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
        param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
      }
      param.append("user_title", cilentAdd.title);
      param.append("user_first_name", cilentAdd.firstName);
      param.append("user_last_name", cilentAdd.lastName);
      param.append("user_email_address", cilentAdd.email);
      param.append("user_country", cilentAdd.countryResidency);
      param.append("user_phone", cilentAdd.phone);
      param.append("user_password", cilentAdd.portalPassword);
      param.append("user_conf_password", cilentAdd.portalPasswordConfirm);
      param.append("double_sided_documents", cilentAdd.maincheck);
      param.append("additional_double_sided", cilentAdd.sencons);
      param.append("additional_double_sided", cilentAdd.sencons);
      if (cilentAdd.ibLevel == "Master IB") {
        param.append("structure_name", updateDate.structure_name);
        param.append("pair_data", JSON.stringify(updateDate.structure_data));
        param.append("action", "add_master_ib_user");
      }
      if (cilentAdd.ibLevel == "Sub IB") {
        param.append("structure_id", updateDate.structure_id);
        param.append("sponsor_id", updateDate.user_id);
        param.append("action", "add_sub_ib_user");
      }
      if (cilentAdd.idnumber !== "") {
        param.append("aadhar_card_number", selectedAadharCardFrontFile);
      }
      if (selectedAadharCardFrontFile) {
        param.append("aadhar_card_front_image", selectedAadharCardFrontFile);
      }

      if (selectedAadharCardBackFile) {
        param.append("aadhar_card_back_image", selectedAadharCardBackFile);
      }
      if (selectedAdditionalDocumentsBack) {
        param.append(
          "additional_documents_back",
          selectedAdditionalDocumentsBack
        );
      }
      if (selectedAdditionalDocuments) {
        param.append("additional_documents", selectedAdditionalDocuments);
      }

      cilentAdd.isLoader = true;
      setCilentAdd({ ...cilentAdd });
      axios.post(Url + "/ajaxfiles/user_manage.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
          cilentAdd.isLoader = false;
          setCilentAdd({ ...cilentAdd });
        } else {
          toast.success(res.data.message);
          cilentAdd.isLoader = false;
          setRefresh(!refresh);
          setCilentAdd({ ...cilentAdd });
          setOpen(false);
        }
      });
    }
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const depositColumn = [
    {
      name: "sr no",
      selector: (row) => {
        return <span>{row.sr_no}</span>;
      },
      // sortable: true,
      reorder: true,
      wrap: true,
      grow: 0.05,
    },
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
          <>
            {prop.permission.open_client_panel == 1 ? (
              <a
                className="linkColor"
                title={row.name}
                onClick={(event) => gotoProfile(row)}
              >
                {row.name}
              </a>
            ) : (
              <span title={row.name}>{row.name}</span>
            )}
          </>
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
            {prop.permission.assign_salesman == 1 ? (
              <Select
                displayEmpty
                inputProps={{
                  "aria-label": "Without label",
                }}
                className="table-dropdown"
                input={<BootstrapInput1 />}
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
            ) : (
              ""
            )}
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
          <>
            {prop.permission.open_client_panel == 1 ? (
              <NavLink
                className="linkColor"
                title={row.sponsor_name}
                to={`/profile/${row.sponsor_id}`}
              >
                {row.sponsor_name}
              </NavLink>
            ) : (
              <span title={row.sponsor_name}>{row.sponsor_name}</span>
            )}
          </>
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
            {row.lead_user == "1" && prop.permission.change_lead_status == 1 ? (
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
            {prop.permission.login_as_user == 1 ? (
              <Button
                onClick={(e) => {
                  userLogin(row);
                }}
              >
                <i className="material-icons">login</i>
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
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <div>
            {prop.permission.transaction_access_status == 1 ? (
              <Button
                onClick={(e) => {
                  transactionStatus(row);
                }}
              >
                <i className="material-icons">manage_accounts</i>
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
  ];
  const input01 = (event) => {
    const { name, value } = event.target;
    setUpdateDate((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
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
        if (res.data.redirect_url == "" && !res.data.redirect_url) {
          window.open(
            `${ClientUrl}/login_as/${res.data.login_token}`,
            "_blank"
          );
          console.log("login by token");
        } else {
          window.open(res.data.redirect_url, "_blank");
          console.log("direct login");
        }
        setTimeout(() => {
          // window.open(res.data.redirect_url, "_blank");
        }, 3000);
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
          setTransactionAccessUserId(data.user_id);
          setTransactionAccessData({ ...res.data });
          setDialogTitle("Transaction Access");
          setOpen(true);
        }
      });
  };

  const manageContent = () => {
    if (dialogTitle == "Transaction Access") {
      return (
        <div className="transaction-access-section">
          <div className="input-access-element">
            <label>Copy Invest Access</label>
            <Switch
              checked={
                transactionAccessData.is_copy_invest_active == "1"
                  ? true
                  : false
              }
              onChange={(e) => {
                transactionAccessData.is_copy_invest_active =
                  transactionAccessData.is_copy_invest_active == "1"
                    ? "0"
                    : "1";
                setTransactionAccessData({ ...transactionAccessData });
              }}
            />
          </div>
          <div className="input-access-element">
            <label>Copy Withdraw Access</label>
            <Switch
              checked={
                transactionAccessData.is_copy_withdraw_active == "1"
                  ? true
                  : false
              }
              onChange={(e) => {
                transactionAccessData.is_copy_withdraw_active =
                  transactionAccessData.is_copy_withdraw_active == "1"
                    ? "0"
                    : "1";
                setTransactionAccessData({ ...transactionAccessData });
              }}
            />
          </div>
          <div className="input-access-element">
            <label>Deposit Access</label>
            <Switch
              checked={
                transactionAccessData.is_deposit_active == "1" ? true : false
              }
              onChange={(e) => {
                transactionAccessData.is_deposit_active =
                  transactionAccessData.is_deposit_active == "1" ? "0" : "1";
                setTransactionAccessData({ ...transactionAccessData });
              }}
            />
          </div>
          <div className="input-access-element">
            <label>IB Withdraw Access</label>
            <Switch
              checked={
                transactionAccessData.is_ib_withdraw_active == "1"
                  ? true
                  : false
              }
              onChange={(e) => {
                transactionAccessData.is_ib_withdraw_active =
                  transactionAccessData.is_ib_withdraw_active == "1"
                    ? "0"
                    : "1";
                setTransactionAccessData({ ...transactionAccessData });
              }}
            />
          </div>
          <div className="input-access-element">
            <label>Pamm Invest Access</label>
            <Switch
              checked={
                transactionAccessData.is_pamm_invest_active == "1"
                  ? true
                  : false
              }
              onChange={(e) => {
                transactionAccessData.is_pamm_invest_active =
                  transactionAccessData.is_pamm_invest_active == "1"
                    ? "0"
                    : "1";
                setTransactionAccessData({ ...transactionAccessData });
              }}
            />
          </div>
          <div className="input-access-element">
            <label>Pamm Withdraw Access</label>
            <Switch
              checked={
                transactionAccessData.is_pamm_withdraw_active == "1"
                  ? true
                  : false
              }
              onChange={(e) => {
                transactionAccessData.is_pamm_withdraw_active =
                  transactionAccessData.is_pamm_withdraw_active == "1"
                    ? "0"
                    : "1";
                setTransactionAccessData({ ...transactionAccessData });
              }}
            />
          </div>
          <div className="input-access-element">
            <label>Transfer Access</label>
            <Switch
              checked={
                transactionAccessData.is_transfer_active == "1" ? true : false
              }
              onChange={(e) => {
                transactionAccessData.is_transfer_active =
                  transactionAccessData.is_transfer_active == "1" ? "0" : "1";
                setTransactionAccessData({ ...transactionAccessData });
              }}
            />
          </div>
          <div className="input-access-element">
            <label>Withdrawal Access</label>
            <Switch
              checked={
                transactionAccessData.is_withdrawal_active == "1" ? true : false
              }
              onChange={(e) => {
                transactionAccessData.is_withdrawal_active =
                  transactionAccessData.is_withdrawal_active == "1" ? "0" : "1";
                setTransactionAccessData({ ...transactionAccessData });
              }}
            />
          </div>
        </div>
      );
    } else if (dialogTitle == "Create new client" || dialogTitle == "Add IB") {
      return (
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step key="PERSONAL INFORMATION">
            <StepLabel>PERSONAL INFORMATION</StepLabel>
            <StepContent>
              {dialogTitle == "Add IB" ? (
                <div className="elementSection">
                  <FormControl
                    variant="standard"
                    className="w-100"
                    error={
                      cilentAdd.ibLevel == "" && cilentAddtf.ibLevel
                        ? true
                        : false
                    }
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      IB Level
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="ibLevel"
                      onChange={input1}
                      onBlur={trueFalse}
                      value={cilentAdd.ibLevel}
                      style={{ width: "100%" }}
                    >
                      <MenuItem value="Master IB">Master IB</MenuItem>
                      <MenuItem value="Sub IB">Sub IB</MenuItem>
                    </Select>
                    {cilentAdd.ibLevel == "" && cilentAddtf.ibLevel ? (
                      <FormHelperText>IB Level is requied</FormHelperText>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </div>
              ) : (
                <div className="elementSection">
                  <FormControl variant="standard" className="w-100">
                    <InputLabel id="demo-simple-select-standard-label">
                      Client type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      // onChange={addNewClientType}
                      label="Individual"
                      disabled
                      focused
                      value="Individual"
                      style={{ width: "100%" }}
                    >
                      <MenuItem value="Individual">Individual</MenuItem>
                      <MenuItem value="Corporate">Corporate</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}

              {/* <div className="elementSection">
                <FormControl variant="standard" className="w-100">
                  <InputLabel id="demo-simple-select-standard-label">
                    Client type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // onChange={addNewClientType}
                    label="Individual"
                    disabled
                    focused
                    value="Individual"
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Corporate">Corporate</MenuItem>
                  </Select>
                </FormControl>
              </div> */}
              <div className="elementSection">
                <FormControl
                  variant="standard"
                  className="w-30"
                  error={
                    cilentAddtf.title == true && cilentAdd.title == ""
                      ? true
                      : false
                  }
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Title
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    name="title"
                    value={cilentAdd.title}
                    onChange={input1}
                    onBlur={trueFalse}
                    label="Title"
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Mrs">Mrs</MenuItem>
                    <MenuItem value="Miss">Miss</MenuItem>
                    <MenuItem value="Ms">Ms</MenuItem>
                    <MenuItem value="Dr">Dr</MenuItem>
                  </Select>
                  {cilentAddtf.title == true && cilentAdd.title == "" ? (
                    <FormHelperText>Title is requied</FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </div>
              <div className="elementSection">
                <TextField
                  id="standard-basic"
                  className="w-45"
                  name="firstName"
                  error={
                    cilentAddtf.firstName == true && cilentAdd.firstName == ""
                      ? true
                      : false
                  }
                  value={cilentAdd.firstName}
                  onChange={input1}
                  onBlur={trueFalse}
                  helperText={
                    cilentAddtf.firstName == true && cilentAdd.firstName == ""
                      ? "First Name is requied"
                      : ""
                  }
                  label="First Name"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  className="w-45"
                  name="lastName"
                  error={
                    cilentAddtf.lastName == true && cilentAdd.lastName == ""
                      ? true
                      : false
                  }
                  value={cilentAdd.lastName}
                  onChange={input1}
                  onBlur={trueFalse}
                  helperText={
                    cilentAddtf.lastName == true && cilentAdd.lastName == ""
                      ? "last Name is requied"
                      : ""
                  }
                  label="Last Name"
                  variant="standard"
                />
              </div>
              <div className="elementSection">
                <FormControl
                  variant="standard"
                  sx={{ width: "100%" }}
                  error={
                    cilentAdd.countryResidency == "" &&
                    cilentAddtf.countryResidency
                      ? true
                      : false
                  }
                >
                  <InputLabel>Country Residency</InputLabel>
                  <Select
                    label
                    className="select-font-small"
                    name="countryResidency"
                    value={cilentAdd.countryResidency}
                    onChange={input1}
                    onBlur={trueFalse}
                  >
                    {countryData.data.map((item) => {
                      return (
                        <MenuItem value={item.nicename}>
                          {item.nicename}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {cilentAdd.countryResidency == "" &&
                  cilentAddtf.countryResidency ? (
                    <FormHelperText>
                      Country Residency is requied
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </div>
              <div className="elementSection">
                <TextField
                  id="standard-basic"
                  className="w-100"
                  name="email"
                  value={cilentAdd.email}
                  onChange={input1}
                  onBlur={trueFalse}
                  helperText={
                    cilentAdd.email == "" && cilentAddtf.email
                      ? "Email is required"
                      : !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                          cilentAdd.email
                        ) && cilentAddtf.email
                      ? "Enter a valid email"
                      : ""
                  }
                  error={
                    (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      cilentAdd.email
                    ) ||
                      cilentAdd.email == "") &&
                    cilentAddtf.email == true
                      ? true
                      : false
                  }
                  label="Email"
                  variant="standard"
                />
              </div>
              <div className="elementSection">
                <TextField
                  id="standard-basic"
                  className="w-100"
                  name="phone"
                  variant="standard"
                  label="Phone"
                  value={cilentAdd.phone}
                  // onChange={input1}
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value))) {
                      input1(e);
                    }
                  }}
                  onBlur={trueFalse}
                  error={
                    (cilentAdd.phone.toString().length < 4 ||
                      cilentAdd.phone.toString().length > 12 ||
                      cilentAdd.phone == "") &&
                    cilentAddtf.phone
                      ? true
                      : false
                  }
                  helperText={
                    cilentAdd.phone == "" && cilentAddtf.phone
                      ? "Phone is required"
                      : (cilentAdd.phone.toString().length < 4 ||
                          cilentAdd.phone.toString().length > 12) &&
                        cilentAddtf.phone
                      ? "Phone number is not valid"
                      : ""
                  }
                />
              </div>
              <div className="elementSection">
                <TextField
                  type="password"
                  id="standard-basic"
                  name="portalPassword"
                  className="w-100"
                  label="Password"
                  value={cilentAdd.portalPassword}
                  onChange={input1}
                  onBlur={trueFalse}
                  error={
                    (!cilentAdd.portalPassword.match(/[A-Z]/g) ||
                      !cilentAdd.portalPassword.match(/[a-z]/g) ||
                      !cilentAdd.portalPassword.match(/[0-9]/g) ||
                      cilentAdd.portalPassword == "" ||
                      cilentAdd.portalPassword.length < 8 ||
                      cilentAdd.portalPassword.length >= 20 ||
                      !cilentAdd.portalPassword.match(/[!@#$%^&*()_+=]/g)) &&
                    cilentAddtf.portalPassword
                      ? true
                      : false
                  }
                  helperText={
                    cilentAdd.portalPassword == "" && cilentAddtf.portalPassword
                      ? "Enter your password"
                      : cilentAddtf.portalPassword &&
                        (cilentAdd.portalPassword.length < 8 ||
                          cilentAdd.portalPassword.length >= 20)
                      ? "Password must contain atleast 8-20 characters"
                      : cilentAddtf.portalPassword &&
                        (!cilentAdd.portalPassword.match(/[A-Z]/g) ||
                          !cilentAdd.portalPassword.match(/[a-z]/g) ||
                          !cilentAdd.portalPassword.match(/[0-9]/g) ||
                          !cilentAdd.portalPassword.match(/[!@#$%^&*()_+=]/g))
                      ? "Atleast one lower case, upper case,special character and number required"
                      : ""
                  }
                  variant="standard"
                />
              </div>
              <div className="elementSection">
                <TextField
                  type="password"
                  id="standard-basic"
                  name="portalPasswordConfirm"
                  value={cilentAdd.portalPasswordConfirm}
                  onChange={input1}
                  onBlur={trueFalse}
                  error={
                    (cilentAdd.portalPasswordConfirm == "" ||
                      cilentAdd.portalPassword !==
                        cilentAdd.portalPasswordConfirm) &&
                    cilentAddtf.portalPasswordConfirm
                      ? true
                      : false
                  }
                  helperText={
                    cilentAdd.portalPasswordConfirm == "" &&
                    cilentAddtf.portalPasswordConfirm
                      ? "Enter your Confirm password"
                      : cilentAdd.portalPassword !==
                          cilentAdd.portalPasswordConfirm &&
                        cilentAddtf.portalPasswordConfirm
                      ? "Passwords must match"
                      : ""
                  }
                  className="w-100"
                  label="Confirm Password"
                  variant="standard"
                />
              </div>

              <Box sx={{ mb: 2 }}>
                <div className="btnStepperAction">
                  {cilentAdd.isLoader ? (
                    <Button
                      tabIndex="0"
                      size="large"
                      className=" btn-gradient  btn-success createMt5Formloder"
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
                      onClick={personalsubmit}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step key="KYC DOCUMENTS (optional)">
            <StepLabel>KYC DOCUMENTS (optional)</StepLabel>
            <StepContent>
              <div className="elementSection">
                <TextField
                  type="text"
                  id="standard-basic"
                  className="w-100"
                  name="idnumber"
                  onChange={input1}
                  label="ID Number"
                  variant="standard"
                />
              </div>
              <div className="elementSection">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cilentAdd.maincheck}
                      onChange={(e) => {
                        cilentAdd.maincheck = !cilentAdd.maincheck;
                        setCilentAdd({ ...cilentAdd });
                      }}
                    />
                  }
                  label="ID Double side"
                />
              </div>
              <div className="view-image-section" style={{ gap: "34px" }}>
                <div className="element">
                  <label>ID Front Img :</label>
                  <label
                    htmlFor="contained-button-file"
                    className="fileuploadButton"
                  >
                    <Input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => onSelectFile(e, "aadhar_front")}
                    />
                    {selectedAadharCardFrontFile ? (
                      <img
                        src={previewAadharCardFront}
                        className="deposit-upload-image-preview"
                      />
                    ) : (
                      <Button variant="contained" component="span">
                        <i className="material-icons">backup</i>&nbsp;Upload
                      </Button>
                    )}
                  </label>
                </div>
                {cilentAdd.maincheck == true ? (
                  <div className="element">
                    <label>ID Back Img :</label>
                    <label
                      htmlFor="contained-button-file_back"
                      className="fileuploadButton"
                    >
                      <Input
                        accept="image/*"
                        id="contained-button-file_back"
                        type="file"
                        onChange={(e) => onSelectFile(e, "aadhar_back")}
                      />
                      {selectedAadharCardBackFile ? (
                        <img
                          src={previewAadharCardBack}
                          className="deposit-upload-image-preview"
                        />
                      ) : (
                        <Button variant="contained" component="span">
                          <i className="material-icons">backup</i>&nbsp;Upload
                        </Button>
                      )}
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <br />
              <div className="element">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cilentAdd.sencons}
                      onChange={(e) => {
                        cilentAdd.sencons = !cilentAdd.sencons;
                        setCilentAdd({ ...cilentAdd });
                      }}
                    />
                  }
                  label="Additional ID Double side"
                />
              </div>
              <div className="view-image-section">
                <div className="element">
                  <label>Additional ID Front Img :</label>
                  <label
                    htmlFor="contained-button-file_back1"
                    className="fileuploadButton"
                  >
                    <Input
                      accept="image/*"
                      id="contained-button-file_back1"
                      type="file"
                      onChange={(e) => onSelectFile(e, "additional_documents")}
                    />
                    {selectedAdditionalDocuments ? (
                      <img
                        src={previewAdditionalDocuments}
                        className="deposit-upload-image-preview"
                      />
                    ) : (
                      <Button variant="contained" component="span">
                        <i className="material-icons">backup</i>&nbsp;Upload
                      </Button>
                    )}
                  </label>
                </div>
                {cilentAdd.sencons == true ? (
                  <div className="element">
                    <label>Additional ID Back Img :</label>
                    <label
                      htmlFor="contained-button-file_back11"
                      className="fileuploadButton"
                    >
                      <Input
                        accept="image/*"
                        id="contained-button-file_back11"
                        type="file"
                        onChange={(e) =>
                          onSelectFile(e, "additional_documents_back")
                        }
                      />
                      {selectedAdditionalDocumentsBack ? (
                        <img
                          src={previewAdditionalDocumentsBack}
                          className="deposit-upload-image-preview"
                        />
                      ) : (
                        <Button variant="contained" component="span">
                          <i className="material-icons">backup</i>&nbsp;Upload
                        </Button>
                      )}
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Box sx={{ mb: 2 }}>
                <div className="btnStepperAction">
                  {cilentAdd.isLoader ? (
                    <Button
                      tabIndex="0"
                      size="large"
                      className=" btn-gradient  btn-success createMt5Formloder"
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
                      onClick={formSubmit}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {dialogTitle == "Add IB" ? "Next" : "Submit"}
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
          {dialogTitle == "Add IB" ? (
            <Step key="SET REBATE AND COMMISSION">
              <StepLabel>SET REBATE AND COMMISSION</StepLabel>
              <StepContent>
                {" "}
                <div className="main-content-input">
                  <div className="ib-structure view-commission-content-section">
                    {cilentAdd.ibLevel == "Master IB" ? (
                      <div style={{ width: "100%" }}>
                        <label
                          htmlFor="remarks"
                          className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                        >
                          Structure Name
                        </label>
                        <BootstrapInput
                          name="structure_name"
                          value={updateDate.structure_name}
                          onChange={input01}
                          displayEmpty
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="d-flex" style={{ gap: "21px" }}>
                        <div className="padingtopmy5create w-100">
                          <Autocomplete
                            disablePortal
                            options={updateDate.list_ib_users}
                            getOptionLabel={(option) =>
                              option ? option.ib_user_name : ""
                            }
                            onChange={(event, newValue) => {
                              console.log(newValue);
                              updateDate.user_id = newValue
                                ? newValue.ib_user_id
                                : "";
                              if (newValue !== null) {
                                ibUsersStructure();
                              } else {
                                updateDate.user_id = "";
                                updateDate.structure_data = [];
                              }
                              setUpdateDate({ ...updateDate });
                            }}
                            sx={{ width: "100%" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="IB Users"
                                variant="standard"
                              />
                            )}
                          />
                        </div>
                        {updateDate.user_id !== "" ? (
                          <div className="padingtopmy5create w-100">
                            <Autocomplete
                              disablePortal
                              options={updateDate.list_ib_users_structure}
                              getOptionLabel={(option) =>
                                option ? option.structure_name : ""
                              }
                              onChange={(event, newValue) => {
                                updateDate.structure_id = newValue
                                  ? newValue.structure_id
                                  : "";
                                if (updateDate.structure_id !== "") {
                                  getStructure2();
                                } else {
                                  updateDate.structure_data = [];
                                }
                                setUpdateDate({ ...updateDate });
                              }}
                              sx={{ width: "100%" }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Users Strctures"
                                  variant="standard"
                                />
                              )}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                    {updateDate.structure_data.map((item, index) => {
                      return (
                        <div className="group-structure-section">
                          <div className="main-section">
                            <div className="main-section-title">
                              {item.ib_group_name}
                            </div>
                            <div className="main-section-input-element">
                              <div>
                                {/* <span>Rebate</span> */}
                                <input
                                  type="text"
                                  className="Rebate_amount"
                                  placeholder="Rebate"
                                  value={item.group_rebate}
                                  disabled={!isDefaultStructure}
                                  onChange={(e) => {
                                    var floatNumber = e.target.value.split(".");
                                    if (!isNaN(Number(e.target.value))) {
                                      if (
                                        floatNumber.length == 1 ||
                                        (floatNumber.length == 2 &&
                                          floatNumber[1].length <= 3)
                                      ) {
                                        updateDate.structure_data[index][
                                          "group_rebate"
                                        ] = e.target.value;
                                        updateDate.structure_data[index][
                                          "pair_data"
                                        ].forEach((value, valueIndex) => {
                                          updateDate.structure_data[index][
                                            "pair_data"
                                          ][valueIndex]["rebate"] =
                                            e.target.value;
                                        });
                                        setUpdateDate({
                                          ...updateDate,
                                        });
                                      }
                                    } else if (
                                      e.target.value == "" ||
                                      e.target.value == 0
                                    ) {
                                      updateDate.structure_data[index][
                                        "group_rebate"
                                      ] = 0;
                                      updateDate.structure_data[index][
                                        "pair_data"
                                      ].forEach((value, valueIndex) => {
                                        updateDate.structure_data[index][
                                          "pair_data"
                                        ][valueIndex]["rebate"] = 0;
                                      });
                                      setUpdateDate({
                                        ...updateDate,
                                      });
                                    }
                                  }}
                                />
                              </div>
                              <div>
                                {/* <span>Commission</span> */}
                                <input
                                  type="text"
                                  className="commission_amount"
                                  placeholder="Commission"
                                  value={item.group_commission}
                                  disabled={!isDefaultStructure}
                                  onChange={(e) => {
                                    var floatNumber = e.target.value.split(".");
                                    if (!isNaN(Number(e.target.value))) {
                                      if (
                                        floatNumber.length == 1 ||
                                        (floatNumber.length == 2 &&
                                          floatNumber[1].length <= 3)
                                      ) {
                                        updateDate.structure_data[index][
                                          "group_commission"
                                        ] = e.target.value;
                                        updateDate.structure_data[index][
                                          "pair_data"
                                        ].forEach((value, valueIndex) => {
                                          updateDate.structure_data[index][
                                            "pair_data"
                                          ][valueIndex]["commission"] =
                                            e.target.value;
                                        });
                                        setUpdateDate({
                                          ...updateDate,
                                        });
                                      }
                                    } else if (
                                      e.target.value == "" ||
                                      e.target.value == 0
                                    ) {
                                      updateDate.structure_data[index][
                                        "group_commission"
                                      ] = 0;
                                      updateDate.structure_data[index][
                                        "pair_data"
                                      ].forEach((value, valueIndex) => {
                                        updateDate.structure_data[index][
                                          "pair_data"
                                        ][valueIndex]["commission"] = 0;
                                      });
                                      setUpdateDate({
                                        ...updateDate,
                                      });
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div className="action-section">
                              {isDefaultStructure ? (
                                <div style={{ width: "95%" }}>
                                  {item.ibGroup != undefined ? (
                                    <Autocomplete
                                      className="autoComplete-input-remove-border"
                                      // disablePortal
                                      options={item.ibGroup}
                                      getOptionLabel={(option) =>
                                        option ? option.ib_group_name : ""
                                      }
                                      onInputChange={(event, newInputValue) => {
                                        // fetchAccount(event, newInputValue);
                                      }}
                                      onChange={(event, newValue) => {
                                        updateDate.structure_data[index][
                                          "ib_group_level_id"
                                        ] = newValue.ib_group_level_id;
                                        setUpdateDate({
                                          ...updateDate,
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="IB Group"
                                          variant="standard"
                                          style={{
                                            width: "100%",
                                            border: "0px !important",
                                          }}
                                        />
                                      )}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                              <span
                                onClick={(e) => {
                                  updateDate.structure_data[index][
                                    "is_visible"
                                  ] = !item.is_visible;
                                  setUpdateDate({ ...updateDate });
                                }}
                              >
                                <i
                                  class={`fa ${
                                    item.is_visible
                                      ? "fa-angle-up"
                                      : "fa-angle-down"
                                  }`}
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>
                          </div>
                          <div
                            className={`pair-section ${
                              item.is_visible ? "child-section-visible" : ""
                            }`}
                          >
                            {item.pair_data.map((item1, index1) => {
                              return (
                                <div className="pair-data">
                                  <div className="pair-data-title">
                                    {item1.pair_name}
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      className="rebert_amount"
                                      placeholder="Rebert"
                                      value={item1.rebate}
                                      disabled={!isDefaultStructure}
                                      onChange={(e) => {
                                        var floatNumber =
                                          e.target.value.split(".");
                                        if (!isNaN(Number(e.target.value))) {
                                          if (
                                            floatNumber.length == 1 ||
                                            (floatNumber.length == 2 &&
                                              floatNumber[1].length <= 3)
                                          ) {
                                            updateDate.structure_data[index][
                                              "pair_data"
                                            ][index1]["rebate"] =
                                              e.target.value;
                                            setUpdateDate({
                                              ...updateDate,
                                            });
                                          }
                                        } else if (
                                          e.target.value == "" ||
                                          e.target.value == 0
                                        ) {
                                          updateDate.structure_data[index][
                                            "pair_data"
                                          ][index1]["rebate"] = 0;
                                          setUpdateDate({
                                            ...updateDate,
                                          });
                                        }
                                      }}
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      className="commission_amount"
                                      placeholder="Commission"
                                      value={item1.commission}
                                      disabled={!isDefaultStructure}
                                      onChange={(e) => {
                                        var floatNumber =
                                          e.target.value.split(".");
                                        if (!isNaN(Number(e.target.value))) {
                                          if (
                                            floatNumber.length == 1 ||
                                            (floatNumber.length == 2 &&
                                              floatNumber[1].length <= 3)
                                          ) {
                                            updateDate.structure_data[index][
                                              "pair_data"
                                            ][index1]["commission"] =
                                              e.target.value;
                                            setUpdateDate({
                                              ...updateDate,
                                            });
                                          }
                                        } else if (
                                          e.target.value == "" ||
                                          e.target.value == 0
                                        ) {
                                          updateDate.structure_data[index][
                                            "pair_data"
                                          ][index1]["commission"] = 0;
                                          setUpdateDate({
                                            ...updateDate,
                                          });
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Box sx={{ mb: 2 }}>
                    <div className="btnStepperAction">
                      {cilentAdd.isLoader ? (
                        <Button
                          tabIndex="0"
                          size="large"
                          className=" btn-gradient  btn-success createMt5Formloder"
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
                          onClick={formSubmitwithstr}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </Box>
                </div>
              </StepContent>
            </Step>
          ) : (
            ""
          )}
        </Stepper>
      );
    }
  };

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
              disabled
            >
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            </Button>
          ) : (
            <Button
              variant="contained"
              className="btn-gradient btn-success"
              onClick={accessSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      );
    }
  };

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

    axios
      .post(Url + "/ajaxfiles/update_user_profile.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setTransactionAccessLoader(false);
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setTransactionAccessUserId("");
          setTransactionAccessData({});
          setOpen(false);
        }
      });
  };

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
                  source_list={resData.source_list}
                  ib_users_list={resData.ib_users_list}
                  lastUpdatedBy={resData.modified_by_users}
                  sales_manager_list={resData.sales_manager_list}
                  country_list={resData.country_list}
                  advance_filters={resData.advance_filters}
                />
                <br />
                <Paper
                  elevation={2}
                  style={{ borderRadius: "10px" }}
                  className="pending-all-15px"
                >
                  <div className="actionGroupButton">
                    <Button
                      variant="contained"
                      onClick={() => {
                        getcontry();
                        setActiveStep(0);
                        setSelectedAadharCardFrontFile();
                        setSelectedAadharCardBackFile();
                        setSelectedAdditionalDocumentsBack();
                        setSelectedAdditionalDocuments();
                        setCilentAdd({
                          title: "",
                          firstName: "",
                          ibLevel: "",
                          idnumber: "",
                          lastName: "",
                          countryResidency: "",
                          phone: "",
                          email: "",
                          portalPassword: "",
                          portalPasswordConfirm: "",
                          maincheck: false,
                          sencons: false,
                          isLoader: false,
                        });
                        setCilentAddtf({
                          title: false,
                          firstName: false,
                          lastName: false,
                          ibLevel: false,
                          countryResidency: false,
                          phone: false,
                          email: false,
                          portalPassword: false,
                          portalPasswordConfirm: false,
                        });
                        setDialogTitle("Create new client");
                        setOpen(true);
                      }}
                    >
                      Add New Client
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        // listIbUsers();
                        // ibUsersStructure();
                        getcontry();
                        // getStructure2();
                        setActiveStep(0);
                        setSelectedAadharCardFrontFile();
                        setSelectedAadharCardBackFile();
                        setSelectedAdditionalDocumentsBack();
                        setSelectedAdditionalDocuments();
                        setCilentAdd({
                          title: "",
                          ibLevel: "",
                          firstName: "",
                          idnumber: "",
                          lastName: "",
                          countryResidency: "",
                          phone: "",
                          email: "",
                          portalPassword: "",
                          portalPasswordConfirm: "",
                          maincheck: false,
                          sencons: false,
                          isLoader: false,
                        });
                        setCilentAddtf({
                          title: false,
                          firstName: false,
                          lastName: false,
                          ibLevel: false,
                          countryResidency: false,
                          phone: false,
                          email: false,
                          portalPassword: false,
                          portalPasswordConfirm: false,
                        });
                        setDialogTitle("Add IB");
                        setOpen(true);
                      }}
                    >
                      Add IB
                    </Button>
                  </div>
                  <br />
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
