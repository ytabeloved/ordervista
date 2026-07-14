# OrderVista

OrderVista es una aplicación web responsive para la gestión de pedidos en restaurantes. El sistema permite administrar productos, categorías, usuarios, pedidos, comandas, comprobantes y reportes operativos desde una plataforma centralizada.

El proyecto fue desarrollado como parte del Proyecto de Título de Ingeniería en Informática, utilizando una arquitectura web moderna basada en frontend React, backend Node.js/Express y base de datos MySQL.

---

## 1. Descripción general

OrderVista busca digitalizar y simplificar el proceso de toma y gestión de pedidos en un restaurante, permitiendo que distintos tipos de usuarios interactúen con el sistema según su rol.

El sistema permite:

- Administrar usuarios del sistema.
- Administrar categorías de productos.
- Administrar productos del menú.
- Crear pedidos online como cliente.
- Crear pedidos presenciales como operador.
- Gestionar estados de pedidos.
- Generar comandas operativas para cocina.
- Generar comprobantes operativos.
- Consultar reportes de ventas estimadas y productos más vendidos.
- Utilizar la aplicación desde escritorio, tablet o celular mediante diseño responsive.

---

## 2. Tecnologías utilizadas

### Frontend

- React
- Vite
- React Router DOM
- Axios
- CSS modular por vistas
- Lucide React para íconos
- LocalStorage para manejo de sesión en cliente

### Backend

- Node.js
- Express.js
- MySQL2
- JWT para autenticación
- Bcrypt para manejo de contraseñas
- Dotenv para variables de entorno
- CORS para conexión frontend-backend

### Base de datos

- MySQL
- Modelo relacional
- Tablas principales:
  - ROLES
  - USUARIOS
  - CATEGORIAS
  - PRODUCTOS
  - PEDIDOS
  - DETALLE_PEDIDO
  - ESTADOS_PEDIDO
  - TIPOS_PEDIDO
  - DIRECCIONES
  - COMANDAS

### Despliegue

- Frontend: Vercel
- Backend: Render
- Base de datos: Aiven MySQL

---

## 3. Roles del sistema

OrderVista considera tres tipos principales de usuarios:

### Administrador

Permite gestionar la configuración principal del sistema.

Funciones:

- Iniciar sesión.
- Gestionar usuarios.
- Gestionar categorías.
- Gestionar productos.
- Consultar dashboard administrativo.
- Consultar reportes de ventas estimadas.
- Consultar productos más vendidos.

### Operador

Permite gestionar pedidos y flujo operativo del restaurante.

Funciones:

- Iniciar sesión.
- Visualizar pedidos.
- Crear pedidos presenciales.
- Cambiar estado de pedidos.
- Gestionar comandas de cocina.
- Generar comprobantes operativos.

### Cliente

Permite realizar pedidos desde la vista cliente.

Funciones:

- Registrarse.
- Iniciar sesión.
- Visualizar menú.
- Agregar productos al carrito.
- Crear pedidos.
- Consultar sus pedidos.

---

## 4. Funcionalidades principales

### Autenticación

El sistema cuenta con inicio de sesión mediante correo y contraseña. El backend valida credenciales y entrega un token JWT utilizado por el frontend para consumir rutas protegidas.

### Gestión de usuarios

El administrador puede crear, editar, eliminar y filtrar usuarios según su rol.

### Gestión de categorías

Permite crear categorías para organizar los productos del menú, además de activar o desactivar categorías según disponibilidad.

### Gestión de productos

Permite administrar productos del menú, incluyendo nombre, descripción, categoría, precio, stock, imagen y estado de disponibilidad.

En mobile, la vista administrativa se optimizó para mostrar la información esencial del producto: imagen, nombre, descripción y acciones de edición o eliminación.

### Pedidos

El sistema permite crear pedidos online y presenciales. Cada pedido contiene detalle de productos, cantidades, totales y estado operativo.

### Comandas

El operador puede visualizar comandas asociadas a pedidos, facilitando el trabajo de cocina.

### Comprobantes

El sistema permite generar comprobantes operativos para pedidos completados.

### Reportes

El administrador puede consultar:

- Ventas estimadas.
- Total de pedidos.
- Ticket promedio.
- Clientes atendidos.
- Ventas estimadas por día.
- Productos más vendidos.
- Filtros por rango de fechas.

---

## 5. Estructura del proyecto

```text
ordervista/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   └── main.jsx
│   ├── package.json
│   ├── vercel.json
│   └── .env
│
└── README.md

```

---

## 6. Instalación local

### Requisitos previos

- Node.js instalado.
- npm instalado.
- MySQL disponible.
- Git instalado.

---

## 7. Configuración del backend

Entrar a la carpeta backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear archivo `.env`:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=ordervista

DB_SSL=false
DB_SSL_REJECT_UNAUTHORIZED=false

JWT_SECRET=tu_clave_secreta

FRONTEND_URL=http://localhost:5173
```

Ejecutar backend en desarrollo:

```bash
npm run dev
```

O ejecutar en modo producción:

```bash
npm start
```

Endpoint de verificación:

```http
GET /api/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "message": "OrderVista API running"
}
```

---

## 8. Configuración del frontend

Entrar a la carpeta frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Crear o editar archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Ejecutar frontend en desarrollo:

```bash
npm run dev
```

La aplicación quedará disponible normalmente en:

```text
http://localhost:5173
```

---

## 9. Variables de entorno en producción

### Frontend en Vercel

Variable requerida:

```env
VITE_API_URL=https://ordervista-backend.onrender.com/api
```

### Backend en Render

Variables requeridas:

```env
PORT=3000

DB_HOST=host_de_aiven
DB_PORT=puerto_de_aiven
DB_USER=usuario_de_aiven
DB_PASSWORD=password_de_aiven
DB_NAME=defaultdb

DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false

JWT_SECRET=clave_segura_para_jwt

FRONTEND_URL=url_del_frontend_en_vercel
```

No se deben subir contraseñas ni claves secretas al repositorio.

---

## 10. Base de datos

La base de datos utilizada es MySQL. En producción se encuentra alojada en Aiven.

Tablas principales del sistema:

```text
ROLES
USUARIOS
CATEGORIAS
PRODUCTOS
PEDIDOS
DETALLE_PEDIDO
ESTADOS_PEDIDO
TIPOS_PEDIDO
DIRECCIONES
COMANDAS
```

En ambientes Linux, como Render, los nombres de tablas son sensibles a mayúsculas y minúsculas. Por este motivo, el proyecto utiliza tablas en mayúsculas.

---

## 11. Flujo general del sistema

### Flujo cliente

1. El cliente se registra o inicia sesión.
2. Visualiza el menú disponible.
3. Agrega productos al carrito.
4. Confirma el pedido.
5. Consulta el estado del pedido.

### Flujo operador

1. El operador inicia sesión.
2. Visualiza pedidos activos.
3. Crea pedidos presenciales si es necesario.
4. Cambia estados del pedido.
5. Revisa comandas.
6. Genera comprobantes.

### Flujo administrador

1. El administrador inicia sesión.
2. Gestiona usuarios.
3. Gestiona categorías.
4. Gestiona productos.
5. Revisa dashboard.
6. Consulta reportes operativos.

---

## 12. Rutas principales del frontend

```text
/login
/register
/
/usuarios
/categorias
/productos
/reportes
/operator
/operator/new-order
/kitchen
/receipts
/menu
/cart
/addresses
```

---

## 13. Rutas principales del backend

```text
/api/health
/api/auth
/api/users
/api/categories
/api/products
/api/menu
/api/orders
/api/order-types
/api/addresses
/api/commands
/api/reports
```

---

## 14. Diseño responsive

La interfaz fue optimizada para distintos tamaños de pantalla:

- Escritorio.
- Tablet.
- Celular.

Se realizaron ajustes responsive en:

- Sidebar administrativo.
- Topbar.
- Login.
- Registro.
- Usuarios.
- Categorías.
- Productos.
- Dashboard.
- Reportes.
- Vista cliente.
- Vista operador.
- Comandas.
- Comprobantes.
- Modales.

El objetivo fue mantener la información crítica visible en dispositivos pequeños, evitando scroll horizontal innecesario en vistas operativas.

---

## 15. Despliegue

### Frontend

El frontend se despliega en Vercel desde el repositorio GitHub.

Configuración esperada:

```text
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

Archivo `vercel.json` utilizado para soportar rutas de React Router:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### Backend

El backend se despliega en Render como Web Service.

Configuración esperada:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### Base de datos

La base de datos se despliega en Aiven MySQL, utilizando conexión SSL.

---

## 16. Consideraciones de producción

El proyecto utiliza servicios gratuitos para el despliegue, por lo que pueden existir tiempos de espera iniciales cuando el backend o la base de datos se encuentran en reposo.

En caso de pruebas funcionales, se recomienda:

1. Verificar que la base de datos Aiven esté activa.
2. Verificar que el backend Render esté activo.
3. Probar endpoint `/api/health`.
4. Abrir el frontend en Vercel.
5. Ejecutar pruebas de login y flujos principales.

---

## 17. Pruebas funcionales sugeridas

Casos mínimos de prueba:

1. Verificar backend productivo mediante `/api/health`.
2. Login administrador.
3. Login operador.
4. Login cliente.
5. Crear categoría.
6. Editar categoría.
7. Crear producto.
8. Editar producto.
9. Crear pedido online.
10. Crear pedido presencial.
11. Cambiar estado de pedido.
12. Visualizar comanda.
13. Generar comprobante.
14. Consultar dashboard.
15. Consultar reportes con filtro por fechas.
16. Validar diseño responsive en celular.

---

## 18. Seguridad

Medidas consideradas:

- Autenticación mediante JWT.
- Rutas protegidas por token.
- Separación de permisos por rol.
- Contraseñas manejadas con hashing.
- Variables sensibles en archivos `.env`.
- Restricción CORS por URL de frontend permitida.
- No exposición de credenciales en el repositorio.

---

## 19. Limitaciones del proyecto

El alcance actual no considera:

- Pago en línea.
- Facturación electrónica.
- Inventario avanzado.
- Aplicación móvil nativa.
- Geolocalización de despacho.
- Integración directa con sistemas POS externos.
- Inteligencia artificial.

Estas funcionalidades podrían considerarse como mejoras futuras.

---

## 20. Mejoras futuras

Posibles mejoras para una segunda etapa:

- Integración con Oracle Simphony.
- Sincronización automática de productos desde POS.
- Envío de pedidos directamente a sistema POS.
- Panel de cocina en tiempo real.
- Notificaciones push.
- Control de inventario.
- Reportes avanzados.
- Auditoría de acciones por usuario.
- App móvil nativa para operadores.

---

## 21. Autor

Proyecto desarrollado por Karla Vergara como parte del Proyecto de Título de Ingeniería en Informática.

---

## 22. Estado del proyecto

Proyecto desplegado en ambiente productivo mediante:

- Frontend en Vercel.
- Backend en Render.
- Base de datos en Aiven MySQL.

Estado general: en etapa de validación final, pruebas funcionales, documentación y entrega final.