import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { dispararSweetAlertBasico } from '../assets/SweetAlert';
import { Alert, Button, Card, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useProductosContext } from '../contexts/ProductosContext';

function FormularioProducto({}) {

    const {admin} = useAuthContext();
    const [error, setError] = useState("");
    const {agregarProducto} = useProductosContext();
    const navigate = useNavigate();
    const [producto, setProducto] = useState({
        name: '',
        price: '',
        description: '',
        imagen: "",
    });

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

    const handleSubmit2 = (e) => {
        e.preventDefault();
        const validarForm = validarFormulario()
        if (validarForm == true) {
        agregarProducto(producto).then((data) => {
            setProducto({ name: '', price: '', description: '', imagen: ""});
            setError('')
            dispararSweetAlertBasico("Producto Agregado", "El producto fue agregado con éxito", "success", "Cerrar");
            //navigate("/productos/");
        }).catch((error) => {
            dispararSweetAlertBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
        })
        } else{
            dispararSweetAlertBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
            setError(validarForm);
        }
    }

    if(!admin){
        return(
            <Navigate to="/login" replace/>
        )
    }

    return ( 
        <Container className="mt-5 d-flex justify-content-center align-items-center mb-5" style={{ maxWidth: 400 }}>
            <Card className='shadow-lg' style={{ width: "24rem" }}>
                <Card.Body>
                <Card.Title className="mb-3 text-center">Agregar Producto</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit2}>
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
                        <Form.Control type="number" name="price" placeholder='precio' value={producto.price} onChange={handleChange} min="0"></Form.Control>
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
                    <Button type='submit' className='me-4 mb-2' variant='outline-primary'>Agregar Producto</Button>
                </Form>
                </Card.Body>
            </Card>
        </Container>
        
    );
}

export default FormularioProducto;