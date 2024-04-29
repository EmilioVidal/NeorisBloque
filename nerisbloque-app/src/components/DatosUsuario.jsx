import React from 'react'

function DatosUsuario({ datos }) {
  return (
    <div>
      {typeof datos === 'string' ? datos : 'Información no disponible'}
    </div>
  );
}


export default DatosUsuario
