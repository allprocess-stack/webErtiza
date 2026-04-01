import { Award, Mail, Phone, Globe, Building2, Code } from "lucide-react";

export function Credits() {
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Award className="w-8 h-8 text-blue-600" />
          Créditos y Acerca de
        </h1>
        <p className="text-slate-600 mt-2">
          Información del sistema y desarrolladores
        </p>
      </div>

      {/* Main Credits Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8 text-white mb-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <Building2 className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold mb-2">All Process S.A.C.</h2>
          <p className="text-xl text-blue-100 mb-6">
            Soluciones Industriales Inteligentes
          </p>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <p className="text-sm text-blue-100">Desarrollado con excelencia</p>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600" />
            Sistema de Balanza Industrial
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Versión:</span>
              <span className="font-medium text-slate-800">1.0.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Fecha de Lanzamiento:</span>
              <span className="font-medium text-slate-800">Marzo 2026</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Licencia:</span>
              <span className="font-medium text-slate-800">Propietaria</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-600">Plataforma:</span>
              <span className="font-medium text-slate-800">Local</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-600" />
            Información de Contacto
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <a
                  href="mailto:contacto@allprocess.com.pe"
                  className="font-medium text-slate-800 hover:text-blue-600"
                >
                  info@allprocess.com.pe
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-slate-600">Teléfono</p>
                <a
                  href="tel:+51987654321"
                  className="font-medium text-slate-800 hover:text-blue-600"
                >
                  +51 978 574 600
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-slate-600">Sitio Web</p>
                <a
                  href="https://www.allprocess.com.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-800 hover:text-blue-600"
                >
                  www.allprocess.com.pe
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm text-slate-600">Dirección</p>
                <p className="font-medium text-slate-800">
                  Lima, Perú
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6">
          Características del Sistema
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Conexión TCP/IP",
              description: "Comunicación en tiempo real con balanzas industriales",
            },
            {
              title: "Doble Pesada",
              description: "Sistema de primera y segunda pesada automático",
            },
            {
              title: "Control de Vehículos",
              description: "Registro completo de entrada y salida",
            },
            {
              title: "Gestión de Usuarios",
              description: "Base de datos de usuarios y proveedores",
            },
            {
              title: "Reportes Avanzados",
              description: "Análisis y estadísticas detalladas",
            },
            {
              title: "Multi-usuario",
              description: "Roles y permisos diferenciados",
            },
            {
              title: "Base de Datos",
              description: "Almacenamiento seguro y confiable",
            },
            {
              title: "Tickets Personalizables",
              description: "Formatos de tickets configurables",
            },
            // {
            //   title: "Auditoría Completa",
            //   description: "Registro de todas las operaciones",
            // },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200"
            >
              <h4 className="font-semibold text-slate-800 mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Used */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">
          Tecnologías Utilizadas
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            "React",
            "TypeScript",
            "Tailwind CSS",
            "TCP/IP",
            "Modbus",
            "MySQL",
            "Node.js",
            "REST API",
          ].map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
        <p className="text-slate-600 mb-2">
          © 2026 All Process S.A.C. Todos los derechos reservados.
        </p>
        <p className="text-sm text-slate-500">
          Sistema de Balanza Industrial - Desarrollado con dedicación para la
          industria peruana
        </p>
      </div>
    </div>
  );
}
