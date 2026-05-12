import { useEffect, useState } from "react";
import { FileText, Save, Plus, Trash2, Check, Edit, Power, PowerOff } from "lucide-react";
import { useAuth } from "./AuthContext";

interface TicketConfig {
  id: number;
  prefijo: string;
  formato: string;
  fechacreacion?: string;
  activo: boolean;
  idusuario?: number | null;
}

export function TicketPrefixConfig() {
  const { user } = useAuth();

  const [tickets, setTickets] = useState<TicketConfig[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newTicket, setNewTicket] = useState({
    prefijo: "",
    formato: "0000",
  });

  useEffect(() => {
    loadTickets();
  }, []);

  // Cargar todos los tickets
  const loadTickets = async () => {
    try {
      const res = await fetch(`/api/ticket-prefix-config/all-configs`);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // Mapear los campos del backend a nuestra interfaz
        const mapped = data.map((item: any) => ({
          id: item.id,
          prefijo: item.prefijo,
          formato: item.formato,
          fechacreacion: item.fechacreacion,
          activo: item.activo,
          idusuario: item.idusuario,
        }));
        setTickets(mapped);
      }
    } catch (error) {
      console.error("Error al cargar tickets:", error);
      alert("Error al cargar configuraciones");
    }
  };

  // Generar ejemplo de ticket
  const generateExample = (prefijo: string, formato: string) => {
    const correlativo = formato.replace(/0/g, "1");
    return `${prefijo}-${correlativo}`;
  };

  // Guardar o actualizar ticket
  const handleSave = async () => {
    try {
      // Validar campos requeridos
      if (!newTicket.prefijo || !newTicket.formato) {
        alert("Prefijo y formato son requeridos");
        return;
      }

      const endpoint = isEditing && editingId
        ? `/api/ticket-prefix-config/update-config/${editingId}`
        : `/api/ticket-prefix-config/save-config`;
      
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prefijo: newTicket.prefijo.toUpperCase(),
          formato: newTicket.formato,
          fechacreacion: new Date().toISOString(),
          activo: false, // Por defecto inactivo
          idusuario: user?.id || null,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(data.message || (isEditing ? "Ticket actualizado correctamente" : "Ticket creado correctamente"));
        await loadTickets();
        resetForm();
      } else {
        alert(data.error || "Error al guardar");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  // Activar/Desactivar ticket
  const toggleActive = async (id: number, activo: boolean) => {
    try {
      const res = await fetch(`/api/ticket-prefix-config/activate-config/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activo: !activo }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(data.message || `Ticket ${!activo ? 'activado' : 'desactivado'} correctamente`);
        await loadTickets();
      } else {
        alert(data.error || "Error al cambiar estado");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  // Editar ticket
  const handleEdit = (ticket: TicketConfig) => {
    setNewTicket({
      prefijo: ticket.prefijo,
      formato: ticket.formato,
    });
    setIsEditing(true);
    setEditingId(ticket.id);
  };

  // Eliminar ticket
  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este ticket?")) return;

    try {
      const res = await fetch(`/api/ticket-prefix-config/delete-ticket/${id}`, {
        method: "POST",
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(data.message || "Ticket eliminado correctamente");
        await loadTickets();
      } else {
        alert(data.error || "Error al eliminar");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setNewTicket({
      prefijo: "",
      formato: "0000",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600" />
          Formato de Prefijo de Tickets
        </h1>
        <p className="text-slate-600 mt-2">
          Configuración de formatos de numeración para tickets y registros
        </p>
      </div>

      {/* Add/Edit Format */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {isEditing ? "Editar Formato" : "Agregar Nuevo Formato"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Prefijo
            </label>
            <input
              type="text"
              value={newTicket.prefijo}
              onChange={(e) =>
                setNewTicket({
                  ...newTicket,
                  prefijo: e.target.value.toUpperCase(),
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: ENT, SAL, DSP"
              maxLength={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Formato
            </label>
            <select
              value={newTicket.formato}
              onChange={(e) =>
                setNewTicket({ ...newTicket, formato: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">0</option>
              <option value="0000">0000</option>
              <option value="0000000">0000000</option>
              <option value="0000000000">0000000000</option>
            </select>
          </div>
        </div>

        {/* Vista previa */}
        {newTicket.prefijo && newTicket.formato && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Ejemplo:</strong> {generateExample(newTicket.prefijo, newTicket.formato)}
            </p>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            {isEditing ? "Actualizar Formato" : "Guardar Formato"}
          </button>
          {isEditing && (
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Format Variables Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Guía de Variables para Formatos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono bg-slate-200 px-2 py-1 rounded">
              {"{PREFIJO}"}
            </code>
            <div>
              <p className="font-medium text-slate-800">Prefijo</p>
              <p className="text-sm text-slate-600">
                El prefijo configurado (ENT, SAL, etc.)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono bg-slate-200 px-2 py-1 rounded">
              {"{FORMATO}"}
            </code>
            <div>
              <p className="font-medium text-slate-800">
                Formato de Dígitos
              </p>
              <p className="text-sm text-slate-600">
                Cantidad de ceros para el correlativo
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Formats Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Formatos Configurados
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  ID
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Prefijo
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Formato
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Ejemplo
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Fecha Creación
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
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No hay formatos configurados
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm font-mono">
                        {ticket.prefijo}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm text-slate-600 font-mono">
                        {ticket.formato}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
                        {generateExample(ticket.prefijo, ticket.formato)}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {ticket.fechacreacion 
                        ? new Date(ticket.fechacreacion).toLocaleDateString() 
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          ticket.activo
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {ticket.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Botón Activar/Desactivar */}
                        {ticket.activo ? (
                          <button
                            onClick={() => toggleActive(ticket.id, ticket.activo)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Desactivar"
                          >
                            <PowerOff className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => toggleActive(ticket.id, ticket.activo)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Activar"
                          >
                            <Power className="w-4 h-4" />
                          </button>
                        )}
                        
                        {/* Botón Editar */}
                        <button
                          onClick={() => handleEdit(ticket)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        {/* Botón Eliminar */}
                        <button
                          onClick={() => handleDelete(ticket.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}