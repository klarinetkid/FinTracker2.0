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
---- create TblBudget
----------------------------------
drop table if exists TblBudget;
Create table TblBudget (
	[Id] int PRIMARY KEY CLUSTERED IDENTITY(1,1) NOT NULL,
	[CategoryId] int references TblCategory(Id) NOT NULL,
	[Amount] int NOT NULL,
	[EffectiveDate] date NOT NULL,
	constraint CK_TblBudget_Amount_Range check (
	   [Amount] >= -100000000 AND [Amount] <= 100000000
	)
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
	[CategoryId] int references TblCategory(id),
	[IsCashTransaction] bit NOT NULL DEFAULT 0,
	index IX_TblTransaction_Date_Memo_Amount ([Date], [Memo], [Amount])
);

----------------------------------
---- create TblImportFormat
----------------------------------
drop table if exists TblImportFormat;
Create table TblImportFormat (
	[Id] int PRIMARY KEY CLUSTERED IDENTITY(1,1) NOT NULL,
	[ImportFormatName] varchar(50) NOT NULL,
	[DateKey] varchar(25) NOT NULL,
	[MemoFormat] varchar(50) NOT NULL,
	[AmountKey] varchar(25) NOT NULL,
	[InvertAmounts] bit NOT NULL,
	[HeaderLines] int NOT NULL,
	[Delimiter] varchar(1) NOT NULL,
	[Image] varchar(25)
);

----------------------------------
---- create TblMemo
----------------------------------
drop table if exists TblMemo;
Create table TblMemo (
	[Id] int PRIMARY KEY CLUSTERED IDENTITY(1,1) NOT NULL,
	[Memo] varchar(200) NOT NULL,
	[CategoryId] int references TblCategory(id) NULL,
	[IsImported] bit NOT NULL default 1,
	constraint AK_TblMemo_Memo unique([Memo]),
	constraint CK_TblMemo_IsImportedCategoryId check (
		(
			IsImported = 0
			and CategoryId is null
		)
		or (IsImported = 1 and CategoryId is not null)
	)
);