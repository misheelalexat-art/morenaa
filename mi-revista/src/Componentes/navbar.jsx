import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import NavbarUsuario from "./NavbarUsuario";
import NavbarVisitante from "./NavbarVisitante";

function Navbar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user || null);
    });

    return () => unsubscribe();
  }, []);

  return usuario ? <NavbarUsuario /> : <NavbarVisitante />;
}

export default Navbar;
