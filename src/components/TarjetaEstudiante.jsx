// Colores del avatar: la misma carrera siempre obtiene el mismo color.
const TONOS = ["tono-0", "tono-1", "tono-2", "tono-3", "tono-4"];

function tonoPorCarrera(carrera) {
  let suma = 0;
  for (const letra of carrera) suma += letra.charCodeAt(0);
  return TONOS[suma % TONOS.length];
}

function iniciales(nombre) {
  const palabras = nombre.trim().split(/\s+/);
  const primera = palabras[0]?.[0] ?? "";
  const ultima = palabras.length > 1 ? palabras[palabras.length - 1][0] : "";
  return (primera + ultima).toUpperCase();
}

/**
 * Muestra los datos de un estudiante. Todo llega por props.
 * Props:
 *  - id: identificador único del estudiante.
 *  - nombre: nombre completo.
 *  - carrera: carrera que estudia.
 *  - resaltada: true si es el registro recién agregado.
 *  - onEliminar(id): función para quitar al estudiante de la lista.
 */
export default function TarjetaEstudiante({
  id,
  nombre,
  carrera,
  resaltada,
  onEliminar,
}) {
  return (
    <article className={`tarjeta${resaltada ? " tarjeta--nueva" : ""}`}>
      <div className={`tarjeta__avatar ${tonoPorCarrera(carrera)}`} aria-hidden="true">
        {iniciales(nombre)}
      </div>

      <div className="tarjeta__datos">
        <h3 className="tarjeta__nombre">{nombre}</h3>
        <p className="tarjeta__carrera">{carrera}</p>
      </div>

      <button
        type="button"
        className="tarjeta__quitar"
        onClick={() => onEliminar(id)}
        aria-label={`Quitar a ${nombre} de la lista`}
        title="Quitar de la lista"
      >
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
    </article>
  );
}
