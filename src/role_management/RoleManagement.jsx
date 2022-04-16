import './role_management.css';
import React, { useState } from "react";
import { Button, Grid, Paper} from "@mui/material";
import CommonTable from '../common/CommonTable';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";

const RoleManagement = () => {

    const column = [
        {
            name: 'SR.NO',
            selector: row => {
                return <span>{row.sr_no}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'ROLE NAME',
            selector: row => {
                return <span title={row.role_name}>{row.role_name}</span>
            },
            sortable: true,
            reorder: true,
            grow: 0.1,
        },
        {
            name: 'DESCRIPTION',
            selector: row => { return <span title={row.role_description}>{row.role_description}</span> },
            sortable: true,
            reorder: true,
            grow: 0.5,
        },
        {
            name: 'Action',
            button: true,
            cell: row => {
                return <div className='actionButtonGroup'>
                    <Button
                        className='btn-edit'
                        onClick={(event) => handleContextClick(event, row.sr_no)}
                        {...row}
                        style={{ color: 'rgb(144 145 139)' }}>
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>
                    <Button
                        className='btn-close'
                        onClick={(event) => handleContextClick(event, row.sr_no)}
                        {...row}
                        style={{ color: 'rgb(144 145 139)' }}>
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </Button>
                </div>
            },
            ignoreRowClick: true,
            allowOverflow: true
        }
    ];

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [openTableMenus, setOpenTableMenus] = useState([]);

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

    const gotoRoleCreate = (e) => {
        console.log('goto profile page', e);
        navigate("/createRole");
    }

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Role Management</p>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <div className='actionGroupButton'>
                                        <Button variant="contained" onClick={gotoRoleCreate}>Add Role</Button>
                                    </div>
                                    <br />
                                    <CommonTable url='https://alphapixclients.com/forex/admin/datatable/role_list.php' column={column} sort='0' />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoleManagement