

const mysql = require("mysql")
const express = require("express");
const app = express();
const path = require("path");
var dateFormat = require("dateformat");
var today = new Date();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var splitStr = new Array;
var submittedStr = "the keywords i searched for";
var combinedStr = "the keywords reforged";
var minDate = "the start date i searched for";
var maxDate = "the end date i searched for";
var maxPrice = 6000;

app.engine("pug", require("pug").__express);

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.set("public", path.join(__dirname, "public"));

app.use(express.static("views", { "extensions":["htm", "html"]}));

app.use(express.static("public"));



app.use(bodyParser.urlencoded({ extended: false} ));

mongoose.connect('mongodb://localhost:27017/myworkshop', { useNewUrlParser: true , useUnifiedTopology : true });
//myworkshop is the database name


console.log('connected to DB!');


//create a data schema

const custSchema = {
    fname: String,
    lname: String,
    address: String,
    city: String,
    province: String,
    country: String,
    postalcode: String,
    homephone: String,
    busphone: String,
    email: String
}

const cust = mongoose.model("customers", custSchema); //customers is the collection name


app.get("/registration", (req, res) => {
    res.sendFile(__dirname + "/registration")
});

//Submitting Registration Form data
app.post("/send-registration", (req, res) =>{
    let newCust = new cust({
        fname: req.body.fname,
        lname: req.body.lname,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        postalcode: req.body.postalcode,
        homephone: req.body.homephone,
        busphone: req.body.busphone,
        email: req.body.email,
    });
    newCust.save();
    res.redirect('/thank2');
})

app.get("/", (req, res) => {
    res.render("index");
});



// Directory Page
app.get("/directory", (req, res) => {

    // Agency List Array and Agents List Array
    var agencyList = [];    

    // Connection Variable
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });

    // Connection to MySQL
    conn.connect((err) => {
        if (err) throw err;

    // SQL Command Variable
    var sql = `SELECT agencies.*, agents.* FROM agencies JOIN agents WHERE agencies.AgencyId=agents.AgencyId ORDER BY agents.AgtLastName`;

    // Agency and Agents Table Query
    conn.query(sql, (err, rows, fields) => {
        if (err) throw err;
        function nullTest(x) {
            if (x == null) {
                return "";
            } else {
                return x;
            }
        }
        for (var i = 0; i < rows.length; i++) {
            var agency = {
                AgencyId: rows[i].AgencyId,
                AgncyAddress: rows[i].AgncyAddress, 
                AgncyCity: rows[i].AgncyCity, 
                AgncyProv: rows[i].AgncyProv, 
                AgncyPostal: rows[i].AgncyPostal, 
                AgncyCountry: rows[i].AgncyCountry, 
                AgncyPhone: rows[i].AgncyPhone,
                AgncyFax: rows[i].AgncyFax,
                // Agents
                AgtFirstName: rows[i].AgtFirstName,
                AgtLastName: rows[i].AgtLastName,
                AgtMiddleInitial: nullTest(rows[i].AgtMiddleInitial),
                AgtBusPhone: rows[i].AgtBusPhone,
                AgtEmail: rows[i].AgtEmail,
                AgtPosition: rows[i].AgtPosition
                

            }
            // Add object into array
            agencyList.push(agency);
        }
        // Render to contact
        res.render("directory", {'agencyList': agencyList});

        // End Connection
        conn.end((err) => {
            if (err) throw err;
        }); // Connection Disconnect End
    }); // Connection Query End
    }); // MySQL Connection End
}); // Route Handler End (Contact)


//Contact page with agencies and agents.
app.get("/contact", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sqlAgencies = `SELECT AgencyId as Column1, AgncyAddress as Column2, AgncyCity as Column3, AgncyProv as Column4, AgncyPostal as Column5, AgncyCountry as Column6, AgncyPhone as Column7, AgncyFax as Column8, null as Column9, null as Column10, null as Column11, null as Column12, null as Column13 FROM agencies UNION SELECT AgencyId as Column1, null as Column2, null as Column3, null as Column4, null as Column5, null as Column6, null as Column7, null as Column8, AgtFirstName as Column9, AgtMiddleInitial as Column10, AgtLastName as Column11, AgtBusPhone as Column12, AgtEmail as Column13 FROM agents ORDER BY Column1, Column11`;
        conn.query(sqlAgencies, (err, result, fields) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>");
            res.write("<html xmlns='http://www.w3.org/1999/xhtml'>");
            res.write("<head><title>Contact Us</title>");
            res.write("<link href='http://fonts.googleapis.com/css?family=Varela' rel='stylesheet' />");
            res.write("<link href='styles.css' rel='stylesheet' type='text/css' media='all' />");
            res.write("<link href='fonts.css' rel='stylesheet' type='text/css' media='all' />");
            res.write("<style>");
            res.write("table, td, th, tr {border: 1px solid black;}");
            res.write(".packageID {text-align: center;}");
            res.write(".packageName {text-align: center;}");
            res.write(".packagePrice {text-align: center;}");
            res.write("</style>");
            res.write("<div id='wrapper'>");
            res.write("<div id='header-wrapper'>");
            res.write("<div id='header' class='container'>");
            res.write("<div id='logo'>");
            res.write("<h1><a href='/'>Travel Experts</a></h1>");
            res.write("</div>");
            res.write("<div id='menu'>");
            res.write("<ul>");
            res.write("<li><a href='/' accesskey='1' title=''>Home</a></li>");
            res.write("<li><a href='/packages' accesskey='2' title=''>Vacation Packages</a></li>");
            res.write("<li><a href='/registration' accesskey='3' title=''>Registration</a></li>");
            res.write("<li class='active'><a href='/contact' accesskey='4' title=''>Contact Us</a></li>");
            res.write("</ul>");
            res.write("</div>");
            res.write("</div>");
            res.write("</div>");
            res.write("<div id='banner'>");
            res.write("<div class='container'>");
            res.write("<div class='title'>");
            res.write("<h2>The Best Place To Explore The Globe</h2>");
            res.write("<span class='byline'>Travel & Vacation Packages</span> </div>");
            res.write("<ul class='actions'>");
            res.write("<li><a href='/packages' class='button'>View Packages</a></li>");
            res.write("</ul>");
            res.write("</div>");
            res.write("</div>");
            res.write("<div id='page' class='container'>");
            res.write("<div class=;'title'>");
            res.write("<h1>How to Contact Us:</h1>");
            res.write("<br>");
            var i = 1;
            for (listing of result) {
                var midName = "middle name";
                if (listing.Column10 = "null") {
                    midName = "";
                } else {
                    midName = listing.Column10 + " ";
                }
                if (listing.Column2 != null) {
                    res.write("<hr><br><h1>Office #" + i + "</h1>");
                    i++;
                    res.write("<h3>" + listing.Column2 + "</h3>");
                    res.write("<h3>" + listing.Column3 + ", "+ listing.Column4 + "</h3>");
                    res.write("<h3>" + listing.Column5 + "</h3>");
                    res.write("<h3>" + listing.Column6 + "</h3>");
                    res.write("<h3> Phone number: " + listing.Column7 + "</h3>");
                    res.write("<h3> Fax number:" + listing.Column8 + "</h3>");
                    res.write("<br>");
                }
                if (listing.Column9 != null) {
                    res.write("<h2>" + listing.Column9 + " " + midName + listing.Column11 + "</h2>");
                    res.write("<h3> Phone number: " + listing.Column12 + "</h3>");
                    res.write("<h3> Email: " + listing.Column13 + "</h3>");
                    res.write("<br>");
                }
            }
            res.write("</div>");
            res.write("</div>");
            res.write("</div>");
            res.write("</head>");
            res.write("<body>");
            res.write("<div id='copyright' class='container'>");
            res.write("<p><strong>Email:</strong> info@travelexperts.com | <strong>Phone:</strong> 555-555-5555 | <strong>Address:</strong> Calgary, AB. Canada</p>");
            res.write("<p>&copy; Travel Experts, All rights reserved.</p>");
            res.write("</div>");
            res.write("</body>");
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

app.get("/registration", (req, res) => {
    res.render("registration");
});

//Creating the vacation packages page:
app.get("/packages", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * FROM packages_ricky`;
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>");
            res.write("<html xmlns='http://www.w3.org/1999/xhtml'>");
            res.write("<head><title>Packages</title>");
            res.write("<link href='http://fonts.googleapis.com/css?family=Varela' rel='stylesheet' />");
            res.write("<link href='styles.css' rel='stylesheet' type='text/css' media='all' />");
            res.write("<link href='fonts.css' rel='stylesheet' type='text/css' media='all' />");
            res.write("<style>");
            res.write("table, td, th, tr {border: 1px solid black;}");
            res.write(".packageID {text-align: center;}");
            res.write(".packageName {text-align: center;}");
            res.write(".packagePrice {text-align: center;}");
            res.write("</style>");
            res.write("<div id='wrapper'>");
            res.write("<div id='header-wrapper'>");
            res.write("<div id='header' class='container'>");
            res.write("<div id='logo'>");
            res.write("<h1><a href='/'>Travel Experts</a></h1>");
            res.write("</div>");
            res.write("<div id='menu'>");
            res.write("<ul>");
            res.write("<li><a href='/' accesskey='1' title=''>Home</a></li>");
            res.write("<li class='active'><a href='/packages' accesskey='2' title=''>Vacation Packages</a></li>");
            res.write("<li><a href='/registration' accesskey='3' title=''>Registration</a></li>");
            res.write("<li><a href='/contact' accesskey='4' title=''>Contact Us</a></li>");
            res.write("</ul>");
            res.write("</div>");
            res.write("</div>");
            res.write("</div>");
            res.write("<div id='banner'>");
            res.write("<div class='container'>");
            res.write("<div class='title'>");
            res.write("<h2>The Best Place To Explore The Globe</h2>");
            res.write("<span class='byline'>Travel & Vacation Packages</span> </div>");
            res.write("<ul class='actions'>");
            res.write("<li><a href='/search' class='button'>Filter Packages</a></li>");
            res.write("</ul>");
            res.write("</div>");
            res.write("</div>");
            res.write("<br />");
            res.write("<br />");
            res.write("<table border='1'>");
            res.write("<tr>");
            res.write("<th>Package Number</th>");
            res.write("<th>Package Name</th>");
            res.write("<th>Start Date</th>");
            res.write("<th>End Date</th>");
            res.write("<th>Description</th>");
            res.write("<th>Price</th>");
            res.write("<th>Order Now!</th>");
            res.write("</tr>");
            for (package of result) {
                if (today < package.PkgEndDate) {
                    res.write("<tr>");
                    res.write("<td class='packageID'>" + package.PackageId + "<img src='" + package.picName + "' width='200'></td>");
                    res.write("<td class='packageName'><b>" + package.PkgName + "</b></td>");
                    if (today >= package.PkgStartDate) {
                        res.write("<td style='color:red'><b>" + dateFormat(package.PkgStartDate, "fullDate") + "</b></td>");
                    } else {
                        res.write("<td>" + dateFormat(package.PkgStartDate, "fullDate") + "</td>");
                    }
                    res.write("<td>" + dateFormat(package.PkgEndDate, "fullDate") + "</td>");
                    res.write("<td>" + package.PkgDesc + "</td>");
                    res.write("<td class='packagePrice'>$" + package.PkgBasePrice + "</td>");
                    res.write("<td><input type=button onclick='location.href=\"order" + package.PackageId + "\"' type='button' value='ORDER NOW'></td>");
                    res.write("</tr>");
                } 
            }
            res.write("</table>");
            res.write("<br>");
            res.write("</div>");
            res.write("</head>");
            res.write("<body>");
            res.write("<div id='copyright' class='container'>");
            res.write("<p><strong>Email:</strong> info@travelexperts.com | <strong>Phone:</strong> 555-555-5555 | <strong>Address:</strong> Calgary, AB. Canada</p>");
            res.write("<p>&copy; Travel Experts, All rights reserved.</p>");
            res.write("</div>");
            res.write("</body>");
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

//Rendering order form for package #1
app.get("/order1", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * FROM packages_ricky WHERE PackageId = 1`;
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            for (package of result) {
            res.render("order", { PackageId: package.PackageId , PkgName: package.PkgName , 
                PkgStartDate: package.PkgStartDate , PkgEndDate: package.PkgEndDate , 
                PkgDesc: package.PkgDesc, PkgBasePrice: package.PkgBasePrice });
            }
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

//Rendering order form for package #2
app.get("/order2", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * FROM packages_ricky WHERE PackageId = 2`;
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            for (package of result) {
            res.render("order", { PackageId: package.PackageId , PkgName: package.PkgName , 
                PkgStartDate: package.PkgStartDate , PkgEndDate: package.PkgEndDate , 
                PkgDesc: package.PkgDesc, PkgBasePrice: package.PkgBasePrice });
            }
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

//Rendering order form for package #3
app.get("/order3", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * FROM packages_ricky WHERE PackageId = 3`;
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            for (package of result) {
            res.render("order", { PackageId: package.PackageId , PkgName: package.PkgName , 
                PkgStartDate: package.PkgStartDate , PkgEndDate: package.PkgEndDate , 
                PkgDesc: package.PkgDesc, PkgBasePrice: package.PkgBasePrice });
            }
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

//Rendering order form for package #4
app.get("/order4", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * FROM packages_ricky WHERE PackageId = 4`;
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            for (package of result) {
            res.render("order", { PackageId: package.PackageId , PkgName: package.PkgName , 
                PkgStartDate: package.PkgStartDate , PkgEndDate: package.PkgEndDate , 
                PkgDesc: package.PkgDesc, PkgBasePrice: package.PkgBasePrice });
            }
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

//Rendering order form for package #5
app.get("/order5", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * FROM packages_ricky WHERE PackageId = 5`;
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            for (package of result) {
            res.render("order", { PackageId: package.PackageId , PkgName: package.PkgName , 
                PkgStartDate: package.PkgStartDate , PkgEndDate: package.PkgEndDate , 
                PkgDesc: package.PkgDesc, PkgBasePrice: package.PkgBasePrice });
            }
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

//Rendering order form for package #6
app.get("/order6", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * FROM packages_ricky WHERE PackageId = 6`;
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            for (package of result) {
            res.render("order", { PackageId: package.PackageId , PkgName: package.PkgName , 
                PkgStartDate: package.PkgStartDate , PkgEndDate: package.PkgEndDate , 
                PkgDesc: package.PkgDesc, PkgBasePrice: package.PkgBasePrice });
            }
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

//Rendering order form for package #7
app.get("/order7", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `SELECT * FROM packages_ricky WHERE PackageId = 7`;
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            for (package of result) {
            res.render("order", { PackageId: package.PackageId , PkgName: package.PkgName , 
                PkgStartDate: package.PkgStartDate , PkgEndDate: package.PkgEndDate , 
                PkgDesc: package.PkgDesc, PkgBasePrice: package.PkgBasePrice });
            }
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

app.use(express.urlencoded({ extended: true }));

//Submitting Order Form data
app.post("/send-order", (req, res) => {
    let now = new Date();
    let date = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let year = now.getFullYear();
    var today = (year + "-" + month + "-" + date);
    var fname = req.body.fname;
    var lname = req.body.lname;
    var phone = req.body.phone;
    var email = req.body.email;
    var creditCardName = req.body.creditCardName;
    var creditCardNumber = req.body.creditCardNumber;
    var expiryMonth = req.body.expiryMonth;
    var expiryYear = req.body.expiryYear;
    var ccv = req.body.ccv;
    var mailingAddress = req.body.mailingAddress;
    var mailingCity = req.body.mailingCity;
    var mailingProvince = req.body.mailingProvince;
    var postalCode = req.body.postalCode;
    var packageNumber = req.body.packageNumber;
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var sql = `INSERT INTO orders (orderNumber, orderedDate, fname, lname, phone, email, creditCardName, creditCardNumber, expiryMonth, expiryYear, ccv, mailingAddress, mailingCity, mailingProvince, postalCode, packageNumber) VALUES (NULL, '${today}', '${fname}', '${lname}', '${phone}', '${email}', '${creditCardName}', '${creditCardNumber}', '${expiryMonth}', '${expiryYear}', '${ccv}', '${mailingAddress}', '${mailingCity}', '${mailingProvince}', '${postalCode}', '${packageNumber}')`;
        conn.query(sql, (err, data) => {
            if (err) throw err;
            console.log("Record submitted");
            conn.end((err) => {
                if (err) throw err;
            });
        });
    });    
    res.redirect("/thank1");
});

//Submitting package-filtering data
app.post("/send-search", (req, res) => {
    submittedStr = req.body.entered_string;
    splitStr = submittedStr.split(" ");
    combinedStr = splitStr.join("%' OR keywords LIKE '%");
    maxPrice = req.body.maxPrice;
    minDate = req.body.minDate;
    maxDate = req.body.maxDate;
    res.redirect("/searchresults");
});

//Rendering search results
app.get("/searchresults", (req, res) => {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "travelexperts"
    });
    conn.connect((err) => {
        if (err) throw err;
        var minDateTranslated = "minDate portion of SQL query";
        if (minDate == "") {
            minDateTranslated = "";
        } else {
            minDateTranslated = " AND PkgStartDate >= '" + minDate + "'";
        }
        var maxDateTranslated = "maxDate portion of SQL query";
        if (maxDate == "") {
            maxDateTranslated = "";
        } else {
            maxDateTranslated = " AND PkgStartDate <= '" + maxDate + "'";
        }
        var sql = "SELECT * FROM packages_ricky WHERE PkgBasePrice <= " + maxPrice + " AND (keywords LIKE '%" + combinedStr + "%')" + minDateTranslated + maxDateTranslated + " ORDER BY PkgStartDate";
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>");
            res.write("<html xmlns='http://www.w3.org/1999/xhtml'>");
            res.write("<head><title>Search Results</title>");
            res.write("<link href='http://fonts.googleapis.com/css?family=Varela' rel='stylesheet' />");
            res.write("<link href='styles.css' rel='stylesheet' type='text/css' media='all' />");
            res.write("<link href='fonts.css' rel='stylesheet' type='text/css' media='all' />");
            res.write("<style>");
            res.write("table, td, th, tr {border: 1px solid black;}");
            res.write(".packageID {text-align: center;}");
            res.write(".packageName {text-align: center;}");
            res.write(".packagePrice {text-align: center;}");
            res.write("</style>");
            res.write("<div id='wrapper'>");
            res.write("<div id='header-wrapper'>");
            res.write("<div id='header' class='container'>");
            res.write("<div id='logo'>");
            res.write("<h1><a href='/'>Travel Experts</a></h1>");
            res.write("</div>");
            res.write("<div id='menu'>");
            res.write("<ul>");
            res.write("<li><a href='/' accesskey='1' title=''>Home</a></li>");
            res.write("<li class='active'><a href='/packages' accesskey='2' title=''>Vacation Packages</a></li>");
            res.write("<li><a href='/registration' accesskey='3' title=''>Registration</a></li>");
            res.write("<li><a href='/contact' accesskey='4' title=''>Contact Us</a></li>");
            res.write("</ul>");
            res.write("</div>");
            res.write("</div>");
            res.write("</div>");
            res.write("<div id='banner'>");
            res.write("<div class='container'>");
            res.write("<div class='title'>");
            res.write("<h2>The Best Place To Explore The Globe</h2>");
            res.write("<span class='byline'>Travel & Vacation Packages</span> </div>");
            res.write("<ul class='actions'>");
            res.write("<li><a href='/search' class='button'>Start another search</a></li>");
            res.write("<li><a href='/packages' class='button'>View All Packages</a></li>");
            res.write("</ul>");
            res.write("</div>");
            res.write("</div>");
            res.write("<br />");
            res.write("<br />");
            res.write("<p>Keywords: <b>" + submittedStr + "</b></p>");
            res.write("<p>Packages under: <b>$" + maxPrice + "</b></p>");
            res.write("<p>Starting after: <b>" + minDate + "</b></p>");
            res.write("<p>Ending before: <b>" + maxDate + "</b></p>");
            res.write("<br />");
            res.write("<br />");
            res.write("<table border='1'>");
            res.write("<tr>");
            res.write("<th>Package Number</th>");
            res.write("<th>Package Name</th>");
            res.write("<th>Start Date</th>");
            res.write("<th>End Date</th>");
            res.write("<th>Description</th>");
            res.write("<th>Price</th>");
            res.write("<th>Order Now!</th>");
            res.write("</tr>");
            for (package of result) {
                if (today < package.PkgEndDate) {
                    res.write("<tr>");
                    res.write("<td class='packageID'>" + package.PackageId + "<img src='" + package.picName + "' width='200'></td>");
                    res.write("<td class='packageName'><b>" + package.PkgName + "</b></td>");
                    if (today >= package.PkgStartDate) {
                        res.write("<td style='color:red'><b>" + dateFormat(package.PkgStartDate, "fullDate") + "</b></td>");
                    } else {
                        res.write("<td>" + dateFormat(package.PkgStartDate, "fullDate") + "</td>");
                    }
                    res.write("<td>" + dateFormat(package.PkgEndDate, "fullDate") + "</td>");
                    res.write("<td>" + package.PkgDesc + "</td>");
                    res.write("<td class='packagePrice'>$" + package.PkgBasePrice + "</td>");
                    res.write("<td><input type=button onclick='location.href=\"order" + package.PackageId + "\"' type='button' value='ORDER NOW'></td>");
                    res.write("</tr>");
                } 
            }
            res.write("</table>");
            res.write("<br />");
            res.write("<p>Don't see what you're looking for? Check your spell, or change the dates/price range!</p>");
            res.write("<br>");
            res.write("</div>");
            res.write("</head>");
            res.write("<body>");
            res.write("<div id='copyright' class='container'>");
            res.write("<p><strong>Email:</strong> info@travelexperts.com | <strong>Phone:</strong> 555-555-5555 | <strong>Address:</strong> Calgary, AB. Canada</p>");
            res.write("<p>&copy; Travel Experts, All rights reserved.</p>");
            res.write("</div>");
            res.write("</body>");
            combinedStr = "reset";
            maxPrice = 0;
            minDateTranslated = "reset";
            maxDateTranslated = "reset";
            conn.end((err) => {
                if (err) throw err;
                res.end();
            });
        });
    });
});

app.use((req, res, next) => {
      res.status(404).render("404");
});

app.listen(8000, () => {
    require("log-timestamp");
    console.log("Server started on port 8000");
});