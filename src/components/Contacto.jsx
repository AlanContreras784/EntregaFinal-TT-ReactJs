import { useState } from 'react';

export default function Formulario() {

  const [nombre, setNombre] = useState('');

  function manejarEnvio(evento) {
    evento.preventDefault();
    console.log(evento)
    alert(`Formulario enviado por: ${nombre}`);
    setNombre("");
  }

  return (
      <form onSubmit={manejarEnvio}>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
          />
          <button type="submit">Enviar</button>
      </form>
  );
}