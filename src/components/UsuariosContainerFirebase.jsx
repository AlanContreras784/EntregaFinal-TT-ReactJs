import { useEffect, useState } from "react"
import "../styles/Productos.css"
import CardUsuario from "./CardUsuario.jsx";
import { useUsuariosContext } from "../contexts/UsuarioContext.jsx";
import GifCargando from "../assets/img/Gif_Cargando.gif"

function UsuariosContainerFirebase({}){
    const [usuarios, setUsuarios] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const {obtenerUsuariosFirebase} = useUsuariosContext();

    {useEffect(() => {
        obtenerUsuariosFirebase()
            .then((datos) => {
                //console.log(datos)
                setUsuarios(datos)
                setCargando(false);
            })
            .catch((error) => {
                //console.log("Error", error)
                setError('Hubo un problema al cargar los usuarios.');
                setCargando(false);
            });
    }, []);}

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{paddingTop:"200%",position:"relative", width:"100%", height:"100%"}}><iframe className="w-50 h-100" src={GifCargando} style={{position:"absolute", top:"0"}} frameBorder="0" allowFullScreen></iframe></div>
        )
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div  className="productos-conteiner  py-4 g-0">
                <h1 className="w-100">USUARIOS Y/O CLIENTES</h1>
                
                {usuarios.map((usuario) => (
                    <CardUsuario
                        key={usuario.id}
                        usuario={usuario}
                    />
                ))}
            </div>
        )
    }

    
}

export default UsuariosContainerFirebase
