import { useState } from "react";
import { Package, Plus, Search, Edit, Trash2, Barcode } from "lucide-react";

interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  minWeight: number;
  maxWeight: number;
  status: "active" | "inactive";
}

export function ProductRegistry() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      code: "PROD-001",
      name: "Cemento Portland Tipo I",
      category: "Construcción",
      unit: "kg",
      minWeight: 40,
      maxWeight: 50,
      status: "active",
    },
    {
      id: "2",
      code: "PROD-002",
      name: "Arena Fina",
      category: "Agregados",
      unit: "kg",
      minWeight: 100,
      maxWeight: 1000,
      status: "active",
    },
    {
      id: "3",
      code: "PROD-003",
      name: "Grava Gruesa",
      category: "Agregados",
      unit: "kg",
      minWeight: 100,
      maxWeight: 1500,
      status: "active",
    },
    {
      id: "4",
      code: "PROD-004",
      name: "Piedra Chancada",
      category: "Agregados",
      unit: "kg",
      minWeight: 50,
      maxWeight: 800,
      status: "inactive",
    },
  ]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          Registro de Productos
        </h1>
        <p className="text-slate-600 mt-2">
          Gestión del catálogo de productos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Productos</p>
              <p className="text-2xl font-bold text-slate-800">
                {products.length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Productos Activos</p>
              <p className="text-2xl font-bold text-slate-800">
                {products.filter((p) => p.status === "active").length}
              </p>
            </div>
            <Barcode className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Categorías</p>
              <p className="text-2xl font-bold text-slate-800">
                {new Set(products.map((p) => p.category)).size}
              </p>
            </div>
            <Package className="w-8 h-8 text-purple-600" />
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
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              Agregar Producto
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
                  Nombre del Producto
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Categoría
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Unidad
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-600 uppercase">
                  Rango de Peso
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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {product.code}
                  </td>
                  <td className="px-6 py-4 text-slate-800">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.unit}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.minWeight} - {product.maxWeight} {product.unit}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status === "active" ? "Activo" : "Inactivo"}
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
