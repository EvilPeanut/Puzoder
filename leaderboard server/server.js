"use strict";
const path = require('path');
var port = 1336;
process.title = 'Puzoder Leaderboard Server';
var fs = require('fs');

// Leaderboard Data
var leaderboardData = [];

// Load the saved data
fs.readFile('leaderboard.dat', function (err, data) {
    if (err) {
        fs.writeFile('leaderboard.dat', JSON.stringify([{score: 0, player: 'Player'}, {score: 0, player: 'Player'}, {score: 0, player: 'Player'}]), function (err) {
            if (err) return console.log(err);
        });
    } else {
        leaderboardData = JSON.parse(data.toString());
    }
});

// Server
var webSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {});
server.listen(port, function() {
    console.log(getTime() + " Leaderboard server listening on port " + port);
});

var wsServer = new webSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);

    // Handle received messages
    connection.on('message', function(message) {
        try {
            var json = JSON.parse(message.utf8Data);
        } catch (e) {
            console.log('Invalid JSON: ', message.utf8Data);
            return;
        }
        try {
            //
            // Packet 0 - When a player requests the leaderboard
            //
            if (json.type === '0') {
                var messageJSON = JSON.stringify({type:'0', leaderboard: getTopThree()});
                connection.sendUTF(messageJSON);
            //
            // Packet 1 - When a player submits a score
            //
            } else if (json.type === '1') {
                leaderboardData.push({player: json.player, score: json.score});
                saveLeaderboard();
            }
        } catch (error) {
            console.log(error);
        }
    });
});

//
// Return time in human format ([hh:mm:ss])
//
function getTime() {
	var date = new Date();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return("[" + hour + ":" + min + ":" + sec + "]");
}

//
// Save the leaderboard data
//
function saveLeaderboard() {
    fs.writeFile('leaderboard.dat', JSON.stringify(leaderboardData), function (err) {
        if (err) return console.log(err);
    });
}

//
// Get the top three players
//
function getTopThree() {
    var firstPlayer = {player: 'Player', score: 0};
    var secondPlayer = {player: 'Player', score: 0};
    var thirdPlayer = {player: 'Player', score: 0};

    for ( var i = 0; i < leaderboardData.length; i++ ) {
        var data = leaderboardData[i];

        if (data.score > firstPlayer.score) {
            thirdPlayer = secondPlayer;
            secondPlayer = firstPlayer;
            firstPlayer = data;
        } else if (data.score > secondPlayer.score) {
            thirdPlayer = secondPlayer;
            secondPlayer = data;
        } else if (data.score > thirdPlayer.score) {
            thirdPlayer = data;
        }
    }

    return {
        firstPlayer: firstPlayer,
        secondPlayer: secondPlayer,
        thirdPlayer: thirdPlayer
    };
}