create table categories
(
    id   bigserial primary key,
    name varchar(255)
);

create table products
(
    id          bigserial primary key,
    description varchar(255),
    name        varchar(255),
    order_num   integer,
    price       double precision,
    color       varchar(255),
    storage_num integer,
    category_id bigint
        constraint FK_products_category_id references categories (id)
);

create table materials
(
    id   bigserial primary key,
    name varchar(255)
);

create table products_materials
(
    product_id  bigint not null
        constraint FK_products_materials_product_id references products (id),
    material_id bigint not null
        constraint FK_products_materials_material_id references materials (id)
);

create table user_accounts
(
    id       bigserial primary key,
    name     varchar(255),
    surname  varchar(255),
    email    varchar(255),
    password varchar(255),
    role     varchar(255)
);

create table orders
(
    id              bigserial primary key,
    order_status    varchar(255),
    address         varchar(255),
    total_price     double precision,
    user_account_id bigint
        constraint FK_orders_user_account_id references user_accounts (id)
);

create table orders_products
(
    order_id   bigint not null
        constraint FK_orders_products_order_id references orders (id),
    product_id bigint not null
        constraint FK_orders_products_product_id references products (id)
);
