PUZODER.ButtonLockRoom = class extends PUZODER.TwoDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.timeLeft = 15;
		this.score = 1;

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 0, 8, 48 ), new THREE.Vector3( 24, 16, 0.1 ), 2, doorTexture );

		this.decal1 = new PUZODER.Sign( this.object, new THREE.Vector3( 24, 10, -47.45 ), new THREE.Vector2( 16, 8 ), 0, decalRust1Texture );

		var buttonLeftZ = Math.randomRange(-28, 28);
		this.buttonLeft = new PUZODER.Button( this.object, new THREE.Vector3( -47.45, 10, buttonLeftZ ), 1 );
		this.buttonLeft.onClick = () => {
			this.leftIsActive = !this.leftIsActive;
			this.buttonLeftLight.setColor( new THREE.Color( this.leftIsActive ? 0x00FF00 : 0xFF0000 ) );
			this.checkSolution();
		}
		this.buttonLeftLight = new PUZODER.HemisphereLight( this.object, new THREE.Vector3( -47.45, 14, buttonLeftZ ), 1 );

		var buttonRightZ = Math.randomRange(-28, 28);
		this.buttonRight = new PUZODER.Button( this.object, new THREE.Vector3( 47.45, 10, buttonRightZ ), 3 );
		this.buttonRight.onClick = () => {
			this.rightIsActive = !this.rightIsActive;
			this.buttonRightLight.setColor( new THREE.Color( this.rightIsActive ? 0x00FF00 : 0xFF0000 ) );
			this.checkSolution();
		}
		this.buttonRightLight = new PUZODER.HemisphereLight( this.object, new THREE.Vector3( 47.45, 14, buttonRightZ ), 3 );

		this.leftIsActive = false;
		this.rightIsActive = false;
	}

	checkSolution() {
		if ( this.leftIsActive && this.rightIsActive ) {
			this.setCompleted( true );
			this.door.open();
		} else if ( this.door.isOpen ) {
			this.setCompleted( false );
			this.door.close();
		}
	}
}

PUZODER.RoomTemplates.push( PUZODER.ButtonLockRoom );