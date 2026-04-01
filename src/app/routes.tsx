import { createBrowserRouter } from "react-router";
import { Login } from "./components/Login";
import { ForgotPassword } from "./components/ForgotPassword";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { WorkerDashboard } from "./components/WorkerDashboard";
import { AdminPanel } from "./components/AdminPanel";
import { WeightMonitor } from "./components/WeightMonitor";
import { WeighingRegistration } from "./components/WeighingRegistration";
import { VehicleRegistryEntry } from "./components/VehicleRegistryEntry";
import { ScaleConnection } from "./components/ScaleConnection";
import { DatabaseConnection } from "./components/DatabaseConnection";
import { ClientRegistry } from "./components/ClientRegistry";
import { ProductRegistry } from "./components/ProductRegistry";
import { OperatorRegistry } from "./components/OperatorRegistry";
import { TicketPrefixConfig } from "./components/TicketPrefixConfig";
import { DispatchRegistry } from "./components/DispatchRegistry";
import { UserGuide } from "./components/UserGuide";
import { Credits } from "./components/Credits";
import { History } from "./components/History";
import { Settings } from "./components/Settings";
import { Reports } from "./components/Reports";
import { NotFound } from "./components/NotFound";
import { VehicleRegistryExit } from "./components/VehicleRegistryExit";
import { Profile } from "./components/Profile";

// Componente para manejar el dashboard según el rol
function DashboardRouter() {
  const userRole = localStorage.getItem("userRole");
  return userRole === "admin" ? <Dashboard /> : <WorkerDashboard />;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DashboardRouter },
      { path: "monitor", Component: WeightMonitor },
      { path: "weighing", Component: WeighingRegistration },
      { path: "vehicles-entry", Component: VehicleRegistryEntry },
      { path: "vehicles-exit", Component: VehicleRegistryExit },
      { path: "clients", Component: ClientRegistry },
      { path: "products", Component: ProductRegistry },
      { path: "operators", Component: OperatorRegistry },
      { path: "dispatches", Component: DispatchRegistry },
      { path: "history", Component: History },
      { path: "reports", Component: Reports },
      { path: "scale-config", Component: ScaleConnection },
      { path: "db-config", Component: DatabaseConnection },
      { path: "ticket-config", Component: TicketPrefixConfig },
      { path: "admin", Component: AdminPanel },
      { path: "guide", Component: UserGuide },
      { path: "credits", Component: Credits },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  },
]);
