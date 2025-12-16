import { useState } from "react"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function iniciarSesion() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Inicio de sesión exitoso");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error al iniciar sesión");
        console.log(error);
      });
  }

  function iniciarConGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        console.log("Iniciaste sesión con Google");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error con iniciar sesión con Google");
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#41644A] p-4">
      <div className="bg-[#F8C662] shadow-2xl rounded-3xl p-8 w-full max-w-sm border-2 border-[#D1861C]">

        <h1 className="text-3xl font-serif font-bold text-center mb-6 text-[#2C263F] tracking-wider">
          Iniciar Sesión
        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 bg-white/90 border border-[#E7681D] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1861C]"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 bg-white/90 border border-[#E7681D] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D1861C]"
        />

        <button
          onClick={iniciarSesion}
          className="w-full bg-[#E7681D] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#d45c17] transition mb-4"
        >
          Iniciar Sesión
        </button>

        <button
          onClick={iniciarConGoogle}
          className="w-full bg-[#D1861C] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#b56f18] transition"
        >
          Ingresar con Google
        </button>
      </div>
    </div>
  );
}

export default Login;
