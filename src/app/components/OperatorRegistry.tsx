import { useState } from "react";
import { UserCog, Plus, Search, Edit, Trash2, Shield } from "lucide-react";

interface Operator {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  shift: string;
  status: "active" | "inactive";
  permissions: string[];
}

export function OperatorRegistry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [operators, setOperators] = useState<Operator[]>([
    {
      id: "1",
      name: "Juan Carlos Pérez",
      code: "OP-001",
      email: "juan.perez@empresa.com",
      phone: "987-654-321",
      shift: "Mañana (08:00 - 16:00)",
      status: "active",
      permissions: ["pesaje", "registro", "reportes"],
    },
    {
      id: "2",
      name: "María García López",
      code: "OP-002",
      email: "maria.garcia@empresa.com",
      phone: "987-654-322",
      shift: "Tarde (16:00 - 00:00)",
      status: "active",
      permissions: ["pesaje", "registro"],
    },
    {
      id: "3",
      name: "Carlos Ramírez",
      code: "OP-003",
      email: "carlos.ramirez@empresa.com",
      phone: "987-654-323",
      shift: "Noche (00:00 - 08:00)",
      status: "inactive",
      permissions: ["pesaje"],
    },
  ]);

  const filteredOperators = operators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <UserCog className="w-8 h-8 text-blue-600" />
          Registro de Operadores
        </h1>
        <p className="text-slate-600 mt-2">
          Gestión de operadores del sistema
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Operadores</p>
              <p className="text-2xl font-bold text-slate-800">
                {operators.length}
              </p>
            </div>
            <UserCog className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Operadores Activos</p>
              <p className="text-2xl font-bold text-slate-800">
                {operators.filter((o) => o.status === "active").length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Turnos Configurados</p>
              <p className="text-2xl font-bold text-slate-800">3</p>
            </div>
            <UserCog className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar operadores..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Agregar Operador
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Código
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Nombre
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Contacto
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Turno
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Permisos
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Estado
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredOperators.map((operator) => (
                <tr key={operator.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {operator.code}
                  </td>
                  <td className="px-6 py-4 text-slate-800">{operator.name}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-slate-800">{operator.email}</p>
                      <p className="text-slate-500">{operator.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {operator.shift}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {operator.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        operator.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {operator.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
