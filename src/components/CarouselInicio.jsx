import Carousel from 'react-bootstrap/Carousel';
import imagen2 from '../assets/img/carousel_02.jpg';
import imagen3 from '../assets/img/carousel_03.jpg';
import '../styles/Carousel.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function CarouselInicio() {
  return (
    <Carousel className=''>
      <Carousel.Item>
        <img src='https://i.postimg.cc/FHYKVPwD/plantas_1920.jpg'/>
        <Carousel.Caption className='bottom-10'>
          <h1 className="text-center mx-auto">UN COMPROMISO CON EL PLANETA</h1>
          <img
            className="logoRockVerde img-fluid w-25 mx-auto mb-2"
            src="https://i.postimg.cc/gJsdWRfx/R&V_Logo_Verde_1024(2).png"
            alt=""
          />
        <div className="divBlur  text-center mx-auto pb-3">
          <p className="p-3">
            Innovación que respeta el medio ambiente. Creamos piezas únicas que
            minimizan nuestra huella ecológica.
          </p>
          <Button variant='outline-success'><Link className='nav-link ' to={"/productos"} aria-label='nuestros productos'
            >NUESTROS PRODUCTOS
          </Link></Button>
        </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img  src={imagen2}/>
        <Carousel.Caption className=''>
          <h3>Compra rápida desde tu móvil</h3>
          <p>Accede a nuestras ofertas exclusivas y compra con un solo clic desde cualquier lugar, 24/7.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://i.postimg.cc/0N0bn1w7/reutilizables-carrusel.jpg'/>
        <Carousel.Caption className=''>
          <h3>Biodegradables</h3>
          <p>Artículos fabricados con materiales que se descomponen sin dañar el medio ambiente.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={imagen3}/>
        <Carousel.Caption className=''>
          <h3>Productos Sostenibles</h3>
          <p>Que promueven la economía circular y reducen el impacto ambiental.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselInicio;