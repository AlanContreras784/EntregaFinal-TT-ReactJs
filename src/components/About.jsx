import { FaShoppingCart, FaSmileBeam, FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="container py-5" style={{ maxWidth: "700px" }}>
      <h1 className="text-center mb-4">Sobre Nosotros</h1>
      
      <p className="lead d-flex align-items-center">
        <FaShoppingCart className="text-warning me-3" size={24} />
        Somos más que una tienda online: somos tu nuevo lugar favorito para encontrar lo que necesitás.
      </p>
      
      <p className="lead d-flex align-items-center">
        <FaBolt className="text-info me-3" size={24} />
        Productos de calidad, precios accesibles y una experiencia de compra simple, rápida y segura.
      </p>
      
      <p className="lead d-flex align-items-center mb-4">
        <FaSmileBeam className="text-success me-3" size={24} />
        Tecnología, moda, accesorios y mucho más, ¡todo a un clic de distancia!
      </p>

      <div className="text-center">
        <Link to={'/productos'}><button type="button" className="btn btn-outline-success btn-lg">
          Explorar Tienda
        </button></Link>
      </div>
    </section>
  );
}
