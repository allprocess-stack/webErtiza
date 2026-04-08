import { useState } from "react";
import { Database, Save, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export function DatabaseConnection() {
  const [config, setConfig] = useState({
    dbType: "",
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
    useSSL: false,
  });

  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "testing"
  >("disconnected");


  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/db-config/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TipoBd: config.dbType,
          Servidor: config.host,
          Puerto: config.port,
          NombreBd: config.database,
          Usuario: config.username,
          Contrasena: config.password,
          IdUsuario: 1, // luego lo haces dinámico
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Configuración guardada correctamente");
      } else {
        alert("Error al guardar");
      }

    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  const handleTest = async () => {
    setConnectionStatus("testing");

    try {
      const res = await fetch("http://localhost:3000/api/db-config/test-dynamic", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("disconnected");
        alert(data.message);
      }

    } catch (error) {
      setConnectionStatus("disconnected");
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Database className="w-8 h-8 text-blue-600" />
          Configuración de Base de Datos
        </h1>
        <p className="text-slate-600 mt-2">
          Configurar conexión a la base de datos
        </p>
      </div>

      {/* Status Card */}
      <div
        className={`rounded-xl p-6 mb-6 ${connectionStatus === "connected"
          ? "bg-green-50 border-2 border-green-200"
          : connectionStatus === "testing"
            ? "bg-yellow-50 border-2 border-yellow-200"
            : "bg-slate-50 border-2 border-slate-200"
          }`}
      >
        <div className="flex items-center gap-3">
          {connectionStatus === "connected" ? (
            <CheckCircle className="w-8 h-8 text-green-600" />
          ) : connectionStatus === "testing" ? (
            <RefreshCw className="w-8 h-8 text-yellow-600 animate-spin" />
          ) : (
            <XCircle className="w-8 h-8 text-slate-400" />
          )}
          <div>
            <p className="font-bold text-slate-800">
              {connectionStatus === "connected"
                ? "Base de Datos Conectada"
                : connectionStatus === "testing"
                  ? "Probando Conexión..."
                  : "Sin Conexión"}
            </p>
            <p className="text-sm text-slate-600">
              {connectionStatus === "connected"
                ? `Conectado a ${config.host}:${config.port}/${config.database}`
                : "Configure los parámetros de conexión"}
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Parámetros de Conexión
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tipo de Base de Datos
            </label>
            <select
              value={config.dbType}
              onChange={(e) => setConfig({ ...config, dbType: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="MySQL">MySQL</option>
              <option value="PostgreSQL">PostgreSQL</option>
              <option value="SQL Server">SQL Server</option>
              <option value="Oracle">Oracle</option>
              <option value="SQLite">SQLite</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Host / Servidor
            </label>
            <input
              type="text"
              value={config.host}
              onChange={(e) => setConfig({ ...config, host: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="localhost o 192.168.1.100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Puerto
            </label>
            <input
              type="text"
              value={config.port}
              onChange={(e) => setConfig({ ...config, port: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="3306"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nombre de Base de Datos
            </label>
            <input
              type="text"
              value={config.database}
              onChange={(e) =>
                setConfig({ ...config, database: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="balanza_db"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={config.username}
              onChange={(e) =>
                setConfig({ ...config, username: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={config.password}
              onChange={(e) =>
                setConfig({ ...config, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar Configuración
          </button>
          <button
            onClick={handleTest}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Probar Conexión
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium mb-1">
            Puertos por Defecto:
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• MySQL: 3306</li>
            <li>• PostgreSQL: 5432</li>
            <li>• SQL Server: 1433</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 font-medium mb-1">
            Recomendaciones:
          </p>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Use contraseñas seguras</li>
            <li>• Configure backups automáticos</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
