# ABMCEmpleados
ABMC de Empleados, Paises, Provincias y Ciudades

Creación de BD y carga de registros.

CREATE DATABASE EmpDB;

USE [EmpDB]
GO
/****** Object:  Table [dbo].[Pais]    Script Date: 08/18/2017 12:50:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Pais](
	[pai_codigo] [varchar](3) NOT NULL,
	[pai_nombre] [varchar](100) NOT NULL,
 CONSTRAINT [PK_paises] PRIMARY KEY CLUSTERED 
(
	[pai_codigo] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'ARG', N'Argentina')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'BOL', N'Bolivia')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'BRA', N'Brasil')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'CHI', N'Chile')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'COL', N'Colombia')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'ECU', N'Ecuador')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'EUA', N'Estados Unidos')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'PAR', N'Paraguay')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'PER', N'Perú')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'URU', N'Uruguay')
INSERT [dbo].[Pais] ([pai_codigo], [pai_nombre]) VALUES (N'VEN', N'Venezuela')
/****** Object:  Table [dbo].[Provincia]    Script Date: 08/18/2017 12:50:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Provincia](
	[pro_codigo] [varchar](3) NOT NULL,
	[pro_pai_codigo] [varchar](3) NOT NULL,
	[pro_nombre] [varchar](100) NOT NULL,
 CONSTRAINT [PK_provincias] PRIMARY KEY CLUSTERED 
(
	[pro_codigo] ASC,
	[pro_pai_codigo] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'ASU', N'PAR', N'Asunción')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'BUE', N'ARG', N'Buenos Aires')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'CAL', N'COL', N'Cali')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'CAR', N'VEN', N'Carácas')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'CAT', N'ARG', N'Catamarca')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'CHA', N'ARG', N'Chaco')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'CHU', N'ARG', N'Chubut')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'COR', N'ARG', N'Córdoba')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'CTE', N'ARG', N'Corrientes')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'ERI', N'ARG', N'Entre Ríos')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'FOR', N'ARG', N'Formosa')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'GUA', N'ECU', N'Guayaquil')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'JUJ', N'ARG', N'Jujuy')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'LIM', N'PER', N'Lima')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'LPA', N'ARG', N'La Pampa')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'MEN', N'ARG', N'Mendoza')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'MIS', N'ARG', N'Misiones')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'MON', N'URU', N'Montevideo')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'NEU', N'ARG', N'Neuquén')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'POT', N'BOL', N'Potosí')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'RGN', N'BRA', N'Rio Grande do Norte')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'RGS', N'BRA', N'Rio Grande do Sul')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'RIO', N'ARG', N'La Rioja')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'RNE', N'ARG', N'Río Negro')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'SAL', N'ARG', N'Salta')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'SCA', N'BRA', N'Santa Catarina')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'SCR', N'ARG', N'Santa Cruz')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'SDE', N'ARG', N'Santiago del Estero')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'SFE', N'ARG', N'Santa Fe')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'SGO', N'CHI', N'Santiago')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'SJU', N'ARG', N'San Juan')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'SLU', N'ARG', N'San Luis')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'TDF', N'ARG', N'Tierra del Fuego')
INSERT [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo], [pro_nombre]) VALUES (N'TUC', N'ARG', N'Tucumán')
/****** Object:  Table [dbo].[Ciudad]    Script Date: 08/18/2017 12:50:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Ciudad](
	[ciu_codigo] [varchar](3) NOT NULL,
	[ciu_pro_codigo] [varchar](3) NOT NULL,
	[ciu_pro_pai_codigo] [varchar](3) NOT NULL,
	[ciu_nombre] [varchar](100) NOT NULL,
 CONSTRAINT [PK_ciudades] PRIMARY KEY CLUSTERED 
(
	[ciu_codigo] ASC,
	[ciu_pro_codigo] ASC,
	[ciu_pro_pai_codigo] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ALD', N'SFE', N'ARG', N'Aldao')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ALE', N'SFE', N'ARG', N'Alejandra')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'AND', N'SFE', N'ARG', N'Andino')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ARE', N'SFE', N'ARG', N'Arequito')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ARM', N'SFE', N'ARG', N'Armstrong')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ARO', N'SFE', N'ARG', N'Arocena')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ARR', N'BUE', N'ARG', N'Arrecifes')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ASE', N'SFE', N'ARG', N'Arroyo Seco')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ASU', N'ASU', N'PAR', N'Asunción')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ATA', N'SFE', N'ARG', N'Ataliva')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'AVE', N'BUE', N'ARG', N'Avellaneda')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'BAL', N'BUE', N'ARG', N'Balcarce')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'BAR', N'SFE', N'ARG', N'Barrancas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'BBL', N'BUE', N'ARG', N'Bahía Blanca')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'BDI', N'SFE', N'ARG', N'Bernardo de Irigoyen')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'BOM', N'SFE', N'ARG', N'Bombal')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'BOU', N'SFE', N'ARG', N'Bouquet')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'BRA', N'BUE', N'ARG', N'Bragado')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'BUS', N'SFE', N'ARG', N'Bustinza')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CAL', N'CAL', N'COL', N'Ciudad de Cali')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CAL', N'SFE', N'ARG', N'Calchaquí')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CAR', N'CAR', N'VEN', N'Carácas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CAR', N'SFE', N'ARG', N'Carcaraña')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CAS', N'SFE', N'ARG', N'Casalegño')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CAY', N'SFE', N'ARG', N'Cayastá')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CBE', N'SFE', N'ARG', N'Capitán Bermúdez')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CDG', N'SFE', N'ARG', N'Cañada de Gomez')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CEN', N'SFE', N'ARG', N'Centeno')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CER', N'SFE', N'ARG', N'Ceres')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CFE', N'BUE', N'ARG', N'Capital Federal')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CHI', N'BUE', N'ARG', N'Chivilcoy')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CHO', N'SFE', N'ARG', N'Chovet')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CLA', N'SFE', N'ARG', N'Clarke')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CON', N'ERI', N'ARG', N'Concordia')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'COR', N'COR', N'ARG', N'Córdoba')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'COR', N'SFE', N'ARG', N'Coronda')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CPA', N'COR', N'ARG', N'Carlos Paz')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CPE', N'SFE', N'ARG', N'Carlos Pellegrini')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CRR', N'SFE', N'ARG', N'Correa')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CSA', N'BUE', N'ARG', N'Campo Salles')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CSI', N'SFE', N'ARG', N'Casilda')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CSO', N'SFE', N'ARG', N'Clason')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'CTE', N'CTE', N'ARG', N'Corrientes')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'DAR', N'SFE', N'ARG', N'Desvío Arijon')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'DIA', N'SFE', N'ARG', N'Diaz')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ECA', N'SCR', N'ARG', N'El Calafate')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'EMA', N'SFE', N'ARG', N'Estación Matilde')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ERA', N'SFE', N'ARG', N'El Rabon')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ERE', N'BUE', N'ARG', N'Erescano')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ESP', N'SFE', N'ARG', N'Esperanza')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ETR', N'SFE', N'ARG', N'El Trébol')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'FIR', N'SFE', N'ARG', N'Firmat')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'FIS', N'SFE', N'ARG', N'Fisherton')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'FLB', N'SFE', N'ARG', N'Fray Luis Beltran')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'FLO', N'SCA', N'BRA', N'Florianopolis')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'FOR', N'FOR', N'ARG', N'Formosa')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'FRA', N'SFE', N'ARG', N'Frank')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'FUN', N'SFE', N'ARG', N'Funes')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GAL', N'SFE', N'ARG', N'Galvez')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GBA', N'SFE', N'ARG', N'Granadero Baigorria')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GCA', N'BUE', N'ARG', N'Gobernador Castro')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GCA', N'SFE', N'ARG', N'Gobernador Candioti')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GCR', N'MEN', N'ARG', N'Godoy Cruz')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GCR', N'SFE', N'ARG', N'Gobernador Crespo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GES', N'SFE', N'ARG', N'Gesler')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GRO', N'BUE', N'ARG', N'General Rojo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GUA', N'GUA', N'ECU', N'Guayaquil')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'GUA', N'SFE', N'ARG', N'Guasuncho')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'HEL', N'SFE', N'ARG', N'Helvecia')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'HUM', N'SFE', N'ARG', N'Humboldt')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'IBA', N'SFE', N'ARG', N'Ibarlucea')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'IRI', N'SFE', N'ARG', N'Irigoyen')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ISV', N'COR', N'ARG', N'Isla Verde')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'JAR', N'SFE', N'ARG', N'Jacinto Arauz')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'JBM', N'SFE', N'ARG', N'Juan Bernabé Molina')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'JDA', N'NEU', N'ARG', N'Junín de los Andes')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'JUJ', N'JUJ', N'ARG', N'Jujuy')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'JUN', N'BUE', N'ARG', N'Junín')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'JUN', N'SFE', N'ARG', N'Juncal')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'K35', N'SFE', N'ARG', N'Kilómetro 35')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LAN', N'SFE', N'ARG', N'Landeta')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LAR', N'SFE', N'ARG', N'Larrechea')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LBO', N'SFE', N'ARG', N'La Boca')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LCA', N'COR', N'ARG', N'La Calera')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LCO', N'SFE', N'ARG', N'La Criolla')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LEM', N'BUE', N'ARG', N'La Emilia')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LIM', N'LIM', N'PER', N'Lima')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LIN', N'BUE', N'ARG', N'Lincoln')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LLC', N'SFE', N'ARG', N'LLambí Cambell')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LPA', N'SFE', N'ARG', N'Luis Palacios')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LPI', N'SFE', N'ARG', N'Laguna Paiva')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LPJ', N'SFE', N'ARG', N'Las Parejas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LPL', N'BUE', N'ARG', N'La Plata')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LQU', N'SFE', N'ARG', N'Los Quirquinchos')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LRG', N'SFE', N'ARG', N'Larguía')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LRO', N'SFE', N'ARG', N'Las Rosas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LUC', N'SFE', N'ARG', N'Lucio V. Lopez')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LUJ', N'BUE', N'ARG', N'Luján')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'LVI', N'BUE', N'ARG', N'La Violeta')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MAC', N'SFE', N'ARG', N'Maciel')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MAI', N'MEN', N'ARG', N'Maipu')
GO
print 'Processed 100 total records'
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MAL', N'SFE', N'ARG', N'Malabrigo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MAR', N'SFE', N'ARG', N'Margarita')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MDO', N'SFE', N'ARG', N'Montes de Oca')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MDQ', N'BUE', N'ARG', N'Mar del Plata')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MEL', N'SFE', N'ARG', N'Melincué')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MEN', N'MEN', N'ARG', N'Mendoza')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MER', N'BUE', N'ARG', N'Mercedes')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MHE', N'BUE', N'ARG', N'Monte Hermoso')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MIR', N'BUE', N'ARG', N'Miramar')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MON', N'MON', N'URU', N'Montevideo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MON', N'SFE', N'ARG', N'Monje')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MPA', N'SFE', N'ARG', N'Máximo Paz')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'MSU', N'SFE', N'ARG', N'María Susana')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'NEC', N'BUE', N'ARG', N'Necochea')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'NEL', N'SFE', N'ARG', N'Nelson')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'NEU', N'NEU', N'ARG', N'Neuquén')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'NTO', N'SFE', N'ARG', N'Nuevo Torino')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'OLA', N'BUE', N'ARG', N'Olavarría')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'OLI', N'SFE', N'ARG', N'Oliveros')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PAR', N'ERI', N'ARG', N'Paraná')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PAR', N'SFE', N'ARG', N'Puerto Aragon')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PCA', N'SFE', N'ARG', N'Pueblo Casas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PER', N'BUE', N'ARG', N'Pergamino')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PER', N'RGN', N'BRA', N'Pernambuco')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PER', N'SFE', N'ARG', N'Peréz')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PGA', N'SFE', N'ARG', N'Puerto Gaboto')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PIN', N'BUE', N'ARG', N'Pinamar')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'POR', N'RGS', N'BRA', N'Porto Alegre')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'POS', N'MIS', N'ARG', N'Posadas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'PSM', N'SFE', N'ARG', N'Puerto General San Martín')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RAF', N'SFE', N'ARG', N'Rafaela')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RAM', N'BUE', N'ARG', N'Ramallo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RAW', N'CHU', N'ARG', N'Rawson')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RCR', N'SFE', N'ARG', N'Recreo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'REC', N'SFE', N'ARG', N'Reconquista')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RES', N'CHA', N'ARG', N'Resistencia')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RGA', N'SCR', N'ARG', N'Río Gallegos')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RIC', N'SFE', N'ARG', N'Ricardone')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RIO', N'RIO', N'ARG', N'La Rioja')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ROJ', N'BUE', N'ARG', N'Rojas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ROL', N'SFE', N'ARG', N'Roldán')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ROM', N'SFE', N'ARG', N'Romang')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ROS', N'SFE', N'ARG', N'Rosario')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'RUF', N'SFE', N'ARG', N'Rufino')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SAA', N'BUE', N'ARG', N'San Antonio de Areco')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SAG', N'BUE', N'ARG', N'San Andrés de Giles')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SAG', N'SFE', N'ARG', N'San Agustín')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SAL', N'BUE', N'ARG', N'Salto')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SAL', N'SAL', N'ARG', N'Salta')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SAN', N'SFE', N'ARG', N'Sanford')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SCA', N'SFE', N'ARG', N'San Carlos')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SCB', N'RNE', N'ARG', N'San Carlos de Bariloche')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SCB', N'SFE', N'ARG', N'Santa Clara de Buena Vista')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SCR', N'SFE', N'ARG', N'San Cristobal')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SCT', N'BUE', N'ARG', N'San Clemente del Tuyu')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SDE', N'SDE', N'ARG', N'Santiago del Estero')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SDO', N'SFE', N'ARG', N'Santo Domingo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SER', N'SFE', N'ARG', N'Serodino')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SFA', N'SFE', N'ARG', N'San Fabían')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SFE', N'SFE', N'ARG', N'Santa Fe')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SFV', N'CAT', N'ARG', N'San Fernando del Valle')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SGE', N'SFE', N'ARG', N'San Genaro')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SGG', N'SFE', N'ARG', N'San Gregorio')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SGO', N'SGO', N'CHI', N'Santiago de Chile')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SGR', N'SFE', N'ARG', N'Salto Grande')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SJA', N'SFE', N'ARG', N'San Javier')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SJE', N'SFE', N'ARG', N'San José de la Esquina')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SJN', N'SFE', N'ARG', N'San Jerónimo Norte')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SJO', N'SFE', N'ARG', N'San Jorge')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SJR', N'SFE', N'ARG', N'San José del Rincón')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SJS', N'SFE', N'ARG', N'San Jerónimo Sud')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SJU', N'SFE', N'ARG', N'San Justo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SJU', N'SJU', N'ARG', N'San Juan')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SLO', N'SFE', N'ARG', N'San Lorenzo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SLU', N'POT', N'BOL', N'San Luis de Potosí')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SLU', N'SLU', N'ARG', N'San Luis')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SMA', N'NEU', N'ARG', N'San Martín de los Andes')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SME', N'SFE', N'ARG', N'San Martín de las Escobas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SMT', N'TUC', N'ARG', N'San Miguel de Tucumán')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SNI', N'BUE', N'ARG', N'San Nicolás')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SOL', N'SFE', N'ARG', N'Soldini')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SPE', N'BUE', N'ARG', N'San Pedro')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SRO', N'LPA', N'ARG', N'Santa Rosa')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'STO', N'SFE', N'ARG', N'Santo Tomé')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SUN', N'SFE', N'ARG', N'Sunchales')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SUS', N'SFE', N'ARG', N'Susana')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'SVI', N'SFE', N'ARG', N'Sauce Viejo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'TIM', N'SFE', N'ARG', N'Timbués')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'TOR', N'SFE', N'ARG', N'Tortugas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'TOS', N'SFE', N'ARG', N'Tostado')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'TOT', N'SFE', N'ARG', N'Totoras')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'TRE', N'CHU', N'ARG', N'Trelew')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'URA', N'SFE', N'ARG', N'Uranga')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'USU', N'TDF', N'ARG', N'Usuahia')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VCA', N'SFE', N'ARG', N'Villa Cañas')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VCO', N'SFE', N'ARG', N'Villa Constitución')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VER', N'SFE', N'ARG', N'Vera')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VGE', N'BUE', N'ARG', N'Villa Gesell')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VGG', N'SFE', N'ARG', N'Villa Gobernador Galvez')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VIC', N'ERI', N'ARG', N'Victoria')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VID', N'SFE', N'ARG', N'Videla')
GO
print 'Processed 200 total records'
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VIE', N'RNE', N'ARG', N'Viedma')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VLA', N'NEU', N'ARG', N'Villa La Angostura')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VLR', N'SFE', N'ARG', N'Villa La Rivera')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VOC', N'SFE', N'ARG', N'Villa Ocampo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VRA', N'BUE', N'ARG', N'Villa Ramallo')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'VTU', N'SFE', N'ARG', N'Venado Tuerto')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'WAL', N'SFE', N'ARG', N'Walvelberg')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'WHE', N'SFE', N'ARG', N'Wheelwright')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'WIL', N'SFE', N'ARG', N'Wildermuth')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'YAG', N'SFE', N'ARG', N'Yaguareté')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'YAM', N'SFE', N'ARG', N'Yamandu')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ZAM', N'SFE', N'ARG', N'Zamponi')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ZAN', N'SFE', N'ARG', N'Zanetti')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ZAV', N'SFE', N'ARG', N'Zavalla')
INSERT [dbo].[Ciudad] ([ciu_codigo], [ciu_pro_codigo], [ciu_pro_pai_codigo], [ciu_nombre]) VALUES (N'ZPE', N'SFE', N'ARG', N'Zenón Pereira')
/****** Object:  ForeignKey [FK_pais_ciu_pro_codigo]    Script Date: 08/18/2017 12:50:11 ******/
ALTER TABLE [dbo].[Ciudad]  WITH CHECK ADD  CONSTRAINT [FK_pais_ciu_pro_codigo] FOREIGN KEY([ciu_pro_codigo], [ciu_pro_pai_codigo])
REFERENCES [dbo].[Provincia] ([pro_codigo], [pro_pai_codigo])
GO
ALTER TABLE [dbo].[Ciudad] CHECK CONSTRAINT [FK_pais_ciu_pro_codigo]
GO
/****** Object:  ForeignKey [FK_pais_pro_pai_codigo]    Script Date: 08/18/2017 12:50:11 ******/
ALTER TABLE [dbo].[Provincia]  WITH CHECK ADD  CONSTRAINT [FK_pais_pro_pai_codigo] FOREIGN KEY([pro_pai_codigo])
REFERENCES [dbo].[Pais] ([pai_codigo])
GO
ALTER TABLE [dbo].[Provincia] CHECK CONSTRAINT [FK_pais_pro_pai_codigo]
GO
