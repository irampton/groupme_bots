/**
 * Created by IRamp on 8/5/2016.
 */
const https = require('https');
const GroupMe = require('groupme');
const API = GroupMe.Stateless;

let text = "";
const BOT_NAME = "";
const GROUP_ID = "";
let bot_id = "";

const eight = ["yes", "no", "maybe", "I would not count on it", "count on it", "h*ck yeah", "h*ck no"];
const acro = require("./uib/acro.json");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.post('/', function (req, res) {
    let msg = req.body;
    console.log("Received message: " + msg.name + ": " + msg.text);
    //message counter
    let flag = false;
    for (let i = 0; i < msgCounter.length; i++) {
        if (msgCounter[i].id === msg.user_id) {
            flag = true;
            msgCounter[i].name = msg.name;
            msgCounter[i].count++;
            pushCount(msgCounter);
        }
    }
    if (!flag) {
        msgCounter.push({"name": msg.name, "id": msg.user_id, "count": 1});
        pushCount(msgCounter);
    }
    if (true) {
        if (bot_id && msg.name !== BOT_NAME && msg.group_id === GROUP_ID) {
            text = "";
            let pic = {};
            let go = false;
            const txt = msg.text.toLowerCase();
            //acronyms
            for (let i = 0; i < acro.length; i++) {
                if (txt.includes(acro[i].acro)) {
                    sendMSG(acro[i].txt);
                }
            }
            //commands
            switch (txt) {
                case "!heck":
                    text = "!heck | m Euphoric";
                    go = true;
                    break;
                case "stap":
                    text = "Stop that right now Mister!";
                    go = true;
                    break;
                case "lol":
                    text = "lel";
                    go = true;
                    break;
                case "lel":
                    text = "lol";
                    go = true;
                    break;
                case "!boi":
                    text = "https://cdn.discordapp.com/attachments/355804716321603586/377308998648725504/inhalegull.png";
                    go = true;
                    break;
                case "same":
                    text = "same";
                    go = true;
                    break;
                case "i agree":
                    text = "I concur too";
                    go = true;
                    break;
                case "you're welcome":
                case "thank":
                case "thanks":
                case "thx":
                    text = "https://www.youtube.com/watch?v=79DijItQXMM";
                    go = true;
                    break;
                case "oh no":
                    text = "oh yes";
                    go = true;
                    break;
                case "eight ball":
                    text = eight[Math.floor(Math.random() * eight.length)];
                    go = true;
                    break;
                case "ha":
                    text = "ha ha ha";
                    go = true;
                    break;
                case ".leaderboard":
                    let lead = msgCounter.sort(compareCounter);
                    console.log(lead);
                    text = "";
                    for (let i = 0; i < lead.length; i++) {
                        text += lead[i].name + ':\t\t\t' + lead[i].count + "\n";
                    }
                    go = true;
                    break;

            }
            if(txt.contains("when you"){
               text = "lol me too 😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂"
               go = true;
             }
            if (txt.indexOf("i'm") >= 0) {
                let space = 0;
                let spaceIndex;
                let t = "Larry";
                for (let i = txt.indexOf("i'm"); i < txt.length; i++) {
                    if (txt[i] === " ") {
                        space++;
                        if (space === 2) {
                            t = txt.slice(spaceIndex, i);
                        } else {
                            spaceIndex = i + 1;
                        }
                    } else if (i === txt.length - 1) {
                        t = txt.slice(spaceIndex, i + 1);
                    }
                }
                text = "Hi " + t + " I am a bot!";
                go = true;
            } else if (txt.indexOf("i am") >= 0) {
                let space = 0;
                let spaceIndex;
                let t = "Larry";
                for (let i = txt.indexOf("i am"); i < txt.length; i++) {
                    if (txt[i] === " ") {
                        space++;
                        if (space === 3) {
                            t = txt.slice(spaceIndex, i);
                        } else {
                            spaceIndex = i + 1;
                        }
                    } else if (i === txt.length - 1) {
                        t = txt.slice(spaceIndex, i + 1);
                    }
                }
                text = "Hi " + t + " I am a bot!";
                go = true;
            }
            if (go) {
                sendMSG(text);
            }
        }
    }
    res.status(200);
    res.send();
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

function pushCount(count) {
}

function compareCounter(a, b) {
    if (a.count < b.count)
        return -1;
    if (a.count > b.count)
        return 1;
    return 0;
}

//get counter
let msgCounter = [];
app.listen(32021);
console.log('running on port 32021');
