PUZODER.PortalRoom = class extends PUZODER.OneDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );
		
		this.teleporter = new PUZODER.Teleporter( this.object, new THREE.Vector3( 0, 0.25, 0 ) );
		this.teleporter.onClick = () => {
			this.teleport();
		}

		PUZODER.Rooms.push( this );
	}

	teleport() {
		var x = Math.floor( Math.random() * 512 );
		var y = Math.floor( Math.random() * 512 );

		if ( isRoomPositionTaken( new THREE.Vector2( x, y ) ) ) {
			this.teleport();
		} else {
			var startingRoom = new PUZODER.StartingRoom( new THREE.Vector2( x, y ), 0 );
			startingRoom.addToScene();

			player.getObject().position.setX( x * 96 );
			player.getObject().position.setZ( y * 96 );
		}
	}
}