import { useState } from "react";
import { FileX, Search, Filter, Eye, Trash2, Calendar } from "lucide-react";
import { useAuth } from "./AuthContext";

interface Dispatch {
  id: string;
  ticketNumber: string;
  date: string;
  vehiclePlate: string;
  product: string;
  weight: number;
  client: string;
  status: "despachado" | "anulado";
  reason?: string;
  operator: string;
}

export function DispatchRegistry() {
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [dispatches, setDispatches] = useState<Dispatch[]>([
    {
      id: "1",
      ticketNumber: "ENT-20260331-0001",
      date: "2026-03-31 08:30",
      vehiclePlate: "ABC-123",
      product: "Cemento Portland",
      weight: 8450,
      client: "Constructora ABC",
      status: "despachado",
      operator: "Juan Pérez",
    },
    {
      id: "2",
      ticketNumber: "ENT-20260331-0002",
      date: "2026-03-31 09:15",
      vehiclePlate: "XYZ-789",
      product: "Arena Fina",
      weight: 12300,
      client: "Empresa XYZ",
      status: "despachado",
      operator: "María García",
    },
    {
      id: "3",
      ticketNumber: "ENT-20260331-0003",
      date: "2026-03-31 10:00",
      vehiclePlate: "DEF-456",
      product: "Grava",
      weight: 6780,
      client: "Constructora DEF",
      status: "anulado",
      reason: "Error en el registro del peso",
      operator: "Carlos López",
    },
    {
      id: "4",
      ticketNumber: "ENT-20260331-0004",
      date: "2026-03-31 11:20",
      vehiclePlate: "GHI-111",
      product: "Piedra Chancada",
      weight: 9500,
      client: "Proveedor GHI",
      status: "anulado",
      reason: "Cliente solicitó anulación",
      operator: "Juan Pérez",
    },
  ]);

  const filteredDispatches = dispatches.filter((dispatch) => {
    const matchesSearch =
      dispatch.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dispatch.product.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || dispatch.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: dispatches.length,
    dispatched: dispatches.filter((d) => d.status === "despachado").length,
    cancelled: dispatches.filter((d) => d.status === "anulado").length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <FileX className="w-8 h-8 text-blue-600" />
          Registro de Despachos y Anulados
        </h1>
        <p className="text-slate-600 mt-2">
          Historial de despachos y tickets anulados
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Registros</p>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Despachados</p>
              <p className="text-2xl font-bold text-slate-800">
                {stats.dispatched}
              </p>
            </div>
            <FileX className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Anulados</p>
              <p className="text-2xl font-bold text-slate-800">
                {stats.cancelled}
              </p>
            </div>
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por ticket, placa, cliente o producto..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los Estados</option>
                <option value="despachado">Despachados</option>
                <option value="anulado">Anulados</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  N° Ticket
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Fecha/Hora
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Vehículo
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Producto
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Peso (kg)
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Cliente
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Estado
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Operador
                </th>
                <th className="text-center px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDispatches.map((dispatch) => (
                <tr key={dispatch.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-sm font-medium text-slate-800">
                    {dispatch.ticketNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {dispatch.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {dispatch.vehiclePlate}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {dispatch.product}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-slate-800">
                    {dispatch.weight.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {dispatch.client}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${dispatch.status === "despachado"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {dispatch.status === "despachado"
                        ? "Despachado"
                        : "Anulado"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {dispatch.operator}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title={
                          dispatch.reason
                            ? `Motivo: ${dispatch.reason}`
                            : "Ver detalles"
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Note */}
      {filterStatus === "anulado" && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Nota:</strong> Los registros anulados se mantienen en el
            sistema con fines de auditoría. Haga clic en el ícono de ojo para
            ver el motivo de anulación.
          </p>
        </div>
      )}
    </div>
  );
}
