import { useRef, useState } from "react";

const MIN_NOMBRE = 3;

function validar({ nombre, carrera }) {
  const errores = {};
  const nombreLimpio = nombre.trim();
  if (!nombreLimpio) {
    errores.nombre = "Escribe el nombre del estudiante.";
  } else if (nombreLimpio.length < MIN_NOMBRE) {
    errores.nombre = `El nombre necesita al menos ${MIN_NOMBRE} letras.`;
  }
  if (!carrera.trim()) {
    errores.carrera = "Indica la carrera del estudiante.";
  }
  return errores;
}

/**
 * Captura nombre y carrera. Al enviar, valida y avisa al padre con onAgregar.
 * Props:
 *  - onAgregar({ nombre, carrera }): función que agrega el registro.
 *  - carreras: lista de carreras ya registradas, usadas como sugerencias.
 */
export default function FormularioEstudiante({ onAgregar, carreras }) {
  const [datos, setDatos] = useState({ nombre: "", carrera: "" });
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});
  const campoNombre = useRef(null);
  const campoCarrera = useRef(null);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    const siguiente = { ...datos, [name]: value };
    setDatos(siguiente);
    // Si el campo ya mostró un error, se revalida mientras la persona corrige.
    if (tocados[name]) setErrores(validar(siguiente));
  }

  function manejarSalida(evento) {
    const { name } = evento.target;
    if (!datos[name]) return; // No se marca error al pasar de largo un campo vacío.
    setTocados((previos) => ({ ...previos, [name]: true }));
    setErrores(validar(datos));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const nuevosErrores = validar(datos);
    setTocados({ nombre: true, carrera: true });
    setErrores(nuevosErrores);

    if (nuevosErrores.nombre) return campoNombre.current.focus();
    if (nuevosErrores.carrera) return campoCarrera.current.focus();

    onAgregar({ nombre: datos.nombre.trim(), carrera: datos.carrera.trim() });
    setDatos({ nombre: "", carrera: "" });
    setErrores({});
    setTocados({});
    campoNombre.current.focus(); // Listo para registrar al siguiente.
  }

  const hayErrorNombre = Boolean(tocados.nombre && errores.nombre);
  const hayErrorCarrera = Boolean(tocados.carrera && errores.carrera);

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <h2 className="formulario__titulo">Nuevo estudiante</h2>

      <div className="campo">
        <label htmlFor="nombre">Nombre completo</label>
        <input
          ref={campoNombre}
          id="nombre"
          name="nombre"
          type="text"
          value={datos.nombre}
          onChange={manejarCambio}
          onBlur={manejarSalida}
          placeholder="Ej. Lucía Mendoza Ccori"
          autoComplete="off"
          aria-invalid={hayErrorNombre}
          aria-describedby={hayErrorNombre ? "error-nombre" : undefined}
        />
        {hayErrorNombre && (
          <p className="campo__error" id="error-nombre">
            {errores.nombre}
          </p>
        )}
      </div>

      <div className="campo">
        <label htmlFor="carrera">Carrera</label>
        <input
          ref={campoCarrera}
          id="carrera"
          name="carrera"
          type="text"
          list="carreras-sugeridas"
          value={datos.carrera}
          onChange={manejarCambio}
          onBlur={manejarSalida}
          placeholder="Ej. Derecho"
          autoComplete="off"
          aria-invalid={hayErrorCarrera}
          aria-describedby={hayErrorCarrera ? "error-carrera" : "ayuda-carrera"}
        />
        <datalist id="carreras-sugeridas">
          {carreras.map((carrera) => (
            <option key={carrera} value={carrera} />
          ))}
        </datalist>
        {hayErrorCarrera ? (
          <p className="campo__error" id="error-carrera">
            {errores.carrera}
          </p>
        ) : (
          <p className="campo__ayuda" id="ayuda-carrera">
            Escribe una nueva o elige una ya registrada.
          </p>
        )}
      </div>

      <button type="submit" className="boton-principal">
        Agregar estudiante
      </button>
    </form>
  );
}
