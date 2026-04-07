import { useState } from "react";
import { Link } from "react-router";
import { Scale, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  /*
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío de correo - en producción conectar con backend real
    if (email) {
      setIsSubmitted(true);
    }
  };*/

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.error || data.message || "Error");
        return;
      }
      // Mostrar mensaje de éxito
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">
                Correo Enviado
              </h1>
              <p className="text-slate-600 mb-6">
                Hemos enviado las instrucciones para restablecer tu contraseña a{" "}
                <span className="font-semibold">{email}</span>
              </p>
              <p className="text-sm text-slate-500 mb-6">
                Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              Recuperar Contraseña
            </h1>
            <p className="text-slate-500 mt-2 text-center">
              Ingresa tu correo electrónico y te enviaremos las instrucciones
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar Instrucciones"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio de sesión
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
