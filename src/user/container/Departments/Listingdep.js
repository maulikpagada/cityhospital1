import React from 'react';
import CustomCard from '../Ul/CustomCard';

function Listingdep({ mdata, handleCart1 }) {
    return (
        <>
            {
                mdata.map((a, i) => {
                    return (
                        <div className='col-md-3 g-4'>
                            <CustomCard
                                value={a}
                                onclick1={handleCart1}
                                btnval={'Add to departments'}
                            />
                        </div>
                    )
                })
            }
        </>
    );
}

export default Listingdep;