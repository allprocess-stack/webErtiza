import { useState } from "react";
import { Network, Wifi, Save, RefreshCw, CheckCircle } from "lucide-react";

export function ScaleConnection() {
  const [config, setConfig] = useState({
    ipAddress: "192.168.1.100",
    port: "502",
    protocol: "TCP/IP",
    timeout: "5000",
    baudRate: "9600",
    dataBits: "8",
    stopBits: "1",
    parity: "None",
  });

  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("disconnected");

  const handleTest = () => {
    setConnectionStatus("connecting");
    setTimeout(() => {
      setConnectionStatus("connected");
      alert("Conexión exitosa con la balanza");
    }, 2000);
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
                  ? `Conectado a ${config.ipAddress}:${config.port}`
                  : "Sin conexión con la balanza"}
              </p>
            </div>
          </div>
          <button
            onClick={handleTest}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              connectionStatus === "connected"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {connectionStatus === "connected"
              ? "Reconectar"
              : "Probar Conexión"}
          </button>
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
              onChange={(e) =>
                setConfig({ ...config, protocol: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="TCP/IP">TCP/IP</option>
              <option value="Modbus TCP">Modbus TCP</option>
              <option value="Serial">Serial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Timeout (ms)
            </label>
            <input
              type="number"
              value={config.timeout}
              onChange={(e) =>
                setConfig({ ...config, timeout: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Velocidad (Baud Rate)
            </label>
            <select
              value={config.baudRate}
              onChange={(e) =>
                setConfig({ ...config, baudRate: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="4800">4800</option>
              <option value="9600">9600</option>
              <option value="19200">19200</option>
              <option value="38400">38400</option>
              <option value="57600">57600</option>
              <option value="115200">115200</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bits de Datos
            </label>
            <select
              value={config.dataBits}
              onChange={(e) =>
                setConfig({ ...config, dataBits: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bits de Parada
            </label>
            <select
              value={config.stopBits}
              onChange={(e) =>
                setConfig({ ...config, stopBits: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Paridad
            </label>
            <select
              value={config.parity}
              onChange={(e) =>
                setConfig({ ...config, parity: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="None">None</option>
              <option value="Even">Even</option>
              <option value="Odd">Odd</option>
              <option value="Mark">Mark</option>
              <option value="Space">Space</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="w-5 h-5" />
            Guardar Configuración
          </button>
          <button
            onClick={handleTest}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
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
