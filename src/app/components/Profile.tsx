import { useState } from "react";
import {
    Scale,
    Truck,
    ArrowRight,
    Save,
    Printer,
    Calendar,
    PersonStanding,
    Target,
    IdCard,
    UserRoundKey,
    AtSign,
    LockKeyhole,
    CircleUser,
} from "lucide-react";

type WeighingType = "first" | "second";

export function Profile() {
    const [weighingType, setWeighingType] = useState<WeighingType>("first");
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        number: "",
        cod: "",
        role: "",
        email: "",
        password: "",
        active: "",
    });

    // Funcion para calcular la edad - Mejorar
    // const calculateNetWeight = () => {
    //     const first = parseFloat(formData.dateofbrith) || 0;
    //     const second = parseFloat() || 0;
    //     return Math.abs(first - second).toFixed(2);
    // };

    // const handleSave = () => {
    //     const netWeight = calculateNetWeight();
    //     alert(`Pesaje registrado exitosamente\nPeso neto: ${netWeight} kg`);
    // };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <CircleUser className="w-8 h-8 text-blue-600" />
                    Perfil de Usuario
                </h1>
                <p className="text-slate-600 mt-2">
                    Información personal del usuario
                </p>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-6">
                    Datos del Usuario
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nombres
                        </label>
                        <div className="relative">
                            <PersonStanding className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full pl-10 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nombre del usuario"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Apellidos
                        </label>
                        <div className="relative">
                            <PersonStanding className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={formData.lastname}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastname: e.target.value })
                                }
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Apellido del usuario"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Rol de Usuario
                        </label>
                        <div className="relative">
                            <UserRoundKey className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                disabled
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({ ...formData, role: e.target.value })
                                }
                                className="w-full pl-10 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Rol del usuario"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                            <input type="text" value={formData.email} onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                                className="w-full pl-10 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="example@company.com" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="w-full pl-10 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="*********"
                            />
                        </div>
                    </div>
                    {/* Acciones */}
                    <div className="md:col-span-2 flex justify-center gap-4 ">
                        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            <Save className="w-5 h-5" />
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
