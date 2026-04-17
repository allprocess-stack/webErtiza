import { useState, useEffect } from "react";
import { Database, Save, CheckCircle, XCircle, RefreshCw, Check, Trash2 } from "lucide-react";
import { useAuth } from "./AuthContext";

interface PrefixFormat {
  id: number;
  tipoBd: string;
  servidor: string;
  puerto: number;
  nombreBd: string;
  usuario: string;
  contrasena: string;
  fechaCreacion: string;
  active: boolean;
  idUsuario: number | null;
}

export function DatabaseConnection() {
  const { user } = useAuth();
  // Estado para bloquear el formulario 
  const [isLocked, setIsLocked] = useState(false);
  const [formats, setFormats] = useState<PrefixFormat[]>([]);

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
    "connected" | "disconnected" | "connecting" | "testing"
  >("disconnected");


  const handleSave = async () => {
    try {
      const res = await fetch("/api/db-config/save-config", {
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
          IdUsuario: user.nombre === "root" ? null : 1, // luego lo haces dinámico
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Configuración guardada correctamente");
        await loadConfig();
      } else {
        alert("Error al guardar");
      }
    } catch (error) {
      console.error("Error guardando configuración:", error);
      alert("Error de conexión con el backend");
    }
  };

  const loadConfig = async () => {
    try {
      const res = await fetch("/api/db-config/config");
      const data = await res.json();
      if (data) {
        setConfig({
          dbType: data.TipoBd,
          host: data.Servidor,
          port: data.Puerto,
          database: data.NombreBd,
          username: data.Usuario,
          password: data.Contrasena,
          useSSL: false,
        });
      }

    } catch (error) {
      console.error("Error cargando config");
    }
  };

  const loadAllConfigs = async () => {
    try {
      const res = await fetch("/api/db-config/all");
      const data = await res.json();

      setFormats(
        data.map((item: any) => ({
          id: item.Id,
          tipoBd: item.TipoBd,
          servidor: item.Servidor,
          puerto: item.Puerto,
          nombreBd: item.NombreBd,
          usuario: item.Usuario,
          contrasena: item.Contrasena,
          fechaCreacion: item.FechaCreacion,
          active: item.Activo,
          idUsuario: item.IdUsuario,
        }))
      );
    } catch (error) {
      console.error("Error cargando configuraciones");
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadAllConfigs();

      const res = await fetch("/api/db-config/connection-status");
      const data = await res.json();

      if (data.connected) {
        setConnectionStatus("connected");
        setIsLocked(true);
        await loadConfig();
      } else {
        setConnectionStatus("disconnected");
        setIsLocked(false);
      }
    };

    init();
  }, []);

  const handleActivate = async (id: number) => {
    try {
      const res = await fetch("/api/db-config/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: id }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Configuración activada");
        await loadAllConfigs(); // refresca tabla
      } else {
        alert("Error al activar");
      }
    } catch (error) {
      console.error("Error activando configuración:", error);
      alert("Error con el servidor");
    }
  };

  const handleConnectionToggle = async () => {
    // DESCONECTAR
    if (connectionStatus === "connected") {
      await fetch("http://localhost:3000/api/db-config/disconnect", {
        method: "POST",
      });

      setConnectionStatus("disconnected");
      setIsLocked(false);
      localStorage.setItem("db_connected", "false");
      return;
    }

    // CONECTAR
    setConnectionStatus("testing");

    try {
      const res = await fetch("http://localhost:3000/api/db-config/test-dynamic", {
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
        }),
      });

      const data = await res.json();

      if (data.success) {
        setConnectionStatus("connected");
        setIsLocked(true);
        localStorage.setItem("db_connected", "true");
      } else {
        setConnectionStatus("disconnected");
        setIsLocked(false);
        alert(data.message);
      }

    } catch (error) {
      setConnectionStatus("disconnected");
      setIsLocked(false);
      console.error("Error probando conexión:", error);
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
              disabled={isLocked}
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
              disabled={isLocked}
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
              disabled={isLocked}
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
              disabled={isLocked}
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
              disabled={isLocked}
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
              disabled={isLocked}
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
            onClick={handleConnectionToggle}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${connectionStatus === "connected"
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
              } text-white`}
          >
            {connectionStatus === "connected"
              ? "Desconectar"
              : connectionStatus === "testing"
                ? "Conectando..."
                : "Probar Conexión"}
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

      {/* Existing Formats DB */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Conexiones con Base de Datos Guardadas
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Id
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Tipo de Bd
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Servidor
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Puerto
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Nombre de BD
                </th>
                {/* <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Usuario
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Password
                </th> */}
                <th>
                  Creado Por
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Estado
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {formats.map((format) => (
                <tr key={format.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {format.id}
                  </td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm font-mono">
                      {format.tipoBd}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-slate-600 font-mono">
                      {format.servidor}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-slate-600 font-mono">
                      {format.puerto}
                    </code>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-800">
                    {format.nombreBd}
                  </td>
                  {/* <td className="px-6 py-4">
                    <code className="text-xs text-slate-600 font-mono">
                      {format.usuario}
                    </code>
                  </td> */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${format.active ? "bg-green-100 text-green-700" : "bg-gray-100"
                      }`}>
                      {format.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleActivate(format.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

