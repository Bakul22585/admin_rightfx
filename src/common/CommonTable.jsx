import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import styled, { keyframes } from 'styled-components';

const CssTextField = styled(TextField)({
});

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };

const CommonTable = (prop) => {

    // const [info, setinfo] = useState({});
    const [clientData, setClientData] = useState([]);
    const [clientLoading, setClientLoading] = useState(false);
    const [clientTotalRows, setClientTotalRows] = useState(0);
    const [clientPerPage, setClientPerPage] = useState(10);
    const [clientSort, setClientSort] = useState(prop.sort);
    const [clientDir, setClientDir] = useState('desc');
    const [clientSearch, setClientSearch] = useState('');
    const [openTableMenus, setOpenTableMenus] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState([]);
    const open = Boolean(anchorEl);

    const handleClientPageChange = page => {
        console.log("page", page);
        fetchClient(page == 1 ? 0 : (page * clientPerPage) - 10);
    };

    const handleClientPerRowsChange = async (newPerPage, page) => {
        console.log(newPerPage, page);
        setClientPerPage(newPerPage);
    };

    const handleClientSort = async (column, sortDirection) => {
        console.log('cusotm sort', (column.id - 1), sortDirection);
        setClientSort(column.id - 1);
        setClientDir(sortDirection);
    };

    const input1 = (event) => {
        const { name, value } = event.target;
        setClientSearch(value);
    };

    const CustomLoader = () => (
        <div style={{ padding: '24px' }}>
            <Spinner />
            <div><center><b>Loading...</b></center></div>
        </div>
    );

    const fetchClient = async page => {
        setClientLoading(true);
        const param = new FormData();
        param.append('user_id', 1);
        param.append('auth_key', 'ea29cf-d34037-e0cdd1');
        param.append('is_app', 1);
        param.append('draw', 0);
        param.append('start', page);
        param.append('length', clientPerPage);
        if (prop.level) {
            param.append('level_id', prop.level);
        }
        if (prop.filter) {
            if (prop.filter.deposit_from) {
                param.append('start_date', prop.filter.deposit_from);
            }
            if (prop.filter.deposit_to) {
                param.append('end_date', prop.filter.deposit_to);
            }
            if (prop.filter.deposit_status) {
                param.append('deposit_status', prop.filter.deposit_status);
            }
            if (prop.filter.withdraw_from) {
                param.append('start_date', prop.filter.withdraw_from);
            }
            if (prop.filter.withdraw_to) {
                param.append('end_date', prop.filter.withdraw_to);
            }
            if (prop.filter.withdraw_status) {
                param.append('withdrawal_status', prop.filter.withdraw_status);
            }
        }
        param.append('order[0][column]', clientSort);
        param.append('order[0][dir]', clientDir);
        if (clientSearch.trim() != '') {
            param.append('search[value]', clientSearch.trim());
        }

        await axios.post(`${prop.url}`, param).then((res) => {
            setClientData(res.data.aaData);
            setClientTotalRows(res.data.iTotalRecords);
            setClientLoading(false);
            if (prop.setResData) {
                prop.setResData(res.data);
            }
        });
    };

    useEffect(() => {
        fetchClient(0);
        console.log('useEffect', prop);
    }, [clientPerPage,
        clientSort,
        clientDir,
        clientSearch,
        prop.level,
        prop.filter,
    ]);
    // console.log(prop);
    return (
        <div>
            <div className='tableSearchField'>
                <CssTextField
                    id="standard-search"
                    label="Search"
                    sx={{ width: "200px" }}
                    variant="standard"
                    name="myclient_search"
                    // value={info.myclient_search}
                    onChange={input1}
                />
            </div>
            <DataTable
                columns={prop.column}
                data={clientData}
                progressPending={clientLoading}
                onSort={handleClientSort}
                sortServer
                pagination
                paginationServer
                paginationTotalRows={clientTotalRows}
                onChangeRowsPerPage={handleClientPerRowsChange}
                onChangePage={handleClientPageChange}
                highlightOnHover
                pointerOnHover
                progressComponent={<CustomLoader />}
            />
        </div>
    )
}

export default CommonTable