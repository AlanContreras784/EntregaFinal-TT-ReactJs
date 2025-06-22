import { Card, Button } from "react-bootstrap";
import "../styles/Productos.css"
import { Link} from "react-router-dom";


function CardUsuario({usuario}){
    
    return(
        <Card className="producto-card rounded-4 " key={usuario.id}>
            <Card.Body className="p-0 ">
                <img className="producto-image mb-2 rounded-top-4" src={usuario.imagen}></img>
                <Card.Title><h5>{usuario.name}</h5></Card.Title>
                <Card.Subtitle><p>{usuario.email} </p></Card.Subtitle>
                <Link to={"/admin/usuarios/"+ usuario.id}><Button variant="outline-success">Ver Detalles del Usuario</Button></Link>
            </Card.Body>
        </Card>     
    )
}

export default CardUsuario;