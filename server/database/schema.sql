create database db_cubetime;
use db_cubetime;

create table if not exists users(
    id int primary key auto_increment,
    name varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(150) not null
);