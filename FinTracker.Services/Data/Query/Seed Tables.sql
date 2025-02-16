delete from dbo.TblCategory;
DBCC CHECKIDENT ('[TblCategory]', RESEED, 0);
GO
insert into dbo.TblCategory (CategoryName, Colour) values ('Income', '000000'); -- 1
insert into dbo.TblCategory (CategoryName, Colour) values ('Bills', '2d7f9d'); -- 2
insert into dbo.TblCategory (CategoryName, Colour) values ('Groceries', '658147'); -- 3 
insert into dbo.TblCategory (CategoryName, Colour) values ('Dine out', '000C66'); -- 4
insert into dbo.TblCategory (CategoryName, Colour) values ('Entertainment', '9bd3cb'); -- 5
insert into dbo.TblCategory (CategoryName, Colour) values ('Transportation', 'D0B8A8'); -- 6
insert into dbo.TblCategory (CategoryName, Colour) values ('Clothes', 'D37676'); -- 7

delete from dbo.TblBudgetItem;
insert into dbo.TblBudgetItem (CategoryId, Amount, EffectiveDate) values (3, 34000, '2000-01-01');
insert into dbo.TblBudgetItem (CategoryId, Amount, EffectiveDate) values (4, 20000, '2000-01-01');
insert into dbo.TblBudgetItem (CategoryId, Amount, EffectiveDate) values (5, 9000, '2000-01-01');

delete from dbo.TblImportFileFormat
insert into dbo.TblImportFileFormat ([ImportFileFormatName], [DateKey], [MemoFormat], [AmountKey], [InvertAmounts], [HeaderLines], [Delimiter], [Image])
	values ('Bank Export', 'Date', '{Memo}', 'Amount', 0, 0, ',', 'tangerine.png')
insert into dbo.TblImportFileFormat ([ImportFileFormatName], [DateKey], [MemoFormat], [AmountKey], [InvertAmounts], [HeaderLines], [Delimiter], [Image])
	values ('Credit Card Export', 'Date', '{Memo}', 'Amount', 0, 0, ',', 'ctfs.png')