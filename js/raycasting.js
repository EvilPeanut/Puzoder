var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var isMouseClick = false;

$( document ).on( 'update', function() {
    if ( !isMouseClick ) return;

    var mousePosition = new THREE.Vector2( 0, 0 );
    raycaster.setFromCamera( new THREE.Vector2(), camera ); 
    var intersects = raycaster.intersectObjects( PUZODER.Scenery, true );
    if ( intersects.length >= 1 && intersects[0].object.parent.click ) intersects[0].object.parent.click();

    isMouseClick = false;
});

$( document ).mousemove( function( event ) {
    mouse = new THREE.Vector2( event.pageX, event.pageY );
});

$( document ).mousedown( function() {
    isMouseClick = true;
});