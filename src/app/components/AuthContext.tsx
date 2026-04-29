import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  // 🔥 HELPERS DE ROLES
  const isMaster = user?.rol === "MASTER";
  const isAdmin = user?.rol === "ADMIN";
  const isWorker = user?.rol === "WORKER";

  const canEdit = (targetRole: string) => {
    if (isMaster) return true;
    if (isAdmin && targetRole === "WORKER") return true;
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isMaster,
        isAdmin,
        isWorker,
        canEdit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);