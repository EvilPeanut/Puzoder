PUZODER.QuizJerseyFlagRoom = class extends PUZODER.ThreeDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.timeLeft = 30;
		this.score = 2;

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 48, 8, 0 ), new THREE.Vector3( 24, 16, 0.1 ), 3, doorTexture );
		this.bonusDoor = new PUZODER.Door( this.object, new THREE.Vector3( -48, 8, 0 ), new THREE.Vector3( 24, 16, 0.1 ), 1, doorTexture );

		this.flag = new PUZODER.Sign( this.object, new THREE.Vector3( 4, 8.1, 47.45 ), new THREE.Vector2( 20, 10 ), 2, flagJerseyTexture );

		this.signJersey = new PUZODER.Sign( this.object, new THREE.Vector3( -18, 11, 47.45 ), new THREE.Vector2( 8, 2 ), 2, signJerseyTexture );
		this.signSark = new PUZODER.Sign( this.object, new THREE.Vector3( -18, 8, 47.45 ), new THREE.Vector2( 8, 2 ), 2, signSarkTexture );
		this.signHerm = new PUZODER.Sign( this.object, new THREE.Vector3( -18, 5, 47.45 ), new THREE.Vector2( 8, 2 ), 2, signHermTexture );

		this.buttonTop = new PUZODER.Button( this.object, new THREE.Vector3( -12, 11, 47.45 ), 2 );
		this.buttonTop.onClick = () => {
			if ( this.isCompleted ) return;
			this.setCompleted( true );
			this.door.open();
			this.bonusDoor.open();
		}

		this.buttonMiddle = new PUZODER.Button( this.object, new THREE.Vector3( -12, 8, 47.45 ), 2 );
		this.buttonMiddle.onClick = () => {
			if ( this.isCompleted ) return;
			this.score = 0;
			this.setCompleted( true );
			this.door.open();
		}

		this.buttonBottom = new PUZODER.Button( this.object, new THREE.Vector3( -12, 5, 47.45 ), 2 );
		this.buttonBottom.onClick = () => {
			if ( this.isCompleted ) return;
			this.score = 0;
			this.setCompleted( true );
			this.door.open();
		}

		this.position = position;
		PUZODER.Rooms.push( this );
	}
}