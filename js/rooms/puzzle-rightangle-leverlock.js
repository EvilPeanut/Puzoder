PUZODER.RightAngleLeverLockRoom = class extends PUZODER.TwoDoorRightAngleRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.timeLeft = 80;
		this.score = 4;

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 48, 8, 0 ), new THREE.Vector3( 24, 16, 0.1 ), 3, doorTexture );

		this.decal1 = new PUZODER.Sign( this.object, new THREE.Vector3( -47.45, 3.2, 30 ), new THREE.Vector2( 32, 8 ), 1, decalWallDamage2Texture );

		this.solution = [];
		this.activeLevers = [];

		this.generateSolution( 0 );
		this.generateSolution( 1 );
		this.generateSolution( 2 );

		this.lever1 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, 16 ), 1 );
		this.lever1.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeLevers.push( 0 );
			} else {
				this.activeLevers.splice( this.activeLevers.indexOf( 0 ), 1 );
			}
			this.checkSolution();
		}
		
		this.lever2 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, 8 ), 1 );
		this.lever2.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeLevers.push( 1 );
			} else {
				this.activeLevers.splice( this.activeLevers.indexOf( 1 ), 1 );
			}
			this.checkSolution();
		}

		this.lever3 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, 0 ), 1 );
		this.lever3.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeLevers.push( 2 );
			} else {
				this.activeLevers.splice( this.activeLevers.indexOf( 2 ), 1 );
			}
			this.checkSolution();
		}

		this.lever4 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, -8 ), 1 );
		this.lever4.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeLevers.push( 3 );
			} else {
				this.activeLevers.splice( this.activeLevers.indexOf( 3 ), 1 );
			}
			this.checkSolution();
		}

		this.lever5 = new PUZODER.Lever( this.object, new THREE.Vector3( -47.45, 8, -16 ), 1 );
		this.lever5.onClick = ( isOn ) => {
			if ( isOn ) {
				this.activeLevers.push( 4 );
			} else {
				this.activeLevers.splice( this.activeLevers.indexOf( 4 ), 1 );
			}
			this.checkSolution();
		}

		this.lightLeverLeft = new PUZODER.HemisphereLight( this.object, new THREE.Vector3( -47.45, 12, 12 ), 1 );
		this.lightLeverMiddle = new PUZODER.HemisphereLight( this.object, new THREE.Vector3( -47.45, 12, 0 ), 1 );
		this.lightLeverRight = new PUZODER.HemisphereLight( this.object, new THREE.Vector3( -47.45, 12, -12 ), 1 );

		this.number = 0;
	}

	generateSolution( solutionIndex ) {
		var random = Math.randomRange( 0, 4 );
		if ( this.solution.indexOf( random ) != -1 ) {
			this.generateSolution( solutionIndex );
		} else {
			this.solution[ solutionIndex ] = random;
		}
	}

	checkSolution() {
		this.lightLeverLeft.setColor( new THREE.Color( this.solution.indexOf( this.activeLevers[0] ) != -1 ? 0x00FF00 : 0xFF0000 ) );
		this.lightLeverMiddle.setColor( new THREE.Color( this.solution.indexOf( this.activeLevers[1] ) != -1 ? 0x00FF00 : 0xFF0000 ) );
		this.lightLeverRight.setColor( new THREE.Color( this.solution.indexOf( this.activeLevers[2] ) != -1 ? 0x00FF00 : 0xFF0000 ) );

		if ( this.activeLevers.length == this.solution.length &&
		this.solution.indexOf( this.activeLevers[0] ) != -1 &&
		this.solution.indexOf( this.activeLevers[1] ) != -1 &&
		this.solution.indexOf( this.activeLevers[2] ) != -1 ) {
			this.setCompleted( true );
			this.door.open();
		} else if ( this.door.isOpen ) {
			this.setCompleted( false );
			this.door.close();
		}
	}
}

PUZODER.RoomTemplates.push( PUZODER.RightAngleLeverLockRoom );