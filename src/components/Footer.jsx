import "../styles/Footer.css";
import { Container, Row, Col, Nav, NavDropdown, Image, InputGroup, Form, Button } from "react-bootstrap";
import logoFooter from "../assets/img/cerohuellaredondoconryv_pequeña.png";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer py-2 pt-4">
            <Container fluid>
                <Row className="text-center text-md-start">
                    <Col xs={12} md={3} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
                        <Link to={'/'}>
                        <Image  className="img-footer" src={logoFooter} alt="Logo de Cero Huella" fluid />
                        </Link>
                    </Col>

                    <Col xs={12} md={3} className="mb-4 mb-md-0 ">
                        <address>
                            <p className="mb-1 text-center text-md-center">Dirección: Cnel. Pagola 3880, C1437 Cdad. Autónoma de Buenos Aires</p>
                            <p className="mb-1 text-center text-md-center">cerohuella@gmail.com</p>
                            <p className="mb-1 text-center text-md-center">11-12345678</p>
                            <p className="mb-0 text-center text-md-center">CABA - Argentina</p>
                        </address>
                    </Col>

                    <Col xs={6} md={3} className="mb-4 mb-md-0">
                        <h5 className="text-center">Contenido</h5>
                        <Nav className="flex-column align-items-center align-items-md-center">
                            <Nav.Link as={Link} to={'/#home'} className="py-0 text-white">Home</Nav.Link>
                            <Nav.Link as={Link} to={'/productos#productos'} className="py-0 text-white">Productos</Nav.Link>
                            <Nav.Link as={Link} to={'/about'} className="py-0 text-white">Nosotros</Nav.Link>
                            <Nav.Link as={Link} to={'/contacto'} className="py-0 text-white">Contáctanos</Nav.Link>
                        </Nav>
                    </Col>

                    <Col xs={6} md={3}>
                        <h5 className="text-center mb-3">Redes Sociales</h5>
                        <Nav className="d-flex justify-content-center justify-content-md-center gx-1">
                            <Nav.Link href="#insta">
                                <i className="fa-brands fa-instagram fa-lg" style={{color:' #ffffff'}}></i>
                            </Nav.Link>
                            <Nav.Link href="#tiktok">
                                <i className="fa-brands fa-tiktok fa-lg" style={{color:' #ffffff'}}></i>
                            </Nav.Link>
                            <Nav.Link href="#facebook">
                                <i className="fa-brands fa-facebook fa-lg" style={{color:' #ffffff'}}></i>
                            </Nav.Link>
                            <Nav.Link href="#twitter">
                                <i className="fa-brands fa-x-twitter fa-lg" style={{color:' #ffffff'}}></i>
                            </Nav.Link>
                        </Nav>
                        <InputGroup className="d-flex  align-items-center me-auto border-boton mt-3 ">
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
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col className="text-center">
                        <small>&copy; 2025 - Mi Aplicación React</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
