import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// import { adddepartmentsData, deletedepartmentsData, getdepartmentsData, updatedepartmentsData } from '../../../redux/action/departments.action';
import DepartmentsForm from './DepartmentsForm';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { adddepartmentsData, deletedepartmentsData, fetchdepartments, updatedepartmentsData } from '../../../redux/slice/departmentSlice';

function Departments(props) {

    const [update, setupdate] = React.useState(null);

    const dispatch = useDispatch()
    const departmentsrData = useSelector(state => state.departments)
    console.log(departmentsrData)

    useEffect(() => {
        dispatch(fetchdepartments())
    }, [])


    const handlesubmit = (data) => {
        if (update) {
            dispatch(updatedepartmentsData(data))
        } else {
            dispatch(adddepartmentsData(data))
        }
        setupdate(null)
    }

    const handleDelete = (id) => {
        console.log("111111111", id);
        dispatch(deletedepartmentsData(id))
    }

    const handleupdate = (data) => {
        setupdate(data)
    }
    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'desc', headerName: 'desc', width: 450 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton aria-label="edit" onClick={() => handleupdate(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),

        }
    ]

    return (
        <>
            <div>
                <h1>Hello departments Page</h1>
                {
                    departmentsrData.isLoading ? <CircularProgress /> :
                        departmentsrData.error ? <p>{departmentsrData.error}</p> :
                            <>
                                <DepartmentsForm onhandlesubmit={handlesubmit} onupdate={update} />

                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={departmentsrData.departments}
                                        columns={columns}
                                        pageSizeOptions={[5, 10]}
                                        checkboxSelection
                                    />
                                </div>
                            </>
                }
            </div>
        </>
    );
}

export default Departments;