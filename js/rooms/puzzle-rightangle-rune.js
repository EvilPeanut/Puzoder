PUZODER.RightAngleRuneRoom = class extends PUZODER.TwoDoorRightAngleRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.timeLeft = 80;
		this.score = 4;

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 48, 8, 0 ), new THREE.Vector3( 24, 16, 0.1 ), 3, doorTexture );

		this.decal1 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 3.2, 30 ), new THREE.Vector2( 32, 8 ), 1, decalWallDamage2Texture );

		this.solution = [];
		this.activeRunes = [];

		this.generateSolutionRune( 0 );
		this.generateSolutionRune( 1 );
		this.generateSolutionRune( 2 );

		this.runeDecal1 = new PUZODER.Sign( this.object, new THREE.Vector3( Math.randomRange( -45, -15 ), Math.randomRange( 2, 14 ), 47.45 ), new THREE.Vector2( 2, 2 ), 2, window["rune" + (this.solution[0] + 1) + "Texture"] );
		this.runeDecal2 = new PUZODER.Sign( this.object, new THREE.Vector3( Math.randomRange( -15, 15 ), Math.randomRange( 2, 14 ), 47.45 ), new THREE.Vector2( 2, 2 ), 2, window["rune" + (this.solution[1] + 1) + "Texture"] );
		this.runeDecal3 = new PUZODER.Sign( this.object, new THREE.Vector3( Math.randomRange( 15, 45 ), Math.randomRange( 2, 14 ), 47.45 ), new THREE.Vector2( 2, 2 ), 2, window["rune" + (this.solution[2] + 1) + "Texture"] );

		this.lever1 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, 16 ), 1 );
		this.lever1.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeRunes.push( 0 );
			} else {
				this.activeRunes.splice( this.activeRunes.indexOf( 0 ), 1 );
			}
			this.checkSolution();
		}
		this.rune1 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 12, 16 ), new THREE.Vector2( 4, 4 ), 1, rune1Texture );

		this.lever2 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, 8 ), 1 );
		this.lever2.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeRunes.push( 1 );
			} else {
				this.activeRunes.splice( this.activeRunes.indexOf( 1 ), 1 );
			}
			this.checkSolution();
		}
		this.rune2 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 12, 8 ), new THREE.Vector2( 4, 4 ), 1, rune2Texture );

		this.lever3 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, 0 ), 1 );
		this.lever3.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeRunes.push( 2 );
			} else {
				this.activeRunes.splice( this.activeRunes.indexOf( 2 ), 1 );
			}
			this.checkSolution();
		}
		this.rune3 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 12, 0 ), new THREE.Vector2( 4, 4 ), 1, rune3Texture );

		this.lever4 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, -8 ), 1 );
		this.lever4.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeRunes.push( 3 );
			} else {
				this.activeRunes.splice( this.activeRunes.indexOf( 3 ), 1 );
			}
			this.checkSolution();
		}
		this.rune4 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 12, -8 ), new THREE.Vector2( 4, 4 ), 1, rune4Texture );

		this.lever5 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, -16 ), 1 );
		this.lever5.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeRunes.push( 4 );
			} else {
				this.activeRunes.splice( this.activeRunes.indexOf( 4 ), 1 );
			}
			this.checkSolution();
		}
		this.rune5 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 12, -16 ), new THREE.Vector2( 4, 4 ), 1, rune5Texture );
	}

	generateSolutionRune( solutionIndex ) {
		var random = Math.randomRange( 0, 4 );
		if ( this.solution.indexOf( random ) != -1 ) {
			this.generateSolutionRune( solutionIndex );
		} else {
			this.solution[ solutionIndex ] = random;
		}
	}

	checkSolution() {
		if ( this.activeRunes.length == this.solution.length &&
		this.solution.indexOf( this.activeRunes[0] ) != -1 &&
		this.solution.indexOf( this.activeRunes[1] ) != -1 &&
		this.solution.indexOf( this.activeRunes[2] ) != -1 ) {
			this.setCompleted( true );
			this.door.open();
		} else if ( this.door.isOpen ) {
			this.setCompleted( false );
			this.door.close();
		}
	}
}

PUZODER.RoomTemplates.push( PUZODER.RightAngleRuneRoom );