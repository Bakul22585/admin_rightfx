import React, { useState, useEffect } from "react";
import { Grid, Input } from "@mui/material";

import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import CustomImageModal from "../../customComponet/CustomImageModal";
import {
  BootstrapInput,
  ColorButton,
} from "../common/CustomElement";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Url } from "../global.js";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import CustomImageModal from "../common/CustomImageModal";

const KycDocument = (prop) => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState(null);
  const [option, setOption] = useState(true);
  const [change1, setChange1] = useState(false);
  const [change, setChange] = useState(false);
  var [fontimg, setFontimg] = useState("");
  var [backimg, setBackimg] = useState("");
  const [sendKycRequest, setSendKycRequest] = useState({
    proof1: false,
    proof2: false,
    proof3: false,
  });
  const [kycStatus, setKycStatus] = useState("");
  const [document, setDocument] = useState(false);
  var [kycData, setKycData] = useState();

  const [kycStatusMessage, setKycStatusMessage] = useState("");
  const [doc, setDoc] = useState({
    proof: "Proof of ID",
    id: "id",
    fontimg: "",
    backimg: "",
  });
  console.log("doc backimg", doc.backimg);
  console.log("backimg", backimg);

  const onSubmit = () => {
    if (!doc.fontimg) {
      toast.error("Front Side of image is required");
    } else if (!doc.backimg) {
      toast.error("Back Side of image is required");
    } else {
      const param = new FormData();
      // param.append('is_app', 1);
      // param.append('AADMIN_LOGIN_ID', 1);
      param.append("aadhar_card_front_image", doc.fontimg);
      param.append("aadhar_card_back_image", doc.backimg);
      param.append("user_id", prop.id);
      param.append("action", "update_kyc");
      axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          getUserKyc();
        }
      });
    }
  };

  const fatchKycStatus = async () => {
    const param = new FormData();

    await axios
      .post(Url + "/ajaxfiles/get_kyc_status.php", param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          setDocument(false);
          setSendKycRequest((prevalue) => {
            return {
              ...prevalue,
              proof1: true,
            };
          });
        } else {
          setKycStatus(res.data.kyc_data);
          setBackimg(res.data.kyc_data.aadhar_card_back_image);
          setFontimg(res.data.kyc_data.aadhar_card_front_image);
          setKycStatusMessage(res.data.message);
          setDocument(true);
          if (res.data.kyc_data.master_status == "2") {
            setSendKycRequest((prevalue) => {
              return {
                ...prevalue,
                proof1: true,
              };
            });
          } else {
            setSendKycRequest((prevalue) => {
              return {
                ...prevalue,
                proof1: false,
              };
            });
          }
        }
      });
  };

  const getUserKyc = () => {
    const param = new FormData();
    // param.append('is_app', 1);
    // param.append('AADMIN_LOGIN_ID', 1);
    param.append('user_id', prop.id);
    param.append('action', 'get_kyc_status');

    axios.post(Url + "/ajaxfiles/update_user_profile.php", param).then((res) => {
      if (res.data.message == "Session has been expired") {
        localStorage.setItem("login", true);
        navigate("/");
      }
      if (res.data.status == "error") {
        toast.error(res.data.message);
      } else {
        kycData = res.data.kyc_data;
        setKycData(kycData);
        setFontimg(kycData.aadhar_card_front_image);
        setBackimg(kycData.aadhar_card_back_image);
      }
    });
  }

  useEffect(() => {
    getUserKyc();
  }, []);

  useEffect(() => {
    if (sendKycRequest) {
      if (!doc.fontimg) {
        setFontimg(undefined);
        return;
      }

      const objectUrl = URL.createObjectURL(doc.fontimg);
      setFontimg(objectUrl);
      console.log("objectUrl", objectUrl)

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [doc]);

  useEffect(() => {
    if (sendKycRequest) {
      if (!doc.backimg) {
        setBackimg(undefined);
        return;
      }

      const objectUrl = URL.createObjectURL(doc.backimg);
      setBackimg(objectUrl);
      console.log("objectUrl", objectUrl)
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [doc]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoc((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
    console.log(event.target.value);
  };
  toast.configure();
  const buttonstyle = {
    background: "linear-gradient(45deg, #eeeff8 30%, #eeeff8 90%)",
    borderRadius: "20px",
    boxShadow: "0",
  };
  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh">
          <div style={{ opacity: 1 }}>
            <Paper
              elevation={1}
              style={{ borderRadius: "10px" }}
              className="w-100 mb-5"
            >
              <div className="card-header font-weight-bold mb-0 text-dark h5">
                Upload New Document
              </div>
              <div className="card-body">
                <Grid container spacing={1} className="ml-n1">
                  <Grid item sm={9} className="p-1">
                    <FormControl className="w-100">
                      <Select
                        value={doc.proof}
                        name="proof"
                        label="Proof of ID"
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        input={<BootstrapInput />}
                        className="mt-0 ml-0"
                        disabled
                      >
                        <MenuItem
                          value="Proof of ID"
                          onClick={() => {
                            setOption(true);
                          }}
                        >
                          Proof of ID
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
                          inputProps={{ "aria-label": "Without label" }}
                          input={<BootstrapInput />}
                          className="mt-0 ml-0"
                          disabled
                        >
                          <MenuItem value="id">ID</MenuItem>
                        </Select>
                      </FormControl>
                    )}

                  </Grid>
                </Grid>
                {doc.proof == "Proof of ID" ? (
                  sendKycRequest.proof1 == false &&
                    kycStatus.master_status == "0" ? (
                    <div className="text-dark w-100 h-100 kyc-status-section padingtop5">
                      <h5 className="text-center font-weight-bold text-dark ">
                        <div>
                          <InfoIcon
                            style={{
                              fontSize: "5rem",
                              color: "rgb(204 207 23)",
                              paddingBottom: "1rem",
                            }}
                          />
                        </div>
                        {kycStatusMessage}
                      </h5>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {doc.proof == "Proof of ID" ? (
                  sendKycRequest.proof1 == false &&
                    kycStatus.master_status == "1" ? (
                    <div className="text-dark w-100 h-100 kyc-status-section padingtop5">
                      <h5 className="text-center font-weight-bold text-dark">
                        <div>
                          <CheckCircleOutlineIcon
                            style={{
                              fontSize: "5rem",
                              color: "rgb(18 219 52)",
                              paddingBottom: "1rem",
                            }}
                          />
                        </div>
                        {kycStatusMessage}
                      </h5>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {doc.proof == "Proof of ID" ? (
                  sendKycRequest.proof1 == false &&
                    kycStatus.master_status == "2" ? (
                    <div className="text-dark w-100 h-100 kyc-status-section padingtop5">
                      <h5 className="text-center font-weight-bold text-dark ">
                        <div>
                          <CancelIcon
                            style={{
                              fontSize: "5rem",
                              color: "rgb(255 3 3)",
                              paddingBottom: "1rem",
                            }}
                          />
                        </div>
                        {kycStatusMessage}
                      </h5>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
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
                        />

                        {!fontimg ? (
                          <label
                            htmlFor="FILE_FRONT_SIDE"
                            className="text-dark font-weight-bold font-size-xs"
                          >
                            UPLOAD
                          </label>
                        ) : (
                          <>
                            {/* {!sendKycRequest.proof1 ? (
                              ""
                            ) : (
                            )} */}
                            <div className="preview-image-section">
                            {
                              (kycData?.master_status == "1") ? "" : <button
                                className="bg-transparent p-0 border-0 image-delete-btn"
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
                            }
                            <CustomImageModal image={fontimg} className='deposit-upload-image-preview1'/> 
                            {/* <img
                              src={fontimg}
                              className="deposit-upload-image-preview1"
                            /> */}
                            </div>

                          </>
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

                        {!backimg ? (
                          <label
                            htmlFor="FILE_BACK_SIDE"
                            className="text-dark font-weight-bold font-size-xs"
                          >
                            UPLOAD
                          </label>
                        ) : (
                          <>
                            {/* {!sendKycRequest.proof1 ? (
                              ""
                            ) : (
                            )} */}
                            <div className="preview-image-section">
                              {
                                (kycData?.master_status == "1") ? "" : <button
                                className="bg-transparent p-0 border-0 image-delete-btn"
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
                              }
                              <CustomImageModal image={backimg} className='deposit-upload-image-preview1'/> 
                            {/* <img
                              src={backimg}
                              className="deposit-upload-image-preview1"
                            /> */}
                            </div>


                          </>
                        )}
                      </div>
                    </Grid>

                  </Grid>
                )}

                <div
                  className="text-dark font-size-xs d-flex justify-content-between align-items-center"
                  style={{ marginTop: "100px" }}
                >
                  <i>
                    (Maximum size of document 5MB) Allow File Formats
                    *jpg, *png, *pdf
                  </i>
                  {
                    (kycData?.master_status == "1") ? <ColorButton
                    onClick={onSubmit}
                    variant="contained"
                    disabled
                    size="medium"
                    className="p-3 pr-4 pl-4 text-center text-capitalize"
                  >
                    Save
                  </ColorButton> :<ColorButton
                    onClick={onSubmit}
                    variant="contained"
                    disabled={!sendKycRequest}
                    size="medium"
                    className="p-3 pr-4 pl-4 text-center text-capitalize"
                  >
                    Save
                  </ColorButton>
                  }
                  

                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycDocument;
