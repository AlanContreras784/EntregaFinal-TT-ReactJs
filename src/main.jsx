import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { CarritoProvider } from './contexts/CarritoContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProductosProvider } from './contexts/ProductosContext.jsx';
import { UsuariosProvider } from './contexts/UsuarioContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsuariosProvider>
    <ProductosProvider>
    <AuthProvider>
    <CarritoProvider>
      <App />
    </CarritoProvider>
    </AuthProvider>
    </ProductosProvider>
    </UsuariosProvider>
  </StrictMode>,
)
