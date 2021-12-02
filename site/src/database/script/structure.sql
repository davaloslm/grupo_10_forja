-- MySQL Script generated by MySQL Workbench
-- Tue Nov 30 16:33:10 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema forja_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `forja_db` ;

-- -----------------------------------------------------
-- Schema forja_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `forja_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `forja_db` ;

-- -----------------------------------------------------
-- Table `forja_db`.`productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`productos` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(1000) NOT NULL,
  `precio` DECIMAL(10,0) NOT NULL,
  `descuento` INT NULL DEFAULT NULL,
  `envio` TINYINT(1) NULL DEFAULT NULL,
  `marca` VARCHAR(255) NOT NULL,
  `stock` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 49
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forja_db`.`categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`categorias` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `productoId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productoId` (`productoId` ASC) VISIBLE,
  CONSTRAINT `categorias_ibfk_1`
    FOREIGN KEY (`productoId`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forja_db`.`colors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`colors` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`colors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `productoId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productoId` (`productoId` ASC) VISIBLE,
  CONSTRAINT `colors_ibfk_1`
    FOREIGN KEY (`productoId`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forja_db`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `userName` VARCHAR(50) NOT NULL,
  `fechaDeNacimiento` DATETIME NOT NULL,
  `subscripcionForja` TINYINT(1) NULL DEFAULT NULL,
  `admin` TINYINT(1) NOT NULL,
  `telefono` BIGINT NULL DEFAULT NULL,
  `imagen` VARCHAR(100) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forja_db`.`direccions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`direccions` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`direccions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(100) NOT NULL,
  `numero` INT NOT NULL,
  `localidad` VARCHAR(100) NOT NULL,
  `provincia` VARCHAR(100) NOT NULL,
  `codigoPostal` INT NOT NULL,
  `departamento` VARCHAR(45) NULL DEFAULT NULL,
  `usuarioId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `usuarioId` (`usuarioId` ASC) VISIBLE,
  CONSTRAINT `direccions_ibfk_1`
    FOREIGN KEY (`usuarioId`)
    REFERENCES `forja_db`.`usuarios` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forja_db`.`imagens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`imagens` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`imagens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `productoId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productoId` (`productoId` ASC) VISIBLE,
  CONSTRAINT `imagens_ibfk_1`
    FOREIGN KEY (`productoId`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 98
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `forja_db`.`sequelizemeta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`sequelizemeta` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`sequelizemeta` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `forja_db`.`talles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`talles` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`talles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `productoId` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productoId` (`productoId` ASC) VISIBLE,
  CONSTRAINT `talles_ibfk_1`
    FOREIGN KEY (`productoId`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 26
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;