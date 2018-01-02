PUZODER.StartingRoom = class extends PUZODER.OneDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 0, 8, -48 ), new THREE.Vector3( 24, 16, 0.1 ), 0, doorTexture );

		this.lever = new PUZODER.Lever( new THREE.Vector3( -16, 10, -47.45 ), 0 );
		this.lever.onClick = ( isOn ) => {
			if ( isOn ) {
				this.door.open();
			} else {
				this.door.close();
			}
		}
	}
}