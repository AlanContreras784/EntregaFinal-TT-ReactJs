
# 🌿 Cero Huella – E-commerce Sostenible

Aplicación web desarrollada en **React + Firebase** que permite a usuarios comprar productos sostenibles, explorar categorías ecológicas y registrarse para recibir atención personalizada. Incluye panel de administración, autenticación, carrito de compras y más.

🌐 [Ver aplicación en producción](https://entrega-final-tt-react-js.vercel.app/)

---

## 📦 Características Principales

- 🔍 **Catálogo de productos** dividido por categorías: Reutilizables, Biodegradables y más.
- 🛒 **Carrito de compras** dinámico con contador de ítems.
- 🔐 **Login y Registro de usuarios** con Firebase Authentication.
- 🧑‍💼 **Panel administrativo** para agregar, editar y ver usuarios/productos.
- 📋 **Formulario de contacto** con SweetAlert.
- 📱 Diseño responsive y experiencia moderna.

---

## 🧑‍💻 Tecnologías Usadas

- ⚛️ React (Vite)
- 🔥 Firebase (Auth + Firestore)
- 🎨 Bootstrap
- 📄 React Router DOM
- 💬 SweetAlert2, React Toastify
- 🧠 Context API

---

## 📂 Estructura de Componentes

### Cliente
- `ProductosContainer.jsx`: catálogo de productos paginado.
- `Reutilizables.jsx`: productos filtrados por categoría.
- `Carrito.jsx`: productos agregados al carrito.
- `Login.jsx` y `Registrarse.jsx`: autenticación de usuarios.
- `Header.jsx`: navegación con búsqueda y rutas protegidas.
- `About.jsx`: sección institucional con texto, video e imágenes.

### Admin
- `FormularioProducto.jsx`: alta de productos.
- `FormularioEdicion.jsx`: edición de productos existentes.
- `UsuariosContainerFirebase.jsx`: listado de usuarios registrados.
- `FormularioEdicionUsuario.jsx`: editar info de usuarios.

---

## 🖥️ Instalación y Ejecución Local

```bash
git clone https://github.com/AlanContreras784/PROYECTO-TT-REACT-JS.git
cd PROYECTO-TT-REACT-JS
npm install
```

### Variables de entorno

Creá un archivo `.env` y completá con tus claves de Firebase:

```env
VITE_API_KEY=...
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...
```

### Ejecutar app localmente

```bash
npm run dev
```

---

## 🧪 Funcionalidades destacadas para usuarios

| Función                  | Acceso desde               | Detalle |
|--------------------------|----------------------------|---------|
| Ver productos            | `/productos`               | Catálogo general |
| Buscar productos         | barra de navegación        | Filtro dinámico |
| Ver detalles de producto | `/productos/:id`           | Vista ampliada |
| Agregar al carrito       | botón en tarjeta producto  | Contador dinámico |
| Registrarse / Loguearse  | `/login` `/registrarse`    | Registro con Firebase |
| Contacto                 | `/contacto`                | Formulario con SweetAlert |
| Ver “Nosotros”           | `/about`                   | Misión, visión y video institucional |

---

## 👤 Autor

Desarrollado por [Alan Contreras Flores](https://github.com/AlanContreras784)

---

## 📃 Licencia

MIT License

---

## 🙋‍♂️ ¿Querés contribuir?

¡Bienvenido! Podés abrir un `Issue` o hacer un `Pull Request`. Las sugerencias, mejoras de UI o nuevas funcionalidades son bienvenidas.
