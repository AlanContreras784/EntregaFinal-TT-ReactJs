import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useState } from "react";
import { Alert, Button, Card, Container, Form, } from "react-bootstrap";
import { dispararSweetAlertBasico } from "../assets/SweetAlert";
import { crearUsuarioEnFirebase } from "../Auth/firebase";
import { crearUsuario } from '../Auth/firebase';
import {ToastContainer, toast} from "react-toastify"


function Registrarse() {
    const [usuario, setUsuario] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [imagen, setImagen] = useState('')
    const [country, setCountry] = useState('');;
    const { login} = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState();
    
    function registrarUsuario (e) {
        e.preventDefault();
        crearUsuario(email, password).then((user) => {
            
            crearUsuarioEnFirebase(name, imagen,age,email,country)
            login(email)
            toast.success('Registroeitoso')
            dispararSweetAlertBasico("Registro exitoso", "", "success", "Confirmar")
            navigate('/login')
            }).catch((error) => {
            if(error.code == "auth/invalid-credential"){
                dispararSweetAlertBasico("Credenciales incorrectas", "", "error", "Cerrar")
                setError("Credenciales incorrectas")
            }if(error.code == "auth/weak-password"){
                dispararSweetAlertBasico("Contraseña debil", "La contraseña debe tener al menos 6 caracteres", "error", "Cerrar")
                setError("La contraseña debe tener al menos 6 caracteres")
            }if(error.code == "auth/invalid-email"){
                dispararSweetAlertBasico("Error", "Email inválido", "error", "Cerrar")
                setError("Email inválido")
            }if(error.code == "auth/missing-password"){
                dispararSweetAlertBasico("Error", "Contraseña inválida", "error", "Cerrar")
                setError("Contraseña inválida")
            }if(error.code == "auth/email-already-in-use"){
                dispararSweetAlertBasico("Error", "Correo Electrónico ya en uso", "error", "Cerrar")
                setError("Correo Electrónico ya en uso")
            }
        })
    }
    return (

        <Container className="mt-5 mb-5 d-flex justify-content-center align-items-center" style={{ maxWidth: 400 }}>
            <Card className='shadow-lg' style={{ width: "24rem" }}>
                <Card.Body>
                <Card.Title className="mb-3 text-center"><h2>Registrarse</h2></Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={registrarUsuario}>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label >Email:</Form.Label>
                        <Form.Control value={email} type="email" onChange={(e) => setEmail(e.target.value)  } />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label >Imagen:</Form.Label>
                        <Form.Control value={imagen} type="texto" onChange={(e) => setImagen(e.target.value)  } />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label>Nombres:</Form.Label>
                        <Form.Control value={name} type="text" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label>Edad:</Form.Label>
                        <Form.Control value={age} type="number" onChange={(e) => setAge(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <Form.Label>País:</Form.Label>
                        <Form.Control value={country} type="text" onChange={(e) => setCountry(e.target.value)} />
                    </Form.Group>
                    <Button className='mb-3 me-4' variant="primary" type='submit'>Registrarse</Button>
                    <Link to={'/login'}><Button className="mb-3" variant='outline-primary'>Login in</Button></Link>
                </Form>
                <ToastContainer/>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Registrarse;
