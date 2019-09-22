#CREAYTE
DATABASE
create database traffic_monitoring_system;

#SELECTING DATABASE
use traffic_monitoring_system;

#DROP COMMANDS
drop table person;
drop table officer;
drop table license;
drop table vehicle;
drop table model_manufacturer;
drop table accidents;
drop table vehicle_accident;
drop table vehicle_owner;
drop table violation;
drop table violation_penalty;



#CREATE COMMANDS
create Table Person
(
    aadhar numeric(12),
    firstName varchar(30),
    lastName varchar(30),
    dob date,
    PINcode numeric(6),
    mobNumber numeric(10),
    email varchar(30),
    licenseID varchar(15),
    primary key(aadhar)
);
create Table Model_Manufacturer
(
    model varchar(25),
    manufacturer varchar(30),
    primary key (model)
);
create Table Vehicle
(
    LPN varchar(10),
    model varchar(25),
    insuranceCheck bool,
    PollutionCheck bool,
    primary key(LPN),
    foreign key(model) references Model_Manufacturer(model)
);
create Table Officer
(
    officerID varchar(20),
    passwordHash varchar(32),
    designation varchar(20),
    aadhar numeric(12),
    primary key(officerID),
    foreign key(aadhar) references Person(aadhar)
);
create Table License
(
    licenseID varchar(15),
    licenseIssueDate date,
    licenseExpiryData date,
    aadhar numeric(12),
    primary key(licenseID),
    foreign key(aadhar) references Person(aadhar)
);
create Table Accidents
(
    accidentID varchar(20),
    casualties numeric(2,0),
    timeOfAccident datetime,
    location varchar(30),
    cause varchar(30),
    officerInChargeID varchar(20),
    primary key(accidentID),
    foreign key(officerInChargeID) references Officer(officerID)
);
create Table Vehicle_Accident
(
    accidentID varchar(20),
    LPN varchar(10),
    primary key(accidentID, LPN),
    foreign key (accidentID) references Accidents(accidentID),
    foreign key(LPN) references Vehicle(LPN)
);
create Table Vehicle_Owner
(
    LPN varchar(10),
    ownerAadhar numeric(12),
    primary key(LPN, ownerAadhar),
    foreign key(ownerAadhar) references Person(aadhar),
    foreign key(LPN) references Vehicle(LPN)
);
create Table Violation_Penalty
(
    type varchar(30),
    action varchar(30),
    fee numeric(6),
    primary key(type)
);
create Table Violation
(
    billID int(20),
    type varchar(30),
    officerInChargeID varchar(20),
    violatorAadhar numeric(12),
    primary key(billID),
    foreign key(officerInChargeID) references Officer(officerID),
    foreign key(type) references Violation_Penalty(type)
);
ALTER TABLE Violation AUTO_INCREMENT=100;


#VIEW ENTIRE TABLE
select *
from person;
select *
from officer;
select *
from license;
select *
from vehicle;
select *
from model_manufacturer;
select *
from accidents;
select *
from vehicle_accident;
select *
from vehicle_owner;
select *
from violation;
select *
from violation_penalty;

#DESCRIBE TABLES
DESC person;
DESC officer;
DESC license;
DESC vehicle;
DESC model_manufacturer;
DESC accidents;
DESC vehicle_accident;
DESC vehicle_owner;
DESC violation;
DESC violation_penalty;

