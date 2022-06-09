import React, { useEffect, useState } from 'react';
// import Highcharts from 'highcharts';
import * as ReactDom from 'react-dom';
import * as Highcharts from 'highcharts/highmaps';
import HighchartsReact from 'highcharts-react-official';
import './dashboard.css';
import { ButtonGroup, FormControl, Grid, MenuItem, Select } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { ColorButton } from "../common/CustomElement";
import { Button } from "@mui/material";
import mapDataWorld from '@highcharts/map-collection/custom/world.geo.json';
import Chart from "react-apexcharts";
import CommonFilter from '../common/CommonFilter';
import { Url } from '../global';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const WorldMap = require('react-world-map');

var data: [string, number][] = [
    ['fo', 0],
    ['um', 1],
    ['us', 2],
    ['jp', 3],
    ['sc', 4],
    ['in', 500],
    ['fr', 6],
    ['fm', 7],
    ['cn', 8],
    ['pt', 9],
    ['sw', 10],
    ['sh', 11],
    ['br', 12],
    ['ki', 13],
    ['ph', 14],
    ['mx', 15],
    ['es', 16],
    ['bu', 17],
    ['mv', 18],
    ['sp', 19],
    ['gb', 20],
    ['gr', 21],
    ['as', 22],
    ['dk', 23],
    ['gl', 24],
    ['gu', 25],
    ['mp', 26],
    ['pr', 27],
    ['vi', 28],
    ['ca', 29],
    ['st', 30],
    ['cv', 31],
    ['dm', 32],
    ['nl', 33],
    ['jm', 34],
    ['ws', 35],
    ['om', 36],
    ['vc', 37],
    ['tr', 38],
    ['bd', 39],
    ['lc', 40],
    ['nr', 41],
    ['no', 42],
    ['kn', 43],
    ['bh', 44],
    ['to', 45],
    ['fi', 46],
    ['id', 47],
    ['mu', 48],
    ['se', 49],
    ['tt', 50],
    ['my', 51],
    ['pa', 52],
    ['pw', 53],
    ['tv', 54],
    ['mh', 55],
    ['cl', 56],
    ['th', 57],
    ['gd', 58],
    ['ee', 59],
    ['ag', 60],
    ['tw', 61],
    ['bb', 62],
    ['it', 63],
    ['mt', 64],
    ['vu', 65],
    ['sg', 66],
    ['cy', 67],
    ['lk', 68],
    ['km', 69],
    ['fj', 70],
    ['ru', 71],
    ['va', 72],
    ['sm', 73],
    ['kz', 74],
    ['az', 75],
    ['tj', 76],
    ['ls', 77],
    ['uz', 78],
    ['ma', 79],
    ['co', 80],
    ['tl', 81],
    ['tz', 82],
    ['ar', 83],
    ['sa', 84],
    ['pk', 85],
    ['ye', 86],
    ['ae', 87],
    ['ke', 88],
    ['pe', 89],
    ['do', 90],
    ['ht', 91],
    ['pg', 92],
    ['ao', 93],
    ['kh', 94],
    ['vn', 95],
    ['mz', 96],
    ['cr', 97],
    ['bj', 98],
    ['ng', 99],
    ['ir', 100],
    ['sv', 101],
    ['sl', 102],
    ['gw', 103],
    ['hr', 104],
    ['bz', 105],
    ['za', 106],
    ['cf', 107],
    ['sd', 108],
    ['cd', 109],
    ['kw', 110],
    ['de', 111],
    ['be', 112],
    ['ie', 113],
    ['kp', 114],
    ['kr', 115],
    ['gy', 116],
    ['hn', 117],
    ['mm', 118],
    ['ga', 119],
    ['gq', 120],
    ['ni', 121],
    ['lv', 122],
    ['ug', 123],
    ['mw', 124],
    ['am', 125],
    ['sx', 126],
    ['tm', 127],
    ['zm', 128],
    ['nc', 129],
    ['mr', 130],
    ['dz', 131],
    ['lt', 132],
    ['et', 133],
    ['er', 134],
    ['gh', 135],
    ['si', 136],
    ['gt', 137],
    ['ba', 138],
    ['jo', 139],
    ['sy', 140],
    ['mc', 141],
    ['al', 142],
    ['uy', 143],
    ['cnm', 144],
    ['mn', 145],
    ['rw', 146],
    ['so', 147],
    ['bo', 148],
    ['cm', 149],
    ['cg', 150],
    ['eh', 151],
    ['rs', 152],
    ['me', 153],
    ['tg', 154],
    ['la', 155],
    ['af', 156],
    ['ua', 157],
    ['sk', 158],
    ['jk', 159],
    ['bg', 160],
    ['qa', 161],
    ['li', 162],
    ['at', 163],
    ['sz', 164],
    ['hu', 165],
    ['ro', 166],
    ['ne', 167],
    ['lu', 168],
    ['ad', 169],
    ['ci', 170],
    ['lr', 171],
    ['bn', 172],
    ['iq', 173],
    ['ge', 174],
    ['gm', 175],
    ['ch', 176],
    ['td', 177],
    ['kv', 178],
    ['lb', 179],
    ['dj', 180],
    ['bi', 181],
    ['sr', 182],
    ['il', 183],
    ['ml', 184],
    ['sn', 185],
    ['gn', 186],
    ['zw', 187],
    ['pl', 188],
    ['mk', 189],
    ['py', 190],
    ['by', 191],
    ['cz', 192],
    ['bf', 193],
    ['na', 194],
    ['ly', 195],
    ['tn', 196],
    ['bt', 197],
    ['md', 198],
    ['ss', 199],
    ['bw', 200],
    ['bs', 201],
    ['nz', 202],
    ['cu', 203],
    ['ec', 204],
    ['au', 205],
    ['ve', 206],
    ['sb', 207],
    ['mg', 208],
    ['is', 209],
    ['eg', 210],
    ['kg', 211],
    ['np', 212]
];

const options: Highcharts.Options = {
    colors: ['rgba(227, 64, 117, 1)', 'rgba(227,64,117,0.2)', 'rgba(227,64,117,0.4)',
        'rgba(227,64,117,0.5)', 'rgba(227,64,117,0.6)', 'rgba(227,64,117,0.8)', 'rgba(227,64,117,1)'],
    title: {
        text: ""
    },
    colorAxis: {
        dataClasses: [{
            to: 3,
            color: 'rgba(227, 64, 117, 0.1)'
        }, {
            from: 3,
            to: 10,
            color: 'rgba(227,64,117,0.2)'
        }, {
            from: 10,
            to: 30,
            color: 'rgba(227,64,117,0.4)'
        }, {
            from: 30,
            to: 100,
            color: 'rgba(227,64,117,0.5)'
        }, {
            from: 100,
            to: 300,
            color: 'rgba(227,64,117,0.6)'
        }, {
            from: 300,
            to: 1000,
            color: 'rgba(227,64,117,0.8)'
        }, {
            from: 1000,
            color: 'rgba(227, 64, 117, 1)'
        }]
    },
    series: [{
        type: 'map',
        mapData: mapDataWorld,
        data: data,
    }],
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: "bottom"
        }
    },
}

var dailySalesOptions = {
    series: [{
        name: 'Deposit',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'Withdraw',
        data: [11, 32, 45, 32, 34, 52, 41]
    }],
    chart: {
        height: 350,
        type: 'area'
    },
    colors: ['#008FFB', '#00E396', '#b11233'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    },
};

var ibSummaryOptions = {
    series: [{
        name: 'No of IBs',
        data: [31, 40, 28, 51, 42, 109, 100]
    }, {
        name: 'Rebate',
        data: [11, 32, 45, 32, 34, 52, 41]
    }, {
        name: 'Commission',
        data: [5, 10, 15, 20, 25, 15, 10]
    }],
    chart: {
        height: 350,
        type: 'area'
    },
    colors: ['#008FFB', '#00E396', '#b11233'],
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },
    xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        },
    },
};

const Dashboard = (prop) => {

    const navigate = useNavigate();
    const [selected, onSelect] = useState(null);
    const [fullData, setFullData] = useState({})
    const [pageLoader, setPageLoader] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('login') == "true") {
            prop.setLogin("true");
        }
        const param = new FormData();
        param.append("is_app", 1);
        param.append("AADMIN_LOGIN_ID", 1);
        axios
            .post(Url + "/ajaxfiles/dashboard.php", param)
            .then((res) => {
                if (res.data.message == "Session has been expired") {
                    localStorage.setItem("login", true);
                    prop.setLogin("true");
                    // navigate("/");
                } else {
                    console.log("asd", res.data)
                    setFullData(res.data);
                    setPageLoader(false)
                }
            });
    }, [])
    console.log("fullData", fullData)

    return (
        <div>
            <div className="app-content--inner">
                <div className="app-content--inner__wrapper mh-100-vh">
                    {
                        pageLoader == true ? <div className="loader">
                            <div className="clock">
                                <div className="pointers"></div>
                            </div>
                        </div> :
                            <div style={{ opacity: 1 }}>
                                {/* <CommonFilter />
                        <br/> */}
                                <Grid container spacing={3}>
                                    <Grid item md={12} lg={12} xl={12} sm={12} className='margin-bottom-30px'>
                                        <Grid container spacing={3}>
                                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                                <p className='main-heading'>Dashboard&nbsp;</p>
                                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                                    <CardContent className="py-3">
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12} md={12} lg={12}>
                                                                <div className='section-header'>
                                                                    <p>&nbsp;</p>
                                                                    <ButtonGroup disableElevation variant="contained" className='action-group-button'>
                                                                        <Button>Leads</Button>
                                                                        <Button className='button-group-off'>Clients</Button>
                                                                    </ButtonGroup>
                                                                </div>
                                                                <div className='chartSection'>
                                                                    <HighchartsReact
                                                                        options={options}
                                                                        highcharts={Highcharts}
                                                                        constructorType={'mapChart'}
                                                                    />
                                                                </div>
                                                            </Grid>
                                                            {/* <Grid item sm={6} md={3}>
                                                    </Grid> */}
                                                        </Grid>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                                <p className='main-heading'>&nbsp;</p>
                                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                                    <CardContent className="py-3">
                                                        <div className='section-header'>
                                                            <p className='section-title'>Reminders</p>
                                                            <p className='section-count'>4</p>
                                                        </div>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12} md={12} lg={12}>
                                                                <div className='remainderContentSection'>
                                                                    <div className='remainder'>
                                                                        <i className="material-icons">textsms</i>
                                                                        <div className='content'>
                                                                            <p>remind me to tomorrow call to him</p>
                                                                            <p>Test Test</p>
                                                                            <p>01/12/2022</p>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <div className='remainder'>
                                                                        <i className="material-icons">textsms</i>
                                                                        <div className='content'>
                                                                            <p>remind me to tomorrow call to him</p>
                                                                            <p>Test Test</p>
                                                                            <p>01/12/2022</p>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <div className='remainder'>
                                                                        <i className="material-icons">textsms</i>
                                                                        <div className='content'>
                                                                            <p>remind me to tomorrow call to him</p>
                                                                            <p>Test Test</p>
                                                                            <p>01/12/2022</p>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <div className='remainder'>
                                                                        <i className="material-icons">textsms</i>
                                                                        <div className='content'>
                                                                            <p>remind me to tomorrow call to him</p>
                                                                            <p>Test Test</p>
                                                                            <p>01/12/2022</p>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                    <div className='moreRemainderSection'>
                                                                        <span>More</span>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                                <p className='main-heading'>&nbsp;</p>
                                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                                    <CardContent className="py-3">
                                                        <div className='section-header'>
                                                            <p className='section-title'>Daily Sales</p>
                                                            <ButtonGroup disableElevation variant="contained" className='action-group-button'>
                                                                <Button>Week</Button>
                                                                <Button className='button-group-off'>Month</Button>
                                                                <Button className='button-group-off'>Year</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12} md={12} lg={12}>
                                                                <div className='remainderContentSection'>
                                                                    <Chart
                                                                        options={dailySalesOptions}
                                                                        series={dailySalesOptions.series}
                                                                        type="area" />
                                                                    <div className='bottom-label-section'>
                                                                        <div className='label'>
                                                                            <span className='blur-dot-chart'></span> Total Deposit : <b>0</b>
                                                                        </div>
                                                                        <div className='label'>
                                                                            <span className='green-dot-chart'></span> Total Withdraw : <b>0</b>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                                <p className='main-heading'>&nbsp;</p>
                                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                                    <CardContent className="py-3">
                                                        <div className='section-header'>
                                                            <p className='section-title'>IB Summary</p>
                                                            <ButtonGroup disableElevation variant="contained" className='action-group-button'>
                                                                <Button>Week</Button>
                                                                <Button className='button-group-off'>Month</Button>
                                                                <Button className='button-group-off'>Year</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12} md={12} lg={12}>
                                                                <div className='remainderContentSection'>
                                                                    <Chart
                                                                        options={ibSummaryOptions}
                                                                        series={ibSummaryOptions.series}
                                                                        type="area" />
                                                                    <div className='bottom-label-section'>
                                                                        <div className='label'>
                                                                            <span className='blur-dot-chart'></span> Total Deposit : <b>0</b>
                                                                        </div>
                                                                        <div className='label'>
                                                                            <span className='green-dot-chart'></span> Total Withdraw : <b>0</b>
                                                                        </div>
                                                                        <div className='label'>
                                                                            <span className='red-dot-chart'></span> Total Commission : <b>0</b>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                                <p className='main-heading'>&nbsp;</p>
                                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                                    <CardContent className="py-3">
                                                        <div className='section-header'>
                                                            <p className='section-title'>Request</p>
                                                        </div>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12} md={12} lg={12}>
                                                                <div className='remainderContentSection'>
                                                                    <div className='th-div'>
                                                                        <label></label>
                                                                        <label>PENDING</label>
                                                                        <label>REJECTED</label>
                                                                        <label>APPROVED</label>
                                                                    </div>
                                                                    <div className='th-div td-div'>
                                                                        <label>ADDITIONAL ACCOUNT</label>
                                                                        <label>1</label>
                                                                        <label>2</label>
                                                                        <label>2</label>
                                                                    </div>
                                                                    <div className='th-div td-div'>
                                                                        <label>IB REQUEST</label>
                                                                        <label>7</label>
                                                                        <label>2</label>
                                                                        <label>120</label>
                                                                    </div>
                                                                    <div className='th-div td-div'>
                                                                        <label>LEVERAGE</label>
                                                                        <label>1</label>
                                                                        <label>0</label>
                                                                        <label>6</label>
                                                                    </div>
                                                                    <div className='th-div td-div'>
                                                                        <label>STRUCTURE</label>
                                                                        <label>1</label>
                                                                        <label>1</label>
                                                                        <label>2</label>
                                                                    </div>
                                                                    <div className='th-div td-div'>
                                                                        <label>PROMOTIONS</label>
                                                                        <label>3</label>
                                                                        <label>1</label>
                                                                        <label>4</label>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                                <p className='main-heading'>&nbsp;</p>
                                                <Grid container spacing={3}>
                                                    <Grid item md={6} lg={6} xl={6} sm={12}>
                                                        <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                                            <CardContent className="py-3">
                                                                <div className='section-header'>
                                                                    <p className='section-title'>Leads</p>
                                                                </div>
                                                                <Grid container spacing={2}>
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <div className='leadsContentSection'>
                                                                            <div className='allLeadsNumner'>
                                                                                <b>21</b>
                                                                                <p>All</p>
                                                                            </div>
                                                                            <div className='leadRightContentSection'>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>0</span>
                                                                                    <p>New</p>
                                                                                </div>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>19</span>
                                                                                    <p>Unassigned</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item md={6} lg={6} xl={6} sm={12}>
                                                        <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                                            <CardContent className="py-3">
                                                                <div className='section-header'>
                                                                    <p className='section-title'>Clients</p>
                                                                </div>
                                                                <Grid container spacing={2}>
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <div className='leadsContentSection'>
                                                                            <div className='allLeadsNumner'>
                                                                                <b>227</b>
                                                                                <p>All</p>
                                                                            </div>
                                                                            <div className='leadRightContentSection'>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>0</span>
                                                                                    <p>New</p>
                                                                                </div>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>209</span>
                                                                                    <p>Unassigned</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Paper>
                                                    </Grid>
                                                    <Grid item md={12} lg={12} xl={12} sm={12}>
                                                        <Paper elevation={2} style={{ borderRadius: "10px" }}>
                                                            <CardContent className="py-3">
                                                                <div className='section-header'>
                                                                    <p className='section-title'>KYC Documents</p>
                                                                </div>
                                                                <Grid container spacing={2}>
                                                                    <Grid item sm={12} md={12} lg={12}>
                                                                        <div className='leadsContentSection kyc-document'>
                                                                            <div className='leadRightContentSection'>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>9</span>
                                                                                    <p>Pending Approval</p>
                                                                                </div>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>34</span>
                                                                                    <p>Approval (Unfunded)</p>
                                                                                </div>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>0</span>
                                                                                    <p>Rejected KYC</p>
                                                                                </div>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>1</span>
                                                                                    <p>Missing KYC</p>
                                                                                </div>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>112</span>
                                                                                    <p>No KYC (Unfunded)</p>
                                                                                </div>
                                                                                <div className='roundedShapeContent'>
                                                                                    <span>1</span>
                                                                                    <p>Expired Documents</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={6} lg={6} xl={6} sm={12}>
                                                <p className='main-heading'>&nbsp;</p>
                                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                                    <CardContent className="py-3">
                                                        <div className='section-header'>
                                                            <p className='section-title'>Transaction</p>
                                                        </div>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12} md={12} lg={12}>
                                                                <div className='remainderContentSection'>
                                                                    <div className='th-div'>
                                                                        <label></label>
                                                                        <label>PENDING</label>
                                                                        <label>REJECTED</label>
                                                                        <label>APPROVED</label>
                                                                    </div>
                                                                    <div className='th-div td-div'>
                                                                        <label>DEPOSIT</label>
                                                                        <label>{fullData.all_transaction.deposit_requests.deposit_pending_request}</label>
                                                                        <label>{fullData.all_transaction.deposit_requests.deposit_rejected_request}</label>
                                                                        <label>{fullData.all_transaction.deposit_requests.deposit_approved_request}</label>
                                                                    </div>
                                                                    <div className='th-div td-div'>
                                                                        <label>WITHDRAWALS</label>
                                                                        <label>{ }</label>
                                                                        <label>1</label>
                                                                        <label>15</label>
                                                                    </div>
                                                                    <div className='th-div td-div'>
                                                                        <label>INTERNAL TRANSFER</label>
                                                                        <label>{fullData.all_transaction.transfer_requests.transfer_pending_request}</label>
                                                                        <label>{fullData.all_transaction.transfer_requests.transfer_rejected_request}</label>
                                                                        <label>{fullData.all_transaction.transfer_requests.transfer_approved_request}</label>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>
                                            <Grid item md={12} lg={12} xl={12} sm={12}>
                                                <p className='main-heading'>&nbsp;</p>
                                                <Paper elevation={2} style={{ borderRadius: "10px", height: '100%' }}>
                                                    <CardContent className="py-3">
                                                        <div className='section-header'>
                                                            <p className='section-title montly-sales-target'>Monthly Sales Target</p>
                                                            <div className='section-action-button'>
                                                                <span className='action'>ACCOUNT TARGET</span>
                                                                <span>MONEY IN</span>
                                                                <span>MONEY OUT</span>
                                                                <span>NET</span>
                                                            </div>
                                                        </div>
                                                        <Grid container spacing={2}>
                                                            <Grid item sm={12} md={12} lg={12}>
                                                                <div className='remainderContentSection'>

                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Dashboard