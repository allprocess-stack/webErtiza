import { useState } from "react";
import {
  Scale,
  Truck,
  ArrowRight,
  Save,
  Printer,
  Calendar,
} from "lucide-react";

type WeighingType = "first" | "second";

export function WeighingRegistration() {
  const [weighingType, setWeighingType] = useState<WeighingType>("first");
  const [formData, setFormData] = useState({
    ticketNumber: "",
    vehiclePlate: "",
    driverName: "",
    product: "",
    client: "",
    firstWeight: "",
    secondWeight: "",
    netWeight: "",
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  const calculateNetWeight = () => {
    const first = parseFloat(formData.firstWeight) || 0;
    const second = parseFloat(formData.secondWeight) || 0;
    return Math.abs(first - second).toFixed(2);
  };

  const handleSave = () => {
    const netWeight = calculateNetWeight();
    alert(`Pesaje registrado exitosamente\nPeso neto: ${netWeight} kg`);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Scale className="w-8 h-8 text-blue-600" />
          Registro de Pesadas
        </h1>
        <p className="text-slate-600 mt-2">
          Registro de primera y segunda pesada
        </p>
      </div>

      {/* Tipo de Pesada */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          Tipo de Pesada
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setWeighingType("first")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              weighingType === "first"
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <Scale className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Primera Pesada</p>
            <p className="text-sm text-slate-600">Entrada de vehículo</p>
          </button>
          <button
            onClick={() => setWeighingType("second")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              weighingType === "second"
                ? "border-green-600 bg-green-50 text-green-700"
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <ArrowRight className="w-8 h-8 mx-auto mb-2" />
            <p className="font-semibold">Segunda Pesada</p>
            <p className="text-sm text-slate-600">Salida de vehículo</p>
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-6">
          Datos del Pesaje
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              N° de Ticket
            </label>
            <input
              type="text"
              value={formData.ticketNumber}
              onChange={(e) =>
                setFormData({ ...formData, ticketNumber: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0001-2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Placa de Vehículo
            </label>
            <div className="relative">
              <Truck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={formData.vehiclePlate}
                onChange={(e) =>
                  setFormData({ ...formData, vehiclePlate: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ABC-123"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nombre del Conductor
            </label>
            <input
              type="text"
              value={formData.driverName}
              onChange={(e) =>
                setFormData({ ...formData, driverName: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Producto
            </label>
            <select
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar producto</option>
              <option value="cemento">Cemento</option>
              <option value="arena">Arena</option>
              <option value="grava">Grava</option>
              <option value="piedra">Piedra</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cliente
            </label>
            <select
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar cliente</option>
              <option value="empresa1">Empresa ABC S.A.C.</option>
              <option value="empresa2">Constructora XYZ</option>
              <option value="empresa3">Proveedor DEF</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha y Hora
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Pesos */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Pesos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Primera Pesada (kg)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.firstWeight}
                onChange={(e) =>
                  setFormData({ ...formData, firstWeight: e.target.value })
                }
                disabled={weighingType === "second"}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Segunda Pesada (kg)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.secondWeight}
                onChange={(e) =>
                  setFormData({ ...formData, secondWeight: e.target.value })
                }
                disabled={weighingType === "first"}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Peso Neto (kg)
              </label>
              <div className="px-3 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg text-2xl font-bold text-blue-700">
                {formData.firstWeight && formData.secondWeight
                  ? calculateNetWeight()
                  : "0.00"}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            Guardar Pesaje
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors">
            <Printer className="w-5 h-5" />
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}
