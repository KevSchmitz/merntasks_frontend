import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alerta from "./Alerta";
import useProyectos from "../hooks/useProyectos";

const FormularioProyecto = () => {
  const [id, setId] = useState(null); // Se creó este id de manera que se puede identificar cuando se está creando un proyecto y cuando se está editando
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");

  // Se importa 'proyecto' para usarlo en la edición
  const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos();

  const params = useParams();

  useEffect(() => {
    // Como condición se puede usar params.id && proyecto.nombre, como proyecto.nombre va después se puede obviar params.id
    // se usa el optional chaining '?' en este caso y se vuelve a usar el params.id
    if (params.id) {
      setId(proyecto._id);
      setNombre(proyecto.nombre);
      setDescripcion(proyecto.descripcion);
      setFechaEntrega(proyecto.fechaEntrega?.split("T")[0]);
      setCliente(proyecto.cliente);
      console.log(params);
    } else {
      console.log("Nuevo Proyecto");
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Pasar los datos hacia ProyectosProvider

    await submitProyecto({
      id,
      nombre,
      descripcion,
      fechaEntrega,
      cliente,
    });

    setId(null);
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setCliente("");
  };

  const { msg } = alerta;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre Proyecto
        </label>

        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Nombre del Proyecto"
          className="w-full border p-2 mt-2 placeholder-gray-400 rounded-md"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Descripción
        </label>

        <textarea
          name="descripcion"
          id="descripcion"
          placeholder="Descripción del Proyecto"
          className="w-full border p-2 mt-2 placeholder-gray-400 rounded-md"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha Entrega
        </label>

        <input
          type="date"
          name="fecha-entrega"
          id="fecha-entrega"
          className="w-full border p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="cliente"
        >
          Nombre Cliente
        </label>

        <input
          type="text"
          name="cliente"
          id="cliente"
          placeholder="Nombre del Cliente"
          className="w-full border p-2 mt-2 placeholder-gray-400 rounded-md"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? "Editar Proyecto" : "Crear Proyecto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioProyecto;
