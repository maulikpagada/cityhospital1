import React, { useEffect, useState } from 'react';
import CustomCard from '../Ul/CustomCard';

function Medicine1(props) {
    const [getdata, setgetdata] = useState([])
    // const [cart, setcartdata] = useState([])


    let localdata = JSON.parse(localStorage.getItem('cart'))

    // console.log(cart);

    useEffect(() => {
        try {
            fetch("http://localhost:3004/medicines")
                .then((response) => response.json())
                .then((data) => setgetdata(data))
                .catch((error) => console.log(error))
        } catch (error) {
            console.log(error);
        }
    }, [])

    const cartarr = [];

    const handleCart1 = (id) => {

        let localdata = JSON.parse(localStorage.getItem('cart'))

        if (localdata === null) {
            localStorage.setItem('cart', JSON.stringify([{
                pid: id,
                qty: 1
            }]))
        } else {
            let mdata = localdata.find((m) => m.pid == id)
            if(mdata){
                mdata.qty++;
                localStorage.setItem('cart', JSON.stringify(localdata))
            } else {
                localdata.push({
                    pid:id,
                    qty:1
                })
                localStorage.setItem('cart', JSON.stringify(localdata))
            }
        }
    }


    return (
        <section id="medicines" className="medicines">
            <div className="container">
                <div className="section-title">
                    <h2>Medicines</h2>
                    <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                        blandit quam volutpat sollicitudin. Aenean ac turpis ante. Mauris velit sapien, aliquet aliquet rhoncus quis,
                        luctus at neque. Mauris sit amet massa sed orci vehicula facilisis.</p>
                </div>
                <div className='row g-4'>
                    {
                        getdata.map((a, i) => {
                            return (
                                <div className='col-md-4 g-4'>
                                    <CustomCard
                                        value={a}
                                        onclick1={handleCart1}
                                        btnval={'Add to Cart'}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </section>
    );
}

export default Medicine1;