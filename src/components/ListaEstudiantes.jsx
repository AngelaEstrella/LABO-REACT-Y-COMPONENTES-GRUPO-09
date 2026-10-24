import TarjetaEstudiante from "./TarjetaEstudiante.jsx";

/**
 * Presenta los registros como una lista de componentes TarjetaEstudiante.
 * Props:
 *  - estudiantes: arreglo de { id, nombre, carrera } que se debe mostrar.
 *  - hayRegistros: false si no existe ningún estudiante en total.
 *  - resaltadoId: id del último estudiante agregado (para destacarlo).
 *  - onEliminar(id): se pasa a cada tarjeta.
 *  - onLimpiarBusqueda(): borra el filtro cuando no hay coincidencias.
 */
export default function ListaEstudiantes({
  estudiantes,
  hayRegistros,
  resaltadoId,
  onEliminar,
  onLimpiarBusqueda,
}) {
  // Estado vacío 1: todavía no hay estudiantes.
  if (!hayRegistros) {
    return (
      <div className="vacio">
        <p className="vacio__titulo">Aún no hay estudiantes</p>
        <p className="vacio__texto">
          Completa el formulario y el primer registro aparecerá aquí.
        </p>
      </div>
    );
  }

  // Estado vacío 2: hay estudiantes, pero la búsqueda no coincide.
  if (estudiantes.length === 0) {
    return (
      <div className="vacio">
        <p className="vacio__titulo">Ningún estudiante coincide</p>
        <p className="vacio__texto">Prueba con otro nombre o carrera.</p>
        <button type="button" className="boton-secundario" onClick={onLimpiarBusqueda}>
          Borrar búsqueda
        </button>
      </div>
    );
  }

  // Renderizado dinámico: un componente por registro, con key única.
  return (
    <ul className="lista">
      {estudiantes.map((estudiante) => (
        <li key={estudiante.id}>
          <TarjetaEstudiante
            id={estudiante.id}
            nombre={estudiante.nombre}
            carrera={estudiante.carrera}
            resaltada={estudiante.id === resaltadoId}
            onEliminar={onEliminar}
          />
        </li>
      ))}
    </ul>
  );
}
