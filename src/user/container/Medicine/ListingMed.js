import React from 'react';
import CustomCard from '../Ul/CustomCard'
import { useSelector } from 'react-redux';

function ListingMed({ mdata, handleCart1 }) {

    return (
        <>
            {
                mdata.map((a, i) => {
                    return (
                        <div className='col-md-3 g-4'>
                            <CustomCard
                                value={a}
                                onclick1={handleCart1}
                                btnval={'Add to Cart'}
                            />
                        </div>
                    )
                })
            }
        </>
    );
}

export default ListingMed;