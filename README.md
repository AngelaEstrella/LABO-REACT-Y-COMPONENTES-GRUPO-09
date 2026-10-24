# GRUPO G9

## TALLER DE CONSTRUCCIÓN DE SOFTWARE WEB
### React y Componentes

**INTEGRANTES**

- Carrasco Flores Angel Giovanny
- Sevan Reyes David
- Giron Altamirano Miguel Alejandro
- Silva Medrano Angel Estrella
- Huanca Tapia Lita Nikole
- De la Cruz Meza Angel Luis Kallpa

---

# Gestión académica – React y componentes

Interfaz de gestión académica hecha con React (Vite). Permite registrar estudiantes y verlos al instante en una lista, sin recargar la página.

## Cómo ejecutarlo

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Componentes

| Componente | Archivo | Qué hace |
| --- | --- | --- |
| `FormularioEstudiante` | `src/components/FormularioEstudiante.jsx` | Captura nombre y carrera, valida y entrega los datos al padre con la prop `onAgregar`. |
| `TarjetaEstudiante` | `src/components/TarjetaEstudiante.jsx` | Muestra los datos de un estudiante recibidos por props (`id`, `nombre`, `carrera`, `resaltada`, `onEliminar`). |
| `ListaEstudiantes` | `src/components/ListaEstudiantes.jsx` | Recorre el arreglo con `map` y crea una `TarjetaEstudiante` por registro, con `key` única. |
| `App` | `src/App.jsx` | Guarda el estado (`useState`) y conecta los tres componentes. |

## Cómo se cumple cada criterio

- **Definición y organización de componentes:** tres componentes en archivos separados dentro de `src/components`, más `App` como contenedor.
- **Uso correcto de props:** los datos bajan del padre a los hijos por props y los eventos suben con funciones (`onAgregar`, `onEliminar`). Cada componente documenta sus props en un comentario.
- **Manejo del estado y eventos:** `App` guarda la lista con `useState`. El formulario usa inputs controlados y `onSubmit`. El estado se actualiza de forma inmutable (`[nuevo, ...previos]`, `filter`).
- **Renderizado dinámico de listas:** `ListaEstudiantes` usa `estudiantes.map(...)` con `key={estudiante.id}` y maneja dos estados vacíos (sin registros y sin coincidencias de búsqueda).
- **Claridad y funcionamiento del código:** nombres en español, comentarios breves donde ayudan, y compilación verificada con `npm run build`.

## Extras de experiencia de usuario

- Validación con mensajes claros junto a cada campo.
- Tras agregar, el foco vuelve al campo de nombre para registrar al siguiente.
- El registro nuevo se resalta unos segundos.
- Búsqueda por nombre o carrera.
- Eliminar un estudiante.
- Los datos se guardan en el navegador (`localStorage`) y sobreviven a una recarga.
- Diseño adaptable a celular, foco visible con teclado y compatibilidad con lectores de pantalla.
