PUZODER.StartingRoom = class extends PUZODER.OneDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.door = new PUZODER.Door( this.object, new THREE.Vector3( 0, 8, -48 ), new THREE.Vector3( 24, 16, 0.1 ), 0, doorTexture );
		this.door.lightLeft.light.visible = true;
		this.door.lightRight.light.visible = true;

		//this.decal1 = new PUZODER.Sign( this.object, new THREE.Vector3( -30, 9, -47.45 ), new THREE.Vector2( 4, 4 ), 0, spoonsDecalTexture );
		//this.decal2 = new PUZODER.Sign( this.object, new THREE.Vector3( 40, 8, 47.45 ), new THREE.Vector2( 16, 16 ), 2, decalTommyTexture );

		this.lever = new PUZODER.Lever( this.object, new THREE.Vector3( -14, 9, -47.45 ), 0 );
		this.lever.onClick = ( isOn ) => {
			if ( isOn ) {
				this.door.open();
			} else {
				this.door.close();
			}
		}

		this.position = position;
		PUZODER.Rooms.push( this );
	}
}