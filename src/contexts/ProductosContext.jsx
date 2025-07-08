import { createContext, useState, useContext } from 'react';
import Swal from "sweetalert2";

// Crear el contexto del manejo de Productos------------------------------------ 
const ProductosContext = createContext();

export function ProductosProvider({ children }) {

    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState([]);
    const [productosBuscados,setProductosBuscados]=useState([]);

//-------------------FUNCION OBTENER PRODUCTOS DE LA API------------------------------  
    function obtenerProductos() {
        const url= 'https://68100ddf27f2fdac24102328.mockapi.io/productos'
        return(
            new Promise((res, rej) => {
                fetch(url)
                    .then((respuesta) =>
                        respuesta.json()
                    )
                    .then((datos) => {
                        setProductos(datos)
                        setProductosBuscados(datos)
                        res(datos)
                    })
                    .catch((error) => {
                        //console.log("Error", error)
                        rej(error)
                    })
                ;
            })
        )
    }


//-------------------FUNCION OBTENER PRODUCTOS POR CATEGORIA DE LA API------------------------------ 


function obtenerPorCategoria(categoria) {
    return new Promise((res, rej) => {
        fetch('https://68100ddf27f2fdac24102328.mockapi.io/productos')
            .then(res => res.json())
            .then(productos => {
                const categoriaLower = categoria.toLowerCase();

                const filtrados = productos.filter(p =>
                    p.category?.toLowerCase() === categoriaLower
                );

                setProductos(filtrados);
                setProductosBuscados(filtrados);
                //console.log(`Productos de la categoría "${categoria}":`, filtrados);
                res(filtrados);
            })
            .catch(error => {
                //console.error("Error al obtener productos:", error);
                rej(error);
            });
    });
}


//--------------------FUNCION AGREGAR PRODUCTO A LA API------------------------------------
    const agregarProducto = (producto) => {
        return(
            new Promise(async (res, rej) => {
                try {
                    const respuesta = await fetch('https://68100ddf27f2fdac24102328.mockapi.io/productos', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });

                    if (!respuesta.ok) {
                            throw new Error('Error al agregar el producto.');
                    }
                    const data = await respuesta.json();
                    //console.log('Producto agregado:', data);
                    res(data)
                    } catch (error) {
                        //console.error(error.message);
                        rej(error.message)
                    }
            })
        )
    };

//--------------------FUNCION OBTENER UN PRODUCTO  A LA API------------------------------------

    function obtenerUnProducto(id){
        return(
            new Promise((res,rej)=>{
                fetch('https://68100ddf27f2fdac24102328.mockapi.io/productos')
                .then((respuesta) => respuesta.json())
                .then((data) => {
                const productoEncontrado = data.find((d) =>d.id === id);
                if (productoEncontrado) {
                    setProductoSeleccionado(productoEncontrado);
                    res(data)
                } else {
                    rej("Producto no encontrado.");
                }
                })
                .catch((error) => {
                //console.log("Error:", error);
                rej(error)
                });
        })
        )
        
    };

//--------------------FUNCION MODIFICAR UN PRODUCTO YA EXISTENTE DE LA API------------------------------------

function editarProducto(producto){
    return(
        new Promise(async (res,rej)=>{
            try {
                const respuesta = await fetch(`https://68100ddf27f2fdac24102328.mockapi.io/productos/${producto.id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                });
                if (!respuesta.ok) {
                    throw new Error('Error al actualizar el producto.');
                }
                const data = await respuesta.json();
                res(data);
            } catch (error) {
                //console.error(error.message);
                rej(error);
            }   

    })
    )
}

//--------------------FUNCION ELIMINAR UN PRODUCTO  A LA API------------------------------------

const eliminarProducto = (id) => {
    
    return(
        new Promise(async (res, rej) => {
            try {
                const respuesta = await fetch(`https://68100ddf27f2fdac24102328.mockapi.io/productos/${id}`, {
                method: 'DELETE',
                });
                if (!respuesta.ok) throw new Error('Error al eliminar');
                res()
            } catch (error) {
                //console.error(error.message);
                rej(error)
            }
        })
    )
}

//----FUNCION  BUSQUEDA O FILTRAR PRODUCTOS POR NOMBRE Y CATEGORIA  DE LA API ----------


function filtrarProductos(busqueda) {
  const texto = (typeof busqueda === 'string' ? busqueda : busqueda?.name || '').toLowerCase();

  if (texto === '') {
    setProductos(productosBuscados);
    return;
  }

  const productosFiltrados = productosBuscados.filter((producto) => {
    const nombre = producto.name?.toLowerCase() || '';
    const categoria = producto.category?.toLowerCase() || '';

    return nombre.includes(texto) || categoria.includes(texto);
  });

  setProductos(productosFiltrados);
}



return (
    <ProductosContext.Provider value={{productos, obtenerProductos, agregarProducto,productoSeleccionado, obtenerUnProducto, editarProducto, eliminarProducto,filtrarProductos, obtenerPorCategoria }}>
        {children}
    </ProductosContext.Provider> );
}
export const useProductosContext = () => useContext(ProductosContext);