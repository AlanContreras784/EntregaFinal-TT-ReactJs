import "../styles/Carrito.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import CarritoCard from "./CarritoCard.jsx";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { Button } from "react-bootstrap";
import {ToastContainer, toast} from "react-toastify";

export default function Carrito() {
    const {user}=useAuthContext();
    const {productosCarrito, vaciarCarrito, borrarProductoCarrito}=useContext(CarritoContext);

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    );

    function funcionDisparadora(id){
        borrarProductoCarrito(id)
    };

    function terminarCompra(){
        toast.success('Compra exitosa');
        vaciarCarrito();
        //navegar('/productos');
        
    }

    if(!user){
        return(
            <Navigate to='/login' replace />
        )
        
    }

    return(
        <div key={productosCarrito.id} className="carrito-conteiner">
            {productosCarrito.length > 0 ? productosCarrito.map((producto) => (
                <CarritoCard 
                    producto={producto}
                    funcionDisparadora={funcionDisparadora}
                />
            ))
            : <p>Carrito vacio</p>}
            <div className="w-100">
                {total > 0 ? <span>Total a pagar: {total.toFixed(2)} $</span>: <></>}
            </div>
            <div>
                <Button onClick={terminarCompra} className="mx-4" variant="success" >Comprar</Button>
                <Button variant="outline-danger" className="mx-4"  onClick={vaciarCarrito}>Vaciar carrito</Button>
                <Link to={"/productos"}><button  className="btn btn-outline-success">Volver a Productos</button></Link>
                <ToastContainer/>
            </div>
            
        </div>
    )
}