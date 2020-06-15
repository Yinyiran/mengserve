desc classify;
select * from Classify

create table product (
  ProdID int(10) not null PRIMARY KEY,
  ProdName varchar(100) not null,
  Classify int(10),
  ProdIntro text,
  Property text,
  ProdImg long
)
alter table product auto_increment = 10000;

alter table product change ProdID ProdID int(10) auto_increment

alter table product add ProdImg long;

select * from product

insert into product (ProdName,Classify,ProdIntro,Property,ProdImg) values (
  "冰桶",
  1000,
  "保温啤酒桶",
  "lall",
  "img"
)

desc product



create table article (
  ArtID int(10) not null auto_increment primary key,
  ArtTitle varchar(300) not null,
  ArtIntro text,
  ArtContent longtext,
  ArtStar tinyint(1)
)
alter table article auto_increment = 10000;

alter table article add ArtCover varchar(100);

desc article

select * from article;

desc banner;

alter table banner modify BanImg varchar(255) not null;
alter table banner change BanType BanType int(1) default 1;
alter table banner auto_increment = 10000;
alter table banner drop BanIntro ;

update banner set BanImg = "resource/img/2020-06-03/1591175135950.jpg"

select * from banner;
insert into banner (BanTargID,BanImg) values (123134,"resource/img/2020-06-03/1591175135950.jpg")

create table file (
  FileID int(10) not null auto_increment primary key,
  FileHash varchar(100) not null,
  FilePath varchar(100) not null
)

alter table file auto_increment = 10000;

desc file

select * from file

alter table compinfo modify CompLogo long not null;