PUZODER.RightAngleLeverLockRoom = class extends PUZODER.TwoDoorRightAngleRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.timeLeft = 80;
		this.score = 4;

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 48, 8, 0 ), new THREE.Vector3( 24, 16, 0.1 ), 3, doorTexture );

		this.decal1 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 3.2, 30 ), new THREE.Vector2( 32, 8 ), 1, decalWallDamage2Texture );

		this.leverLeft = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, 8 ), 1 );
		this.leverLeft.onClick = ( isOn ) => { this.number += isOn ? 4 : -2; this.checkSolution() }
		this.lightLeverLeft = new PUZODER.HemisphereLight( this.object, new THREE.Vector3( -47.45, 12, 8 ), 1 );

		this.leverMiddle = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, 0 ), 1 );
		this.leverMiddle.onClick = ( isOn ) => { this.number += isOn ? 6 : -3; this.checkSolution() }
		this.lightLeverMiddle = new PUZODER.HemisphereLight( this.object, new THREE.Vector3( -47.45, 12, 0 ), 1 );

		this.leverRight = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, -8 ), 1 );
		this.leverRight.onClick = ( isOn ) => { this.number += isOn ? 2 : -1; this.checkSolution() }
		this.lightLeverRight = new PUZODER.HemisphereLight( this.object, new THREE.Vector3( -47.45, 12, -8 ), 1 );

		this.number = 0;
	}

	checkSolution() {
		this.lightLeverLeft.setColor( new THREE.Color( this.number % 2.5 == 0 ? 0x00FF00 : 0xFF0000 ) );
		this.lightLeverMiddle.setColor( new THREE.Color( this.number % 4 == 0 ? 0x00FF00 : 0xFF0000 ) );
		this.lightLeverRight.setColor( new THREE.Color( this.number % 5 == 0 ? 0x00FF00 : 0xFF0000 ) );

		if ( this.number % 2.5 == 0 && this.number % 4 == 0 && this.number % 5 == 0 ) {
			this.setCompleted( true );
			this.door.open();
		} else if ( this.door.isOpen ) {
			this.setCompleted( false );
			this.door.close();
		}
	}
}

PUZODER.RoomTemplates.push( PUZODER.RightAngleLeverLockRoom );