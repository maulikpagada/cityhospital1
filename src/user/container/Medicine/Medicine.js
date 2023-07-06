import React, { useEffect, useState } from 'react';
import ListingMed from './ListingMed';

function Medicine(props) {

    const [data, setdata] = useState([]);
    const [fdata, setFdata] = useState()


    useEffect(() => {

        let localdata = JSON.parse(localStorage.getItem("medicines"));

        setdata(localdata)

        console.log(localdata);

    }, [])

    const handlesearch = (value) => {
        console.log(value);

        if (value !== "") {
            let filteredData = data.filter((m) => (
                m.name.toLowerCase().includes(value.toLowerCase()) ||
                m.date.toString().includes(value) ||
                m.price.toString().includes(value) ||
                m.desc.toString().includes(value))
            );
            setFdata(filteredData)
        } else {
            setFdata()
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <input type="text" placeholder='Search Medicine' onChange={(e) => handlesearch(e.target.value)} />

                <ListingMed mdata={fdata ? fdata : data} />
            </div>
        </div>
    );
}

export default Medicine;