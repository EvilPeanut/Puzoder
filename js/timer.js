PUZODER.Timer = class Timer {
	constructor() {
		this.interval = 1000;
		this.enabled = false;
		this.onTick = function() {};
	}

	start() {
		if ( !this.enabled ) this.tick();
		this.enabled = true;
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