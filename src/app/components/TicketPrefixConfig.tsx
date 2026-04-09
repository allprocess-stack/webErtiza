import { useState } from "react";
import { FileText, Save, Plus, Trash2 } from "lucide-react";
import { useAuth } from "./AuthContext";

interface PrefixFormat {
  id: string;
  name: string;
  prefix: string;
  format: string;
  example: string;
  active: boolean;
}

export function TicketPrefixConfig() {
  const { user } = useAuth();

  const [formats, setFormats] = useState<PrefixFormat[]>([
    {
      id: "1",
      name: "Formato Entrada",
      prefix: "ENT",
      format: "{PREFIX}-{YYYY}{MM}{DD}-{NNNN}",
      example: "ENT-20260331-0001",
      active: true,
    },
    {
      id: "2",
      name: "Formato Salida",
      prefix: "SAL",
      format: "{PREFIX}-{YYYY}{MM}{DD}-{NNNN}",
      example: "SAL-20260331-0001",
      active: true,
    },
    {
      id: "3",
      name: "Formato Despacho",
      prefix: "DSP",
      format: "{PREFIX}-{YYYY}-{NNNNNN}",
      example: "DSP-2026-000001",
      active: false,
    },
  ]);

  const [newFormat, setNewFormat] = useState({
    name: "",
    prefix: "",
    format: "{PREFIX}-{YYYY}{MM}{DD}-{NNNN}",
  });

  const generateExample = (prefix: string, format: string) => {
    const now = new Date();
    return format
      .replace("{PREFIX}", prefix)
      .replace("{YYYY}", now.getFullYear().toString())
      .replace("{MM}", (now.getMonth() + 1).toString().padStart(2, "0"))
      .replace("{DD}", now.getDate().toString().padStart(2, "0"))
      .replace("{NNNN}", "0001")
      .replace("{NNNNNN}", "000001");
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
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nombre del Formato
            </label>
            <input
              type="text"
              value={newFormat.name}
              onChange={(e) =>
                setNewFormat({ ...newFormat, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Formato Entrada"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Prefijo
            </label>
            <input
              type="text"
              value={newFormat.prefix}
              onChange={(e) =>
                setNewFormat({
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
            <input
              type="text"
              value={newFormat.format}
              onChange={(e) =>
                setNewFormat({ ...newFormat, format: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="{PREFIX}-{YYYY}-{NNNN}"
            />
          </div>
        </div>

        {newFormat.prefix && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-slate-600 mb-1">
              Vista previa del formato:
            </p>
            <p className="text-lg font-mono font-bold text-blue-700">
              {generateExample(newFormat.prefix, newFormat.format)}
            </p>
          </div>
        )}

        <button className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Agregar Formato
        </button>
      </div>

      {/* Format Variables Guide */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Variables Disponibles
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
              {"{YYYY}"}
            </code>
            <div>
              <p className="font-medium text-slate-800">Año (4 dígitos)</p>
              <p className="text-sm text-slate-600">Ejemplo: 2026</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono bg-slate-200 px-2 py-1 rounded">
              {"{MM}"}
            </code>
            <div>
              <p className="font-medium text-slate-800">Mes (2 dígitos)</p>
              <p className="text-sm text-slate-600">Ejemplo: 03</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono bg-slate-200 px-2 py-1 rounded">
              {"{DD}"}
            </code>
            <div>
              <p className="font-medium text-slate-800">Día (2 dígitos)</p>
              <p className="text-sm text-slate-600">Ejemplo: 31</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono bg-slate-200 px-2 py-1 rounded">
              {"{NNNN}"}
            </code>
            <div>
              <p className="font-medium text-slate-800">
                Número secuencial (4 dígitos)
              </p>
              <p className="text-sm text-slate-600">Ejemplo: 0001</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono bg-slate-200 px-2 py-1 rounded">
              {"{NNNNNN}"}
            </code>
            <div>
              <p className="font-medium text-slate-800">
                Número secuencial (6 dígitos)
              </p>
              <p className="text-sm text-slate-600">Ejemplo: 000001</p>
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
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Save className="w-4 h-4" />
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
