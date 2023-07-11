import React from 'react';
// import CustomCard from '../Ul/CustomCard';
// import Custombutton from '../Ul/Card/Custombutton';
import CustomCard from '../Ul/Card/CustomCard'

function ListingMed({mdata}) {
    return (
        <>
            {
                mdata.map((a,i) => {
                    return(
                        <CustomCard value={a} /> 
                    )
                })
            }
        </>
    );
}

export default ListingMed;