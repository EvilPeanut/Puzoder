var connection;

// Open connection to server
connection = new WebSocket("ws://localhost:1336");

connection.onopen = function() {
    getLeaderboard();
}

connection.onerror = function(error) {
    $( "#leaderboard_player_1" ).text( "Error loading the leaderboard" );
    $( "#leaderboard_player_2" ).text( "" );
    $( "#leaderboard_player_3" ).text( "" );
}

connection.onmessage = function(message) {
    try {
        var json = JSON.parse(message.data);
    } catch (e) {
        console.warn("Invalid json ", message.data);
        return;
    }

    //
    // Packet 0 - When the server sends the leaderboard
    //
    if (json.type === '0') {
        $( "#leaderboard_player_1" ).html( "#1 " + json.leaderboard.firstPlayer.player + '&emsp;&emsp;<img src="img/currency.png"> ' + json.leaderboard.firstPlayer.score );
        $( "#leaderboard_player_2" ).html( "#2 " + json.leaderboard.secondPlayer.player + '&emsp;&emsp;<img src="img/currency.png"> ' + json.leaderboard.secondPlayer.score );
        $( "#leaderboard_player_3" ).html( "#3 " + json.leaderboard.thirdPlayer.player + '&emsp;&emsp;<img src="img/currency.png"> ' + json.leaderboard.thirdPlayer.score );
    } else {
        console.warn("Unrecognised packet " + json.type + " recieved")
    }
}

function getLeaderboard() {
    connection.send(JSON.stringify({type: '0'}));
}