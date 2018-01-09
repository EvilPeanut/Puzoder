PUZODER.FourDoorRoom = class extends PUZODER.PuzzleRoom {
	constructor( position, rotation ) {
		super( position, rotation );

		this.entrance = PUZODER.Direction.SOUTH;
		this.exits = [ PUZODER.Direction.NORTH, PUZODER.Direction.EAST, PUZODER.Direction.WEST ];

		super.generateFloor();

		super.generateWall( PUZODER.Direction.NORTH, true );
		super.generateWall( PUZODER.Direction.EAST, true );
		super.generateWall( PUZODER.Direction.SOUTH, true );
		super.generateWall( PUZODER.Direction.WEST, true );

		super.completeGeneration();
	}
}