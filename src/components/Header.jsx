import Logo from "../assets/img/Logo Cero Huella Horiz.png"
import "../styles/Header.css"
import {Container, Navbar, Nav, Badge, NavDropdown, Offcanvas, Form, Button, InputGroup} from 'react-bootstrap';
import { Link, useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '../contexts/CarritoContext';
import { useAuthContext } from "../contexts/AuthContext";
import { useUsuariosContext } from "../contexts/UsuarioContext";

function Header() {
    const {user, admin, logout}= useAuthContext();
    const {productosCarrito} = useContext(CarritoContext);
    const navigate= useNavigate();
    
    
    

    function obtenerUsername(token){
        const email = token.replace('fake-token-', '');
        return email.split('@')[0];
    }

    function handleNavigateLogin(){
        navigate('/login');
    }

    function handleLogout(){
        logout();
    }

    return (
        <header className="header ">
            <Navbar collapseOnSelect expand='lg' className="fs-6 py-1" variant="dark">
                <Container className="mt-1 mb-1" fluid>
                    <Navbar.Brand as={Link} to={'/'} href="#home"><img className="logo  me-auto" src={Logo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                    backdrop='static'
                    className='ps-0'
                    >
                        <Offcanvas.Header  closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`} as={Link} to={'/'} href="#home">
                            <img className="w-25 h-25 me-auto" src={Logo} alt="" />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end  flex-grow-1 pe-3">
                            <Nav.Link href="#" as={Link} to={'/'}>Home</Nav.Link>
                            <Nav.Link href="#" as={Link} to={'/productos'} className='nav-link'>Productos</Nav.Link>
                            <Nav.Link href="#" as={Link} to={'/contacto'} className='nav-link'>Contacto</Nav.Link>
                            <Nav.Link href="#" as={Link} to={'/about'} className='nav-link me-auto'>Nosotros</Nav.Link>
                            {admin ? <Nav.Link href="#" as={Link} to={'/admin/usuarios'} className='nav-link'>Usuarios</Nav.Link> : <></> } 
                            {/* <NavDropdown
                                title="Dropdown"
                                id={`offcanvasNavbarDropdown-expand-lg`}
                                className="me-auto"
                            >
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                Something else here
                                </NavDropdown.Item>
                            </NavDropdown> */}
                            {admin ? <Nav.Link href="#" as={Link} to={'/admin/agregarProductos'} className='me-auto nav-link'>Agregar Productos</Nav.Link> : <></>}
                            <InputGroup className="d-flex  align-items-center me-auto border-boton  ">
                                <Form.Control
                                placeholder="Busqueda"
                                type="search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                className=""
                                />
                                <Button variant="" className=" px-3 "  id="button-addon2">
                                <i className="fa-solid fa-magnifying-glass fa-lg" style={{color: '#ffffff'}}></i>
                                </Button>
                            </InputGroup>
                            <Nav.Link href="#" as={Link} to={'/carrito'} className='mx-2 mt-2 nav-link position-relative'><i className= " fa-solid fa-cart-shopping fa-lg"><Badge pill bg="danger"  className="position-absolute  me-5 translate-middle badge-small">{productosCarrito.length>0 ? productosCarrito.length : ""}</Badge></i></Nav.Link>
                            <Nav.Link href="#" as={Link} to={'/login'} className='mx-o nav-link'><Button size="sm" variant="outline-light" className="border-0 " onClick={ !user ? handleNavigateLogin : handleLogout}>{ !user ? <i className="fa-solid fa-user fa-xl" style={{color:"#ffffff"}}></i> : <span size="sm" variant="outline-light" className="border-boton p-1"><i className="fa-solid fa-user" style={{color:"#ffffff"}}></i> : {obtenerUsername(user)}</span>}</Button></Nav.Link>
                            {/*<i className="fa-solid fa-user" style={{color:"#ffffff"}}></i>*/}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    
    );
}

export default Header;