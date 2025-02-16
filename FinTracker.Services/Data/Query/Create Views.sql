----------------------------------
---- create VwCategoryTransactionCount
----------------------------------
drop view if exists VwCategoryTransactionCount
create view VwCategoryTransactionCount as

select 
	*,
	(select count(Id) from dbo.TblTransaction where CategoryId = c.Id) as TransactionCount
from
	dbo.TblCategory c
go