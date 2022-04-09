import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
});

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

    const handleClick = (event, index) => {
        console.log(event.currentTarget.getAttribute('id'), index);
        let tableMenus = [...openTableMenus];
        tableMenus[index] = event.currentTarget;
        setOpenTableMenus(tableMenus);
    };

    const handleClose = (index) => {
        let tableMenus = [...openTableMenus];
        tableMenus[index] = null;
        setOpenTableMenus(tableMenus);
    };

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
        param.append('order[0][column]', clientSort);
        param.append('order[0][dir]', clientDir);
        if (clientSearch.trim() != '') {
            param.append('search[value]', clientSearch.trim());
        }

        await axios.post(`${prop.url}`, param).then((res) => {
            setClientData(res.data.aaData);
            setClientTotalRows(res.data.iTotalRecords);
            setClientLoading(false);
        });
    };

    useEffect(() => {
        fetchClient(0);
        console.log('useEffect', prop);
    }, [clientPerPage,
        clientSort,
        clientDir,
        clientSearch,]);
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
            />
        </div>
    )
}

export default CommonTable