import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetAlertBasico, dispararSweetAlertTrueFalse } from "../assets/SweetAlert";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CarritoContext } from "../contexts/CarritoContext";
import { Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import {ToastContainer, toast} from "react-toastify"

function ProductoDetalle({}) {
  const {agregarAlCarrito} = useContext(CarritoContext);
  const {admin}= useAuthContext();
  const {obtenerUnProducto, productoSeleccionado, eliminarProducto} = useProductosContext();
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  console.log(id)

  {useEffect(() => {
    obtenerUnProducto(id).then((productoSeleccionado) => {
      setCargando(false);
    }).catch((error) => {
        setError('Hubo un problema al cargar los productos.');
        setCargando(false);
    })
  }, [id]);}

  async function dispararEliminar(){
    const confirmar = await dispararSweetAlertTrueFalse('¿Estás seguro que quieres eliminar este producto?', "Esto no se puede deshacer", 'warning','Sí, Eliminar')// window.confirm('¿Estás seguro de eliminar?');
    console.log(confirmar)
    if (confirmar) {
      eliminarProducto(id).then(()=>{
        dispararSweetAlertBasico('Eliminado', 'Producto eliminado correctamente.', 'success','OK')
        navigate('/productos')
      }).catch((error)=>{
        alert('Hubo un problema al eliminar el producto.');
        dispararSweetAlertBasico("Hubo un problema al eliminar el producto", error, "error", "Cerrar")
      })
    }  
  }



  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetAlertBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoSeleccionado, cantidad });
    toast.success('Agregado al carrito con existo');
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoSeleccionado) return null;

  return (
    <div className="div-detalle py-4">
      <h1 className="fst-italic fs-3 mb-4">DETALLES DEL PRODUCTO</h1>
      <div className="detalle-container">
        <img className="detalle-imagen mx-auto mb-3" src={productoSeleccionado.imagen} alt={productoSeleccionado.name} />
      <div className="detalle-info">
        <h1 className="fs-2 ">{productoSeleccionado.name}</h1>
        <p>{productoSeleccionado.description}</p>
        <h6>$ {productoSeleccionado.price} </h6>
        {admin?
          <div className="d-flex  flex-column ">
            <Link to={"/admin/editarProducto/" + id}><Button className="mx-auto mb-2 " variant="outline-warning">Editar Producto</Button></Link>
            <Button className="mx-auto mb-2 " variant="outline-danger" onClick={dispararEliminar}>Eliminar Producto</Button>
            <Link to={"/productos"}><Button  variant="outline-success">Ir a Productos</Button></Link>
          </div> 
          :
          <div >
            <div>
                <button className="me-3 mb-2 btn btn-light" onClick={restarContador}>-</button>
                <span>{cantidad}</span>
                <button className="ms-3 mb-2 btn btn-light" onClick={sumarContador}>+</button>
            </div>
            <div className="d-flex  flex-column ">
              <Button className="mx-auto mb-2 " variant="outline-primary" onClick={funcionCarrito}>Agregar al carrito</Button>
             <ToastContainer></ToastContainer>
              <Link className="mx-auto mb-2" to={"/productos/"}> <Button variant="outline-success ">Volver a Productos</Button> </Link>
              <Link to={"/carrito"}><Button  variant="outline-warning">Ir a Carrito</Button></Link>
            </div>  
          </div>
        } 
        </div>
      </div>
    </div>
    
  );
}

export default ProductoDetalle;