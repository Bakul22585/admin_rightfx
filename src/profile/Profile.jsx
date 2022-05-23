import "./profile.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Menu,
  Tabs,
  Tab,
  Typography,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Input,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import DataTable from "react-data-table-component";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomImageModal from "../common/CustomImageModal";
import CommonTable from "../common/CommonTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@emotion/react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import mapDataWorld from "@highcharts/map-collection/custom/world.geo.json";
import Chart from "react-apexcharts";
import { Url } from "../global";
const WorldMap = require("react-world-map");

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className="panding-left-right-0"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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
    borderRadius: 9,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: "12px",
    padding: "8px 10px 8px 10px",
    marginTop: 0,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.

    "&:hover": {
      borderColor: "#1e64b4;",
    },
    "&:focus": {
      borderRadius: 9,
      borderColor: "#1e64b4;",
      border: "2px solid #1e64b4;",
    },
  },
}));

var data: [string, number][] = [
  ["fo", 0],
  ["um", 1],
  ["us", 2],
  ["jp", 3],
  ["sc", 4],
  ["in", 500],
  ["fr", 6],
  ["fm", 7],
  ["cn", 8],
  ["pt", 9],
  ["sw", 10],
  ["sh", 11],
  ["br", 12],
  ["ki", 13],
  ["ph", 14],
  ["mx", 15],
  ["es", 16],
  ["bu", 17],
  ["mv", 18],
  ["sp", 19],
  ["gb", 20],
  ["gr", 21],
  ["as", 22],
  ["dk", 23],
  ["gl", 24],
  ["gu", 25],
  ["mp", 26],
  ["pr", 27],
  ["vi", 28],
  ["ca", 29],
  ["st", 30],
  ["cv", 31],
  ["dm", 32],
  ["nl", 33],
  ["jm", 34],
  ["ws", 35],
  ["om", 36],
  ["vc", 37],
  ["tr", 38],
  ["bd", 39],
  ["lc", 40],
  ["nr", 41],
  ["no", 42],
  ["kn", 43],
  ["bh", 44],
  ["to", 45],
  ["fi", 46],
  ["id", 47],
  ["mu", 48],
  ["se", 49],
  ["tt", 50],
  ["my", 51],
  ["pa", 52],
  ["pw", 53],
  ["tv", 54],
  ["mh", 55],
  ["cl", 56],
  ["th", 57],
  ["gd", 58],
  ["ee", 59],
  ["ag", 60],
  ["tw", 61],
  ["bb", 62],
  ["it", 63],
  ["mt", 64],
  ["vu", 65],
  ["sg", 66],
  ["cy", 67],
  ["lk", 68],
  ["km", 69],
  ["fj", 70],
  ["ru", 71],
  ["va", 72],
  ["sm", 73],
  ["kz", 74],
  ["az", 75],
  ["tj", 76],
  ["ls", 77],
  ["uz", 78],
  ["ma", 79],
  ["co", 80],
  ["tl", 81],
  ["tz", 82],
  ["ar", 83],
  ["sa", 84],
  ["pk", 85],
  ["ye", 86],
  ["ae", 87],
  ["ke", 88],
  ["pe", 89],
  ["do", 90],
  ["ht", 91],
  ["pg", 92],
  ["ao", 93],
  ["kh", 94],
  ["vn", 95],
  ["mz", 96],
  ["cr", 97],
  ["bj", 98],
  ["ng", 99],
  ["ir", 100],
  ["sv", 101],
  ["sl", 102],
  ["gw", 103],
  ["hr", 104],
  ["bz", 105],
  ["za", 106],
  ["cf", 107],
  ["sd", 108],
  ["cd", 109],
  ["kw", 110],
  ["de", 111],
  ["be", 112],
  ["ie", 113],
  ["kp", 114],
  ["kr", 115],
  ["gy", 116],
  ["hn", 117],
  ["mm", 118],
  ["ga", 119],
  ["gq", 120],
  ["ni", 121],
  ["lv", 122],
  ["ug", 123],
  ["mw", 124],
  ["am", 125],
  ["sx", 126],
  ["tm", 127],
  ["zm", 128],
  ["nc", 129],
  ["mr", 130],
  ["dz", 131],
  ["lt", 132],
  ["et", 133],
  ["er", 134],
  ["gh", 135],
  ["si", 136],
  ["gt", 137],
  ["ba", 138],
  ["jo", 139],
  ["sy", 140],
  ["mc", 141],
  ["al", 142],
  ["uy", 143],
  ["cnm", 144],
  ["mn", 145],
  ["rw", 146],
  ["so", 147],
  ["bo", 148],
  ["cm", 149],
  ["cg", 150],
  ["eh", 151],
  ["rs", 152],
  ["me", 153],
  ["tg", 154],
  ["la", 155],
  ["af", 156],
  ["ua", 157],
  ["sk", 158],
  ["jk", 159],
  ["bg", 160],
  ["qa", 161],
  ["li", 162],
  ["at", 163],
  ["sz", 164],
  ["hu", 165],
  ["ro", 166],
  ["ne", 167],
  ["lu", 168],
  ["ad", 169],
  ["ci", 170],
  ["lr", 171],
  ["bn", 172],
  ["iq", 173],
  ["ge", 174],
  ["gm", 175],
  ["ch", 176],
  ["td", 177],
  ["kv", 178],
  ["lb", 179],
  ["dj", 180],
  ["bi", 181],
  ["sr", 182],
  ["il", 183],
  ["ml", 184],
  ["sn", 185],
  ["gn", 186],
  ["zw", 187],
  ["pl", 188],
  ["mk", 189],
  ["py", 190],
  ["by", 191],
  ["cz", 192],
  ["bf", 193],
  ["na", 194],
  ["ly", 195],
  ["tn", 196],
  ["bt", 197],
  ["md", 198],
  ["ss", 199],
  ["bw", 200],
  ["bs", 201],
  ["nz", 202],
  ["cu", 203],
  ["ec", 204],
  ["au", 205],
  ["ve", 206],
  ["sb", 207],
  ["mg", 208],
  ["is", 209],
  ["eg", 210],
  ["kg", 211],
  ["np", 212],
];

const options: Highcharts.Options = {
  colors: [
    "rgba(227, 64, 117, 1)",
    "rgba(227,64,117,0.2)",
    "rgba(227,64,117,0.4)",
    "rgba(227,64,117,0.5)",
    "rgba(227,64,117,0.6)",
    "rgba(227,64,117,0.8)",
    "rgba(227,64,117,1)",
  ],
  title: {
    text: "",
  },
  colorAxis: {
    dataClasses: [
      {
        to: 3,
        color: "rgba(227, 64, 117, 0.1)",
      },
      {
        from: 3,
        to: 10,
        color: "rgba(227,64,117,0.2)",
      },
      {
        from: 10,
        to: 30,
        color: "rgba(227,64,117,0.4)",
      },
      {
        from: 30,
        to: 100,
        color: "rgba(227,64,117,0.5)",
      },
      {
        from: 100,
        to: 300,
        color: "rgba(227,64,117,0.6)",
      },
      {
        from: 300,
        to: 1000,
        color: "rgba(227,64,117,0.8)",
      },
      {
        from: 1000,
        color: "rgba(227, 64, 117, 1)",
      },
    ],
  },
  series: [
    {
      type: "map",
      mapData: mapDataWorld,
      data: data,
    },
  ],
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
    },
  },
};

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogTransactionType, setDialogTransactionType] = useState("");
  const [openTableMenus, setOpenTableMenus] = useState([]);
  // const [filterData, setFilterData] = useState({});
  const [userData, setuserData] = useState({ isLoader: true, data: {} });
  const [filterSection, setFilterSection] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [option, setOption] = useState(true);
  const [filterData, setFilterData] = useState(null);
  const [change, setChange] = useState(false);
  const [proofAdd, setProofAdd] = useState([]);
  const [doc, setDoc] = useState({
    proof: "",
    id: "",
    fontimg: "",
    backimg: "",
  });

  const [profileForm, setProfileForm] = useState({
    title: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    dob: "",
    nationality: "",
    country_of_residence: "",
    city: "",
    address: "",
    address_2: "",
    gender: "",
    postal_code: "",
    language: "",
    source: "",
    us_citizen: "",
    finacial_work: "",
    tax_number: "",
    politically_exposed: "",
    sales_agent: "",
  });
  const [createMt5Form, setCreateMt5Form] = useState({
    account_type: "",
    account_option: "",
  });
  const [Mt5AccessForm, setMt5AccessForm] = useState({
    account_type: "",
    status: "",
  });
  const [linkAccountForm, setLinkAccountForm] = useState({
    account_number: "",
    account_type: "",
    account_name: "",
  });
  const [resetMt5PasswordForm, setResetMt5PasswordForm] = useState({
    account: "",
  });
  const [changeLeverageForm, setChangeLeverageForm] = useState({
    account: "",
    leverage: "",
  });
  const [changeAccountPasswordForm, setChangeAccountPasswordForm] = useState({
    main_password: "",
    view_password: "",
  });
  const [masterStructureForm, setmasterStructureForm] = useState({
    name: "",
    forex_rebate: "",
    forex_commission: "",
    bullion_rebate: "",
    bullion_commission: "",
    indices_rebate: "",
    indices_commission: "",
    energy_rebate: "",
    energy_commission: "",
    crypto_rebate: "",
    crypto_commission: "",
  });
  const [employmentDetailsForm, setEmploymentDetailsForm] = useState({
    status: "",
    industry: "",
  });
  const [sharedStructureForm, setSharedStructureForm] = useState({
    name: "",
    total_rebate: "",
    total_commission: "",
    list: [
      {
        id: "",
        name: "",
        value: "",
      },
    ],
  });
  const [linkClientForm, setLinkClientForm] = useState({
    client: "",
    structure: "",
  });
  const [linkIBForm, setLinkIBForm] = useState({
    master_account: "",
    customer_name: "",
    structure: "",
  });
  const [sendMailForm, setsendMailForm] = useState({
    from: "",
    to: "",
    subject: "",
    template_title: "",
    language: "",
    template: "",
    body: "",
  });
  const [cpAccessForm, setCpAccessForm] = useState({
    status: "",
  });
  const [noteForm, setNoteForm] = useState({
    notes: "",
    call_status: "",
    set_reminder: false,
    date: "",
  });
  const [bankAccountForm, setBankAccountForm] = useState({
    name: "",
    bank_name: "",
    bank_address: "",
    iban_number: "",
    account_number: "",
    swift_code: "",
    currency_code: "",
  });
  const [transactionForm, setTransactionForm] = useState({
    type: "",
    from_account_type: "",
    credit_type: "",
    deposit_to: "",
    transfer_to: "",
    account: "",
    account_to: "",
    payment: "",
    amount: "",
    img: "",
    note: "",
    currency_code: "",
    isLoader: false,
    transation_id: "",
    wallet_code: "",
    mt5_account_id: "",
  });
  const [linkCampaignForm, setLinkCampaignForm] = useState({
    account: "",
    campaign: "",
  });
  const [editSharedStructureForm, setEditSharedStructureForm] = useState({
    name: "",
    total_rebate: "",
    total_commission: "",
    list: [
      {
        id: "",
        name: "",
        value: "",
      },
    ],
  });
  const [deleteStructureForm, setDeleteStructureForm] = useState({
    structure: "",
  });
  toast.configure();

  const depositColumn = [
    {
      name: "Bank Name",
      selector: (row) => {
        return <span title={row.mt5_id}>{row.mt5_id}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Swift",
      selector: (row) => {
        return <span title={row.wallet_code}>{row.wallet_code}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "Bank Address",
      selector: (row) => {
        return <span title={row.group_level}>{row.group_level}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "IBAN",
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
      grow: 1,
    },
    {
      name: "Account Number",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1.5,
    },
    {
      name: "CURRENCY",
      selector: (row) => {
        return <span title={row.user_phone}>{row.user_phone}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "BENEFICiary Name",
      selector: (row) => {
        return (
          <span title={row.user_visible_password}>
            {row.user_visible_password}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <div>
            <Button
              id={`actionButton_${row.sr_no}`}
              aria-controls={open ? `basic-menu-${row.sr_no}` : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => handleContextClick(event, row.sr_no)}
              {...row}
              style={{ color: "rgb(144 145 139)" }}
            >
              <i className="material-icons">more_horiz</i>
            </Button>
            <Menu
              id={`basic-menu-${row.sr_no}`}
              anchorEl={openTableMenus[row.sr_no]}
              open={Boolean(openTableMenus[row.sr_no])}
              onClose={(event) => handleContextClose(row.sr_no)}
            >
              {row.kyc_status == "1" ? (
                <MenuItem
                  {...row}
                  onClick={(event) => handleContextClose(row.sr_no)}
                >
                  <i className="material-icons">receipt</i>&nbsp;&nbsp;View
                </MenuItem>
              ) : (
                <div>
                  <MenuItem
                    {...row}
                    onClick={(event) => handleContextClose(row.sr_no)}
                  >
                    <i className="material-icons">receipt</i>&nbsp;&nbsp;View
                  </MenuItem>
                  <MenuItem
                    {...row}
                    onClick={(event) => handleContextClose(row.sr_no)}
                  >
                    <i className="material-icons font-color-approved">
                      thumb_up
                    </i>
                    &nbsp;&nbsp;Approved
                  </MenuItem>
                  <MenuItem
                    {...row}
                    onClick={(event) => handleContextClose(row.sr_no)}
                  >
                    <i className="material-icons font-color-rejected">
                      thumb_down
                    </i>
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

  const activityColumn = [
    {
      name: "USER NAME",
      selector: (row) => row.full_name,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },
    {
      name: "IP ADDRESS",
      selector: (row) => row.ip_address,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "DATETIME",
      selector: (row) => row.datetime,
      sortable: true,
      reorder: true,
      grow: 1,
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const openDialogbox = (e) => {
    console.log(e.target.getAttribute("class"));
    console.log(e.target.classList.contains("createMt5"));
    console.log(e.target.classList.contains("edit_structure"));
    if (e.target.classList.contains("createMt5")) {
      setDialogTitle("Create MT5 Account");
      setCreateMt5Form({
        account_type: "",
        account_option: "",
      });
    } else if (e.target.classList.contains("mt5_access")) {
      setDialogTitle("MT5 Access");
      setMt5AccessForm({
        account_type: "",
        status: "",
      });
    } else if (e.target.classList.contains("link_mt5")) {
      setDialogTitle("Link Existing Account");
      setLinkAccountForm({
        account_number: "",
        account_type: "",
        account_name: "",
      });
    } else if (e.target.classList.contains("reset_mt5")) {
      setDialogTitle("Reset MT5 Password");
      setResetMt5PasswordForm({
        account: "",
      });
    } else if (e.target.classList.contains("change_leverage")) {
      setDialogTitle("Change Account leverage");
      setChangeLeverageForm({
        account: "",
        leverage: "",
      });
    } else if (e.target.classList.contains("add_master_structure")) {
      setDialogTitle("Add Master Structure");
      setmasterStructureForm({
        name: "",
        forex_rebate: "",
        forex_commission: "",
        bullion_rebate: "",
        bullion_commission: "",
        indices_rebate: "",
        indices_commission: "",
        energy_rebate: "",
        energy_commission: "",
        crypto_rebate: "",
        crypto_commission: "",
      });
    } else if (e.target.classList.contains("add_shared_structure")) {
      setDialogTitle("ADD SHARED STRUCTURE");
      setSharedStructureForm({
        name: "",
        total_rebate: "",
        total_commission: "",
        list: [
          {
            id: "",
            name: "",
            value: "",
          },
        ],
      });
    } else if (e.target.classList.contains("link_client")) {
      setDialogTitle("Link Client");
      setLinkClientForm({
        client: "",
        structure: "",
      });
    } else if (e.target.classList.contains("link_ib")) {
      setDialogTitle("Link To IB");
      setLinkIBForm({
        master_account: "",
        customer_name: "",
        structure: "",
      });
    } else if (e.target.classList.contains("unlink_ib")) {
      setDialogTitle("Unlink IB");
    } else if (e.target.classList.contains("send_email")) {
      setDialogTitle("Send Email");
      setsendMailForm({
        from: "",
        to: "",
        subject: "",
        template_title: "",
        language: "",
        template: "",
        body: "",
      });
    } else if (e.target.classList.contains("cp_access")) {
      setDialogTitle("Control Panel Access");
      setCpAccessForm({
        status: "",
      });
    } else if (e.target.classList.contains("view_cp_password")) {
      setDialogTitle("View Control Panel Access Password");
    } else if (e.target.classList.contains("download_application")) {
      setDialogTitle("Download Client PDF");
    } else if (e.target.classList.contains("add_note")) {
      setDialogTitle("Add New Note");
      setNoteForm({
        notes: "",
        call_status: "",
        set_reminder: false,
        date: "",
      });
    } else if (e.target.classList.contains("add_bank")) {
      setDialogTitle("Add Account");
      setBankAccountForm({
        name: "",
        bank_name: "",
        bank_address: "",
        iban_number: "",
        account_number: "",
        swift_code: "",
        currency_code: "",
      });
    } else if (e.target.classList.contains("add_transaction")) {
      setDialogTitle("Add New Transaction");
      setTransactionForm({
        type: "",
        from_account_type: "",
        credit_type: "",
        transfer_to: "",
        account: "",
        account_to: "",
        payment: "",
        amount: "",
        img: "",
        note: "",
        currency_code: "",
        isLoader: false,
        deposit_to: "",
        transation_id: "",
        wallet_code: "",
        mt5_account_id: "",
      });
    } else if (e.target.classList.contains("link_campaign")) {
      setDialogTitle("Link to Campaign");
      setLinkCampaignForm({
        account: "",
        campaign: "",
      });
    } else if (e.target.classList.contains("edit_structure")) {
      setDialogTitle("EDIT SHARED STRUCTURE");
      setEditSharedStructureForm({
        name: "",
        total_rebate: "",
        total_commission: "",
        list: [
          {
            id: "",
            name: "",
            value: "",
          },
        ],
      });
    } else if (e.target.classList.contains("change_password")) {
      setDialogTitle("Change Password");
      setChangeAccountPasswordForm({
        main_password: "",
        view_password: "",
      });
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleContextClick = (event, index) => {
    console.log(event.currentTarget.getAttribute("id"), index);
    let tableMenus = [...openTableMenus];
    tableMenus[index] = event.currentTarget;
    setOpenTableMenus(tableMenus);
  };

  const handleContextClose = (index) => {
    let tableMenus = [...openTableMenus];
    tableMenus[index] = null;
    setOpenTableMenus(tableMenus);
  };

  const gotoProfile = (e) => {
    console.log("goto profile page", e);
    navigate("/profile/" + e.name);
  };

  const manageContent = () => {
    if (dialogTitle == "Create MT5 Account") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Account Type</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account_type"
                onChange={input}
              >
                <MenuItem value="live">Live</MenuItem>
                <MenuItem value="demo">Demo</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Account option</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account_option"
                onChange={input}
              >
                <MenuItem value="executive">Executive</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "MT5 Access") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Select MT5 Account</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account_type"
                onChange={input1}
              >
                <MenuItem value="live">Live</MenuItem>
                <MenuItem value="demo">Demo</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Status</InputLabel>
              <Select
                label
                className="select-font-small"
                name="status"
                onChange={input1}
              >
                <MenuItem value="true">Activate</MenuItem>
                <MenuItem value="false">Deactivate</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Link Existing Account") {
      return (
        <div>
          <div>
            <TextField
              className="input-font-small"
              label="Account Number"
              variant="standard"
              sx={{ width: "100%" }}
              name="account_number"
              onChange={input2}
            />
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Account Type</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account_type"
                onChange={input2}
              >
                <MenuItem value="live">Live</MenuItem>
                <MenuItem value="demo">Demo</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Account Name</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account_name"
                onChange={input2}
              >
                <MenuItem value="0">Executive</MenuItem>
                <MenuItem value="1">Other</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Reset MT5 Password") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Select MT5 Account</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account"
                onChange={input3}
              >
                <MenuItem value="60002830">60002830 - individual-ib</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Change Account leverage") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>MT5 Account</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account"
                onChange={input4}
              >
                <MenuItem value="121212">122121</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Leverage</InputLabel>
              <Select
                label
                className="select-font-small"
                name="leverage"
                onChange={input4}
              >
                <MenuItem value="1:1">1:1</MenuItem>
                <MenuItem value="1:30">1:30</MenuItem>
                <MenuItem value="1:50">1:50</MenuItem>
                <MenuItem value="1:100">1:100</MenuItem>
                <MenuItem value="1:200">1:200</MenuItem>
                <MenuItem value="1:300">1:300</MenuItem>
                <MenuItem value="1:400">1:400</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Add Master Structure") {
      return (
        <div>
          <div className="structureNameSection">
            <label>Structure Name</label>
            <input
              type="text"
              className=""
              placeholder="Structure Name"
              name="name"
              onChange={input6}
            />
          </div>
          <hr className="solid" />
          <br />
          <div className="structureInputSection">
            <Grid container>
              <Grid item md={4} lg={4} xl={4} className="label-center">
                <label>Executive</label>
              </Grid>
              <Grid item md={8} lg={8} xl={8}>
                <Grid container spacing={1}>
                  <Grid item md={4} lg={4} xl={4}>
                    <label>forex</label>
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Rebate"
                      name="forex_rebate"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Commission"
                      name="forex_commission"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <label>bullion</label>
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Rebate"
                      name="bullion_rebate"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Commission"
                      name="bullion_commission"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <label>indices</label>
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Rebate"
                      name="indices_rebate"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Commission"
                      name="indices_commission"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <label>energy</label>
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Rebate"
                      name="energy_rebate"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Commission"
                      name="energy_commission"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <label>crypto</label>
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Rebate"
                      name="crypto_rebate"
                      onChange={input6}
                    />
                  </Grid>
                  <Grid item md={4} lg={4} xl={4}>
                    <input
                      type="text"
                      className=""
                      placeholder="Commission"
                      name="crypto_commission"
                      onChange={input6}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    } else if (dialogTitle == "ADD SHARED STRUCTURE") {
      return (
        <div>
          <div className="structureInputSection">
            <Grid container>
              <Grid item md={4} lg={4} xl={4} className="label-center">
                <div className="structureNameSection">
                  <label>Structure Name</label>
                  <input
                    type="text"
                    className=""
                    placeholder="Structure Name"
                    name="name"
                    onChange={sharedStructurIBInput}
                  />
                </div>
              </Grid>
              <Grid item md={8} lg={8} xl={8}>
                <Grid container spacing={1}>
                  <Grid item md={3} lg={3} xl={3}></Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <label>Account Type</label>
                  </Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <label>Total Rebate</label>
                  </Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <label>Total Commission</label>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={3} lg={3} xl={3}></Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <label>Executive</label>
                  </Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <input
                      type="text"
                      className=""
                      placeholder="Rebate"
                      name="total_rebate"
                      onChange={sharedStructurIBInput}
                    />
                  </Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <input
                      type="text"
                      className=""
                      placeholder="Commission"
                      name="total_commission"
                      onChange={sharedStructurIBInput}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <hr className="solid" />
          <div className="structureInputSection">
            {sharedStructureForm.list.map((rowData, i) => (
              <Grid container spacing={1}>
                <Grid item md={4} lg={4} xl={4}>
                  <label>IB</label>
                </Grid>
                <Grid item md={4} lg={4} xl={4}>
                  <input
                    type="text"
                    className=""
                    style={{ width: "70%" }}
                    value={rowData.value}
                    onChange={(e) => inputSteuctureIB(e, i)}
                  />
                </Grid>
                <Grid item md={4} lg={4} xl={4}>
                  <Button variant="contained" className="btn-gradient">
                    Proceed
                  </Button>
                  <IconButton
                    aria-label="delete"
                    className="btn-danger"
                    onClick={(e) => deleteStructureIB(e, i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </div>
          <hr className="solid" />
          <div className="contentActionButton">
            <Button
              variant="contained"
              className="btn-gradient"
              onClick={sharedStructurAddNewIB}
            >
              Add another IB
            </Button>
            <Button variant="contained" disabled>
              Add Structure
            </Button>
          </div>
        </div>
      );
    } else if (dialogTitle == "Link Client") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Client</InputLabel>
              <Select
                label
                className="select-font-small"
                name="client"
                onChange={linkClientInput}
              >
                <MenuItem value="Mehul">Mehul</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Structure</InputLabel>
              <Select
                label
                className="select-font-small"
                name="structure"
                onChange={linkClientInput}
              >
                <MenuItem value="Test">Test</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Link To IB") {
      return (
        <div>
          <div className="margeField">
            <TextField
              className="input-font-small"
              label="Master Account ID"
              variant="standard"
              sx={{ width: "50%" }}
              name="master_account"
              onChange={linkIBInput}
            />
            <TextField
              className="input-font-small"
              label="Customer Name"
              variant="standard"
              sx={{ width: "50%" }}
              name="customer_name"
              onChange={linkIBInput}
            />
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "50%" }}>
              <InputLabel>Structure</InputLabel>
              <Select
                label
                className="select-font-small"
                name="structure"
                onChange={linkIBInput}
              >
                <MenuItem value="test">Test</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Unlink IB") {
    } else if (dialogTitle == "Send Email") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>FROM</InputLabel>
              <Select
                label
                className="select-font-small"
                name="from"
                onChange={sendMailInput}
              >
                <MenuItem value="1">admin@gmail.com</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="To"
              variant="standard"
              sx={{ width: "100%" }}
              name="to"
              onChange={sendMailInput}
            />
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="Subject"
              variant="standard"
              sx={{ width: "100%" }}
              name="subject"
              onChange={sendMailInput}
            />
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="Template Title"
              variant="standard"
              sx={{ width: "100%" }}
              name="template_title"
              onChange={sendMailInput}
            />
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Language</InputLabel>
              <Select
                label
                className="select-font-small"
                name="language"
                onChange={sendMailInput}
              >
                <MenuItem value="en-gb">English</MenuItem>
                <MenuItem value="ar-ae">عربي</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Template</InputLabel>
              <Select
                label
                className="select-font-small"
                name="template"
                onChange={sendMailInput}
              >
                <MenuItem value="1">Test</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div className="editor-section-border">
            <Editor
              // editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              name="body"
              onChange={onContentStateChange}
            />
          </div>
        </div>
      );
    } else if (dialogTitle == "Control Panel Access") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Status</InputLabel>
              <Select
                label
                className="select-font-small"
                name="status"
                onChange={input7}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Blocked</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "View Control Panel Access Password") {
    } else if (dialogTitle == "Download Client PDF") {
    } else if (dialogTitle == "Add New Note") {
      return (
        <div>
          <div>
            <TextField
              id="standard-textarea"
              label="Notes"
              multiline
              variant="standard"
              sx={{ width: "100%" }}
              name="notes"
              onChange={input8}
            />
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Call Status</InputLabel>
              <Select
                label
                className="select-font-small"
                name="call_status"
                onChange={input8}
              >
                <MenuItem value="1">1st Call Attempted</MenuItem>
                <MenuItem value="2">2nd Call Attempted</MenuItem>
                <MenuItem value="3">3rd Call Attempted</MenuItem>
                <MenuItem value="4">4th Call Attempted</MenuItem>
                <MenuItem value="5">Busy Tune</MenuItem>
                <MenuItem value="6">Not Interested</MenuItem>
                <MenuItem value="7">Archived</MenuItem>
                <MenuItem value="8">Qualified</MenuItem>
                <MenuItem value="9">Interested</MenuItem>
                <MenuItem value="10">Language Not Support</MenuItem>
                <MenuItem value="11">Converted</MenuItem>
                <MenuItem value="12">Wrong Number</MenuItem>
                <MenuItem value="13">Fake Registration</MenuItem>
                <MenuItem value="14">Duplicate</MenuItem>
                <MenuItem value="15">Poor quality but can follow up</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControlLabel
              className="declarationCheckbox"
              control={
                // <Checkbox checked={true} name="declaration" size="small"/>
                <Checkbox name="set_reminder" size="small" onChange={input8} />
              }
              label="Set Reminder"
            />
          </div>
          <br />
          {noteForm.set_reminder == true ? (
            <div>
              <TextField
                type="date"
                id="standard-textarea"
                label="Date"
                variant="standard"
                sx={{ width: "100%" }}
                name="date"
                onChange={input8}
                focused
              />
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else if (dialogTitle == "Add Account") {
      return (
        <div>
          <div>
            <TextField
              className="input-font-small"
              label="Beneficiary Name"
              variant="standard"
              sx={{ width: "100%" }}
              name="name"
              onChange={bankInput}
            />
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="Beneficiary Bank Name"
              variant="standard"
              sx={{ width: "100%" }}
              name="bank_name"
              onChange={bankInput}
            />
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="Beneficiary Bank Address"
              variant="standard"
              sx={{ width: "100%" }}
              name="bank_address"
              onChange={bankInput}
            />
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="IBAN Number"
              variant="standard"
              sx={{ width: "100%" }}
              name="iban_number"
              onChange={bankInput}
            />
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="Account Number"
              variant="standard"
              sx={{ width: "100%" }}
              name="account_number"
              onChange={bankInput}
            />
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="SWIFT Code"
              variant="standard"
              sx={{ width: "100%" }}
              name="swift_code"
              onChange={bankInput}
            />
          </div>
          <br />
          <div>
            <TextField
              className="input-font-small"
              label="Currency Code"
              variant="standard"
              sx={{ width: "100%" }}
              name="currency_code"
              onChange={bankInput}
            />
          </div>
        </div>
      );
    } else if (dialogTitle == "Add New Transaction") {
      if (transactionForm.type == "") {
        return (
          <div>
            <div>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="type"
                  value={transactionForm.type}
                  onChange={transactionInput}
                >
                  <MenuItem value="DEPOSIT">Deposit</MenuItem>
                  <MenuItem value="WITHDRAWAL">Withdraw</MenuItem>
                  <MenuItem value="INTERNAL_TRANSFER">
                    Internal Transfer
                  </MenuItem>
                  <MenuItem value="CREDIT">Credit</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        );
      } else if (transactionForm.type == "DEPOSIT") {
        return (
          <div>
            <div>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  value={transactionForm.type}
                  name="type"
                  onChange={transactionInput}
                >
                  <MenuItem value="DEPOSIT">Deposit</MenuItem>
                  <MenuItem value="WITHDRAWAL">Withdraw</MenuItem>
                  <MenuItem value="INTERNAL_TRANSFER">
                    Internal Transfer
                  </MenuItem>
                  <MenuItem value="CREDIT">Credit</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <div className="margeField">
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Deposit To</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="deposit_to"
                  onChange={transactionInput}
                >
                  <MenuItem value="Wallet">Wallet</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Payment Gateway</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="payment"
                  onChange={transactionInput}
                >
                  <MenuItem value="Bank">Bank</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="USDT">USDT</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <div>
              <TextField
                className="input-font-small"
                label="Transation ID"
                variant="standard"
                sx={{ width: "100%" }}
                name="transation_id"
                onChange={transactionInput}
              />
            </div>
            <br />
            <div className="margeField">
              <TextField
                className="input-font-small"
                label="Amount"
                variant="standard"
                sx={{ width: "100%" }}
                name="amount"
                onChange={transactionInput}
              />
              <label
                htmlFor="contained-button-file"
                className="fileuploadButton"
              >
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="img"
                />
                <Button variant="contained" component="span">
                  <i className="material-icons">backup</i>Upload
                </Button>
              </label>
            </div>
            <br />
            <div className="margeField">
              <TextField
                id="standard-textarea"
                label="Notes"
                multiline
                variant="standard"
                sx={{ width: "100%" }}
                name="note"
                onChange={transactionInput}
              />
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Currency Code</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="currency_code"
                  onChange={transactionInput}
                >
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        );
      } else if (transactionForm.type == "WITHDRAWAL") {
        return (
          <div>
            <div>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  value={transactionForm.type}
                  name="type"
                  onChange={transactionInput}
                >
                  <MenuItem value="DEPOSIT">Deposit</MenuItem>
                  <MenuItem value="WITHDRAWAL">Withdraw</MenuItem>
                  <MenuItem value="INTERNAL_TRANSFER">
                    Internal Transfer
                  </MenuItem>
                  <MenuItem value="CREDIT">Credit</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <div className="margeField">
              <FormControl variant="standard" sx={{ width: "100%" }} focused>
                <InputLabel>From Account Type</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="from_account_type"
                  onChange={transactionInput}
                >
                  <MenuItem value="live">Live Accounts</MenuItem>
                  <MenuItem value="ib">IB Account</MenuItem>
                </Select>
              </FormControl>
              {/* <FormControl variant="standard" sx={{ width: '100%' }}>
                            <InputLabel >From Account</InputLabel>
                            <Select
                                label
                                className='select-font-small'
                                name='account'
                                onChange={transactionInput}>
                                <MenuItem value='1'>1212</MenuItem>
                            </Select>
                        </FormControl> */}
            </div>
            <br />
            <div className="margeField">
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Payment Gateway</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="payment"
                  onChange={transactionInput}
                >
                  <MenuItem value="BANK">BANK</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className="input-font-small"
                label="Amount"
                variant="standard"
                sx={{ width: "100%" }}
                name="amount"
                onChange={transactionInput}
              />
            </div>
            <br />
            <div className="margeField">
              <TextField
                id="standard-textarea"
                label="Notes"
                multiline
                variant="standard"
                sx={{ width: "100%" }}
                name="note"
                onChange={transactionInput}
              />
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Currency Code</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="currency_code"
                  onChange={transactionInput}
                >
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        );
      } else if (transactionForm.type == "INTERNAL_TRANSFER") {
        return (
          <div>
            <div>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  value={transactionForm.type}
                  name="type"
                  onChange={transactionInput}
                >
                  <MenuItem value="DEPOSIT">Deposit</MenuItem>
                  <MenuItem value="WITHDRAWAL">Withdraw</MenuItem>
                  <MenuItem value="INTERNAL_TRANSFER">
                    Internal Transfer
                  </MenuItem>
                  <MenuItem value="CREDIT">Credit</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <div className="margeField">
              <FormControl variant="standard" sx={{ width: "100%" }} focused>
                <InputLabel>From Account Type</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="from_account_type"
                  onChange={transactionInput}
                >
                  <MenuItem value="live">Live Accounts</MenuItem>
                  <MenuItem value="ib">IB Account</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Transfer To</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="transfer_to"
                  onChange={transactionInput}
                >
                  <MenuItem value="own">Own Account</MenuItem>
                  <MenuItem value="clients">Client's Account</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <div className="margeField">
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>From Account</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="account"
                  onChange={transactionInput}
                >
                  <MenuItem value="Wallet">Wallet</MenuItem>
                  <MenuItem value="MT5">MT5</MenuItem>
                </Select>
              </FormControl>
              {transactionForm.account == "MT5" ? (
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>To Account</InputLabel>
                  <Select
                    label
                    className="select-font-small"
                    name="account_to"
                    onChange={transactionInput}
                  >
                    <MenuItem value="Wallet">Wallet</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>To Account</InputLabel>
                  <Select
                    label
                    className="select-font-small"
                    name="account_to"
                    onChange={transactionInput}
                  >
                    <MenuItem value="Wallet">Wallet</MenuItem>
                    <MenuItem value="MT5">MT5</MenuItem>
                  </Select>
                </FormControl>
              )}
            </div>
            <br />
            <div className="margeField">
              {transactionForm.account_to == "MT5" ? (
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>MT5 Account ID</InputLabel>
                  <Select
                    label
                    className="select-font-small"
                    name="mt5_account_id"
                    onChange={transactionInput}
                  >
                    <MenuItem value="1">121212</MenuItem>
                  </Select>
                </FormControl>
              ) : transactionForm.account_to != "" ? (
                transactionForm.account == "MT5" &&
                transactionForm.account_to == "Wallet" ? (
                  <TextField
                    className="disabled-input-wallet-code"
                    label="Wallet Code"
                    variant="standard"
                    sx={{ width: "100%" }}
                    name="wallet_code"
                    onChange={transactionInput}
                    value={userData.data["wallet_code"]}
                    disabled
                    focused
                  />
                ) : (
                  <TextField
                    className="input-font-small"
                    label="Wallet Code"
                    variant="standard"
                    sx={{ width: "100%" }}
                    name="wallet_code"
                    onChange={transactionInput}
                    focused
                  />
                )
              ) : (
                ""
              )}

              <TextField
                className="input-font-small"
                label="Amount"
                variant="standard"
                sx={{ width: "100%" }}
                name="amount"
                onChange={transactionInput}
              />
            </div>
            <br />
            <div className="margeField">
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Currency Code</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="currency_code"
                  onChange={transactionInput}
                >
                  <MenuItem value="USD">USD</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="standard-textarea"
                label="Notes"
                multiline
                variant="standard"
                sx={{ width: "100%" }}
                name="note"
                onChange={transactionInput}
              />
            </div>
          </div>
        );
      } else if (transactionForm.type == "CREDIT") {
        return (
          <div>
            <div>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  value={transactionForm.type}
                  name="type"
                  onChange={transactionInput}
                >
                  <MenuItem value="DEPOSIT">Deposit</MenuItem>
                  <MenuItem value="WITHDRAWAL">Withdraw</MenuItem>
                  <MenuItem value="INTERNAL_TRANSFER">
                    Internal Transfer
                  </MenuItem>
                  <MenuItem value="CREDIT">Credit</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <div className="margeField">
              <FormControl variant="standard" sx={{ width: "100%" }} focused>
                <InputLabel>Credit Type</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="credit_type"
                  onChange={transactionInput}
                >
                  <MenuItem value="CREDIT_IN">Credit In</MenuItem>
                  <MenuItem value="CREDIT_OUT">Credit Out</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>Account</InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="account"
                  onChange={transactionInput}
                >
                  <MenuItem value="1">121212</MenuItem>
                </Select>
              </FormControl>
            </div>
            <br />
            <div className="margeField">
              <TextField
                className="input-font-small"
                label="Amount"
                variant="standard"
                sx={{ width: "100%" }}
                name="amount"
                onChange={transactionInput}
              />
              <TextField
                id="standard-textarea"
                label="Notes"
                multiline
                variant="standard"
                sx={{ width: "100%" }}
                name="note"
                onChange={transactionInput}
              />
            </div>
            <br />
          </div>
        );
      }
    } else if (dialogTitle == "Link to Campaign") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Live Account</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account"
                onChange={campaignInput}
              >
                <MenuItem value="1">12122</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Campaign</InputLabel>
              <Select
                label
                className="select-font-small"
                name="campaign"
                onChange={campaignInput}
              >
                <MenuItem value="2">525252</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "EDIT SHARED STRUCTURE") {
      return (
        <div>
          <div className="structureInputSection">
            <Grid container>
              <Grid item md={4} lg={4} xl={4} className="label-center">
                <div className="structureNameSection">
                  <label>Structure Name</label>
                  <input
                    type="text"
                    className=""
                    placeholder="Structure Name"
                    name="name"
                    onChange={inputEditSteuctureIB}
                  />
                </div>
              </Grid>
              <Grid item md={8} lg={8} xl={8}>
                <Grid container spacing={1}>
                  <Grid item md={3} lg={3} xl={3}></Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <label>Account Type</label>
                  </Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <label>Total Rebate</label>
                  </Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <label>Total Commission</label>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={3} lg={3} xl={3}></Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <label>Executive</label>
                  </Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <input
                      type="text"
                      className=""
                      placeholder="Rebate"
                      name="total_rebate"
                      onChange={inputEditSteuctureIB}
                    />
                  </Grid>
                  <Grid item md={3} lg={3} xl={3}>
                    <input
                      type="text"
                      className=""
                      placeholder="Commission"
                      name="total_commission"
                      onChange={inputEditSteuctureIB}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <hr className="solid" />
          <div className="structureInputSection">
            {editSharedStructureForm.list.map((rowData, i) => (
              <Grid container spacing={1}>
                <Grid item md={4} lg={4} xl={4}>
                  <label>IB</label>
                </Grid>
                <Grid item md={4} lg={4} xl={4}>
                  <input
                    type="text"
                    className=""
                    style={{ width: "70%" }}
                    value={rowData.value}
                    onChange={(e) => inputEditSteuctureIB(e, i)}
                  />
                </Grid>
                <Grid item md={4} lg={4} xl={4}>
                  <Button variant="contained" className="btn-gradient">
                    Proceed
                  </Button>
                  <IconButton
                    aria-label="delete"
                    className="btn-danger"
                    onClick={(e) => deleteEditStructureIB(e, i)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            {/* <Grid container spacing={1}>
                        <Grid item md={4} lg={4} xl={4}>
                            <label>IB</label>
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <input type='text' className='' value='60002830' style={{ width: '70%' }} />
                        </Grid>
                        <Grid item md={4} lg={4} xl={4}>
                            <Button variant="contained" className='btn-gradient'>Proceed</Button>
                            <IconButton aria-label="delete" className='btn-danger'>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid> */}
          </div>
          <hr className="solid" />
          <div className="contentActionButton">
            <Button
              variant="contained"
              className="btn-gradient"
              onClick={editSharedStructurAddNewIB}
            >
              Add another IB
            </Button>
            <Button variant="contained" onClick={editSharedStructureIBSave}>
              Update For New Clients Only
            </Button>
          </div>
        </div>
      );
    } else if (dialogTitle == "Change Password") {
      return (
        <div>
          <div className="margeField">
            <TextField
              className="input-font-small"
              label="Main Password"
              variant="standard"
              sx={{ width: "100%" }}
              name="main_password"
              onChange={input5}
            />
          </div>
          <br />
          <div className="margeField">
            <TextField
              className="input-font-small"
              label="View Password"
              variant="standard"
              sx={{ width: "100%" }}
              name="view_password"
              onChange={input5}
            />
          </div>
        </div>
      );
    }
  };

  const manageDialogActionButton = () => {
    if (dialogTitle == "Create MT5 Account") {
      return (
        <div>
          <Button
            variant="contained"
            className="btn-success"
            onClick={createMt5AccountSubmit}
          >
            Create
          </Button>
        </div>
      );
    } else if (dialogTitle == "MT5 Access") {
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
            onClick={Mt5AccountAccessSubmit}
          >
            Update
          </Button>
        </div>
      );
    } else if (dialogTitle == "Link Existing Account") {
      return (
        <div>
          <Button
            variant="contained"
            className="btn-success"
            onClick={linkAccountSubmit}
          >
            Link
          </Button>
        </div>
      );
    } else if (dialogTitle == "Reset MT5 Password") {
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
            className="btn-danger font-color-white"
            onClick={resetAccountPasswordSubmit}
          >
            Reset
          </Button>
        </div>
      );
    } else if (dialogTitle == "Change Account leverage") {
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
            onClick={changeLeverageSubmit}
          >
            Change
          </Button>
        </div>
      );
    } else if (dialogTitle == "Control Panel Access") {
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
            onClick={cpAccessSubmit}
          >
            Update
          </Button>
        </div>
      );
    } else if (dialogTitle == "Add Account") {
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
            onClick={bankAccountSubmit}
          >
            Add Account
          </Button>
        </div>
      );
    } else if (dialogTitle == "Add New Note") {
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
            onClick={noteSubmit}
          >
            Add Note
          </Button>
        </div>
      );
    } else if (dialogTitle == "Add New Transaction") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {transactionForm.isLoader == true ? (
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
              onClick={transactionSubmit}
            >
              Add Transaction
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Link To IB") {
      return (
        <div>
          <Button
            variant="contained"
            className="btn-success"
            onClick={linkIBFormSubmit}
          >
            Next
          </Button>
        </div>
      );
    } else if (dialogTitle == "Link Client") {
      return (
        <div>
          <Button
            variant="contained"
            className="btn-success"
            onClick={linkClientSubmit}
          >
            Save
          </Button>
        </div>
      );
    } else if (dialogTitle == "Add Master Structure") {
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
            onClick={masterStructureSubmit}
          >
            Add Structure
          </Button>
        </div>
      );
    } else if (dialogTitle == "ADD SHARED STRUCTURE") {
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
            onClick={sharedStructureSubmit}
          >
            Add
          </Button>
        </div>
      );
    } else if (dialogTitle == "Send Email") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="btn-gradient btn-success"
            onClick={sendMailSubmit}
          >
            Send
          </Button>
        </div>
      );
    } else if (dialogTitle == "Link to Campaign") {
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
            onClick={linkCampaignSubmit}
          >
            Link
          </Button>
        </div>
      );
    } else if (dialogTitle == "EDIT SHARED STRUCTURE") {
      return (
        <div className="dialogMultipleActionButton">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      );
    } else if (dialogTitle == "Change Password") {
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
            onClick={changeAccountPasswordSubmit}
          >
            Submit
          </Button>
        </div>
      );
    }
  };

  const input = (event) => {
    const { name, value } = event.target;
    setCreateMt5Form((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const createMt5AccountSubmit = () => {
    console.log(createMt5Form);
    if (createMt5Form.account_type == "") {
      toast.error("Please select account type");
    } else if (createMt5Form.account_option == "") {
      toast.error("Please select account option");
    } else {
      toast.success("Mt5 account has been created successfully.");
      setOpen(false);
    }
  };

  const input1 = (event) => {
    const { name, value } = event.target;
    setMt5AccessForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const Mt5AccountAccessSubmit = () => {
    console.log(Mt5AccessForm);
    if (Mt5AccessForm.account_type == "") {
      toast.error("Please select account type");
    } else if (Mt5AccessForm.status == "") {
      toast.error("Please select status");
    } else {
      toast.success("Mt5 account status has been updated successfully.");
      setOpen(false);
    }
  };

  const input2 = (event) => {
    const { name, value } = event.target;
    setLinkAccountForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const linkAccountSubmit = () => {
    console.log(linkAccountForm);
    if (linkAccountForm.account_number == "") {
      toast.error("Please enter account number");
    } else if (linkAccountForm.account_type == "") {
      toast.error("Please select account type");
    } else if (linkAccountForm.account_name == "") {
      toast.error("Please select account name");
    } else {
      toast.success("Mt5 account has been successfully linked.");
      setOpen(false);
    }
  };

  const input3 = (event) => {
    const { name, value } = event.target;
    setResetMt5PasswordForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const resetAccountPasswordSubmit = () => {
    console.log(linkAccountForm);
    if (resetMt5PasswordForm.account == "") {
      toast.error("Please select account");
    } else {
      toast.success("Mt5 account password has been successfully reset.");
      setOpen(false);
    }
  };

  const input4 = (event) => {
    const { name, value } = event.target;
    setChangeLeverageForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const changeLeverageSubmit = () => {
    console.log(changeLeverageForm);
    if (changeLeverageForm.account == "") {
      toast.error("Please select account");
    } else if (changeLeverageForm.leverage == "") {
      toast.error("Please select leverage");
    } else {
      toast.success("Leverage has been successfully changed.");
      setOpen(false);
    }
  };

  const input5 = (event) => {
    const { name, value } = event.target;
    setChangeAccountPasswordForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const changeAccountPasswordSubmit = () => {
    console.log(changeAccountPasswordForm);
    if (changeAccountPasswordForm.main_password == "") {
      toast.error("Please enter main password");
    } else if (changeAccountPasswordForm.view_password == "") {
      toast.error("Please enter view password");
    } else {
      toast.success("Account password has been successfully changed.");
      setOpen(false);
    }
  };

  const input6 = (event) => {
    const { name, value } = event.target;
    setmasterStructureForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const masterStructureSubmit = () => {
    console.log(masterStructureForm);
    if (masterStructureForm.name == "") {
      toast.error("Please enter name");
    } else if (masterStructureForm.forex_rebate == "") {
      toast.error("Please enter forex rebate");
    } else if (masterStructureForm.forex_commission == "") {
      toast.error("Please enter forex commission");
    } else if (masterStructureForm.bullion_rebate == "") {
      toast.error("Please enter bullion rebate");
    } else if (masterStructureForm.bullion_commission == "") {
      toast.error("Please enter bullion commission");
    } else if (masterStructureForm.indices_rebate == "") {
      toast.error("Please enter indices rebate");
    } else if (masterStructureForm.indices_commission == "") {
      toast.error("Please enter indices commission");
    } else if (masterStructureForm.energy_rebate == "") {
      toast.error("Please enter energy rebate");
    } else if (masterStructureForm.energy_commission == "") {
      toast.error("Please enter energy commission");
    } else if (masterStructureForm.crypto_rebate == "") {
      toast.error("Please enter crypto rebate");
    } else if (masterStructureForm.crypto_commission == "") {
      toast.error("Please enter crypto commission");
    } else {
      toast.success("Master Structure has been created.");
      setOpen(false);
    }
  };

  const profileInput = (event) => {
    const { name, value } = event.target;
    setProfileForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const profileSubmit = async () => {
    console.log(profileForm);
    if (profileForm.title == "") {
      toast.error("Please select title");
    } else if (profileForm.first_name == "") {
      toast.error("Please enter first name");
    } else if (profileForm.last_name == "") {
      toast.error("Please enter last name");
    } else if (profileForm.phone == "") {
      toast.error("Please enter phone number");
    } else if (profileForm.email == "") {
      toast.error("Please enter email address");
    } else if (profileForm.dob == "") {
      toast.error("Please select date of birth");
    } else if (profileForm.nationality == "") {
      toast.error("Please select nationality");
    } else if (profileForm.country_of_residence == "") {
      toast.error("Please select country of residence");
    } else if (profileForm.city == "") {
      toast.error("Please enter city");
    } else if (profileForm.address == "") {
      toast.error("Please enter address");
    } else if (profileForm.gender == "") {
      toast.error("Please select gender");
    } else if (profileForm.postal_code == "") {
      toast.error("Please enter postal code");
    } else if (profileForm.language == "") {
      toast.error("Please select language");
    } else if (profileForm.source == "") {
      toast.error("Please enter source");
    } else if (profileForm.us_citizen == "") {
      toast.error("Please select us citizen");
    } else if (profileForm.finacial_work == "") {
      toast.error("Please select worked in financial");
    } else if (profileForm.tax_number == "") {
      toast.error("Please enter tax identification number");
    } else if (profileForm.politically_exposed == "") {
      toast.error("Please select politically exposed");
    }else if (profileForm.sales_agent == "") {
        toast.error("Please select sales agent");
      }else {
       
      const param = new FormData();
      param.append('is_app', 1);
      param.append('AADMIN_LOGIN_ID', 1);  
      param.append("action", "update_basic_information");
      param.append("user_id", id);
      param.append("manager_id", profileForm.sales_agent);
      param.append("user_title", profileForm.title);
      param.append("user_first_name ", profileForm.first_name);
      param.append("user_last_name ", profileForm.last_name);
      param.append("user_dob ", profileForm.dob);
      param.append("user_email ", profileForm.email);
      param.append("user_phone ", profileForm.phone);
      param.append("user_nationality ", profileForm.nationality);
      param.append("user_country ", profileForm.country_of_residence);
      param.append("user_city ", profileForm.city);
      param.append("user_address_1 ", profileForm.address);
      param.append("user_address_2 ", profileForm.address_2);
      param.append("user_gender ", profileForm.gender);
      param.append("user_postcode ", profileForm.postal_code);
      param.append("user_language ", profileForm.language);
      param.append("user_source ", profileForm.source);
      param.append("us_citizen ", profileForm.us_citizen);
      param.append("worked_in_financial ", profileForm.finacial_work);
      param.append("tax_identification_number ", profileForm.tax_number);
      param.append("politically_exposed ", profileForm.politically_exposed);
      // param.append('user_status ', profileForm.);
      // param.append('login_block ', profileForm.);
      axios
        .post(`${Url}/ajaxfiles/update_user_profile.php`, param)
        .then((res) => {
            if (res.data.status == 'error'){
                toast.error(res.data.message)
            }else
            {
                toast.success(res.data.message)

            }
        });
      toast.success("Client profile has been updated");
    }
  };

  const employementInput = (event) => {
    const { name, value } = event.target;
    setEmploymentDetailsForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const employmentDetailsSubmit = () => {
    console.log(employmentDetailsForm);

    if (employmentDetailsForm.status == "") {
      toast.error("Please select employment status");
    } else if (employmentDetailsForm.industry == "") {
      toast.error("Please select employment industry");
    } else {
      toast.success(
        "Employment details information has been updated successfully."
      );
    }
  };

  const sharedStructureSubmit = () => {
    if (sharedStructureForm.name == "") {
      toast.error("Please enter structure name");
    } else if (sharedStructureForm.total_rebate == "") {
      toast.error("Please enter total rebate");
    } else if (sharedStructureForm.total_commission == "") {
      toast.error("Please enter total commission");
    } else if (sharedStructureForm.list.length > 0) {
      var emptyIb = false;
      sharedStructureForm.list.map((rowData, i) => {
        if (rowData.value == "") {
          emptyIb = true;
          toast.error("Please enter IB");
        }
      });

      if (!emptyIb) {
        toast.success("Shared Structure has been added successfully");
        setOpen(false);
      }
    } else {
      toast.success("Shared Structure has been added successfully");
      setOpen(false);
    }
  };

  const sharedStructurAddNewIB = () => {
    sharedStructureForm.list.push({
      id: "",
      name: "",
      value: "",
    });
    setSharedStructureForm({ ...sharedStructureForm });
  };

  const editSharedStructurAddNewIB = () => {
    editSharedStructureForm.list.push({
      id: "",
      name: "",
      value: "",
    });
    setEditSharedStructureForm({ ...editSharedStructureForm });
  };

  const editSharedStructureIBSave = () => {
    if (editSharedStructureForm.list.length > 0) {
      var emptyIb = false;
      editSharedStructureForm.list.map((rowData, i) => {
        if (rowData.value == "") {
          emptyIb = true;
          toast.error("Please enter IB");
        }
      });

      if (!emptyIb) {
        toast.success("Edit Shared Structure has been added successfully");
        setOpen(false);
      }
    } else {
      toast.success("Edit Shared Structure has been added successfully");
      setOpen(false);
    }
  };

  const deleteEditStructureIB = (e, index) => {
    console.log(index);
    editSharedStructureForm.list.splice(index, 1);
    setEditSharedStructureForm({ ...editSharedStructureForm });
  };

  const inputEditSteuctureIB = (e, index) => {
    const { name, value } = e.target;
    editSharedStructureForm.list[index].value = value;
    setEditSharedStructureForm({ ...editSharedStructureForm });
  };

  const deleteStructureIB = (e, index) => {
    console.log(index);
    sharedStructureForm.list.splice(index, 1);
    setSharedStructureForm({ ...sharedStructureForm });
  };

  const inputSteuctureIB = (e, index) => {
    const { name, value } = e.target;
    sharedStructureForm.list[index].value = value;
    setSharedStructureForm({ ...sharedStructureForm });
  };

  const sharedStructurIBInput = (event) => {
    const { name, value } = event.target;
    setSharedStructureForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const linkClientInput = (event) => {
    const { name, value } = event.target;
    setLinkClientForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const linkClientSubmit = () => {
    console.timeLog(linkClientForm);
    if (linkClientForm.client == "") {
      toast.error("Please select client");
    } else if (linkClientForm.structure == "") {
      toast.error("Please select structure");
    } else {
      toast.success("Client has been linked to structure");
      setOpen(false);
    }
  };

  const linkIBInput = (event) => {
    const { name, value } = event.target;
    setLinkIBForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const linkIBFormSubmit = () => {
    console.log(linkIBForm);
    if (linkIBForm.master_account == "") {
      toast.error("Please enter master account id");
    } else if (linkIBForm.customer_name == "") {
      toast.error("Please enter customer name");
    } else if (linkIBForm.structure == "") {
      toast.error("Please select structure");
    } else {
      toast.success("IB has been linked to account number");
      setOpen(false);
    }
  };

  const sendMailInput = (event) => {
    const { name, value } = event.target;
    setsendMailForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const sendMailSubmit = () => {
    console.log(sendMailForm);
    if (sendMailForm.from == "") {
      toast.error("Please select from e-mail address");
    } else if (sendMailForm.to == "") {
      toast.error("Please enter to e-mail address");
    } else if (sendMailForm.subject == "") {
      toast.error("Please enter subject");
    } else if (sendMailForm.template_title == "") {
      toast.error("Please enter template title");
    } else if (sendMailForm.language == "") {
      toast.error("Please select language");
    } else if (sendMailForm.template == "") {
      toast.error("Please enter template");
    } else if (sendMailForm.body == "") {
      toast.error("Please enter body");
    } else {
      toast.success("Mail has been sent successfully.");
      setOpen(false);
    }
  };

  const onContentStateChange = (event) => {
    sendMailForm.body = draftToHtml(event);
    setsendMailForm({ ...sendMailForm });
  };

  const input7 = (event) => {
    const { name, value } = event.target;
    setCpAccessForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const cpAccessSubmit = () => {
    console.log(cpAccessForm);
    if (cpAccessForm.status == "") {
      toast.error("Please select control panel access");
    } else {
      toast.success("control panel access has been successfully updated");
      setOpen(false);
    }
  };

  const input8 = (event) => {
    var { name, value } = event.target;
    if (event.target.getAttribute) {
      if (event.target.getAttribute("type") == "checkbox") {
        value = event.target.checked;
      }
    }

    setNoteForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const noteSubmit = () => {
    console.log(noteForm);

    if (noteForm.notes == "") {
      toast.error("Please enter note");
    } else if (noteForm.call_status == "") {
      toast.error("Please select call status");
    } else if (noteForm.set_reminder == true && noteForm.date == "") {
      toast.error("Please select date");
    } else {
      toast.success("Note has been successfully added.");
      setOpen(false);
    }
  };

  const bankInput = (event) => {
    const { name, value } = event.target;
    setBankAccountForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const bankAccountSubmit = () => {
    console.log(bankAccountForm);

    if (bankAccountForm.name == "") {
      toast.error("Please enter beneficiary name");
    } else if (bankAccountForm.bank_name == "") {
      toast.error("Please enter beneficiary bank name");
    } else if (bankAccountForm.bank_address == "") {
      toast.error("Please enter beneficiary bank address");
    } else if (bankAccountForm.iban_number == "") {
      toast.error("Please enter IBAN Number");
    } else if (bankAccountForm.account_number == "") {
      toast.error("Please enter account number");
    } else if (bankAccountForm.swift_code == "") {
      toast.error("Please enter SWIFT Code");
    } else if (bankAccountForm.currency_code == "") {
      toast.error("Please enter currency code");
    } else {
      toast.success("Bank account has been successfully created.");
      setOpen(false);
    }
  };

  const transactionInput = (event) => {
    const { name, value } = event.target;
    if (name == "type") {
      setTransactionForm({
        type: "",
        from_account_type: "",
        credit_type: "",
        transfer_to: "",
        account: "",
        account_to: "",
        payment: "",
        amount: "",
        img: "",
        note: "",
        currency_code: "",
        isLoader: false,
        deposit_to: "",
        transation_id: "",
        wallet_code: "",
        mt5_account_id: "",
      });
    }

    if (name == "account_to") {
      if (transactionForm.account == "MT5" && value == "Wallet") {
        transactionForm.wallet_code = userData.data["wallet_code"];
        setTransactionForm({ ...transactionForm });
      }
    }
    setTransactionForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const transactionSubmit = async () => {
    console.log(transactionForm);

    if (transactionForm.type == "") {
      toast.error("Please select transaction type");
    } else if (transactionForm.type == "DEPOSIT") {
      if (transactionForm.deposit_to == "") {
        toast.error("Please select deposit to");
      } else if (transactionForm.payment == "") {
        toast.error("Please select payment gateway");
      } else if (transactionForm.transation_id == "") {
        toast.error("Please enter transation id");
      } else if (transactionForm.amount == "") {
        toast.error("Please enter amount");
      } else if (transactionForm.note == "") {
        toast.error("Please enter note");
      } else if (transactionForm.currency_code == "") {
        toast.error("Please select currency code");
      } else {
        transactionForm.isLoader = true;
        setTransactionForm({ ...transactionForm });
        const param = new FormData();
        param.append("action", "add_deposit");
        param.append("is_app", 1);
        param.append("AADMIN_LOGIN_ID", 1);
        param.append("user_id", userData.data["user_id"]);
        param.append("deposit_to", transactionForm.deposit_to);
        param.append("payment_method", transactionForm.payment);
        param.append("transactionid", transactionForm.transation_id);
        param.append("amount", transactionForm.amount);
        param.append("currency", transactionForm.currency_code);
        param.append("note", transactionForm.note);
        await axios
          .post(`${Url}/ajaxfiles/user_manage.php`, param)
          .then((res) => {
            if (res.data.message == "Session has been expired") {
              localStorage.setItem("login", true);
              navigate("/");
            }
            transactionForm.isLoader = false;
            setTransactionForm({ ...transactionForm });
            if (res.data.status == "error") {
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
              setOpen(false);
            }
          });
        /* toast.success('Deposit has been successfully added.');
                setOpen(false); */
      }
    } else if (transactionForm.type == "WITHDRAWAL") {
      if (transactionForm.from_account_type == "") {
        toast.error("Please select from account type");
      } else if (transactionForm.payment == "") {
        toast.error("Please select payment gateway");
      } else if (transactionForm.amount == "") {
        toast.error("Please enter amount");
      } else if (transactionForm.note == "") {
        toast.error("Please enter note");
      } else if (transactionForm.currency_code == "") {
        toast.error("Please select currency code");
      } else {
        transactionForm.isLoader = true;
        setTransactionForm({ ...transactionForm });
        const param = new FormData();
        param.append("action", "add_withdraw");
        param.append("is_app", 1);
        param.append("AADMIN_LOGIN_ID", 1);
        param.append("user_id", userData.data["user_id"]);
        param.append("account_type", transactionForm.from_account_type);
        param.append("payment_method", transactionForm.payment);
        param.append("amount", transactionForm.amount);
        param.append("currency", transactionForm.currency_code);
        param.append("note", transactionForm.note);
        await axios
          .post(`${Url}/ajaxfiles/user_manage.php`, param)
          .then((res) => {
            if (res.data.message == "Session has been expired") {
              localStorage.setItem("login", true);
              navigate("/");
            }
            // setLoader(false);
            transactionForm.isLoader = false;
            setTransactionForm({ ...transactionForm });
            if (res.data.status == "error") {
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
              setOpen(false);
            }
          });
      }
    } else if (transactionForm.type == "INTERNAL_TRANSFER") {
      if (transactionForm.from_account_type == "") {
        toast.error("Please select from account type");
      } else if (transactionForm.transfer_to == "") {
        toast.error("Please select transfer to");
      } else if (transactionForm.account == "") {
        toast.error("Please select from account");
      } else if (transactionForm.account_to == "") {
        toast.error("Please select to account");
      } else if (
        transactionForm.account_to == "MT5" &&
        transactionForm.mt5_account_id == ""
      ) {
        toast.error("Please select mt5 account id");
      } else if (
        transactionForm.account_to == "Wallet" &&
        transactionForm.wallet_code == ""
      ) {
        toast.error("Please enter wallet code");
      } else if (transactionForm.amount == "") {
        toast.error("Please enter amount");
      } else if (transactionForm.currency_code == "") {
        toast.error("Please select currency code");
      } else if (transactionForm.note == "") {
        toast.error("Please enter note");
      } else {
        transactionForm.isLoader = true;
        setTransactionForm({ ...transactionForm });
        const param = new FormData();
        param.append("action", "add_internal_transfer");
        param.append("is_app", 1);
        param.append("AADMIN_LOGIN_ID", 1);
        param.append("user_id", userData.data["user_id"]);
        param.append("from_transfer", transactionForm.account);
        param.append("to_transfer", transactionForm.account_to);
        if (transactionForm.account_to == "MT5") {
          param.append("wallet_id", "");
          param.append("mt5_account_id", transactionForm.mt5_account_id);
        } else {
          param.append("wallet_id", transactionForm.wallet_code);
          param.append("mt5_account_id", "");
        }
        param.append("amount", transactionForm.amount);
        param.append("currency", transactionForm.currency_code);
        param.append("from_account_type", transactionForm.from_account_type);
        param.append("transfer_to", transactionForm.transfer_to);
        param.append("note", transactionForm.note);
        await axios
          .post(`${Url}/ajaxfiles/user_manage.php`, param)
          .then((res) => {
            if (res.data.message == "Session has been expired") {
              localStorage.setItem("login", true);
              navigate("/");
            }
            // setLoader(false);
            transactionForm.isLoader = false;
            setTransactionForm({ ...transactionForm });
            if (res.data.status == "error") {
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
              setOpen(false);
            }
          });
        // toast.success('Internal transfer has been successfully added.');
        // setOpen(false);
      }
    } else if (transactionForm.type == "CREDIT") {
      if (transactionForm.credit_type == "") {
        toast.error("Please select credit type");
      } else if (transactionForm.account == "") {
        toast.error("Please select account");
      } else if (transactionForm.amount == "") {
        toast.error("Please enter amount");
      } else if (transactionForm.note == "") {
        toast.error("Please enter note");
      } else {
        toast.success("Credit has been successfully added.");
        setOpen(false);
      }
    }
  };

  const campaignInput = (event) => {
    const { name, value } = event.target;
    setLinkCampaignForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const linkCampaignSubmit = () => {
    console.log(linkCampaignForm);

    if (linkCampaignForm.account == "") {
      toast.error("Please select account");
    } else if (linkCampaignForm.campaign == "") {
      toast.error("Please select campaign");
    } else {
      toast.success("Campaign has been successfully linked.");
      setOpen(false);
    }
  };

  const input9 = (event) => {
    var { name, value } = event.target;

    setDeleteStructureForm((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const deleteStructureSubmit = () => {
    if (deleteStructureForm.structure == "") {
      toast.error("Please select structure");
    } else {
      toast.success("Structure has been successfully deleted");
      setDeleteStructureForm({
        structure: "",
      });
    }
  };

  const getUserDetails = async () => {
    const param = new FormData();
    param.append("is_app", 1);
    param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    userData.isLoader = true;
    setuserData({ ...userData });
    await axios
      .post(`${Url}/ajaxfiles/fetch_user_details.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        userData.isLoader = false;
        setuserData({ ...userData });
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          // console.log(res.data.data);
          userData.data = res.data.data;
          // setuserData({...res.data.data});
          // console.log(userData);
          setuserData({ ...userData });
          console.log(userData);
        }
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          {userData.isLoader == true ? (
            <div className="loader">
              <div className="clock">
                <div className="pointers"></div>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 1 }}>
              <Grid container>
                <Grid item md={12} lg={12} xl={12}>
                  <div className="client-detail-header">
                    <div className="client-name">
                      <label>
                        {userData.data["user_first_name"]}{" "}
                        {userData.data["user_last_name"]}
                      </label>
                      <p className="margin-bottom-remove">
                        {userData.data["wallet_code"]}
                      </p>
                    </div>
                    <div className="header-highlight">
                      <label>Created On</label>
                      <p>{userData.data["added_datetime"]}</p>
                    </div>
                    <div className="header-highlight">
                      <label>Total Accounts</label>
                      <p>0</p>
                    </div>
                    <div className="header-highlight">
                      <label>Account Currency</label>
                      <p>USD</p>
                    </div>
                    <div className="header-highlight">
                      <label>Balance</label>
                      <p>$ 0.00</p>
                    </div>
                    <div className="header-highlight">
                      <label>Sales Agent</label>
                      <p>Not Assigned</p>
                    </div>
                  </div>
                  <br />
                  {/* <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}> */}
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    className="tabsBar"
                  >
                    <Tab label="PROFILE PAGE" />
                    <Tab label="BANK DETAILS" />
                    <Tab label="DOCUMENTS" />
                    <Tab label="ACCOUNTS" />
                    <Tab label="ACTIVITIES" />
                    <Tab label="LOGS" />
                    <Tab label="TRANSACTIONS" />
                    <Tab label="REFERRALS" />
                    <Tab label="PARTNERSHIP" />
                    <Tab label="STATEMENT" />
                  </Tabs>
                  <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={9} lg={9} xl={9}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <p className="header-title">General Information</p>
                            <div className="contentSection formSection">
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Title</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.title}
                                    onChange={profileInput}
                                    name="title"
                                  >
                                    <MenuItem value="Mr.">Mr.</MenuItem>
                                    <MenuItem value="Mrs">Mrs</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                    <MenuItem value="Ms">Ms</MenuItem>
                                    <MenuItem value="Dr">Dr</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="First Name"
                                  variant="standard"
                                  //   value={userData.data["user_first_name"]}
                                  value={profileForm.first_name}
                                  focused
                                  name="first_name"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="Last Name"
                                  variant="standard"
                                  value={profileForm.last_name}
                                  //   value={userData.data["user_last_name"]}
                                  focused
                                  name="last_name"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="Phone"
                                  value={profileForm.phone}
                                  variant="standard"
                                  focused
                                  name="phone"
                                  onChange={profileInput}
                                />
                              </div>
                          
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="Email"
                                  variant="standard"
                                  value={profileForm.email}
                                  //   value={userData.data["user_email"]}
                                  focused
                                  name="email"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <TextField
                                  type="date"
                                  className="input-font-small"
                                  label="Date of Birth"
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                  value={profileForm.dob}
                                  name="dob"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Nationality</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    value={profileForm.nationality}
                                    // value={age}
                                    onChange={profileInput}
                                    name="nationality"
                                  >
                                    <MenuItem value="Mr.">Mr.</MenuItem>
                                    <MenuItem value="Mrs">Mrs</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                    <MenuItem value="Ms">Ms</MenuItem>
                                    <MenuItem value="Dr">Dr</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Country of Residence</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.country_of_residence}
                                    onChange={profileInput}
                                    name="country_of_residence"
                                  >
                                    <MenuItem value="Mr.">Mr.</MenuItem>
                                    <MenuItem value="Mrs">Mrs</MenuItem>
                                    <MenuItem value="Miss">Miss</MenuItem>
                                    <MenuItem value="Ms">Ms</MenuItem>
                                    <MenuItem value="Dr">Dr</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="City"
                                  variant="standard"
                                  focused
                                  value={profileForm.city}
                                  name="city"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="Address"
                                  variant="standard"
                                  focused
                                  value={profileForm.address}
                                  name="address"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="Address Line 2"
                                  variant="standard"
                                  focused
                                  value={profileForm.address_2}
                                  name="address_2"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Gendere</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.gender}
                                    onChange={profileInput}
                                    name="gender"
                                  >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="Postal Code"
                                  variant="standard"
                                  value={profileForm.postal_code}
                                  focused
                                  name="postal_code"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Language</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    value={profileForm.language}
                                    onChange={profileInput}
                                    name="language"
                                  >
                                    <MenuItem value="en-gb">English</MenuItem>
                                    <MenuItem value="ar-ae">عربي</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="Source"
                                  variant="standard"
                                  focused
                                  value={profileForm.source}
                                  name="source"
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>US citizen ?</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.us_citizen}
                                    onChange={profileInput}
                                    name="us_citizen"
                                  >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Worked in Financial?</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.finacial_work}
                                    onChange={profileInput}
                                    name="finacial_work"
                                  >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <TextField
                                  className="input-font-small"
                                  label="Tax Identification Number"
                                  variant="standard"
                                  focused
                                  name="tax_number"
                                  value={profileForm.tax_number}
                                  onChange={profileInput}
                                />
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Politically exposed ?</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.politically_exposed}
                                    onChange={profileInput}
                                    name="politically_exposed"
                                  >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Sales Agent</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.sales_agent}
                                    onChange={profileInput}
                                    name="sales_agent"
                                  >
                                    <MenuItem value="1">Demo</MenuItem>
                                    <MenuItem value="2">Test</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                         
                            <div className="btnActionSection">
                              <Button
                                variant="contained"
                                className="btn-success"
                                onClick={profileSubmit}
                              >
                                Update Profile
                              </Button>
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item md={3} lg={3} xl={3}>
                          <Paper elevation={2} style={{ borderRadius: "10px" }}>
                            <p className="header-title">Quick Actions</p>
                            <div className="contentSection">
                              <p className="group-header">Trading Account</p>
                              <div className="mt5btngroup">
                                <Button
                                  variant="contained"
                                  className="createMt5 btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Create MT5
                                </Button>
                                <Button
                                  variant="contained"
                                  className="mt5_access btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  MT5 Access
                                </Button>
                                <Button
                                  variant="contained"
                                  className="link_mt5 btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Link MT5
                                </Button>
                                <Button
                                  variant="contained"
                                  className="reset_mt5 btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Reset MT5
                                </Button>
                                <Button
                                  variant="contained"
                                  className="change_leverage btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Change Leverage
                                </Button>
                                <Button
                                  variant="contained"
                                  className="change_password btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Change Password
                                </Button>
                              </div>
                              <br />
                              <p className="group-header">IB</p>
                              <div className="mt5btngroup">
                                <Button
                                  variant="contained"
                                  className="add_master_structure btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Add Master Structure
                                </Button>
                                <Button
                                  variant="contained"
                                  className="add_shared_structure btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Add Shared Structure
                                </Button>
                                <Button
                                  variant="contained"
                                  className="link_client btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Link Client
                                </Button>
                                <Button
                                  variant="contained"
                                  className="link_ib btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Link To IB
                                </Button>
                                <Button
                                  variant="contained"
                                  className="unlink_ib btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Unlink IB
                                </Button>
                              </div>
                              <br />
                              <p className="group-header">Communication</p>
                              <div className="mt5btngroup">
                                <Button
                                  variant="contained"
                                  className="send_email btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Send Email
                                </Button>
                              </div>
                              <br />
                              <p className="group-header">Client Portal</p>
                              <div className="mt5btngroup">
                                <Button
                                  variant="contained"
                                  className="cp_access btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  CP Access
                                </Button>
                                <Button
                                  variant="contained"
                                  className="view_cp_password btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  View CP Password
                                </Button>
                              </div>
                              <br />
                              <p className="group-header">Misc.</p>
                              <div className="mt5btngroup">
                                <Button
                                  variant="contained"
                                  className="download_application btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Download Application
                                </Button>
                                <Button
                                  variant="contained"
                                  className="add_note btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Add Note
                                </Button>
                                <Button
                                  variant="contained"
                                  className="add_bank btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Add Bank
                                </Button>
                                <Button
                                  variant="contained"
                                  className="add_transaction btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Add Transaction
                                </Button>
                              </div>
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={6} lg={6} xl={6}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <p className="header-title">
                              Financial Information
                            </p>
                            <div className="contentSection">
                              <Grid
                                container
                                spacing={3}
                                className="grid-handle"
                              >
                                <Grid item md={6} lg={6} xl={6}>
                                  <p className="subtitle">Annual Income</p>
                                </Grid>
                                <Grid item md={6} lg={6} xl={6}>
                                  <p className="subtitle">Source of Funds</p>
                                </Grid>
                              </Grid>
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item md={6} lg={6} xl={6}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <p className="header-title">Employment Details</p>
                            <div className="contentSection">
                              <Grid
                                container
                                spacing={3}
                                className="grid-handle"
                              >
                                <Grid item md={6} lg={6} xl={6}>
                                  <div
                                    className="element"
                                    style={{ width: "100%" }}
                                  >
                                    <FormControl
                                      variant="standard"
                                      sx={{ width: "100%" }}
                                      focused
                                    >
                                      <InputLabel>Employment Status</InputLabel>
                                      <Select
                                        label
                                        className="select-font-small"
                                        // value={age}
                                        onChange={employementInput}
                                        name="status"
                                      >
                                        <MenuItem value="Employed (full time)">
                                          Employed (full time)
                                        </MenuItem>
                                        <MenuItem value="Self Employed">
                                          Self Employed
                                        </MenuItem>
                                        <MenuItem value="Employed (part time )">
                                          Employed (part time )
                                        </MenuItem>
                                        <MenuItem value="unemployed">
                                          unemployed
                                        </MenuItem>
                                        <MenuItem value="Student">
                                          Student
                                        </MenuItem>
                                        <MenuItem value="Retired">
                                          Retired
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                </Grid>
                                <Grid item md={6} lg={6} xl={6}>
                                  <div
                                    className="element"
                                    style={{ width: "100%" }}
                                  >
                                    <FormControl
                                      variant="standard"
                                      sx={{ width: "100%" }}
                                      focused
                                    >
                                      <InputLabel>Inudstry</InputLabel>
                                      <Select
                                        label
                                        className="select-font-small"
                                        // value={age}
                                        onChange={employementInput}
                                        name="industry"
                                      >
                                        <MenuItem value="Aviation">
                                          Aviation
                                        </MenuItem>
                                        <MenuItem value="Agricultural">
                                          Agricultural
                                        </MenuItem>
                                        <MenuItem value="Financial industry">
                                          Financial industry
                                        </MenuItem>
                                        <MenuItem value="Marketing">
                                          Marketing
                                        </MenuItem>
                                        <MenuItem value="Retail industry">
                                          Retail industry
                                        </MenuItem>
                                        <MenuItem value="HR">HR</MenuItem>
                                        <MenuItem value="Management">
                                          Management
                                        </MenuItem>
                                        <MenuItem value="Healthcare">
                                          Healthcare
                                        </MenuItem>
                                        <MenuItem value="Administration">
                                          Administration
                                        </MenuItem>
                                        <MenuItem value="Academic">
                                          Academic
                                        </MenuItem>
                                        <MenuItem value="Engineering">
                                          Engineering
                                        </MenuItem>
                                        <MenuItem value="Civil Engineering">
                                          Civil Engineering
                                        </MenuItem>
                                        <MenuItem value="Architecture">
                                          Architecture
                                        </MenuItem>
                                        <MenuItem value="Media">Media</MenuItem>
                                        <MenuItem value="Chemical engineering">
                                          Chemical engineering
                                        </MenuItem>
                                        <MenuItem value="Power engineering">
                                          Power engineering
                                        </MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <div className="btnActionSection employment-details">
                                    <Button
                                      variant="contained"
                                      className="btn-success"
                                      onClick={employmentDetailsSubmit}
                                    >
                                      Update Information
                                    </Button>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </Paper>
                        </Grid>
                        <Grid item md={6} lg={6} xl={6}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <p className="header-title">Declarations</p>
                            <div className="contentSection">
                              <FormControlLabel
                                className="declarationCheckbox"
                                control={
                                  <Checkbox defaultChecked name="declaration" />
                                }
                                label="By clicking here I give my consent for Exiniti to contact me for marketing purposes. You can opt out at any time. For further details please see ourMarketing and Communication Policy Statement."
                              />
                              {/* <div className='element'>
                                                        </div> */}
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Bank Accounts</p>
                              <Button
                                variant="contained"
                                className="add_bank"
                                onClick={openDialogbox}
                              >
                                Add New Bank Account
                              </Button>
                            </div>
                            {/* <br/> */}
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/users_list.php`}
                                column={depositColumn}
                                sort="0"
                                filter={filterData}
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                      <Grid
                        container
                        spacing={3}
                        className="grid-handle panding-left-right-3px"
                      >
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Upload New Document</p>
                              {/* <Button variant="contained" className='add_bank' onClick={openDialogbox}>Add New Bank Account</Button> */}
                            </div>
                            {/* <br/> */}
                            <div className="documentDetailsTabSection">
                              <div className="">
                                <Grid container spacing={1} className="ml-n1">
                                  <Grid item sm={9} className="p-1">
                                    <FormControl className="w-100">
                                      {/* <InputLabel htmlFor="account_no">ACCOUNT NO</InputLabel> */}
                                      <Select
                                        value={doc.proof}
                                        name="proof"
                                        label="Proof of ID"
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        input={<BootstrapInput />}
                                        className="mt-0 ml-0"
                                      >
                                        <MenuItem
                                          value=""
                                          onClick={() => {
                                            setOption(true);
                                            setChange(false);
                                          }}
                                        >
                                          Proof of ID
                                        </MenuItem>
                                        <MenuItem
                                          value="Proof of Address"
                                          onClick={() => {
                                            setOption(false);
                                            setChange(true);
                                          }}
                                        >
                                          Proof of Address
                                        </MenuItem>

                                        <MenuItem
                                          value="Addition Documents"
                                          onClick={() => {
                                            setOption(false);
                                            setChange(true);
                                          }}
                                        >
                                          Addition Documents
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item sm={3} className="p-1">
                                    {option && (
                                      <FormControl className="w-100">
                                        <Select
                                          value={doc.id}
                                          name="id"
                                          label="ID"
                                          onChange={handleChange}
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          input={<BootstrapInput />}
                                          className="mt-0 ml-0"
                                        >
                                          <MenuItem value="ID">ID</MenuItem>
                                          <MenuItem value="Password">
                                            PASSWORD
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}
                                    {change && (
                                      <Button
                                        type="submit"
                                        variant="contained"
                                        size="medium"
                                        className="w-100 p-0 h-100 !important d-flex align-items-stretch text-capitalize d-none"
                                      >
                                        {proofAdd.length < 3 ? (
                                          <Input
                                            accept="image/*"
                                            id="uploadDoc"
                                            type="file"
                                            name="fontimg"
                                            // value={doc.fontimg}
                                            onChange={(e) => {
                                              console.log(proofAdd, "proof");
                                              setProofAdd([
                                                ...proofAdd,
                                                e.target.files[0],
                                              ]);
                                              //   setProofAdd(
                                              //     proofAdd.concat(e.target.files)
                                              //   )
                                            }}
                                            style={{ display: "none" }}
                                          />
                                        ) : (
                                          ""
                                        )}{" "}
                                        <label
                                          htmlFor="uploadDoc"
                                          className="w-100 h-100 d-flex align-items-center justify-content-center"
                                        >
                                          <CloudUploadIcon className="m-2" />
                                          Browse
                                        </label>
                                      </Button>
                                    )}
                                  </Grid>
                                </Grid>
                                {change && (
                                  <Grid container className="text-center my-4">
                                    <Grid item sm={12}>
                                      {proofAdd.map((proof, index) => {
                                        return (
                                          <Paper
                                            elevation={1}
                                            className="d-flex p-3 justify-content-between align-items-center mb-2"
                                            style={{ borderRadius: "10px" }}
                                            key={index}
                                          >
                                            <span className="text-dark font-size-sm font-weight-bold">
                                              {proof.name}
                                            </span>
                                            <CloseOutlinedIcon
                                              className="fontimgclose"
                                              onClick={() => {
                                                // proofAdd.splice(index, 1);
                                                console.log(proofAdd, "asdASF");
                                                setProofAdd(
                                                  proofAdd.filter(
                                                    (v, i) => i !== index
                                                  )
                                                );
                                              }}
                                            />
                                          </Paper>
                                        );
                                      })}
                                    </Grid>
                                  </Grid>
                                )}
                                {option && (
                                  <Grid
                                    container
                                    spacing={7}
                                    className="mt-4 mb-2 justify-content-center"
                                    style={{ marginLeft: "-28px" }}
                                  >
                                    <Grid
                                      item
                                      sm={6}
                                      lg={4}
                                      className="d-flex flex-column align-items-center upload-zone p-4"
                                    >
                                      <h6 className="mb-3 font-size-xs font-weight-bold">
                                        FRONT SIDE*
                                      </h6>
                                      <div className="uploaderDropZone">
                                        <Input
                                          accept="image/*"
                                          id="FILE_FRONT_SIDE"
                                          type="file"
                                          name="fontimg"
                                          // value={doc.fontimg}
                                          onChange={(e) =>
                                            setDoc((prevalue) => {
                                              return {
                                                ...prevalue,
                                                fontimg: e.target.files[0],
                                              };
                                            })
                                          }
                                          style={{ display: "none" }}
                                        />{" "}
                                        {!doc.fontimg ? (
                                          <label
                                            htmlFor="FILE_FRONT_SIDE"
                                            className="text-dark font-weight-bold font-size-xs"
                                          >
                                            UPLOAD
                                          </label>
                                        ) : (
                                          <div className="received-file">
                                            <div className="w-100 h-100">
                                              {doc.fontimg.name}
                                            </div>
                                            <button
                                              className="bg-transparent p-0 border-0"
                                              onClick={() =>
                                                setDoc((prevalue) => {
                                                  return {
                                                    ...prevalue,
                                                    fontimg: "",
                                                  };
                                                })
                                              }
                                            >
                                              <CloseOutlinedIcon className="fontimgclose" />
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </Grid>
                                    <Grid
                                      item
                                      sm={6}
                                      lg={4}
                                      className="d-flex flex-column align-items-center upload-zone p-4"
                                    >
                                      <h6 className="mb-3 font-size-xs font-weight-bold">
                                        BACK SIDE*
                                      </h6>
                                      <div className="uploaderDropZone">
                                        <input
                                          accept="image/*"
                                          id="FILE_BACK_SIDE"
                                          type="file"
                                          name="backimg"
                                          // value={doc.backimg}
                                          onChange={(e) =>
                                            setDoc((prevalue) => {
                                              return {
                                                ...prevalue,
                                                backimg: e.target.files[0],
                                              };
                                            })
                                          }
                                          style={{ display: "none" }}
                                        />

                                        {!doc.backimg ? (
                                          <label
                                            htmlFor="FILE_BACK_SIDE"
                                            className="text-dark font-weight-bold font-size-xs"
                                          >
                                            UPLOAD
                                          </label>
                                        ) : (
                                          <div className="received-file">
                                            <div className="w-100 h-100">
                                              {doc.backimg.name}
                                            </div>
                                            <button
                                              className="bg-transparent p-0 border-0"
                                              onClick={() =>
                                                setDoc((prevalue) => {
                                                  return {
                                                    ...prevalue,
                                                    backimg: "",
                                                  };
                                                })
                                              }
                                            >
                                              <CloseOutlinedIcon className="fontimgclose" />
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </Grid>
                                    <hr className="ml-2 mr-2"></hr>
                                    <Grid
                                      item
                                      xs={12}
                                      className="py-0 pr-4 pl-4 pb-1"
                                    >
                                      <form
                                        noValidate
                                        className="autocomplete-off"
                                      >
                                        <h6 className="font-weight-bold mb-4 pb-1 d-flex">
                                          Fill in your Details for a seamless
                                          experience{" "}
                                          <small className="d-baseline">
                                            {" "}
                                            (Optional)
                                          </small>
                                        </h6>
                                        <Grid
                                          container
                                          spacing={1}
                                          className="ml-n1"
                                        >
                                          <Grid item sm={6} className="p-1">
                                            <FormControl className="w-100">
                                              <label className="font-weight-bold font-size-sm d-flex justify-content-start">
                                                Document No
                                              </label>
                                              <BootstrapInput
                                                value={doc.documentNo}
                                                name="documentNo"
                                                onChange={handleChange}
                                                inputProps={{
                                                  "aria-label": "Without label",
                                                }}
                                              />
                                            </FormControl>
                                          </Grid>
                                          <Grid item sm={6} className="p-1">
                                            <FormControl className="w-100 mb-2">
                                              <label className="font-weight-bold font-size-sm d-flex justify-content-start">
                                                Country Of Issue
                                              </label>
                                              <Select
                                                value={doc.id}
                                                name="id"
                                                label="ID"
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{
                                                  "aria-label": "Without label",
                                                }}
                                                input={<BootstrapInput />}
                                                className="mt-0 ml-0"
                                              >
                                                <MenuItem value=""></MenuItem>
                                              </Select>
                                            </FormControl>
                                          </Grid>
                                          <Grid item sm={6} className="p-1">
                                            <FormControl className="w-100 mb-2">
                                              <label className="font-weight-bold font-size-sm d-flex justify-content-start">
                                                Date Of Issue
                                              </label>

                                              <BootstrapInput
                                                id="date"
                                                type="date"
                                                defaultValue=""
                                                sx={{ width: "100%" }}
                                                inputlabelprops={{
                                                  shrink: true,
                                                }}
                                                inputProps={{
                                                  max: "2022-04-13",
                                                }}
                                                onChange={(e) =>
                                                  setFilterData({
                                                    ...filterData,
                                                    deposit_from:
                                                      e.target.value,
                                                  })
                                                }
                                              />
                                            </FormControl>
                                          </Grid>
                                          <Grid item sm={6} className="p-1">
                                            <FormControl className="w-100 mb-2">
                                              <label className="font-weight-bold font-size-sm d-flex justify-content-start">
                                                Date Of Expiry
                                              </label>

                                              <BootstrapInput
                                                id="date"
                                                type="date"
                                                defaultValue=""
                                                sx={{ width: "100%" }}
                                                inputlabelprops={{
                                                  shrink: true,
                                                }}
                                                onChange={(e) =>
                                                  setFilterData({
                                                    ...filterData,
                                                    deposit_from:
                                                      e.target.value,
                                                  })
                                                }
                                              />
                                            </FormControl>
                                          </Grid>
                                        </Grid>
                                      </form>
                                    </Grid>
                                  </Grid>
                                )}

                                <div className="text-dark font-size-xs d-flex justify-content-between align-items-center">
                                  <i>
                                    (Maximum size of document 5MB) Allow File
                                    Formats *jpg, *png, *pdf
                                  </i>
                                  <Button
                                    type="submit"
                                    disabled={true}
                                    variant="contained"
                                    size="medium"
                                    className="p-3 pr-4 pl-4 text-center text-capitalize"
                                  >
                                    Save
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Accounts</p>
                              <div className="groun-button">
                                <Button
                                  variant="contained"
                                  className="link_campaign"
                                  onClick={openDialogbox}
                                >
                                  Link to Campaign
                                </Button>
                                <Button
                                  variant="contained"
                                  className="link_mt5"
                                  onClick={openDialogbox}
                                >
                                  Link Account
                                </Button>
                                <Button
                                  variant="contained"
                                  className="createMt5"
                                  onClick={openDialogbox}
                                >
                                  Create Account
                                </Button>
                              </div>
                            </div>
                            {/* <br/> */}
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/users_list.php`}
                                column={depositColumn}
                                sort="0"
                                filter={filterData}
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Activities</p>
                            </div>
                            {/* <br/> */}
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/activity_log_list.php`}
                                column={activityColumn}
                                sort="2"
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={5} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Notes</p>
                              <Button
                                variant="contained"
                                className="add_note"
                                onClick={openDialogbox}
                              >
                                Add Note
                              </Button>
                            </div>
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/activity_log_list.php`}
                                column={activityColumn}
                                sort="2"
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">
                                Individual Stage History
                              </p>
                              {/* <Button variant="contained" className='add_note' onClick={openDialogbox}>Add Note</Button> */}
                            </div>
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/activity_log_list.php`}
                                column={activityColumn}
                                sort="2"
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">IB Stage History</p>
                              {/* <Button variant="contained" className='add_note' onClick={openDialogbox}>Add Note</Button> */}
                            </div>
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/activity_log_list.php`}
                                column={activityColumn}
                                sort="2"
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Status History</p>
                              {/* <Button variant="contained" className='add_note' onClick={openDialogbox}>Add Note</Button> */}
                            </div>
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/activity_log_list.php`}
                                column={activityColumn}
                                sort="2"
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={6} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Transactions</p>
                              <Button
                                variant="contained"
                                className="add_transaction"
                                onClick={openDialogbox}
                              >
                                Add New Transaction
                              </Button>
                            </div>
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/activity_log_list.php`}
                                column={activityColumn}
                                sort="2"
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={7} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Referrals</p>
                            </div>
                            <div className="bankDetailsTabSection">
                              <HighchartsReact
                                options={options}
                                highcharts={Highcharts}
                                constructorType={"mapChart"}
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={8} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <div className="header-search-section">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                >
                                  <InputLabel>Structure</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    name="structure"
                                    onChange={input9}
                                  >
                                    <MenuItem value="1">Test</MenuItem>
                                  </Select>
                                </FormControl>
                                <Button
                                  variant="contained"
                                  className="add_master_structure btn-danger"
                                  onClick={deleteStructureSubmit}
                                >
                                  Structure Delete
                                </Button>
                              </div>
                              <div className="groun-button">
                                <Button
                                  variant="contained"
                                  className="add_master_structure"
                                  onClick={openDialogbox}
                                >
                                  Add Master Structure
                                </Button>
                                <Button
                                  variant="contained"
                                  className="add_shared_structure"
                                  onClick={openDialogbox}
                                >
                                  Add Shared Structure
                                </Button>
                                <Button
                                  variant="contained"
                                  className="edit_structure"
                                  onClick={openDialogbox}
                                >
                                  Edit Structure
                                </Button>
                              </div>
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={9} dir={theme.direction}>
                      <Grid container spacing={3} className="grid-handle">
                        <Grid item md={12} lg={12} xl={12}>
                          <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Statement</p>
                            </div>
                            {/* <br/> */}
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/activity_log_list.php`}
                                column={activityColumn}
                                sort="2"
                              />
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                  </SwipeableViews>
                  {/* </Box> */}
                </Grid>
              </Grid>

              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                className="modalWidth100"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
