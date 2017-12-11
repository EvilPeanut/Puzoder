JOYPAD.options.enabled = false;

JOYPAD.addInput({
	input: [JOYPAD.KEYBOARD.UP, JOYPAD.KEYBOARD.W],
	holdIsDownEvent: true,
	onHold: function() {
		controls.getObject().translateZ(-0.56);
	}
});

JOYPAD.addInput({
	input: [JOYPAD.KEYBOARD.DOWN, JOYPAD.KEYBOARD.S],
	holdIsDownEvent: true,
	onHold: function() {
		controls.getObject().translateZ(0.56);
	}
});

JOYPAD.addInput({
	input: [JOYPAD.KEYBOARD.LEFT, JOYPAD.KEYBOARD.A],
	holdIsDownEvent: true,
	onHold: function() {
		controls.getObject().rotation.y += 0.032;
	}
});

JOYPAD.addInput({
	input: [JOYPAD.KEYBOARD.RIGHT, JOYPAD.KEYBOARD.D],
	holdIsDownEvent: true,
	onHold: function() {
		controls.getObject().rotation.y -= 0.032;
	}
});