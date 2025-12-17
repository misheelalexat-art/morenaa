import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout
import Navbar from "./Componentes/navbar";
import Footer from "./Componentes/Footer";

// Páginas públicas
import InicioRevista from "./Componentes/InicioRevista";
import Somos from "./Componentes/Somos";
import Contacto from "./Componentes/contacto";
import Articulos from "./Componentes/Articulos";
import ArticuloCompleto from "./Componentes/ArticuloCompleto";
import ArticuloDestacado from "./Componentes/ArticuloDestacado";
import Editorial from "./Componentes/Editorial";
import Favoritos from "./Componentes/Favoritos";

// Auth
import Login from "./Componentes/login";
import RegistrarCuenta from "./Componentes/RegistrarCuenta";

// Perfil
import UserProfileTabs from "./Componentes/UserProfileTabs";
import AgregarUsuario from "./Componentes/AgregarUsuario";
import CrearArticulo from "./Componentes/CrearArticulo";

// Rutas protegidas
import RutaPriv from "./Componentes/rutaPriv";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Inicio */}
        <Route path="/" element={<InicioRevista />} />

        {/* Artículos */}
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/articulo/:id" element={<ArticuloCompleto />} />
        <Route path="/destacado/:id" element={<ArticuloDestacado />} />
        <Route path="/editorial/:mes" element={<Editorial />} />
        <Route path="/favorito" element={<Favoritos />} />

        {/* Páginas */}
        <Route path="/somos" element={<Somos />} />
        <Route path="/contacto" element={<Contacto />} />

        {/* Auth */}
        <Route path="/iniciar_sesion" element={<Login />} />
        <Route path="/registrarse" element={<RegistrarCuenta />} />

        {/* Perfil */}
        <Route path="/perfil" element={<UserProfileTabs />} />
        <Route path="/perfil/editar" element={<AgregarUsuario />} />
        <Route path="/perfil/articulos" element={<CrearArticulo />} />

        {/* Comunidad (privada) */}
        <Route
          path="/comunidad"
          element={
            <RutaPriv>
              <div />
            </RutaPriv>
          }
        />
      </Routes>

      

      <Footer />
    </BrowserRouter>
  );
}

export default App;
