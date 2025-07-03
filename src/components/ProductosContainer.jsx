import {useEffect, useState } from "react"
import "../styles/Productos.css"
import { useProductosContext } from "../contexts/ProductosContext";
import CardProducto from "./CardProducto";
import {Helmet} from 'react-helmet-async'
import { Button, Col, Container, Pagination, Row } from "react-bootstrap";


function ProductosContainer({}){
    const {productos, obtenerProductos} = useProductosContext();
    const [error, setError] = useState(null);
    const [cargando, setCargando]= useState(true);
    //Para Paginación----------------------------------------------
    const productosPorPagina = 6; // Cantidad de productos a mostrar por página
    const [paginaActual, setPaginaActual] = useState(1);
    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    // Cambiar de página
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    
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
            <Container >
                <Helmet>
                    <title>Cero Huella | Productos</title>
                    <meta name="description" content="Explora nuestra variedad de productos." />
                </Helmet>
                <h1 className="fst-italic fs-3 w-100 mt-5 mb-4" >NUESTROS PRODUCTOS</h1>
                <Row xs={1} md={2} lg={3} className=" mb-4  ">
                        {productosActuales.map((producto) => (
                            <Col className="mb-3 g-4 d-flex justify-content-center align-items-center  ">
                                <CardProducto
                                    key={producto.id}
                                    producto={producto}
                                />
                            </Col>
                        ))}
                </Row>
                <Container className=" my-4">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                    <Button
                        key={index + 1}
                        className='mx-1'
                        variant={`${paginaActual === index + 1 ? "success" : "outline-success"}`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </Button>
                    ))}
                </Container>

                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                    </Pagination>
            </Container>
        )
    }

    
}

export default ProductosContainer
