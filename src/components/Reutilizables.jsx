import {useEffect, useState } from "react"
import "../styles/Productos.css"
import { useProductosContext } from "../contexts/ProductosContext";
import CardProducto from "./CardProducto";
import { Button, Col, Container, Pagination, Row } from "react-bootstrap";
import GifCargando from "../assets/img/Gif_Cargando.gif"
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";


function Reutilizables(){
    const {productos,obtenerPorCategoria} = useProductosContext();
    const [error, setError] = useState(null);
    const [cargando, setCargando]= useState(true);
    //Para Paginación----------------------------------------------
    const productosPorPagina = 9; // Cantidad de productos a mostrar por página
    const [paginaActual, setPaginaActual] = useState(1);
    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    // Cambiar de página
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    
    {useEffect(() => {
        obtenerPorCategoria("reutilizables").then((productos) => {
            console.log(productos);
            setCargando(false);
        }).catch((error) => {
            console.log("Error", error);
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        })
    }, []);}

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{paddingTop:"200%",position:"relative", width:"100%", height:"100%"}}><iframe className="w-50 h-100" src={GifCargando} style={{position:"absolute", top:"0"}} frameBorder="0" allowFullScreen></iframe></div>
        )
        
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <Container >
                <h1 className="fst-italic fs-3 w-100 mt-5 mb-4" >REUTILIZABLES</h1>
                <Row  xs={1} md={2} lg={3} className=" mb-4  ">
                        {productosActuales.map((producto) => (
                            <Col key={producto.id} className="mb-3 g-4 d-flex justify-content-center align-items-center  ">
                                <CardProducto
                                    producto={producto}
                                />
                            </Col>
                        ))}
                </Row>
                <Container className=" my-4">
                    <Button
                        className="mx-1 border-0"
                        variant="outline-success"
                        disabled={paginaActual==1}
                        onClick={()=>cambiarPagina(paginaActual-1)}
                    ><MdOutlineKeyboardDoubleArrowLeft size={20}  />
                    </Button>
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
                    <Button
                        className="mx-1 border-0"
                        variant="outline-success"
                        disabled={paginaActual===totalPaginas}
                        onClick={()=>cambiarPagina(paginaActual+1)}
                    ><MdOutlineKeyboardDoubleArrowRight size={20}  />
                    </Button>
                </Container>
            </Container>
        )
    }

    
}

export default Reutilizables
