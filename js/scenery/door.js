PUZODER.Door = class Door extends THREE.Object3D {
	constructor(parent, position, size, rotation, texture) {
		super();

		var material = new THREE.MeshPhongMaterial( { map: texture } );
		var geometry = new THREE.BoxBufferGeometry( size.x, size.y, size.z );

		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.copy( position );

		this.mesh.rotation.y = rotation;
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		parent.add( this.mesh );

		PUZODER.Scenery.push( this );

		// Additional properties
		this.opening = false;
		this.closing = false;
	}

	open() {
		this.opening = true;
		this.closing = false;
	}

	close() {
		this.opening = false;
		this.closing = true;
	}

	update() {
		if ( this.opening ) {
			this.mesh.position.sub( new THREE.Vector3( 0, 0.1, 0 ) );

			if ( this.mesh.position.y <= -7.8 ) {
				this.opening = false;
			}
		} else if ( this.closing ) {
			this.mesh.position.add( new THREE.Vector3( 0, 0.1, 0 ) );

			if ( this.mesh.position.y >= 8 ) {
				this.closing = false;
			}
		}
	}
}