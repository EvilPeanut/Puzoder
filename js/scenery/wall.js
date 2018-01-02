var PUZODER = {};

PUZODER.Wall = class Wall {
	constructor(parent, position, size, rotation, texture) {
		var material = new THREE.MeshPhongMaterial( { map: texture || wallTexture } );
		var geometry = new THREE.BoxBufferGeometry( size.x, size.y, size.z );

		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.copy( position );

		this.mesh.rotation.y = rotation;
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		parent.add( this.mesh );
	}
}