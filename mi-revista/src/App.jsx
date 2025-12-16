import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Componentes/navbar'

import AgregarUsuario from './Componentes/AgregarUsuario'

import Footer from './Componentes/Footer'
import RutaPriv from './Componentes/rutaPriv'
import Login from './Componentes/login'
import Somos from './Componentes/Somos'
import RegistrarCuenta from './Componentes/RegistrarCuenta'
import Articulos from './Componentes/Articulos'
import ArticuloCompleto from './Componentes/ArticuloCompleto'
import Favoritos from './Componentes/Favoritos'
import ArticuloSolo from './Componentes/ArticuloSolo'
import InicioRevista from './Componentes/InicioRevista'
import UserProfileTabs from './Componentes/UserProfileTabs'
import CrearArticulo from './Componentes/CrearArticulo'
import ArticulosData from './Componentes/ArticulosData'
import ArticuloDestacado from "./Componentes/ArticuloDestacado";
import Editorial from "./Componentes/Editorial";
import Contacto from './Componentes/contacto'

function App() {

 const articulos = ArticulosData;


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<InicioRevista />} />
    <Route path="/perfil" element={<UserProfileTabs/>} />
<Route path="/perfil/editar" element={<AgregarUsuario />} />

        <Route path="/perfil/articulos" element={<CrearArticulo />} />

        <Route path="/somos" element={<Somos />} />
        <Route path="/iniciar_sesion" element={<Login />} />
        <Route path="/registrarse" element={<RegistrarCuenta />} />
        <Route path="/articulos" element={<Articulos />} />

        <Route path="/comunidad"
          element={
            <RutaPriv>
             
            </RutaPriv>
          }
        />
<Route path="/articulo/:id" element={<ArticuloCompleto />} />

<Route path="/destacado/:id" element={<ArticuloDestacado />} />
<Route path="/editorial/:mes" element={<Editorial />} />


        {/* ✅ Página de favoritos */}
        <Route path="/favorito" element={<Favoritos />} />
       <Route path="/contacto" element={<Contacto/>} />
        {/* Admin */}

      </Routes>

      <Footer />
    </BrowserRouter>

  )
}

export default App
