create table users (
        id serial primary key,
        first_name varchar(100),
        last_name varchar(100),
        email varchar(100),
        password varchar(500)   --store hashes only
);

create table todo (
    id serial primary key,
    user_id integer references users(id),
    task varchar(200),
    complete boolean DEFAULT false

);