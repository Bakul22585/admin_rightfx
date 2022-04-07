import React from 'react'
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#ff0000"),
    backgroundColor: "#666666",
    textTransform: "initial",
  
    fontSize: "13px",
    padding: "15px 22px",
    "&:hover": {
      backgroundColor: "#4e4c4c",
    },
  }));
const CustomElement = () => {
  return (
    <div>CustomElement</div>
  )
}

export { CustomElement,ColorButton}