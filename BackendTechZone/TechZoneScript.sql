
drop database if exists Tech_Zone;
create database Tech_Zone;
use Tech_Zone;

-- tables
create table tb_usuario (
    cod_usu int primary key auto_increment,
    nom_usu varchar(50),
    ape_usu varchar(50),
    dni_usu varchar(8),
    email varchar(50) unique,
    telefono varchar(15),
    direccion varchar(150),
    usuario varchar(50) unique,
    clave varchar(70),
    rol varchar(20)  -- valores posibles: 'usuario', 'admin'
);

create table tb_proveedor(
cod_prov int primary key auto_increment,
nom_prov varchar(169)
);


create table tb_marca(
cod_marca int primary key auto_increment,
nom_marca varchar(30),
pai_marca varchar(50)
);

CREATE TABLE tb_categoria (
  cod_cat INT PRIMARY KEY AUTO_INCREMENT,
  nom_cat VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE tb_producto (
  cod_prod INT PRIMARY KEY AUTO_INCREMENT,
  nom_prod VARCHAR(80),
  des_prod VARCHAR(255),
  cod_cat INT,  -- clave foránea
  stock_prod INT,
  precio_compra DECIMAL(10,2),
  cod_prov INT,
  cod_marca INT,
  FOREIGN KEY (cod_cat) REFERENCES tb_categoria(cod_cat)
);

create table tb_compra (
    cod_compra int primary key auto_increment,
    fec_compra date,
    monto_compra decimal(10,2),
    mpago varchar(10),
    cod_usu int -- ya no hay cod_adm
);

create table tb_detalle_compra (
    cod_detalle int primary key auto_increment,
    cod_compra int,
    cod_prod int,
    cantidad int,
    precio_unitario decimal(10,2) 
    );


-- union y restricciones claves secundarias
alter table tb_producto
add constraint fk_cod_proveedor foreign key(cod_prov) references tb_proveedor(cod_prov);

alter table tb_producto
add constraint fk_cod_marca foreign key(cod_marca) references tb_marca(cod_marca);

alter table tb_detalle_compra
add constraint fk_cod_producto foreign key(cod_prod) references tb_producto(cod_prod);

alter table tb_detalle_compra
add constraint fk_cod_compra foreign key(cod_compra) references tb_compra(cod_compra);

alter table tb_compra	
add constraint fk_cod_usu foreign key(cod_usu) references tb_usuario(cod_usu);

-- inserts 
INSERT INTO tb_proveedor (nom_prov) VALUES
('Proveedor A'),
('Proveedor B'),
('Proveedor C'),
('Proveedor D'),
('Proveedor E'),
('Proveedor F'),
('Proveedor G'),
('Proveedor H'),
('Proveedor I'),
('Proveedor J');

INSERT INTO tb_marca (nom_marca, pai_marca) VALUES
('Marca Uno', 'Perú'),
('Marca Dos', 'Chile'),
('Marca Tres', 'Argentina'),
('Marca Cuatro', 'Brasil'),
('Marca Cinco', 'Ecuador'),
('Marca Seis', 'Colombia'),
('Marca Siete', 'México'),
('Marca Ocho', 'España'),
('Marca Nueve', 'Italia'),
('Marca Diez', 'Francia');

INSERT INTO tb_categoria (nom_cat) VALUES
('Electrónica'),
('Ropa'),
('Alimentos'),
('Juguetes'),
('Libros'),
('Muebles'),
('Deportes'),
('Belleza'),
('Herramientas'),
('Automotriz');

INSERT INTO tb_producto (nom_prod, des_prod, cod_cat, stock_prod, precio_compra, cod_prov, cod_marca) VALUES
('Monitor LG 24" FHD', 'Monitor IPS Full HD con 75Hz y FreeSync, perfecto para uso diario y gaming ligero.', 1, 30, 450.00, 2, 3), 
('Teclado Gamer Multimedia', 'Teclado de membrana con retroiluminación RGB de alta visibilidad, teclas multimedia dedicadas y diseño robusto.', 1, 50, 85.00, 1, 2),
('Mouse Inalámbrico Genius', 'Mouse óptico de 2.4GHz, diseño minimalista y sensor preciso. Ideal para oficina y uso general.', 1, 100, 45.00, 3, 4),
('Mando Inalámbrico Pro Red', 'Controlador de juegos Bluetooth compatible con PC y consolas, diseño ergonómico y gatillos de precisión.', 4, 40, 120.00, 1, 5),
('Audífonos TWS Baseus', 'Auriculares True Wireless con estuche de carga, conexión Bluetooth 5.0 y bajos potentes.', 1, 60, 90.00, 5, 6), 
('Webcam Full HD 1080p', 'Cámara web con micrófono incorporado, enfoque fijo y lente gran angular para videollamadas claras.', 1, 35, 110.00, 2, 7),
('Hub USB 3.0 4 Puertos', 'Expansor de puertos USB 3.0 con interruptores de encendido/apagado individuales para cada puerto.', 1, 80, 40.00, 4, 8),
('Soporte Brazo Hidráulico', 'Brazo de escritorio ajustable para monitores de 13 a 32 pulgadas. Mejora la ergonomía y libera espacio.', 1, 15, 150.00, 2, 8),
('Mousepad Gamer RGB XL', 'Alfombrilla extendida (900x400mm) con bordes iluminados y superficie de microfibra optimizada para sensores ópticos.', 1, 70, 65.00, 1, 2),
('Parlantes Estéreo 2.0', 'Altavoces pequeños con alimentación USB, ideal para complementar el audio de tu laptop o PC.', 1, 45, 55.00, 3, 9), 
('Teclado Mecánico Razer Chroma', 'Teclado mecánico de alto rendimiento con switches Razer Green, iluminación Chroma RGB y diseño resistente a salpicaduras.', 1, 28, 199.99, 1, 1), 
('Headset Gamer Logitech G', 'Audífonos con tecnología de sonido envolvente 7.1, micrófono plegable y conexión USB. Calidad de audio profesional.', 1, 35, 145.00, 5, 8), 
('Mando Neon USB para PC', 'Controlador estilo futurista con cable USB de alta velocidad. Compatible con Windows y Android.', 4, 40, 75.00, 1, 5),
('Monitor Curvo Samsung G8', 'Monitor Odyssey Neo G8 4K con tecnología Quantum Mini-LED y tasa de refresco ultra-rápida de 240Hz.', 1, 12, 1899.00, 2, 3),
('Kit Redragon S101-BA', 'Combo de teclado y mouse RGB, con 8 teclas multimedia dedicadas. Ideal para empezar en el gaming.', 1, 65, 95.00, 1, 1), 
('Mouse Logitech G502 HERO', 'Mouse con sensor HERO de 25K DPI, 11 botones programables y pesas ajustables. Máximo control en juegos.', 1, 42, 175.00, 3, 8), 
('Mouse Óptico LED (Económico)', 'Mouse óptico con diseño ambidiestro e iluminación LED. Conexión USB estándar.', 1, 70, 25.00, 1, 2),
('Teclado Mecánico XPG SUMMONER', 'Teclado Full Size con switches CHERRY MX RGB, teclas flotantes y aleación de aluminio.', 1, 20, 185.00, 1, 9),
('Teclado Razer Blackwidow V3', 'Modelo Blackwidow con teclas de doble inyección PBT, switches mecánicos y rollo digital multifunción.', 1, 25, 230.00, 1, 1);


select * from tb_categoria;
select * from tb_marca;
select * from tb_producto;
select * from tb_proveedor;
select * from tb_usuario;