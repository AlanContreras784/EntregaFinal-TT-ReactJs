import "../styles/Footer.css";
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import logoFooter from '../assets/img/cerohuellaredondoconryv_pequeña.png'
// import { Container } from "react-bootstrap";

// function Footer() {  
//     return (  
//         <footer className="footer conteiner-fluid d-flex flex-column  py-3 mx-0">
//                 <Container fluid className="row">
//                     <div className="col-12 d-flex justify-content-center align-items-center mt-0 ms-0 col-md-3">
//                         <img className="pt-3 img-footer img-fluid" src={logoFooter} alt="" />
//                     </div>
//                     <address className="col-12 col-md-4 mt-4 px-3">
//                         <p className="text-center">cerohuella@gmail.com</p>
//                         <p className="text-center">11-12345678</p>
//                         <p>caba-Argentina</p>
//                     </address>
//                     <div className="col-6  col-md-2 mt-4">
//                         <h5 className="text-center">CONTENIDO</h5>
//                         <Nav className=" row-cols-xl-auto">
//                             <ul>
//                                 <li><Nav.Link className="p-0" href="#home">Home</Nav.Link>
//                                 </li>
                                    
//                                 <li><Nav.Link className="p-0" href="#link">Link</Nav.Link>
//                                 </li>
//                                 <li>
//                                     <NavDropdown className="p-0" title="Dropdown" id="basic-nav-dropdown">
//                                         <NavDropdown.Item href="#action/3.1">Action
//                                         </NavDropdown.Item>
//                                         <NavDropdown.Item href="#action/3.2">Another action
//                                         </NavDropdown.Item>
//                                         <NavDropdown.Item href="#action/3.3">Something
//                                         </NavDropdown.Item>
//                                         <NavDropdown.Divider />
//                                         <NavDropdown.Item href="#action/3.4">Separated link
//                                         </NavDropdown.Item>
//                                     </NavDropdown>
//                                 </li>    
//                             </ul>
//                         </Nav>
//                     </div>
//                     <div className="col-6 col-md-3 mt-4">
//                         <h5 className=" pt-0 pb3">REDES SOCIALES</h5>
//                         <Nav className="d-flex w-75 mx-auto justify-content-evenly align-items-center  ">
//                             <Nav.Link className="" href="#link"><i class="fa-brands fa-instagram"></i></Nav.Link>
//                             <Nav.Link className="" href="#link"><i class="fa-brands fa-tiktok"></i></Nav.Link>
//                             <Nav.Link className="" href="#home"><i class="fa-brands fa-facebook"></i></Nav.Link>
//                             <Nav.Link className="" href="#link"><i class="fa-brands fa-x-twitter"></i></Nav.Link>
//                         </Nav>
//                     </div>
//             </Container>
//             <p className="w-auto">&copy; 2025 - Mi Aplicación React</p>  
            
//         </footer>  
//     );  
// }  

// export default Footer;  

import { Container, Row, Col, Nav, NavDropdown, Image } from "react-bootstrap";
import logoFooter from "../assets/img/cerohuellaredondoconryv_pequeña.png";

function Footer() {
    return (
        <footer className="footer py-2 pt-4">
            <Container fluid>
                <Row className="text-center text-md-start">
                    <Col xs={12} md={3} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
                        <Image className="img-footer" src={logoFooter} alt="Logo de Cero Huella" fluid />
                    </Col>

                    <Col xs={12} md={3} className="mb-4 mb-md-0 ">
                        <address>
                            <p className="mb-1 text-center text-md-center text-white">cerohuella@gmail.com</p>
                            <p className="mb-1 text-center text-md-center">11-12345678</p>
                            <p className="mb-0 text-center text-md-center">CABA - Argentina</p>
                        </address>
                    </Col>

                    <Col xs={6} md={3} className="mb-4 mb-md-0">
                        <h5 className="text-center">Contenido</h5>
                        <Nav className="flex-column align-items-center align-items-md-center">
                            <Nav.Link href="#home" className="py-0 text-white">Home</Nav.Link>
                            <Nav.Link href="#link" className="py-0 text-white">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="nav-dropdown" className="py-0" style={{color:' #ffffff'}}>
                                <NavDropdown.Item href="#action/3.1">Acción</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Otra acción</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Algo más</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Enlace separado</NavDropdown.Item>
                            </NavDropdown>
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
