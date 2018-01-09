PUZODER.Door = class Door extends THREE.Object3D {
	constructor( parent, position, size, rotation, texture ) {
		super();

		var material = new THREE.MeshPhongMaterial( { map: texture } );
		var geometry = new THREE.BoxBufferGeometry( size.x, size.y, size.z );

		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.copy( position );

		this.mesh.rotation.y = rotation * ( Math.PI / 2 );
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;

		this.add( this.mesh );

		// Door lights
		if ( rotation == 0 ) {
			this.lightLeft = new PUZODER.HemisphereLight( parent, new THREE.Vector3( position.x - 14, position.y + 6, position.z + 0.55 ), rotation );
			this.lightRight = new PUZODER.HemisphereLight( parent, new THREE.Vector3( position.x + 14, position.y + 6, position.z + 0.55 ), rotation );
		} else if (rotation == 1) {
			this.lightLeft = new PUZODER.HemisphereLight( parent, new THREE.Vector3( position.x + 0.55, position.y + 6, position.z - 14 ), rotation );
			this.lightRight = new PUZODER.HemisphereLight( parent, new THREE.Vector3( position.x + 0.55, position.y + 6, position.z + 14 ), rotation );
		} else if ( rotation == 2 ) {
			this.lightLeft = new PUZODER.HemisphereLight( parent, new THREE.Vector3( position.x - 14, position.y + 6, position.z - 0.55 ), rotation );
			this.lightRight = new PUZODER.HemisphereLight( parent, new THREE.Vector3( position.x + 14, position.y + 6, position.z - 0.55 ), rotation );
		} else if (rotation == 3) {
			this.lightLeft = new PUZODER.HemisphereLight( parent, new THREE.Vector3( position.x - 0.55, position.y + 6, position.z - 14 ), rotation );
			this.lightRight = new PUZODER.HemisphereLight( parent, new THREE.Vector3( position.x - 0.55, position.y + 6, position.z + 14 ), rotation );
		}

		//
		parent.add( this );

		// Add to scenery
		PUZODER.Scenery.push( this );

		// Computing bounding box
		this.boundingBox = new THREE.Box3();
		
		if ( isCollisionDebug ) {
			var helper = new THREE.Box3Helper( this.boundingBox, 0xffff00 );
			scene.add( helper );
		}

		PUZODER.Collidables.push( this );

		// Additional properties
		this.opening = false;
		this.closing = false;
		this.isOpen = false;
	}

	open() {
		this.lightLeft.setColor( new THREE.Color( 0xFFBF00 ) );
		this.lightRight.setColor( new THREE.Color( 0xFFBF00 ) );

		this.opening = true;
		this.closing = false;
		this.isOpen = true;
	}

	close() {
		this.lightLeft.setColor( new THREE.Color( 0xFFBF00 ) );
		this.lightRight.setColor( new THREE.Color( 0xFFBF00 ) );

		this.opening = false;
		this.closing = true;
		this.isOpen = false;
	}

	translate( offset ) {
		this.mesh.position.add( offset );
		this.boundingBox.translate( offset );
	}

	update() {
		if ( this.opening ) {
			this.translate( new THREE.Vector3( 0, -0.1, 0 ) );

			if ( this.mesh.position.y <= -7.8 ) {
				this.lightLeft.light.intensity = 6;
				this.lightRight.light.intensity = 6;
				this.lightLeft.setColor( new THREE.Color( 0x00FF00 ) );
				this.lightRight.setColor( new THREE.Color( 0x00FF00 ) );
				this.opening = false;
			} else {
				var lightIntensity = 1 + Math.pingPong( Math.abs( this.mesh.position.y * 6 ), 5 );
				this.lightLeft.light.intensity = lightIntensity;
				this.lightRight.light.intensity = lightIntensity;
			}
		} else if ( this.closing ) {
			this.translate( new THREE.Vector3( 0, 0.1, 0 ) );

			if ( this.mesh.position.y >= 8 ) {
				this.lightLeft.light.intensity = 6;
				this.lightRight.light.intensity = 6;
				this.lightLeft.setColor( new THREE.Color( 0xFF0000 ) );
				this.lightRight.setColor( new THREE.Color( 0xFF0000 ) );
				this.closing = false;
			} else {
				var lightIntensity = 1 + Math.pingPong( Math.abs( this.mesh.position.y * 6 ), 5 );
				this.lightLeft.light.intensity = lightIntensity;
				this.lightRight.light.intensity = lightIntensity;
			}
		}
	}
}