----------------------------------
---- create VwCategoryReferenceCounts
----------------------------------
drop view if exists VwCategoryReferenceCounts
go
create view VwCategoryReferenceCounts as

select 
	*,
	(select count(Id) from dbo.TblTransaction where CategoryId = c.Id) as TransactionCount,
	(select count(Id) from dbo.TblMemo where CategoryId = c.Id) as MemoCount,
	(select count(Id) from dbo.TblBudget where CategoryId = c.Id) as BudgetCount
from
	dbo.TblCategory c
go