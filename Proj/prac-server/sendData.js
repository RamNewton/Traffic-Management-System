var express = require('express');
var cors = require('cors');
var app = express();
var mysql = require('mysql');
var md5 = require('md5');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'TrafficMgmt'
});

connection.connect();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get('/', function(req, res){
    console.log("I was invoked");
    data = {uname : "server", password : "why"};
    res.json(data);
})

app.post('/Login', function(req, res){
    console.log("addUser was invoked");
    data = req.body;
    var user = data.uname, pass = data.password;
    var values = [
        [user, pass]
    ];
    
    // connection.query()

    // connection.query("Insert into user (uname, password) Values ?", [values], (err, result) => {
    //     if(err) throw err;
    //     console.log("Number of rows affected" + result.affectedRows);
    // })

    connection.query("Select passwordHash from Officer where officerID = ?", [user], (err, result) =>{
        if(err)
            console.log(err)
        
        // console.log(result);
        if(result.length == 0)
            res.send("officerID not found");
        
        var hash = md5(pass);
        if(result[0].passwordHash == hash)
            res.send("success");
        else
            res.send("fail");
    })
})

app.post('/ViolationEntry', function(req, res){
    data = req.body;
    var aadhar = data.AadharNum, type = data.Type;
    var officerID = 454499;
    console.log(aadhar);
    console.log(type);

    connection.query("Select aadhar from Person where aadhar = ?", [aadhar], (err, result) =>{
        if(err)
            console.log(err)
        
        // console.log(result);
        if(result.length == 0)
        {
            res.send("DNE");
            return "gone";
        }
        else
        {
            console.log("Adhar okay");
        }
    })

    // var what = [
    //         connection.escape(type),
    //         connection.escape(officerID),
    //         connection.escape(aadhar),
    // ]

    var what = [
        type, officerID, aadhar
    ]

    connection.query("Insert into Violation (type, officerInChargeID, violatorAadhar) Values (?)", [what], (err, result) =>{
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
    })
})

app.listen(8081)
{
    console.log("Listening to 8081");
}