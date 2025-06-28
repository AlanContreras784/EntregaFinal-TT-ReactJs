import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetAlertBasico, dispararSweetAlertTrueFalse } from "../assets/SweetAlert";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useUsuariosContext } from "../contexts/UsuarioContext";

function UsuarioDetalleFirebase({}) {
  const {admin}= useAuthContext();
  const { id } = useParams();
  const {obtenerUnUsuarioFirebase,eliminarUsuarioFirebase, usuarioSeleccionado}=useUsuariosContext();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  console.log(id)

  useEffect(() => {
    obtenerUnUsuarioFirebase(id).then((usuarioSeleccionado) => {
      setCargando(false);
    }).catch((error) => {
        setError('Hubo un problema al cargar los productos.');
        setCargando(false);
    })
  }, [id]);

  async function dispararEliminar(){
    const confirmar = await dispararSweetAlertTrueFalse('¿Estás seguro que quieres eliminar este usuarioo?', "Esto no se puede deshacer", 'warning','Sí, Eliminar')// window.confirm('¿Estás seguro de eliminar?');
    console.log(confirmar)
    if (confirmar) {
      eliminarUsuarioFirebase(id).then(()=>{
        dispararSweetAlertBasico('Eliminado', 'Usuario eliminado correctamente.', 'success','OK')
        navigate('/admin/usuarios')
      }).catch((error)=>{
        dispararSweetAlertBasico("Hubo un problema al eliminar el usuario", error, "error", "Cerrar")
      })
    }  
  }


  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!usuarioSeleccionado) return null;

  return (
    <div className="div-detalle py-4">
      <h1 className="fst-italic fs-3 mb-4">DETALLES DEL USUARIO</h1>
      <div className="detalle-container">
        <img className="detalle-imagen mx-auto mb-3" src={usuarioSeleccionado.imagen} alt={usuarioSeleccionado.name} />
        <div className="detalle-info">
          <h1 className="fs-2 ">{usuarioSeleccionado.name}</h1>
          <p><strong>E-mail: </strong>  {usuarioSeleccionado.email}</p>
          <p><strong>Edad: </strong>  {usuarioSeleccionado.age}</p>
          <h6> <strong>País: </strong>   {usuarioSeleccionado.country} </h6>
          {admin?
            <div className="d-flex  flex-column ">
              <Link to={"/admin/editarUsuario/" + id}><Button className="mx-auto mb-2 " variant="outline-warning">Editar Usuario</Button></Link>
              <Button className="mx-auto mb-2 " variant="outline-danger" onClick={dispararEliminar} >Eliminar Usuario</Button>
              <Link to={"/admin/usuarios"}><Button  variant="outline-success">Ir a Usuarios</Button></Link>
            </div> 
            : <></>
          } 
        </div>
      </div>
    </div>
    
  );
}

export default UsuarioDetalleFirebase;