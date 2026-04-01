import {
  Calendar,
  Clock,
  TrendingUp,
  Package,
  AlertCircle,
} from "lucide-react";

export function WorkerDashboard() {
  const currentShift = {
    start: "08:00",
    end: "16:00",
    remaining: "5h 30m",
  };

  const todayStats = {
    weighings: 127,
    totalWeight: 4567.8,
    averageWeight: 35.9,
    alerts: 3,
  };

  const recentWeighings = [
    { id: 1, time: "14:35", weight: 42.5, product: "Producto A", status: "ok" },
    { id: 2, time: "14:32", weight: 38.2, product: "Producto B", status: "ok" },
    {
      id: 3,
      time: "14:28",
      weight: 52.1,
      product: "Producto A",
      status: "alert",
    },
    { id: 4, time: "14:25", weight: 41.8, product: "Producto C", status: "ok" },
    { id: 5, time: "14:20", weight: 39.5, product: "Producto B", status: "ok" },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-row gap-4 align-items-start">
        <div className="flex-2">
          <h1 className="text-3xl font-bold text-slate-800">Mi Panel de Trabajo</h1>
          <p className="text-slate-600 mt-2">
            Resumen de tu turno y actividad del día
          </p>
        </div>
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Usuario</h1>
          <p className="text-slate-600">Rol</p>
        </div>
      </div>

      {/* Shift Info */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">Turno Actual</p>
            <p className="text-3xl font-bold">
              {currentShift.start} - {currentShift.end}
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Tiempo Restante</p>
            <p className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6" />
              {currentShift.remaining}
            </p>
          </div>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <p className="text-slate-600 text-sm">Pesajes Realizados</p>
          <p className="text-3xl font-bold text-slate-800">
            {todayStats.weighings}
          </p>
        </div>

        {/* CAMBIARLO POR PESO PROMEDIO */}
        {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+5%</span>
          </div>
          <p className="text-slate-600 text-sm">Peso Total (kg)</p>
          <p className="text-3xl font-bold text-slate-800">
            {todayStats.totalWeight.toFixed(1)}
          </p>
        </div> */}

        {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-slate-600 text-sm">Promedio por Pesaje (kg)</p>
          <p className="text-3xl font-bold text-slate-800">
            {todayStats.averageWeight}
          </p>
        </div> */}

        {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-slate-600 text-sm">Alertas del Día</p>
          <p className="text-3xl font-bold text-slate-800">{todayStats.alerts}</p>
        </div> */}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Últimos Pesajes Realizados
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Hora
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Producto
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Peso (kg)
                </th>
                <th className="text-center px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentWeighings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-800">{item.time}</td>
                  <td className="px-6 py-4 text-slate-800">{item.product}</td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-800">
                    {item.weight.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.status === "ok" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Normal
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        Fuera de rango
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mt-6">
        <button className="flex-1 bg-white border-2 border-blue-600 text-blue-600 p-6 rounded-xl hover:bg-blue-50 transition-colors">
          <Package className="w-8 h-8 mb-2 mx-auto" />
          <p className="font-semibold">Nuevo Pesaje</p>
        </button>
        <button className="flex-1 bg-white border-2 border-slate-300 text-slate-700 p-6 rounded-xl hover:bg-slate-50 transition-colors">
          <Calendar className="w-8 h-8 mb-2 mx-auto" />
          <p className="font-semibold">Ver Mi Historial</p>
        </button>
        {/* CONSULTAR SU IMPLEMENTACION */}
        {/* <button className="bg-white border-2 border-slate-300 text-slate-700 p-6 rounded-xl hover:bg-slate-50 transition-colors">
          <AlertCircle className="w-8 h-8 mb-2 mx-auto" />
          <p className="font-semibold">Reportar Incidencia</p>
        </button> */}
      </div>
    </div>
  );
}
