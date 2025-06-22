import {useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "./CardProducto"
import { useProductosContext } from "../contexts/ProductosContext";
import CardProducto from "./CardProducto";

function ProductosContainer({}){
    const {productos, obtenerProductos} = useProductosContext();
    const [error, setError] = useState(null);
    const [cargando, setCargando]= useState(true)

    {useEffect(() => {
        obtenerProductos().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        })
    }, []);}

    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner py-4 px-5">
                <h1 className="fst-italic fs-3 w-100 m-auto" >NUESTROS PRODUCTOS</h1>
                {productos.map((producto) => (
                    <CardProducto
                        key={producto.id}
                        producto={producto}
                    />
                ))}
            </div>
        )
    }

    
}

export default ProductosContainer
