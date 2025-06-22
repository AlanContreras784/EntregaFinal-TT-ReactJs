import { createContext, useState } from "react";
import { dispararSweetAlertBasico } from "../assets/SweetAlert";
import Swal from "sweetalert2";

// Crear el contexto
export const CarritoContext = createContext();
// Proveedor del contexto
export function CarritoProvider({ children }) {

    const [productosCarrito, setProductosCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        const existe = productosCarrito.find(p => p.id === producto.id);
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id){
                    const productoActualizado = {...p, cantidad: p.cantidad + producto.cantidad}
                    return productoActualizado
                }else{
                    return p
                }
            })
            setProductosCarrito(carritoActualizado)
        }else{
            // Si no existe, lo agregamos con su cantidad
            const nuevoCarrito = [...productosCarrito, producto];
            setProductosCarrito(nuevoCarrito)
        }
    };
    const vaciarCarrito = () => {
        dispararSweetAlertBasico("Carrito Vacio", "El carrito fue vaciado con éxito ", "error", "Cerrar");
        setProductosCarrito([]);
    };
    function borrarProductoCarrito(id){

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
            title: "Estas seguro ?",
            text: "Quieres Elimar este producto del Carrito!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, Eliminalo!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                    title: "Eliminado!",
                    text: "Su producto ha sido eliminado del Carrito.",
                    icon: "success",
                });
                const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
                setProductosCarrito(nuevoCarrito);
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "Tu producto no fue eliminado :)",
                icon: "error"
                });
            }
        });
        console.log(id)
    }

    return (
        <CarritoContext.Provider
        value={{ productosCarrito, agregarAlCarrito, vaciarCarrito, borrarProductoCarrito }}
        >
        {children}
        </CarritoContext.Provider>
    );
}
