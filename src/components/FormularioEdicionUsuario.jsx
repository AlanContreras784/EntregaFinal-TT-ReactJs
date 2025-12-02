import { Alert, Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dispararSweetAlertBasico } from "../assets/SweetAlert";
import { useAuthContext } from "../contexts/AuthContext";
import { useUsuariosContext } from "../contexts/UsuarioContext";

function FormularioEdicionUsuario() {
  const {admin}= useAuthContext();
  const {usuarioSeleccionado, obtenerUnUsuarioFirebase, editarUsuarioFirebase} = useUsuariosContext();
  const { id } = useParams();
  //const [usuario, setUsuario] = useState({id:'',email: '', name: '',imagen: '',age: '',country: ''});
  const [usuario, setUsuario] = useState(usuarioSeleccionado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  if(!admin){
    return(
        <Navigate to='/login' replace />
    )
      
  }

  useEffect(() => {
    obtenerUnUsuarioFirebase(id).then((usuarioSeleccionado) => {
      setUsuario({ id, ...usuarioSeleccionado });
      setCargando(false);
    }).catch((error) => {
      console.error("Error al cargar el usuario:", error);
        setError('Hubo un problema al cargar los usuarios.');
        setCargando(false);
    });
  }, [id]);

  const emailEsValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarFormulario = () => {

  
    if (!usuario.name.trim()) {
    return("El nombre es obligatorio.")
    }
    if(!emailEsValido(usuario.email)){
    return("El formato del Email  es incorrecto. ejemplo@correo.com")
    }
    if(!usuario.imagen){
    return("La url de la imagen no debe estar vacía")
    }
    if (!usuario.age || usuario.age <= 18) {
    return("La edad debe ser mayor a 18.")
    }
    if (!usuario.country.trim() ) {
    return("el país es obligatorio")
    }
    else{
    return true
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
      if (validarForm == true) {
      editarUsuarioFirebase(usuario).then((usuario) => {
        console.log("Usuario editado con éxito:", usuario);
        dispararSweetAlertBasico("OK", 'usuario actualizado correctamente.', "success", "Cerrar");
        navigate("/admin/usuarios/"+id);
      }).catch((error) => {
          dispararSweetAlertBasico("Hubo un problema al agregar el usuario", error.message, "error", "Cerrar")
      })
      } else{
          dispararSweetAlertBasico("Error en la carga de usuario", validarForm, "error", "Cerrar")
          setError(validarForm);
      }
  };

  return ( 
      <Container className="mt-5 d-flex justify-content-center align-items-center mb-5" style={{ maxWidth: 400 }}>
          <Card className='shadow-lg' style={{ width: "24rem" }}>
              <Card.Body>
              <Card.Title className="mb-3 text-center">Editar Usuario</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                          <Form.Control type="email" name="email"placeholder='email' value={usuario.email} onChange={handleChange} ></Form.Control>
                      </FloatingLabel> 
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label="name" className="mb-3">
                          <Form.Control type="text" name="name"placeholder='nombre' value={usuario.name} onChange={handleChange} ></Form.Control>
                      </FloatingLabel> 
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label="imagen" className="mb-4">
                          <Form.Control type="text" name="imagen" placeholder='Url Imagen' value={usuario.imagen} onChange={handleChange} ></Form.Control>
                      </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label="age" className="mb-4">
                      <Form.Control type="number" step={0.01} name="age" placeholder='age' value={usuario.age} onChange={handleChange} min="0"></Form.Control>
                      </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label='country' className="mb-4">
                      <Form.Control as="textarea"
                      name="country"
                      placeholder='País'
                      value={usuario.country}
                      onChange={handleChange}
                      ></Form.Control>
                      </FloatingLabel>
                  </Form.Group>
                  <Button type='submit' className='me-4 mb-2' variant='outline-primary'>Editar Usuario</Button>
              </Form>
              </Card.Body>
          </Card>
      </Container>
        
  );
}

export default FormularioEdicionUsuario;
