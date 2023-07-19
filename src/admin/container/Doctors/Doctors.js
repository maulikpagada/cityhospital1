import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorData } from '../../../redux/action/doctors.action'
import { DataGrid } from '@mui/x-data-grid';

function Doctors(props) {

    const dispatch = useDispatch()
    const doctorData = useSelector(state => state.doctors)
    console.log(doctorData)

    useEffect(() => {
        dispatch(getDoctorData())
    }, [])

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
    ]

    return (
        <div>
            <h1>Hello Doctors Page</h1>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={doctorData.doctors}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default Doctors;