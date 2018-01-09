PUZODER.Teleporter = class extends THREE.Object3D {
	constructor( parent, position ) {
		super();

		this.baseMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0x4444FF ) } );
		this.baseGeometry = new THREE.CylinderGeometry( 8, 8, 0.5, 32 );
		this.base = new THREE.Mesh( this.baseGeometry, this.baseMaterial );
		this.add( this.base );

		this.middleMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0xCCCCFF ), transparent: true, opacity: 0.25 } );
		this.middleGeometry = new THREE.CylinderGeometry( 8, 8, 16, 32 );
		this.middle = new THREE.Mesh( this.middleGeometry, this.middleMaterial );
		this.middle.position.setY( 8.25 );
		this.add( this.middle );

		this.lidMaterial = new THREE.MeshPhongMaterial( { color: new THREE.Color( 0x4444FF ) } );
		this.lidGeometry = new THREE.CylinderGeometry( 8, 8, 0.5, 32 );
		this.lid = new THREE.Mesh( this.lidGeometry, this.lidMaterial );
		this.lid.position.setY( 16.5 );
		this.add( this.lid );

		this.light = new THREE.PointLight( 0x0000FF, 6, 45 );
		this.light.position.set( 0, 8, 0 );
		this.add( this.light );

		this.position.set( position.x, position.y, position.z );

		this.onClick = () => {};

		parent.add( this );

		PUZODER.Scenery.push( this );
	}

	click() {
		this.onClick();
		
		sfxMagic.play();
	}
}