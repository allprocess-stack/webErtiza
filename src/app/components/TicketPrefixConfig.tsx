import { useEffect, useState } from "react";
import { FileText, Save, Plus, Trash2, Check, Upload, RefreshCw } from "lucide-react";
import { useAuth } from "./AuthContext";

interface PrefixFormat {
  id: number;
  name: string;
  format: string;
  example: string;
  active: boolean;
}

export function TicketPrefixConfig() {
  const { user } = useAuth();

  const [formats, setFormats] = useState<PrefixFormat[]>([]);
  const [newFormat, setFormat] = useState({
    // name: "",
    prefix: "",
    format: "",
    active: false,
  });
  useEffect(() => {
    loadConfig();
    loadFormats();
  }, []);
  const handleSave = async () => {
    try {
      const res = await fetch("/api/ticket-prefix/save-config",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Prefijo: newFormat.prefix,
            Formato: newFormat.format,
            Activo: false,
            IdUsuario: user?.id || null,
          }),
        });
      // const data = await res.json();
      if (res.ok) {
        alert("Configuración guardada correctamente");
        await loadConfig()
        await loadFormats();
      } else {
        alert("Error al guardar");
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  }

  const loadConfig = async () => {
    try {
      const res = await fetch("/api/ticket-prefix/config");
      const data = await res.json();
      if (data) {
        setFormat({
          // name: data. || "",
          prefix: data.Prefijo || "",
          format: data.Formato || "",
          active: false,
        });
      }
    } catch (error) {
      alert("Error de conexión con el backend");
    }
  }

  const generateExample = (prefix: string, format: string) => {
    const correlativo = format.replace(/0/g, "1");
    return `${prefix}-${correlativo}`;
  };

  const loadFormats = async () => {
    try {
      const res = await fetch("/api/ticket-prefix/all-config");
      const data = await res.json();

      const mapped = data.map((item: any) => ({
        id: item.Id,
        name: "Formato Ticket",
        prefix: item.Prefijo,
        format: item.Formato,
        example: generateExample(item.Prefijo, item.Formato),
        active: item.Activo,
      }));

      setFormats(mapped);
    } catch (error) {
      console.error(error);
    }
  };

  const activeTicket = async (id: number) => {
    try {
      const res = await fetch("/api/ticket-prefix/activate-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: id }),
      });

      if (res.ok) {
        await loadConfig();
      } else {
        alert("Error al activar");
      }
    } catch (error) {
      alert("Error de conexión");
    }
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

      {/* Add New Format */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Agregar Nuevo Formato
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nombre del Formato
            </label>
            <input
              type="text"
              value={newFormat.name}
              onChange={(e) =>
                setFormat({ ...newFormat, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Formato Entrada"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Prefijo
            </label>
            <input
              type="text"
              value={newFormat.prefix}
              onChange={(e) =>
                setFormat({
                  ...newFormat,
                  prefix: e.target.value.toUpperCase(),
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ENT, SAL, DSP"
              maxLength={5}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Formato
            </label>
            <select
              value={newFormat.format}
              onChange={(e) =>
                setFormat({ ...newFormat, format: e.target.value })
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
        <button className="mt-4 flex bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleSave}>
          <Plus className="w-5 h-5" />
          Agregar Formato
        </button>
      </div>

      {/* Format Variables Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Guía de Variables para Formatos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono bg-slate-200 px-2 py-1 rounded">
              {"{PREFIX}"}
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
              {"{NNNNNN}"}
            </code>
            <div>
              <p className="font-medium text-slate-800">
                Formato Digitos
              </p>
              <p className="text-sm text-slate-600">Ejemplo: 0000001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Formats */}
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
                  Nombre
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
                  Estado
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {formats.map((format) => (
                <tr key={format.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {format.name}
                  </td>
                  <td className="px-6 py-4">
                    <code className="px-2 py-1 bg-slate-100 text-slate-800 rounded text-sm font-mono">
                      {format.prefix}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-slate-600 font-mono">
                      {format.format}
                    </code>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-800">
                    {format.example}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${format.active
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                        }`}
                    >
                      {format.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" onClick={() => activeTicket(format.id)}>
                        <Check className="w-5 h-5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
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
