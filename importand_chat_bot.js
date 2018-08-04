/**
 * Created by IRamp on 8/5/2016.
 */
const https = require('https');
const GroupMe = require('groupme');
const API = GroupMe.Stateless;

let text = "";
const BOT_NAME = "Anti-Spam Machine";
const GROUP_ID = "40307697";
let bot_id = "b8a0921a0e9c465f7ba18d6506";

const acro = require("./ib/acro.json");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

let msg_counter = {"id": 0, "count" : 0};

//message counter

app.post('/', function (req,res) {
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
    if(true) {
        if (bot_id && msg.name !== BOT_NAME && msg.group_id === GROUP_ID) {
            text = "";
            let pic = {};
            let go = false;
            const txt = msg.text.toLowerCase();
            //acronyms
            /*for(let i = 0;i < acro.length; i++){
                if(txt.includes(acro[i].acro)){
                    sendMSG(acro[i].txt);
                }
            }*/
            switch (txt) {
                case ".leaderboard":
                    let lead = msgCounter.sort(compareCounter);
                    console.log(lead);
                    text = "";
                    for (let i = 0; i < lead.length; i++) {
                        text += lead[i].name + ':\t\t\t' + lead[i].count + "\n";}
                    go = true;
                    break;

            }

        }
    }
    res.status(200);
    res.send();
});
function sendMSG(msg){
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
app.listen(32022);
console.log('running on port 32022');
