import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Heading from '../Ul/Heading/Heading';
import { ThemeContext } from '../../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorData } from '../../../redux/action/doctors.action';

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

function Doctors(props) {
    const dispatch = useDispatch();
    const dData = useSelector(state => state.doctors);
    console.log(dData.doctors);

    useEffect(() => {
        dispatch(getDoctorData())
    }, [])

    const theme = useContext(ThemeContext)

    return (
        <section id="doctors" className={`doctors ${theme.theme}`}>
            <div className="container">
                <div className="section-title">
                    <h2 className={`${theme.theme}`}>Doctors</h2>
                    <p>Duis sagittis rutrum neque, quis tincidunt arcu pretium ac. Suspendisse sem risus, molestie vitae arcu et,
                        tincidunt viverra erat. Quisque in lectus id nulla viverra sodales in a risus. Aliquam ut sem ex. Duis viverra
                        ipsum lacus, ut pharetra arcu sagittis nec. Phasellus a eleifend elit.</p>
                </div>
                <div className="row">
                    {
                        dData.doctors.map((value) => {
                            return (
                                <div className="col-lg-6">
                                    <Link to={`/doctor/${value.id}`}>
                                        <div className="member d-flex align-items-start">
                                            <div className="pic"><img src={value.url} className="img-doctor" alt /></div>
                                            <div className="member-info">
                                                <h4>{value.name}</h4>
                                                <span>{value.besingations}</span>
                                                <p>{value.description}</p>
                                                <div className="social">
                                                    <a href><i className="ri-twitter-fill" /></a>
                                                    <a href><i className="ri-facebook-fill" /></a>
                                                    <a href><i className="ri-instagram-fill" /></a>
                                                    <a href> <i className="ri-linkedin-box-fill" /> </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>

    );
}

export default Doctors;