USE ordervista_db;

CREATE TABLE ROLES (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

CREATE TABLE USUARIOS (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    id_rol INT NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (id_rol) REFERENCES ROLES(id_rol)
);

CREATE TABLE DIRECCIONES (
    id_direccion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    comuna VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    referencia VARCHAR(255),
    principal BOOLEAN NOT NULL DEFAULT FALSE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario)
);

CREATE TABLE CATEGORIAS (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE PRODUCTOS (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen VARCHAR(255),
    id_categoria INT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIAS(id_categoria)
);

CREATE TABLE TIPOS_PEDIDO (
    id_tipo_pedido INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

CREATE TABLE ESTADOS_PEDIDO (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

CREATE TABLE PEDIDOS (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_tipo_pedido INT NOT NULL,
    id_direccion INT NULL,
    id_estado INT NOT NULL,
    fecha_pedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2) NOT NULL,
    observacion VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario),
    FOREIGN KEY (id_tipo_pedido) REFERENCES TIPOS_PEDIDO(id_tipo_pedido),
    FOREIGN KEY (id_direccion) REFERENCES DIRECCIONES(id_direccion),
    FOREIGN KEY (id_estado) REFERENCES ESTADOS_PEDIDO(id_estado)
);

CREATE TABLE DETALLE_PEDIDO (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES PEDIDOS(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES PRODUCTOS(id_producto)
);

CREATE TABLE COMANDAS (
    id_comanda INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL UNIQUE,
    fecha_generacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacion VARCHAR(255),
    FOREIGN KEY (id_pedido) REFERENCES PEDIDOS(id_pedido)
);