-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-05-2020 a las 20:28:34
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ika`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ventas` (IN `id1` INT, `cantidad1` INT)  BEGIN
  	DECLARE productoCantidad INT;
		 SET productoCantidad =
     (SELECT cantidad FROM productos
      WHERE id = id1);
    IF productoCantidad >= cantidad1 THEN
     UPDATE productos
     SET cantidad = productoCantidad-cantidad1
     WHERE id = id1;
    END IF;
  END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Marino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `idcompras` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `inversion` float DEFAULT NULL,
  `productos_id` int(11) NOT NULL,
  `productos_categorias_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `salario` float DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `precio_compra` float DEFAULT NULL,
  `precio_venta` float DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `categorias_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `productos` ADD `imagen` VARCHAR(75) NOT NULL AFTER `cantidad`;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio_compra`, `precio_venta`, `cantidad`, `categorias_id`) VALUES
(2, 'pez veta', 10, 20, 0, 1),
(10, 'hola', 7, 8, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `idVentas` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `ganancia` float DEFAULT NULL,
  `empleado_id` int(11) NOT NULL,
  `productos_id` int(11) NOT NULL,
  `productos_categorias_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`idcompras`,`productos_id`,`productos_categorias_id`),
  ADD KEY `fk_compras_productos1` (`productos_id`,`productos_categorias_id`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`,`categorias_id`),
  ADD KEY `fk_productos_categorias` (`categorias_id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`idVentas`,`empleado_id`,`productos_id`,`productos_categorias_id`),
  ADD KEY `fk_ventas_empleado1` (`empleado_id`),
  ADD KEY `fk_ventas_productos1` (`productos_id`,`productos_categorias_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `idcompras` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `idVentas` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `fk_compras_productos1` FOREIGN KEY (`productos_id`,`productos_categorias_id`) REFERENCES `productos` (`id`, `categorias_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_productos_categorias` FOREIGN KEY (`categorias_id`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_ventas_empleado1` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ventas_productos1` FOREIGN KEY (`productos_id`,`productos_categorias_id`) REFERENCES `productos` (`id`, `categorias_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--VIEWS
CREATE VIEW productos_view
 AS SELECT productos.id as id, productos.nombre as nombre, precio_compra, precio_venta, cantidad, imagen, categorias.nombre as categorias_id
 FROM productos INNER JOIN categorias ON categorias_id = categorias.id;

 CREATE VIEW procedimientos_view
  AS select sum(totalVenta) as venta, date(fecha) as dia from historial
  WHERE fecha >= DATE_SUB(NOW(),INTERVAL 7 DAY) group by dia;

  CREATE VIEW ventas_view
  AS select sum(totalVenta) as venta from historial WHERE fecha >= DATE_SUB(NOW(),INTERVAL 7 DAY);

  CREATE VIEW historial_view
  AS select * from historial WHERE fecha >= DATE_SUB(NOW(),INTERVAL 7 DAY);

  CREATE VIEW historial_trigger_view
  AS SELECT * FROM historial_inventario ORDER BY changedate DESC;

  CREATE VIEW categorias_view
  AS SELECT id, nombre FROM categorias;
