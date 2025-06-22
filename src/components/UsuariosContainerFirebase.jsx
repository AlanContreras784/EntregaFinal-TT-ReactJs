import { useEffect, useState } from "react"
import "../styles/Productos.css"
import { obtenerUsuarios } from "../Auth/firebase.js";
import CardUsuario from "./CardUsuario.jsx";

function UsuariosContainerFirebase({}){
    const [usuarios, setUsuarios] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    {useEffect(() => {
        obtenerUsuarios()
            .then((datos) => {
                console.log(datos)
                setUsuarios(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un problema al cargar los usuarios.');
                setCargando(false);
            });
    }, []);}

    if (cargando) {
        return <p>Cargando Usuarios...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div  className="productos-conteiner">
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
