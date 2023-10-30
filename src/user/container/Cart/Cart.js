import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decCartQty, deleteToCart, incCartQty } from '../../../redux/slice/cartSlice';
// import { decCartQty, deleteToCart, incCartQty } from '../../../redux/action/cart.action';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart(props) {

    let dispatch = useDispatch()
    let medData = useSelector(state => state.medicines);
    let cartData = useSelector(state => state.cart);

    console.log(medData, cartData);

    let cartitems = cartData.item.map((v) => {
        let medicinceData = medData.medicines.find((m) => m.id === v.pid);

        let fData = { ...medicinceData, ...v };

        return fData
    })


    let totalPrice = cartitems.reduce((acc, value) => acc + value.price * value.qty, 0);

    const handleInc = (id) => {
        console.log(id);
        dispatch(incCartQty(id))
    }

    const handleDec = (id) => {
        console.log(id);
        dispatch(decCartQty(id))
    }

    const handleremove = (id) => {
        console.log(id);
        dispatch(deleteToCart(id))
    }

    return (
        <>
            {/* <section id="medicine" className="medicine">
            <div className="container">
                <div className="section-title">
                    <h2>Cart</h2>
                </div>

                {
                    cartitems.map((c) => {
                        return (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="ms-3">
                                                <h5>Name:- {c.name}</h5>
                                                <h6>Price:- {c.price}</h6>
                                                <h6>Expiry:-{c.expiry}</h6>
                                                <p className="small mb-0">Desecration:- {c.desc}...</p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="d-flex mx-5" style={{ width: 150 }}>
                                                <button className="btn btn-link px-2" onClick={() => handleDec(c.pid)}>
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <input id="form1" min={1} name="quantity" value={c.qty} type="text" className="form-control form-control-sm" />
                                                <button className="btn btn-link px-2" onClick={() => handleInc(c.pid)}>
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </div>
                                            <div style={{ width: 130 }}>
                                                <h5 className="mb-0">Rs.{c.price * c.qty}</h5>
                                            </div>
                                            <a style={{ color: '#cecece' }}><i className="fas fa-trash-alt" onClick={() => handleremove(c.pid)} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                <div className=" card-body card mb-3 ms-3 d-flex justify-content-between d-flex flex-row align-items-center">
                    Total Amount Is:-
                    <div style={{ width: 80 }}>
                        <h5 className="mb-0">{totalPrice}</h5>
                    </div>
                </div>
            </div>
        </section> */}

            <section id="cart" className="cart">
                <div className="container">
                    <div className="section-title">
                        <h2>Cart</h2>
                        {/* <Title>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.
                    </Title> */}
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button style={{ backgroundColor: "#FF6337", padding: "10px", marginBottom: "20px", borderRadius: "20px" }}><a style={{ color: "#fff" }} href='/Medicine'>Continue shoping </a></button>
                    </div>
                    {
                        cartitems.map((c) => {
                            return (
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-row align-items-center">

                                                <div className="ms-3">
                                                    <h5>{c.name}</h5>
                                                    <p className="small mb-0">{c.desc}{'....'}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center">
                                                <div style={{ width: 150, display: 'flex' }}>

                                                    <button style={{ backgroundColor: '#FF6337', color: 'white', borderRadius: '50%', margin: '0 10px' }} onClick={() => handleDec(c.pid)}><RemoveIcon /></button>
                                                    {/* <Button style={{ width: '50px', height: '20px', display: 'flex', alignItems: 'center' }} onClick={() => handleDec(c.pid)}><RemoveIcon style={{ display: 'flex', alignItems: 'center' }} /></Button> */}

                                                    <h5 className="fw-normal mb-0">{c.qty}</h5>
                                                    <button style={{ backgroundColor: '#FF6337', color: 'white', borderRadius: '50%', margin: '0 10px' }} onClick={() => handleInc(c.pid)}><AddIcon /></button>
                                                </div>
                                                <div style={{ width: 80 }}>

                                                    <h5 className="mb-0"><CurrencyRupeeIcon style={{ fontSize: '20px' }} />{c.qty * c.price}</h5>
                                                </div>
                                                {/* <a href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt" /></a> */}
                                                <IconButton style={{ color: 'red' }} aria-label="delete" onClick={() => handleremove(c.pid)}>
                                                    <DeleteIcon />
                                                </IconButton>

                                                {/* <a style={{ color: '#cecece' }}><i className="fas fa-trash-alt" onClick={() => handleremove(c.pid)} /></a> */}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className=" card-body card mb-3 ms-3 d-flex justify-content-between d-flex flex-row align-items-center">
                        Total Amount Is:-
                        <div style={{ width: 80 }}>
                        <CurrencyRupeeIcon sx={{ fontSize: '20px' }} />{totalPrice}
                        </div>
                    </div>

                    {/* {
                        cartData.items.length > 0 ?
                            <h5 className='text-end '><b>Totle Amount: </b><span className='d-inline-block text-start ps-1' style={{ minWidth: '163px' }}><CurrencyRupeeIcon sx={{ fontSize: '20px' }} />{totalPrice}</span></h5>
                            : null
                    } */}

                </div>
            </section>

        </>
    );
}

export default Cart;