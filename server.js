"use strict";

const fs = require("fs"); 
const express = require("express"); 
const app = express(); 
const ip = "127.0.0.1"; 
const port = 8081; 
let userdata;
const bodyParser = require('body-parser'); 

const models = require("./models");


models.sequelize.sync({force:true}).then(function() {

    models.User.bulkCreate([
        {
            username: "jessy",
            password: "1111",
        },
        {
            username: "luke",
            password: "2222",
        },
        {
            username: "odin",
            password: "3333",
        },
        {
            username: "loki",
            password: "4444",
        }
    ])
    .then(function(obj) {
        app.set('view engine', 'ejs'); 
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(express.static("public")); 

        app.post("/login", (req, res) => {
            let username = req.body.username;
            let password = req.body.password;

            models.User.findAll({
                raw: true, // nur dataValues zurückgeben
                attributes: ["id","username","password"],
                where: {
                    username: username,
                    password: password                    
                }
            })
            .then(function(obj) {
                userdata = {user: obj[0]};
                console.log(userdata);
                if(obj.length == 0) {
                    res.redirect("/");
                } else {
                    app.get("/welcome", (req, res) => { 
                     console.log(userdata);
                     console.log(obj);

                        if(userdata.user) res.render("welcome", userdata); 
                        else res.redirect("/");
                    });
                    res.redirect("/welcome");

                } 
            }
            )
        });

        app.get("/", (req, res) => { 
            res.render("index"); 
        });
            
        app.listen(port, ip, () => { 
            console.log(`Server running at http://${ip}:${port}/`); 
        }); 
    })
});