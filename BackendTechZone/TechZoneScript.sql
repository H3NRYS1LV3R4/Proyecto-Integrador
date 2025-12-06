
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
    monto_compra decimal(5,2),
    mpago varchar(10),
    cod_usu int -- ya no hay cod_adm
);

create table tb_detalle_compra (
    cod_detalle int primary key auto_increment,
    cod_compra int,
    cod_prod int,
    cantidad int,
    precio_unitario decimal(5,2) 
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
('Monitor LG 24" FHD', 'Monitor LED IPS con resolución 1920x1080, tasa de refresco 75Hz y tecnología FreeSync para imagen fluida.', 1, 30, 450.00, 2, 3),
('Teclado Gamer Multimedia', 'Teclado de membrana con retroiluminación RGB, teclas multimedia dedicadas y diseño ergonómico.', 1, 50, 85.00, 1, 2),
('Mouse Inalámbrico Genius', 'Ratón óptico inalámbrico de 2.4GHz, diseño ambidiestro cómodo y batería de larga duración.', 1, 100, 45.00, 3, 4),
('Mando Inalámbrico Pro Red', 'Controlador de juegos Bluetooth compatible con PC y consolas, vibración dual y panel táctil.', 4, 40, 120.00, 1, 5),
('Audífonos TWS Baseus', 'Auriculares True Wireless con estuche de carga, conexión Bluetooth 5.0 y sonido estéreo de alta fidelidad.', 1, 60, 90.00, 5, 6),
('Webcam HD 1080p', 'Cámara web de alta definición con micrófono incorporado y corrección de luz, ideal para streaming y videollamadas.', 1, 35, 110.00, 2, 7),
('Hub USB 3.0 4 Puertos', 'Expansor de puertos USB de alta velocidad con interruptores individuales e indicadores LED para cada conexión.', 1, 80, 40.00, 4, 8),
('Soporte Brazo Hidráulico', 'Brazo articulado para monitor de escritorio, montaje VESA, soporta pantallas de 17 a 32 pulgadas.', 1, 20, 150.00, 2, 8),
('Mousepad Gamer RGB XL', 'Alfombrilla extendida para teclado y mouse con bordes iluminados LED y superficie de microfibra optimizada.', 1, 70, 65.00, 1, 2),
('Parlantes Estéreo 2.0', 'Sistema de altavoces compactos con alimentación USB, control de volumen y entrada de 3.5mm.', 1, 45, 55.00, 3, 9),
('Teclado Mecánico', 'Teclado RGB con switches Blue para una experiencia de escritura y gaming precisa.', 1, 50, 150.00, 1, 1),
('Mouse Gamer', 'Mouse con sensor de alta precisión para un rendimiento superior en gaming.', 1, 50, 120.00, 1, 2),
('Monitor 27"', 'Monitor de 27 pulgadas con frecuencia de actualización de 144Hz, ideal para gaming.', 1, 30, 800.00, 2, 3),
('Monitor 32"', 'Monitor de 32 pulgadas con resolución 4K y tecnología HDR.', 1, 20, 1200.00, 2, 3),
('Teclado Mecánico Avanzado', 'Teclado mecánico con switches rojos para una experiencia ultra silenciosa.', 1, 45, 250.00, 1, 4),
('Mouse Ultra Pro', 'Mouse de gama alta diseñado para precisión y rendimiento.', 1, 60, 300.00, 3, 4),
('Disco SSD 512GB', 'Disco sólido de alto rendimiento para almacenamiento rápido.', 1, 100, 400.00, 4, 5),
('Audífonos Gaming RGB', 'Audífonos para gaming con iluminación RGB personalizable.', 1, 80, 180.00, 5, 6),
('Fuente de Poder 650W', 'Fuente de poder eficiente y silenciosa.', 1, 25, 300.00, 6, 7);



select * from tb_categoria;
select * from tb_marca;
select * from tb_producto;
select * from tb_proveedor;
select * from tb_usuario;