drop database if exists sicaf;
create database sicaf;

create type letter_sizes as enum ('Grande','Mediana','Pequeña');
create type discount_types as enum('Descuento por rol','Descuento por total de la compra','Descuento por producto','Descuento por categoria','Descuento por cantidad de productos');
create type order_types as enum('Presencial','En linea');
create type order_status as enum('Pendiente','En preparacion','Completada','Cancelada');
create type payment_methods as enum('Efectivo','Tarjeta de credito','Tarjeta de debito');

create table if not exists discounts(
    id serial primary key,
    type discount_types not null,
    description varchar(250) not null,
    percentage numeric not null,
    start_date date,
    end_date date,
    order_total numeric,
    products_number int,
    status boolean not null default true,
    image text,
    created_at timestamp not null default now()
);

create table if not exists roles(
    id serial primary key,
    name varchar(20) not null,
    discount_id int,
    status boolean not null default true,
    created_at timestamp not null default now(),
    constraint fk_role_discount foreign key (discount_id) references discounts(id)
);

create table if not exists addresses(
    id serial primary key,
    street varchar(60) not null,
    settlement varchar(60) not null,
    external_number int,
    internal_number int,
    city varchar(80) not null,
    state varchar(80) not null,
    postal_code varchar(5) not null,
    country varchar(60) not null,
    created_at timestamp not null default now()
);

create table if not exists users(
    id serial primary key,
    email varchar(40) not null,
    password text not null,
    role_id int not null,
    dark_theme boolean not null default false,
    letter_size letter_sizes not null default 'Mediana',
    reset_token text,
    status boolean not null default true,
    created_at timestamp not null default now(),
    constraint fk_user_role foreign key (role_id) references roles(id)
);

create table if not exists people(
    id serial primary key,
    user_id int not null,
    name varchar(60) not null,
    lastname varchar(60) not null,
    gender char not null,
    birthday date,
    phone_number1 varchar(10) not null,
    phone_number2 varchar(10),
    address_id int not null,
    notification_preference boolean not null default true,
    shopping_cart json,
    created_at timestamp not null default now(),
    constraint fk_person_user foreign key (user_id) references users(id),
    constraint fk_person_address foreign key (address_id) references addresses(id)
);

create table if not exists providers(
    id serial primary key,
    name varchar(80) not null,
    contact_name varchar(60),
    contact_lastname varchar(60),
    phone_number1 varchar(10) not null,
    phone_number2 varchar(10),
    email varchar(40) not null,
    address_id int not null,
    ingredient varchar(40),
    notes varchar(150),
    status boolean not null default true,
    created_at timestamp not null default now(),
    constraint fk_provider_address foreign key (address_id) references addresses(id)
);

create table if not exists categories(
    id serial primary key,
    name varchar(20) not null,
    status boolean not null default true,
    created_at timestamp not null default now()
);

create table if not exists products(
    id serial primary key,
    name varchar(40) not null,
    description varchar(250) not null,
    image text not null,
    price numeric not null,
    stock int not null,
    category_id int not null,
    discount_id int,
    provider_id int,
    status boolean not null default true,
    created_at timestamp not null default now(),
    constraint fk_product_category foreign key (category_id) references categories(id),
    constraint fk_product_discount foreign key (discount_id) references discounts(id),
    constraint fk_product_provider foreign key (provider_id) references  providers(id)
);

create table if not exists orders(
    id serial primary key,
    type order_types not null,
    employee_id int,
    client_id int not null,
    products_sold int not null,
    subtotal numeric not null,
    payment_method payment_methods not null,
    discount_id int,
    total numeric not null,
    status order_status not null,
    send_receipt boolean not null,
    comments varchar(150),
    created_at timestamp not null default now(),
    constraint fk_order_employee foreign key (employee_id) references users(id),
    constraint fk_order_client foreign key (client_id) references users(id),
    constraint fk_order_discount foreign key (discount_id) references discounts(id)
);

create table if not exists order_details(
    id serial primary key,
    order_id int not null,
    product_id int not null,
    products_sold int not null,
    discount_id int,
    subtotal numeric not null,
    total numeric not null,
    created_at timestamp not null default now(),
    constraint fk_orderDetail_order foreign key (order_id) references orders(id),
    constraint fk_orderDetail_product foreign key (product_id) references products(id),
    constraint fk_orderDetail_discount foreign key (discount_id) references discounts(id)
);

---- Agregar ---- 05/12/2023

insert into categories(name) values ('Galletas'),('Pasteles'),('Cupcakes'),('Panes'), ('Bebidas calientes'),('Bebidas frias');

alter table products alter column stock drop not null;


CREATE OR REPLACE FUNCTION update_product_status() returns trigger as $$
DECLARE
    product_id integer;
BEGIN
  product_id := new.id;

  if new.stock != old.stock then
        if new.stock = 0 then
            update products set status = false where id = product_id;
        end if;
        if new.stock > 0 then
            update products set status = true where id = product_id;
        end if;
  end if;

  RETURN new;
END;
$$ LANGUAGE plpgsql;

create trigger update_product_status after insert or update on products for each row execute procedure update_product_status();


alter table people drop column notification_preference;

insert into roles (name) values ('Administrador'),('Empleado'),('Cliente');

alter table people alter column shopping_cart set default '[]';