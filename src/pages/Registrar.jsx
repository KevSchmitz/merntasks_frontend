import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  // const [datos, setDatos] = useState({
  //   nombre: "",
  //   email: "",
  //   password: "",
  //   repetirPassword: "",
  // });
  // const { nombre, email, password, repetirPassword } = datos;

  // const handleCambioDatos = (e) => {
  //   setDatos({ ...datos, [e.target.name]: e.target.value });
  // };

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password].includes("")) {
      setAlerta({ msg: "TODOS LOS CAMPOS SON OBLIGATORIOS", error: true });
      return;
    }

    if (repetirPassword !== password) {
      setAlerta({ msg: "DEBE REPETIR EL MISMO PASSWORD", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "Password muy corto, mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    // console.log(delete datos.repetirPassword);
    setAlerta({});

    // Crear el usuario en la API
    try {
      const { data } = await clienteAxios.post("/usuarios", {
        nombre,
        email,
        password,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      // .response es de axios y permite colocar el error en objeto y poder acceder a .data.msg
      console.log(error.response.data.msg);
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra tus {""}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <form
        className="mt-10 p-10 bg-white shadow rounded-lg "
        onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta} />}

        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase block text-gray-600 font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Email de registro"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            value={nombre}
          />
        </div>
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase block text-gray-600 font-bold"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password de registro"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase block text-gray-600 font-bold"
          >
            Repetir Password
          </label>
          <input
            type="password"
            name="repetirPassword"
            id="password2"
            placeholder="Repetir Password"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
            onChange={(e) => setRepetirPassword(e.target.value)}
            value={repetirPassword}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
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
          to="/olvide-password"
          className="block uppercase text-center my-5 text-slate-500 text-sm hover:text-slate-600 "
        >
          ¿Olvidaste tu password?
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
