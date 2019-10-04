//jshint esversion:6

//DBMS Project Backend

//Importing Libraries an Other Packages
var express = require('express');
var cors = require('cors');
var app = express();
var mysql = require('mysql');
var md5 = require('md5');



//Establishing Connection
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'traffic_monitoring_system'
    
});


//BoilerPlate Stuff
connection.connect();
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());


//Checking if server is running 
app.get('/', function(req, res){
    console.log("Server Is Working!");
    data = {uname : "server", password : "why"};
    res.json(data);
});

//Basic Query to Generate Accident Report
app.get('/GenerateAccidentReport', function (req, res) {
    console.log("Invoked Query");
    connection.query('SELECT * from person', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        res.json(results);
    });
    
});

app.post('/GenerateAccidentReport', function (req, res) {
    // connection.query("Select aadhar from Person", (err, result) => {

    //     if (err)
    //         console.log("Error");
    //     else{
    //     console.log(result);
    //     }
    // });

});

//Adding Violation to the Database
app.post('/AddViolationEntry', function(req, res){
    data = req.body;
    var aadhar = data.AadharNum;
    var officerID = data.officerID;
    var type=data.type;


    connection.query("Select aadhar from Person where aadhar = ?", [aadhar], (err, result) =>{
        if(err)
            console.log("Error");

        // console.log(result);
        if(result.length == 0)
        {
            res.send("DNE");
            console.log("gone");
            return "gone";
        }
        else
        {
            console.log("Adhar okay");
        }
    });

    var colList = [
        type, officerID, aadhar
    ];

    connection.query("Insert into Violation (type, officerInChargeID, violatorAadhar) Values (?)", [colList], (err, result) =>{
        if(err)
            console.log(err);
        else
        {
            if(err)
            {
                res.send("fail");
                throw err;
            }
            else
            {
                res.send("success");
            }
        }
    });
});


//Adding Action-Type is done dirctly to the database because the count is low and specific post rquest isn't much needed here
// app.post('/DebugAddAction',function(req,res){
// console.log("Not implemented");
// });

//Adding Accident to the Database
app.post('/AccidentEntry', function (req, res) {
    data = req.body;
    var accidentID=data.accidentID;
    var casualties= data.casualties;
    var timeOfAccident = data.timeOfAccident;
    var location = data.location;
    var cause = data.cause;
    var officerInChargeID = data.officerInChargeID;
    var lpn=data.lpn;


    //TODO: Check if the lpn is valid code to be added here.

    var colList = [
        accidentID,
        casualties,
        cause,
        location,
        officerInChargeID,
        timeOfAccident
    ];

    var colList2=[
        accidentID,
        lpn
    ];

    connection.query("Insert into accidents (accidentID,casualties,cause,location,officerInChargeID,timeOfAccident) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            }
            else {
                res.send("success");
            }
        }
    });

    connection.query("Insert into vehicle_accident (accidentID,lpn) Values (?)", [colList2], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            }
            else {
                res.send("success");
            }
        }
    });
});



//Adding Licence to the database
app.post('/DebugAddLicence', function (req, res) {
    data = req.body;
    var licenceid = data.licenceid;
    var licenceIssueDate = data.licenceIssueDate;
    var licenceExpiryDate = data.licenceExpiryDate;
    var AadharNum = data.AadharNum;

    var colList = [
        licenseID,licenseIssueDate,licenseExpiryDate,aadhar
    ];


    connection.query("Insert into license (licenseID,licenseIssueDate,licenseExpiryDate,aadhar) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            }
            else {
                res.send("success");
            }
        }
    });
});


//Adding Vehicle to the database
app.post('/DebugAddVehicle', function (req, res) {
    data = req.body;
    var lpn = data.lpn;
    var model = data.model;
    var insuranceCheck =data.insuranceCheck;
    var pollutionCheck= data.pollutionCheck;    
    var AadharNum=data.AadharNum;

    var colList = [
        lpn,model,insuranceCheck,pollutionCheck
    ];

    var colList2=[
        lpn,AadharNum
    ];

    connection.query("Insert into vehicle (lpn,model,insuranceCheck,pollutionCheck) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            }
            else {
                res.send("success");
            }
        }
    });
    connection.query("Insert into vehicle_owner (lpn,AadharNum) Values (?)", [colList2], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            }
            else {
                res.send("success");
            }
        }
    });
});




//Adding Vehicle Model to the database
app.post('/DebugAddModel', function (req, res) {
    data = req.body;
    var model = data.model;
    var manufacturer = data.manufacturer;

    var colList = [
        model,manufacturer
    ];

    connection.query("Insert into model_manufacturer (model,manufacturer) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            }
            else {
                res.send("success");
            }
        }
    });
});



//Adding officer is done dirctly to the database
// app.post('/DebugAddOfficer',function(req,res){
// console.log("Not implemented");
// });

//Adding Person to the database
app.post('/DebugAddPerson', function(req, res){
    data = req.body;
    var aadhar = data.AadharNum, type = data.Type;
    var firstname=data.FirstName;
    var lastname=data.LastName;
    var pincode=data.pincode;
    var mobileno=data.MobileNo;
    var dob=data.dob;
    var licenceid=data.LicenceID;
    var email=data.Email;

    var colList = [
        aadhar,firstname,lastname,dob,pincode,mobileno,email,licenceid
    ];

    connection.query("Insert into Person (aadhar,firstname,lastname,dob,pincode,mobNumber,email,licenseId) Values (?)", [colList], (err, result) =>{
        if(err)
            console.log(err);
        else
        {
            if(err)
            {
                res.send("fail");
                throw err;
            }
            else
            {
                res.send("success");
            }
        }
    });
});


//OfficerLogin
app.post('/Login', function (req, res) {
    console.log("addUser was invoked");
    data = req.body;
    var user = data.uname, pass = data.password;
    var values = [
        [user, pass]
    ];
    connection.query("Select passwordHash from Officer where officerID = ?", [user], (err, result) => {
        if (err)
            console.log(err);

        // console.log(result);
        if (result.length == 0)
            res.send("officerID not found");

        var hash = md5(pass);
        if (result[0].passwordHash == pass)
            res.send("success");
        else {
            res.send("fail");
            console.log("fail" + result[0].passwordHash + " " + pass);
        }
    });
});


//Starting Server
app.listen(8081);
{
    console.log("Listening to 8081");
}
