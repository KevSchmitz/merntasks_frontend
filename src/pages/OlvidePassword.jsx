import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/clienteAxios.jsx";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/olvide-password", {
        email,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu {""}
        <span className="text-slate-700">Password</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="mt-10 p-10 bg-white shadow rounded-lg "
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase block text-gray-600 font-bold"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email de registro"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar instrucciones"
          className="bg-sky-700 uppercase p-3 w-full rounded-xl text-white font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-evenly">
        <Link
          to="/"
          className="block uppercase text-center my-5 text-slate-500 text-sm hover:text-slate-600 "
        >
          Si ya tienes una cuenta, Inicia Sesión
        </Link>
        <Link
          to="/registrar"
          className="block uppercase text-center my-5 text-slate-500 text-sm hover:text-slate-600 "
        >
          ¿No tienes una cuenta?, Regístrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
