const app = require("express")();
var mysql = require('mysql');
const cors = require('cors');
app.use(cors());

const SELECT_ALL_CLASSES = 'SELECT * FROM classes_db.classes;';
const SELECT_ALL_USERCLASSES = 'SELECT * FROM classes_db.userclasses;';


var connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "password",
database: "classes_db",
port: "3306"
});



connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
 
app.get('/',(req,res) => {
    res.send("/classes ")
});

app.get('/classes', (req,res) => {
    connection.query(SELECT_ALL_CLASSES, (err,results) => {
        if(err){
           return res.send(err) 
        }
        else{
            res.json({
                data: results
            })
        }
    });
});
app.get('/userclasses', (req,res) => {
    connection.query(SELECT_ALL_USERCLASSES, (err,results) => {
        if(err){
           return res.send(err) 
        }
        else{
            res.json({
                data: results
            })
        }
    });
});

app.get('/classes/add',(req,res) => {
    //const {userclass,a,b,c,d,e,classtime,f,g,h,i,j,k,l,m,n,o,p,q} = req.query;
    const {userclass,classtime,days,title,endtime} = req.query;
    const INSERT_CLASSES_QUERY = `INSERT INTO classes_db.userclasses(class_id,classtime,days,title,endtime) VALUES('${userclass}','${classtime}','${days}','${title}','${endtime}')`;
    connection.query(INSERT_CLASSES_QUERY, (err,result) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.send("success user class added")
        }
    });
});

const port = process.env.PORT || 5000;

app.listen(port);
 
console.log("app on port " + port);