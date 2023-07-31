import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Custombutton from '../container/Ul/Custombutton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import MailIcon from '@mui/icons-material/Mail';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function Header({ cartcount1 }) {

    let loginstatus = localStorage.getItem('loginstatus')

    const cartData = useSelector(state => state.cart)

    let countercart = 0;
    if (cartData.item) {
        countercart = cartData.item.reduce((acc, v, i) => acc + v.qty, 0)
    }

    const handleremove = () => {
        localStorage.removeItem('loginstatus')
    }




    return (
        <div className="main-header">
            <div id="topbar" className="d-flex align-items-center fixed-top">
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope" /> <a href="mailto:contact@example.com">cityhospital@example.com</a>
                        <i className="bi bi-phone" /> +91 9988776655
                    </div>

                    <div>
                        <Link to='/cart'>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={countercart} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link>

                        <Link to='/cart1'>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={cartcount1} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link>

                        <Link to='/myfav'>
                            <Badge color="primary">
                                <MailIcon color="action" />
                            </Badge>
                        </Link>
                    </div>

                    <div className="d-none d-lg-flex social-links align-items-center">
                        <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>

                    </div>
                </div>
            </div>
            <header id="header" className="fixed-top">
                <div className="container d-flex align-items-center">
                    <div className="logo">
                        <a href="index.html">
                            <h1 className="logo me-auto">City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </a>
                    </div>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li><Link to="/" className="nav-link scrollto active" >Home</Link></li>
                            <li><Link to="/departments" className="nav-link scrollto">Departments</Link></li>
                            <li><Link to="/medicine" className="nav-link scrollto">Medicine</Link></li>
                            <li><Link to="/medicine1" className="nav-link scrollto">Medicine1</Link></li>
                            <li><Link to="/doctors" className="nav-link scrollto">Doctors</Link></li>
                            <li><Link to="/about" className="nav-link scrollto">About</Link></li>
                            <li><Link to="/contact" className="nav-link scrollto">Contact</Link></li>
                            <li><Link to="/formvalidation" className="nav-link scrollto">FormValidation</Link></li>
                            {/* <li><Link to="/counter" className="nav-link scrollto">Counter</Link></li> */}
                            <Outlet />
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>
                    {/* <a href="./pages/appointment.html" className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span>
                        Appointment</a> */}
                    <Link to="/appointment"><Custombutton val={'Make an Appointment'} /></Link>

                    {
                        loginstatus ?
                            <Link to="/auth" onClick={handleremove}>
                                <Custombutton val={'Logout'} />

                            </Link> :

                            <Link to="/auth">
                                <Custombutton val={'Login/Signup'} />
                            </Link>
                    }

                </div>
            </header>
        </div>
    );
}

export default Header;