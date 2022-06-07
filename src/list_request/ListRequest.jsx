import './list_request.css';
import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, Menu, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CommonFilter from '../common/CommonFilter';
import CommonTable from '../common/CommonTable';
import { Url } from '../global';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BootstrapInput, ColorButton } from '../common/CustomElement';
import axios from 'axios';
import CloseIcon from "@mui/icons-material/Close";

const ListRequest = () => {

    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [updateDate, setUpdateDate] = useState({
        structure_id: "",
        sponsor_approve: "",
        admin_approve: "",
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
    const [ibdata, setIbData] = useState("");
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
                className={`text-color-${
                  row.sponsor_approve == "1"
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
                className={`text-color-${
                  row.admin_approve == "1"
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
                className={`text-color-${
                  row.status == "1" ? "green" : row.status == "2" ? "red" : "yellow"
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
                {row.status == "1" ? (
                  ""
                ) : (
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => {
                      viewRequest(row);
                      setUpdateDate((preValue)=>{
                        return{
                          ...preValue,
                          remarks:row.remarks
                        }
                      })
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
      const viewRequest = (prop) => {
        setOpenModel(true);
        setIbData(prop);
        // const param = new FormData();
        // // param.append("is_app", 1);
        // // param.append("AADMIN_LOGIN_ID", 1);
        // param.append("user_id", id);
        // param.append("action", "get_my_structure");
        // axios
        //   .post(Url + "/ajaxfiles/master_structure_manage.php", param)
        //   .then((res) => {
        //     setGetStructuresList(res.data.data);
        //   });
      };
      const handleClose=()=>{
        setOpenModel(false);
      }
      const updatePartnership = () => {
        if (updateDate.sponsor_approve == "") {
           toast.error("Status is required");
         } else if (updateDate.remarks == "") {
           toast.error("Remark is required");
         } else {
           const param = new FormData();
           // param.append("is_app", 1);
           // param.append("AADMIN_LOGIN_ID", 1);
        //    param.append("user_id", id);
           param.append("action", "update_partnership_request");
     
           param.append("ib_application_id", ibdata.ib_application_id);
           // param.append("structure_id", updateDate.structure_id);
           param.append("admin_approve", updateDate.sponsor_approve);
           param.append("remarks", updateDate.remarks);
           setUpdateDate((prevalue) => {
             return {
               ...prevalue,
               isLoader: true,
               
             };
           });
           axios
             .post(Url + "/ajaxfiles/partnership_request_manage.php", param)
             .then((res) => {
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
    const [searchBy, setSearchBy] = useState([
        {
          'label': 'DATE',
          'value': false,
          'name': 'date'
        },
        {
          'label': 'NAME',
          'value': false,
          'name': 'name'
        },
        {
          'label': 'INVESTMENT TILL MONTHS',
          'value': false,
          'name': 'investment_till_months'
        },
        {
          'label': 'AUTO WITHDRAWAL MONTHS',
          'value': false,
          'name': 'auto_withdrawal_months'
        }
      ]);

    const handleContextClick = (event, index) => {
        console.log(event.currentTarget.getAttribute('id'), index);
        let tableMenus = [...openTableMenus];
        tableMenus[index] = event.currentTarget;
        setOpenTableMenus(tableMenus);
    };

    const handleContextClose = (index) => {
        let tableMenus = [...openTableMenus];
        tableMenus[index] = null;
        setOpenTableMenus(tableMenus);
    };

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>IB Request List</p>
                                <CommonFilter search={searchBy}/>
                                <br/>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <CommonTable url={`${Url}/datatable/partnership_requests.php`} column={partnershipcolumn} sort='0'  search={searchBy} refresh={updateDate.refresh}/>
                                </Paper>
                            </Grid>
                        </Grid>
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
              View IB
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
                    <div>{ibdata.remarks}</div>
                  </div>
                  <div className="display-element">
                    <h6>IB APPROVE</h6>
                    <div
                      className={`col s12 text-color-${
                        ibdata.sponsor_approve == "1"
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
                      className={`col s12 text-color-${
                        ibdata.admin_approve == "1"
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
                      className={`col s12 text-color-${
                        ibdata.status == "1"
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
                {/* <div>
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
                </div> */}
                <div>
                  <label
                    htmlFor="sponsor_approve"
                    className="text-info font-weight-bold form-label-head w-100  required"
                  >
                    Status
                  </label>
                  <Select
                    value={updateDate.admin_approve}
                    name="admin_approve"
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
                    htmlFor="sponsor_approve"
                    className="text-info font-weight-bold form-label-head w-100  required"
                  >
                    Sponsor Status
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
                    htmlFor="sponsor_approve"
                    className="text-info font-weight-bold form-label-head w-100  required"
                  >
                    IB Groups
                  </label>
                  <Select
                    value={updateDate.admin_approve}
                    name="admin_approve"
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
                    htmlFor="sponsor_approve"
                    className="text-info font-weight-bold form-label-head w-100  required"
                  >
                    Status
                  </label>
                  <Select
                    value={updateDate.admin_approve}
                    name="admin_approve"
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
            </div>
        </div>
    )
}

export default ListRequest