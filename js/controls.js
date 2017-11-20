JOYPAD.addInput({
	input: [JOYPAD.KEYBOARD.UP, JOYPAD.KEYBOARD.W],
	holdIsDownEvent: true,
	onHold: function() {
		//camera.translateZ(-0.56);
		controls.getObject().translateZ(-0.56);
	}
});

JOYPAD.addInput({
	input: [JOYPAD.KEYBOARD.DOWN, JOYPAD.KEYBOARD.S],
	holdIsDownEvent: true,
	onHold: function() {
		//camera.translateZ(0.56);
		controls.getObject().translateZ(0.56);
	}
});

JOYPAD.addInput({
	input: [JOYPAD.KEYBOARD.LEFT, JOYPAD.KEYBOARD.A],
	holdIsDownEvent: true,
	onHold: function() {
		//camera.rotation.y += 0.032;
		controls.getObject().rotation.y += 0.032;
	}
});

JOYPAD.addInput({
	input: [JOYPAD.KEYBOARD.RIGHT, JOYPAD.KEYBOARD.D],
	holdIsDownEvent: true,
	onHold: function() {
		//camera.rotation.y -= 0.032;
		controls.getObject().rotation.y -= 0.032;
	}
});