create database TrafficMgmt;

use TrafficMgmt;
drop Table Person;
create Table Person(aadhar numeric(12), firstName varchar(30), lastName varchar(30), dob date, PINcode numeric(6), mobNumber numeric(10), email varchar(30), licenseID varchar(15), primary key(aadhar));

create Table Model_Manufacturer(model varchar(25), manufacturer varchar(30), primary key (model));

create Table Vehicle(LPN varchar(10), model varchar(25), insuranceCheck bool, PollutionCheck bool, primary key(LPN), foreign key(model) references Model_Manufacturer(model));

create Table Officer(officerID varchar(20), passwordHash varchar(32), designation varchar(20), aadhar numeric(12), primary key(officerID), foreign key(aadhar) references Person(aadhar));

create Table License(licenseID varchar(15), licenseIssueDate date, licenseExpiryData date, aadhar numeric(12), primary key(licenseID), foreign key(aadhar) references Person(aadhar));

create Table Accidents(accidentID varchar(20), casualties numeric(2,0), timeOfAccident datetime, location varchar(30), cause varchar(30), officerInChargeID varchar(20), primary key(accidentID), foreign key(officerInChargeID) references Officer(officerID) );

create Table Vehicle_Accident(accidentID varchar(20), LPN varchar(10), primary key(accidentID, LPN), foreign key (accidentID) references Accidents(accidentID), foreign key(LPN) references Vehicle(LPN));

create Table Vehicle_Owner(LPN varchar(10), ownerAadhar numeric(12), primary key(LPN, ownerAadhar), foreign key(ownerAadhar) references Person(aadhar), foreign key(LPN) references Vehicle(LPN));

create Table Violation_Penalty(type varchar(30), action varchar(30), fee numeric(6), primary key(type));

drop Table Violation;
create Table Violation(billID int(20), type varchar(30), officerInChargeID varchar(20), violatorAadhar numeric(12), primary key(billID), foreign key(officerInChargeID) references Officer(officerID), foreign key(type) references Violation_Penalty(type));

ALTER TABLE Violation AUTO_INCREMENT=100;