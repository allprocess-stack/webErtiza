import { useState, useEffect } from "react";
import { Database, Save, CheckCircle, XCircle, RefreshCw, CircleCheck, SquarePen } from "lucide-react";
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formats, setFormats] = useState<PrefixFormat[]>([]);

  const [config, setConfig] = useState({
    dbType: "MYSQL",
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
    useSSL: false,
  });

  // Estado para manejar el estado de conexión a la base de datos
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting" | "testing"
  >("disconnected");

  // Función para reiniciar el formulario a su estado inicial y salir del modo edición
  const resetForm = () => {
    setEditingId(null);
    setConfig({
      dbType: "MYSQL",
      host: "",
      port: "",
      database: "",
      username: "",
      password: "",
      useSSL: false,
    });
  };

  // Función para guardar una nueva configuración en la base de datos
  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/db-config/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipobd: config.dbType,
          servidor: config.host,
          puerto: Number(config.port),
          nombrebd: config.database,
          usuario: config.username,
          contrasena: config.password,
          idusuario: user.nombre === "root" ? null : 1, // luego lo haces dinámico
          activo: true,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Configuración guardada correctamente");
        await loadAllConfigs();
      } else {
        alert("Error al guardar");
      }
    } catch (error) {
      console.error("Error guardando configuración:", error);
      alert("Error de conexión con el backend");
    }
  };

  // Función para llenar el formulario con los datos de la fila seleccionada y activar el modo edición
  const handleEdit = (format: PrefixFormat) => {
    // Llena el formulario con los datos de la fila
    setConfig({
      dbType: format.tipoBd,
      host: format.servidor,
      port: format.puerto.toString(),
      database: format.nombreBd,
      username: format.usuario,
      password: format.contrasena,
      useSSL: false,
    });

    // Guarda el ID que estamos editando
    setEditingId(format.id);

    // Desbloquea el formulario por si estaba bloqueado
    setIsLocked(false);
  };

  // Función para actualizar la configuración existente (cuando editingId no es null)
  const updateConfig = async () => {
    if (!editingId) {
      alert("No hay un registro seleccionado para actualizar");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/db-config/update-config/${editingId}`, {
        method: "POST", // O PUT si tu backend lo prefiere
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipobd: config.dbType,
          servidor: config.host,
          puerto: Number(config.port),
          nombrebd: config.database,
          usuario: config.username,
          contrasena: config.password,
          idusuario: user.nombre === "root" ? null : 1,
          activo: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Configuración actualizada correctamente");

        // REINICIO DE ESTADOS
        setEditingId(null);
        setConfig({ // Opcional: limpiar campos tras editar
          dbType: "MYSQL",
          host: "",
          port: "",
          database: "",
          username: "",
          password: "",
          useSSL: false,
        });

        await loadAllConfigs();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error actualizando configuración:", error);
      alert("Error de conexión con el backend");
    }
  };

  // Función para el botón de "Guardar/Actualizar"
  const handleClick = () => {
    if (editingId) {
      // Si ya estamos editando, ejecuta la actualización
      updateConfig();
    } else {
      // Si no se esta editando, guarda uno nuevo
      handleSave();
    }
  };

  // Función para el botón de "Limpiar/Nuevo" (el segundo click que mencionas)
  const handleReset = () => {
    resetForm();
    alert("Formulario reiniciado: Modo Guardar activado");
  };

  // Carga la configuración activa al iniciar la página
  const loadConfig = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/db-config/config");
      const data = await res.json();
      if (data) {
        setConfig({
          dbType: data.tipobd,
          host: data.servidor,
          port: data.puerto,
          database: data.nombrebd,
          username: data.usuario,
          password: data.contrasena,
          useSSL: false,
        });
      }
      console.log("formats:", formats);
    } catch (error) {
      console.error("Error cargando config");
    }
  };

  // Carga todas las configuraciones guardadas para mostrarlas en la tabla
  const loadAllConfigs = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/db-config/all-config");
      const data = await res.json();

      setFormats(
        data.map((item: any) => ({
          id: item.id,
          tipoBd: item.tipobd,
          servidor: item.servidor,
          puerto: item.puerto,
          nombreBd: item.nombrebd,
          usuario: item.usuario,
          contrasena: item.contrasena,
          fechacreacion: item.fechacreacion,
          active: item.activo,
          idUsuario: item.idusuario,
        }))
      );
    } catch (error) {
      console.error("Error cargando configuraciones");
    }
  };

  // Al cargar el componente, verifica el estado de conexión y carga la configuración activa si está conectado
  useEffect(() => {
    const init = async () => {
      await loadAllConfigs();

      const res = await fetch("http://localhost:3000/api/db-config/connection-status");
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

  // Función para aelctivar una configuración específica desde la tabla
  const handleActivate = async (id: number) => {
    try {
      const res = await fetch("http://localhost:3000/api/db-config/activate", {
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

  // Función para desconectar a la base de datos o probar la conexión dependiendo del estado actual
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
          tipobd: config.dbType,
          servidor: config.host,
          puerto: config.port,
          nombrebd: config.database,
          usuario: config.username,
          contrasena: config.password,
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
              <option value="MYSQL">MySQL</option>
              <option value="POSTGRESQL">PostgreSQL</option>
              <option value="SQL Server">SQL Server</option>
              {/* <option value="Oracle">Oracle</option>
              <option value="SQLite">SQLite</option> */}
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
            onClick={handleClick}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white transition-all shadow-md ${editingId
              ? "bg-orange-600 hover:bg-orange-700 ring-2 ring-orange-300"
              : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {editingId ? (
              <> <RefreshCw className="w-5 h-5 animate-spin-slow" /> Actualizar Configuración </>
            ) : (
              <> <Save className="w-5 h-5" /> Guardar Configuración </>
            )}
          </button>

          {/* Este botón aparece solo cuando estás editando para permitirte volver a "Guardar" */}
          {editingId && (
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              title="Cancelar edición y limpiar"
            >
              Limpiar / Nuevo
            </button>
          )}

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
                  <td className="px-6 py-4">
                    {format.idUsuario === null ? "MASTER" : format.idUsuario}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${format.active ? "bg-green-100 text-green-700" : "bg-gray-100"}`}>
                      {format.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* botones */}
                      <button onClick={() => handleActivate(format.id)} className="text-green-500 hover:text-green-700">
                        <CircleCheck className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleEdit(format)} // Pasamos todo el objeto de la fila
                        className="text-blue-500 hover:text-blue-700"
                        title="Editar configuración"
                      >
                        <SquarePen className="w-6 h-6" />
                      </button>
                      {/* BOTON ELIMINAR REGISTRO DE CONEXION BD - NO IMPLEMENTADO */}
                      {/* <button onClick={() => handleDelete(format.id)} className="text-red-500 hover:text-red-700">
                        <Trash className="w-6 h-6" />
                      </button> */}
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

