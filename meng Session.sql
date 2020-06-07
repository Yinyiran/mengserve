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

alter table banner change BanImgID BanImg varchar(255) not null;
alter table banner change BanType BanType int(1) default 1;
alter table banner auto_increment = 10000;
alter table banner add BanIntro varchar(200);

update banner set BanImg = "resource/img/2020-06-03/1591175135950.jpg"

select * from banner;
insert into banner (BanTargID,BanImg) values (123134,"resource/2020-06-03/1591175135950.jpg")