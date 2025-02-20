----------------------------------
---- create TblCategory
----------------------------------
drop table if exists TblCategory;
Create table TblCategory (
	[Id] int PRIMARY KEY CLUSTERED IDENTITY(1,1) NOT NULL,
	[CategoryName] varchar(40) NOT NULL,
	[Colour] varchar(25) NOT NULL
);

----------------------------------
---- create TblBudgetItem
----------------------------------
drop table if exists TblBudgetItem;
Create table TblBudgetItem (
	[Id] int PRIMARY KEY CLUSTERED IDENTITY(1,1) NOT NULL,
	[CategoryId] int references TblCategory(Id) NOT NULL,
	[Amount] int NOT NULL,
	[EffectiveDate] date NOT NULL
);

----------------------------------
---- create TblTransaction
----------------------------------
drop table if exists TblTransaction;
Create table TblTransaction (
	[Id] int PRIMARY KEY CLUSTERED IDENTITY(1,1) NOT NULL,
	[Date] date NOT NULL,
	[Amount] int NOT NULL,
	[Memo] varchar(200),
	[CategoryId] int references TblCategory(id)
);

----------------------------------
---- create TblImportFileFormat
----------------------------------
drop table if exists TblImportFileFormat;
Create table TblImportFileFormat (
	[Id] int PRIMARY KEY CLUSTERED IDENTITY(1,1) NOT NULL,
	[ImportFileFormatName] varchar(100) NOT NULL,
	[DateKey] varchar(100) NOT NULL,
	[MemoFormat] varchar(100) NOT NULL,
	[AmountKey] varchar(100) NOT NULL,
	[InvertAmounts] bit NOT NULL,
	[HeaderLines] int NOT NULL,
	[Delimiter] varchar(1) NOT NULL,
	[Image] varchar(100)
);

----------------------------------
---- create TblMemoCategorization
----------------------------------
drop table if exists TblMemoCategorization;
Create table TblMemoCategorization (
	[Id] int PRIMARY KEY CLUSTERED IDENTITY(1,1) NOT NULL,
	[Memo] varchar(200) NOT NULL,
	[CategoryId] int references TblCategory(id) NOT NULL
);