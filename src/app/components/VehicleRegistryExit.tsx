import { useState } from "react";
import {
    Truck,
    Search,
    Plus,
    Edit,
    Trash2,
    ArrowDownCircle,
    ArrowUpCircle,
} from "lucide-react";

interface Vehicle {
    id: string;
    plate: string;
    type: string;
    driver: string;
    company: string;
    status: "entrada" | "salida";
    entryTime: string;
    exitTime?: string;
}

export function VehicleRegistryExit() {
    const [searchTerm, setSearchTerm] = useState("");
    const [vehicles, setVehicles] = useState<Vehicle[]>([
        {
            id: "1",
            plate: "ABC-123",
            type: "Camión",
            driver: "Juan Pérez",
            company: "Transportes ABC",
            status: "entrada",
            entryTime: "2026-03-31 08:30",
        },
        {
            id: "2",
            plate: "XYZ-789",
            type: "Camioneta",
            driver: "María García",
            company: "Empresa XYZ",
            status: "salida",
            entryTime: "2026-03-31 07:15",
            exitTime: "2026-03-31 09:45",
        },
        {
            id: "3",
            plate: "DEF-456",
            type: "Camión",
            driver: "Carlos López",
            company: "Transportes DEF",
            status: "entrada",
            entryTime: "2026-03-31 10:00",
        },
    ]);

    const filteredVehicles = vehicles.filter(
        (vehicle) =>
            vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "entrada":
                return "bg-green-100 text-green-700";
            case "salida":
                return "bg-red-100 text-red-700";
            // case "proceso":
            //     return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "entrada":
                return <ArrowDownCircle className="w-4 h-4" />;
            case "salida":
                return <ArrowUpCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <Truck className="w-8 h-8 text-blue-600" />
                    Registro de Vehículos Salida
                </h1>
                <p className="text-slate-600 mt-2">
                    Control de salida de vehículos
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Vehículos Hoy</p>
                            <p className="text-2xl font-bold text-slate-800">
                                {vehicles.length}
                            </p>
                        </div>
                        <Truck className="w-8 h-8 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Entrada</p>
                            <p className="text-2xl font-bold text-slate-800">
                                {vehicles.filter((v) => v.status === "entrada").length}
                            </p>
                        </div>
                        <ArrowDownCircle className="w-8 h-8 text-green-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600">Finalizados</p>
                            <p className="text-2xl font-bold text-slate-800">
                                {vehicles.filter((v) => v.status === "salida").length}
                            </p>
                        </div>
                        <ArrowUpCircle className="w-8 h-8 text-red-600" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por placa, conductor o empresa..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            <Plus className="w-5 h-5" />
                            Registrar Salida
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                                    Placa
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                                    Tipo
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                                    Conductor
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                                    Empresa
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                                    Estado
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                                    Hora Entrada
                                </th>
                                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                                    Hora Salida
                                </th>
                                <th className="text-right px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredVehicles.map((vehicle) => (
                                <tr key={vehicle.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {vehicle.plate}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {vehicle.type}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-800">
                                        {vehicle.driver}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {vehicle.company}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                vehicle.status
                                            )}`}
                                        >
                                            {getStatusIcon(vehicle.status)}
                                            {vehicle.status.charAt(0).toUpperCase() +
                                                vehicle.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {vehicle.entryTime}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {vehicle.exitTime || "-"}
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
