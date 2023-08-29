import React, { useContext, useEffect, useState } from 'react';
import Heading from '../Ul/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { getdepartmentsData } from '../../../redux/action/departments.action';

import { addToCart } from '../../../redux/action/cart.action';
import Listingdep from './Listingdep';
import { ThemeContext } from '../../../context/ThemeContext';
import { getdep } from '../../../redux/slice/departmentSlice';

function Departments(props) {

    const dispatch = useDispatch();
    const theme =useContext(ThemeContext) 
    const departmentsrData = useSelector(state => state.departments)
    console.log(departmentsrData);

    useEffect(() => {
        dispatch(getdep())
    }, [])


    return (
        <>

            <section id="departments" className={`departments  ${theme.theme}`}>
                <div className="container">
                    <div className="section-title">
                    <h2 className={`${theme.theme}`}>Departments</h2>
                    </div>



                    <div className={`row ${theme.theme}`}>
                        <div className="col-lg-3">
                            <ul className="nav nav-tabs flex-column">
                                <li className={`nav-item ${theme.theme}`}>
                                    {
                                        departmentsrData.departments.map((v, i) => {
                                            return (
                                                <a className={i === 0 ? 'nav-link active show' : 'nav-link'} data-bs-toggle="tab" href={`#tab-${i + 1}`}>{v.name}</a>
                                            )
                                        })
                                    }

                                </li>
                            </ul>
                        </div>


                        <div className="col-lg-9 mt-4 mt-lg-0">
                            <div className="tab-content">
                                {
                                    departmentsrData.departments.map((v, i) => {
                                        return (
                                            <div className={i === 0 ? 'tab-pane active show' : 'tab-pane'} id={`tab-${i + 1}`}>
                                                <div className="row">
                                                    <div className="col-lg-8 details order-2 order-lg-1">
                                                        <h3  className={`${theme.theme}`}>{v.name}</h3>

                                                        <p  className={`${theme.theme}`}>{v.desc}</p>
                                                    </div>
                                                    <div className="col-lg-4 text-center order-1 order-lg-2">
                                                        <img src="../assets/img/departments-1.jpg" alt className="img-fluid" />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        </div>
                    </div>



                </div>
            </section>

        </>
    );
}

export default Departments;