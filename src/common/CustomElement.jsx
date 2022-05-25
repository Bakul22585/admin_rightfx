import React from 'react'
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { InputBase } from '@mui/material';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#ff0000"),
  backgroundColor: "#2a3f73",
  textTransform: "initial",

  fontSize: "13px",
  padding: "15px 22px",
  "&:hover": {
    backgroundColor: "#243a6f",
  },
}));
const CustomElement = () => {
  return (
    <div>CustomElement</div>
  )
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
    fontSize: 16,
    padding: "8px 26px 8px 10px",
    marginTop: 0,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Cairo, sans-serif",
    ].join(","),
    "&:hover": {
      borderColor: "#2A3F73;",
    },
    "&:focus": {
      borderRadius: 9,
      borderColor: "#2A3F73;",
      border: "2px solid #2A3F73;",
    },
  },
}));


export { CustomElement,BootstrapInput, ColorButton }