----------------------------------
---- create TblCategory
----------------------------------
drop table if exists TblCategory;
create table TblCategory (
	[Id] int primary key clustered identity(1,1) not null,
	[CategoryName] varchar(40) not null,
	[Colour] varchar(25) not null
);

----------------------------------
---- create TblBudget
----------------------------------
drop table if exists TblBudget;
create table TblBudget (
	[Id] int primary key clustered identity(1,1) not null,
	[CategoryId] int references TblCategory(Id) not null,
	[Amount] int not null,
	[EffectiveDate] date not null
);

----------------------------------
---- create TblTransaction
----------------------------------
drop table if exists TblTransaction;
create table TblTransaction (
	[Id] int primary key clustered identity(1,1) not null,
	[Date] date not null,
	[Amount] int not null,
	[Memo] varchar(200),
	[CategoryId] int references TblCategory(id),
	[IsCashTransaction] bit not null DEFAULT 0,
	index IX_TblTransaction_Date_Memo_Amount ([Date], [Memo], [Amount])
);

----------------------------------
---- create TblImportFormat
----------------------------------
drop table if exists TblImportFormat;
create table TblImportFormat (
	[Id] int primary key clustered identity(1,1) not null,
	[ImportFormatName] varchar(50) not null,
	[DateKey] varchar(25) not null,
	[MemoFormat] varchar(50) not null,
	[AmountKey] varchar(25) not null,
	[InvertAmounts] bit not null,
	[HeaderLines] int not null,
	[Delimiter] varchar(1) not null,
	[Image] varchar(25)
);

----------------------------------
---- create TblMemo
----------------------------------
drop table if exists TblMemo;
create table TblMemo (
	[Id] int primary key clustered identity(1,1) not null,
	[Memo] varchar(200) not null,
	[CategoryId] int references TblCategory(id) NULL,
	[IsImported] bit not null default 1,
	constraint AK_TblMemo_Memo unique([Memo]),
	constraint CK_TblMemo_IsImported_CategoryId check (
		(
			IsImported = 0
			and CategoryId is null
		)
		or (IsImported = 1 and CategoryId is not null)
	)
);