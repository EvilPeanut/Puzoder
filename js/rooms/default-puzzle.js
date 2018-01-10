PUZODER.PuzzleRoom = class {
	constructor( position, rotation ) {
		this.object = new THREE.Object3D();

		this.position = position;
		this.rotation = rotation;

		var worldPos = new THREE.Vector3();
		worldPos.copy( position );
		worldPos.multiplyScalar( 96 );
		this.object.position.set( worldPos.x, 0, worldPos.y );
		this.object.rotation.set( 0, rotation * ( Math.PI / 2 ), 0);

		this.entrance = null;
		this.exits = [];

		this.generatedNextRooms = false;
	}

	generateNextRooms() {
		if ( this.generatedNextRooms ) return;
		this.generatedNextRooms = true;

		for ( var exitIndex = 0; exitIndex < this.exits.length; exitIndex++ ) {
			this.generationAttempts = 0;
			this.generateRoom( this.exits[exitIndex] );
		}
	}

	generateRoom( exitOrientation ) {
		var roomPosition = this.getRoomToDirection( exitOrientation );
		
		if ( isRoomPositionTaken( roomPosition ) ) {
			return;
		}

		var roomTemplate = PUZODER.RoomTemplates[Math.floor( Math.random() * PUZODER.RoomTemplates.length )];
		var room = new roomTemplate( roomPosition, 0 );

		room.setRotation( exitOrientation );

		if ( room.isExitsBlocked() ) {
			this.generationAttempts++;

			if ( this.generationAttempts == 10 ) {
				var portalRoom = new PUZODER.PortalRoom( this.getRoomToDirection( exitOrientation ), 0 );
				portalRoom.setRotation( rotateDirection( exitOrientation, 2 ) );
				portalRoom.addToScene();
			} else {
				this.generateRoom( exitOrientation );
			}

			return;
		}
		
		room.addToScene();
	}

	isExitsBlocked() {
		for ( var exitIndex = 0; exitIndex < this.exits.length; exitIndex++ ) {
			if ( isRoomPositionTaken( this.getRoomToDirection( this.exits[exitIndex] ) ) ) {
				return true;
			}
		}

		return false;
	}

	getRoomToDirection( direction ) {
		var offsetX = 0;
		var offsetY = 0;

		if ( direction == PUZODER.Direction.NORTH ) {
			offsetY = 1;
		} else if ( direction == PUZODER.Direction.EAST ) {
			offsetX = -1;
		} else if ( direction == PUZODER.Direction.SOUTH ) {
			offsetY = -1;
		} else if ( direction == PUZODER.Direction.WEST ) {
			offsetX = 1;
		}

		return new THREE.Vector2( this.position.x + offsetX, this.position.y + offsetY );
	}

	generateFloor() {
		this.groundPlaneMaterial = new THREE.MeshPhongMaterial( { map: groundPlaneTexture } );
		this.groundPlaneGeometry = new THREE.PlaneBufferGeometry( 96, 96, 1, 1 );
		this.groundPlaneGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
		this.groundPlane = new THREE.Mesh( this.groundPlaneGeometry, this.groundPlaneMaterial );
		this.groundPlane.castShadow = false;
		this.groundPlane.receiveShadow = true;
		this.object.add( this.groundPlane );
	}

	generateWall( direction, isDoor ) {
		if ( direction == PUZODER.Direction.NORTH ) {
			if ( isDoor ) {
				new PUZODER.Wall( this.object, new THREE.Vector3( -30, 8, 48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
				new PUZODER.Wall( this.object, new THREE.Vector3( 30, 8, 48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
			} else {
				new PUZODER.Wall( this.object, new THREE.Vector3( 0, 8, 48 ), new THREE.Vector3( 96, 16, 1 ), 0 );
			}
		} else if ( direction == PUZODER.Direction.EAST ) {
			if ( isDoor ) {
				new PUZODER.Wall( this.object, new THREE.Vector3( -48, 8, -30 ), new THREE.Vector3( 36, 16, 1 ), -Math.PI / 2 );
				new PUZODER.Wall( this.object, new THREE.Vector3( -48, 8, 30 ), new THREE.Vector3( 36, 16, 1 ), -Math.PI / 2 );
			} else {
				new PUZODER.Wall( this.object, new THREE.Vector3( -48, 8, 0 ), new THREE.Vector3( 96, 16, 1 ), -Math.PI / 2 );
			}
		} else if ( direction == PUZODER.Direction.SOUTH ) {
			if ( isDoor ) {
				new PUZODER.Wall( this.object, new THREE.Vector3( -30, 8, -48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
				new PUZODER.Wall( this.object, new THREE.Vector3( 30, 8, -48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
			} else {
				new PUZODER.Wall( this.object, new THREE.Vector3( 0, 8, -48 ), new THREE.Vector3( 96, 16, 1 ), 0 );
			}
		} else if ( direction == PUZODER.Direction.WEST ) {
			if ( isDoor ) {
				new PUZODER.Wall( this.object, new THREE.Vector3( 48, 8, -30 ), new THREE.Vector3( 36, 16, 1 ), -Math.PI / 2 );
				new PUZODER.Wall( this.object, new THREE.Vector3( 48, 8, 30 ), new THREE.Vector3( 36, 16, 1 ), -Math.PI / 2 );
			} else {
				new PUZODER.Wall( this.object, new THREE.Vector3( 48, 8, 0 ), new THREE.Vector3( 96, 16, 1 ), -Math.PI / 2 );
			}
		}
	}

	completeGeneration() {
		this.updateRecords();

		setTimeout(() => {
			this.computeBoundingBoxes();
		}, 10);
	}

	addToScene() {
		scene.add( this.object );
		PUZODER.Rooms.push( this );

		if ( this.onGenerate ) this.onGenerate();
	}

	setRotation( rotation ) {
		this.object.rotation.set( 0, -rotation * ( Math.PI / 2 ), 0);
		this.rotation = rotation;
		this.updateRecords();
	}

	updateRecords() {
		// Rotate entrance record
		this.entrance = rotateDirection( this.entrance, this.rotation );

		// Rotate exit records
		for ( var i = 0; i < this.exits.length; i++ ) {
			this.exits[i] = rotateDirection( this.exits[i], this.rotation );
		}
	}

	setCompleted( completed ) {
		this.generateNextRooms();

		this.isCompleted = completed;

		if ( this.isCompleted ) {
			player.score += this.score;
			player.puzzlesCompleted++;

			puzzleTimer.stop();
		} else {
			player.score -= this.score;
			player.puzzlesCompleted--;

			puzzleTimer.start();
		}
	}

	computeBoundingBoxes() {
		for ( var i = 0; i < this.object.children.length; i++ ) {
			if ( this.object.children[i] instanceof PUZODER.Wall || this.object.children[i] instanceof PUZODER.Door ) {
				this.object.children[i].boundingBox.setFromObject( this.object.children[i].mesh );

				var min = new THREE.Vector3().copy( this.object.children[i].boundingBox.min );
				var max = new THREE.Vector3().copy( this.object.children[i].boundingBox.max );

				var difference = min.sub( max );
				difference.set( Math.abs( difference.x ), Math.abs( difference.y ), Math.abs( difference.z ) );

				if ( difference.x < difference.z ) {
					this.object.children[i].boundingBox.expandByVector( new THREE.Vector3( 1, 0, 0 ) );
				} else {
					this.object.children[i].boundingBox.expandByVector( new THREE.Vector3( 0, 0, 1 ) );
				}
			}
		}
	}
}