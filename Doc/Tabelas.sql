
create database dbMazzaFc;
use dbMazzaFc;

CREATE TABLE [usuuser] (
    [usucod] INT IDENTITY(1,1) PRIMARY KEY,
    [usuname] NVARCHAR(MAX) NOT NULL,
    [usuemail] NVARCHAR(MAX) NOT NULL,
    [usupassword] NVARCHAR(MAX) NOT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
    FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [tyccoin] (
    [tyccod] INT IDENTITY(1,1) PRIMARY KEY,
    [tycname] NVARCHAR(MAX) NOT NULL,
    [tycprefix] NVARCHAR(MAX) NOT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NOT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
	FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [oriorigin] (
    [oricod] INT IDENTITY(1,1) PRIMARY KEY,
    [oridescription] NVARCHAR(MAX) NOT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NOT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
	FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [metmeat] (
    [metcod] INT IDENTITY(1,1) PRIMARY KEY,
    [metdescription] NVARCHAR(MAX) NOT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NOT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
    FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [mtimeat_origin] (
	[mticod] INT IDENTITY(1,1) PRIMARY KEY,
    [metcod] INT NOT NULL,
    [oricod] INT NOT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NOT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
    FOREIGN KEY ([metcod]) REFERENCES [metmeat]([metcod]),
    FOREIGN KEY ([oricod]) REFERENCES [oriorigin]([oricod]),
    FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [buybuyer] (
    [buycod] INT IDENTITY(1,1) PRIMARY KEY,
    [buydoc_number] NVARCHAR(MAX) NOT NULL,
    [buyname] NVARCHAR(MAX) NOT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NOT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
	FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [bltbuyer_location] (
    [bltcod] INT IDENTITY(1,1) PRIMARY KEY,
    [bltcity] NVARCHAR(MAX) NOT NULL,
    [bltstate] NVARCHAR(MAX) NOT NULL,
    [buycod] INT NOT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NOT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
    FOREIGN KEY ([buycod]) REFERENCES [buybuyer]([buycod]),
		FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [odrorder] (
    [odrcod] INT IDENTITY(1,1) PRIMARY KEY,
    [buycod] INT NOT NULL,
    [tyccod] INT NOT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NOT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
    FOREIGN KEY ([buycod]) REFERENCES [buybuyer]([buycod]),
    FOREIGN KEY ([tyccod]) REFERENCES [tyccoin]([tyccod]),
	FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [omtorder_meat] (
    [omtcod] INT IDENTITY(1,1) PRIMARY KEY,
    [ordcod] INT NOT NULL,
    [ordquantity] INT NOT NULL,
    [ordprice] DECIMAL(18,2) NOT NULL,
    [mticod] INT NULL,
    [identifier] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [createduser] INT NOT NULL,
    [createdon] DATETIME NOT NULL DEFAULT GETDATE(),
    [modifyon] DATETIME NULL,
    [modifyuser] INT NULL,
    [hasdeleted] BIT NOT NULL DEFAULT 0,
    [deletedon] DATETIME NULL,
    [deleteduser] INT NULL,
    FOREIGN KEY ([ordcod]) REFERENCES [odrorder]([odrcod]),
    FOREIGN KEY ([mticod]) REFERENCES [mtimeat_origin]([mticod]),
	FOREIGN KEY ([createduser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([modifyuser]) REFERENCES [usuuser]([usucod]),
    FOREIGN KEY ([deleteduser]) REFERENCES [usuuser]([usucod])
);

CREATE TABLE [lrr_log_request_response] (
    [lrr_pk] INT IDENTITY(1,1) PRIMARY KEY,
    [lrr_edpoint] NVARCHAR(MAX) NOT NULL,
    [lrr_method] NVARCHAR(MAX) NOT NULL,
    [lrr_request] NVARCHAR(MAX) NOT NULL,
    [lrr_response] NVARCHAR(MAX) NOT NULL,
    [lrr_data_request] DATETIME NOT NULL,
    [lrr_data_response] DATETIME NOT NULL,
    [lrr_ticket] UNIQUEIDENTIFIER NOT NULL,
    [lrr_code_http] INT NOT NULL
);

