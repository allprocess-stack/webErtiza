import { useState } from "react";
import {
  Users,
  UserPlus,
  Shield,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "worker";
  status: "active" | "inactive";
  lastLogin: string;
}

export function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@empresa.com",
      role: "admin",
      status: "active",
      lastLogin: "2026-03-30 10:30",
    },
    {
      id: "2",
      name: "María García",
      email: "maria@empresa.com",
      role: "worker",
      status: "active",
      lastLogin: "2026-03-30 09:15",
    },
    {
      id: "3",
      name: "Carlos López",
      email: "carlos@empresa.com",
      role: "worker",
      status: "active",
      lastLogin: "2026-03-29 16:45",
    },
    {
      id: "4",
      name: "Ana Martínez",
      email: "ana@empresa.com",
      role: "worker",
      status: "inactive",
      lastLogin: "2026-03-25 14:20",
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = (id: string) => {
    if (confirm("¿Está seguro de eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          Panel de Administración
        </h1>
        <p className="text-slate-600 mt-2">
          Gestiona usuarios y permisos del sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Usuarios</p>
              <p className="text-2xl font-bold text-slate-800">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Administradores</p>
              <p className="text-2xl font-bold text-slate-800">
                {users.filter((u) => u.role === "admin").length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Trabajadores</p>
              <p className="text-2xl font-bold text-slate-800">
                {users.filter((u) => u.role === "worker").length}
              </p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Usuarios Activos</p>
              <p className="text-2xl font-bold text-slate-800">
                {users.filter((u) => u.status === "active").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Users Management */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar usuarios..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Agregar Usuario
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Usuario
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Rol
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Estado
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Último Acceso
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-800">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <Shield className="w-3 h-3" />
                      ) : (
                        <Users className="w-3 h-3" />
                      )}
                      {user.role === "admin" ? "Administrador" : "Trabajador"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status === "active" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {user.status === "active" ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Agregar Nuevo Usuario
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del usuario"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="correo@empresa.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Rol
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="worker">Trabajador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Contraseña Temporal
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contraseña"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
