import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const NuevoPassword = () => {
  const params = useParams();
  const { token } = params;

  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState("");
  const [passwordModificado, setPasswordModificado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser mínimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({ msg: data.msg, error: false });
      setPasswordModificado(true);
      setTokenValido(false);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
        return;
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
        return;
      }
    };

    comprobarToken();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu {""}
        <span className="text-slate-700">Password</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {passwordModificado && (
        <Link
          to="/"
          className="block uppercase text-center my-5 text-slate-500 text-sm hover:text-slate-600 "
        >
          Inicia Sesión
        </Link>
      )}

      {tokenValido && (
        <form
          className="mt-10 p-10 bg-white shadow rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase block text-gray-600 font-bold"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Establece tu nuevo password"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-700 uppercase p-3 w-full rounded-xl text-white font-bold hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
    </>
  );
};

export default NuevoPassword;
