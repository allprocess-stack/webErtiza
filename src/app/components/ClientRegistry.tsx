import { useState } from "react";
import { Users, Building2, Plus, Search, Edit, Trash2 } from "lucide-react";

interface Client {
  id: string;
  name: string;
  type: "cliente" | "proveedor" | "empresa";
  ruc: string;
  address: string;
  phone: string;
  email: string;
}

export function ClientRegistry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Constructora ABC S.A.C.",
      type: "cliente",
      ruc: "20123456789",
      address: "Av. Principal 123, Lima",
      phone: "01-234-5678",
      email: "contacto@abc.com",
    },
    {
      id: "2",
      name: "Transportes XYZ E.I.R.L.",
      type: "proveedor",
      ruc: "20987654321",
      address: "Jr. Comercio 456, Callao",
      phone: "01-987-6543",
      email: "ventas@xyz.com",
    },
    {
      id: "3",
      name: "Industrias DEF S.A.",
      type: "empresa",
      ruc: "20555666777",
      address: "Av. Industrial 789, Lima",
      phone: "01-555-7777",
      email: "info@def.com",
    },
  ]);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.ruc.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || client.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cliente":
        return "bg-blue-100 text-blue-700";
      case "proveedor":
        return "bg-green-100 text-green-700";
      case "empresa":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          Registro de Clientes/Proveedores
        </h1>
        <p className="text-slate-600 mt-2">
          Gestión de clientes, proveedores y empresas
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Clientes</p>
              <p className="text-2xl font-bold text-slate-800">
                {clients.filter((c) => c.type === "cliente").length}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Proveedores</p>
              <p className="text-2xl font-bold text-slate-800">
                {clients.filter((c) => c.type === "proveedor").length}
              </p>
            </div>
            <Building2 className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Empresas</p>
              <p className="text-2xl font-bold text-slate-800">
                {clients.filter((c) => c.type === "empresa").length}
              </p>
            </div>
            <Building2 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, RUC o email..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos</option>
            <option value="cliente">Clientes</option>
            <option value="proveedor">Proveedores</option>
            <option value="empresa">Empresas</option>
          </select>

          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            Nuevo Registro
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Nombre/Razón Social
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Tipo
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  RUC/DNI
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Teléfono
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Email
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-800">{client.name}</p>
                      <p className="text-sm text-slate-500">{client.address}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        client.type
                      )}`}
                    >
                      {client.type.charAt(0).toUpperCase() +
                        client.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800">
                    {client.ruc}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {client.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {client.email}
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
