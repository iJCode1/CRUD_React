import React from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);
  const [editar, setEditar] = React.useState(false);
  const [id, setId] = React.useState("");
  const [error, setError] = React.useState(null);

  const Escribir = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("Ingresa una tarea!");
      setError("Error");
      return;
    }

    setTareas([...tareas, { id: shortid.generate(), tarea: tarea }]);
    setTarea("");
    setError(null);
  };

  const Eliminar = (id) => {
    const arrayFiltrado = tareas.filter((el) => el.id !== id);
    setTareas(arrayFiltrado);
  };

  const Editar = (item) => {
    setEditar(true);
    setTarea(item.tarea);
    setId(item.id);
  };

  const Edicion = (item) => {
    item.preventDefault();
    if (!tarea.trim()) {
      console.log("Ingresa un valor");
      setError("Error");
      return;
    }

    const modificarTarea = tareas.map((element) =>
      element.id === id ? { id: id, tarea: tarea } : element
    );

    setTareas(modificarTarea);
    setEditar(false);
    setId("");
    setTarea("");
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <list className="list-group-item">No hay tareas</list>
            ) : (
              tareas.map((el) => (
                <li key={el.id} className="list-group-item">
                  <span className="lead">{el.tarea}</span>
                  <button
                    className="button btn btn-danger btn-sm float-right mx-2"
                    onClick={() => Eliminar(el.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right mx-2"
                    onClick={() => Editar(el)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        {/*------------------------------ FORMULARIO ------------------------------ */}
        <div className="col-4">
          <h4 className="text-center">
            {editar ? "Editando la tarea" : "Añade una tarea"}
          </h4>
          <form onSubmit={editar ? Edicion : Escribir}>
            {error ? (
              <span className="text-danger">Ingresa algo por favor</span>
            ) : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingresa Tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />

            {editar ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
