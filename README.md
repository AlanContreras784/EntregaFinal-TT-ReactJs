# 🌿 Cero Huella – E-commerce Sostenible

Aplicación web desarrollada en **React + Firebase** que permite a usuarios comprar productos sostenibles, explorar categorías ecológicas y registrarse para recibir atención personalizada. Incluye panel de administración, autenticación, carrito de compras y más.

🌐 **Demo:** (si está desplegada) revisá la URL configurada en `vercel.json` o tu despliegue en Vercel.

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

## 🧩 Resumen & Organización

- SPA (single page application) con catálogo, detalle, carrito y autenticación.
- Estado global manejado con Context API (`src/contexts/`): `AuthContext.jsx`, `CarritoContext.jsx`, `ProductosContext.jsx`, `UsuarioContext.jsx`.
- Componentes principales en `src/components/` y estilos en `src/styles/`.

---

## 📂 Estructura de Componentes (resumen)

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

## 🖥️ Instalación y Ejecución Local (PowerShell)

```powershell
git clone https://github.com/AlanContreras784/PROYECTO-TT-REACT-JS.git
cd "c:\CERO-HUELLA-Talent Tech\EntregaFinal-TT-ReactJs"
npm install
```

### Ejecutar en desarrollo

```powershell
npm run dev
```

Abre la URL que muestre Vite (por defecto `http://localhost:5173`).

### Build de producción y preview

```powershell
npm run build
npm run preview
```

---

## 🔐 Variables de entorno / Firebase

El proyecto incluye `src/Auth/firebase.js` con la inicialización de Firebase. Reemplazala con tus credenciales o usa variables de entorno con Vite.

Ejemplo de `.env` para Vite (archivo en la raíz):

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

En `src/Auth/firebase.js` podés usar `import.meta.env.VITE_FIREBASE_API_KEY` para leerlas.

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

## ✅ Buenas prácticas y notas

- Actualiza `src/Auth/firebase.js` con tus claves o usa variables de entorno.
- Si agregás assets estáticos, colocalos en `public/` o `src/assets/img/`.
- Mantén los contexts con responsabilidades claras (productos, usuario, carrito).

---

## 🚀 Despliegue

- Configurado para Vercel (archivo `vercel.json`). Conectá tu repo en Vercel y añadí las variables de entorno en el panel de Vercel.

---

## 🤝 Contribuciones

1. Forkear el repositorio
2. Crear una rama con tu feature/bugfix
3. Abrir un Pull Request describiendo los cambios

---

## 👤 Autor

Desarrollado por [Alan Contreras Flores](https://github.com/AlanContreras784) — `AlanContreras784`

---

## 📃 Licencia

MIT

---