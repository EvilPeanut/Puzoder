PUZODER.Sign = class extends THREE.Object3D {
	constructor( parent, position, size, rotation, texture ) {
		super();

		this.material = new THREE.MeshPhongMaterial( { map: texture, transparent: true } );
		this.geometry = new THREE.PlaneBufferGeometry( size.x, size.y, 1, 1 );
		this.mesh = new THREE.Mesh( this.geometry, this.material );
		this.mesh.castShadow = false;
		this.mesh.receiveShadow = true;
		this.add( this.mesh );

		this.position.set( position.x, position.y, position.z );
		this.rotation.set( 0, rotation * ( Math.PI / 2 ), 0);

		parent.add( this );
	}
}