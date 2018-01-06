PUZODER.Button = class Button extends THREE.Object3D {
	constructor( parent, position, rotation ) {
		super();

		this.boxMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xDDDDDD ) } );
		this.boxGeometry = new THREE.BoxGeometry( 2, 2, 0.1 );
		this.box = new THREE.Mesh( this.boxGeometry, this.boxMaterial );
		this.add( this.box );

		this.buttonMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xFF0000 ) } );
		this.buttonGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 0.5, 16 );
		this.button = new THREE.Mesh( this.buttonGeometry, this.buttonMaterial );
		this.button.position.set( 0, 0, 0.25 );
		this.button.rotation.set( Math.PI / 2, 0, 0);
		this.add( this.button );

		this.position.set( position.x, position.y, position.z );
		this.rotation.set( 0, rotation * ( Math.PI / 2 ), 0);

		this.onClick = function() {};

		parent.add( this );

		PUZODER.Scenery.push( this );

		// Additional properties
		this.isAnimatingIn = false;
		this.isAnimatingOut = false;
	}

	click() {
		this.isAnimatingIn = true;
		this.onClick();

		sfxClick.play();
	}

	update() {
		if ( this.isAnimatingIn ) {
			this.button.position.sub( new THREE.Vector3( 0, 0, 0.05 ) );

			if ( this.button.position.z <= -0.15 ) {
				this.button.position.z = -0.15;
				this.isAnimatingIn = false;
				this.isAnimatingOut = true;
			}
		} else if ( this.isAnimatingOut ) {
			this.button.position.add( new THREE.Vector3( 0, 0, 0.05 ) );

			if ( this.button.position.z >= 0.25 ) {
				this.button.position.z = 0.25;
				this.isAnimatingOut = false;
			}
		}
	}
}