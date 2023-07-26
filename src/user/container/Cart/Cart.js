import React from 'react';
import Heading from '../Ul/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { decCartQty, deleteToCart, incCartQty } from '../../../redux/action/cart.action';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart(props) {

    let dispatch = useDispatch()
    let medData = useSelector(state => state.medicine);
    let cartData = useSelector(state => state.cart);


    let cartitems = cartData.item.map((v) => {
        let medicinceData = medData.medicine.find((m) => m.id === v.pid);

        let fData = { ...medicinceData, ...v };

        return fData
    })


    const handleInc = (id) => {
        dispatch(incCartQty(id))
    }

    const handleDec = (id) => {
        dispatch(decCartQty(id))
    }

    const handleremove = (id) => {
        console.log("remove", id);
        dispatch(deleteToCart(id))
    }

    return (
        <section id="appointment" className="appointment">
            <div className="container">
                <div className="section-title">
                    <Heading type='h2'>cart</Heading>
                </div>
                <div className='container'>
                    {
                        cartitems.map((c, i) => {
                            return (
                                <>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex flex-row align-items-center">
                                                    <div className="ms-3">
                                                        <h5>{c.name}</h5>
                                                        <p className="small mb-0">{c.desc.substring(0, 50)}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center">
                                                    <div style={{ width: 50 }}>
                                                        <Button onClick={() => handleDec(c.id)}>-</Button>
                                                        <h5 className="fw-normal mb-0">{c.qty}</h5>
                                                        <Button onClick={() => handleInc(c.id)}>+</Button>
                                                    </div>
                                                    <div style={{ width: 80 }}>
                                                        <h5 className="mb-0">{c.price}</h5>
                                                    </div>
                                                    <IconButton aria-label="delete" onClick={() => handleremove(c.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    <div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">$4798.00</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">$20.00</p>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">$4818.00</p>
                        </div>
                        <button type="button" className="btn btn-info btn-block btn-lg">
                            <div className="d-flex justify-content-between">
                                <span>$4818.00</span>
                                <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2" /></span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </section >
    );
}

export default Cart;