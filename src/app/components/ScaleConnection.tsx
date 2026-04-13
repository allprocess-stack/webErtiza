import { useEffect, useState } from "react";
import { Network, Wifi, Save, RefreshCw, CheckCircle } from "lucide-react";
import { useAuth } from "./AuthContext";

export function ScaleConnection() {
  const { user } = useAuth();

  const [isLocked, setIsLocked] = useState(false);

  const [config, setConfig] = useState({
    ipAddress: "",
    port: "",
    protocol: "",
  });

  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("disconnected");

  const handleSave = async () => {
    try {
      const res = await fetch("/api/scale-config/save-config",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Ip: config.ipAddress,
            Puerto: config.port,
            Protocolo: config.protocol,
            IdUsuario: user.nombre === "root" ? null : 1
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
      alert("Error de conexión con el backend");
    }
  }

  const loadConfig = async () => {
    try {
      const res = await fetch("/api/scale-config/config");
      const data = await res.json();
      if (data) {
        setConfig({
          ipAddress: data.Ip || "",
          port: data.Puerto || "",
          protocol: data.Protocolo || "",
        });
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  }

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch("/api/scale-config/connection-status");
        const data = await res.json();
        if (data.connected) {
          setConnectionStatus("connected");
          setIsLocked(true); // bloquea inputs
        } else {
          setConnectionStatus("disconnected");
          setIsLocked(false);
        }
      } catch (error) {
        console.error("Error al verificar conexión", error);
      }
    };
  }, []);

  const handleConnectionToggle = async () => {
    if (connectionStatus === "connected") {
      await fetch("/api/scale-config/disconnect", { method: "POST" });
      setConnectionStatus("disconnected");
      setIsLocked(false);
      localStorage.setItem("tcp_connected", "false");
      return;
    }

    setConnectionStatus("connecting");

    try {
      const res = await fetch("/api/scale-config/test-connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Ip: config.ipAddress,
          Puerto: config.port,
          Protocolo: config.protocol,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setConnectionStatus("connected");
        setIsLocked(true);
        localStorage.setItem("tcp_connected", "true");
      } else {
        setConnectionStatus("disconnected");
        setIsLocked(false);
        alert(data.message);
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
        className={`rounded-xl p-6 mb-6 ${connectionStatus === "connected"
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
                  ? `Conectado a ${config.ipAddress}:${config.port}`
                  : "Sin conexión con la balanza"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Parámetros de Conexión TCP/IP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Dirección IP
            </label>
            <input
              type="text"
              disabled={isLocked}
              value={config.ipAddress}
              onChange={(e) =>
                setConfig({ ...config, ipAddress: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="192.168.1.100"
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
              placeholder="502"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Protocolo
            </label>
            <select
              value={config.protocol}
              disabled={isLocked}
              onChange={(e) =>
                setConfig({ ...config, protocol: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="TCP/IP">TCP/IP</option>
              {/* <option value="Modbus TCP">Modbus TCP</option>
              <option value="Serial">Serial</option> */}
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="w-5 h-5" />
            Guardar Configuración
          </button>
          <button
            onClick={handleConnectionToggle}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Probar Conexión
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Asegúrese de que la balanza esté encendida y
          conectada a la misma red. Verifique que el firewall permita
          conexiones en el puerto configurado.
        </p>
      </div>
    </div>
  );
}
