USE dbMazzaFc;

insert into[dbo].tyccoin(tycname,tycprefix,identifier,createduser,createdon)
values 
	('Real','R$',NEWID(),1,GETDATE()),
	('Dólar','$',NEWID(),1,GETDATE()),
	('Euro','€',NEWID(),1,GETDATE())

Insert into [dbo].oriorigin(oridescription,identifier,createdon,createduser)
values 
	('Bovina',NEWID(),GETDATE(),1),
	('Aves',NEWID(),GETDATE(),1),
	('Suína',NEWID(),GETDATE(),1),
	('Peixe',NEWID(),GETDATE(),1)
