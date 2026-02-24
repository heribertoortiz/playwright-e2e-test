# Configuración de la estructura de carpetas

Creemos la siguiente estructura de carpetas:

```sh
PLAYWRIGHT-E2E-TESTS/
├── .github/                    # Carpeta de configuración de CI
├── .vscode/                    # Configuraciones específicas del editor
│   └── mcp.json                # Configuración del servidor MCP para VS Code
├── config/                     # Archivos de configuración específicos del entorno
├── data/                       # Datos estáticos y constantes
│   └── constants.json          # Constantes comunes utilizadas en pruebas
├── debug/                      # Opcional: Salidas/registros relacionados con la depuración
├── logs/                       # Registros de aplicaciones/pruebas
├── node_modules/               # Dependencias generadas automáticamente
├── playwright-report/          # Salida del informe de prueba HTML de Playwright
├── resources/                  # Recursos de prueba diversos (por ejemplo, imágenes, archivos)
├── tests/                      # Todos los archivos de prueba organizados
│   ├── api/                    # Especificaciones de pruebas de API
│   ├── demo/                   # Especificaciones de prueba relacionadas con la demostración
│   ├── devices/                # Escenarios relacionados con el dispositivo
│   ├── e2e/                    # Especificaciones de pruebas de extremo a extremo
│   ├── functional/             # Casos de prueba funcionales
│   ├── helpers/                # Funciones de utilidad para pruebas
│   ├── page-objects/           # Archivos del modelo de objetos de página
├── tests-examples/             # Escenarios de prueba de muestra generados automáticamente
├── .env.example                # Plantilla para archivos de entorno
├── .env                        # Plantilla para archivos de entorno
├── .gitignore                  # Git ignoró archivos y carpetas
├── package-lock.json           # Archivo de bloqueo de dependencia
├── package.json                # Metadatos y scripts del proyecto
├── playwright.config.ts        # Archivo de configuración de Playwright
├── README.md                   # Descripción general del proyecto e instrucciones
```