PUZODER.HemisphereLight = class HemisphereLight extends THREE.Object3D {
	constructor( parent, position, rotation ) {
		super();

		this.backMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xDDDDDD ) } );
		this.backGeometry = new THREE.CylinderGeometry( 0.75, 1, 0.25, 16 );
		this.back = new THREE.Mesh( this.backGeometry, this.backMaterial );
		this.back.position.set( 0, 0, 0 );
		this.back.rotation.set( Math.PI / 2, 0, 0);
		this.add( this.back );

		this.bulbMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xFF0000 ), transparent: true, opacity: 0.8 } );
		this.bulbGeometry = new THREE.SphereGeometry( 0.6, 16, 16, 0, Math.PI );
		this.bulb = new THREE.Mesh( this.bulbGeometry, this.bulbMaterial );
		this.bulb.position.set( 0, 0, 0 );
		this.bulb.rotation.set( 0, 0, 0 );
		this.add( this.bulb );

		this.light = new THREE.PointLight( 0xFF0000, 6, 4.5 );
		this.light.position.set( 0, 0, 4 );
		this.light.visible = false;
		this.add( this.light );

		this.position.set( position.x, position.y, position.z );
		this.rotation.set( 0, rotation * ( Math.PI / 2 ), 0);

		parent.add( this );

		PUZODER.Scenery.push( this );
	}

	setColor(color) {
		this.bulbMaterial.color = color;
		this.light.color = color;
	}

	update() {
		
	}
}