import "./profile.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Highcharts from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import CreateIcon from "@mui/icons-material/Create";
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
import KycDocument from "./KycDocument";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [param, setParam] = useState({
    'action': 'my_referrals',
    'user_id': id,
    'structure_id': 0
  });
  const [userData, setuserData] = useState({ isLoader: true, data: {} });
  const [filterData, setFilterData] = useState(null);
  const [mt5AccountList, setMt5AccountList] = useState([]);
  const [salesList, setSalesList] = useState([])
  const [countryData, setCountryData] = useState({
    data: [],
  });
  const [doc, setDoc] = useState({
    proof: "",
    id: "",
    fontimg: "",
    backimg: "",
  });
  const [walletBal, setWalletBal] = useState("");
  var [profileForm, setProfileForm] = useState({
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
    login_block: "",
    user_status: "",
  });
  const [createMt5Form, setCreateMt5Form] = useState({
    account_type: "",
    account_option: "",
    isLoader: false,
  });
  const [createLiveType, setCreateLiveType] = useState([]);
  const [Mt5AccessForm, setMt5AccessForm] = useState({
    account_type: "",
    status: "",
    isLoader: false,
  });
  const [linkAccountForm, setLinkAccountForm] = useState({
    account_number: "",
    account_type: "",
    account_name: "",
    account_option: "",
    password: "",
    confirm_password: "",
    isLoader: false,
  });
  const [resetMt5PasswordForm, setResetMt5PasswordForm] = useState({
    mt5_id: "",
    isLoader: false,
  });
  const [leverageForm, setLeverageForm] = useState([]);
  const [changeLeverageForm, setChangeLeverageForm] = useState({
    account: "",
    leverage: "",
    isLoader: false,
  });
  const [changeAccountPasswordForm, setChangeAccountPasswordForm] = useState({
    mt5_id: "",
    new_password: "",
    confirm_password: "",
    password_type: "",
    isLoader: "",
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
    list: []
  });
  const [linkIBForm, setLinkIBForm] = useState({
    master_account: "",
    customer_name: "",
    structure: "",
    list: []
  });
  const [sendMailForm, setsendMailForm] = useState({
    from: "",
    to: "",
    subject: "",
    template_title: "",
    language: "",
    template: "",
    body: "",
    isLoader: false,
  });
  const [cpAccessForm, setCpAccessForm] = useState({
    status: "",
  });
  const [noteForm, setNoteForm] = useState({
    notes: "",
    call_status: "",
    set_reminder: false,
    date: "",
    isLoader: false,
  });
  const [bankAccountForm, setBankAccountForm] = useState({
    name: "",
    bank_name: "",
    bank_address: "",
    iban_number: "",
    account_number: "",
    swift_code: "",
    currency_code: "",
    isLoader: false,
  });
  const [transactionForm, setTransactionForm] = useState({
    type: "",
    from_account_type: "",
    mt5_id: "",
    credit_type: "",
    deposit_to: "",
    transfer_to: "",
    account: "",
    account_to: "",
    payment: "",
    payment_method: "",
    amount: "",
    note: "",
    currency_code: "",
    isLoader: false,
    transation_id: "",
    wallet_code: "",
    mt5_account_id: "",
    isLoder: false,
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
  const [allBank, setAllBank] = useState([]);
  toast.configure();
  const [mtBalance, setMtBalance] = useState("");
  const [masterStructureData, setMasterStructureData] = useState([]);
  const [newMasterStructureData, setNewMasterStructureData] = useState({
    structure_name: "",
    structure_data: [],
    structure_id: "",
    isLoader: false,
  });
  const [partnershipMasterStructureData, setPartnershipMasterStructureData] = useState({
    structure_name: "",
    structure_data: [],
    structure_id: "",
    isLoader: false,
  });
  const [newPartnershipMasterStructureData, setNewPartnershipMasterStructureData] = useState({
    structure_name: "",
    structure_data: [],
    structure_id: "",
    isLoader: false,
  });
  const [structureList, setStructureList] = useState({
    data: [],
    structure_name: "",
    structure_id: "",
  });
  const [referralData, setReferralData] = useState({
    data: [],
    structure_name: "",
    structure_id: "",
  });

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

  const mt5AccountListColumn = [
    {
      name: "Sr No",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.2,
    },
    {
      name: "Name",
      selector: (row) => {
        return <span title={row.mt5_name}>{row.mt5_name}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Account Number",
      selector: (row) => {
        return <span title={row.mt5_acc_no}>{row.mt5_acc_no}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Account Type",
      selector: (row) => {
        return (
          <span title={row.acc_type == "1" ? "Live" : "Demo"}>
            {row.acc_type == "1" ? "Live" : "Demo"}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Group Name",
      selector: (row) => {
        return <span title={row.group_name}>{row.group_name}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Leverage",
      selector: (row) => {
        return <span title={row.leverage}>{row.leverage}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.2,
    },
    {
      name: "Date",
      selector: (row) => {
        return <span title={row.added_datetime}>{row.added_datetime}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Main Password",
      selector: (row) => {
        return <span title={row.main_pwd}>{row.main_pwd}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Investor Password",
      selector: (row) => {
        return <span title={row.investor_pwd}>{row.investor_pwd}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Status",
      selector: (row) => {
        return <span title={(row.status == "1") ? "APPROVED" : (row.status == "2") ? "REJECTED" : "PENDING"} className={`text-color-${(row.status == "1") ? "green" : (row.status == "2") ? "red" : "yellow"}`}>{(row.status == "1") ? "APPROVED" : (row.status == "2") ? "REJECTED" : "PENDING"}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
  ];

  const bankColumn = [
    {
      name: "Sr.No",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "BENEFICIARY NAME",
      selector: (row) => {
        return <span title={row.bank_name}>{row.bank_name}</span>;
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "IBAN/IFSC",
      selector: (row) => {
        return (
          <a className="linkColor" title={row.bank_ifsc}>
            {row.bank_ifsc}
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
        return (
          <span title={row.bank_account_number}>{row.bank_account_number}</span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 1.5,
    },
    {
      name: "BANK NAME",
      selector: (row) => {
        return (
          <span title={row.bank_account_holder_name}>
            {row.bank_account_holder_name}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div>
            <Button
              className="cursor-pointer p-0 p-md-2 rounded-circle text-muted"
            // onClick={() => bankAccountSubmit("paper", row.user_bank_id)}
            >
              <DeleteIcon sx={{ color: "red" }} />
            </Button>
            <Button
              className="add_bank cursor-pointer mx-3 p-0 p-md-2 rounded-circle text-muted "
              onClick={(e) => openDialogbox(e, row)}
            >
              <i
                className="material-icons add_bank"
                onClick={(e) => openDialogbox(e, row)}
                style={{ color: "green" }}
              >
                edit
              </i>
              {/* <CreateIcon sx={{ color: "green" }} className="add_bank" onClick={(e) => openDialogbox(e, row)}/> */}
              {/* edit */}
            </Button>
          </div>
        );
      },
      sortable: true,
      reorder: true,
      grow: 3,
    },
  ];

  const activityColumn = [
    {
      name: "SR NO",
      selector: (row) => row.sr_no,
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
      selector: (row) => row.added_datetime,
      sortable: true,
      reorder: true,
      grow: 1,
    },
  ];

  const referralsColumn = [
    {
      name: "Name",
      selector: (row) => row.structure_name,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },

    {
      name: "Client Type",
      selector: (row) => row.client_type,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Account",
      selector: (row) => row.mt5_acc_no,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Commission",
      selector: (row) => row.group_commission,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Rebate",
      selector: (row) => row.group_rebate,
      sortable: true,
      reorder: true,
      grow: 1,
    },
    {
      name: "Parent Name",
      selector: (row) => row.sponsor_name,
      sortable: true,
      reorder: true,
      grow: 1,
    },
  ];

  const partnershipcolumn = [
    {
      name: "SR.NO",
      selector: (row) => {
        return <span title={row.sr_no}>{row.sr_no}</span>;
      },
      wrap: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "USER NAME",
      selector: (row) => {
        return (
          <span title={row.requested_user_name}>{row.requested_user_name}</span>
        );
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "DATE",
      selector: (row) => {
        return <span title={row.date}>{row.date}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.6,
    },
    {
      name: "ACQUIRE CLIENT",
      selector: (row) => {
        return <span title={row.acquire_client}>{row.acquire_client}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "COUNTRY",
      selector: (row) => {
        return <span title={row.countries}>{row.countries}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "Sponsor Name",
      selector: (row) => {
        return <span title={row.sponsor_name}>{row.sponsor_name}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "EMAIL",
      selector: (row) => {
        return <span title={row.user_email}>{row.user_email}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },

    {
      name: "STRUCTURE NAME",
      selector: (row) => {
        return <span title={row.structure_name}>{row.structure_name}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "REFFEERED",
      selector: (row) => {
        return (
          <span title={row.structure_name}>
            {row.is_reffered == "0" ? "NO" : "YES"}
          </span>
        );
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "WEBSITE",
      selector: (row) => {
        return (
          <span title={row.is_website}>
            {row.is_website == "0" ? "NO" : "YES"}
          </span>
        );
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "REMARK",
      selector: (row) => {
        return <span title={row.remarks}>{row.remarks}</span>;
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
    {
      name: "SPONSOR APPROVE",
      selector: (row) => {
        return (
          <span
            title={row.sponsor_approve}
            className={`text-color-${row.sponsor_approve == "1"
              ? "green"
              : row.sponsor_approve == "2"
                ? "red"
                : "yellow"
              }`}
          >
            {row.sponsor_approve == "1"
              ? "APPROVED"
              : row.sponsor_approve == "2"
                ? "REJECTED"
                : "PENDING"}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "ADMIN APPROVE",
      selector: (row) => {
        return (
          <span
            title={row.admin_approve}
            className={`text-color-${row.admin_approve == "1"
              ? "green"
              : row.admin_approve == "2"
                ? "red"
                : "yellow"
              }`}
          >
            {row.admin_approve == "1"
              ? "APPROVED"
              : row.admin_approve == "2"
                ? "REJECTED"
                : "PENDING"}
          </span>
        );
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
            title={row.status}
            className={`text-color-${row.status == "1" ? "green" : row.status == "2" ? "red" : "yellow"
              }`}
          >
            {row.status == "1"
              ? "APPROVED"
              : row.status == "2"
                ? "REJECTED"
                : "PENDING"}
          </span>
        );
      },
      sortable: true,
      reorder: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "ACTION",
      selector: (row) => {
        return (
          <span title={row.structure_name}>
            {" "}
            {row.sponsor_approve == "1" ? (
              ""
            ) : (
              <Button
                sx={{ color: "black" }}
                onClick={() => {
                  viewRequest(row);
                }}
              >
                <i className="material-icons">view_timeline</i>
              </Button>
            )}
          </span>
        );
      },
      wrap: true,
      sortable: true,
      reorder: true,
      grow: 0.3,
    },
  ];

  const [ibdata, setIbData] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [getStructuresList, setGetStructuresList] = useState([]);
  const [viewCpPassword, setViewCpPassword] = useState({
    'cp_password': ''
  });
  const [updateDate, setUpdateDate] = useState({
    structure_id: "",
    sponsor_approve: "",
    remarks: "",
    isLoader: false,
    refresh: false,
  });

  const input01 = (event) => {
    const { name, value } = event.target;
    setUpdateDate((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const updatePartnership = () => {
    if (updateDate.sponsor_approve == "") {
      toast.error("Status is required");
    } else if (updateDate.remarks == "") {
      toast.error("Remark is required");
    } else {
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      param.append("action", "update_partnership_request");
      param.append("ib_application_id", ibdata.ib_application_id);
      param.append("structure_id", updateDate.structure_id);
      param.append("sponsor_approve", updateDate.sponsor_approve);
      param.append("remarks", updateDate.remarks);
      setUpdateDate((prevalue) => {
        return {
          ...prevalue,
          isLoader: true,
        };
      });
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          if (res.data.status == "error") {
            toast.error(res.data.message);
            setUpdateDate((prevalue) => {
              return {
                ...prevalue,
                isLoader: false,
              };
            });
          } else {
            toast.success(res.data.message);
            setUpdateDate((prevalue) => {
              return {
                ...prevalue,
                isLoader: false,
                refresh: !updateDate.refresh,
              };
            });
            setOpenModel(false);
          }
        });
    }
  };

  const viewRequest = (prop) => {
    setOpenModel(true);
    setIbData(prop);
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("action", "get_my_structure");
    axios
      .post(Url + "/ajaxfiles/update_user_profile.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setGetStructuresList(res.data.data);
      });
  };

  const noteColumn = [
    {
      name: "SR NO",
      selector: (row) => row.sr_no,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },

    {
      name: "Description",
      selector: (row) => row.notes,
      sortable: true,
      reorder: true,
      grow: 3,
    },
    {
      name: "DATETIME",
      selector: (row) => row.date,
      sortable: true,
      reorder: true,
      grow: 1,
    }
  ];

  const logColumn = [
    {
      name: "SR NO",
      selector: (row) => row.sr_no,
      sortable: true,
      reorder: true,
      grow: 0.4,
    },

    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      reorder: true,
      grow: 3,
    },
    {
      name: "DATETIME",
      selector: (row) => row.date,
      sortable: true,
      reorder: true,
      grow: 1,
    }
  ];

  const walletHistoryColumn = [
    {
      name: "SR NO",
      selector: (row) => row.sr_no,
      sortable: true,
      reorder: true,
      grow: 0.1,
    },
    {
      name: "DATE",
      selector: (row) => row.date,
      sortable: true,
      reorder: true,
      grow: 1,
      wrap: true,
    },
    {
      name: "Type",
      selector: (row) => row.description,
      sortable: true,
      reorder: true,
      grow: 1,
      wrap: true,
    },
    {
      name: "DESCRIPTION",
      selector: (row) => row.remarks,
      sortable: true,
      reorder: true,
      grow: 1,
      wrap: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.amount,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
    {
      name: "PAYMENT TYPE",
      selector: (row) => row.payment_method,
      sortable: true,
      reorder: true,
      grow: 0.5,
    },
  ];

  const getAccountList = () => {
    const param = new FormData();
    param.append("user_id", id);
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("action", "get_mt5_account_list");

    axios
      .post(Url + "/ajaxfiles/update_user_profile.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setMt5AccountList(res.data.data);
      });
  };

  const getMasterStructureList = () => {
    const param = new FormData();
    param.append("user_id", id);
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("action", "list_my_structures");

    axios
      .post(Url + "/ajaxfiles/master_structure_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setStructureList((preValue) => {
          return {
            ...preValue,
            data: res.data.data,
          };
        });
      });
  };

  const getMasterStructure2 = (res) => {
    const param1 = new FormData();
    // param1.append("is_app", 1);
    // param1.append("AADMIN_LOGIN_ID", 1);
    param1.append("user_id", id);

    if (res !== null) {
      if (res == "add_new_structure_data") {
        param1.append("action", res);
      } else {
        param1.append("structure_id", res);
        param1.append("action", "get_master_structure");
      }
    }

    axios
      .post(Url + "/ajaxfiles/master_structure_manage.php", param1)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setMasterStructureData(res.data.data);
      });
  };

  const forinloop = () => {
    console.log("masterStructureData123", masterStructureData);

    var html = [];
    for (let x in masterStructureData.pair_data) {
      console.log(
        "masterStructureData[0].pair_data",
        masterStructureData.pair_data[x],
        x
      );
      html.push(
        <div className="structureInputSection">
          <hr className="solid" />
          <br />

          <Grid container>
            <Grid item md={4} lg={4} xl={4} className="label-center">
              <label>{x}</label>
            </Grid>
            <Grid item md={8} lg={8} xl={8}>
              <Grid container spacing={1}>
                {masterStructureData.pair_data[x].map((item1, index1) => {
                  console.log(
                    "item1",
                    masterStructureData["pair_data"][x][index1]["rebate"]
                  );
                  return (
                    <>
                      <Grid item md={4} lg={4} xl={4}>
                        <label>{item1.pair_name}</label>
                      </Grid>
                      <Grid item md={4} lg={4} xl={4}>
                        <input
                          value={item1.rebate}
                          type="text"
                          className=""
                          placeholder="Rebate"
                          onChange={(e) => {
                            masterStructureData["pair_data"][x][index1][
                              "rebate"
                            ] = e.target.value;
                            console.log(
                              "enter in loop",
                              e.target.value,
                              x,
                              masterStructureData["pair_data"][x][index1][
                              "rebate"
                              ],
                              item1.rebate,
                              masterStructureData
                            );
                            setMasterStructureData({
                              ...masterStructureData,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item md={4} lg={4} xl={4}>
                        <input
                          value={item1.commission}
                          type="text"
                          className=""
                          placeholder="Commission"
                          onChange={(e) => {
                            masterStructureData["pair_data"][x][index1][
                              "commission"
                            ] = e.target.value;
                            setMasterStructureData({
                              ...masterStructureData,
                            });
                          }}
                        />
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
    return html;
  };

  const getMasterStructure = (res) => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    if (res) {
      param.append("structure_id", res);
      param.append("action", "get_my_structure");
    } else {
      param.append('action', 'get_default_structure');
      // param.append("action", "add_new_structure_data");
    }
    axios
      .post(Url + "/ajaxfiles/master_structure_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        console.log("ras.data.data", res.data.data);
        newMasterStructureData.structure_data = res.data.data;
        setNewMasterStructureData({ ...newMasterStructureData });
        console.log('newMasterStructureData', newMasterStructureData);
        // setMasterStructureData(res.data.data); 
        // setStructureList((preValue) => {
        //   return {
        //     ...preValue,
        //     data: res.data.data,
        //   };
        // });
      });
    console.log("masterStructureData", masterStructureData);
  };

  const getPartnershipMasterStructure = (res) => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    if (res) {
      param.append("structure_id", res);
      param.append("action", "get_my_structure");
    } else {
      param.append('action', 'get_default_structure');
      // param.append("action", "add_new_structure_data");
    }
    axios
      .post(Url + "/ajaxfiles/master_structure_manage.php", param)
      .then((resData) => {
        if (resData.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        console.log("ras.data.data", resData.data.data);
        if (res) {
          partnershipMasterStructureData.structure_data = resData.data.data;
          setPartnershipMasterStructureData({ ...partnershipMasterStructureData });
        } else {
          newPartnershipMasterStructureData.structure_data = resData.data.data;
          setNewPartnershipMasterStructureData({ ...newPartnershipMasterStructureData });
        }
        console.log('partnershipMasterStructureData', partnershipMasterStructureData);
      });
  };

  const getBankList = () => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("action", "view_bank_details");
    axios
      .post(Url + "/ajaxfiles/update_user_profile.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setAllBank(res.data.data);
      });
  };

  const getwalletBalance = () => {
    if (transactionForm.account == "Wallet") {
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      param.append("action", "view_balance");
      axios
        .post(Url + "/ajaxfiles/internal_transfer.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setWalletBal(res.data.formated_balance);
        });
    }
  };

  const getMtBalance = () => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("from_mt5_account_id", transactionForm.from_mt5_account_id);
    param.append("action", "view_mt5_balance");
    axios.post(Url + "/ajaxfiles/internal_transfer.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      setMtBalance(res.data.formated_balance);
    });
  };

  const getMt5LivePackages = () => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    axios
      .post(Url + "/ajaxfiles/get_mt5_live_packages.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setCreateLiveType(res.data.data);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("newValue", newValue);
    if (newValue == 7) {
      setReferralData({
        data: [],
        structure_name: "",
        structure_id: "",
      });
      setPartnershipMasterStructureData({
        structure_name: "",
        structure_data: [],
        structure_id: "",
        isLoader: false,
      });
      getMasterStructureList();
    }
    if (newValue == 8) {
      setPartnershipMasterStructureData({
        structure_name: "",
        structure_data: [],
        structure_id: "",
        isLoader: false,
      });
      getMasterStructureList();
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const openDialogbox = (e, row) => {
    console.log(row, e.target.classList);
    console.log(e.target.getAttribute("class"));
    console.log(e.target.classList.contains("createMt5"));
    console.log(e.target.classList.contains("edit_structure"));
    if (e.target.classList.contains("createMt5")) {
      setDialogTitle("Create MT5 Account");
      setCreateMt5Form({
        account_type: "",
        account_option: "",
        isLoader: false,
      });
    } else if (e.target.classList.contains("mt5_access")) {
      setDialogTitle("MT5 Access");
      setMt5AccessForm({
        account_type: "",
        status: "",
        isLoader: false,
      });
    } else if (e.target.classList.contains("link_mt5")) {
      setDialogTitle("Link Existing Account");
      setLinkAccountForm({
        account_number: "",
        account_type: "",
        account_option: "",
        password: "",
        confirm_password: "",
        isLoader: false,
      });
    } else if (e.target.classList.contains("reset_mt5")) {
      setDialogTitle("Reset MT5 Password");
      setResetMt5PasswordForm({
        mt5_id: "",
        isLoader: false,
      });
    } else if (e.target.classList.contains("change_leverage")) {
      setDialogTitle("Change Account leverage");
      setChangeLeverageForm({
        account: "",
        leverage: "",
        isLoader: false,
      });
    } else if (e.target.classList.contains("add_master_structure")) {
      setDialogTitle("Add Master Structure");
      newMasterStructureData.structure_name = "";
      newMasterStructureData.structure_data = [];
      newMasterStructureData.structure_id = "";
      newMasterStructureData.isLoader = false;
      setNewMasterStructureData({ ...newMasterStructureData });
      getMasterStructure();
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
    } else if (e.target.classList.contains("edit_master_structure")) {
      setDialogTitle("Edit Master Structure");
      newMasterStructureData.structure_name = "";
      newMasterStructureData.structure_data = [];
      newMasterStructureData.structure_id = "";
      newMasterStructureData.isLoader = false;
      setNewMasterStructureData({ ...newMasterStructureData });
      getMasterStructureList();
      setMasterStructureData([])
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
        list: []
      });
      getLinkClientList();
    } else if (e.target.classList.contains("link_ib")) {
      setDialogTitle("Link To IB");
      setLinkIBForm({
        master_account: "",
        customer_name: "",
        structure: "",
        list: []
      });
      getIBUserList();
    } else if (e.target.classList.contains("unlink_ib")) {
      // setDialogTitle("Unlink IB");
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Are you sure?</h1>
              <p>Do you want to unlink IB?</p>
              <div className='confirmation-alert-action-button'>
                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                <Button variant="contained" className='btn-gradient btn-danger'
                  onClick={() => {
                    unlinkIB();
                    onClose();
                  }}
                >
                  Yes, Unlink IB!
                </Button>
              </div>
            </div>
          );
        }
      });
    } else if (e.target.classList.contains("send_email")) {
      setDialogTitle("Send Email");
      setsendMailForm({
        from: "",
        to: profileForm.email,
        subject: "",
        template_title: "",
        language: "",
        template: "",
        body: "",
        isLoader: false,
      });
    } else if (e.target.classList.contains("cp_access")) {
      setDialogTitle("Control Panel Access");
      setCpAccessForm({
        status: "",
      });
      getCpAccessSetting();
    } else if (e.target.classList.contains("view_cp_password")) {
      setDialogTitle("View Control Panel Access Password");
      viewCPPassword();
    } else if (e.target.classList.contains("download_application")) {
      setDialogTitle("Download Client PDF");
    } else if (e.target.classList.contains("add_note")) {
      setDialogTitle("Add New Note");
      setNoteForm({
        notes: "",
        call_status: "",
        set_reminder: false,
        date: "",
        isLoader: false,
      });
    } else if (e.target.classList.contains("add_bank")) {
      console.log("row", row);
      if (row) {
        setDialogTitle("Edit Account");
        setBankAccountForm({
          ...bankAccountForm,
          name: row.bank_name,
          bank_name: row.bank_account_holder_name,
          iban_number: row.bank_ifsc,
          account_number: row.bank_account_number,
          user_bank_id: row.user_bank_id,
        });
      } else {
        setDialogTitle("Add Account");

        setBankAccountForm({
          name: "",
          bank_name: "",
          iban_number: "",
          account_number: "",
        });
      }
    } else if (e.target.classList.contains("add_transaction")) {
      setDialogTitle("Add New Transaction");
      getwalletBalance();
      getBankList();
      setTransactionForm({
        type: "",
        payment_method: "",
        from_account_type: "",
        credit_type: "",
        transfer_to: "",
        account: "",
        account_to: "",
        payment: "",
        amount: "",
        mt5_id: "",
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
      setDialogTitle("EDIT STRUCTURE");
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
        mt5_id: "",
        new_password: "",
        confirm_password: "",
        password_type: "",
        isLoader: "",
      });
    }
    if (!e.target.classList.contains("unlink_ib")) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log("masterStructureData", masterStructureData);
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
                <MenuItem value="1">Live</MenuItem>
                <MenuItem value="0">Demo</MenuItem>
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
                {createMt5Form.account_type == "1" ? (
                  createLiveType.map((item) => {
                    return (
                      <MenuItem value={item.ib_group_level_id}>
                        {item.ib_group_name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value="1">DEMO</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          {createMt5Form.account_type == "0" ? (
            <div className="padingtopmy5create">
              <TextField
                className="input-font-small"
                label="MT5 Balance"
                type="number"
                variant="standard"
                sx={{ width: "100%" }}
                name="mt5_balance"
                onChange={input}
              />
            </div>
          ) : (
            ""
          )}
          <div className="padingtopmy5create">
            <TextField
              className="input-font-small hint-color-red"
              type="password"
              label="Password"
              variant="standard"
              onChange={input}
              sx={{ width: "100%" }}
              name="password"
              helperText="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
            />
          </div>
          <div className="padingtopmy5create">
            <TextField
              className="input-font-small"
              type="password"
              label="Confirm Password"
              variant="standard"
              onChange={input}
              sx={{ width: "100%" }}
              name="confirm_password"
            />
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
                {mt5AccountList.map((item) => {
                  return (
                    <MenuItem value={item.mt5_acc_no}>
                      {item.mt5_acc_no}
                    </MenuItem>
                  );
                })}
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
                value={Mt5AccessForm.status}
              >
                <MenuItem value="1">Activate</MenuItem>
                <MenuItem value="0">Deactivate</MenuItem>
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
                <MenuItem value="1">Live</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Account Option</InputLabel>
              <Select
                label
                className="select-font-small"
                name="account_option"
                onChange={input2}
              >
                {createLiveType.map((item) => {
                  return (
                    <MenuItem value={item.ib_group_level_id}>
                      {item.ib_group_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="padingtopmy5create">
            <TextField
              className="input-font-small"
              type="password"
              label="Password"
              variant="standard"
              onChange={input2}
              sx={{ width: "100%" }}
              name="password"
            />
          </div>
          <div className="padingtopmy5create">
            <TextField
              className="input-font-small"
              type="password"
              label="Confirm Password"
              variant="standard"
              onChange={input2}
              sx={{ width: "100%" }}
              name="confirm_password"
            />
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
                name="mt5_id"
                onChange={input3}
              >
                {mt5AccountList.map((item) => {
                  return (
                    <MenuItem value={item.mt5_acc_no}>
                      {item.mt5_acc_no}
                    </MenuItem>
                  );
                })}
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
                {mt5AccountList.map((item) => {
                  return (
                    <MenuItem value={item.mt5_acc_no}>
                      {item.mt5_acc_no}
                    </MenuItem>
                  );
                })}
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
                {leverageForm.map((item) => {
                  return (
                    <MenuItem value={item.leverage_value}>
                      {item.leverage_data}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Add Master Structure") {
      return (
        <div className="master-structure-section">
          <div className="structureNameSection view-ib-content-section">
            <input
              type="text"
              className=""
              placeholder="Structure Name"
              name="name"
              value={newMasterStructureData.structure_name}
              onChange={(e) => {
                newMasterStructureData.structure_name = e.target.value;
                setNewMasterStructureData({ ...newMasterStructureData });
                // setStructureList((preValue) => {
                //   return {
                //     ...preValue,
                //     structure_name: e.target.value,
                //   };
                // });
              }}
            />
          </div>
          <div className="main-content-input">
            <div className="ib-structure view-commission-content-section">
              {
                newMasterStructureData.structure_data.map((item, index) => {
                  return (
                    <div className="group-structure-section">
                      <div className="main-section">
                        <div className='main-section-title'>{item.ib_group_name}</div>
                        <div className='main-section-input-element'>
                          <div>
                            {/* <span>Rebate</span> */}
                            <input type='number' className="Rebate_amount" placeholder="Rebate" value={item.group_rebate}
                              onChange={(e) => {
                                newMasterStructureData.structure_data[index]['group_rebate'] = e.target.value;
                                newMasterStructureData.structure_data[index]['pair_data'].forEach((value, valueIndex) => {
                                  newMasterStructureData.structure_data[index]['pair_data'][valueIndex]['rebate'] = e.target.value;
                                });
                                setNewMasterStructureData({
                                  ...newMasterStructureData
                                });
                              }} />
                          </div>
                          <div>
                            {/* <span>Commission</span> */}
                            <input type='number' className="commission_amount" placeholder="Commission" value={item.group_commission}
                              onChange={(e) => {
                                newMasterStructureData.structure_data[index]['group_commission'] = e.target.value;
                                newMasterStructureData.structure_data[index]['pair_data'].forEach((value, valueIndex) => {
                                  newMasterStructureData.structure_data[index]['pair_data'][valueIndex]['commission'] = e.target.value;
                                });
                                setNewMasterStructureData({
                                  ...newMasterStructureData
                                });
                              }}
                            />
                          </div>
                          {/* <div>
                            {
                              (item.ibGroup != undefined) ?
                                <FormControl variant="standard">
                                  <Select
                                    label
                                    className="select-font-small"
                                    value={item.ib_group_level_id}
                                    name="title"
                                    onChange={(e) => {
                                      newMasterStructureData.structure_data[index]['ib_group_level_id'] = e.target.value;
                                      setNewMasterStructureData({
                                        ...newMasterStructureData
                                      });
                                      console.log('newMasterStructureData', newMasterStructureData);
                                    }}
                                  >
                                    <MenuItem value={0}>Select IB Group</MenuItem>
                                    {
                                      item.ibGroup.map((item1, index1) => {
                                        return (
                                          <MenuItem disabled={item1.isDisable} value={item1.ib_group_level_id}>{item1.ib_group_name}</MenuItem>
                                        );
                                      })
                                    }
                                  </Select>
                                </FormControl> : ''
                            }
                          </div> */}
                        </div>
                        <div className='action-section'>
                          <span onClick={(e) => { newMasterStructureData.structure_data[index]['is_visible'] = !item.is_visible; setUpdateDate({ ...newMasterStructureData }) }}><i class={`fa ${item.is_visible ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i></span>
                        </div>
                      </div>
                      <div className={`pair-section ${(item.is_visible) ? 'child-section-visible' : ''}`}>
                        {
                          item.pair_data.map((item1, index1) => {
                            return (
                              <div className="pair-data">
                                <div className='pair-data-title'>{item1.pair_name}</div>
                                <div>
                                  <input type='number' className="rebert_amount" placeholder="Rebert" value={item1.rebate}
                                    onChange={(e) => {
                                      newMasterStructureData.structure_data[index]['pair_data'][index1]['rebate'] = e.target.value;
                                      setNewMasterStructureData({
                                        ...newMasterStructureData
                                      });
                                    }}
                                  />
                                </div>
                                <div>
                                  <input type='number' className="commission_amount" placeholder="Commission" value={item1.commission}
                                    onChange={(e) => {
                                      newMasterStructureData.structure_data[index]['pair_data'][index1]['commission'] = e.target.value;
                                      setNewMasterStructureData({
                                        ...newMasterStructureData
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          {/* {forinloop()} */}

        </div>
      );
    } else if (dialogTitle == "Edit Master Structure") {
      return (
        <div className="master-structure-section">
          <div className="structureNameSection view-ib-content-section">
            {/* <input
                  type="text"
                  className=""
                  placeholder="Structure Name"
                  name="name"
                  onChange={(e) => {
                    setStructureList((preValue) => {
                      return {
                        ...preValue,
                        structure_name: e.target.value,
                      };
                    });
                  }}
                /> */}
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Structure</InputLabel>
              <Select
                label
                className="select-font-small"
                name="Structure"
                onChange={(e) => {
                  console.log(
                    "svalue",
                    structureList.data.filter(
                      (x) => x.structure_id == e.target.value
                    )[0].structure_name
                  );
                  getMasterStructure(e.target.value);
                  newMasterStructureData.structure_id = e.target.value;
                  newMasterStructureData.structure_name = structureList.data.filter((x) => x.structure_id == e.target.value)[0].structure_name;
                  setStructureList((prevalue) => {
                    return {
                      ...prevalue,
                      structure_name: structureList.data.filter(
                        (x) => x.structure_id == e.target.value
                      )[0].structure_name,
                      structure_id: e.target.value,
                    };
                  });
                }}
              >
                {structureList.data.map((item) => {
                  return (
                    <MenuItem value={item.structure_id}>
                      {item.structure_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="main-content-input">
            <div className="ib-structure view-commission-content-section">
              {
                newMasterStructureData.structure_data.map((item, index) => {
                  return (
                    <div className="group-structure-section">
                      <div className="main-section">
                        <div className='main-section-title'>{item.ib_group_name}</div>
                        <div className='main-section-input-element'>
                          <div>
                            {/* <span>Rebate</span> */}
                            <input type='number' className="Rebate_amount" placeholder="Rebate" value={item.group_rebate}
                              onChange={(e) => {
                                newMasterStructureData.structure_data[index]['group_rebate'] = e.target.value;
                                newMasterStructureData.structure_data[index]['pair_data'].forEach((value, valueIndex) => {
                                  newMasterStructureData.structure_data[index]['pair_data'][valueIndex]['rebate'] = e.target.value;
                                });
                                setNewMasterStructureData({
                                  ...newMasterStructureData
                                });
                              }} />
                          </div>
                          <div>
                            {/* <span>Commission</span> */}
                            <input type='number' className="commission_amount" placeholder="Commission" value={item.group_commission}
                              onChange={(e) => {
                                newMasterStructureData.structure_data[index]['group_commission'] = e.target.value;
                                newMasterStructureData.structure_data[index]['pair_data'].forEach((value, valueIndex) => {
                                  newMasterStructureData.structure_data[index]['pair_data'][valueIndex]['commission'] = e.target.value;
                                });
                                setNewMasterStructureData({
                                  ...newMasterStructureData
                                });
                              }}
                            />
                          </div>
                          {/* <div>
                            {
                              (item.ibGroup != undefined) ?
                                <FormControl variant="standard">
                                  <Select
                                    label
                                    className="select-font-small"
                                    value={item.ib_group_level_id}
                                    name="title"
                                    onChange={(e) => {
                                      newMasterStructureData.structure_data[index]['ib_group_level_id'] = e.target.value;
                                      setNewMasterStructureData({
                                        ...newMasterStructureData
                                      });
                                      console.log('newMasterStructureData', newMasterStructureData);
                                    }}
                                  >
                                    <MenuItem value={0}>Select IB Group</MenuItem>
                                    {
                                      item.ibGroup.map((item1, index1) => {
                                        return (
                                          <MenuItem disabled={item1.isDisable} value={item1.ib_group_level_id}>{item1.ib_group_name}</MenuItem>
                                        );
                                      })
                                    }
                                  </Select>
                                </FormControl> : ''
                            }
                          </div> */}
                        </div>
                        <div className='action-section'>
                          <span onClick={(e) => { newMasterStructureData.structure_data[index]['is_visible'] = !item.is_visible; setUpdateDate({ ...newMasterStructureData }) }}><i class={`fa ${item.is_visible ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i></span>
                        </div>
                      </div>
                      <div className={`pair-section ${(item.is_visible) ? 'child-section-visible' : ''}`}>
                        {
                          item.pair_data.map((item1, index1) => {
                            return (
                              <div className="pair-data">
                                <div className='pair-data-title'>{item1.pair_name}</div>
                                <div>
                                  <input type='number' className="rebert_amount" placeholder="Rebert" value={item1.rebate}
                                    onChange={(e) => {
                                      newMasterStructureData.structure_data[index]['pair_data'][index1]['rebate'] = e.target.value;
                                      setNewMasterStructureData({
                                        ...newMasterStructureData
                                      });
                                    }}
                                  />
                                </div>
                                <div>
                                  <input type='number' className="commission_amount" placeholder="Commission" value={item1.commission}
                                    onChange={(e) => {
                                      newMasterStructureData.structure_data[index]['pair_data'][index1]['commission'] = e.target.value;
                                      setNewMasterStructureData({
                                        ...newMasterStructureData
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          {/* {masterStructureData.map((item, index) => {
            return (
              <div className="structureInputSection">
                <hr className="solid" />
                <br />
                <Grid container>
                  <Grid item md={4} lg={4} xl={4} className="label-center">
                    <label>{item.ib_group_name}</label>
                  </Grid>
                  <Grid item md={8} lg={8} xl={8}>
                    <Grid container spacing={1}>
                      {item.pair_data.map((item1, index1) => {
                        return (
                          <>
                            <Grid item md={4} lg={4} xl={4}>
                              <label>{item1.pair_name}</label>
                            </Grid>
                            <Grid item md={4} lg={4} xl={4}>
                              <input
                                value={item1.rebate}
                                type="text"
                                className=""
                                placeholder="Rebate"
                                onChange={(e) => {
                                  masterStructureData[index]["pair_data"][
                                    index1
                                  ]["rebate"] = e.target.value;
                                  setMasterStructureData([
                                    ...masterStructureData,
                                  ]);
                                }}
                              />
                            </Grid>
                            <Grid item md={4} lg={4} xl={4}>
                              <input
                                value={item1.commission}
                                type="text"
                                className=""
                                placeholder="Commission"
                                onChange={(e) => {
                                  masterStructureData[index]["pair_data"][
                                    index1
                                  ]["commission"] = e.target.value;
                                  setMasterStructureData([
                                    ...masterStructureData,
                                  ]);
                                }}
                              />
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            );
          })} */}
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
                {
                  linkClientForm.list?.map((item) => {
                    return (
                      <MenuItem value={item.client_id}>{item.client_name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </div>
          {/* <br />
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
          </div> */}
        </div>
      );
    } else if (dialogTitle == "Link To IB") {
      return (
        <div>
          {/* <div className="margeField">
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
          <br /> */}
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>IB User</InputLabel>
              <Select
                label
                className="select-font-small"
                name="customer_name"
                onChange={linkIBInput}
              >
                {/* <MenuItem value="test">Test</MenuItem> */}
                {
                  linkIBForm.list?.map((item) => {
                    return (
                      <MenuItem value={item.sponser_id}>{item.sponser_name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "Unlink IB") {
    } else if (dialogTitle == "Send Email") {
      return (
        <div>
          {/* <div>
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
          <br /> */}
          <div>
            <TextField
              className="input-font-small"
              label="To"
              type="email"
              variant="standard"
              sx={{ width: "100%" }}
              name="to"
              value={sendMailForm.to}
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
                value={cpAccessForm.status}
                onChange={input7}
              >
                <MenuItem value="0">Active</MenuItem>
                <MenuItem value="1">Blocked</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      );
    } else if (dialogTitle == "View Control Panel Access Password") {
      return <div>
        <div className="element-section">
          <label>CP Password :</label>
          <span>{viewCpPassword.cp_password}</span>
        </div>
      </div>;
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
          {/* <div>
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
          <br /> */}
          {/* <div>
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
          )} */}
        </div>
      );
    } else if (dialogTitle == "Add Account" || dialogTitle == "Edit Account") {
      return (
        <div>
          <div>
            <TextField
              value={bankAccountForm.name}
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
              value={bankAccountForm.bank_name}
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
              value={bankAccountForm.iban_number}
              className="input-font-small"
              label="IBAN/IFSC CODE"
              variant="standard"
              sx={{ width: "100%" }}
              name="iban_number"
              onChange={bankInput}
            />
          </div>
          <br />
          <div>
            <TextField
              value={bankAccountForm.account_number}
              className="input-font-small"
              label="Account Number"
              type="number"
              variant="standard"
              sx={{ width: "100%" }}
              name="account_number"
              onChange={bankInput}
            />
          </div>
          <br />
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
                  <MenuItem value="mt5">MT5</MenuItem>
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
            {transactionForm.deposit_to == "mt5" ? (
              <div>
                <br />
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>MT5 Account</InputLabel>
                  <Select
                    label
                    className="select-font-small"
                    name="mt5_id"
                    onChange={transactionInput}
                  >
                    {mt5AccountList.map((item) => {
                      return (
                        <MenuItem value={item.mt5_acc_no}>
                          {item.mt5_acc_no}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <br />
              </div>
            ) : (
              ""
            )}
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
                type="number"
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
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel>TRANSACTION GATEWAYS </InputLabel>
                <Select
                  label
                  className="select-font-small"
                  name="payment_method"
                  onChange={transactionInput}
                >
                  <MenuItem value="Bank">BANK</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Crypto">Crypto</MenuItem>
                </Select>
              </FormControl>
            </div>
            {transactionForm.payment_method == "UPI" ? (
              <>
                <br />
                <div>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel>Upi type</InputLabel>
                    <Select
                      label
                      className="select-font-small"
                      name="upi_name"
                      onChange={transactionInput}
                    >
                      <MenuItem value="Google Pay">Google Pay</MenuItem>
                      <MenuItem value="Phone Pay">Phone Pay</MenuItem>
                      <MenuItem value="Paytem">Paytem</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  {transactionForm.upi_name ? (
                    <>
                      <br />
                      <TextField
                        className="input-font-small"
                        label={transactionForm.upi_name}
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="upi_crypto_ac_number"
                        onChange={transactionInput}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            {transactionForm.payment_method == "Crypto" ? (
              <>
                <br />
                <div>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel> Crypto type</InputLabel>
                    <Select
                      label
                      className="select-font-small"
                      name="crypto_name"
                      onChange={transactionInput}
                    >
                      <MenuItem value="BTC">Bitcoin</MenuItem>
                      <MenuItem value="ETH">Ethereum</MenuItem>
                      <MenuItem value="USDT">USDT</MenuItem>
                      <MenuItem value="LIT">Litecoin</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  {transactionForm.crypto_name ? (
                    <>
                      <br />
                      <TextField
                        className="input-font-small"
                        label={transactionForm.crypto_name}
                        variant="standard"
                        sx={{ width: "100%" }}
                        name="upi_crypto_ac_number"
                        onChange={transactionInput}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            {transactionForm.payment_method == "Bank" ? (
              <>
                <br />
                <div>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel>BANK ACCOUNT</InputLabel>
                    <Select
                      label
                      className="select-font-small"
                      name="user_bank_id"
                      onChange={transactionInput}
                    >
                      {allBank.map((item) => {
                        return (
                          <MenuItem value={item.user_bank_id}>
                            {item.bank_account_holder_name} {"("}
                            {item.bank_account_number}
                            {")"}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </>
            ) : (
              ""
            )}
            <br />
            <div className="margeField">
              <TextField
                id="standard-textarea"
                label="Amount"
                multiline
                variant="standard"
                sx={{ width: "100%" }}
                name="amount"
                onChange={transactionInput}
              />
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
              {/* <FormControl variant="standard" sx={{ width: "100%" }} focused>
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
              </FormControl> */}
              {/* <FormControl variant="standard" sx={{ width: "100%" }}>
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
              </FormControl> */}
            </div>

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
              {transactionForm.account == "Wallet" ? (
                <>
                  <TextField
                    className="disabled-input-wallet-code"
                    label="Wallet Balance"
                    variant="standard"
                    sx={{ width: "100%" }}
                    name="Balance"
                    value={walletBal}
                    disabled
                    focused
                  />
                </>
              ) : transactionForm.account == "MT5" ? (
                <>
                  {" "}
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel>From MT5 Account ID</InputLabel>
                    <Select
                      label
                      className="select-font-small"
                      name="from_mt5_account_id"
                      onChange={transactionInput}
                    >
                      {mt5AccountList.map((item) => {
                        return (
                          <MenuItem value={item.mt5_acc_no}>
                            {item.mt5_acc_no}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </>
              ) : (
                ""
              )}
              {transactionForm.account_to == "MT5" ? (
                <FormControl variant="standard" sx={{ width: "100%" }}>
                  <InputLabel>MT5 Account ID</InputLabel>
                  <Select
                    label
                    className="select-font-small"
                    name="mt5_account_id"
                    onChange={transactionInput}
                  >
                    {mt5AccountList.map((item) => {
                      return (
                        <MenuItem value={item.mt5_acc_no}>
                          {item.mt5_acc_no}
                        </MenuItem>
                      );
                    })}
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
              {transactionForm.from_mt5_account_id &&
                transactionForm.account == "MT5" ? (
                <>
                  {" "}
                  <TextField
                    className="disabled-input-wallet-code"
                    label="MT5 Balance"
                    variant="standard"
                    sx={{ width: "100%" }}
                    name="MT5 Balance"
                    onChange={transactionInput}
                    value={mtBalance}
                    disabled
                    focused
                  />
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              <TextField
                className="input-font-small"
                label="Amount"
                variant="standard"
                sx={{ width: "100%" }}
                name="amount"
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
                  <MenuItem value="credit">Credit In</MenuItem>
                  <MenuItem value="debit">Credit Out</MenuItem>
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
                  {mt5AccountList.map((item) => {
                    return (
                      <MenuItem value={item.mt5_acc_no}>
                        {item.mt5_acc_no}
                      </MenuItem>
                    );
                  })}
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
    } else if (dialogTitle == "EDIT STRUCTURE") {
      return (
        <div className="master-structure-section">
          <div className="structureNameSection view-ib-content-section">
            <input
              type="text"
              className=""
              placeholder="Structure Name"
              name="name"
              value={partnershipMasterStructureData.structure_name}
              onChange={(e) => {
                partnershipMasterStructureData.structure_name = e.target.value;
                setPartnershipMasterStructureData({ ...partnershipMasterStructureData });
                // setStructureList((preValue) => {
                //   return {
                //     ...preValue,
                //     structure_name: e.target.value,
                //   };
                // });
              }}
            />
          </div>
          <div className="main-content-input">
            <div className="ib-structure view-commission-content-section">
              {
                partnershipMasterStructureData.structure_data.map((item, index) => {
                  return (
                    <div className="group-structure-section">
                      <div className="main-section">
                        <div className='main-section-title'>{item.ib_group_name}</div>
                        <div className='main-section-input-element'>
                          <div>
                            {/* <span>Rebate</span> */}
                            <input type='number' className="Rebate_amount" placeholder="Rebate" value={item.group_rebate}
                              onChange={(e) => {
                                partnershipMasterStructureData.structure_data[index]['group_rebate'] = e.target.value;
                                partnershipMasterStructureData.structure_data[index]['pair_data'].forEach((value, valueIndex) => {
                                  partnershipMasterStructureData.structure_data[index]['pair_data'][valueIndex]['rebate'] = e.target.value;
                                });
                                setPartnershipMasterStructureData({
                                  ...partnershipMasterStructureData
                                });
                              }} />
                          </div>
                          <div>
                            {/* <span>Commission</span> */}
                            <input type='number' className="commission_amount" placeholder="Commission" value={item.group_commission}
                              onChange={(e) => {
                                partnershipMasterStructureData.structure_data[index]['group_commission'] = e.target.value;
                                partnershipMasterStructureData.structure_data[index]['pair_data'].forEach((value, valueIndex) => {
                                  partnershipMasterStructureData.structure_data[index]['pair_data'][valueIndex]['commission'] = e.target.value;
                                });
                                setPartnershipMasterStructureData({
                                  ...partnershipMasterStructureData
                                });
                              }}
                            />
                          </div>
                          {/* <div>
                            {
                              (item.ibGroup != undefined) ?
                                <FormControl variant="standard">
                                  <Select
                                    label
                                    className="select-font-small"
                                    value={item.ib_group_level_id}
                                    name="title"
                                    onChange={(e) => {
                                      partnershipMasterStructureData.structure_data[index]['ib_group_level_id'] = e.target.value;
                                      setPartnershipMasterStructureData({
                                        ...partnershipMasterStructureData
                                      });
                                      console.log('partnershipMasterStructureData', partnershipMasterStructureData);
                                    }}
                                  >
                                    <MenuItem value={0}>Select IB Group</MenuItem>
                                    {
                                      item.ibGroup.map((item1, index1) => {
                                        return (
                                          <MenuItem disabled={item1.isDisable} value={item1.ib_group_level_id}>{item1.ib_group_name}</MenuItem>
                                        );
                                      })
                                    }
                                  </Select>
                                </FormControl> : ''
                            }
                          </div> */}
                        </div>
                        <div className='action-section'>
                          <span onClick={(e) => { partnershipMasterStructureData.structure_data[index]['is_visible'] = !item.is_visible; setPartnershipMasterStructureData({ ...partnershipMasterStructureData }) }}><i class={`fa ${item.is_visible ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i></span>
                        </div>
                      </div>
                      <div className={`pair-section ${(item.is_visible) ? 'child-section-visible' : ''}`}>
                        {
                          item.pair_data.map((item1, index1) => {
                            return (
                              <div className="pair-data">
                                <div className='pair-data-title'>{item1.pair_name}</div>
                                <div>
                                  <input type='number' className="rebert_amount" placeholder="Rebert" value={item1.rebate}
                                    onChange={(e) => {
                                      partnershipMasterStructureData.structure_data[index]['pair_data'][index1]['rebate'] = e.target.value;
                                      setPartnershipMasterStructureData({
                                        ...partnershipMasterStructureData
                                      });
                                    }}
                                  />
                                </div>
                                <div>
                                  <input type='number' className="commission_amount" placeholder="Commission" value={item1.commission}
                                    onChange={(e) => {
                                      partnershipMasterStructureData.structure_data[index]['pair_data'][index1]['commission'] = e.target.value;
                                      setPartnershipMasterStructureData({
                                        ...partnershipMasterStructureData
                                      });
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
          {/* {masterStructureData.map((item, index) => {
            return (
              <div className="structureInputSection">
                <hr className="solid" />
                <br />
                <Grid container>
                  <Grid item md={4} lg={4} xl={4} className="label-center">
                    <label>{item.ib_group_name}</label>
                  </Grid>
                  <Grid item md={8} lg={8} xl={8}>
                    <Grid container spacing={1}>
                      {item.pair_data.map((item1, index1) => {
                        return (
                          <>
                            <Grid item md={4} lg={4} xl={4}>
                              <label>{item1.pair_name}</label>
                            </Grid>
                            <Grid item md={4} lg={4} xl={4}>
                              <input
                                value={item1.rebate}
                                type="text"
                                className=""
                                placeholder="Rebate"
                                onChange={(e) => {
                                  masterStructureData[index]["pair_data"][
                                    index1
                                  ]["rebate"] = e.target.value;
                                  setMasterStructureData([
                                    ...masterStructureData,
                                  ]);
                                }}
                              />
                            </Grid>
                            <Grid item md={4} lg={4} xl={4}>
                              <input
                                value={item1.commission}
                                type="text"
                                className=""
                                placeholder="Commission"
                                onChange={(e) => {
                                  masterStructureData[index]["pair_data"][
                                    index1
                                  ]["commission"] = e.target.value;
                                  setMasterStructureData([
                                    ...masterStructureData,
                                  ]);
                                }}
                              />
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            );
          })} */}
          {/* <div>
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
        </div> */}
        </div>

      );
    } else if (dialogTitle == "Change Password") {
      return (
        <div>
          <div>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>MT5 Account</InputLabel>
              <Select
                label
                className="select-font-small"
                name="mt5_id"
                onChange={input5}
              >
                {mt5AccountList.map((item) => {
                  return (
                    <MenuItem value={item.mt5_acc_no}>
                      {item.mt5_acc_no}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="padingtopmy5create">
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel>Password Type</InputLabel>
              <Select
                label
                className="select-font-small"
                name="password_type"
                onChange={input5}
              >
                <MenuItem value="main">Main Password</MenuItem>
                <MenuItem value="investor">View Password</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="padingtopmy5create">
            <TextField
              className="input-font-small"
              label="Password"
              type="password"
              variant="standard"
              sx={{ width: "100%" }}
              name="new_password"
              onChange={input5}
            />
          </div>
          <div className="padingtopmy5create">
            <TextField
              className="input-font-small"
              type="password"
              label="Confirm Password"
              variant="standard"
              sx={{ width: "100%" }}
              name="confirm_password"
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
          {createMt5Form.isLoader ? (
            <Button
              tabindex="0"
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
              className="btn-success"
              onClick={createMt5AccountSubmit}
            >
              Create
            </Button>
          )}
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

          {Mt5AccessForm.isLoader ? (
            <Button
              tabindex="0"
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
              className="btn-gradient btn-success"
              onClick={Mt5AccountAccessSubmit}
            >
              Update
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "Link Existing Account") {
      return (
        <div>
          {linkAccountForm.isLoader ? (
            <Button
              tabindex="0"
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
              className="btn-success"
              onClick={linkAccountSubmit}
            >
              Link
            </Button>
          )}
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

          {resetMt5PasswordForm.isLoader ? (
            <Button
              tabindex="0"
              size="large"
              className=" btn-danger font-color-white createMt5Formloder"
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
              className="btn-danger font-color-white"
              onClick={resetAccountPasswordSubmit}
            >
              Reset
            </Button>
          )}
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

          {changeLeverageForm.isLoader ? (
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
              className="btn-gradient btn-success createMt5Formloder"
              onClick={changeLeverageSubmit}
            >
              Change
            </Button>
          )}
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
    } else if (dialogTitle == "Add Account" || dialogTitle == "Edit Account") {
      return (
        <div className="  ">
          <Button
            variant="contained"
            className="cancelButton"
            onClick={handleClose}
          >
            Cancel
          </Button>

          {bankAccountForm.isLoader ? (
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
              onClick={bankAccountSubmit}
            >
              {dialogTitle}
            </Button>
          )}
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

          {noteForm.isLoader ? (
            <Button
              tabindex="0"
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
              className="btn-gradient btn-success"
              onClick={noteSubmit}
            >
              Add Note
            </Button>
          )}
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
    } else if (dialogTitle == "Edit Master Structure") {
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
            onClick={masterStructureSubmit1}
          >
            Edit Structure
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
          {sendMailForm.isLoader ? (
            <Button
              tabindex="0"
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
              className="btn-gradient btn-success"
              onClick={sendMailSubmit}
            >
              Send
            </Button>
          )}
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
    } else if (dialogTitle == "EDIT STRUCTURE") {
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
            onClick={partnerMasterStructureSubmit}
          >
            Edit Structure
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

          {changeAccountPasswordForm.isLoader ? (
            <Button
              tabindex="0"
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
              className="btn-gradient btn-success"
              onClick={changeAccountPasswordSubmit}
            >
              Submit
            </Button>
          )}
        </div>
      );
    } else if (dialogTitle == "View Control Panel Access Password") {
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
    if (event.target.value == "1") {
      // const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      // axios
      //   .post(Url + "/ajaxfiles/get_mt5_live_packages.php", param)
      //   .then((res) => {
      //     setCreateLiveType(res.data.data);
      //   });
    }
  };

  const createMt5AccountSubmit = () => {
    console.log(createMt5Form);
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);

    if (createMt5Form.account_type == "") {
      toast.error("Please select account type");
    } else if (createMt5Form.account_option == "") {
      toast.error("Please select account option");
    } else if (
      createMt5Form.mt5_balance == "" &&
      createMt5Form.account_type == "0"
    ) {
      toast.error("Please select account option");
    } else if (createMt5Form.password == "") {
      toast.error("Please enter password");
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(createMt5Form.password)) {
      toast.error("Please enter valid password. Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character");
    } else if (createMt5Form.confirm_password == "") {
      toast.error("Please enter confirm password");
    } else if (createMt5Form.confirm_password != createMt5Form.password) {
      toast.error("Confirm password must be the same as password");
    } else {
      if (createMt5Form.account_type == "0") {
        param.append("mt5_balance", createMt5Form.mt5_balance);
      }
      setCreateMt5Form((prevalue) => {
        return { ...prevalue, isLoader: true };
      });
      param.append("user_id", id);
      param.append("password", createMt5Form.password);
      param.append("confirm_password", createMt5Form.confirm_password);
      param.append("ib_group_id", createMt5Form.account_option);
      param.append("account_type", createMt5Form.account_type);
      param.append("action", "create_mt5_account");
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setCreateMt5Form((prevalue) => {
            return { ...prevalue, isLoader: false };
          });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            getAccountList();
            toast.success(res.data.message);
            setOpen(false);
          }
        });
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

    if (name == "account_type") {
      getMt5AccountStatus(value);
    }
  };

  const getMt5AccountStatus = (mt5ID) => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("mt5_id", mt5ID);
    param.append("action", "check_mt5_status");
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
          setMt5AccessForm((prevalue) => {
            return {
              ...prevalue,
              ['status']: res.data.mt5_status,
            };
          });
        }
      });
  }

  const Mt5AccountAccessSubmit = () => {
    console.log(Mt5AccessForm);

    if (Mt5AccessForm.account_type == "") {
      toast.error("Please select account type");
    } else if (Mt5AccessForm.status == "") {
      toast.error("Please select status");
    } else {
      setMt5AccessForm((preValue) => {
        return {
          ...preValue,
          isLoader: true,
        };
      });
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      param.append("mt5_id", Mt5AccessForm.account_type);
      param.append("mt5_access_type", Mt5AccessForm.status);
      param.append("action", "mt5_access");
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setMt5AccessForm((preValue) => {
            return {
              ...preValue,
              isLoader: false,
            };
          });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setOpen(false);
          }
        });
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
    if (linkAccountForm.account_number == "") {
      toast.error("Please enter account number");
    } else if (linkAccountForm.account_type == "") {
      toast.error("Please select account type");
    } else if (linkAccountForm.account_option == "") {
      toast.error("Please select account name");
    } else if (linkAccountForm.password == "") {
      toast.error("Please Enter Password");
    } else if (linkAccountForm.confirm_password == "") {
      toast.error("Please Enter Confirm Password");
    } else if (linkAccountForm.password != linkAccountForm.confirm_password) {
      toast.error("Confirm password must be the same as password");
    } else {
      setLinkAccountForm((preValue) => {
        return {
          ...preValue,
          isLoader: true,
        };
      });
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      param.append("mt5_id", linkAccountForm.account_number);
      param.append("account_type", linkAccountForm.account_type);
      param.append("ib_group_id", linkAccountForm.account_option);
      param.append("confirm_password", linkAccountForm.confirm_password);
      param.append("new_password", linkAccountForm.password);
      param.append("action", "mt5_link");
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setLinkAccountForm((preValue) => {
            return {
              ...preValue,
              isLoader: false,
            };
          });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setOpen(false);
          }
        });
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
    if (resetMt5PasswordForm.mt5_id == "") {
      toast.error("Please select account");
    } else {
      setResetMt5PasswordForm((preValue) => {
        return {
          ...preValue,
          isLoader: true,
        };
      });
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      param.append("mt5_id", resetMt5PasswordForm.mt5_id);

      param.append("action", "mt5_reset");
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setResetMt5PasswordForm((preValue) => {
            return {
              ...preValue,
              isLoader: false,
            };
          });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setOpen(false);
            getAccountList();
          }
        });
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
      setChangeLeverageForm((preValue) => {
        return {
          ...preValue,
          isLoader: true,
        };
      });
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      param.append("action", "change_mt5_leverage");
      param.append("mt5_id", changeLeverageForm.account);
      param.append("new_leverage", changeLeverageForm.leverage);

      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setChangeLeverageForm((preValue) => {
            return {
              ...preValue,
              isLoader: false,
            };
          });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setOpen(false);
          }
        });
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
    if (changeAccountPasswordForm.mt5_id == "") {
      toast.error("Please Select MT5 Account");
    } else if (changeAccountPasswordForm.password_type == "") {
      toast.error("Please Select Password Type");
    } else if (changeAccountPasswordForm.new_password == "") {
      toast.error("Please enter Password");
    } else if (changeAccountPasswordForm.confirm_password == "") {
      toast.error("Please enter Confirm password");
    } else if (
      changeAccountPasswordForm.new_password !==
      changeAccountPasswordForm.confirm_password
    ) {
      toast.error("Confirm password must be the same as password");
    } else {
      setChangeAccountPasswordForm((preValue) => {
        return {
          ...preValue,
          isLoader: true,
        };
      });
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      param.append("mt5_id", changeAccountPasswordForm.mt5_id);
      param.append("password_type", changeAccountPasswordForm.password_type);
      param.append("new_password", changeAccountPasswordForm.new_password);
      param.append(
        "confirm_password",
        changeAccountPasswordForm.confirm_password
      );
      param.append("action", "change_mt5_password");
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setChangeAccountPasswordForm((preValue) => {
            return {
              ...preValue,
              isLoader: false,
            };
          });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setOpen(false);
          }
        });
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

  const masterStructureSubmit1 = () => {
    console.log(masterStructureData.length);

    var error = false;
    if (newMasterStructureData.structure_data.length > 0) {
      if (newMasterStructureData.structure_name == "") {
        toast.error("Please enter structure name");
        error = true;
      } else {
        newMasterStructureData.structure_data.forEach(element => {
          console.log(element.ib_group_name, element.group_rebate);
          if (element.group_rebate === "") {
            toast.error(`Please enter ${element.ib_group_name} rebate`);
            error = true;
            return false;
          } else if (element.group_commission === "") {
            toast.error(`Please enter ${element.ib_group_name} commission`);
            error = true;
            return false;
          } else if (element.ib_group_level_id === 0) {
            toast.error(`Please enter ${element.ib_group_name} ib group`);
            error = true;
            return false;
          } else {
            element.pair_data.forEach(element1 => {
              if (element1.rebate === "") {
                toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} rebate`);
                error = true;
                return false;
              } else if (element1.rebate > element.group_rebate) {
                // toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} rebate invalid`);
                toast.error(`Pair Rebate for ${element1.pair_name} can not be greater then ${element.ib_group_name} 1 group rebate`);
                error = true;
                return false;
              } else if (element1.commission === "") {
                toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} commission`);
                error = true;
                return false;
              } else if (element1.commission > element.group_commission) {
                // toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} commission invalid`);
                toast.error(`Pair Commission for ${element1.pair_name} can not be greater then ${element.ib_group_name} 1 group commission`);
                error = true;
                return false;
              }
            });
          }
          if (error) {
            return false;
          }
        });
      }
      if (error) {
        return false;
      }
    }

    console.log("masterStructureDataon function", newMasterStructureData);
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("pair_data", JSON.stringify(newMasterStructureData.structure_data));
    param.append("structure_name", newMasterStructureData.structure_name);
    param.append("structure_id", newMasterStructureData.structure_id);
    param.append("action", "update_strcuture_master");
    axios
      .post(Url + "/ajaxfiles/master_structure_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          handleClose();
        }
      });
  };

  const partnerMasterStructureSubmit = () => {
    console.log(masterStructureData.length);

    var error = false;
    if (partnershipMasterStructureData.structure_data.length > 0) {
      if (partnershipMasterStructureData.structure_name == "") {
        toast.error("Please enter structure name");
        error = true;
      } else {
        partnershipMasterStructureData.structure_data.forEach(element => {
          console.log(element.ib_group_name, element.group_rebate);
          if (element.group_rebate === "") {
            toast.error(`Please enter ${element.ib_group_name} rebate`);
            error = true;
            return false;
          } else if (element.group_commission === "") {
            toast.error(`Please enter ${element.ib_group_name} commission`);
            error = true;
            return false;
          } else if (element.ib_group_level_id === 0) {
            toast.error(`Please enter ${element.ib_group_name} ib group`);
            error = true;
            return false;
          } else {
            element.pair_data.forEach(element1 => {
              if (element1.rebate === "") {
                toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} rebate`);
                error = true;
                return false;
              } else if (element1.rebate > element.group_rebate) {
                // toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} rebate invalid`);
                toast.error(`Pair Rebate for ${element1.pair_name} can not be greater then ${element.ib_group_name} 1 group rebate`);
                error = true;
                return false;
              } else if (element1.commission === "") {
                toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} commission`);
                error = true;
                return false;
              } else if (element1.commission > element.group_commission) {
                // toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} commission invalid`);
                toast.error(`Pair Commission for ${element1.pair_name} can not be greater then ${element.ib_group_name} 1 group commission`);
                error = true;
                return false;
              }
            });
          }
          if (error) {
            return false;
          }
        });
      }
      if (error) {
        return false;
      }
    }

    console.log("masterStructureDataon function", partnershipMasterStructureData);
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("pair_data", JSON.stringify(partnershipMasterStructureData.structure_data));
    param.append("structure_name", partnershipMasterStructureData.structure_name);
    param.append("structure_id", partnershipMasterStructureData.structure_id);
    param.append("action", "update_strcuture_master");
    axios
      .post(Url + "/ajaxfiles/master_structure_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          getPartnershipMasterStructure(partnershipMasterStructureData.structure_id);
          handleClose();
        }
      });
  };

  const masterStructureSubmit = () => {
    console.log(masterStructureData.length);

    var error = false;
    if (newMasterStructureData.structure_data.length > 0) {
      if (newMasterStructureData.structure_name == "") {
        toast.error("Please enter structure name");
        error = true;
      } else {
        newMasterStructureData.structure_data.forEach(element => {
          console.log(element.ib_group_name, element.group_rebate);
          if (element.group_rebate === "") {
            toast.error(`Please enter ${element.ib_group_name} rebate`);
            error = true;
            return false;
          } else if (element.group_commission === "") {
            toast.error(`Please enter ${element.ib_group_name} commission`);
            error = true;
            return false;
          } else if (element.ib_group_level_id === 0) {
            toast.error(`Please enter ${element.ib_group_name} ib group`);
            error = true;
            return false;
          } else {
            element.pair_data.forEach(element1 => {
              if (element1.rebate === "") {
                toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} rebate`);
                error = true;
                return false;
              } else if (element1.rebate > element.group_rebate) {
                // toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} rebate invalid`);
                toast.error(`Pair Rebate for ${element1.pair_name} can not be greater then ${element.ib_group_name} 1 group rebate`);
                error = true;
                return false;
              } else if (element1.commission === "") {
                toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} commission`);
                error = true;
                return false;
              } else if (element1.commission > element.group_commission) {
                // toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} commission invalid`);
                toast.error(`Pair Commission for ${element1.pair_name} can not be greater then ${element.ib_group_name} 1 group commission`);
                error = true;
                return false;
              }
            });
          }
          if (error) {
            return false;
          }
        });
      }
      if (error) {
        return false;
      }
    }

    console.log("masterStructureDataon function", newMasterStructureData);
    console.log("masterStructureDataon function", masterStructureData);
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("pair_data", JSON.stringify(newMasterStructureData.structure_data));
    param.append("structure_name", newMasterStructureData.structure_name);
    param.append("action", "insert_strcuture_master");

    axios
      .post(Url + "/ajaxfiles/master_structure_manage.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          handleClose();
        }
      });
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

  useEffect(() => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
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
  }, []);

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
    } else if (profileForm.sales_agent == "") {
      toast.error("Please select sales agent");
    } else if (profileForm.login_block == "") {
      toast.error("Please select Login Block");
    } else if (profileForm.user_status == "") {
      toast.error("Please select user_status");
    } else {
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("action", "update_basic_information");
      param.append("user_id", id);
      param.append("manager_id", profileForm.sales_agent);
      param.append("user_title", profileForm.title);
      param.append("user_first_name", profileForm.first_name);
      param.append("user_last_name", profileForm.last_name);
      param.append("user_dob", profileForm.dob);
      // param.append("user_email ", profileForm.email);
      param.append("user_phone", profileForm.phone);
      param.append("user_nationality", profileForm.nationality);
      param.append("user_country", profileForm.country_of_residence);
      param.append("user_city", profileForm.city);
      param.append("user_address_1", profileForm.address);
      param.append("user_address_2", profileForm.address_2);
      param.append("user_gender", profileForm.gender);
      param.append("user_postcode", profileForm.postal_code);
      param.append("user_language", profileForm.language);
      param.append("user_source", profileForm.source);
      param.append("us_citizen", profileForm.us_citizen);
      param.append("worked_in_financial", profileForm.finacial_work);
      param.append("tax_identification_number", profileForm.tax_number);
      param.append("politically_exposed", profileForm.politically_exposed);
      param.append("user_status", profileForm.user_status);
      param.append("login_block", profileForm.login_block);
      axios
        .post(`${Url}/ajaxfiles/update_user_profile.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
          }
        });
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
      const param = new FormData();
      // param.append('is_app', 1);
      // param.append('AADMIN_LOGIN_ID', 1);
      param.append('user_id', id);
      param.append('employment_status', employmentDetailsForm.status);
      param.append('inudstry', employmentDetailsForm.industry);
      param.append('action', 'update_employement_status');

      axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      });
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
    console.log(linkClientForm);
    if (linkClientForm.client == "") {
      toast.error("Please select client");
    } else {
      const param = new FormData();
      // param.append('is_app', 1);
      // param.append('AADMIN_LOGIN_ID', 1);
      param.append('user_id', id);
      param.append('client_id', linkClientForm.client);
      param.append('action', 'link_client');

      axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setOpen(false);
        }
      });
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
    if (linkIBForm.customer_name == "") {
      toast.error("Please enter master account id");
    } else {
      const param = new FormData();
      // param.append('is_app', 1);
      // param.append('AADMIN_LOGIN_ID', 1);
      param.append('user_id', id);
      param.append('sponsor_id', linkIBForm.customer_name);
      param.append('action', 'link_ib');

      axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setOpen(false);
        }
      });
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
    /* if (sendMailForm.from == "") {
      toast.error("Please select from e-mail address");
    } else  */
    if (sendMailForm.to == "") {
      toast.error("Please enter to e-mail address");
    } else if (sendMailForm.subject == "") {
      toast.error("Please enter subject");
    } else if (sendMailForm.template_title == "") {
      toast.error("Please enter template title");
    } else if (sendMailForm.language == "") {
      toast.error("Please select language");
    } else if (sendMailForm.body == "") {
      toast.error("Please enter body");
    } else {
      setsendMailForm((prevalue) => {
        return {
          ...prevalue,
          isLoader: true,
        };
      });
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      // param.append("mail_from", sendMailForm.from);
      param.append("mail_to", sendMailForm.to);
      param.append("subject", sendMailForm.subject);
      param.append("template_title", sendMailForm.template_title);
      param.append("language", sendMailForm.language);
      param.append("message", sendMailForm.body);
      param.append("action", "send_mail");
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setsendMailForm((prevalue) => {
            return {
              ...prevalue,
              isLoader: false,
            };
          });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setOpen(false);
          }
        });
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
      const param = new FormData();
      // param.append('is_app', 1);
      // param.append('AADMIN_LOGIN_ID', 1);
      param.append('user_id', id);
      param.append('action', "update_cp_access");
      param.append('user_status', cpAccessForm.status);

      axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setOpen(false);
        }
      });
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
      /* } else if (noteForm.call_status == "") {
        toast.error("Please select call status");
      } else if (noteForm.set_reminder == true && noteForm.date == "") {
        toast.error("Please select date"); */
    } else {
      setNoteForm((prevalue) => {
        return {
          ...prevalue,
          isLoader: true,
        };
      });
      const param = new FormData();
      // param.append("is_app", 1);
      // param.append("AADMIN_LOGIN_ID", 1);
      param.append("user_id", id);
      param.append("action", "add_new_notes");
      param.append("notes", noteForm.notes);
      /* param.append("call_status", noteForm.call_status);
      param.append("reminder", noteForm.date); */
      axios
        .post(Url + "/ajaxfiles/update_user_profile.php", param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
          }
          setNoteForm((prevalue) => {
            return {
              ...prevalue,
              isLoader: false,
            };
          });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            setRefresh(!refresh);
            setOpen(false);
          }
        });
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

  const bankAccountSubmit = async (prop) => {
    console.log(bankAccountForm);
    if (prop) {
      if (bankAccountForm.name == "") {
        toast.error("Please enter beneficiary name");
      } else if (bankAccountForm.bank_name == "") {
        toast.error("Please enter beneficiary bank name");
      } else if (bankAccountForm.iban_number == "") {
        toast.error("Please enter IBAN Number");
      } else if (bankAccountForm.account_number == "") {
        toast.error("Please enter account number");
      } else {
        const param = new FormData();
        // param.append("is_app", 1);
        // param.append("AADMIN_LOGIN_ID", 1);
        param.append("user_id", id);
        param.append("bank_name", bankAccountForm.name);
        param.append("bank_ifsc", bankAccountForm.iban_number);
        param.append("bank_account_number", bankAccountForm.account_number);
        param.append("bank_account_name", bankAccountForm.bank_name);
        param.append("user_bank_id", "");

        if (bankAccountForm.user_bank_id) {
          param.append("user_bank_id", bankAccountForm.user_bank_id);
          param.append("action", "update_user_bank");
        } else {
          param.append("action", "add_user_bank");
        }
        setBankAccountForm((preValue) => {
          return {
            ...preValue,
            isLoader: true,
          };
        });
        await axios
          .post(Url + "/ajaxfiles/update_user_profile.php", param)
          .then((res) => {
            if (res.data.message == "Session has been expired") {
              localStorage.setItem("login", true);
              navigate("/");
            }
            setBankAccountForm((preValue) => {
              return {
                ...preValue,
                isLoader: false,
              };
            });
            if (res.data.status == "error") {
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
              setOpen(false);
            }
          });
      }
    } else {
      setBankAccountForm((preValue) => {
        return {
          ...preValue,
          isLoader: true,
        };
      });
      if (bankAccountForm.name == "") {
        toast.error("Please enter beneficiary name");
      } else if (bankAccountForm.bank_name == "") {
        toast.error("Please enter beneficiary bank name");
      } else if (bankAccountForm.iban_number == "") {
        toast.error("Please enter IBAN Number");
      } else if (bankAccountForm.account_number == "") {
        toast.error("Please enter account number");
      } else {
        const param = new FormData();
        // param.append("is_app", 1);
        // param.append("AADMIN_LOGIN_ID", 1);
        param.append("action", "add_user_bank");
        param.append("user_id", id);
        param.append("bank_name", bankAccountForm.name);
        param.append("bank_ifsc", bankAccountForm.iban_number);
        param.append("bank_account_number", bankAccountForm.account_number);
        param.append("bank_account_name", bankAccountForm.bank_name);
        if (bankAccountForm.user_bank_id) {
          param.append("user_bank_id", bankAccountForm.user_bank_id);
        }
        await axios
          .post(Url + "/ajaxfiles/update_user_profile.php", param)
          .then((res) => {
            if (res.data.message == "Session has been expired") {
              localStorage.setItem("login", true);
              navigate("/");
            }
            if (res.data.status == "error") {
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
              setOpen(false);
            }
          });
      }
    }
  };

  const transactionInput = (event) => {
    console.log("transactionForm", transactionForm);
    const { name, value } = event.target;
    if (name == "type") {
      setTransactionForm({
        type: "",
        payment_method: "",
        from_account_type: "",
        mt5_id: "",
        credit_type: "",
        transfer_to: "",
        account: "",
        account_to: "",
        payment: "",
        amount: "",
        mt5_id: "",
        note: "",
        currency_code: "",
        isLoader: false,
        deposit_to: "",
        transation_id: "",
        wallet_code: "",
        mt5_account_id: "",
      });
    }
    if (name == "from_mt5_account_id") {
      getMtBalance();
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
      } else if (
        transactionForm.mt5_id == "" &&
        transactionForm.deposit_to == "mt5"
      ) {
        toast.error("Please select MT5 Account");
      } else if (transactionForm.note == "") {
        toast.error("Please enter note");
      } else {
        const param = new FormData();
        if (transactionForm.deposit_to == "Wallet") {
          param.append("wallet_type", transactionForm.deposit_to);
        } else if (transactionForm.deposit_to == "mt5") {
          param.append("mt5_id", transactionForm.mt5_id);
        }
        transactionForm.isLoader = true;
        setTransactionForm({ ...transactionForm });
        param.append("action", "add_deposit");
        // param.append("is_app", 1);
        // param.append("AADMIN_LOGIN_ID", 1);
        param.append("user_id", id);
        param.append("wallet_type", transactionForm.deposit_to);
        param.append("payment_method", transactionForm.payment);
        param.append("transactionid", transactionForm.transation_id);
        param.append("amount", transactionForm.amount);
        param.append("deposit_remarks", transactionForm.note);
        await axios
          .post(`${Url}/ajaxfiles/update_user_profile.php`, param)
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
      if (transactionForm.payment_method == "") {
        toast.error("Please select payment method");
      } else if (
        transactionForm.payment_method == "Bank" &&
        transactionForm.user_bank_id == ""
      ) {
        toast.error("Please select Bank Account");
      } else if (
        transactionForm.payment_method == "UPI" &&
        transactionForm.upi_name == ""
      ) {
        toast.error("Please select Upi type");
      } else if (
        transactionForm.payment_method == "UPI" &&
        transactionForm.upi_crypto_ac_number == ""
      ) {
        toast.error("Please Enter Upi Id");
      } else if (
        transactionForm.payment_method == "Crypto" &&
        transactionForm.crypto_name == ""
      ) {
        toast.error("Please select Crypto type");
      } else if (
        transactionForm.payment_method == "Crypto" &&
        transactionForm.upi_crypto_ac_number == ""
      ) {
        toast.error("Please Enter Crypto Address");
      } else if (transactionForm.amount == "") {
        toast.error("Please enter amount");
      } else {
        transactionForm.isLoader = true;
        setTransactionForm({ ...transactionForm });
        const param = new FormData();
        param.append("action", "add_withdraw");
        // param.append("is_app", 1);
        // param.append("AADMIN_LOGIN_ID", 1);
        param.append("user_id", id);
        param.append("payment_method", transactionForm.payment_method);
        if (transactionForm.crypto_name) {
          param.append("crypto_name", transactionForm.crypto_name);
        }
        if (transactionForm.upi_crypto_ac_number) {
          param.append(
            "upi_crypto_ac_number ",
            transactionForm.upi_crypto_ac_number
          );
        }
        if (transactionForm.user_bank_id) {
          param.append("user_bank_id ", transactionForm.user_bank_id);
        }
        if (transactionForm.upi_name) {
          param.append("upi_name ", transactionForm.upi_name);
        }
        param.append("amount", transactionForm.amount);
        param.append("action", "add_withdraw");
        await axios
          .post(`${Url}/ajaxfiles/update_user_profile.php`, param)
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
      if (transactionForm.account == "") {
        toast.error("Please select from account");
      } else if (transactionForm.account_to == "") {
        toast.error("Please select to account");
      } else if (
        transactionForm.account_to == "MT5" &&
        transactionForm.mt5_account_id == ""
      ) {
        toast.error("Please select mt5 account id");
      } else if (
        transactionForm.account == "MT5" &&
        !transactionForm.from_mt5_account_id
      ) {
        toast.error("Please select from mt5 account id");
      } else if (
        transactionForm.account_to == "Wallet" &&
        transactionForm.wallet_code == ""
      ) {
        toast.error("Please enter wallet code");
      } else if (transactionForm.amount == "") {
        toast.error("Please enter amount");
      } else {
        transactionForm.isLoader = true;
        setTransactionForm({ ...transactionForm });
        const param = new FormData();
        param.append("action", "add_transfer");
        // param.append("is_app", 1);
        // param.append("AADMIN_LOGIN_ID", 1);
        param.append("user_id", userData.data["user_id"]);
        param.append("from_transfer", transactionForm.account);
        param.append("to_transfer", transactionForm.account_to);
        if (transactionForm.account_to == "MT5") {
          param.append("mt5_account_id", transactionForm.mt5_account_id);
        } else {
          param.append("wallet_id", transactionForm.wallet_code);
          param.append("mt5_account_id", "");
        }
        if (transactionForm.account == "MT5") {
          param.append(
            "from_mt5_account_id",
            transactionForm.from_mt5_account_id
          );
        }
        param.append("amount", transactionForm.amount);
        param.append("from_account_type", transactionForm.from_account_type);
        param.append("transfer_to", transactionForm.transfer_to);

        await axios
          .post(`${Url}/ajaxfiles/internal_transfer.php`, param)
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
        const param = new FormData();
        // param.append("is_app", 1);
        // param.append("AADMIN_LOGIN_ID", 1);
        param.append("user_id", id);
        param.append("action", "add_mt5_bonus");
        param.append("credit_type", transactionForm.credit_type);
        param.append("account", transactionForm.account);
        param.append("amount", transactionForm.amount);
        param.append("note", transactionForm.note);
        axios
          .post(Url + "/ajaxfiles/mt5_credit_debit.php", param)
          .then((res) => {
            if (res.data.message == "Session has been expired") {
              localStorage.setItem("login", true);
              navigate("/");
            }
            if (res.data.status == "error") {
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
              setOpen(false);
            }
          });
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
    if (partnershipMasterStructureData.structure_id == "") {
      toast.error("Please select structure");
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Are you sure?</h1>
              <p>Do you want to delete this?</p>
              <div className='confirmation-alert-action-button'>
                <Button variant="contained" className='cancelButton' onClick={onClose}>No</Button>
                <Button variant="contained" className='btn-gradient btn-danger'
                  onClick={async () => {
                    onClose();
                    const param = new FormData();
                    // param.append("is_app", 1);
                    // param.append("AADMIN_LOGIN_ID", 1);
                    param.append("user_id", id);
                    param.append("action", 'delete_master_structure');
                    param.append("structure_id", partnershipMasterStructureData.structure_id);
                    await axios
                      .post(`${Url}/ajaxfiles/master_structure_manage.php`, param)
                      .then((res) => {
                        if (res.data.message == "Session has been expired") {
                          localStorage.setItem("login", true);
                          navigate("/");
                        }
                        if (res.data.status == "error") {
                          toast.error(res.data.message);
                        } else {
                          toast.success(res.data.message);
                          getMasterStructureList();
                          setPartnershipMasterStructureData({
                            structure_name: "",
                            structure_data: [],
                            structure_id: "",
                            isLoader: false,
                          })
                        }
                      });
                  }}
                >
                  Yes, Delete it!
                </Button>
              </div>
            </div>
          );
        }
      });
      /* toast.success("Structure has been successfully deleted");
      setDeleteStructureForm({
        structure: "",
      }); */
    }
  };

  const getUserDetails = async () => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
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
          console.log("userData",userData);
          setEmploymentDetailsForm({
            status: userData.data['employment_status'],
            industry: userData.data['inudstry'],
          });
        }
      });
  };

  const getProfilePageData = async () => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("action", "get_general_information");
    await axios
      .post(`${Url}/ajaxfiles/update_user_profile.php`, param)
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
          setProfileForm({
            title: res.data.data.user_title,
            first_name: res.data.data.user_first_name,
            last_name: res.data.data.user_last_name,
            phone: res.data.data.user_phone,
            email: res.data.data.user_email,
            dob: res.data.data.user_dob,
            nationality: res.data.data.user_nationality,
            country_of_residence: res.data.data.user_country,
            city: res.data.data.user_city,
            address: res.data.data.user_address_1,
            address_2: res.data.data.user_address_2,
            gender: res.data.data.user_gender,
            postal_code: res.data.data.user_postcode,
            language: res.data.data.user_language,
            source: res.data.data.user_source,
            us_citizen: res.data.data.us_citizen,
            finacial_work: res.data.data.worked_in_financial,
            tax_number: res.data.data.tax_identification_number,
            politically_exposed: res.data.data.politically_exposed,
            sales_agent: res.data.data.manager_id,
            login_block: res.data.data.login_block,
            user_status: res.data.data.user_status,
          });
          console.log('setProfileForm', profileForm);
        }
      });
  };

  const getReferralData = async (structure_id) => {
    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("structure_id", structure_id);
    param.append("action", "my_referrals");
    await axios
      .post(`${Url}/ajaxfiles/master_structure_manage.php`, param)
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
          referralData.data = res.data.data;
          setReferralData({ ...referralData });
          console.log('referralData', referralData);
        }
      });
  };

  const getSalesList = () => {
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append('action', "list_salesman");

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        // toast.error(res.data.message);
      } else {
        setSalesList(res.data.managers)
      }
    });
  }

  const getLinkClientList = () => {
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append('action', "list_clients");

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        linkClientForm.list = res.data.data;
        setLinkClientForm({ ...linkClientForm });
      }
    });
  }

  const getIBUserList = () => {
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append('action', "list_ib_users");

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        linkIBForm.list = res.data.data;
        setLinkIBForm({ ...linkIBForm });
      }
    });
  }

  const unlinkIB = () => {
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append('user_id', id);
    param.append('action', "inlink_ib");

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  }

  const viewCPPassword = () => {
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append('user_id', id);
    param.append('action', "view_cp_password");

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        viewCpPassword.cp_password = res.data.view_password;
        setViewCpPassword({ ...viewCpPassword });
      }
    });
  }

  const getCpAccessSetting = () => {
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append('user_id', id);
    param.append('action', "view_cp_access");

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        cpAccessForm.status = res.data.login_block;
        setCpAccessForm({ ...cpAccessForm });
        console.log("cpAccessForm", cpAccessForm);
      }
    });
  }

  useEffect(() => {
    getProfilePageData();
    getUserDetails();
    getMt5LivePackages();
    getAccountList();
    getSalesList()

    const param = new FormData();
    // param.append("is_app", 1);
    // param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("action", "get_leverages");
    axios
      .post(Url + "/ajaxfiles/update_user_profile.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          localStorage.setItem("login", true);
          navigate("/");
        }
        setLeverageForm(res.data.leverages);
      });
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
                  {
                    (userData.data["user_status"] == "0") ? <div className="user-status-section">
                      <span className={`text-color-red`}>{userData.data["user_status_msg"]}</span>
                    </div> : ""
                  }
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
                      <p>{userData.data["total_mt5_accounts"]}</p>
                    </div>
                    <div className="header-highlight">
                      <label>Account Currency</label>
                      <p>USD</p>
                    </div>
                    <div className="header-highlight">
                      <label>Balance</label>
                      <p>$ {userData.data["wallet_balance"]}</p>
                    </div>
                    <div className="header-highlight">
                      <label>Sales Agent</label>
                      <p>{(userData.data["manager_name"] == "") ? "Not Assigned" : userData.data["manager_name"]}</p>
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
                    <Tab
                      label="PROFILE PAGE"
                      onClick={() => console.log("working tab")}
                    />
                    <Tab
                      label="BANK DETAILS"
                      onClick={() => console.log("working tab")}
                    />
                    <Tab label="DOCUMENTS" />
                    <Tab label="ACCOUNTS" />
                    <Tab label="ACTIVITIES" />
                    <Tab label="LOGS" />
                    <Tab label="TRANSACTIONS" />
                    {
                      userData.data.is_ib_account == "0" ? "" : <Tab label="REFERRALS" />
                    }
                    {
                      userData.data.is_ib_account == "0" ? "" : <Tab label="PARTNERSHIP" />
                    }

                    {/* <Tab label="STATEMENT" /> */}
                    <Tab label="NOTES" />
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
                                  disabled
                                // onChange={profileInput}
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
                                    {countryData.data.map((item) => {
                                      return (
                                        <MenuItem value={item.nicename}>
                                          {item.nicename}
                                        </MenuItem>
                                      );
                                    })}
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
                                    {countryData.data.map((item) => {
                                      return (
                                        <MenuItem value={item.nicename}>
                                          {item.nicename}
                                        </MenuItem>
                                      );
                                    })}
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
                                    <MenuItem value="1">Yes</MenuItem>
                                    <MenuItem value="0">No</MenuItem>
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
                                    <MenuItem value="1">Yes</MenuItem>
                                    <MenuItem value="0">No</MenuItem>
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
                                    <MenuItem value="1">Yes</MenuItem>
                                    <MenuItem value="0">No</MenuItem>
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
                                    {
                                      salesList.map((item) => {
                                        return <MenuItem value={item.manager_id}>{item.manager_name}</MenuItem>
                                      })
                                    }
                                  </Select>
                                </FormControl>
                              </div>
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>Login Block</InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.login_block}
                                    onChange={profileInput}
                                    name="login_block"
                                  >
                                    <MenuItem value="0">No</MenuItem>
                                    <MenuItem value="1">Yes</MenuItem>
                                  </Select>
                                </FormControl>
                              </div>{" "}
                              <div className="element">
                                <FormControl
                                  variant="standard"
                                  sx={{ width: "100%" }}
                                  focused
                                >
                                  <InputLabel>User Status </InputLabel>
                                  <Select
                                    label
                                    className="select-font-small"
                                    // value={age}
                                    value={profileForm.user_status}
                                    onChange={profileInput}
                                    name="user_status"
                                  >
                                    <MenuItem value="0">No</MenuItem>
                                    <MenuItem value="1">Yes</MenuItem>
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
                                {
                                  userData.data.is_ib_account == "1" ? <>
                                    <Button
                                      variant="contained"
                                      className="add_master_structure btn-hover-css"
                                      onClick={openDialogbox}>
                                      Add Master Structure
                                    </Button>
                                    <Button
                                      variant="contained"
                                      className="edit_master_structure btn-hover-css"
                                      onClick={openDialogbox}>
                                      Edit Master Structure
                                    </Button>
                                    <Button
                                      variant="contained"
                                      className="link_client btn-hover-css"
                                      onClick={openDialogbox}>
                                      Link Client
                                    </Button>
                                    <Button
                                      variant="contained"
                                      className="unlink_ib btn-hover-css"
                                      onClick={openDialogbox}>
                                      Unlink IB
                                    </Button>
                                  </> : ""
                                }
                                {
                                  userData.data.is_ib_account == "0" ? <>
                                    <Button
                                      variant="contained"
                                      className="link_ib btn-hover-css"
                                      onClick={openDialogbox}>
                                      Link To IB
                                    </Button>
                                  </> : ""
                                }
                              </div>
                              {/* {
                                userData.data.is_ib_account == "0" ? "" :
                                  <>
                                    <div className="mt5btngroup">
                                    </div>
                                  </>
                              } */}
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
                                {/* <Button
                                  variant="contained"
                                  className="download_application btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Download Application
                                </Button> */}
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
                                        value={employmentDetailsForm.status}
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
                                        value={employmentDetailsForm.industry}
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
                                url={`${Url}/datatable/get_bank_list.php`}
                                column={bankColumn}
                                sort="0"
                                userId={id}
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
                          <KycDocument id={id} />
                          {/* <Paper
                            elevation={2}
                            style={{ borderRadius: "10px" }}
                            className="paper-main-section"
                          >
                            <div className="headerSection header-title">
                              <p className="margin-0">Upload New Document</p>
                            </div>
                            <div className="documentDetailsTabSection">
                              <div className="">
                                <Grid container spacing={1} className="ml-n1">
                                  <Grid item sm={9} className="p-1">
                                    <FormControl className="w-100">
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
                                            onChange={(e) => {
                                              console.log(proofAdd, "proof");
                                              setProofAdd([
                                                ...proofAdd,
                                                e.target.files[0],
                                              ]);
                                            
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
                          </Paper> */}
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
                                {/* <Button
                                  variant="contained"
                                  className="link_campaign"
                                  onClick={openDialogbox}
                                >
                                  Link to Campaign
                                </Button> */}
                                <Button
                                  variant="contained"
                                  className="change_leverage btn-hover-css"
                                  onClick={openDialogbox}
                                >
                                  Change Leverage
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
                                url={`${Url}/datatable/mt5_account_list.php`}
                                column={mt5AccountListColumn}
                                userId={id}
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
                                url={`${Url}/datatable/login_activities.php`}
                                column={activityColumn}
                                userId={id}
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
                              <p className="margin-0">Logs</p>
                              {/* <Button
                                variant="contained"
                                className="add_note"
                                onClick={openDialogbox}
                              >
                                Add Note
                              </Button> */}
                            </div>
                            <div className="bankDetailsTabSection">
                              <CommonTable
                                url={`${Url}/datatable/log_list.php`}
                                column={logColumn}
                                userId={id}
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
                                url={`${Url}/datatable/wallet_history.php`}
                                column={walletHistoryColumn}
                                userId={id}
                                sort="1"
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
                              <br />
                              <FormControl
                                variant="standard"
                                sx={{ width: "20%" }}
                              >
                                <InputLabel>Structure</InputLabel>
                                <Select
                                  label
                                  className="select-font-small"
                                  name="structure"
                                  onChange={(e) => {
                                    getReferralData(e.target.value);
                                    // setStructureList((prevalue) => {
                                    //   return {
                                    //     ...prevalue,
                                    //     structure_name: structureList.data.filter(
                                    //       (x) => x.structure_id == e.target.value
                                    //     )[0].structure_name,
                                    //     structure_id: e.target.value,
                                    //   };
                                    // });
                                  }}
                                >
                                  {structureList.data.map((item) => {
                                    return (
                                      <MenuItem value={item.structure_id}>
                                        {item.structure_name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                              <br />
                              <div className="referrals-section">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Client Type</th>
                                      <th>MT5 Account</th>
                                      <th>Commission</th>
                                      <th>Rebate</th>
                                      <th>Sponsor Name</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      referralData.data.map((item, index) => {
                                        return (
                                          <>
                                            <tr>
                                              <td>
                                                <div className="collaps-content">
                                                  <i class={`fa fa-angle-${(item.is_collapse) ? 'up' : 'down'}`} onClick={(e) => {
                                                    referralData.data[index].is_collapse = !item.is_collapse;
                                                    setReferralData({ ...referralData });
                                                  }}></i>{item.structure_name}
                                                </div>
                                              </td>
                                              <td>{item.client_type}</td>
                                              <td>{item.mt5_acc_no}</td>
                                              <td>
                                                <div className="referral-commission_rebate-content" style={{ backgroundColor: `${item.group_color}` }}>{item.group_commission}</div>
                                              </td>
                                              <td>
                                                <div className="referral-commission_rebate-content" style={{ backgroundColor: `${item.group_color}` }}>{item.group_rebate}</div>
                                              </td>
                                              <td>{item.sponsor_name}</td>
                                            </tr>
                                            {
                                              (item.is_collapse) ?
                                                item.structure_users.map((item1) => {
                                                  return (
                                                    <tr className="referral-child-structure-users">
                                                      <td>{item1.client_name}</td>
                                                      <td>{item1.client}</td>
                                                      <td>{item1.mt5_acc_no}</td>
                                                      <td></td>
                                                      <td></td>
                                                      <td>{item1.sponsor_name}</td>
                                                    </tr>
                                                  )
                                                }) : ""
                                            }
                                          </>
                                        )
                                      })
                                    }
                                    <tr></tr>
                                  </tbody>
                                </table>
                              </div>


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
                            className="paper-main-section partnership-main-section">
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
                                    onChange={(e) => {
                                      console.log(
                                        "svalue",
                                        structureList.data.filter(
                                          (x) => x.structure_id == e.target.value
                                        )[0].structure_name
                                      );
                                      getPartnershipMasterStructure(e.target.value);
                                      partnershipMasterStructureData.structure_id = e.target.value;
                                      partnershipMasterStructureData.structure_name = structureList.data.filter((x) => x.structure_id == e.target.value)[0].structure_name;
                                      setStructureList((prevalue) => {
                                        return {
                                          ...prevalue,
                                          structure_name: structureList.data.filter(
                                            (x) => x.structure_id == e.target.value
                                          )[0].structure_name,
                                          structure_id: e.target.value,
                                        };
                                      });
                                    }}
                                  >
                                    {structureList.data.map((item) => {
                                      return (
                                        <MenuItem value={item.structure_id}>
                                          {item.structure_name}
                                        </MenuItem>
                                      );
                                    })}
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
                                  className="edit_structure"
                                  onClick={openDialogbox}
                                >
                                  Edit Structure
                                </Button>
                              </div>
                            </div>
                            <div className="bankDetailsTabSection">
                              {
                                (partnershipMasterStructureData.structure_data.length > 0) ?
                                  <div className="master-structure-section">
                                    <div className="structureNameSection view-ib-content-section">
                                      <label>STRUCTURE NAME</label>
                                      <span>{partnershipMasterStructureData.structure_name}</span>
                                    </div>
                                    <div className="main-content-input">
                                      <div className="ib-structure view-commission-content-section">
                                        {
                                          partnershipMasterStructureData.structure_data.map((item, index) => {
                                            return (
                                              <div className="group-structure-section">
                                                <div className="main-section">
                                                  <div className='main-section-title'>{item.ib_group_name}</div>
                                                  <div className='main-section-input-element'>
                                                    <div>
                                                      {/* <span>Rebate</span> */}
                                                      <input type='number' className="Rebate_amount" placeholder="Rebate" disabled value={item.group_rebate} />
                                                    </div>
                                                    <div>
                                                      {/* <span>Commission</span> */}
                                                      <input type='number' className="commission_amount" placeholder="Commission" disabled value={item.group_commission} />
                                                    </div>
                                                    {/* <div>
                                                      {
                                                        (item.ibGroup != undefined) ?
                                                          <FormControl variant="standard">
                                                            <Select
                                                              label
                                                              className="select-font-small"
                                                              value={item.ib_group_level_id}
                                                              name="title"
                                                              disabled
                                                            >
                                                              <MenuItem value={0}>Select IB Group</MenuItem>
                                                              {
                                                                item.ibGroup.map((item1, index1) => {
                                                                  return (
                                                                    <MenuItem disabled={item1.isDisable} value={item1.ib_group_level_id}>{item1.ib_group_name}</MenuItem>
                                                                  );
                                                                })
                                                              }
                                                            </Select>
                                                          </FormControl> : ''
                                                      }
                                                    </div> */}
                                                  </div>
                                                  <div className='action-section'>
                                                    <span onClick={(e) => { partnershipMasterStructureData.structure_data[index]['is_visible'] = !item.is_visible; setUpdateDate({ ...newMasterStructureData }) }}><i class={`fa ${item.is_visible ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i></span>
                                                  </div>
                                                </div>
                                                <div className={`pair-section ${(item.is_visible) ? 'child-section-visible' : ''}`}>
                                                  {
                                                    item.pair_data.map((item1, index1) => {
                                                      return (
                                                        <div className="pair-data">
                                                          <div className='pair-data-title'>{item1.pair_name}</div>
                                                          <div>
                                                            <input type='number' className="rebert_amount" placeholder="Rebert" value={item1.rebate} disabled />
                                                          </div>
                                                          <div>
                                                            <input type='number' className="commission_amount" placeholder="Commission" value={item1.commission} disabled />
                                                          </div>
                                                        </div>
                                                      );
                                                    })
                                                  }
                                                </div>
                                              </div>
                                            );
                                          })
                                        }
                                      </div>
                                    </div>
                                  </div> : ''
                              }

                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    {/* <TabPanel value={value} index={9} dir={theme.direction}>
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
                    </TabPanel> */}
                    <TabPanel value={value} index={9} dir={theme.direction}>
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
                                url={`${Url}/datatable/notes_list.php`}
                                column={noteColumn}
                                userId={id}
                                sort="2"
                                refresh={refresh}
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
        <Dialog
          open={openModel}
          onClose={handleClose}
          // aria-labelledby="alert-dialog-title"
          // aria-describedby="alert-dialog-description"
          style={{
            opacity: "1",
            transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          }}
          PaperProps={{
            sx: {
              width: "50%",
              maxWidth: "768px",
              borderRadius: "10px",
              elevation: "24",
              class: "border border-bottom-0",
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            className="d-flex align-items-center p-3"
            style={{ borderBottom: "none" }}
          >
            <h5 className="ml-3 w-100 text-start mt-2 mb-2 font-weight-bold">
              View Partnership
            </h5>
            <CloseIcon
              onClick={() => {
                setOpenModel(false);
              }}
            />
          </DialogTitle>
          <DialogContent className="create-account-content ml-4">
            <Grid
              container
              spacing={1}
            // className="MuiGrid-justify-xs-space-between mt-2"
            >
              <div>
                <div className="main-content-display">
                  <div className="display-element">
                    <h6>User Name</h6>
                    <div>{ibdata.requested_user_name}</div>
                  </div>
                  <div className="display-element">
                    <h6>DATE</h6>
                    <div>{ibdata.date}</div>
                  </div>
                  <div className="display-element">
                    <h6>ACQUIRE CLIENT</h6>
                    <div>{ibdata.execution}</div>
                  </div>
                  <div className="display-element">
                    <h6>COUNTRY</h6>
                    <div>{ibdata.countries}</div>
                  </div>
                  <div className="display-element">
                    <h6>EMAIL</h6>
                    <div>{ibdata.user_email}</div>
                  </div>
                  <div className="display-element">
                    <h6>Sponsor Name</h6>
                    <div>{ibdata.sponsor_name}</div>
                  </div>
                  <div className="display-element">
                    <h6>STRUCTURE NAME</h6>
                    <div>{ibdata.structure_name}</div>
                  </div>
                  <div className="display-element">
                    <h6>REFFEERED</h6>
                    <div>{ibdata.is_reffered == "0" ? "NO" : "YES"}</div>
                  </div>
                  <div className="display-element">
                    <h6>WEBSITE</h6>
                    <div>{ibdata.is_website}</div>
                  </div>
                  <div className="display-element">
                    <h6>REMARK</h6>
                    <div>{ibdata.REMARK}</div>
                  </div>
                  <div className="display-element">
                    <h6>IB APPROVE</h6>
                    <div
                      className={`col s12 text-color-${ibdata.sponsor_approve == "1"
                        ? "green"
                        : ibdata.sponsor_approve == "2"
                          ? "red"
                          : "yellow"
                        }`}
                    >
                      {ibdata.sponsor_approve == "1"
                        ? "APPROVED"
                        : ibdata.sponsor_approve == "2"
                          ? "REJECTED"
                          : "PENDING"}
                    </div>
                  </div>
                  <div className="display-element">
                    <h6>ADMIN APPROVE</h6>
                    <div
                      className={`col s12 text-color-${ibdata.admin_approve == "1"
                        ? "green"
                        : ibdata.admin_approve == "2"
                          ? "red"
                          : "yellow"
                        }`}
                    >
                      {ibdata.admin_approve == "1"
                        ? "APPROVED"
                        : ibdata.admin_approve == "2"
                          ? "REJECTED"
                          : "PENDING"}
                    </div>
                  </div>
                  <div className="display-element">
                    <h6>STATUS</h6>
                    <div
                      className={`col s12 text-color-${ibdata.status == "1"
                        ? "green"
                        : ibdata.status == "2"
                          ? "red"
                          : "yellow"
                        }`}
                    >
                      {ibdata.status == "1"
                        ? "APPROVED"
                        : ibdata.status == "2"
                          ? "REJECTED"
                          : "PENDING"}
                    </div>
                  </div>{" "}
                </div>
              </div>
              <div className="divider"></div>
              <div className="main-content-input">
                <div>
                  <label
                    htmlFor="structure_id"
                    className="text-info font-weight-bold form-label-head w-100  required"
                  >
                    Structure type
                  </label>
                  <Select
                    value={updateDate.structure_id}
                    name="structure_id"
                    onChange={input01}
                    displayEmpty
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                    input={<BootstrapInput />}
                    className="mt-0 ml-0"
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="">Select Option</MenuItem>
                    {getStructuresList.map((item) => {
                      return (
                        <MenuItem value={item.structure_id}>
                          {item.structure_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="sponsor_approve"
                    className="text-info font-weight-bold form-label-head w-100  required"
                  >
                    Status
                  </label>
                  <Select
                    value={updateDate.sponsor_approve}
                    name="sponsor_approve"
                    onChange={input01}
                    displayEmpty
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                    input={<BootstrapInput />}
                    className="mt-0 ml-0"
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="">Select Option</MenuItem>
                    <MenuItem value="0">PENDING</MenuItem>
                    <MenuItem value="1">APPROVED</MenuItem>
                    <MenuItem value="2">REJECTED</MenuItem>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="remarks"
                    className="text-info font-weight-bold form-label-head w-100 mt-4 required"
                  >
                    Remarks
                  </label>
                  <BootstrapInput
                    name="remarks"
                    value={updateDate.remarks}
                    onChange={input01}
                    displayEmpty
                    inputProps={{
                      "aria-label": "Without label",
                    }}
                  />
                </div>
                <div>
                  {updateDate.isLoader ? (
                    <ColorButton
                      tabindex="0"
                      size="large"
                      className="createMt5Formloder "
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
                    </ColorButton>
                  ) : (
                    <ColorButton onClick={updatePartnership}>
                      Update
                    </ColorButton>
                  )}
                  {/* <ColorButton onClick={updatePartnership}>Update</ColorButton> */}
                </div>
              </div>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
