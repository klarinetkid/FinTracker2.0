
-- provision the database, login & user
create database FinTracker_Dev
go

use FinTracker_Dev
create login FinTracker_DevUser with password = 'abcd1234', default_database = FinTracker_Dev
create user FinTracker_DevUser from login FinTracker_DevUser
alter role db_owner add member FinTracker_DevUser