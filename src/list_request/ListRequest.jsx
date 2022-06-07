import './list_request.css';
import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, Menu, MenuItem, Paper, Select, TextField } from "@mui/material";
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
import { useNavigate } from 'react-router-dom';
import '../commision_group/commision_group.css';

const ListRequest = () => {

  const navigate = useNavigate();
  const [openTableMenus, setOpenTableMenus] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [updateDate, setUpdateDate] = useState({
    structure_id: "",
    sponsor_approve: "",
    admin_approve: "",
    remarks: "",
    structure_name: "",
    structure_data: [],
    isLoader: false,
    refresh: false,
    structure_id:""
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
            {row.status == "1" ? (
              ""
            ) : (
              <Button
                sx={{ color: "black" }}
                onClick={() => {
                  viewRequest(row);
                  setUpdateDate((preValue) => {
                    return {
                      ...preValue,
                      remarks: row.remarks,
                      requested_user_id:row.requested_user_id,
                      ib_application_id:row.ib_application_id
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
  console.log("updateDate",ibdata)
  const viewRequest = async(prop) => {
    // setOpenModel(true);
    setIbData(prop);
    const param = new FormData();
    param.append('is_app', 1);
    param.append('AADMIN_LOGIN_ID', 1);
    param.append('action', 'get_default_structure');
    param.append('user_id', prop.requested_user_id);
    await axios.post(`${Url}/ajaxfiles/structures_manage.php`, param).then((res) => {
        if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
        }

        if (res.data.status == 'error') {
            toast.error(res.data.message);
        } else {
            updateDate.structure_data = res.data.data;
            if(res.data.structure_id){
              updateDate.structure_id = res.data.structure_id;
              updateDate.structure_name = res.data.structure_name;
            }

            setUpdateDate({ ...updateDate});
           
            console.log('form', updateDate);
            // setMaxWidth('md');
            // setDialogTitle('Add');
            setOpenModel(true)
        }
    });
    /* const param = new FormData();
    param.append("is_app", 1);
    param.append("AADMIN_LOGIN_ID", 1);
    param.append("user_id", id);
    param.append("action", "get_my_structure");
    axios
      .post(Url + "/ajaxfiles/master_structure_manage.php", param)
      .then((res) => {
        setGetStructuresList(res.data.data);
      }); */
  };
  const handleClose = () => {
    setOpenModel(false);
  }
  // const updatePartnership = () => {
  //   if (updateDate.sponsor_approve == "") {
  //     toast.error("Status is required");
  //   } else if (updateDate.remarks == "") {
  //     toast.error("Remark is required");
  //   } else {
  //     const param = new FormData();
  //     // param.append("is_app", 1);
  //     // param.append("AADMIN_LOGIN_ID", 1);
  //     //    param.append("user_id", id);
  //     param.append("action", "update_partnership_request");

  //     param.append("ib_application_id", ibdata.ib_application_id);
  //     // param.append("structure_id", updateDate.structure_id);
  //     param.append("admin_approve", updateDate.sponsor_approve);
  //     param.append("remarks", updateDate.remarks);
  //     setUpdateDate((prevalue) => {
  //       return {
  //         ...prevalue,
  //         isLoader: true,

  //       };
  //     });
  //     axios
  //       .post(Url + "/ajaxfiles/partnership_request_manage.php", param)
  //       .then((res) => {
  //         if (res.data.status == "error") {
  //           toast.error(res.data.message);
  //           setUpdateDate((prevalue) => {
  //             return {
  //               ...prevalue,
  //               isLoader: false,
  //             };
  //           });
  //         } else {
  //           toast.success(res.data.message);
  //           setUpdateDate((prevalue) => {
  //             return {
  //               ...prevalue,
  //               isLoader: false,
  //               refresh: !updateDate.refresh,
  //             };
  //           });
  //           setOpenModel(false);
  //         }
  //       });
  //   }
  // };
  toast.configure();
  const updatePartnership = async () => {
    var error = false;
    if (updateDate.structure_name == "") {
        toast.error("Please enter structure name");
        
        error = true;
    } else {
      updateDate.structure_data.forEach(element => {
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
                    } else if (element1.commission === "") {
                        toast.error(`Please enter ${element.ib_group_name} in ${element1.pair_name} commission`);
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
    updateDate.isLoader = true;
    setUpdateDate({ ...updateDate });
    const param = new FormData();
    param.append('is_app', 1);
    param.append('AADMIN_LOGIN_ID', 1);
    param.append('requested_user_id', ibdata.requested_user_id);
    param.append('ib_application_id', ibdata.ib_application_id);
    param.append('remarks', updateDate.remarks);
    param.append('sponsor_approve', updateDate.sponsor_approve);
    param.append('admin_approve', updateDate.admin_approve);
    param.append('structure_name', updateDate.structure_name);
if(updateDate.structure_id){
  param.append('structure_id', updateDate.structure_id);
  param.append('action', 'update_master_structure');
}
if(updateDate.structure_id==""){
  param.append('action', 'insert_master_structure');
}
    param.append('pair_data', JSON.stringify(updateDate.structure_data));

    await axios.post(`${Url}/ajaxfiles/structures_manage.php`, param).then((res) => {
        if (res.data.message == "Session has been expired") {
            localStorage.setItem("login", true);
            navigate("/");
        }
        updateDate.isLoader = false;
        setUpdateDate({ ...updateDate });
        if (res.data.status == 'error') {
            toast.error(res.data.message);
        } else {
            toast.success(res.data.message);
            setOpenModel(false);
            setUpdateDate({  structure_id: "",
            sponsor_approve: "",
            admin_approve: "",
            remarks: "",
            structure_name: "",
            structure_data: [],
            isLoader: false,
            refresh: !updateDate.refresh,
            
            structure_id:""})
            
            
        }
    });
// }
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
                <CommonFilter search={searchBy} />
                <br />
                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                  <CommonTable url={`${Url}/datatable/partnership_requests.php`} column={partnershipcolumn} sort='0' search={searchBy} refresh={updateDate.refresh} />
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
                   
                    <div className="ib-structure view-commission-content-section">
                    <div style={{ width: '100%' }}>
                    <TextField label="Structure Name" variant="standard" sx={{ width: '100%' }} name='structure_name' value={updateDate.structure_name} onChange={input01} />
                </div>
                      {
                        updateDate.structure_data.map((item, index) => {
                          return (
                              <div className="group-structure-section">
                                  <div className="main-section">
                                      <div>{item.ib_group_name}</div>
                                      <div>
                                          <input type='number' className="rebert_amount" placeholder="Rebert" value={item.group_rebate}
                                              onChange={(e) => {
                                                updateDate.structure_data[index]['group_rebate'] = e.target.value;
                                                  setUpdateDate({
                                                      ...updateDate
                                                  });
                                              }} />
                                      </div>
                                      <div>
                                          <input type='number' className="commission_amount" placeholder="Commission" value={item.group_commission}
                                              onChange={(e) => {
                                                updateDate.structure_data[index]['group_commission'] = e.target.value;
                                                  setUpdateDate({
                                                      ...updateDate
                                                  });
                                              }}
                                          />
                                      </div>
                                      <div>
                                          {
                                              (item.ibGroup != undefined) ?
                                                  <FormControl variant="standard">
                                                      <Select
                                                          label
                                                          className="select-font-small"
                                                          value={item.ib_group_level_id}
                                                          name="title"
                                                          onChange={(e) => {
                                                            updateDate.structure_data[index]['ib_group_level_id'] = e.target.value;
                                                              setUpdateDate({
                                                                  ...updateDate
                                                              });
                                                          }}
                                                      >
                                                          <MenuItem value="0">Select IB Group</MenuItem>
                                                          {
                                                              item.ibGroup.map((item1, index1) => {
                                                                  return (
                                                                      <MenuItem value={item1.ib_group_level_id}>{item1.ib_group_name}</MenuItem>
                                                                  );
                                                              })
                                                          }
                                                      </Select>
                                                  </FormControl> : ''
                                          }
                                      </div>
                                  </div>
                                  <div className="pair-section">
                                      {
                                          item.pair_data.map((item1, index1) => {
                                              return (
                                                  <div className="pair-data">
                                                      <div>{item1.pair_name}</div>
                                                      <div>
                                                          <input type='number' className="rebert_amount" placeholder="Rebert" value={item1.rebate}
                                                              onChange={(e) => {
                                                                updateDate.structure_data[index]['pair_data'][index1]['rebate'] = e.target.value;
                                                                  setUpdateDate({
                                                                      ...updateDate
                                                                  });
                                                              }}
                                                          />
                                                      </div>
                                                      <div>
                                                          <input type='number' className="commission_amount" placeholder="Commission" value={item1.commission}
                                                              onChange={(e) => {
                                                                  updateDate.structure_data[index]['pair_data'][index1]['commission'] = e.target.value;
                                                                  setUpdateDate({
                                                                      ...updateDate
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
                        Admin Status
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
                          {updateDate.structure_id=="" ?"Insert":"Update"}
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