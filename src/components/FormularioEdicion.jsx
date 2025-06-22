import { Alert, Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import { useProductosContext } from "../contexts/ProductosContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dispararSweetAlertBasico } from "../assets/SweetAlert";
import { useAuthContext } from "../contexts/AuthContext";

function FormularioEdicion() {
  const {admin}= useAuthContext();
  const {productoSeleccionado, obtenerUnProducto, editarProducto}= useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoSeleccionado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  if(!admin){
    return(
        <Navigate to='/login' replace />
    )
      
  }

  useEffect(() => {
    obtenerUnProducto(id).then((productoSeleccionado) => {
      setCargando(false);
    }).catch((error) => {
        setError('Hubo un problema al cargar los productos.');
        setCargando(false);
    });
  }, []);

  const validarFormulario = () => {
    if (!producto.name.trim()) {
    return("El nombre es obligatorio.")
    }
    if (!producto.price || producto.price <= 0) {
    return("El precio debe ser mayor a 0.")
    }
    if (!producto.description.trim() || producto.description.length < 10) {
    return("La descripción debe tener al menos 10 caracteres.")
    }
    if(!producto.imagen.trim()){
    return("La url de la imagen no debe estar vacía")
    }
    else{
    return true
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario()
      if (validarForm == true) {
      editarProducto(producto).then((producto) => {
        dispararSweetAlertBasico("OK", 'Producto actualizado correctamente.', "success", "Cerrar");
        navigate("/productos/"+id);
      }).catch((error) => {
          dispararSweetAlertBasico("Hubo un problema al agregar el producto", error.message, "error", "Cerrar")
      })
      } else{
          dispararSweetAlertBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
          setError(validarForm);
      }
  };

  return ( 
      <Container className="mt-5 d-flex justify-content-center align-items-center mb-5" style={{ maxWidth: 400 }}>
          <Card className='shadow-lg' style={{ width: "24rem" }}>
              <Card.Body>
              <Card.Title className="mb-3 text-center">Editar Producto</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label="Nombre" className="mb-3">
                          <Form.Control type="text" name="name"placeholder='nombre' value={producto.name} onChange={handleChange} ></Form.Control>
                      </FloatingLabel> 
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label="Url Imagen" className="mb-4">
                          <Form.Control type="text" name="imagen" placeholder='Url Imagen' value={producto.imagen} onChange={handleChange} ></Form.Control>
                      </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label="Precio" className="mb-4">
                      <Form.Control type="number" step={0.01} name="price" placeholder='precio' value={producto.price} onChange={handleChange} min="0"></Form.Control>
                      </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                      <FloatingLabel controlId="floatingInput" label='Descripcion' className="mb-4">
                      <Form.Control as="textarea"
                      name="description"
                      placeholder='descripcion'
                      value={producto.description}
                      onChange={handleChange}
                      ></Form.Control>
                      </FloatingLabel>
                  </Form.Group>
                  <Button type='submit' className='me-4 mb-2' variant='outline-primary'>Editar Producto</Button>
              </Form>
              </Card.Body>
          </Card>
      </Container>
        
  );
}

export default FormularioEdicion;