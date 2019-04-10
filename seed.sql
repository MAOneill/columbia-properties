insert into users
(first_name, last_name, email, password)
values
('Margaret','ONeill','margaret@oneillfish.com','password1'),
('Rob','ONeill','roneill@columbiaprop','password1'),
('Madeline','ONeill','maddie@oneillcrew.com','password1'),
('Eileen','Pickett','epickett@gmail.com','password1'),
('Carol','Jantzen','cmjantzen@srs.gov','password1'),
('Emily','Sasser','ess@gmail.com','password1'),
('Lady', 'Godiva', 'chocobsessed@hotmail.com', 'nakedtruth!'),
    ('Nicolas', 'Flamel', 'tomorrowneverdies@netscape.net', 'g3t570n3d'),
    ('Cruella', 'DeVille', 'puppypower@yahoo.com', 'SpotsSpotsSpots'),
    ('Lennie', 'Small', 'bunnybuddy@outlook.com', 'nonAlgern0n');

insert into todo
( user_id, task, complete)
values
(2,'Clean House',false),
(6,'Store Furs',false),
(3,'Wash car',false),
(3,'remove moldy towels from bedroom',false),
(5,'remove boots',false),
(1,'laundry',true),
(1,'laundry',false),
(1,'xxxxlaundry',default),
(1,'xxxxlaundry',default),
(1,'laundry',default),
(1,'laundry',false),
(1,'more laundry',false);

