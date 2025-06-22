import { Container, Card, Button } from "react-bootstrap";
import "../styles/Productos.css"
import { Link} from "react-router-dom";


function CardProducto({producto}){
    
    return(
        
                <Card className="producto-card rounded-4 " key={producto.id}>
                    <Card.Body className="p-0 ">
                        <img className="producto-image mb-2 rounded-top-4" src={producto.imagen}></img>
                        <Card.Title><h5>{producto.name}</h5></Card.Title>
                        <Card.Subtitle><p>{producto.price} $</p></Card.Subtitle>
                        <Link to={"/productos/"+producto.id}><Button variant="outline-success">Ver Detalles del Producto</Button></Link>
                    </Card.Body>
                </Card>
            
            
    )
}

export default CardProducto;