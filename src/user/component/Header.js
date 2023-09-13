import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Custombutton from '../container/Ul/Custombutton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeContext } from '../../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { logoutRequest } from '../../redux/action/auth.action';
import { Drawer, Button, Placeholder } from 'rsuite';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

function Header({ cartcount1 }) {

    const theme = useContext(ThemeContext)
    console.log(theme);

    const auth = useSelector(state => state.auth)
    console.log(auth);

    const dispatch = useDispatch()

    let loginstatus = localStorage.getItem('loginstatus')

    const cartData = useSelector(state => state.cart)

    let countercart = 0;
    if (cartData.item) {
        countercart = cartData.item.reduce((acc, v, i) => acc + v.qty, 0)
    }

    const handleremove = () => {
        dispatch(logoutRequest())
        // localStorage.removeItem('loginstatus')
    }

    const [open, setOpen] = useState(false);

    return (
        <div className={`main-header ${theme.theme}`}>
            <div id="topbar" className={`d-flex align-items-center fixed-top  ${theme.theme}`}>
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope" /> <a href="mailto:contact@example.com" className={`${theme.theme}`}>cityhospital@example.com</a>
                        <i className="bi bi-phone" /> +91 9988776655
                    </div>

                    <div className="d-lg-flex social-links align-items-center">

                        <DarkModeIcon style={{cursor: 'pointer'}} onClick={() => theme.toogletheme(theme.theme)}>toogle Them</DarkModeIcon>
                        <Link to='/cart'>
                            <IconButton aria-label="cart" className={`${theme.theme}`}>
                                <StyledBadge badgeContent={countercart} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link>

                        {/* <Link to='/cart1'>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={cartcount1} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>
                        </Link> */}

                        <Link to='/myfav' >
                            <Badge color="primary">
                                <MailIcon color="action" className={`${theme.theme}`}/>
                            </Badge>
                        </Link>


                        <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                </div>
            </div>
            <header id="header" className={`fixed-top ${theme.theme}`}>
                <div className="container d-flex align-items-center">
                    <div className="logo">
                        <a href="index.html">
                            <h1 className={`logo me-auto ${theme.theme}`}>City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </a>
                    </div>
                    <nav id="navbar" className={`navbar order-last order-lg-0 ${theme.theme}`}>
                        <ul>
                            <li><Link to="/" className={`nav-link scrollto ${theme.theme}`} >Home</Link></li>
                            <li><Link to="/departments" className={`nav-link scrollto ${theme.theme}`} >Departments</Link></li>
                            <li><Link to="/medicine" className={`nav-link scrollto ${theme.theme}`} >Medicine</Link></li>
                            {/* <li><Link to="/medicine1" className={`nav-link scrollto ${theme.theme}`} >Medicine1</Link></li> */}
                            <li><Link to="/doctors" className={`nav-link scrollto ${theme.theme}`} >Doctors</Link></li>
                            <li><Link to="/about" className={`nav-link scrollto ${theme.theme}`} >About</Link></li>
                            <li><Link to="/contact" className={`nav-link scrollto ${theme.theme}`} >Contact</Link></li>
                            {/* <li><Link to="/formvalidation" className="nav-link scrollto">FormValidation</Link></li> */}
                            {/* <li><Link to="/counter" className="nav-link scrollto">Counter</Link></li> */}
                            {/* <li><Link to="/CallBackExa" className="nav-link scrollto">CallBackExa</Link></li> */}
                            {/* <li><Link to="/UseRefEmaple" className="nav-link scrollto">UseRefEmaple</Link></li> */}
                            <Outlet />
                        </ul>
                        <i onClick={() => setOpen(true)} class="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                    {/* <a href="./pages/appointment.html" className="appointment-btn scrollto"><span className="d-none d-md-inline">Make an</span>
                        Appointment</a> */}
                    <Link to="/appointment"><Custombutton val={'Make an Appointment'} /></Link>

                    {
                        auth.user ?
                            <Link to="/auth" onClick={handleremove}>
                                <Custombutton val={'Logout'} />

                            </Link> :

                            <Link to="/auth">
                                <Custombutton val={'Login/Signup'} />
                            </Link>
                    }

                </div>

                <div className='drawer'>
                    <Drawer backdrop={"static"} open={open} onClose={() => setOpen(false)}>
                        <Drawer.Header>
                            <Drawer.Title>Navbar List</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <nav>
                                <ul>
                                    <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
                                    <li><Link to="/departments" onClick={() => setOpen(false)}>Departments</Link></li>
                                    <li><Link to="/doctors" onClick={() => setOpen(false)}>Doctors</Link></li>
                                    <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
                                    <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
                                    <li><Link to="/medicine" onClick={() => setOpen(false)}>Medicine</Link></li>
                                </ul>
                            </nav>
                        </Drawer.Body>
                    </Drawer>
                </div>
            </header>
        </div>

    );
}

export default Header;