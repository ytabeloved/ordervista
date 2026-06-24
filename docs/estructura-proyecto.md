# OrderVista

Sistema web para gestión de pedidos gastronómicos desarrollado con React, Node.js, Express y MySQL.

## Estado del proyecto

Actualmente el proyecto se encuentra en desarrollo. Durante el Sprint 2 se completó la implementación de la arquitectura backend, autenticación y módulos administrativos principales.

## Tecnologías utilizadas

### Frontend

* React
* React Router
* Axios

### Backend

* Node.js
* Express

### Base de datos

* MySQL 8

### Seguridad

* JSON Web Token (JWT)
* bcryptjs

## Funcionalidades implementadas

### Autenticación

* Registro de usuarios
* Inicio de sesión con JWT
* Middleware de autenticación
* Control de acceso por roles

### Administración

* CRUD de usuarios
* CRUD de categorías
* CRUD de productos
* CRUD de tipos de pedido

## Estructura del proyecto

```text
ordervista/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   └── package.json
│
├── frontend/
│
└── docs/
```

## Próximos pasos

* Desarrollo de interfaz administrativa en React.
* Gestión visual de usuarios.
* Gestión visual de categorías.
* Gestión visual de productos.
* Registro y administración de pedidos.
* Dashboard administrativo.
* Reportes operativos.

## Autor

Karla Vergara

Proyecto de Título - Ingeniería en Informática
