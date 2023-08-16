import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Ul/Card/Card';
import { getDoctorData } from '../../../redux/action/doctors.action';
import { useDispatch, useSelector } from 'react-redux';

const doctorData = [
    {
        id: 1,
        name: 'Atha Smith',
        besingations: 'Chief Medical Officer',
        description: 'Duis sagittis rutrum neque, quis tincidunt arcu pretium ac.',
        url: '../assets/img/doctors/doctors-1.jpg',
    },
    {
        id: 2,
        name: 'John White',
        besingations: 'Anesthesiologist',
        description: 'Aenean ac turpis ante. Mauris velit sapien.',
        url: '../assets/img/doctors/doctors-2.jpg',
    },
    {
        id: 3,
        name: 'Umika Loha',
        besingations: 'Cardiology',
        description: 'Curabitur luctus eleifend odio. Phasellus placerat mi.',
        url: '../assets/img/doctors/doctors-3.jpg',
    },
    {
        id: 4,
        name: 'Daimy Smith',
        besingations: 'Neurosurgeon',
        description: 'Morbi vulputate, tortor nec pellentesque molestie, eros nisi ornare purus.',
        url: '../assets/img/doctors/doctors-4.jpg',
    }
]

function Doctor(props) {
    const dispatch = useDispatch();
    const dData = useSelector(state => state.doctors);
    console.log(dData.doctors);

    useEffect(() => {
        dispatch(getDoctorData())
    }, [])

    const { id } = useParams()
    let filterData = dData.doctors.filter((value) => value.id === parseInt(id));

    return (
        <section id="doctors" className="doctors">
            <div className="container">
                <div className="row">
                    {
                        filterData.map((v, i) => {
                            return (
                                <div className="col-lg-10 m-auto">
                                    <div className="member d-flex align-items-start">
                                        <div className="pic des"><img src={v.url} className="img-doctordes" alt /></div>
                                        <div className="member-info">
                                            <h4>{v.name}</h4>
                                            <span>{v.besingations}</span>
                                            <p>{v.description}</p>
                                            <p>{v.about}</p>
                                            <div className="social">
                                                <a href><i className="ri-twitter-fill" /></a>
                                                <a href><i className="ri-facebook-fill" /></a>
                                                <a href><i className="ri-instagram-fill" /></a>
                                                <a href> <i className="ri-linkedin-box-fill" /> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </section>
    );
}

export default Doctor;