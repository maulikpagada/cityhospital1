import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DepartmentsForm from './DepartmentsForm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup'
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { adddep, deletedep, getdep, updatedep } from '../../../redux/slice/departmentSlice';

function Departments(props) {

    const [update, setupdate] = React.useState(null);

    const dispatch = useDispatch()
    const departmentsrData = useSelector(state => state.departments)
    console.log(departmentsrData)

    useEffect(() => {
        dispatch(getdep())
    }, [])

    const handleDelete = (data) => {
        console.log("111111111", data);
        dispatch(deletedep(data))
    }

    const handleupdate = (data) => {
        setupdate(data)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'desc', headerName: 'desc', width: 130 },
        {
            field: 'prec', headerName: 'Image', width: 130, height: 80,
            renderCell: (params) => {
                console.log(params.row);
                return (
                    <div>
                        <img src={params.row.prec} alt='' class="img-thumbnail"  height="70px" width="50px"/>
                    </div>
                )
            }
        },

        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton aria-label="edit" onClick={() => handleupdate(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),

        }
    ]

    const handleSubmit = (data) => {
        if (update) {
            dispatch(updatedep(data))
        } else {
            dispatch(adddep(data))
        }

        setupdate(null)
    }

    return (
        <>

        <DepartmentsForm onhandlesubmit={handleSubmit} onupdate={update} />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={departmentsrData.departments}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}

export default Departments;