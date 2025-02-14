----------------------------------
---- create TblCategory
----------------------------------
drop table if exists TblCategory;
Create table TblCategory (
	Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	CategoryName varchar(40),
	Colour varchar(6)
);

----------------------------------
---- create TblBudgetItem
----------------------------------
drop table if exists TblBudgetItem;
Create table TblBudgetItem (
	Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	CategoryId int references TblCategory(Id),
	Amount int,
	EffectiveDate date,
	IsYearly int
);

----------------------------------
---- create TblTransaction
----------------------------------
drop table if exists TblTransaction;
Create table TblTransaction (
	Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	[Date] date NOT NULL,
	Amount int NOT NULL,
	Memo varchar(200),
	CategoryId int references TblCategory(id)
);

----------------------------------
---- create TblImportFileFormat
----------------------------------
drop table if exists TblImportFileFormat;
Create table TblImportFileFormat (
	Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	ImportFileFormatName varchar(100),
	DateKey varchar(100),
	MemoFormat varchar(100),
	AmountKey varchar(100),
	InvertAmounts int,
	HeaderLines int,
	[Delimiter] varchar(1)
);

----------------------------------
---- create TblDefaultCategorization
----------------------------------
drop table if exists TblDefaultCategorization;
Create table TblDefaultCategorization (
	Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	Memo varchar(200),
	CategoryId int references TblCategory(id)
);