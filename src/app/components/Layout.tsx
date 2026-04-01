import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router";
import {
  Scale,
  LayoutDashboard,
  Activity,
  History,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Users,
  Truck,
  Network,
  Database,
  Building2,
  Package,
  UserCog,
  FileX,
  BookOpen,
  Award,
  CircleUser,
} from "lucide-react";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setUserRole(localStorage.getItem("userRole"));
      setUserName(localStorage.getItem("userName"));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  function Main() {
    return (
      <div className="gap-2">
        <Link to="/" className="flex flex-row gap-3 items-center">
          <Scale className="w-8 h-8 text-blue-300" />
          <span className="font-bold text-lg">Balanza Pro</span>
        </Link>
      </div>
    );
  }

  const adminMenuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/monitor", icon: Activity, label: "Monitoreo en Vivo" },
    { path: "/weighing", icon: Scale, label: "Registro de Pesadas" },
    { path: "/vehicles-entry", icon: Truck, label: "Vehículos Entrada" },
    { path: "/vehicles-exit", icon: Truck, label: "Vehículos Salida" },
    { path: "/clients", icon: Building2, label: "Clientes/Proveedores" },
    { path: "/products", icon: Package, label: "Productos" },
    { path: "/operators", icon: UserCog, label: "Operadores" },
    { path: "/dispatches", icon: FileX, label: "Despachos/Anulados" },
    { path: "/history", icon: History, label: "Historial" },
    { path: "/reports", icon: FileText, label: "Reportes" },
    { path: "/scale-config", icon: Network, label: "Config. Balanza" },
    { path: "/db-config", icon: Database, label: "Config. BD" },
    { path: "/ticket-config", icon: FileText, label: "Config. Tickets" },
    { path: "/admin", icon: Shield, label: "Panel Admin" },
    { path: "/guide", icon: BookOpen, label: "Guía de Usuario" },
    { path: "/profile", icon: CircleUser, label: "Perfil de Usuario" },
    { path: "/credits", icon: Award, label: "Créditos" },
    { path: "/settings", icon: Settings, label: "Configuración" },
  ];

  const workerMenuItems = [
    { path: "/", icon: LayoutDashboard, label: "Mi Panel" },
    { path: "/monitor", icon: Activity, label: "Monitoreo en Vivo" },
    { path: "/weighing", icon: Scale, label: "Registro de Pesadas" },
    { path: "/vehicles-entry", icon: Truck, label: "Vehículos Entrada" },
    { path: "/vehicles-exit", icon: Truck, label: "Vehículos Salida" },// MODIFICAR
    { path: "/history", icon: History, label: "Mi Historial" },
    { path: "/guide", icon: BookOpen, label: "Guía de Usuario" },
    { path: "/profile", icon: UserCog, label: "Mi Perfil" },
    { path: "/settings", icon: Settings, label: "Mi Configuración" },
  ];

  const menuItems = userRole === "admin" ? adminMenuItems : workerMenuItems;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-64" : "w-20"
          } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {isSidebarOpen ? (
            <>
              <Main />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 hover:bg-slate-800 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 hover:bg-slate-800 rounded mx-auto"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                      }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {isSidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-800">
          {isSidebarOpen && userName && (
            <div className="mb-3 px-3 py-2 bg-slate-800 rounded-lg">
              <p className="text-xs text-slate-400">Sesión iniciada como</p>
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs text-blue-400 capitalize">{userRole}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
