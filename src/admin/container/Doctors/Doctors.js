import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getDoctorData} from '../../../redux/action/doctors.action'

function Doctors(props) {

    const dispatch = useDispatch()
    const doctorData = useSelector(state=>state.doctors)
    console.log(doctorData)

    useEffect(() => {
        dispatch(getDoctorData())
    },[])
    return (
        <div>
            <p>{doctorData.doctors}</p>
            <h1>Hello Doctors Page</h1>
        </div>
    );
}

export default Doctors;