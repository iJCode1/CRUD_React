import React from "react";
import shortid from "shortid";

function App2() {
  const [tarea, setTarea] = React.useState("");
  const [tareas, setTareas] = React.useState([]);

  const Agregar = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log("Agrega una tarea");
      return;
    }
    console.log(tarea);
    setTareas([...tareas, { id: shortid.generate(), tarea: tarea }]);
    setTarea("");
  };

  const Eliminar = (id) => {
    const arrayFiltrado = tareas.filter((ele) => ele.id !== id);
    setTareas(arrayFiltrado);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {tareas.map((el) => (
              <li key={el.id} className="list-group-item">
                <span className="lead">{el.tarea}</span>
                <button
                  className="btn btn-danger btn-sm float-right mx-2"
                  onClick={() => Eliminar(el.id)}
                >
                  Eliminar
                </button>
                <button className="btn btn-warning btn-sm float-right mx-2">
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={Agregar}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={(el) => setTarea(el.target.value)}
              value={tarea}
            />

            <button className="btn btn-dark btn-block" type="submit">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App2;
