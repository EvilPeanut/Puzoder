PUZODER.BonusRoom = class extends PUZODER.OneDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.chest = new PUZODER.BonusChest( this.object, new THREE.Vector3( 0, 0.5, 0 ) );

		this.decal1 = new PUZODER.Sign( this.object, new THREE.Vector3( 24, 10, -47.45 ), new THREE.Vector2( 16, 8 ), 0, decalCrack1Texture );

		PUZODER.Rooms.push( this );
	}
}