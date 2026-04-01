import { useState } from "react";
import { Calendar, Download, Filter, Search } from "lucide-react";

export function History() {
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo del historial
  const historyData = [
    {
      id: 1,
      fecha: "2026-03-30",
      hora: "14:23:15",
      peso: 1250.5,
      operador: "Juan Pérez",
      lote: "L-2026-001",
      estado: "Completado",
    },
    {
      id: 2,
      fecha: "2026-03-30",
      hora: "13:45:22",
      peso: 1198.3,
      operador: "María García",
      lote: "L-2026-002",
      estado: "Completado",
    },
    {
      id: 3,
      fecha: "2026-03-30",
      hora: "12:30:08",
      peso: 1305.7,
      operador: "Juan Pérez",
      lote: "L-2026-003",
      estado: "Completado",
    },
    {
      id: 4,
      fecha: "2026-03-30",
      hora: "11:15:44",
      peso: 1275.2,
      operador: "Carlos López",
      lote: "L-2026-004",
      estado: "Completado",
    },
    {
      id: 5,
      fecha: "2026-03-30",
      hora: "10:05:33",
      peso: 1189.8,
      operador: "María García",
      lote: "L-2026-005",
      estado: "Completado",
    },
    {
      id: 6,
      fecha: "2026-03-29",
      hora: "16:50:12",
      peso: 1342.1,
      operador: "Juan Pérez",
      lote: "L-2026-006",
      estado: "Completado",
    },
    {
      id: 7,
      fecha: "2026-03-29",
      hora: "15:20:55",
      peso: 1215.9,
      operador: "Carlos López",
      lote: "L-2026-007",
      estado: "Completado",
    },
    {
      id: 8,
      fecha: "2026-03-29",
      hora: "14:10:28",
      peso: 1268.4,
      operador: "María García",
      lote: "L-2026-008",
      estado: "Completado",
    },
  ];

  const filteredData = historyData.filter(
    (item) =>
      item.lote.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.operador.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Historial de Mediciones</h1>
        <p className="text-slate-500 mt-1">
          Registro completo de todas las pesadas realizadas
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por lote o operador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Filter */}
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Calendar className="w-5 h-5 text-slate-600" />
            <span>Filtrar por Fecha</span>
          </button>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5 text-slate-600" />
            <span>Más Filtros</span>
          </button>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex md:flex-row gap-4 text-center">
        <div className="flex-2 bg-white rounded-xl shadow-sm p-6 ">
          <p className="text-slate-500 text-sm mb-1">Total Mediciones</p>
          <p className="text-3xl font-bold text-slate-800">{historyData.length}</p>
        </div>
        {/* <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-slate-500 text-sm mb-1">Peso Total</p>
          <p className="text-3xl font-bold text-slate-800">
            {historyData.reduce((acc, item) => acc + item.peso, 0).toFixed(0)} kg
          </p>
        </div> */}
        <div className="flex-3 bg-white rounded-xl shadow-sm p-6">
          <p className="text-slate-500 text-sm mb-1">Peso Promedio</p>
          <p className="text-3xl font-bold text-slate-800">
            {(historyData.reduce((acc, item) => acc + item.peso, 0) / historyData.length).toFixed(1)} kg
          </p>
        </div>
        <div className="flex-2 bg-white rounded-xl shadow-sm p-6">
          <p className="text-slate-500 text-sm mb-1">Operadores Activos</p>
          <p className="text-3xl font-bold text-slate-800">
            {new Set(historyData.map((item) => item.operador)).size}
          </p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Peso (kg)
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Operador
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Lote
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    #{item.id.toString().padStart(4, "0")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    {item.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    {item.hora}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">
                    {item.peso.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    {item.operador}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                      {item.lote}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No se encontraron resultados</p>
          </div>
        )}
      </div>
    </div>
  );
}
