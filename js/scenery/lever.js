PUZODER.Lever = class Lever extends THREE.Object3D {
	constructor( parent, position, rotation ) {
		super();

		this.boxMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xDDDDDD ) } );
		this.boxGeometry = new THREE.BoxGeometry( 1, 2, 0.1 );
		this.box = new THREE.Mesh( this.boxGeometry, this.boxMaterial );
		this.add( this.box );

		this.handleMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0x777777 ) } );
		this.handleGeometry = new THREE.BoxGeometry( 0.2, 0.2, 1 );
		this.handle = new THREE.Mesh( this.handleGeometry, this.handleMaterial );
		this.handleRotation = -0.5;
		this.handle.rotation.set( this.handleRotation * ( Math.PI / 2 ), 0, 0);
		this.add( this.handle );

		this.position.set( position.x, position.y, position.z );
		this.rotation.set( 0, rotation * ( Math.PI / 2 ), 0);

		this.onClick = function() {};

		this.isAnimatingDown = false;
		this.isAnimatingUp = false;

		parent.add( this );

		PUZODER.Scenery.push( this );
	}

	toggle() {
		if ( this.handleRotation == -0.5 ) {
			this.isAnimatingDown = true;
		} else if ( this.handleRotation == 0.5 ) {
			this.isAnimatingUp = true;
		}

		sfxFlick.play();
	}

	update() {
		if ( this.isAnimatingDown ) {
			this.handleRotation += 0.1;
			this.handle.rotation.set( this.handleRotation * ( Math.PI / 2 ) , 0, 0);

			if ( this.handleRotation >= 0.5 ) {
				this.handleRotation = 0.5;
				this.isAnimatingDown = false;
			}
		} else if ( this.isAnimatingUp ) {
			this.handleRotation -= 0.1;
			this.handle.rotation.set( this.handleRotation * ( Math.PI / 2 ) , 0, 0);

			if ( this.handleRotation <= -0.5 ) {
				this.handleRotation = -0.5;
				this.isAnimatingUp = false;
			}
		}
	}

	click() {
		this.toggle();
		this.onClick(this.handleRotation == -0.5);
	}
}