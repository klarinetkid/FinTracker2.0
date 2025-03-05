----------------------------------
---- create SpGetTrendPoints
----------------------------------
--drop procedure SpGetTrendPoints
create procedure SpGetTrendPoints @start Date, @end Date, @interval varchar(5), @intervalNum int, @categoryId int as

-- for testing
--declare @start as date = '2025-01-01' 
--declare @end as date = '2025-04-01' 
--declare @interval as varchar(12) = 'week' 
--declare @perdiodNum as int = 1
--declare @categoryId as int = 5;


select
	[Start],
	[End],
	(
		select
			sum([Amount])
		from
			dbo.TblTransaction
		where
			[CategoryId] = @categoryId
			and [Date] >= [Start]
			and [Date] < [End]
	) as [Total]
from
	(
		select
			*,
			lead([Start]) over (
				order by
					[Start]
			) as [End]
		from
			(
				select
					(
						case
							@interval
							when 'year' then dateadd(year, value, @start)
							when 'month' then dateadd(month, value, @start)
							when 'week' then dateadd(week, value, @start)
						end
					) as [Start]
				from
					generate_series(
						0,
						(
							case
								@interval
								when 'year' then datediff(year, @start, @end)
								when 'month' then datediff(month, @start, @end)
								when 'week' then datediff(week, @start, @end)
							end
						),
						@intervalNum
					)
			) r
	) r2
where
	[End] is not null