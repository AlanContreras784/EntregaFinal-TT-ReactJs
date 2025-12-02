import { createContext, useState, useContext } from 'react';
import {
    editarUsuario,
    eliminarUsuario,
    obtenerUsuarioEnFirebase,
    obtenerUsuarios
} from '../Auth/firebase.js';

// Crear el contexto del manejo de Usuarios
const UsuariosContext = createContext();

export function UsuariosProvider({ children }) {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    // ------------------------------------------------------
    // OBTENER TODOS LOS USUARIOS (Firebase)
    // ------------------------------------------------------
    async function obtenerUsuariosFirebase() {
        try {
            const lista = await obtenerUsuarios();
            setUsuarios(lista);
            return lista;
        } catch (error) {
            throw new Error(error?.message || "Error al obtener usuarios");
        }
    }

    // ------------------------------------------------------
    // OBTENER UN USUARIO POR ID
    // ------------------------------------------------------
    async function obtenerUnUsuarioFirebase(id) {
        try {
            const usuario = await obtenerUsuarioEnFirebase(id);
            setUsuarioSeleccionado(usuario);
            return usuario;
        } catch (error) {
            console.error(error);
            throw new Error("Hubo un error al obtener el usuario."+ error?.message);

        }
    }

    // ------------------------------------------------------
    // EDITAR USUARIO
    // ------------------------------------------------------
    async function editarUsuarioFirebase(usuario) {
        try {
            const usuarioActualizado = await editarUsuario(usuario);

            // Actualiza estado global si corresponde
            setUsuarioSeleccionado(usuarioActualizado);
            setUsuarios(prev =>
                prev.map(u => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
            );

            return usuarioActualizado;

        } catch (error) {
            throw new Error(error?.message || "Error al editar el usuario");
        }
    }

    // ------------------------------------------------------
    // ELIMINAR USUARIO
    // ------------------------------------------------------
    async function eliminarUsuarioFirebase(id) {
        try {
            await eliminarUsuario(id);

            // Actualizar lista
            setUsuarios(prev => prev.filter(u => u.id !== id));

            // Si era el seleccionado lo quitamos
            if (usuarioSeleccionado?.id === id) {
                setUsuarioSeleccionado(null);
            }

            return true;

        } catch (error) {
            throw new Error(error?.message || "Error al eliminar usuario");
        }
    }

    // ------------------------------------------------------
    return (
        <UsuariosContext.Provider
            value={{
                usuarios,
                usuarioSeleccionado,
                obtenerUsuariosFirebase,
                obtenerUnUsuarioFirebase,
                editarUsuarioFirebase,
                eliminarUsuarioFirebase
            }}
        >
            {children}
        </UsuariosContext.Provider>
    );
}

export const useUsuariosContext = () => useContext(UsuariosContext);
