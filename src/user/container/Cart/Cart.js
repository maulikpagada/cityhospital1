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
                                                    {/* <a href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt" /></a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='order-total-amount'>
                                        <div className='order-total-subdata'>
                                            <div>
                                                <p>subtotal:-</p>
                                                <p>
                                                    <FormatPrice />
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                </>
                            )
                        })
                    }

                </div>
            </div>
        </section>
    );
}

export default Cart;