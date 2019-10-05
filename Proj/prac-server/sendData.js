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
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'traffic_monitoring_system'

});


//BoilerPlate Stuff
connection.connect();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Checking if server is running 
app.get('/', function(req, res) {
    console.log("Server Is Working!");
    data = { uname: "Coimbatore Traffic Department", password: "Password" };
    res.json(data);
});

//Basic Query to Generate Accident Report
app.get('/GenerateAccidentReport', function(req, res) {
    startDate='1999-10-10';
    endDate='2019-10-11';
    console.log(startDate + " " + endDate)
    connection.query('SELECT * from accidents where timeOfAccident between ? and ?', [startDate, endDate], function (error, results, fields) {
        if (error) throw error;
        else
        // console.log(table);
        // res.json(results);
        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.send(table);
        res.json(results);
        // res.send(table)

    });
    

});

app.post('/GenerateAccidentReport', function(req, res) {
    
    startDate=req.body.startDate;
    endDate=req.body.endDate;
    console.log(startDate+" "+endDate)
    connection.query('SELECT * from accidents where timeOfAccident between ? and ?',[startDate,endDate], function (error, results, fields) {
        if (error) throw error;

        // console.log(table);
        // res.json(results);
        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.send(table);
        res.send(results);
        // res.send(table)

    });

});



//Basic Query to Fetch Accident Prone Zones
app.get('/AccidentProneAreas', function (req, res) {

    connection.query('select location,count(accidentID) as countAccident from accidents group by location;', function (error, results, fields) {
        if (error) throw error;

        // console.log(table);
        // res.json(results);
        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.send(table);

        res.json(results);
        // res.send(table)

    });


});

app.post('/AccidentProneAreas', function (req, res) {
    // connection.query("Select aadhar from Person", (err, result) => {

    //     if (err)
    //         console.log("Error");
    //     else{
    //     console.log(result);
    //     }
    // });
    connection.query('select location,count(accidentID) as countAccident from accidents group by location;', function (error, results, fields) {
        if (error) throw error;

        // console.log(table);
        // res.json(results);
        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.send(table);

        res.send(results);
        // res.send(table)

        // res.send(table)

    });

});
//Basic Query to Fetch Accident Prone Zones
app.get('/ViolationReport', function (req, res) {

    connection.query('select * from violation;', function (error, results, fields) {
        if (error) throw error;

        // console.log(table);
        // res.json(results);
        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.send(table);
        res.json(results);
        // res.send(table)

    });


});

app.post('/ViolationReport', function (req, res) {
    // connection.query("Select aadhar from Person", (err, result) => {

    //     if (err)
    //         console.log("Error");
    //     else{
    //     console.log(result);
    //     }
    // });
    connection.query('select * from violation;', function (error, results, fields) {
        if (error) throw error;

        // console.log(table);
        // res.json(results);
        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.send(table);
        res.send(results);
        // res.send(table)

    });

});


//Basic Query to Fetch Accident Prone Zones
app.get('/MostWanted', function (req, res) {

    connection.query('select person.firstname,person.lastname,person.mobNumber,T2.c from person,(select violatorAadhar as VA,count(Billid) as c from violation group by violatorAadhar) as T2 where person.aadhar=T2.VA order by T2.c desc;', function (error, results, fields) {
        if (error) throw error;

        // console.log(table);
        // res.json(results);
        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.send(table);
        res.json(results);
        // res.send(table)

    });


});

app.post('/MostWanted', function (req, res) {
    // connection.query("Select aadhar from Person", (err, result) => {

    //     if (err)
    //         console.log("Error");
    //     else{
    //     console.log(result);
    //     }
    // });
    connection.query('select person.firstname,person.lastname,person.mobNumber,T2.c from person,(select violatorAadhar as VA,count(Billid) as c from violation group by violatorAadhar) as T2 where person.aadhar=T2.VA order by T2.c desc;', function (error, results, fields) {
        if (error) throw error;

        // console.log(table);
        // res.json(results);
        // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.send(table);
        res.send(results);
        // res.send(table)

    });

});




//Adding Violation to the Database
app.post('/AddViolationEntry', function(req, res) {
    data = req.body;
    var aadhar = data.violatorAadhar;
    var officerID = data.officerInChargeID;
    var type = data.type;

    var count=0;
    connection.query("Select aadhar from Person where aadhar = ?", [aadhar], (err, result) => {
        if (err)
            console.log("Error");

        // console.log(result);
        if (result.length == 0) {
            res.send("DNE");
            console.log("gone");
        } else {
            count=count+1;
            console.log("Adhar okay");
        }
    });

    var colList = [
        type, officerID, aadhar
    ];

    connection.query("Insert into Violation (type, officerInChargeID, violatorAadhar) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            } else {
                count = count + 1;
                if(count==2)
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
app.post('/AccidentEntry', function(req, res) {
    data = req.body;
    var accidentID = data.accid;
    var casualties = data.cas;
    var timeOfAccident = data.time;
    var location = data.location;
    var cause = data.cause;
    var officerInChargeID = data.uname;
    var lpn = data.lpn;


    //TODO: Check if the lpn is valid code to be added here.

    var colList = [
        accidentID,
        casualties,
        cause,
        location,
        officerInChargeID,
        timeOfAccident
    ];

    var colList2 = [
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
            } else {
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
            } else {
                res.send("success");
            }
        }
    });
});



//Adding Licence to the database
app.post('/DebugAddLicence', function(req, res) {
    data = req.body;
    var licenceid = data.licenceid;
    var licenceIssueDate = data.licenceIssueDate;
    var licenceExpiryDate = data.licenceExpiryDate;
    var AadharNum = data.AadharNum;

    var colList = [
        licenseID, licenseIssueDate, licenseExpiryDate, aadhar
    ];


    connection.query("Insert into license (licenseID,licenseIssueDate,licenseExpiryDate,aadhar) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            } else {
                res.send("success");
            }
        }
    });
});


//Adding Vehicle to the database
app.post('/DebugAddVehicle', function(req, res) {
    data = req.body;
    var lpn = data.lpn;
    var model = data.model;
    var insuranceCheck = data.insuranceCheck;
    var pollutionCheck = data.pollutionCheck;
    var AadharNum = data.AadharNum;

    var colList = [
        lpn, model, insuranceCheck, pollutionCheck
    ];

    var colList2 = [
        lpn, AadharNum
    ];
    var count=0;
    connection.query("Insert into vehicle (lpn,model,insuranceCheck,pollutionCheck) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            } else {
                count=count+1;
            }
        }
    });
    connection.query("Insert into vehicle_owner (lpn,ownerAadhar) Values (?)", [colList2], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            } else {
                count=count+1;
                if (count == 2)
                    res.send("success");
            }
        }
    });

    
});




//Adding Vehicle Model to the database
app.post('/DebugAddModel', function(req, res) {
    data = req.body;
    var model = data.model;
    var manufacturer = data.manufacturer;

    var colList = [
        model, manufacturer
    ];

    connection.query("Insert into model_manufacturer (model,manufacturer) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            } else {
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
app.post('/DebugAddPerson', function(req, res) {
    data = req.body;
    var aadhar = data.AadharNum,
        type = data.Type;
    var firstname = data.FirstName;
    var lastname = data.LastName;
    var pincode = data.pincode;
    var mobileno = data.MobileNo;
    var dob = data.dob;
    var licenceid = data.LicenceID;
    var email = data.Email;

    var colList = [
        aadhar, firstname, lastname, dob, pincode, mobileno, email, licenceid
    ];

    connection.query("Insert into Person (aadhar,firstname,lastname,dob,pincode,mobNumber,email,licenseId) Values (?)", [colList], (err, result) => {
        if (err)
            console.log(err);
        else {
            if (err) {
                res.send("fail");
                throw err;
            } else {
                res.send("success");
            }
        }
    });
});


//OfficerLogin
app.post('/Login', function(req, res) {
    console.log("addUser was invoked");
    data = req.body;
    var user = data.uname,
        pass = data.password;
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
app.listen(8081); {
    console.log("Listening to 8081");
}