
CREATE DATABASE IF NOT EXISTS wsbooks;

USE wsbooks;

CREATE TABLE IF NOT EXISTS books 
(
	id 			int 		 NOT NULL AUTO_INCREMENT,
	title 		varchar(100) NOT NULL,
	author		varchar(100) NOT NULL, 
	genre 		varchar(20)  NOT NULL,
    publishdate date		 NOT NULL, 	
	description varchar(255) NOT NULL,
	price       decimal(6,2) NOT NULL,
	PRIMARY KEY (id)
 ); 

INSERT IGNORE INTO books (title, author, genre, publishdate, description, price) VALUES ("Midnight Rain", "Ralls, Kim", "Fantasy", "2000-12-15", "A former architect battles an evil sorceress.", 14.95);
INSERT IGNORE INTO books (title, author, genre, publishdate, description, price) VALUES ("Maeve Ascendant", "Corets, Eva","Fantasy", "2000-11-17", "After the collapse of a nanotechnology society, the young survivors lay the foundation for a new society.", 12.95);
INSERT IGNORE INTO books (title, author, genre, publishdate, description, price) VALUES ("The Sundered Grail", "Corets, Eva", "Fantasy", "2001-9-10", "The two daughters of Maeve battle for control of England.", 12.95);
INSERT IGNORE INTO books (title, author, genre, publishdate, description, price) VALUES ("Lover Birds", "Randall, Cynthia", "Romance", "2000-9-2", "When Carla meets Paul at an ornithology conference, tempers fly.", 7.99);
INSERT IGNORE INTO books (title, author, genre, publishdate, description, price) VALUES ("Splish Splash", "Thurman, Paula", "Romance", "2000-11-2", "A deep sea diver finds true love 20,000 leagues beneath the sea.", 6.99);
      
