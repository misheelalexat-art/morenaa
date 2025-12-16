import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function RegistrarCuenta() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const registrar = async () => {
    if (!email || !password) {
      setMensaje("❌ Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      setMensaje("✅ ¡Usuario registrado con éxito!");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMensaje("❌ Error al crear la cuenta: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#41644A] p-4">
      <div className="bg-[#F8C662] shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-serif font-bold text-[#D1861C] text-center mb-6">
          Crear cuenta nueva
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#A02E01] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E7681D]"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#A02E01] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E7681D]"
          />

          <button
            onClick={registrar}
            disabled={loading}
            className={`py-2 rounded-lg font-semibold transition-all ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "bg-[#E7681D] text-white hover:bg-[#d45c17]"
            }`}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>

        {mensaje && (
          <p
            className={`mt-4 text-center text-sm ${
              mensaje.includes("✅") ? "text-[#213722]" : "text-[#A02E01]"
            }`}
          >
            {mensaje}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-[#2C263F]">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-[#595082] hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegistrarCuenta;
