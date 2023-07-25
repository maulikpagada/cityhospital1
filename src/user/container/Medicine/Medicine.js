import React, { useEffect, useState } from 'react';
import ListingMed from './ListingMed';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicineData } from '../../../redux/action/medicine.action';
import { addToCart } from '../../../redux/action/cart.action';

function Medicine(props) {

    const [data, setdata] = useState([]);
    const [fdata, setFdata] = useState()

    const dispatch = useDispatch();
    const medicine = useSelector(state => state.medicine)


    useEffect(() => {

        // let localdata = JSON.parse(localStorage.getItem("medicines"));

        // setdata(localdata)

        // console.log(localdata);

        dispatch(getMedicineData())

    }, [])

    const handlesearch = (value) => {
        console.log(value);
        let fmdata = medicine.medicine

        if (value !== "") {
            let medicine = fmdata.filter((m) => (
                m.name.toLowerCase().includes(value.toLowerCase()) ||
                m.price.toString().includes(value) ||
                m.expiry.toString().includes(value) ||
                m.desc.toString().includes(value))
            );
            setFdata(medicine)
        } else {
            setFdata()
        }
    }

    const handleCart = (id) => {
        dispatch(addToCart(id))
        console.log("handleCart", id);
    }

    return (
        <div className='container'>
            <div className='row'>
                <input type="text" placeholder='Search Medicine' onChange={(e) => handlesearch(e.target.value)} />

                <ListingMed 
                    mdata={fdata ? fdata : medicine.medicine} 
                    handleCart1={handleCart}
                />
            </div>
        </div>
    );
}

export default Medicine;