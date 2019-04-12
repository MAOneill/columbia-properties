create table dept (
    id serial primary key,
    name varchar(100)
);

create table employee (
        id serial primary key,
        name varchar(150),
        title varchar(50),
        email varchar(100),
        phone varchar(20),
        description text,
        department_id integer references dept(id)
);

create table users (
    id serial primary key,
    name varchar(100) UNIQUE,
    login_id varchar(50),
    password varchar(300)
);

create table property (
  id serial primary key,
  property_name varchar(150),
  street_address varchar(150),
  county varchar(50),
  city varchar(50),
  state varchar(50),
  zipcode varchar(10),
  squarefeet integer,
  description text,
  directions text,
  contact_id integer references employee(id),
  type varchar(40),
  show_mp boolean DEFAULT true,
  show_di boolean DEFAULT false,
  show_pd boolean DEFAULT false,
  pd_description text,
  year_opened integer,
  major_tenants varchar(100),
  mapx integer,
  mapy integer  
);


create table photo (
    id serial primary key,
    prop_id integer references property(id),
    url varchar(500),
    photo_name varchar(200)
);

alter table property
add photo integer references photo(id);


create table media (
    id serial primary key,
    prop_id integer references property(id),
    url varchar(500),
    file_title varchar(250),
    display boolean DEFAULT false

);
