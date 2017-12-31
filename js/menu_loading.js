function setLoadingPercentage(value) {
	$("#menu_main_title").css("background-image", "linear-gradient(rgb(187, 187, 187) " + (80 - (value * 0.8)) + "%, rgb(88, 137, 189) 70%)");

	if (value == 100) {
		for (var i = 0; i <= 100; i++) {
			setTimeout(function(i) {
				$("#menu_main_title").css("transform", "translate(-50%, calc(-50% - " + (0.93 * i) + "px))");

				if (i == 100) {
					$("#menu_main_content").fadeIn(400);
				}
			}, 5 * i, i);
		}
	}
}

for (var i = 1; i <= 1000; i++) {
	setTimeout(function(i) {
		setLoadingPercentage(i / 10);
	}, 2 * i, i);
}