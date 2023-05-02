create table statistics
(
    id           bigserial primary key,
    users_num    bigint,
    orders_num   bigint,
    products_num bigint
);

insert into statistics
values (1, 2, 0, 9);
