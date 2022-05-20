import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import { Button, Grid, Input, Paper } from "@mui/material";
import TopButton from "../../customComponet/TopButton";
import './ticket.css';
import { BootstrapInput, ColorButton } from "../../customComponet/CustomElement";
import { Url } from "../../../global";

const ViewTicket = () => {

  const navigate = useNavigate()
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState();
  const [form, setForm] = useState({
    message: "",
    file: "",
    isLoader: false
  });
  const [viewTicketData, setViewTicketData] = useState({
    data: {}
  });
  toast.configure();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  useEffect(() => {
    fetchViewTicketDetails();
  }, [])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setForm({ ...form, file: e.target.files[0] });
    setSelectedFile(e.target.files[0])
  }

  const fetchViewTicketDetails = async () => {
    const param = new FormData();
    /* param.append("is_app", '1');
    param.append("user_id", '1106');
    param.append("auth_key", '300966-0f2f55-7e7d62'); */
    param.append("action", 'view_support_ticket');
    param.append("ticket_id", id);
    await axios
      .post(`${Url}/ajaxfiles/common_api.php`, param)
      .then((res) => {
        if (res.data.message == "Session has been expired") {
          navigate("/");
        }
        if (res.data.status == "error") {
          toast.error(res.data.message);
        } else {
          console.log(res.data);
          if (res.data.data.length > 0) {
            viewTicketData.data = res.data.data[0];
            setViewTicketData({ ...viewTicketData });
            console.log('view ticket', viewTicketData.data);
          }
        }
      });
  }

  const sendMessage = async () => {
    if (form.message == "") {
      toast.error("Please enter message");
    } else {
      form.isLoader = true;
      setForm({ ...form });
      const param = new FormData();
      /* param.append("is_app", '1');
      param.append("user_id", '1106');
      param.append("auth_key", '300966-0f2f55-7e7d62'); */
      param.append("ticketChatID", id);
      param.append("ticketTitle", viewTicketData.data.tickettitle);
      param.append("subject", viewTicketData.data.subject);
      param.append("ticketBody", form.message);
      if (form.file != "") {
        param.append("attachment", form.file);
      }
      await axios
        .post(`${Url}/ajaxfiles/replay_ticket.php`, param)
        .then((res) => {
          if (res.data.message == "Session has been expired") {
            navigate("/");
          }
          form.isLoader = false;
          setForm({ ...form });
          if (res.data.status == "error") {
            toast.error(res.data.message);
          } else {
            console.log(res.data);
            setSelectedFile(undefined);
            setForm({
              message: "",
              file: "",
              isLoader: false
            });
            fetchViewTicketDetails();
          }
        });
    }
  }

  return (
    <div>
      <div className="app-content--inner">
        <div className="app-content--inner__wrapper mh-100-vh view-ticket-page">
          <div style={{ opacity: 1 }}>
            <Grid container>
              <Grid item sm={12}></Grid>
              <Grid item xl={1}></Grid>
              <Grid item xl={10} md={12} lg={12}>
                <TopButton />
                <Grid container>
                  <Grid item md={12}>
                    <Paper
                      elevation={1}
                      style={{ borderRadius: "10px" }}
                      className="w-100 mb-5">
                      <div className="view-ticket card-header">
                        <div>
                          <div>
                            <label className="font-weight-bold mb-0 text-dark font-size-18">
                              View Ticket - {(viewTicketData.data.tickettitle) ? viewTicketData.data.tickettitle : ""}
                            </label>
                          </div>
                          <div>
                            <label className="mb-0 text-dark">
                              Subject : {(viewTicketData.data.subject) ? viewTicketData.data.subject : ""}
                            </label>
                          </div>
                        </div>
                        <div>
                          <label className="ticket-status">Ticket Open</label>
                        </div>
                      </div>
                      <div className="divider"></div>
                      <div className="card-body position-relative pt-0">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            className="d-flex position-relative mh-150 w-100"
                          >
                            <Paper
                              elevation={0}
                              style={{ borderRadius: "10px" }}
                              className="w-100"
                            >
                              <div className="content-area">
                                {(viewTicketData.data.conversation) ?
                                  viewTicketData.data.conversation.map((item) => {
                                    if (item.position == "right") {
                                      return (
                                        <div className="chat right-side">
                                          <div className="chat-body">
                                            <div className="chat-text">
                                              <p>{item.ticketconversation}</p>
                                            </div>
                                          </div>
                                          <div className="chat-avatar">
                                            <a className="avatar">
                                              <img src={item.avtar} class="circle" alt="avatar" />
                                            </a>
                                          </div>
                                        </div>
                                      );
                                    } else {
                                      return (
                                        <div className="chat left-side">
                                          <div className="chat-avatar">
                                            <a className="avatar">
                                              <img src={item.avtar} class="circle" alt="avatar" />
                                            </a>
                                          </div>
                                          <div className="chat-body">
                                            <div className="chat-text">
                                              <p>{item.ticketconversation}</p>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  })
                                  : ""}

                                {/* <div className="chat left-side">
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br /> hii</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="chat right-side">
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br />hiii</p>
                                    </div>
                                  </div>
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                </div>
                                <div className="chat left-side">
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br /> hii</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="chat right-side">
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br />hiii</p>
                                    </div>
                                  </div>
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                </div>
                                <div className="chat left-side">
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br /> hii</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="chat right-side">
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br />hiii</p>
                                    </div>
                                  </div>
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                </div>
                                <div className="chat left-side">
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br /> hii</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="chat right-side">
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br />hiii</p>
                                    </div>
                                  </div>
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                </div>
                                <div className="chat left-side">
                                  <div className="chat-avatar">
                                    <a className="avatar">
                                      <img src="http://0.gravatar.com/avatar/ca1028e62523b9861bd55d4f37a4b891?s=96&amp;d=mm&amp;r=g" class="circle" alt="avatar" />
                                    </a>
                                  </div>
                                  <div className="chat-body">
                                    <div className="chat-text">
                                      <p>test <br /> hii</p>
                                    </div>
                                  </div>
                                </div> */}
                              </div>
                            </Paper>
                          </Grid>
                        </Grid>
                      </div>
                      <hr />
                      <div className="action-section">
                        <div className="input-section">
                          <BootstrapInput
                            name="title"
                            value={form.message}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                message: e.target.value,
                              })
                            }}
                            placeholder="Send Message"
                            displayEmpty
                            inputProps={{
                              "aria-label": "Without label",
                            }}
                            sx={{ width: '100%' }}
                          />
                          {(form.isLoader) ? <ColorButton className="send-message-disabled-button" disabled><svg class="spinner" viewBox="0 0 50 50">
                            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                          </svg></ColorButton> : <ColorButton className="send-message" onClick={sendMessage}><i className="material-icons">send</i> &nbsp;Send</ColorButton>}
                          {(form.isLoader) ? <ColorButton className="send-message-disabled-button" disabled><svg class="spinner" viewBox="0 0 50 50">
                            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                          </svg></ColorButton> : <label htmlFor="contained-button-file" className='ticket-file-upload'>
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={onSelectFile} />
                            {selectedFile ? <img src={preview} className='deposit-upload-image-preview' /> : <Button className="site-button-color" variant="contained" component="span">
                              <i className="material-icons">backup</i>&nbsp;Upload
                            </Button>}
                          </label>}

                        </div>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTicket;
