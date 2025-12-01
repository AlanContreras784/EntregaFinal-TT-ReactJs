import { createContext, useState, useContext } from 'react';
import Swal from "sweetalert2";

// Crear el contexto del manejo de Productos------------------------------------ 
const ProductosContext = createContext();

export function ProductosProvider({ children }) {

    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState([]);
    const [productosBuscados,setProductosBuscados]=useState([]);

//-------------------FUNCION OBTENER PRODUCTOS DE LA API------------------------------  
    async function obtenerProductos() {
    try {
        const respuesta = await fetch('https://node-entrega-final-back-end.vercel.app/api/products');
        const datos = await respuesta.json();
        setProductos(datos.payload);
        setProductosBuscados(datos.payload);
        return datos.payload;
    } catch (error) {
        throw new Error(error.message || 'Error al obtener productos');
    }
}


//-------------------FUNCION OBTENER PRODUCTOS POR CATEGORIA DE LA API------------------------------ 

async function obtenerPorCategoria(categoria) {
    try {
        const respuesta = await fetch('https://node-entrega-final-back-end.vercel.app/api/products');
        const datos = await respuesta.json();
        const categoriaLower = categoria.toLowerCase();
        const filtrados = datos.payload.filter(p => p.category?.toLowerCase() === categoriaLower);
        setProductos(filtrados);
        setProductosBuscados(filtrados);
        return filtrados;
    } catch (error) {
        throw new Error(error.message || 'Error al filtrar por categoría');
    }
}




//--------------------FUNCION AGREGAR PRODUCTO A LA API------------------------------------
    const agregarProducto = async (producto) => {
    const url = 'https://node-entrega-final-back-end.vercel.app/api/products/create';
    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            },
            body: JSON.stringify(producto),
        });
        if (!respuesta.ok) throw new Error('Error al agregar el producto.');
        const data = await respuesta.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

//--------------------FUNCION OBTENER UN PRODUCTO  A LA API------------------------------------

    async function obtenerUnProducto(id) {
  try {
    const respuesta = await fetch(`https://node-entrega-final-back-end.vercel.app/api/products/${id}`);
    if (!respuesta.ok) throw new Error("No se pudo obtener el producto");

    const data = await respuesta.json();

    // Ajustar según tu API que devuelve payload
    const producto = data.payload; 

    if (!producto) throw new Error("Producto no encontrado");

    setProductoSeleccionado(producto);
    return producto; // opcional si querés usar .then
  } catch (error) {
    throw new Error(error.message || "Error al obtener el producto");
  }
}



//--------------------FUNCION MODIFICAR UN PRODUCTO YA EXISTENTE DE LA API------------------------------------

async function editarProducto(producto) {
    try {
        const { id, ...resto } = producto;
        console.log(producto);
        
        const respuesta = await fetch(`https://node-entrega-final-back-end.vercel.app/api/products/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            },
            body: JSON.stringify(resto),
        });

        if (!respuesta.ok) throw new Error('Error al actualizar el producto.');

        return await respuesta.json();

    } catch (error) {
        throw new Error(error.message || 'Error al editar producto');
    }
}

//--------------------FUNCION ELIMINAR UN PRODUCTO  A LA API------------------------------------

async function eliminarProducto(id) {
    try {
        const respuesta = await fetch(`https://node-entrega-final-back-end.vercel.app/api/products/${id}`, 
            { 
                method: 'DELETE' ,
                headers: { "Authorization": "Bearer " + localStorage.getItem("authToken") }
            });
        if (!respuesta.ok) throw new Error('Error al eliminar producto');
        return true;
    } catch (error) {
        throw new Error(error.message || 'Error al eliminar producto');
    }
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