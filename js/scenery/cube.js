PUZODER.Cube = class Cube extends THREE.Object3D {
	constructor( parent, position, size, rotation, color, colors ) {
		super();

		this.boxMaterial = new THREE.MeshPhongMaterial( { color: color } );
		this.boxGeometry = new THREE.BoxGeometry( size.x, size.y, size.z );
		this.box = new THREE.Mesh( this.boxGeometry, this.boxMaterial );
		this.add( this.box );

		this.position.set( position.x, position.y, position.z );
		this.rotation.set( 0, rotation * ( Math.PI / 2 ), 0);

		this.onClick = function() {};

		parent.add( this );

		PUZODER.Scenery.push( this );

		// Additional properties
		this.colors = colors;
	}

	getColor() {
		return this.boxMaterial.color;
	}

	nextColor() {
		var index = this.colors.indexOf( this.boxMaterial.color );

		if (index == this.colors.length - 1) {
			this.boxMaterial.color = this.colors[ 0 ];
		} else {
			this.boxMaterial.color = this.colors[ index + 1 ];
		}
	}

	click() {
		this.onClick();

		sfxClick.play();
	}

	update() {

	}
}