PUZODER.PyramidHueRoom = class extends PUZODER.TwoDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.timeLeft = 30;
		this.score = 4;

		var colorSchemes = [
			[ new THREE.Color( 0x050A31 ), new THREE.Color( 0x281058 ), new THREE.Color( 0x461976 ), new THREE.Color( 0x9138A9 ), new THREE.Color( 0xE757E1 ) ],
			[ new THREE.Color( 0xEA2C2C ), new THREE.Color( 0xF34330 ), new THREE.Color( 0xF95F2B ), new THREE.Color( 0xF18126 ), new THREE.Color( 0xFCB928 ) ],
			[ new THREE.Color( 0x5973FF ), new THREE.Color( 0x4396F2 ), new THREE.Color( 0x2DB9E6 ), new THREE.Color( 0x16DCD9 ), new THREE.Color( 0x00FFCC ) ]
		];

		this.colorScheme = colorSchemes[Math.randomRange( 0, 2 )];

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 0, 8, 48 ), new THREE.Vector3( 24, 16, 0.1 ), 2, doorTexture );

		this.decal1 = new PUZODER.Sign( this.object, new THREE.Vector3( 24, 8.1, -47.45 ), new THREE.Vector2( 20, 10 ), 0, decalWallDamage1Texture );
		this.decal2 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 8.1, 0 ), new THREE.Vector2( 20, 5 ), 1, signHueTexture, this.colorScheme[4] );

		this.cube1 = new PUZODER.Cube( this.object, new THREE.Vector3( 0, 1.5, 0 ), new THREE.Vector3( 27, 3, 27 ), 0, this.colorScheme[Math.randomRange( 0, 4 )], this.colorScheme);
		this.cube1.onClick = () => {
			this.cube1.nextColor();
			this.checkSolution();
		}

		this.cube2 = new PUZODER.Cube( this.object, new THREE.Vector3( 0, 4.5, 0 ), new THREE.Vector3( 21, 3, 21 ), 0, this.colorScheme[Math.randomRange( 0, 4 )], this.colorScheme);
		this.cube2.onClick = () => {
			this.cube2.nextColor();
			this.checkSolution();
		}

		this.cube3 = new PUZODER.Cube( this.object, new THREE.Vector3( 0, 7.5, 0 ), new THREE.Vector3( 15, 3, 15 ), 0, this.colorScheme[Math.randomRange( 0, 4 )], this.colorScheme);
		this.cube3.onClick = () => {
			this.cube3.nextColor();
			this.checkSolution();
		}

		this.cube4 = new PUZODER.Cube( this.object, new THREE.Vector3( 0, 10.5, 0 ), new THREE.Vector3( 9, 3, 9 ), 0, this.colorScheme[Math.randomRange( 0, 4 )], this.colorScheme);
		this.cube4.onClick = () => {
			this.cube4.nextColor();
			this.checkSolution();
		}

		this.cube5 = new PUZODER.Cube( this.object, new THREE.Vector3( 0, 13.5, 0 ), new THREE.Vector3( 3, 3, 3 ), 0, this.colorScheme[Math.randomRange( 0, 4 )], this.colorScheme);
		this.cube5.onClick = () => {
			this.cube5.nextColor();
			this.checkSolution();
		}
	}

	checkSolution() {
		if ( this.cube1.getColor().equals( this.colorScheme[0] ) &&
			this.cube2.getColor().equals( this.colorScheme[1] ) &&
			this.cube3.getColor().equals( this.colorScheme[2] ) &&
			this.cube4.getColor().equals( this.colorScheme[3] ) &&
			this.cube5.getColor().equals( this.colorScheme[4] ) ) {
			this.setCompleted( true );
			this.door.open();
		} else if ( this.door.isOpen ) {
			this.setCompleted( false );
			this.door.close();
		}
	}
}

PUZODER.RoomTemplates.push( PUZODER.PyramidHueRoom );