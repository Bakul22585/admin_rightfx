import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { IsApprove, Url } from "../global";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

const Referrals = (prop) => {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [fullWidth, setFullWidth] = useState(false);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [mt5accounts, setMt5Account] = useState({
    data: [],
    total: {},
    // total:{
    //     rebate_generated:0,
    //     rebate_withdraw:0,
    //     total:0,
    //     total_deposit:0,
    //     total_lot:0,
    //     total_withdraw:0
    // }
  });
  const navigate = useNavigate();
  const [referralData, setReferralData] = useState({
    data: [],
    structure_name: "",
    structure_id: "",
    masterData: {},
  });
  const [userData, setuserData] = useState({ isLoader: true, data: {} });
  const handleClose = () => {
    setOpen(false);
  };
  const getReferralData = async (structure_id) => {
    const param = new FormData();
    if (IsApprove !== "") {
      param.append("is_app", IsApprove.is_app);
      param.append("AADMIN_LOGIN_ID", IsApprove.AADMIN_LOGIN_ID);
      param.append("role_id", IsApprove.AADMIN_LOGIN_ROLE_ID);
    }
    param.append("user_id", prop.id);
    // param.append("structure_id", structure_id);
    param.append("action", "my_referrals");
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
          referralData.data = res.data.data;
          referralData.masterData = res.data;

          setReferralData({ ...referralData });
        }
      });
  };
  useEffect(() => {
    getReferralData();
  }, []);
  const getTotal = () => {
    mt5accounts.total.rebate_generated = 0;
    mt5accounts.total.rebate_withdraw = 0;
    mt5accounts.total.total_deposit = 0;
    mt5accounts.total.total_lot = 0;
    mt5accounts.total.total_withdraw = 0;
    mt5accounts.data.map((item) => {
      mt5accounts.total.rebate_generated =
        mt5accounts.total.rebate_generated + parseFloat(item.rebate_generated);
      mt5accounts.total.rebate_withdraw =
        mt5accounts.total.rebate_withdraw + parseFloat(item.rebate_withdraw);
      mt5accounts.total.total_deposit =
        mt5accounts.total.total_deposit + parseFloat(item.total_deposit);
      mt5accounts.total.total_lot =
        mt5accounts.total.total_lot + parseFloat(item.total_lot);
      mt5accounts.total.total_withdraw =
        mt5accounts.total.total_withdraw + parseFloat(item.total_withdraw);
    });
    setMt5Account({ ...mt5accounts });
  };
  const manageContent = () => {
    return (
      <div>
        <table className="tableforriskscroe w-100">
          <thead>
            <tr>
              <th>Mt5 Account Number</th>
              <th>IB Group Name</th>
              <th>Rebate Generated</th>
              <th>Rebate Withdraw</th>
              <th>Total Deposit</th>
              <th>Total Withdraw</th>
              <th>Total Lot</th>
            </tr>
          </thead>
          <tbody>
            {mt5accounts.data.map((item) => {
              return (
                <tr>
                  <td>{item.mt5_acc_no}</td>
                  <td>{item.ib_group_name}</td>
                  <td>{item.rebate_generated}</td>
                  <td>{item.rebate_withdraw}</td>
                  <td>{item.total_deposit}</td>
                  <td>{item.total_withdraw}</td>
                  <td>{item.total_lot}</td>
                  {/* <td>{item.total}</td> */}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">
                <b>Total</b>
              </td>
              <td>
                <b>{mt5accounts.total.rebate_generated}</b>
              </td>

              <td>
                <b>{mt5accounts.total.rebate_withdraw}</b>
              </td>
              <td>
                <b>{mt5accounts.total.total_deposit}</b>
              </td>
              <td>
                <b>{mt5accounts.total.total_withdraw}</b>
              </td>
              <td>
                <b>{mt5accounts.total.total_lot}</b>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };
  const manageDialogActionButton = () => {
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
  };
  const getchild1 = (item, index) => {
    console.log("item.child", item);
    return item.child.map((item1) => {
      return (
        <>
          <tr className="referral-child-structure-users1">
            <td>
              {item1.child.length !== 0 ? (
                <div className="collaps-content">
                  <i
                    class={`fa fa-angle-${
                      referralData.data[index][item.sponsor_id] ? "up" : "down"
                    }`}
                    onClick={(e) => {
                      referralData.data[index][item.sponsor_id] =
                        !referralData.data[index][item.sponsor_id];
                      setReferralData({
                        ...referralData,
                      });
                    }}
                  ></i>
                </div>
              ) : (
                ""
              )}
            </td>
            <td style={{ color: item1.user_color }} className="fw-700">
              {item1.client_name}
            </td>
            <td>{item1.user_type}</td>
            <td>{item1.level}</td>

            <td>{item1.sponsor_name}</td>
            <td>
              {" "}
              {item1.mt5_account_data.length != 0 ? (
                <Button
                  onClick={() => {
                    setDialogTitle("MT5 Account");
                    mt5accounts.data = item1.mt5_account_data;
                    setMt5Account({
                      ...mt5accounts,
                    });
                    getTotal();
                    setOpen(true);
                  }}
                >
                  <VisibilityIcon />
                </Button>
              ) : (
                ""
              )}
            </td>
            <td>
              {" "}
              {item1.downline_mt5_account_data.length != 0 ? (
                <Button
                  onClick={() => {
                    setDialogTitle("MT5 Account");
                    mt5accounts.data = item1.downline_mt5_account_data;
                    setMt5Account({
                      ...mt5accounts,
                    });
                    getTotal();
                    setOpen(true);
                  }}
                >
                  <VisibilityIcon />
                </Button>
              ) : (
                ""
              )}
            </td>
          </tr>
          {referralData.data[index][item.sponsor_id] && item1.child != []
            ? getchild2(item1, index)
            : ""}
        </>
      );
    });
  };
  const getchild = (item, index) => {
    console.log("item.child", item);
    return item.child.map((item1) => {
      return (
        <>
          <tr className="referral-child-structure-users">
            <td>
              {item1.child.length !== 0 ? (
                <div className="collaps-content">
                  <i
                    class={`fa fa-angle-${
                      referralData.data[index][item.sponsor_id] ? "up" : "down"
                    }`}
                    onClick={(e) => {
                      referralData.data[index][item.sponsor_id] =
                        !referralData.data[index][item.sponsor_id];
                      setReferralData({
                        ...referralData,
                      });
                    }}
                  ></i>
                </div>
              ) : (
                ""
              )}
            </td>
            <td style={{ color: item1.user_color }} className="fw-700">
              {item1.client_name}
            </td>
            <td>{item1.user_type}</td>
            <td>{item1.level}</td>

            <td>{item1.sponsor_name}</td>
            <td>
              {" "}
              {item1.mt5_account_data.length != 0 ? (
                <Button
                  onClick={() => {
                    setDialogTitle("MT5 Account");
                    mt5accounts.data = item1.mt5_account_data;
                    setMt5Account({
                      ...mt5accounts,
                    });
                    getTotal();
                    setOpen(true);
                  }}
                >
                  <VisibilityIcon />
                </Button>
              ) : (
                ""
              )}
            </td>
            <td>
              {" "}
              {item1.downline_mt5_account_data.length != 0 ? (
                <Button
                  onClick={() => {
                    setDialogTitle("MT5 Account");
                    mt5accounts.data = item1.downline_mt5_account_data;
                    setMt5Account({
                      ...mt5accounts,
                    });
                    getTotal();
                    setOpen(true);
                  }}
                >
                  <VisibilityIcon />
                </Button>
              ) : (
                ""
              )}
            </td>
          </tr>
          {referralData.data[index][item.sponsor_id] && item1.child != []
            ? getchild1(item1, index)
            : ""}
        </>
      );
    });
  };
  const getchild2 = (item, index) => {
    console.log("item.child", item);
    return item.child.map((item1) => {
      return (
        <>
          <tr className="referral-child-structure-users2">
            <td>
              {item1.child.length !== 0 ? (
                <div className="collaps-content">
                  <i
                    class={`fa fa-angle-${
                      referralData.data[index][item.sponsor_id] ? "up" : "down"
                    }`}
                    onClick={(e) => {
                      referralData.data[index][item.sponsor_id] =
                        !referralData.data[index][item.sponsor_id];
                      setReferralData({
                        ...referralData,
                      });
                    }}
                  ></i>
                </div>
              ) : (
                ""
              )}
            </td>
            <td style={{ color: item1.user_color }} className="fw-700">
              {item1.client_name}
            </td>
            <td>{item1.user_type}</td>
            <td>{item1.level}</td>

            <td>{item1.sponsor_name}</td>
            <td>
              {" "}
              {item1.mt5_account_data.length != 0 ? (
                <Button
                  onClick={() => {
                    setDialogTitle("MT5 Account");
                    mt5accounts.data = item1.mt5_account_data;
                    setMt5Account({
                      ...mt5accounts,
                    });
                    getTotal();
                    setOpen(true);
                  }}
                >
                  <VisibilityIcon />
                </Button>
              ) : (
                ""
              )}
            </td>
            <td>
              {" "}
              {item1.downline_mt5_account_data.length != 0 ? (
                <Button
                  onClick={() => {
                    setDialogTitle("MT5 Account");
                    mt5accounts.data = item1.downline_mt5_account_data;
                    setMt5Account({
                      ...mt5accounts,
                    });
                    getTotal();
                    setOpen(true);
                  }}
                >
                  <VisibilityIcon />
                </Button>
              ) : (
                ""
              )}
            </td>
          </tr>
          {referralData.data[index][item.sponsor_id] && item1.child != []
            ? getchild(item1, index)
            : ""}
        </>
      );
    });
  };
  console.log("referralData", referralData);

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
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
                  <div className="referrals-section">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Client Name</th>
                          <th>Client Type</th>
                          <th>Level</th>
                          <th>Sponsor Name</th>
                          <th>MT5 Account</th>
                          <th>Downline MT5 Account</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td
                            style={{
                              color: referralData.masterData.user_color,
                            }}
                            className="fw-700"
                          >
                            {referralData.masterData.master_name}
                          </td>
                          <td>{referralData.masterData.user_type}</td>
                          <td></td>
                          <td>{referralData.masterData.sponsor_name}</td>
                          <td>
                            {referralData.masterData.mt5_account_data != "" ? (
                              <Button
                                onClick={() => {
                                  setDialogTitle("MT5 Account");
                                  mt5accounts.data =
                                    referralData.masterData.mt5_account_data;
                                  setMt5Account({
                                    ...mt5accounts,
                                  });
                                  getTotal();
                                  setOpen(true);
                                }}
                              >
                                <VisibilityIcon />
                              </Button>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {referralData.masterData
                              .downline_mt5_account_data != "" ? (
                              <Button
                                onClick={() => {
                                  setDialogTitle("MT5 Account");
                                  mt5accounts.data =
                                    referralData.masterData.downline_mt5_account_data;
                                  setMt5Account({
                                    ...mt5accounts,
                                  });
                                  getTotal();
                                  setOpen(true);
                                }}
                              >
                                <VisibilityIcon />
                              </Button>
                            ) : (
                              ""
                            )}
                          </td>
                        </tr>
                        {referralData.data.map((item, index) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  {" "}
                                  <div className="collaps-content">
                                    {item.child.length !== 0 ? (
                                      <i
                                        class={`fa fa-angle-${
                                          item.is_collapse ? "up" : "down"
                                        }`}
                                        onClick={(e) => {
                                          referralData.data[index].is_collapse =
                                            !item.is_collapse;
                                          setReferralData({
                                            ...referralData,
                                          });
                                        }}
                                      ></i>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </td>
                                <td
                                  style={{ color: item.user_color }}
                                  className="fw-700"
                                >
                                  {item.client_name}
                                </td>
                                <td>{item.user_type}</td>
                                <td>{item.level}</td>

                                {/* <td>
                                  <div>{item.total_deposit}</div>
                                </td>
                                <td>
                                  <div>{item.total_withdraw}</div> */}
                                {/* </td> */}
                                <td>{item.sponsor_name}</td>
                                <td>
                                  {item.mt5_account_data.length != 0 ? (
                                    <Button
                                      onClick={() => {
                                        setDialogTitle("MT5 Account");
                                        mt5accounts.data =
                                          item.mt5_account_data;
                                        setMt5Account({
                                          ...mt5accounts,
                                        });
                                        getTotal();
                                        setOpen(true);
                                      }}
                                    >
                                      <VisibilityIcon />
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                              {item.is_collapse ? getchild(item, index) : ""}
                            </>
                          );
                        })}
                        <tr></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
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
      </div>
    </div>
  );
};

export default Referrals;
