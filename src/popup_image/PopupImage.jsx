import './popup_image.css';
import React, { useEffect, useState } from "react";
import { Button, CardContent, FormControl, Grid, Input, MenuItem, Paper, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const PopupImage = () => {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Popup Image</p>

                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <div className='actionGroupButton'>
                                        {/* <Button variant="contained" className='add-faq' onClick={handleClickOpen}>Add</Button> */}
                                    </div>
                                    <br />
                                    <CardContent className="py-3">
                                        <Grid container spacing={2}>
                                            <Grid item sm={12} md={12} lg={12}>
                                            <div className='image-center-section'>
                                                <label htmlFor="contained-button-file" className='fileuploadButton'>
                                                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={onSelectFile} />
                                                    {selectedFile ? <img src={preview} /> : <Button variant="contained" component="span">
                                                        <i className="material-icons">backup</i>&nbsp;Upload
                                                    </Button>}
                                                </label>
                                            </div>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupImage