PUZODER.Orb = class Orb extends THREE.Object3D {
	constructor( parent, position, targetColor ) {
		super();

		this.poleMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xDDDDDD ) } );
		this.poleGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 8, 32 );
		this.pole = new THREE.Mesh( this.poleGeometry, this.poleMaterial );
		this.pole.position.setY( 4 );
		this.add( this.pole );

		this.poleTopMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xEEEEEE ) } );
		this.poleTopGeometry = new THREE.CylinderGeometry( 2, 2, 0.25, 32 );
		this.poleTop = new THREE.Mesh( this.poleTopGeometry, this.poleTopMaterial );
		this.poleTop.position.setY( 8 );
		this.add( this.poleTop );

		this.sphereMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xFF0000 ), transparent: true, opacity: 0.8 } );
		this.sphereGeometry = new THREE.SphereGeometry( 2, 32, 32 );
		this.sphere = new THREE.Mesh( this.sphereGeometry, this.sphereMaterial );
		this.sphere.position.setY( 10 );
		this.add( this.sphere );

		this.position.set( position.x, position.y, position.z );

		this.onClick = function() {};

		parent.add( this );

		PUZODER.Scenery.push( this );
	
		// Additional properties
		this.fade = true;
		this.targetColor = targetColor;
		this.power = 0;
	}

	click() {
		this.power = Math.min( 1, this.power + 0.075 );

		this.onClick();

		sfxClick.play();
	}

	update() {
		if ( this.fade ) {
			this.sphereMaterial.color.r = Math.lerp( 1, this.targetColor.r, this.power );
			this.sphereMaterial.color.g = Math.lerp( 0, this.targetColor.g, this.power );
			this.sphereMaterial.color.b = Math.lerp( 0, this.targetColor.b, this.power );

			this.power = Math.max( 0, this.power - 0.0025 );
		}
	}
}