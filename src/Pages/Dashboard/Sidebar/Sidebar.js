import React from 'react';
import './Sidebar.css';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="sidebar-button">
                    <Container fluid className='p-0'>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasDarkNavbarLabel-expand-${expand}`} placement="end">
                            <Offcanvas.Header closeButton style={{ backgroundColor: '#F8FCFB', padding: '18px' }}>
                                <Offcanvas.Title id={`offcanvasDarkNavbarLabel-expand-${expand}`}>Dashboard</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className='pt-0 bg-dark'>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <NavLink to="/dashboard/myProfile" className="link-styles mt-2">My Profile</NavLink>
                                    <NavLink to="/dashboard/addReview" className="link-styles my-2">Add Review</NavLink>
                                    <NavLink to="/dashboard/addPrint" className="link-styles">Add Print</NavLink>
                                    <NavLink to="/dashboard/myOrders" className="link-styles my-2">My Orders</NavLink>
                                    <NavLink to="/dashboard/orders" className="link-styles">Orders</NavLink>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    );
};

export default Sidebar;