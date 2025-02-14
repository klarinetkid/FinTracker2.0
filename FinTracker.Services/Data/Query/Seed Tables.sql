delete from TblCategory;
insert into TblCategory (Id, CategoryName, Colour) values (0, 'Income', '000000');
insert into TblCategory (Id, CategoryName, Colour) values (1, 'Bills', '2d7f9d');
insert into TblCategory (Id, CategoryName, Colour) values (2, 'Groceries', '658147');
insert into TblCategory (Id, CategoryName, Colour) values (3, 'Dine out', '000C66');
insert into TblCategory (Id, CategoryName, Colour) values (4, 'Jazz', '800297');
insert into TblCategory (Id, CategoryName, Colour) values (5, 'Entertainment', '9bd3cb');
insert into TblCategory (Id, CategoryName, Colour) values (6, 'Transportation', 'D0B8A8');
insert into TblCategory (Id, CategoryName, Colour) values (7, 'Travel', 'EEC759');
insert into TblCategory (Id, CategoryName, Colour) values (8, 'Smokes', 'F19ED2');
insert into TblCategory (Id, CategoryName, Colour) values (9, 'Clothes', 'D37676');

delete from TblBudgetItem;
insert into TblBudgetItem (CategoryId, Amount) values (1, 140000);
insert into TblBudgetItem (CategoryId, Amount) values (2, 45000);
insert into TblBudgetItem (CategoryId, Amount) values (4, 8000);
insert into TblBudgetItem (CategoryId, Amount, IsYearly) values (7, 1000000, 1);

delete from TblImportFileFormat;
insert into TblImportFileFormat (ImportFileFormatName, DateKey, MemoFormat, AmountKey, InvertAmounts, Headerlines)
	values ('Tangerine Bank Transaction Export', 'Date', '{Name} | {Memo}', 'Amount', 0, 0);
insert into TblImportFileFormat (ImportFileFormatName, DateKey, MemoFormat, AmountKey, InvertAmounts, Headerlines)
	values ('CTFS Transaction Export', 'DATE', '{TRANSACTION}', 'AMOUNT', 1, 0);