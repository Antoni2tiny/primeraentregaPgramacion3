-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-09-2024 a las 17:02:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_reclamo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados_reclamo`
--

CREATE TABLE `estados_reclamo` (
  `id_estado_reclamo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficinas`
--

CREATE TABLE `oficinas` (
  `id_oficina` int(11) NOT NULL,
  `nombre_oficina` varchar(256) NOT NULL,
  `id_tipo_reclamo` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reclamos`
--

CREATE TABLE `reclamos` (
  `id_reclamo` int(11) NOT NULL,
  `asunto` varchar(256) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_finalizado` datetime DEFAULT NULL,
  `fecha_cancelado` datetime DEFAULT NULL,
  `id_estado_reclamo` int(11) NOT NULL,
  `id_tipo_reclamo` int(11) NOT NULL,
  `id_usuario_creador` int(11) NOT NULL,
  `id_usuario_finalizador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_reclamo`
--

CREATE TABLE `tipos_reclamo` (
  `id_tipo_reclamo` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_usuario`
--

CREATE TABLE `tipos_usuario` (
  `id_tipo_usuario` int(11) NOT NULL,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(256) NOT NULL,
  `apellido` varchar(256) NOT NULL,
  `correo_electronico` varchar(256) NOT NULL,
  `contrasena` varchar(256) NOT NULL,
  `id_tipo_usuario` int(11) NOT NULL,
  `imagen` varchar(256) DEFAULT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_oficinas`
--

CREATE TABLE `usuarios_oficinas` (
  `id_usuario_oficina` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_oficina` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados_reclamo`
--
ALTER TABLE `estados_reclamo`
  ADD PRIMARY KEY (`id_estado_reclamo`),
  ADD UNIQUE KEY `id_estado_reclamo` (`id_estado_reclamo`);

--
-- Indices de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD PRIMARY KEY (`id_oficina`),
  ADD UNIQUE KEY `id_oficina` (`id_oficina`),
  ADD KEY `id_tipo_reclamo` (`id_tipo_reclamo`);

--
-- Indices de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD PRIMARY KEY (`id_reclamo`),
  ADD UNIQUE KEY `id_reclamo` (`id_reclamo`),
  ADD KEY `id_estado_reclamo` (`id_estado_reclamo`),
  ADD KEY `id_tipo_reclamo` (`id_tipo_reclamo`),
  ADD KEY `id_usuario_creador` (`id_usuario_creador`),
  ADD KEY `id_usuario_finalizador` (`id_usuario_finalizador`);

--
-- Indices de la tabla `tipos_reclamo`
--
ALTER TABLE `tipos_reclamo`
  ADD PRIMARY KEY (`id_tipo_reclamo`),
  ADD UNIQUE KEY `id_tipo_reclamo` (`id_tipo_reclamo`);

--
-- Indices de la tabla `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  ADD PRIMARY KEY (`id_tipo_usuario`),
  ADD UNIQUE KEY `id_tipo_usuario` (`id_tipo_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`),
  ADD KEY `id_tipo_usuario` (`id_tipo_usuario`);

--
-- Indices de la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  ADD PRIMARY KEY (`id_usuario_oficina`),
  ADD UNIQUE KEY `id_usuario_oficina` (`id_usuario_oficina`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_oficina` (`id_oficina`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados_reclamo`
--
ALTER TABLE `estados_reclamo`
  MODIFY `id_estado_reclamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `oficinas`
--
ALTER TABLE `oficinas`
  MODIFY `id_oficina` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reclamos`
--
ALTER TABLE `reclamos`
  MODIFY `id_reclamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_reclamo`
--
ALTER TABLE `tipos_reclamo`
  MODIFY `id_tipo_reclamo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  MODIFY `id_tipo_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  MODIFY `id_usuario_oficina` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `oficinas`
--
ALTER TABLE `oficinas`
  ADD CONSTRAINT `oficinas_ibfk_1` FOREIGN KEY (`id_tipo_reclamo`) REFERENCES `tipos_reclamo` (`id_tipo_reclamo`);

--
-- Filtros para la tabla `reclamos`
--
ALTER TABLE `reclamos`
  ADD CONSTRAINT `reclamos_ibfk_1` FOREIGN KEY (`id_estado_reclamo`) REFERENCES `estados_reclamo` (`id_estado_reclamo`),
  ADD CONSTRAINT `reclamos_ibfk_2` FOREIGN KEY (`id_tipo_reclamo`) REFERENCES `tipos_reclamo` (`id_tipo_reclamo`),
  ADD CONSTRAINT `reclamos_ibfk_3` FOREIGN KEY (`id_usuario_creador`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `reclamos_ibfk_4` FOREIGN KEY (`id_usuario_finalizador`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipos_usuario` (`id_tipo_usuario`);

--
-- Filtros para la tabla `usuarios_oficinas`
--
ALTER TABLE `usuarios_oficinas`
  ADD CONSTRAINT `usuarios_oficinas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `usuarios_oficinas_ibfk_2` FOREIGN KEY (`id_oficina`) REFERENCES `oficinas` (`id_oficina`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
