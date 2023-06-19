-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2023 a las 14:53:43
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `secundaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `idAdmin` int(11) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Contraseña` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`idAdmin`, `Correo`, `Contraseña`) VALUES
(1, 'charlymj21@gmail.com', 1234567890);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `Expediente` int(6) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Grado` varchar(100) NOT NULL,
  `Grupo` varchar(100) NOT NULL,
  `Telefono` bigint(10) NOT NULL,
  `FechaNac` date NOT NULL,
  `Domicilio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`Expediente`, `Nombre`, `Apellidos`, `Grado`, `Grupo`, `Telefono`, `FechaNac`, `Domicilio`) VALUES
(300033, 'Ana', 'Rodríguez González', '1', 'Matutino', 5512345678, '2011-01-10', 'Calle Juárez #123, Ciudad de México'),
(300036, 'Andrés', 'Martínez Ramírez', '1', 'Matutino', 5512345678, '2011-08-08', 'Avenida Reforma #321, Guadalajara');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `Expediente` int(6) NOT NULL,
  `uno` int(2) NOT NULL,
  `dos` int(2) NOT NULL,
  `tres` int(2) NOT NULL,
  `cuatro` int(2) NOT NULL,
  `cinco` int(2) NOT NULL,
  `seis` int(2) NOT NULL,
  `siete` int(2) NOT NULL,
  `ocho` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `Expediente` int(6) NOT NULL,
  `Contraseña` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`Expediente`, `Contraseña`) VALUES
(300033, '1271b1b707'),
(300036, '3945e228d0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datosm`
--

CREATE TABLE `datosm` (
  `idM` int(11) NOT NULL,
  `Expediente` int(6) NOT NULL,
  `Contraseña` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datosm`
--

INSERT INTO `datosm` (`idM`, `Expediente`, `Contraseña`) VALUES
(4, 600512, 'b16fbf70');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maestros`
--

CREATE TABLE `maestros` (
  `Expediente` int(6) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Telefono` int(10) NOT NULL,
  `FechaNac` date NOT NULL,
  `Domicilio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `maestros`
--

INSERT INTO `maestros` (`Expediente`, `Nombre`, `Apellidos`, `Telefono`, `FechaNac`, `Domicilio`) VALUES
(600512, 'Sebastián Alberto', 'Alarcón Béjar', 2147483647, '2000-10-10', 'Juriquilla');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMateria` int(6) NOT NULL,
  `Grado` int(1) NOT NULL,
  `Nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`idMateria`, `Grado`, `Nombre`) VALUES
(1, 1, 'Matemáticas'),
(2, 1, 'Lengua y Literatura'),
(3, 1, 'Biología'),
(4, 1, 'Historia'),
(5, 1, 'Inglés'),
(6, 1, 'Educación Física'),
(7, 1, 'Tecnología'),
(8, 1, 'Artes'),
(9, 1, 'Formación Cívica y Ética'),
(10, 1, 'Tutoría'),
(11, 2, 'Matemáticas II'),
(14, 2, 'Lengua y Literatura II\r\n'),
(15, 2, 'Química'),
(16, 2, 'Geografía'),
(17, 2, 'Inglés II'),
(18, 2, 'Educación Física II'),
(19, 2, 'Tecnología II'),
(20, 2, 'Artes II'),
(21, 2, 'Formación Cívica y Ética II'),
(22, 2, 'Tutoría II'),
(23, 3, 'Matemáticas III'),
(24, 3, 'Lengua y Literatura III'),
(25, 3, 'Física'),
(26, 3, 'Civismo'),
(27, 3, 'Inglés III'),
(28, 3, 'Educación Física III'),
(29, 3, 'Tecnología III'),
(30, 3, 'Artes III'),
(31, 3, 'Formación Cívica y Ética III'),
(32, 3, 'Tutoría III');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`Expediente`);

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`Expediente`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`Expediente`);

--
-- Indices de la tabla `datosm`
--
ALTER TABLE `datosm`
  ADD PRIMARY KEY (`idM`);

--
-- Indices de la tabla `maestros`
--
ALTER TABLE `maestros`
  ADD PRIMARY KEY (`Expediente`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`idMateria`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `Expediente` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=300037;

--
-- AUTO_INCREMENT de la tabla `datos`
--
ALTER TABLE `datos`
  MODIFY `Expediente` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=300037;

--
-- AUTO_INCREMENT de la tabla `datosm`
--
ALTER TABLE `datosm`
  MODIFY `idM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `maestros`
--
ALTER TABLE `maestros`
  MODIFY `Expediente` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=600513;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `idMateria` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
