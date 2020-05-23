create table product (
  ProdID int(10) not null PRIMARY KEY,
  ProdName varchar(100) not null,
  Classify int(10),
  ProdIntro text,
  Property text
)
alter table product auto_increment = 10000;

select * from product
