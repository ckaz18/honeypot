/**
Copyright (c) MapBox
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.
- Neither the name "MapBox" nor the names of its contributors may be
  used to endorse or promote products derived from this software without
  specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

(function () {
    'use strict';
    console.log("                       _________                        __________   \\      /      __________    ____________   ____________");
    console.log("       /      /       /        /        /|       /     /              \\    /      /         /   /           /       /");
    console.log("      /      /       /        /        / |      /     /                \\  /      /         /   /           /       /");
    console.log("     /      /       /        /        /  |     /     /                  \\/      /         /   /           /       /");
    console.log("    /______/       /        /        /   |    /     /----------         /      /_________/   /           /       /");
    console.log("   /      /       /        /        /    |   /     /                   /      /             /           /       /");
    console.log("  /      /       /        /        /     |  /     /                   /      /             /           /       /");
    console.log(" /      /       /        /        /      | /     /                   /      /             /           /       /");
    console.log("/      /       /________/        /       |/     /___________        /      /             /___________/       /");
    
    console.log("Loading HoneyPot Server..........");
    console.log("Loading Express");
    var express = require('express');
    var app = express();
    console.log("Loading FS");
    var fs = require("fs");
    console.log("SQLITE3");
    var dblite = require('sqlite3').verbose();
    var dbLocation = "HPTSERVER.db";
    console.log("Looking for DB at location: " + dbLocation);
    var dbExists = fs.existsSync(dbLocation);
//    var resultObject = {"success": "", "rows": [], totalCount: 0};
    
    if(dbExists){
        app.get('/plugins', function (req, res) {
            console.log("Plugins Accessed");
            console.log("Opening DB at location: " + dbLocation);
            var db = new dblite.Database(dbLocation);
            var resultObject = {"success": true, "rows": [], totalCount: 0};
            var selectCB = function (err, row) {
                console.log("Row", row);
                resultObject.rows.push(row);
                console.log("Result", resultObject);
                res.type('application/json');
                res.jsonp(resultObject);
                console.log("res");
                db.close();
                
            };
            
            var setTotalCount = function (err, row) {
                resultObject.totalCount = row.count;  
            };
            
            db.serialize(function(){
                
                db.get("select COUNT(*) as count from plugins", setTotalCount);
                db.all("Select * from plugins", selectCB);

            });
        });

        app.get('/plugins/:id', function (req, res) {
            //get plugin table :id 
            var db = new dblite.Database(dbLocation);
            console.log("Sever Pluggins Accessed From " + req.params.id);
            db.close();
            res.jsonp({name: req.params.id})
        });


        app.get('/plugins/:id/features', function (req, res) {
            //get plugin table :id Table Data
            var db = new dblite.Database(dbLocation);
            console.log("Sever Table " + req.params.id + "from IP " + req.ip);
            db.close();w
            res.jsonp({name: req.params.id})
        });


        var server = app.listen(443, function () {
        var host = server.address().address
        var port = server.address().port

        console.log("Honeypot HTTP SERVER Running on", port);

        });
    }else{
        console.log("DB was not found and the Server load was cancelled");
    }
}());
