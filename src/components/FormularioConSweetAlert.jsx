import { useState } from 'react';
import '../styles/Contacto.css'
import { Alert, Button, Card, Col, Container, FloatingLabel, Form, Ratio, Row } from 'react-bootstrap';
import { dispararSweetAlertBasico } from '../assets/SweetAlert';

function FormularioConSweetAlert() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Expresion Regular
  const emailEsValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Valido Campos completos
    if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
      dispararSweetAlertBasico('Campos incompletos','Por favor completar todos los campos','error', 'OK')
      setError('Por favor completar todos los campos')
      return;
    }

    // Validar formato de email
    if (!emailEsValido(email)) {
      dispararSweetAlertBasico('Email no es valido', 'Ingresá un email con formato valido.', 'error', 'OK')
      setError('Ingresá un email con formato valido.')
      return;
    }

    // Si todo está OK y no hay ningun return
    dispararSweetAlertBasico('Formulario enviado',`Gracias, ${nombre}. Te responderemos pronto.`, 'success','OK')

    setNombre('');
    setEmail('');
    setMensaje('');
    setError('');
  };

  return (
    <Container fluid  >
      <Row className='mt-5  justify-content-center align-items-center mb-5 '>
        <Col xs={12} md={6} className='mb-4 mb-md-3 d-flex justify-content-center align-items-center' style={{ width: "26rem" }}>
          <Card className='shadow-lg mb-2' style={{ width: "24rem" }}>
            <Card.Body>
            <Card.Title className="mb-3 text-center"><h2>Escribenos...!</h2></Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Card.Subtitle><h3 className='lead'>Ponte en contacto con nosotros!</h3></Card.Subtitle>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 text-start">
                <FloatingLabel controlId="floatingInput" label='Nombre:' className="mb-4">
                  <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre:" />
                </FloatingLabel>  
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                <FloatingLabel controlId="floatingInput" label='Email:' className="mb-4">
                  <Form.Control value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email:' />
                </FloatingLabel>  
              </Form.Group>
              <Form.Group className="mb-3 text-start">
                  <FloatingLabel controlId="floatingInput" label='Mensaje:' className="mb-4">
                  <Form.Control as="textarea"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribí tu mensaje..."
                    rows="4"
                  ></Form.Control>
                  </FloatingLabel>
              </Form.Group>
              <Button className='me-4 mb-1' variant="outline-primary"  type='submit'>Enviar</Button>
            </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className='mb-4 mb-md-0 d-flex justify-content-center align-items-center' style={{ width: "40rem", height: 'auto' }}>
          <Ratio aspectRatio="16x9">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d820.6151071144725!2d-58.41786053046312!3d-34.643073294969156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb0a0440f96f%3A0xc3d55a68f751898d!2sCnel.%20Pagola%203876%2C%20C1437IXF%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1751080172538!5m2!1ses!2sar" width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Ratio>
        </Col>
      </Row>
      

    </Container>
  );
}

export default FormularioConSweetAlert;