import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useState } from "react";
import { Alert, Button, Card, Container, FloatingLabel, Form, } from "react-bootstrap";
import { dispararSweetAlertBasico } from "../assets/SweetAlert";
import { crearUsuarioEnFirebase } from "../Auth/firebase";
import { crearUsuario } from '../Auth/firebase';
import {ToastContainer, toast} from "react-toastify"


function Registrarse() {
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
            console.log(user)
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
                        <FloatingLabel controlId="floatingInput" label='Email:' className="mb-4">
                        <Form.Control placeholder='Email:' value={email} type="email" onChange={(e) => setEmail(e.target.value)  } />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <FloatingLabel controlId="floatingInput" label='Imagen:' className="mb-4">
                        <Form.Control placeholder='Imagen:' value={imagen} type="text" onChange={(e) => setImagen(e.target.value)  } />
                        </FloatingLabel>
                        <Form.Control value={imagen} type="texto" onChange={(e) => setImagen(e.target.value)  } />
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <FloatingLabel controlId="floatingInput" label='Contraseña:' className="mb-4">
                            <Form.Control placeholder='Contraseña:' value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <FloatingLabel controlId="floatingInput" label='Nombres:' className="mb-4">
                            <Form.Control placeholder='Nombres:' value={name} type="text" onChange={(e) => setName(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <FloatingLabel controlId="floatingInput" label='Edad:' className="mb-4">
                            <Form.Control placeholder='Edad:' value={age} type="number" onChange={(e) => setAge(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3 text-start">
                        <FloatingLabel controlId="floatingInput" label='País:' className="mb-4">
                            <Form.Control placeholder='País:' value={country} type="text" onChange={(e) => setCountry(e.target.value)} />
                        </FloatingLabel>
                    </Form.Group>
                    <Button className='me-4 mb-3 w-100' variant="primary"  type='submit'>Registrarse</Button>
                                <span className='color-registro'>¿Ya tienes cuenta?</span><Link className='text-registro' to={'/'}> Inicia Sesión</Link>
                </Form>
                <ToastContainer/>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Registrarse;
