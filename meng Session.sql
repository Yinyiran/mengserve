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

select * from product\

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

insert into article (ArtTitle, ArtIntro, ArtContent, ArtStar)
values
  (
    "文章测试，功能比较多？试试吧",
    "可以写公司简介 ， 联系我们 ， 客户评价等",
    "文章测试 ， 功能比较多 ？ 试试吧,可以写公司简介 ， 联系我们 ， 客户评价等，文章测试 ， 功能比较多 ？ 试试吧,
    可以写公司简介 ， 联系我们 ， 客户评价等文章测试 ， 功能比较多 ？ 试试吧,
    可以写公司简介 ， 联系我们 ， 客户评价等文章测试 ， 功能比较多 ？ 试试吧,
    可以写公司简介 ， 联系我们 ， 客户评价等文章测试 ， 功能比较多 ？ 试试吧,
    可以写公司简介 ， 联系我们 ， 客户评价等文章测试 ， 功能比较多 ？ 试试吧,
    可以写公司简介 ， 联系我们 ， 客户评价等文章测试 ， 功能比较多 ？ 试试吧,
    可以写公司简介 ， 联系我们 ， 客户评价等文章测试 ， 功能比较多 ？ 试试吧,
    可以写公司简介 ， 联系我们 ， 客户评价等文章测试 ， 功能比较多 ？ 试试吧,
    可以写公司简介 ， 联系我们 ， 客户评价等",
    1
  )

  select * from article
