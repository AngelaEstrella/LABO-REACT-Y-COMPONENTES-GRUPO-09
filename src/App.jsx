import { useEffect, useMemo, useState } from "react";
import FormularioEstudiante from "./components/FormularioEstudiante.jsx";
import ListaEstudiantes from "./components/ListaEstudiantes.jsx";

const CLAVE_ALMACENAMIENTO = "gestion-academica:estudiantes";

// Datos de ejemplo para que la lista no arranque vacía.
const ESTUDIANTES_INICIALES = [
  { id: 1, nombre: "Camila Rojas Paredes", carrera: "Ingeniería de Sistemas" },
  { id: 2, nombre: "Diego Quispe Salazar", carrera: "Arquitectura" },
  { id: 3, nombre: "Valeria Núñez Flores", carrera: "Psicología" },
];

function cargarEstudiantes() {
  try {
    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (guardado) return JSON.parse(guardado);
  } catch {
    // Si el almacenamiento falla, se usan los datos iniciales.
  }
  return ESTUDIANTES_INICIALES;
}

export default function App() {
  // Estado principal de la aplicación: la lista de estudiantes.
  const [estudiantes, setEstudiantes] = useState(cargarEstudiantes);
  const [busqueda, setBusqueda] = useState("");
  const [resaltadoId, setResaltadoId] = useState(null);
  const [aviso, setAviso] = useState("");

  // Guarda los cambios para que sobrevivan a una recarga.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(estudiantes));
    } catch {
      // Sin almacenamiento disponible, la app sigue funcionando en memoria.
    }
  }, [estudiantes]);

  // Quita el resaltado del último registro después de un momento.
  useEffect(() => {
    if (resaltadoId === null) return;
    const temporizador = setTimeout(() => setResaltadoId(null), 2600);
    return () => clearTimeout(temporizador);
  }, [resaltadoId]);

  function agregarEstudiante({ nombre, carrera }) {
    const nuevo = { id: Date.now(), nombre, carrera };
    // Se crea un arreglo nuevo (inmutabilidad) con el registro al inicio.
    setEstudiantes((previos) => [nuevo, ...previos]);
    setBusqueda("");
    setResaltadoId(nuevo.id);
    setAviso(`${nombre} se agregó a la lista.`);
  }

  function eliminarEstudiante(id) {
    const eliminado = estudiantes.find((e) => e.id === id);
    setEstudiantes((previos) => previos.filter((e) => e.id !== id));
    if (eliminado) setAviso(`${eliminado.nombre} se quitó de la lista.`);
  }

  // Lista filtrada según el texto de búsqueda (nombre o carrera).
  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return estudiantes;
    return estudiantes.filter(
      (e) =>
        e.nombre.toLowerCase().includes(texto) ||
        e.carrera.toLowerCase().includes(texto)
    );
  }, [estudiantes, busqueda]);

  // Carreras ya registradas, para sugerirlas en el formulario.
  const carreras = useMemo(
    () => [...new Set(estudiantes.map((e) => e.carrera))].sort(),
    [estudiantes]
  );

  return (
    <div className="app">
      <a className="saltar" href="#lista">
        Ir a la lista de estudiantes
      </a>

      <aside className="panel-registro">
        <header className="marca">
          <span className="marca__sello" aria-hidden="true">
            GA
          </span>
          <div>
            <h1 className="marca__titulo">Gestión académica</h1>
            <p className="marca__texto">Registro de estudiantes</p>
          </div>
        </header>

        <FormularioEstudiante onAgregar={agregarEstudiante} carreras={carreras} />
      </aside>

      <main className="panel-lista" id="lista" tabIndex={-1}>
        <header className="lista-cabecera">
          <div>
            <h2 className="lista-cabecera__titulo">Estudiantes</h2>
            <p className="lista-cabecera__conteo">
              {estudiantes.length === 1
                ? "1 registrado"
                : `${estudiantes.length} registrados`}
              {busqueda.trim() && ` · ${visibles.length} coinciden`}
            </p>
          </div>

          <div className="buscador">
            <label htmlFor="busqueda" className="visualmente-oculto">
              Buscar por nombre o carrera
            </label>
            <input
              id="busqueda"
              type="search"
              placeholder="Buscar por nombre o carrera"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              autoComplete="off"
            />
          </div>
        </header>

        <ListaEstudiantes
          estudiantes={visibles}
          hayRegistros={estudiantes.length > 0}
          resaltadoId={resaltadoId}
          onEliminar={eliminarEstudiante}
          onLimpiarBusqueda={() => setBusqueda("")}
        />
      </main>

      {/* Anuncio para lectores de pantalla cuando cambia la lista */}
      <p className="visualmente-oculto" role="status" aria-live="polite">
        {aviso}
      </p>
    </div>
  );
}
