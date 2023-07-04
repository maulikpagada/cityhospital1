import React from 'react';
import CustomCard from '../Ul/CustomCard';

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