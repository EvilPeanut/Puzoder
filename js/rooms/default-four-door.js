PUZODER.FourDoorRoom = class {
	constructor( position, rotation ) {
		this.object = new THREE.Object3D();

		this.groundPlaneMaterial = new THREE.MeshPhongMaterial( { map: groundPlaneTexture } );
		this.groundPlaneGeometry = new THREE.PlaneBufferGeometry( 96, 96, 1, 1 );
		this.groundPlaneGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
		this.groundPlane = new THREE.Mesh( this.groundPlaneGeometry, this.groundPlaneMaterial );
		this.groundPlane.castShadow = false;
		this.groundPlane.receiveShadow = true;
		this.object.add( this.groundPlane );

		this.southWallPartA = new PUZODER.Wall( this.object, new THREE.Vector3( -30, 8, 48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
		this.southWallPartB = new PUZODER.Wall( this.object, new THREE.Vector3( 30, 8, 48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
		this.northWallPartA = new PUZODER.Wall( this.object, new THREE.Vector3( -30, 8, -48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
		this.northWallPartB = new PUZODER.Wall( this.object, new THREE.Vector3( 30, 8, -48 ), new THREE.Vector3( 36, 16, 1 ), 0 );
		this.westWallPartA = new PUZODER.Wall( this.object, new THREE.Vector3( -48, 8, -30 ), new THREE.Vector3( 36, 16, 1 ), -Math.PI / 2 );
		this.westWallPartB = new PUZODER.Wall( this.object, new THREE.Vector3( -48, 8, 30 ), new THREE.Vector3( 36, 16, 1 ), -Math.PI / 2 );
		this.eastWallPartA = new PUZODER.Wall( this.object, new THREE.Vector3( 48, 8, -30 ), new THREE.Vector3( 36, 16, 1 ), -Math.PI / 2 );
		this.eastWallPartB = new PUZODER.Wall( this.object, new THREE.Vector3( 48, 8, 30 ), new THREE.Vector3( 36, 16, 1 ), -Math.PI / 2 );
		
		position.multiplyScalar(96);
		this.object.position.set( position.x, 0, position.y );
		this.object.rotation.set( 0, rotation * ( Math.PI / 2 ), 0);

		scene.add( this.object );
	}
}

//PUZODER.Rooms[ 'DefaultRoom' ] = PUZODER.DefaultRoom;