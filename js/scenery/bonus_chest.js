PUZODER.BonusChest = class BonusChest extends THREE.Object3D {
	constructor( parent, position ) {
		super();

		this.baseMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xFFDDDD ) } );
		this.baseGeometry = new THREE.CylinderGeometry( 8, 8, 1, 32 );
		this.base = new THREE.Mesh( this.baseGeometry, this.baseMaterial );
		this.add( this.base );

		this.gemMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xFF4444 ) } );
		this.gemGeometry = new THREE.DodecahedronGeometry( 6 );
		this.gem = new THREE.Mesh( this.gemGeometry, this.gemMaterial );
		this.gem.position.setY( 10 );
		this.add( this.gem );

		this.position.set( position.x, position.y, position.z );

		parent.add( this );

		PUZODER.Scenery.push( this );

		this.gemRotation = 0;
		this.rotationSpeed = 0.01;
	}

	click() {
			if ( this.rotationSpeed == 0.01 ) {
			this.timeLeftModifier = 1.5;
			this.rotationSpeed = 0.05;

			sfxMagic.play();
		}
	}

	update() {
		this.gemRotation += this.rotationSpeed;
		this.gem.rotation.set( this.gemRotation, this.gemRotation, this.gemRotation );
	}
}