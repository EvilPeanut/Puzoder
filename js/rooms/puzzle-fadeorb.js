PUZODER.FadeOrbRoom = class extends PUZODER.TwoDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.timeLeft = 15;
		this.score = 2;

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 0, 8, 48 ), new THREE.Vector3( 24, 16, 0.1 ), 2, doorTexture );

		var colorPalette = [ new THREE.Color( 0x00FFEC ), new THREE.Color( 0x89FF00 ), new THREE.Color( 0xFFF400 ), new THREE.Color( 0xE300FF ) ];
		this.solution = colorPalette[Math.randomRange( 0, 3 )];

		this.sign = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 8, 0 ), new THREE.Vector2( 24, 6 ), 1, signFastTexture, this.solution );

		this.orb = new PUZODER.Orb( this.object, new THREE.Vector3( 0, 0, 0 ), this.solution );
		this.orb.onClick = () => {
			this.checkSolution();
		}
	}

	checkSolution() {
		if ( this.orb.power == 1 && this.orb.fade ) {
			this.orb.fade = false;
			this.setCompleted( true );
			this.door.open();
		}
	}
}

PUZODER.RoomTemplates.push( PUZODER.FadeOrbRoom );