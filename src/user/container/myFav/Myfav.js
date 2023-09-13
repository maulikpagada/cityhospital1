import React, { useState } from 'react';
import CustomCard from '../Ul/CustomCard';
import { useDispatch, useSelector } from 'react-redux';
import { addfav, removeToFav } from '../../../redux/action/myfav.action';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Myfav(props) {

    const dispatch = useDispatch();
    let medData = useSelector(state => state.medicines);
    const myfavouritedata = useSelector(state => state.item)
    console.log(myfavouritedata, medData);
    console.log(myfavouritedata);


    let cartitems = myfavouritedata.item.map((v) => {
        let medicinceData = medData.medicines.find((m) => m.id === v.fid);

        let fData = { ...medicinceData, ...v };

        return fData
    })

    const handleDelete = (id) => {
        dispatch(removeToFav(id))

    }

    return (
        <>
            <section id="cart" className="cart">
                <div className="container">
                    <div className="section-title">
                        <h2>Favorites</h2>
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <button style={{background: "#FF6337", padding: "10px", marginBottom: "20px", borderRadius: "20px"}}><a style={{color: "#fff"}} href='/medicine'>Continue shopping</a></button>
                    </div>

                    {cartitems.map((c, i) => {
                        return (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="ms-3">
                                                <h5> {c.name} </h5>
                                                <p className="small mb-0">
                                                    {c.desc.substring(0, 50)}
                                                    {"..."}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div style={{ width: 200 }}>
                                                <h5 className="fw-normal mb-0">
                                                    <span style={{ margin: "5px" }}>{c.qty} </span>
                                                </h5>
                                            </div>
                                            <div style={{ width: 80 }}>
                                                <h5 className="mb-0">
                                                    {" "}
                                                    {c.price}{" "}
                                                </h5>
                                            </div>

                                            <FavoriteIcon style={{ color: '#FF6337' }} onClick={() => handleDelete(c.id)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}

export default Myfav;