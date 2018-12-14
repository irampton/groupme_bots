const books = [
    {"text" : ["1 nephi", "1st nephi"], "name" : "1 Nephi","path" : "/bofm/1-ne"},
    {"text" : ["2 nephi", "2nd nephi"], "name" : "2 Nephi","path" : "/bofm/2-ne"},
    {"text" : ["jacob"], "name" : "Jacob","path" : "/bofm/jacob"},
    {"text" : ["enos"], "name" : "Enos","path" : "/bofm/enos"},
    {"text" : ["jarom"], "name" : "Jarom","path" : "/bofm/jarom"},
    {"text" : ["omni"], "name" : "Omni","path" : "/bofm/omni"},
    {"text" : ["words of mormon"], "name" : "Words of Mormon","path" : "/bofm/w-of-m"},
    {"text" : ["mosiah"], "name" : "Mosiah","path" : "/bofm/mosiah"},
    {"text" : ["alma"], "name" : "Alma","path" : "/bofm/alma"},
    {"text" : ["helaman"], "name" : "Helaman","path" : "/bofm/hel"},
    {"text" : ["3 nephi", "3rd nephi"], "name" : "3 Nephi","path" : "/bofm/3-ne"},
    {"text" : ["4 nephi", "4th nephi"], "name" : "3 Nephi","path" : "/bofm/4-ne"},
    {"text" : ["mormon"], "name" : "Mormon","path" : "/bofm/morm"},
    {"text" : ["ether"], "name" : "Ether","path" : "/bofm/ether"},
    {"text" : ["moroni"], "name" : "Moroni","path" : "/bofm/moro"},
    {"text" : ["d&c", "d & c", "doctrine and covenants"], "name" : "D&C","path" : "/dc-testament/dc"},
];

const request = require('request');
const cheerio = require('cheerio');
const https = require('https');
const GroupMe = require('groupme');
const API = GroupMe.Stateless;

let text = "";
const BOT_NAME = "";
const GROUP_ID = "";
let bot_id = "";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.post('/', function (req, res) {
    res.status(200);
    res.send();
    res.end();
    let msg = req.body;
    console.log("Received message: " + msg.name + ": " + msg.text);
    if(true) {
        if (bot_id && msg.name !== BOT_NAME && msg.group_id === GROUP_ID) {
            text = "";
            let pic = {};
            let go = false;
            const txt = msg.text.toLowerCase();

            //scripture bot
            for(let g = 0;g < books.length;g++) {
                for(let h = 0;h < books[g].text.length;h++) {
                    if (txt.search(new RegExp(books[g].text[h] + " [0-9]+:[0-9]+","g")) > -1) {
                        let chapter = txt.slice(txt.search(new RegExp(books[g].text[h] + " [0-9]+:","g")) + books[g].text[h].length + 1, txt.search(/:[0-9]+/));
                        let verse = txt.match(/[0-9]+:[0-9,-]+/)[0].slice(1);
                        let spot = chapter + "." + verse;
                        let url = "https://www.lds.org/scriptures" + books[g].path + "/" + spot +"?lang=eng";
                        //console.log(url);
                        request(url, function (error, response, body) {
                            //console.log('body:', body);
                            const $ = cheerio.load(body);
                            let path = $('.highlight');
                            let t = "";
                            for (let i = 0; i < path.length; i++) {
                                for (let j = 0; j < path[i].children.length; j++) {
                                    if (path[i].children[j].data) {
                                        t += path[i].children[j].data;
                                    } else if (path[i].children[j].name === "span" && path[i].children[j].children[0]) {
                                        if(path[i].children[j].children[0].data) {
                                            t += "\n" + path[i].children[j].children[0].data + ": ";
                                        }else if(path[i].children[j].children[0].children[0]){
                                            t += path[i].children[j].children[0].children[0].data;
                                        }
                                    } else if (path[i].children[j].name === "a" && path[i].children[j].children[1]) {
                                        t += path[i].children[j].children[1].data;
                                    }
                                }
                            }
                            let output = books[g].name + " " + chapter + "\n" + t;
                            //console.log(output);
                            sendMSG(output);
                        });
                    }
                }
            }
        }
    }
});

function sendMSG(msg) {
    API.Bots.post(
        ACCESS_TOKEN, // Identify the access token
        bot_id, // Identify the bot that is sending the message
        msg, // Construct the message
        {}, // No pictures related to this post
        function (err, res) {
            if (err) {
                console.log("[API.Bots.post] Reply Message Error!");
            } else {
                console.log("[API.Bots.post] Reply Message Sent!");
            }
        });
}

app.listen(8080);
console.log('running on port 8080');

