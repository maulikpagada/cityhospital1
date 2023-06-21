import React from 'react';
import { useParams } from 'react-router-dom';

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
    const { id } = useParams()
    let filterData = doctorData.filter((value) => value.id === parseInt(id));

    return (
        <section id='doctor' className='doctor'>
            <div className='container'>
                {
                    filterData.map((value) => {
                        return (
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
                                        <a href><i className="ri-linkedin-box-fill" /></a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default Doctor;