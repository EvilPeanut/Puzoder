var isDebug = false;
var isCollisionDebug = false;

PUZODER.Rooms = [];
PUZODER.RoomTemplates = [];
PUZODER.Scenery = [];
PUZODER.Collidables = [];

var puzzleTimer = new PUZODER.Timer();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3500 );

var player = new PUZODER.Player( camera );
player.getObject().position.set( 0, 12, 0 );
player.getObject().rotation.y = Math.PI;
player.getObject().dontDestroy = true;
scene.add( player.getObject() );

// Direction enum
PUZODER.Direction = {
	NORTH: 0,
	EAST: 1,
	SOUTH: 2,
	WEST: 3
}

// Audio listener
var listener = new THREE.AudioListener();
camera.add( listener );

// Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMapSoft = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Ambient light
var ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.5);
ambientLight.dontDestroy = true;
scene.add(ambientLight);

// Directional light
var sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(128, 128, 128);
sunLight.castShadow = true;

sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;

sunLight.shadow.camera.left = -90;
sunLight.shadow.camera.right = 90;
sunLight.shadow.camera.bottom = -90;
sunLight.shadow.camera.top = 90;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 320;

sunLight.intensity = 1;

sunLight.dontDestroy = true;

scene.add(sunLight);

// Texture loader
var textureLoader = new THREE.TextureLoader();
function loadTexture(name) {
	return textureLoader.load( 'img/texture/' + name );
}

// Ground plane texture
var groundPlaneTexture = loadTexture( 'floor_grass.jpg' );
groundPlaneTexture.wrapS = THREE.RepeatWrapping;
groundPlaneTexture.wrapT = THREE.RepeatWrapping;
groundPlaneTexture.repeat = new THREE.Vector2(6, 6);

// Wall textures
var wallTexture = loadTexture( 'brick.jpg' );
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.x = 5;

var wallSmallTexture = loadTexture( 'brick.jpg' );
wallSmallTexture.wrapS = THREE.RepeatWrapping;
wallSmallTexture.wrapT = THREE.RepeatWrapping;
wallSmallTexture.repeat.x = 1.875;

// Door texture
var doorTexture = loadTexture( 'metal.jpg' );

// Decal textures
var decalWallDamage1Texture = loadTexture( 'decal_wall_damage_1.png' );
var decalWallDamage2Texture = loadTexture( 'decal_wall_damage_2.png' );
var decalCrack1Texture = loadTexture( 'decal_crack_1.png' );
var decalRust1Texture = loadTexture( 'decal_rust_1.png' );

// Sign textures
var signTogetherTexture = loadTexture( 'sign_together.png' );
var signFastTexture = loadTexture( 'sign_fast.png' );
var signHueTexture = loadTexture( 'sign_hue.png' );
var signJerseyTexture = loadTexture( 'sign_jersey.png' );
var signSarkTexture = loadTexture( 'sign_sark.png' );
var signHermTexture = loadTexture( 'sign_herm.png' );

// Flag textures
var flagJerseyTexture = loadTexture( 'flag_jersey.png' );
var flagSarkTexture = loadTexture( 'flag_sark.png' );
var flagHermTexture = loadTexture( 'flag_herm.png' );

// Rune textures
var rune1Texture = loadTexture( 'rune_1.png' );
var rune2Texture = loadTexture( 'rune_2.png' );
var rune3Texture = loadTexture( 'rune_3.png' );
var rune4Texture = loadTexture( 'rune_4.png' );
var rune5Texture = loadTexture( 'rune_5.png' );

// Audio
var audioLoader = new THREE.AudioLoader();

// Music obtained from http://www.purple-planet.com
var music = new THREE.Audio( listener );
audioLoader.load( 'audio/music_shifting_sands.mp3', function( buffer ) {
	music.setBuffer( buffer );
	music.setLoop( true );
	music.setVolume( 0.1 );
	music.play();
});

// Sound effects obtained from https://www.zapsplat.com
var sfxFlick = new THREE.Audio( listener );
audioLoader.load( 'audio/sfx_flick.mp3', function( buffer ) {
	sfxFlick.setBuffer( buffer );
});

var sfxClick = new THREE.Audio( listener );
audioLoader.load( 'audio/sfx_click.mp3', function( buffer ) {
	sfxClick.setBuffer( buffer );
});

var sfxMagic = new THREE.Audio( listener );
audioLoader.load( 'audio/sfx_magic.mp3', function( buffer ) {
	sfxMagic.setBuffer( buffer );
});

// Skydome
function loadShader(URL, name, callback) {
	$.ajax( {
		url: URL,
		dataType: "text",
		success: function ( data ) {
			THREE.ShaderLib[ name ] = data;
			callback();
		}
	} );
}

var skydome;

loadShader( 'shader/default_vertex.shader', 'default_vertex', function() {
	loadShader( 'shader/gradient_fragment.shader', 'gradient_fragment', function() {
		skydome = new THREE.Mesh(new THREE.SphereGeometry(3300, 32, 15), 
		    new THREE.ShaderMaterial({
		        vertexShader: THREE.ShaderLib[ 'default_vertex' ],
		        fragmentShader: THREE.ShaderLib[ 'gradient_fragment' ],
		        uniforms: {
		            topColor:    { value: new THREE.Color("#0077FF") },
		            bottomColor: { value: new THREE.Color("#FFFFFF") },
		            starOpacity: { value: 0.05 },
		            offset:      { value: 33 },
		            exponent:    { value: 0.6 }
		        },
		        side: THREE.BackSide
		    })
		);

		skydome.dontDestroy = true;

		scene.add( skydome );
	} );
} );

//
// Render loop
//
function render () {
	$( document ).trigger( 'update' );

	for (var i = 0, len = PUZODER.Scenery.length; i < len; i++) {
		if ( PUZODER.Scenery[i].update ) PUZODER.Scenery[i].update();
	}

	if ( skydome ) skydome.position.copy( player.getObject().position );

	requestAnimationFrame( render );
	renderer.render( scene, camera );
}

render();

//
// Adjust viewport on window resize
//
$( window ).resize(function() {
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

//
// Menu functions
//
$( "#button_play" ).click( function() { play() } );
$( "#button_leaderboard" ).click( function() { showLeaderboard() } );
$( "#button_leaderboard_back" ).click( function() { hideLeaderboard() } );
$( "#button_about" ).click( function() { showAbout() } );
$( "#button_about_back" ).click( function() { hideAbout() } );
$( "#button_exit" ).click( function() { puzzleTimer.stop(); $( "#menu_main" ).fadeIn( 400 ) } );
$( "#button_submit_score" ).click( function() {
	$( "#menu_pause" ).hide();
	$( "#menu_main" ).fadeIn( 400 );
	connection.send( JSON.stringify( { type: '1', player: $( "#menu_gameover_playername" ).val(), score: player.score } ) );
} );

addPointerlockElement("button_play", null, function() {
	$( "#menu_pause_score_text" ).text( player.score );
	$( "#menu_pause" ).show();
	puzzleTimer.stop();
});

addPointerlockElement("button_resume", function() {
	if ( player.room && !player.room.isCompleted ) puzzleTimer.start();
	$( "#menu_pause" ).hide();
});

function play() {
	if ( player.isDead ) {
		resetMap();

		player.isDead = false;
		player.puzzlesCompleted = 0;
		player.score = 0;

		$( "#menu_gameover" ).hide();
	} else {
		if ( player.room && !player.room.isCompleted ) puzzleTimer.start();
	}

	$( "#menu_main" ).fadeOut( 400 );
}

function showLeaderboard() {
	getLeaderboard();

	$( "#menu_main_content_buttons" ).fadeOut( 400, function() {
		$( "#menu_main_content_leaderboard" ).fadeIn( 400 );
	});
}

function hideLeaderboard() {
	$( "#menu_main_content_leaderboard" ).fadeOut( 400, function() {
		$( "#menu_main_content_buttons" ).fadeIn( 400 );
	});
}

function showAbout() {
	$( "#menu_main_content_buttons" ).fadeOut( 400, function() {
		$( "#menu_main_content_about" ).fadeIn( 400 );
	});
}

function hideAbout() {
	$( "#menu_main_content_about" ).fadeOut( 400, function() {
		$( "#menu_main_content_buttons" ).fadeIn( 400 );
	});
}

if (isDebug) {
	play();
	$( "#menu_pause" ).show();
}

//
// Reset the map
//
function resetMap() {
	for ( var i = 0; i < scene.children.length; i++ ) {
		if ( !scene.children[i].dontDestroy ) scene.remove( scene.children[i] );
	}

	PUZODER.Rooms = [];
	PUZODER.Scenery = [];
	PUZODER.Collidables = [];

	if ( scene.children.length > 4 ) {
		resetMap();
	} else {
		setTimeout(() => {
			var startingRoom = new PUZODER.StartingRoom(new THREE.Vector2(0, 0), 0);
			startingRoom.addToScene();

			player.getObject().position.set( 0, 12, 0 );
			player.getObject().rotation.y = Math.PI;
		}, 100);
	}
}

//
// Return the co-ordinates of the room the vector is in
//
function getRoom( position ) {
	var roomX = Math.floor( ( position.x + 48 ) / 96 );
	var roomZ = Math.floor( ( position.z + 48 ) / 96 );

	return new THREE.Vector2( roomX, roomZ );
}

//
// Collision detection
//
function isColliding( position ) {
	for ( var i = 0; i < PUZODER.Collidables.length; i++ ) {
		if ( PUZODER.Collidables[i].boundingBox.containsPoint( position ) ) {
			return true;
		}
	}
	return false;
}

//
// Map generation
//
function rotateDirection( direction, rotation ) {
	return ( direction + rotation ) % 4;
}

function isRoomPositionTaken( position ) {
	for ( var i = 0; i < PUZODER.Rooms.length; i++ ) {
		var room = PUZODER.Rooms[i];

		if ( room.position.equals( position ) ) {
			return true;
		}
	}

	return false;
}

setTimeout(() => {
	var startingRoom = new PUZODER.StartingRoom(new THREE.Vector2(0, 0), 0);
	startingRoom.addToScene();
}, 100);