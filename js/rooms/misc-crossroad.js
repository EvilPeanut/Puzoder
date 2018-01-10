PUZODER.CrossRoadRoom = class extends PUZODER.FourDoorRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.chest = new PUZODER.BonusChest( this.object, new THREE.Vector3( 0, 0.5, 0 ) );

		this.decal1 = new PUZODER.Sign( this.object, new THREE.Vector3( 24, 10, -47.45 ), new THREE.Vector2( 16, 8 ), 0, decalCrack1Texture );
		
		this.onGenerate = () => {
			this.generateNextRooms();
		}
	}
}

PUZODER.RoomTemplates.push( PUZODER.CrossRoadRoom );