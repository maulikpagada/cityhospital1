import React from 'react';
import CustomCard from '../Ul/CustomCard'
import { useSelector } from 'react-redux';

function ListingMed({ mdata, handleCart1,handlecart2,handlefav }) {

    return (
        <>
            {
                mdata.map((a, i) => {
                    return (
                        <div className='col g-4'>
                            <CustomCard
                                value={a}
                                onclick1={handleCart1}
                                btnval={'Add to Cart'}
                                favItem={handlecart2}
                                onclick2={handlefav}
                            />
                        </div>
                    )
                })
            }
        </>
    );
}

export default ListingMed;