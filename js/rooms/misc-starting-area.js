PUZODER.StartingRoom = class extends PUZODER.OneDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.entrance = null;
		this.exits = [ PUZODER.Direction.NORTH ];

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 0, 8, 48 ), new THREE.Vector3( 24, 16, 0.1 ), 2, doorTexture );
		this.door.lightLeft.light.visible = true;
		this.door.lightRight.light.visible = true;

		this.lever = new PUZODER.Lever( this.object, new THREE.Vector3( -14, 9, 47.45 ), 0 );
		this.lever.onClick = ( isOn ) => {
			if ( isOn ) {
				this.door.open();
			} else {
				this.door.close();
			}
		}

		PUZODER.Rooms.push( this );
		
		this.generateNextRooms();
	}
}