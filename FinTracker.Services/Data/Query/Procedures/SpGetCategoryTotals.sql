----------------------------------
---- create SpGetCategoryTotals
----------------------------------
--drop procedure SpGetCategoryTotals
create procedure SpGetCategoryTotals @start Date, @end Date as

select
	CategoryId,
	CategoryName,
	Colour,
	Total,
	PercentOfIncome,
	PercentOfSpend,
	Budget,
	(abs(Total) - Budget) as BudgetDeviation
from (
	select
		*,
		(select cast(Total as float)) * 100 / (SUM(CASE WHEN Total > 0 THEN Total END) over ()) as PercentOfIncome,
		(select cast(Total as float)) * 100 / (SUM(CASE WHEN Total < 0 THEN Total END) over ()) as PercentOfSpend,
		dbo.FnGetCategoryBudgetForRange(CategoryId, @start, @end) as Budget
	from
		(select
			c.Id as CategoryId,
			CategoryName,
			Colour,
			sum(t.Amount) as Total
		from
			dbo.TblTransaction t
			left join dbo.TblCategory c on c.Id = t.CategoryId
		where
			t.Date >= @start
			and t.Date < @end
		group by
			c.CategoryName,
			c.Id,
			c.Colour
		) c
) c2