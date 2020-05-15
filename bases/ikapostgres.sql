CREATE ROLE ika WITH LOGIN PASSWORD '1234';
ALTER ROLE ika WITH SUPERUSER;
CREATE DATABASE ika WITH OWNER ika;
CREATE TABLE empleado (id serial primary key, nombre varchar(45), apellido varchar(45), salario float);
INSERT INTO empleado (nombre, apellido, salario) VALUES ('Ferchie', 'Montaño', 200);