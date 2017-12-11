PUZODER.StartingRoom = class extends PUZODER.OneDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.door = new PUZODER.Wall( this.object, new THREE.Vector3( 0, 8, -48 ), new THREE.Vector3( 24, 16, 0.1 ), 0, doorTexture );
	}
}