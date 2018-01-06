PUZODER.OneDoorRoom = class extends PUZODER.PuzzleRoom {
	constructor( position, rotation ) {
		super();
		
		var worldPos = new THREE.Vector3();
		worldPos.copy( position );
		worldPos.multiplyScalar( 96 );
		this.object.position.set( worldPos.x, 0, worldPos.y );
		this.object.rotation.set( 0, rotation * ( Math.PI / 2 ), 0);

		this.groundPlaneMaterial = new THREE.MeshPhongMaterial( { map: groundPlaneTexture } );
		this.groundPlaneGeometry = new THREE.PlaneBufferGeometry( 96, 96, 1, 1 );
		this.groundPlaneGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
		this.groundPlane = new THREE.Mesh( this.groundPlaneGeometry, this.groundPlaneMaterial );
		this.groundPlane.castShadow = false;
		this.groundPlane.receiveShadow = true;
		this.object.add( this.groundPlane );

		this.southWall = new PUZODER.Wall( this.object, new THREE.Vector3( 0, 8, 48 ), new THREE.Vector3( 96, 16, 1 ), 0 );
		this.northWallPartA = new PUZODER.Wall( this.object, new THREE.Vector3( -30, 8, -48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
		this.northWallPartB = new PUZODER.Wall( this.object, new THREE.Vector3( 30, 8, -48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
		this.westWall = new PUZODER.Wall( this.object, new THREE.Vector3( -48, 8, 0 ), new THREE.Vector3( 96, 16, 1 ), -Math.PI / 2 );
		this.eastWall = new PUZODER.Wall( this.object, new THREE.Vector3( 48, 8, 0 ), new THREE.Vector3( 96, 16, 1 ), -Math.PI / 2 );

		scene.add( this.object );
	}
}

//PUZODER.Rooms[ 'DefaultRoom' ] = PUZODER.DefaultRoom;