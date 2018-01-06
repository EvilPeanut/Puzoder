PUZODER.Player = class Player extends THREE.PointerLockControls {
	constructor( camera ) {
		super( camera );

		this.currentRoom = this.getRoom( this.getObject().position );
		this.puzzlesCompleted = 0;
		this.score = 0;
		this.timeLeftModifier = 1;

		$( document ).on( 'update', () => {
			var newRoom = this.getRoom( this.getObject().position );

			if ( !this.currentRoom.equals( newRoom ) ) {
				// Turn off lights in old room
				for ( var i = 0; i < PUZODER.Rooms.length; i++ ) {
					var room = PUZODER.Rooms[i];
					if ( room.position.equals( this.currentRoom ) ) {
						for ( var c = 0; c < room.object.children.length; c++ ) {
							var child = room.object.children[c];
							if ( child instanceof PUZODER.HemisphereLight ) {
								child.light.visible = false;
							}
						}
					}
				}

				// Turn on lights in new room
				for ( var i = 0; i < PUZODER.Rooms.length; i++ ) {
					var room = PUZODER.Rooms[i];
					if ( room.position.equals( newRoom ) ) {
						this.room = room;
						if ( this.room.timeLeft ) {
							if ( !this.room.isCompleted ) {
								this.room.timeLeft *= this.timeLeftModifier;
								this.timeLeftModifier = 1;

								puzzleTimer.onTick = () => {
									this.room.timeLeft--;
									HUD.setTime( this.room.timeLeft );

									if ( this.room.timeLeft == 0 ) {
										$( "#menu_gameover" ).fadeIn( 400 );
										HUD.hideTime();
										player.enabled = false;
										//TODO: Release pointer lock
									}
								}
								
								puzzleTimer.start();
							}

							HUD.setTime( this.room.timeLeft );
							HUD.showTime();
						} else {
							puzzleTimer.stop();
							HUD.hideTime();
						}

						for ( var c = 0; c < this.room.object.children.length; c++ ) {
							var child = this.room.object.children[c];
							if ( child instanceof PUZODER.HemisphereLight ) {
								child.light.visible = true;
							}
						}
					}
				}
				this.currentRoom = newRoom;
			}
		});
	}

	getRoom( position ) {
		var roomX = Math.floor( ( position.x + 48 ) / 96 );
		var roomZ = Math.floor( ( position.z + 48 ) / 96 );

		return new THREE.Vector2( roomX, roomZ );
	}

	setRoom( roomPosition ) {
		this.getObject().position.x = roomPosition.x * 96;
		this.getObject().position.z = roomPosition.y * 96;
	}
}