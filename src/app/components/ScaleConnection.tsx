import { useEffect, useState } from "react";
import { Network, Wifi, Save, RefreshCw, CheckCircle, Edit, Trash2, Power, PowerOff, Plus } from "lucide-react";
import { useAuth } from "./AuthContext";

interface ConfiguracionTcp {
  id: number;
  ip: string | null;
  puerto: number | null;
  fechacreacion: Date;
  activo: boolean;
  idusuario: number | null;
}

export function ScaleConnection() {
  const { user } = useAuth();

  const [isLocked, setIsLocked] = useState(false);
  const [configuraciones, setConfiguraciones] = useState<ConfiguracionTcp[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<ConfiguracionTcp | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [config, setConfig] = useState({
    ip: "",
    puerto: "",
  });

  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting" | "testing"
  >("disconnected");


  // Cargar todas las configuraciones
  const loadConfiguraciones = async () => {
    try {
      const res = await fetch(`/api/scale-config/all-config`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setConfiguraciones(data);
        // Buscar la configuración activa
        const activa = data.find((c: ConfiguracionTcp) => c.activo === true);
        if (activa) {
          setSelectedConfig(activa);
          setConfig({
            ip: activa.ip || "",
            puerto: activa.puerto?.toString() || "",
          });
        }
      }
    } catch (error) {
      console.error("Error al cargar configuraciones:", error);
    }
  };

  useEffect(() => {
    loadConfiguraciones();
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch(`/api/scale-config/active-config`);
        const data = await res.json();
        if (data && data.activo) {
          setConnectionStatus("connected");
          setIsLocked(true);
        } else {
          setConnectionStatus("disconnected");
          setIsLocked(false);
        }
      } catch (error) {
        console.error("Error al verificar conexión", error);
      }
    };
    checkConnection();
  }, []);

  // Guardar configuración
  const handleSave = async () => {
    try {
      const endpoint = isEditing && selectedConfig
        ? `/api/scale-config/update-config/${selectedConfig.id}`
        : `/api/scale-config/save-config`;
      
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip: config.ip,
          puerto: parseInt(config.puerto),
          usuario: user?.nombre,
          contrasena: user?.contrasena,
          rol: user?.rol,
          idusuario: user?.nombre === "root" ? null : user?.id,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        alert(data.message || (isEditing ? "Configuración actualizada correctamente" : "Configuración guardada correctamente"));
        await loadConfiguraciones();
        setShowForm(false);
        setIsEditing(false);
        setSelectedConfig(null);
        setConfig({ ip: "", puerto: "" });
      } else {
        alert(data.error || "Error al guardar");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  // Activar configuración
  const handleActivar = async (id: number) => {
    try {
      const res = await fetch(`/api/scale-config/status-config/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activo: true }),
      });

      const data = await res.json();
      
      if (data.success || data.succcess) {
        alert(data.message || "Configuración activada correctamente");
        await loadConfiguraciones();
      } else {
        alert(data.error || "Error al activar");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  // Desactivar configuración
  const handleDesactivar = async (id: number) => {
    try {
      const res = await fetch(`/api/scale-config/status-config/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activo: false }),
      });

      const data = await res.json();
      
      if (data.success || data.succcess) {
        alert(data.message || "Configuración desactivada correctamente");
        await loadConfiguraciones();
      } else {
        alert(data.error || "Error al desactivar");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  // Editar configuración
  const handleEdit = (configuracion: ConfiguracionTcp) => {
    setSelectedConfig(configuracion);
    setConfig({
      ip: configuracion.ip || "",
      puerto: configuracion.puerto?.toString() || "",
    });
    setIsEditing(true);
    setShowForm(true);
  };

  // Eliminar configuración
  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar esta configuración?")) return;

    try {
      const res = await fetch(`/api/scale-config/delete-config/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      
      if (data.success) {
        alert(data.message || "Configuración eliminada correctamente");
        await loadConfiguraciones();
      } else {
        alert(data.error || "Error al eliminar");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  // Nueva configuración
  const handleNew = () => {
    setSelectedConfig(null);
    setConfig({ ip: "", puerto: "" });
    setIsEditing(false);
    setShowForm(true);
  };

  // Probar conexión
  const handleConnectionToggle = async () => {
    if (connectionStatus === "connected") {
      try {
        const res = await fetch(`/api/scale-config/disconnect`, { 
          method: "POST" 
        });
        const data = await res.json();
        
        if (data.success) {
          setConnectionStatus("disconnected");
          setIsLocked(false);
          localStorage.setItem("tcp_connected", "false");
        }
      } catch (error) {
        console.error("Error al desconectar:", error);
      }
      return;
    }

    setConnectionStatus("testing");

    try {
      const res = await fetch(`/api/scale-config/test-connection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ip: config.ip,
          puerto: parseInt(config.puerto),
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        // Probar conexión exitosa, ahora conectar
        const connectRes = await fetch(`/api/scale-config/connect`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ip: config.ip,
            puerto: parseInt(config.puerto),
          }),
        });
        
        const connectData = await connectRes.json();
        
        if (connectData.success) {
          setConnectionStatus("connected");
          setIsLocked(true);
          localStorage.setItem("tcp_connected", "true");
          alert(connectData.message || "Conexión exitosa");
        } else {
          setConnectionStatus("disconnected");
          setIsLocked(false);
          alert(connectData.error || "Error al conectar");
        }
      } else {
        setConnectionStatus("disconnected");
        setIsLocked(false);
        alert(data.message || data.error || "Error de conexión");
      }
    } catch (error) {
      setConnectionStatus("disconnected");
      setIsLocked(false);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Network className="w-8 h-8 text-blue-600" />
          Configuración de Balanza
        </h1>
        <p className="text-slate-600 mt-2">
          Configurar conexión TCP/IP con la balanza industrial
        </p>
      </div>

      {/* Status Card */}
      <div
        className={`rounded-xl p-6 mb-6 ${
          connectionStatus === "connected"
            ? "bg-green-50 border-2 border-green-200"
            : connectionStatus === "connecting"
            ? "bg-yellow-50 border-2 border-yellow-200"
            : "bg-red-50 border-2 border-red-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {connectionStatus === "connected" ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : connectionStatus === "connecting" ? (
              <RefreshCw className="w-8 h-8 text-yellow-600 animate-spin" />
            ) : (
              <Wifi className="w-8 h-8 text-red-600" />
            )}
            <div>
              <p className="font-bold text-slate-800">
                Estado de Conexión:{" "}
                {connectionStatus === "connected"
                  ? "Conectado"
                  : connectionStatus === "connecting"
                  ? "Conectando..."
                  : "Desconectado"}
              </p>
              <p className="text-sm text-slate-600">
                {connectionStatus === "connected"
                  ? `Conectado a ${config.ip}:${config.puerto}`
                  : "Sin conexión con la balanza"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Configuraciones */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Configuraciones Guardadas
          </h2>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nueva Configuración
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-slate-700">ID</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-700">IP</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-700">Puerto</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-700">Fecha Creación</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-700">Estado</th>
                <th className="px-4 py-3 text-sm font-medium text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {configuraciones.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No hay configuraciones guardadas
                  </td>
                </tr>
              ) : (
                configuraciones.map((configuracion) => (
                  <tr key={configuracion.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-700">{configuracion.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{configuracion.ip || "-"}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{configuracion.puerto || "-"}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {configuracion.fechacreacion 
                        ? new Date(configuracion.fechacreacion).toLocaleDateString() 
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          configuracion.activo
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {configuracion.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {!configuracion.activo && (
                          <button
                            onClick={() => handleActivar(configuracion.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Activar"
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        )}
                        {configuracion.activo && (
                          <button
                            onClick={() => handleDesactivar(configuracion.id)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Desactivar"
                          >
                            <PowerOff className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(configuracion)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(configuracion.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulario de Configuración */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            {isEditing ? "Editar Configuración" : "Nueva Configuración"} TCP/IP
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dirección IP
              </label>
              <input
                type="text"
                disabled={isLocked}
                value={config.ip}
                onChange={(e) => setConfig({ ...config, ip: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="192.168.1.100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Puerto
              </label>
              <input
                type="number"
                disabled={isLocked}
                value={config.puerto}
                onChange={(e) => setConfig({ ...config, puerto: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="502"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              {isEditing ? "Actualizar" : "Guardar"}
            </button>
            {!isEditing && (
              <button
                onClick={handleConnectionToggle}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Probar y Conectar
              </button>
            )}
            <button
              onClick={() => {
                setShowForm(false);
                setIsEditing(false);
                setSelectedConfig(null);
                setConfig({ ip: "", puerto: "" });
              }}
              className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Solo una configuración puede estar activa a la vez.
          Asegúrese de que la balanza esté encendida y conectada a la misma red.
          Verifique que el firewall permita conexiones en el puerto configurado.
        </p>
      </div>
    </div>
  );
}