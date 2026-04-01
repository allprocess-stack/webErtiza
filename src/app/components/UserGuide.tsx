import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Scale,
  Settings,
  Users,
  FileText,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string[];
}

export function UserGuide() {
  const [openSection, setOpenSection] = useState<string | null>("1");

  const sections: Section[] = [
    {
      id: "1",
      title: "Introducción al Sistema",
      icon: <BookOpen className="w-5 h-5" />,
      content: [
        "Bienvenido al Sistema de Balanza Industrial. Este sistema permite el control y registro completo de pesajes industriales con conexión TCP/IP a balanzas.",
        "El sistema está diseñado para gestionar el flujo completo de pesaje, desde la entrada del vehículo hasta la salida, generando tickets automáticos y reportes detallados.",
        "Funciona con autenticación de usuarios, diferenciando entre administradores y operadores, cada uno con permisos específicos.",
      ],
    },
    {
      id: "2",
      title: "Inicio de Sesión",
      icon: <Users className="w-5 h-5" />,
      content: [
        "Para acceder al sistema, ingrese su usuario y contraseña en la pantalla de login.",
        "Si olvidó su contraseña, haga clic en '¿Olvidó su contraseña?' y siga las instrucciones para recuperarla.",
        "Los administradores tienen acceso completo al sistema, mientras que los operadores tienen acceso limitado a funciones operativas.",
      ],
    },
    {
      id: "3",
      title: "Conexión con la Balanza",
      icon: <Scale className="w-5 h-5" />,
      content: [
        "Vaya a 'Configuración de Balanza' en el menú lateral.",
        "Ingrese la dirección IP de la balanza (ejemplo: 192.168.1.100).",
        "Configure el puerto de comunicación (por defecto 502 para Modbus TCP).",
        "Seleccione el protocolo de comunicación (TCP/IP, Modbus TCP o Serial).",
        "Configure los parámetros de comunicación serial si es necesario (velocidad, bits de datos, paridad).",
        "Haga clic en 'Probar Conexión' para verificar la comunicación con la balanza.",
        "Una vez verificada, guarde la configuración.",
      ],
    },
    {
      id: "4",
      title: "Registro de Primera Pesada",
      icon: <Scale className="w-5 h-5" />,
      content: [
        "Cuando un vehículo ingresa, vaya a 'Registro de Pesadas'.",
        "Seleccione 'Primera Pesada' como tipo de pesaje.",
        "El sistema generará automáticamente un número de ticket.",
        "Ingrese la placa del vehículo y los datos del conductor.",
        "Seleccione el producto y el cliente.",
        "El peso se capturará automáticamente desde la balanza.",
        "Verifique que el peso sea correcto y guarde el registro.",
        "Puede imprimir el ticket para entregarlo al conductor.",
      ],
    },
    {
      id: "5",
      title: "Registro de Segunda Pesada",
      icon: <Scale className="w-5 h-5" />,
      content: [
        "Cuando el vehículo regresa, vaya a 'Registro de Pesadas'.",
        "Seleccione 'Segunda Pesada'.",
        "Ingrese el número de ticket de la primera pesada o busque por placa.",
        "El sistema mostrará los datos de la primera pesada.",
        "El peso se capturará automáticamente.",
        "El sistema calculará automáticamente el peso neto (diferencia entre ambas pesadas).",
        "Guarde el registro y genere el ticket final.",
      ],
    },
    {
      id: "6",
      title: "Gestión de Vehículos",
      icon: <FileText className="w-5 h-5" />,
      content: [
        "Acceda a 'Registro de Vehículos' para ver todos los vehículos en el sistema.",
        "Use la barra de búsqueda para encontrar vehículos por placa, conductor o empresa.",
        "Registre la entrada y salida de cada vehículo.",
        "El sistema muestra el estado actual: Entrada, Salida o En Proceso.",
        "Puede editar o eliminar registros según sus permisos.",
      ],
    },
    {
      id: "7",
      title: "Configuración de Base de Datos",
      icon: <Settings className="w-5 h-5" />,
      content: [
        "Los administradores pueden configurar la conexión a la base de datos desde el menú de configuración.",
        "Seleccione el tipo de base de datos (MySQL, PostgreSQL, SQL Server, etc.).",
        "Ingrese el host, puerto, nombre de la base de datos y credenciales.",
        "Active SSL/TLS si es necesario para mayor seguridad.",
        "Pruebe la conexión antes de guardar la configuración.",
      ],
    },
    {
      id: "8",
      title: "Reportes y Análisis",
      icon: <FileText className="w-5 h-5" />,
      content: [
        "Acceda a 'Reportes' para ver estadísticas y análisis.",
        "Puede generar reportes por fecha, producto, cliente o vehículo.",
        "Los gráficos muestran tendencias y patrones de pesaje.",
        "Exporte los reportes a PDF o Excel para análisis externos.",
        "Configure alertas para pesos fuera de rango.",
      ],
    },
    {
      id: "9",
      title: "Panel de Administración",
      icon: <Users className="w-5 h-5" />,
      content: [
        "Solo los administradores tienen acceso a este panel.",
        "Gestione usuarios, cree nuevos operadores y asigne permisos.",
        "Active o desactive usuarios según sea necesario.",
        "Consulte el historial de actividades de cada usuario.",
        "Configure roles y permisos personalizados.",
      ],
    },
    {
      id: "10",
      title: "Solución de Problemas",
      icon: <HelpCircle className="w-5 h-5" />,
      content: [
        "Si no puede conectarse a la balanza, verifique que esté encendida y en la misma red.",
        "Compruebe que no haya firewall bloqueando el puerto configurado.",
        "Si el peso no se actualiza, verifique la configuración del protocolo y los parámetros de comunicación.",
        "Para problemas de impresión, verifique que la impresora esté configurada correctamente.",
        "Si olvidó su contraseña, contacte al administrador del sistema.",
      ],
    },
  ];

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600" />
          Guía de Usuario
        </h1>
        <p className="text-slate-600 mt-2">
          Manual de uso del Sistema de Balanza Industrial
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        {sections.map((section, index) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors ${index !== 0 ? "border-t border-slate-200" : ""
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  {section.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  {section.title}
                </h3>
              </div>
              {openSection === section.id ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {openSection === section.id && (
              <div className="px-6 pb-6 space-y-3">
                {section.content.map((paragraph, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="flex flex-col md:flex-row gap-4 mt-6 px-4 md:px-32">
        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <FileText className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-bold text-slate-800 mb-2">Manual en PDF</h3>
          <p className="text-sm text-slate-600 mb-4">
            Descargue el manual completo en formato PDF
          </p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Descargar →
          </button>
        </div>

        <div className="flex-1 bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <HelpCircle className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-bold text-slate-800 mb-2">Preguntas Frecuentes</h3>
          <p className="text-sm text-slate-600 mb-4">
            Respuestas a las dudas más comunes
          </p>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Ver FAQ →
          </button>
        </div>
      </div>
    </div>
  );
}
