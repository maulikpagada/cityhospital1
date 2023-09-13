import React, { useContext, useEffect, useState } from 'react';
import ListingMed from './ListingMed';
import { useDispatch, useSelector } from 'react-redux';
// import { getMedicineData } from '../../../redux/action/medicine.action';
import { addtocart } from '../../../redux/slice/cartSlice';
import { ThemeContext } from '../../../context/ThemeContext';
import { addfav } from '../../../redux/action/myfav.action';
import { getMedicineData } from '../../../redux/slice/medicineSlice';
// import { addToCart } from '../../../redux/action/cart.action';

function Medicine(props) {
    const theme = useContext(ThemeContext)
    const [fdata, setFdata] = useState()
    const dispatch = useDispatch();
    const medicine = useSelector(state => state.medicines)


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
        console.log(id);
        dispatch(addtocart({ pid: id, qty: 1 }))
        // console.log("handleCart", id);
    }

    const handlefav = (id) => {
        dispatch(addfav(id))
    }

    return (
        <section id="medicines" className={`medicines ${theme.theme}`}>
            <div className={`container ${theme.theme}`}>
                <div className="section-title">
                    <h2>Medicines</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Aenean ac turpis ante. Mauris velit sapien, aliquet aliquet rhoncus quis,
                        luctus at neque. Mauris sit amet massa sed orci vehicula facilisis.</p>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <input className='search-med' type="text" placeholder='Search Medicine' onChange={(e) => handlesearch(e.target.value)} />

                    <ListingMed
                        mdata={fdata ? fdata : medicine.medicines}
                        handleCart1={handleCart}
                        handlefav={handlefav}
                    />
                </div>
            </div>
        </section>
    );
}

export default Medicine;