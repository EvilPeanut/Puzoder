PUZODER.Timer = class Timer {
	constructor() {
		this.interval = 1000;
		this.enabled = false;
		this.onTick = function() {};
	}

	start() {
		this.enabled = true;
		this.tick();
	}

	stop() {
		this.enabled = false;
	}

	tick() {
		setTimeout(() => {
			if ( this.enabled ) {
				this.tick();
				this.onTick();
			}
		}, this.interval);
	}
}