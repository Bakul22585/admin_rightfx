import { Button, Grid, Paper } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom';

const CreateRole = () => {
    const { id } = useParams();
    console.log('id', id);
    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    <div style={{ opacity: 1 }}>
                        <Grid container>
                            <Grid item md={12} lg={12} xl={12}>
                                <p className='main-heading'>Create Role</p>
                                <Paper elevation={2} style={{ borderRadius: "10px" }} className='pending-all-15px'>
                                    <div className='create-role-content-section'>
                                        <div className='input-section'>
                                            <input type='text' className='create-role-input' placeholder='Role Name' value={id}/>
                                        </div>
                                        {/* <br/> */}
                                        <div className='permission-table'>
                                            <div className='permission-table-header'>
                                                <label></label>
                                                <label>Add</label>
                                                <label>Add IB</label>
                                                <label>View</label>
                                                <label>Update</label>
                                                <label>Delete</label>
                                                <label>Approve</label>
                                                <label>Reject</label>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Roles</label>
                                                <div>
                                                {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                    
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Users</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Leads</label>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Client Request</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Client</label>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Transactions Deposit</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Transactions Withdraw</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Transactions Internal</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Requests IB</label>
                                                <div>
                                                {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Requests Account</label>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Email Templates</label>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    {(id != undefined) ? <input type='checkbox' className='permission-radio-button' checked/> : <input type='checkbox' className='permission-radio-button'/>}
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Team</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Team Members</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Team Manager</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Requests Leverage</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Campaigns</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Sales Target</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Credit</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Requests Promotions</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Requests Structure</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Currency Rates</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Reports</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body'>
                                                <label>Marketing Links</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className='permission-table-header leads-section'>
                                                <label></label>
                                                <label>Add</label>
                                                <label>Add IB</label>
                                                <label>View</label>
                                                <label>Update</label>
                                                <label>Delete</label>
                                                <label>Approve</label>
                                                <label>Reject</label>
                                                <label>View All</label>
                                                <label>View Assigned</label>
                                                <label>Assign To All</label>
                                                <label>Assign To Sale</label>
                                                <label>Assign To Team</label>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Profile</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Employment</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Bank</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Documents</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Activities</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Notes</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Transaction</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Links</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Leads Agenets</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>

                                            <br/>
                                            <div className='permission-table-header mt5-section'>
                                                <label></label>
                                                <label>MT5</label>
                                                <label>CP Access</label>
                                                <label>Reset MT5 Password</label>
                                                <label>Reset CP Access</label>
                                                <label>Download App</label>
                                                <label>Add Transaction</label>
                                                <label>Link Client</label>
                                                <label>Link Sub IB</label>
                                                <label>Convert To Client</label>
                                                <label>Convert To IB</label>
                                                <label>Link To IB</label>
                                                <label>Client PDF</label>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Client Action</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body leads-section'>
                                                <label>Lead Action</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                            </div>

                                            <br/>
                                            <div className='permission-table-header client-lead-section'>
                                                <label></label>
                                                <label>View</label>
                                                <label>Link</label>
                                                <label>Update</label>
                                                <label>Add Account</label>
                                                <label>Link Account</label>
                                            </div>
                                            <div className='permission-table-body client-lead-section'>
                                                <label>Client Action</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            <div className='permission-table-body client-lead-section'>
                                                <label>Lead Action</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                            
                                            <br/>
                                            <div className='permission-table-header dashboard-section'>
                                                <label></label>
                                                <label>Dashboard</label>
                                                <label>Clients</label>
                                                <label>Leads</label>
                                                <label>Settings</label>
                                                <label>Transaction</label>
                                                <label>Request</label>
                                                <label>Marketing</label>
                                                <label>Report</label>
                                            </div>
                                            <div className='permission-table-body dashboard-section'>
                                                <label>Sidebar</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                            </div>

                                            <br/>
                                            <div className='permission-table-header client-lead-section'>
                                                <label></label>
                                                <label>Leads</label>
                                                <label>Clients</label>
                                                <label>Requests</label>
                                                <label>Transaction</label>
                                                <label>KYC</label>
                                            </div>
                                            <div className='permission-table-body client-lead-section'>
                                                <label>Dashboard Data</label>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button'/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' />
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                                <div>
                                                    <input type='checkbox' className='permission-radio-button' disabled/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='createRoleButton'>
                                            <Button variant="contained" className='btn btn-success'>Create Role</Button>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRole