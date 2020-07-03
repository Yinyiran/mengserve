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

alter table product change ProdImg ProdImg long;
alter table product change ProdContent ProdContent LONGTEXT;
alter table product add ProdStar tinyint(1);

select * from product

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
alter table article change ArtCover ArtCover text;
alter table article change ArtContent ArtContent LONGTEXT;

desc article

select * from article;

desc banner;

alter table banner modify BanImg varchar(255) not null;
alter table banner change BanType BanType int(1) default 1;
alter table banner auto_increment = 10000;
alter table banner drop BanIntro ;
alter table banner modify BanType int(1) not null ;
alter table banner add SortID int(2) default 99 ;

update banner set BanType = 2 where banid in (10009,10011)
update banner set BanType = 1 where banid in (10010)

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

desc article

alter table article change CreateTime CreateTime DATETIME not null default  CURRENT_TIMESTAMP
alter table article add UpdateTime datetime NOT NULL DEFAULT DATETIME ON UPDATE CURRENT_TIMESTAMP


desc compinfo

alter table compinfo add AboutID int(20);

create table sku (
  SkuID int(20) not null auto_increment primary key,
  ProdID int(20) not null,
  IsMain int(1) not null,
  SkuImg long not null,
  SkuProps long not null
)

desc sku