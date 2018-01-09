var PUZODER = {};

PUZODER.Wall = class Wall extends THREE.Object3D {
	constructor( parent, position, size, rotation ) {
		super();

		var material = new THREE.MeshPhongMaterial( { map: size.x == 96 ? wallTexture : wallSmallTexture } );
		var geometry = new THREE.BoxBufferGeometry( size.x, size.y, size.z );

		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.copy( position );

		this.mesh.rotation.y = rotation;
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		this.add( this.mesh );

		parent.add( this );

		// Computing bounding box
		this.boundingBox = new THREE.Box3();
		
		if ( isCollisionDebug ) {
			var helper = new THREE.Box3Helper( this.boundingBox, 0xffff00 );
			scene.add( helper );
		}

		PUZODER.Collidables.push( this );
		PUZODER.Scenery.push( this );
	}
}