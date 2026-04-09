import { useEffect, useState } from "react";
import { Scale, Wifi, WifiOff, Play, Pause, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "./AuthContext";

export function WeightMonitor() {
  const { user } = useAuth();

  const [isConnected, setIsConnected] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWeight, setCurrentWeight] = useState(1250.5);
  const [maxWeight, setMaxWeight] = useState(2000);
  const [minWeight, setMinWeight] = useState(0);
  const [weightData, setWeightData] = useState<Array<{ time: string; peso: number }>>([]);

  // Simular conexión TCP y actualización de peso en tiempo real
  useEffect(() => {
    if (isPaused || !isConnected) return;

    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 10;
      const newWeight = Math.max(0, currentWeight + variation);
      setCurrentWeight(newWeight);

      // Actualizar gráfico
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      setWeightData((prev) => {
        const newData = [...prev, { time: timeStr, peso: newWeight }];
        return newData.slice(-20); // Mantener últimos 20 puntos
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentWeight, isPaused, isConnected]);

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setWeightData([]);
    setCurrentWeight(0);
  };

  const percentage = (currentWeight / maxWeight) * 100;
  const isOverweight = currentWeight > maxWeight * 0.9;
  const isUnderweight = currentWeight < minWeight + 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Monitoreo en Tiempo Real</h1>
          <p className="text-slate-500 mt-1">
            Conexión TCP - Actualización cada segundo
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
            {isConnected ? (
              <>
                <Wifi className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-700">Conectado</span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 text-red-600" />
                <span className="font-medium text-red-700">Desconectado</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Panel de Control</h3>
          <div className="flex gap-2">
            <button
              onClick={handleTogglePause}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isPaused
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  Reanudar
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  Pausar
                </>
              )}
            </button>
            <button
              onClick={handleToggleConnection}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${isConnected
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
            >
              {isConnected ? "Desconectar" : "Conectar"}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-500 hover:bg-slate-600 text-white font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Resetear
            </button>
          </div>
        </div>

        {/* Current Weight Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-500 p-4 rounded-xl">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Peso Actual</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-6xl font-bold text-white">
                    {currentWeight.toFixed(2)}
                  </h2>
                  <span className="text-3xl text-slate-400">kg</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Mínimo: {minWeight} kg</span>
                <span>Máximo: {maxWeight} kg</span>
              </div>
              <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${isOverweight
                    ? "bg-red-500"
                    : isUnderweight
                      ? "bg-yellow-500"
                      : "bg-green-500"
                    }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-center text-slate-400 text-sm mt-2">
                {percentage.toFixed(1)}% de capacidad
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-blue-600 text-sm mb-1">Peso Máximo</p>
              <p className="text-2xl font-bold text-blue-900">
                {weightData.length > 0
                  ? Math.max(...weightData.map((d) => d.peso)).toFixed(2)
                  : "0.00"}{" "}
                kg
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-green-600 text-sm mb-1">Peso Mínimo</p>
              <p className="text-2xl font-bold text-green-900">
                {weightData.length > 0
                  ? Math.min(...weightData.map((d) => d.peso)).toFixed(2)
                  : "0.00"}{" "}
                kg
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <p className="text-purple-600 text-sm mb-1">Promedio</p>
              <p className="text-2xl font-bold text-purple-900">
                {weightData.length > 0
                  ? (
                    weightData.reduce((acc, d) => acc + d.peso, 0) /
                    weightData.length
                  ).toFixed(2)
                  : "0.00"}{" "}
                kg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Chart - NO IMPLEMENTADO */}
      {/* <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Gráfico en Tiempo Real (Últimos 20 segundos)
        </h3>
        {weightData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#64748b"
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="peso"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[400px] flex items-center justify-center bg-slate-50 rounded-lg">
            <p className="text-slate-400">Esperando datos...</p>
          </div>
        )}
      </div> */}

      {/* Alerts */}
      {isOverweight && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-2 rounded-lg">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-red-800">Advertencia: Sobrepeso</h4>
              <p className="text-red-600 text-sm">
                El peso actual está cerca del límite máximo de la balanza.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
