JOYPAD.addInput({
	Keyboard: JOYPAD.KEYBOARD.W,
	onDown: function() {
		camera.translateZ(-0.56);
	},
	onHold: function() {
		camera.translateZ(-0.56);
	}
});

JOYPAD.addInput({
	Keyboard: JOYPAD.KEYBOARD.S,
	onDown: function() {
		camera.translateZ(0.56);
	},
	onHold: function() {
		camera.translateZ(0.56);
	}
});

JOYPAD.addInput({
	Keyboard: JOYPAD.KEYBOARD.A,
	onDown: function() {
		camera.rotation.y += 0.032;
	},
	onHold: function() {
		camera.rotation.y += 0.032;
	}
});

JOYPAD.addInput({
	Keyboard: JOYPAD.KEYBOARD.D,
	onDown: function() {
		camera.rotation.y -= 0.032;
	},
	onHold: function() {
		camera.rotation.y -= 0.032;
	}
});