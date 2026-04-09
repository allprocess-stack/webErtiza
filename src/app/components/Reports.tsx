import { FileText, Download, TrendingUp, PieChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell } from "recharts";
import { useAuth } from "./AuthContext";

export function Reports() {
  const { user } = useAuth();

  const dailyData = [
    { dia: "Lun", mediciones: 42 },
    { dia: "Mar", mediciones: 38 },
    { dia: "Mié", mediciones: 45 },
    { dia: "Jue", mediciones: 51 },
    { dia: "Vie", mediciones: 48 },
    { dia: "Sáb", mediciones: 22 },
    { dia: "Dom", mediciones: 15 },
  ];

  const operatorData = [
    { name: "Juan Pérez", value: 45 },
    { name: "María García", value: 35 },
    { name: "Carlos López", value: 30 },
    { name: "Otros", value: 20 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

  const reports = [
    {
      title: "Reporte Diario",
      description: "Resumen de mediciones del día actual",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Reporte Semanal",
      description: "Análisis completo de la semana",
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Reporte Mensual",
      description: "Estadísticas del mes en curso",
      icon: PieChart,
      color: "bg-purple-500",
    },
    {
      title: "Reporte Personalizado",
      description: "Crear reporte con filtros específicos",
      icon: FileText,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Reportes y Estadísticas</h1>
        <p className="text-slate-500 mt-1">
          Análisis detallado y exportación de datos
        </p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className={`${report.color} p-3 rounded-lg w-fit mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                {report.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                {report.description}
              </p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                <Download className="w-4 h-4" />
                Generar
              </button>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Mediciones por Día
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="dia" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="mediciones" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Mediciones por Operador
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={operatorData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {operatorData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Reportes Generados Recientemente
        </h3>
        <div className="space-y-3">
          {[
            {
              name: "Reporte_Semanal_2026-03-30.pdf",
              date: "30/03/2026",
              size: "2.3 MB",
            },
            {
              name: "Reporte_Diario_2026-03-29.pdf",
              date: "29/03/2026",
              size: "1.1 MB",
            },
            {
              name: "Reporte_Mensual_Marzo_2026.pdf",
              date: "28/03/2026",
              size: "4.7 MB",
            },
          ].map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{file.name}</p>
                  <p className="text-sm text-slate-500">
                    {file.date} • {file.size}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Descargar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
