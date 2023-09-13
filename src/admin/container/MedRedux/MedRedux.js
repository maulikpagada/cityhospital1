import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
// import { addMedicineData, deleteMedicineData, updateMedicineData } from '../../../redux/action/medicine.action';
import MedReduxForm from './MedReduxForm';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addMedicineData, deleteMedicineData, getMedicineData, updateMedicineData } from '../../../redux/slice/medicineSlice';

function MedRedux(props) {

    const [update, setupdate] = React.useState(null);

    const dispatch = useDispatch()
    const medicineData = useSelector(state => state.medicines)
    console.log(medicineData)

    useEffect(() => {
        dispatch(getMedicineData())
    }, [])

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteMedicineData(id))
    }

    const handleupdate = (data) => {
        setupdate(data)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'expiry', headerName: 'expiry', width: 130 },
        { field: 'desc', headerName: 'desc', width: 230 },
        {
            field: 'prec', headerName: 'Image', width: 130, height: 80,
            renderCell: (params) => {
                console.log(params.row);
                return (
                    <div>
                        <img src={params.row.prec} alt='' class="img-thumbnail" height="70px" width="50px" />
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


    const handlesubmit = (data) => {
        if (update) {
            dispatch(updateMedicineData(data))
        } else {
            dispatch(addMedicineData(data))
        }
        setupdate(null)
    }
    return (
        <div>
            <h1>Hello medicine Page</h1>

            <MedReduxForm onhandlesubmit={handlesubmit} onupdate={update} />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={medicineData.medicines}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />

            </div>
        </div>
    );
}

export default MedRedux;