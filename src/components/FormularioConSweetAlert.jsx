import { useState } from 'react';
import '../styles/Contacto.css'
import { Alert, Button, Card, Container, FloatingLabel, Form } from 'react-bootstrap';
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
    <Container className='mt-5 d-flex justify-content-center align-items-center mb-5'>
      <Card className='shadow-lg' style={{ width: "24rem" }}>
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
            <Button className='me-4 mb-3' variant="outline-primary"  type='submit'>Enviar</Button>
          </Form>
          </Card.Body>
        </Card>
    </Container>
  );
}

export default FormularioConSweetAlert;