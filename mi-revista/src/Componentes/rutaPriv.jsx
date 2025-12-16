import { auth } from "../firebase"; // importación nombrada, ya tienes auth
import { Navigate } from "react-router-dom";

function RutaPriv({ children }) {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/iniciar_sesion" />;
  }

  return children;
}

export default RutaPriv;
