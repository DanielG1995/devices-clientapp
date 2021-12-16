import React, { useEffect } from 'react'
import { Table as TableMaterial, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Device } from '../Utils/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';

export const Table = ({ data, deleteItem, editItem }:
    { data?: Device[], deleteItem: CallableFunction, editItem: CallableFunction }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if ((data?.length || 0) <= rowsPerPage) {
            setPage(0);
        }
    }, [data, rowsPerPage])

    return (
        <div>
            <TableContainer className='border w-100'>
                <TableMaterial stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            <TableCell align="center" colSpan={1}>
                                <h4>
                                    <b>
                                        Name
                                    </b>
                                </h4>
                            </TableCell>
                            <TableCell align="center" colSpan={1}>
                                <h4>
                                    <b>
                                        System
                                    </b>
                                </h4>
                            </TableCell>
                            <TableCell align="center" colSpan={1}>
                                <h4>
                                    <b>
                                        Capacity
                                    </b>
                                </h4>
                            </TableCell>
                            <TableCell align="center" colSpan={1}>
                                <h4>
                                    <b>
                                        Options
                                    </b>
                                </h4>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: Device) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row?.id}>
                                        <TableCell align='left' key={row?.id} >
                                            <h5>
                                                <b >{row.system_name}</b>
                                            </h5>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <h6>
                                                <p>{row.type}</p>
                                            </h6>
                                        </TableCell>
                                        <TableCell align='right'>
                                            <h6>
                                                <p>{row.hdd_capacity} GB</p>
                                            </h6>
                                        </TableCell>
                                        <TableCell align='center' >
                                            <span onClick={() => editItem(row)}><EditIcon color='primary' titleAccess='Edit' className='icon__table m-3' /></span>
                                            <span onClick={() => deleteItem(row?.id)}><Delete color='error' titleAccess='Delete' className='icon__table m-3' /></span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>

                </TableMaterial>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data?.length || 1}
                rowsPerPage={rowsPerPage}
                page={((data?.length || 1) <= rowsPerPage) ? 0 : page}
                onPageChange={(evt, page) => { (handleChangePage(page)) }}
                onRowsPerPageChange={(evt) => handleChangeRowsPerPage(evt)}
            />
        </div>
    )
}
