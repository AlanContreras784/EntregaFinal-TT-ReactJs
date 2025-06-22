import { FaTools } from 'react-icons/fa';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Admin() {
  const {admin} =useAuthContext();

  if(!admin){
    return(
        <Navigate to='/login' replace />
    ) 
  }

  return (
    <div className="container text-center mt-5 mb-5">
      <FaTools size={64} className="text-warning mb-4" />
      <h1 className="display-5">¡Oops! Zona en construcción 🏗️</h1>
      <p className="lead mt-3">El Panel de Administración todavía está en proceso de armado.</p>
      <p className="text-muted">
        Estamos afinando los últimos detalles para que tengas el control total... <br />
        ¡Muy pronto estará disponible!
      </p>
      <div className="spinner-border text-warning mt-4" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
}