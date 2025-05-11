insert into[dbo].tyccoin(tycname,tycprefix,identifier,createduser,createdon)
values 
	('Real','R$',NEWID(),1,GETDATE()),
	('Dólar','$',NEWID(),1,GETDATE()),
	('Euro','€',NEWID(),1,GETDATE())