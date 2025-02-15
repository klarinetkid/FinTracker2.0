----------------------------------
---- create FnGetCategoryBudgetForRange
----------------------------------
--drop function FnGetCategoryBudgetForRange
create function FnGetCategoryBudgetForRange(@categoryId int, @start Date, @end Date) returns int as begin return (
	select
		sum(Amount*12/365 * EffectiveDays) as Budget
	from
		(
			select
				*,
				datediff(
					day,
					greatest(EffectiveDate, @start),
					coalesce(NextBudgetEffectiveDate, @end)
				) as EffectiveDays
			from
				(
					select
						Id,
						Amount,
						EffectiveDate,
						lead(EffectiveDate) over (
							order by
								effectivedate
						) as NextBudgetEffectiveDate
					from
						dbo.TblBudgetItem
					where
						CategoryId = @categoryId
						and EffectiveDate < @end
				) b
			where
				b.NextBudgetEffectiveDate > @start -- only select 1 budget item before the start
				or b.NextBudgetEffectiveDate is null
		) b2
)
end