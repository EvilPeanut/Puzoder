var PUZODER = {};

PUZODER.Wall = class Wall {
	constructor(parent, position, size, rotation, texture) {
		/*var length = from.distanceTo( to );

		var rotation = from.angleTo( to );

		var position = new THREE.Vector3();
		position.addVectors( from, to );
		position.multiplyScalar( 0.5 );*/

		var wallMaterial = new THREE.MeshPhongMaterial( { map: texture || wallTexture } );
		var wallGeometry = new THREE.BoxBufferGeometry( size.x, size.y, size.z );

		var wallMesh = new THREE.Mesh( wallGeometry, wallMaterial );
		wallMesh.position.copy( position );
		//wallMesh.position.z = length / 2;

		wallMesh.rotation.y = rotation;
		//wallMesh.applyQuaternion( rotation);
		wallMesh.castShadow = true;
		wallMesh.receiveShadow = true;
		parent.add( wallMesh );
	}
}