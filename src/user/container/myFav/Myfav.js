import React, { useState } from 'react';
import CustomCard from '../Ul/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { addfav } from '../../../redux/action/myfav.action';

function Myfav(props) {

    const [getdata, setgetdata] = useState([])
    const dispatch = useDispatch();
    let medData = useSelector(state => state.medicine);
    const myfavouritedata = useSelector(state => state.item)
    console.log(myfavouritedata, medData);
    // console.log(myfavouritedata);


    let cartitems = myfavouritedata.item.map((v) => {
        let medicinceData = medData.medicine.find((m) => m.id === v.fid);

        let fData = { ...medicinceData, ...v };

        return fData
    })


    return (
        <section id="medicines" className="medicines">
            <div className="container">
                <div className="section-title">
                    <h2>Medicines</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Aenean ac turpis ante. Mauris velit sapien, aliquet aliquet rhoncus quis,
                        luctus at neque. Mauris sit amet massa sed orci vehicula facilisis.</p>
                </div>

                <div>
                    {
                        cartitems.map((a, i) => {
                            return (
                                <CustomCard
                                    value={a}
                                />
                            )
                        })
                    }
                </div>

            </div>
        </section>
    );
}

export default Myfav;