create table article (
  ArtID int(10) not null auto_increment primary key,
  ArtTitle varchar(300) not null,
  ArtIntro text,
  ArtContent longtext,
  ArtStar tinyint(1)
)
alter table article auto_increment = 10000;
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