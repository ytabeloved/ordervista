USE ordervista_db;

INSERT INTO ROLES (nombre, descripcion) VALUES
('Administrador', 'Usuario con acceso completo a la administración del sistema.'),
('Operador', 'Usuario encargado de gestionar pedidos, estados, comandas y comprobantes.'),
('Cliente', 'Usuario que puede visualizar el menú, generar pedidos y consultar su estado.');

INSERT INTO ESTADOS_PEDIDO (nombre, descripcion) VALUES
('Pendiente', 'Pedido registrado y pendiente de preparación.'),
('En preparación', 'Pedido en proceso de preparación.'),
('Listo', 'Pedido preparado y listo para retiro, entrega o consumo.'),
('Entregado', 'Pedido finalizado y entregado al cliente.');

INSERT INTO TIPOS_PEDIDO (nombre, descripcion) VALUES
('Delivery', 'Pedido con despacho a domicilio.'),
('Retiro', 'Pedido para retiro en el local.'),
('Consumo Local', 'Pedido realizado para consumo dentro del local.');