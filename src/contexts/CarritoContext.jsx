import { createContext, useState, useCallback } from "react";
import { dispararSweetAlertBasico } from "../assets/SweetAlert";
import Swal from "sweetalert2";

// Siempre pasar un valor inicial seguro
export const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {

  const [productosCarrito, setProductosCarrito] = useState([]);

  // ----------- AGREGAR PRODUCTO -----------
  const agregarAlCarrito = useCallback((producto) => {
    setProductosCarrito((prevCarrito) => {
      const existe = prevCarrito.find(p => p.id === producto.id);

      if (existe) {
        return prevCarrito.map(p =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + producto.cantidad }
            : p
        );
      }

      return [...prevCarrito, producto];
    });
  }, []);


  // ----------- VACIAR CARRITO -----------
  const vaciarCarrito = useCallback(() => {
    dispararSweetAlertBasico(
      "Carrito Vacío",
      "El carrito fue vaciado con éxito",
      "error",
      "Cerrar"
    );
    setProductosCarrito([]);
  }, []);


  // ----------- BORRAR PRODUCTO -----------
  const borrarProductoCarrito = useCallback((id) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro?",
        text: "¿Quieres eliminar este producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Eliminado",
            text: "El producto fue eliminado del carrito.",
            icon: "success",
          });

          setProductosCarrito((prev) => prev.filter((p) => p.id !== id));

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El producto no fue eliminado :)",
            icon: "error",
          });
        }
      });

  }, []);


  return (
    <CarritoContext.Provider
      value={{
        productosCarrito,
        agregarAlCarrito,
        vaciarCarrito,
        borrarProductoCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
