PUZODER.ThreeDoorRoom = class extends PUZODER.PuzzleRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.entrance = PUZODER.Direction.SOUTH;
		this.exits = [ PUZODER.Direction.WEST, PUZODER.Direction.EAST ];

		super.generateFloor();

		super.generateWall( PUZODER.Direction.NORTH );
		super.generateWall( PUZODER.Direction.EAST, true );
		super.generateWall( PUZODER.Direction.SOUTH, true );
		super.generateWall( PUZODER.Direction.WEST, true );

		super.completeGeneration();
	}
}