-- MySQL Script generated by MySQL Workbench
-- Sun Nov 14 23:35:33 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema forja_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `forja_db` ;

-- -----------------------------------------------------
-- Schema forja_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `forja_db` DEFAULT CHARACTER SET utf8 ;
USE `forja_db` ;

-- -----------------------------------------------------
-- Table `forja_db`.`productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`productos` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`productos` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(75) NOT NULL,
  `descripcion` LONGTEXT NOT NULL,
  `precio` DECIMAL NOT NULL,
  `descuento` TINYINT(2) NULL,
  `envio` TINYINT(1) NULL,
  `marca` VARCHAR(50) NOT NULL,
  `stock` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`categorias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`categorias` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`talles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`talles` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`talles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  `contraseña` VARCHAR(100) NOT NULL,
  `userName` VARCHAR(50) NOT NULL,
  `fecha_de_nacimiento` DATE NOT NULL,
  `subscripcion_forja` TINYINT(1) NULL,
  `telefono` INT NULL,
  `imagen` LONGTEXT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`imagenes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`imagenes` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`imagenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` LONGTEXT NOT NULL,
  `producto_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_producto_id_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `FK_producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`facturas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`facturas` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`facturas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `usuario_id` INT NOT NULL,
  `total` DECIMAL NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `FK_usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `forja_db`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`medios_de_pago`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`medios_de_pago` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`medios_de_pago` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`ventas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`ventas` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `producto_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `medio_de_pago_id` INT NOT NULL,
  `factura_id` INT NOT NULL,
  `total` DECIMAL NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_factura_id_idx` (`factura_id` ASC) VISIBLE,
  INDEX `FK_ventas_id_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `FK_medio_de_pago_id_idx` (`medio_de_pago_id` ASC) VISIBLE,
  INDEX `FK_producto_id_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `FK_factura_id`
    FOREIGN KEY (`factura_id`)
    REFERENCES `forja_db`.`facturas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_ventas_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `forja_db`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_pago_id`
    FOREIGN KEY (`medio_de_pago_id`)
    REFERENCES `forja_db`.`medios_de_pago` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`colores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`colores` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`colores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`ordenes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`ordenes` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`ordenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL,
  `usuario_id` INT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `FK_usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `forja_db`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`carritos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`carritos` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`carritos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NULL,
  `producto_id` INT NULL,
  `cantidad` INT NOT NULL,
  `orden_id` INT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `FK_producto_id_idx` (`producto_id` ASC) VISIBLE,
  INDEX `FK_orden_id_idx` (`orden_id` ASC) VISIBLE,
  CONSTRAINT `FK_usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `forja_db`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_orden_id`
    FOREIGN KEY (`orden_id`)
    REFERENCES `forja_db`.`ordenes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`direcciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`direcciones` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`direcciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `calle` VARCHAR(100) NOT NULL,
  `numero` INT NOT NULL,
  `localidad` VARCHAR(100) NOT NULL,
  `provincia` VARCHAR(100) NOT NULL,
  `codigo_postal` INT NOT NULL,
  `departamento` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`producto_categoria`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`producto_categoria` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`producto_categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_producto_id_idx` (`producto_id` ASC) VISIBLE,
  INDEX `FK_categoria_id_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `FK_producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `forja_db`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`producto_talle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`producto_talle` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`producto_talle` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `talle_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_producto_id_idx` (`producto_id` ASC) VISIBLE,
  INDEX `FK_talle_id_idx` (`talle_id` ASC) VISIBLE,
  CONSTRAINT `FK_producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_talle_id`
    FOREIGN KEY (`talle_id`)
    REFERENCES `forja_db`.`talles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`producto_color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`producto_color` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`producto_color` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `color_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_producto_id_idx` (`producto_id` ASC) VISIBLE,
  INDEX `FK_color_id_idx` (`color_id` ASC) VISIBLE,
  CONSTRAINT `FK_producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `forja_db`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_color_id`
    FOREIGN KEY (`color_id`)
    REFERENCES `forja_db`.`colores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `forja_db`.`usuario_direccion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `forja_db`.`usuario_direccion` ;

CREATE TABLE IF NOT EXISTS `forja_db`.`usuario_direccion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `direccion_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `FK_direccion_id_idx` (`direccion_id` ASC) VISIBLE,
  CONSTRAINT `FK_usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `forja_db`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_direccion_id`
    FOREIGN KEY (`direccion_id`)
    REFERENCES `forja_db`.`direcciones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
