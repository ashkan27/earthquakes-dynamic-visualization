create table earthquake(
	ID varchar primary key,
	date date,
	latitude float,
	longitude float,
	depth float,
	magnitude float
);
select * from earthquake;