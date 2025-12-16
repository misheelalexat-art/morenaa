import { Link } from "react-router-dom";

function NavbarVisitante() {
  return (
    <header className="w-full py-6 border-b shadow-sm bg-[#41644A] flex flex-col items-center">

      {/* Título */}
      <h1 className="text-4xl font-serif tracking-widest text-[#F8C662]">
        <strong>Morena</strong>
      </h1>

      <p className="text-sm italic mt-1 text-[#D1861C]">
        “Más que piel, somos historia.”
      </p>

      {/* Menú principal */}
      <nav className="mt-5 flex gap-8 text-sm uppercase tracking-wide text-white">
        <Link to="/" className="hover:text-[#F8C662] transition">Inicio</Link>
       <Link to="/articulos" className="hover:text-[#F8C662] transition-colors">Artículos</Link>
         <Link to="/favorito" className="hover:text-[#F8C662] transition-colors">Favoritos </Link>
    
        <Link to="/contacto" className="hover:text-[#F8C662] transition">Contacto</Link>
        <Link to="/somos" className="hover:text-[#F8C662] transition">Somos</Link>
      
      </nav>

      {/* Botones */}
      <div className="mt-4 flex gap-6 text-xs uppercase tracking-wide text-white">
        <Link to="/iniciar_sesion" className="hover:text-[#D1861C] transition">
          Iniciar Sesión
        </Link>
        <Link to="/registrarse" className="hover:text-[#D1861C] transition">
          Registrarse
        </Link>
      </div>

    </header>
  );
}

export default NavbarVisitante;
