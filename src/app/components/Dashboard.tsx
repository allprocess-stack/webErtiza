import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Scale,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "./AuthContext";

export function Dashboard() {
  const { user } = useAuth();

  const [currentWeight, setCurrentWeight] = useState(1250.5);
  const [status, setStatus] = useState<"stable" | "weighing" | "error">("stable");

  // Simular actualizaciones de peso
  useEffect(() => {
    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 2;
      setCurrentWeight((prev) => Math.max(0, prev + variation));
      setStatus(Math.random() > 0.9 ? "weighing" : "stable");
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Datos de ejemplo para el gráfico
  const chartData = [
    { time: "08:00", peso: 1240 },
    { time: "09:00", peso: 1255 },
    { time: "10:00", peso: 1248 },
    { time: "11:00", peso: 1262 },
    { time: "12:00", peso: 1250 },
    { time: "13:00", peso: 1258 },
    { time: "14:00", peso: 1245 },
  ];

  const stats = [
    {
      label: "Peso Promedio Hoy",
      value: "1,251.3 kg",
      icon: Scale,
      color: "bg-blue-500",
    },
    {
      label: "Mediciones Totales",
      value: "142",
      icon: Activity,
      color: "bg-green-500",
    },
    {
      label: "Tendencia",
      value: "+2.3%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      label: "Estado del Sistema",
      value: "Operativo",
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Sistema de Monitoreo de Balanza Industrial
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
          <Clock className="w-5 h-5 text-slate-400" />
          <span className="text-slate-600">
            {new Date().toLocaleString("es-ES")}
          </span>
        </div>
      </div>

      {/* Current Weight Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-100 mb-2">Peso Actual</p>
            <h2 className="text-5xl font-bold mb-4">
              {currentWeight.toFixed(2)} <span className="text-2xl">kg</span>
            </h2>
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${status === "stable"
                    ? "bg-green-400"
                    : status === "weighing"
                      ? "bg-yellow-400 animate-pulse"
                      : "bg-red-400"
                  }`}
              ></div>
              <span className="text-blue-100">
                {status === "stable"
                  ? "Estable"
                  : status === "weighing"
                    ? "Pesando..."
                    : "Error"}
              </span>
            </div>
          </div>
          <Link
            to="/monitor"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Ver Monitoreo en Vivo
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Historial de Peso (Últimas 7 horas)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[1200, 1300]} />
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
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Medición Exitosa
                </p>
                <p className="text-xs text-slate-500">Hace 2 minutos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Sistema Calibrado
                </p>
                <p className="text-xs text-slate-500">Hace 1 hora</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Mantenimiento Programado
                </p>
                <p className="text-xs text-slate-500">Hace 3 horas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
