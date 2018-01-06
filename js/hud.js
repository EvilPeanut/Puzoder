PUZODER.HUD = class HUD {
	setTime(time) {
		var mins = Math.floor( time / 60 );
		var secs = time % 60;
		$( "#hud_time_text" ).text( mins + ":" + (secs < 10 ? "0" + secs : secs) );
	}

	showTime() {
		$( "#hud_time" ).fadeIn( 400 );
	}

	hideTime() {
		$( "#hud_time" ).fadeOut( 400 );
	}
}

var HUD = new PUZODER.HUD();