PUZODER.OneDoorRoom = class extends PUZODER.PuzzleRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.entrance = PUZODER.Direction.NORTH;
		this.exits = [];

		super.generateFloor();

		super.generateWall( PUZODER.Direction.NORTH, true );
		super.generateWall( PUZODER.Direction.EAST );
		super.generateWall( PUZODER.Direction.SOUTH );
		super.generateWall( PUZODER.Direction.WEST );

		super.completeGeneration();
	}
}