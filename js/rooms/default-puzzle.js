PUZODER.PuzzleRoom = class {
	constructor() {
		this.object = new THREE.Object3D();
	}

	setCompleted( completed ) {
		this.isCompleted = completed;

		if ( this.isCompleted ) {
			player.score += this.score;
			player.puzzlesCompleted++;

			puzzleTimer.stop();
		} else {
			player.score -= this.score;
			player.puzzlesCompleted--;

			puzzleTimer.start();
		}

		$( "#menu_pause_score_text" ).text( player.score );
	}

	computeBoundingBoxes() {
		for ( var i = 0; i < this.object.children.length; i++ ) {
			if ( this.object.children[i] instanceof PUZODER.Wall || this.object.children[i] instanceof PUZODER.Door ) {
				this.object.children[i].boundingBox.setFromObject( this.object.children[i].mesh );

				var min = new THREE.Vector3().copy( this.object.children[i].boundingBox.min );
				var max = new THREE.Vector3().copy( this.object.children[i].boundingBox.max );

				var difference = min.sub( max );
				difference.set( Math.abs( difference.x ), Math.abs( difference.y ), Math.abs( difference.z ) );

				if ( difference.x < difference.z ) {
					this.object.children[i].boundingBox.expandByVector( new THREE.Vector3( 1, 0, 0 ) );
				} else {
					this.object.children[i].boundingBox.expandByVector( new THREE.Vector3( 0, 0, 1 ) );
				}
			}
		}
	}
}