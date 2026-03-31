import { Link } from "react-router";
import { Home, AlertTriangle } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-6 rounded-full">
            <AlertTriangle className="w-16 h-16 text-red-600" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-slate-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Página no encontrada
        </h2>
        <p className="text-slate-500 mb-8">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Home className="w-5 h-5" />
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}
