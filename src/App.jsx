import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import EditarProyecto from "./pages/EditarProyecto";
import Login from "./pages/Login";
import NuevoColaborador from "./pages/NuevoColaborador";
import NuevoPassword from "./pages/NuevoPassword";
import NuevoProyecto from "./pages/NuevoProyecto";
import OlvidePassword from "./pages/OlvidePassword";
import Proyecto from "./pages/Proyecto";
import Proyectos from "./pages/Proyectos";
import Registrar from "./pages/Registrar";

import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route
                path="nuevo-colaborador/:id"
                element={<NuevoColaborador />}
              />
              {/* Asegurar de que el que tiene el routing dinámico se el del final, porque puede tomar cualquier valor como ruta */}
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
