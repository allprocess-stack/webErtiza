import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Scale, Lock, User } from "lucide-react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Usuario principal para configuración inicial
    if (username === "root" && password === "allprocess") {
      localStorage.setItem("token", "fake-token");
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userName", "admin");
      localStorage.setItem("isAuthenticated", "true");

      navigate("/");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: username, password: password }),
      });
      const data = await response.json();
      // Guarda Datos
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.user.rol);
      localStorage.setItem("userName", data.user.usuario);
      // localStorage.setItem("password", data.user.password);

      localStorage.setItem("isAuthenticated", "true");
      // Redirigir
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Credenciales incorrectas o no se pudo conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Sistema de Balanza</h1>
            <p className="text-slate-500 mt-2">Control Industrial</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese su usuario"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              ¿Olvidó su contraseña?
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-slate-300 text-sm">
          <p>© 2026 Sistema de Balanza Industrial</p>
        </div>
      </div>
    </div>
  );
}
