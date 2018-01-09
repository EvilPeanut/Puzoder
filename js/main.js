var isDebug = true;
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

scene.add(sunLight);

// Ground plane texture
var groundPlaneTexture = new THREE.TextureLoader().load( 'img/texture/floor_grass.jpg' );
groundPlaneTexture.wrapS = THREE.RepeatWrapping;
groundPlaneTexture.wrapT = THREE.RepeatWrapping;
groundPlaneTexture.repeat = new THREE.Vector2(6, 6);

// Wall textures
var wallTexture = new THREE.TextureLoader().load( 'img/texture/brick.jpg' );
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.x = 5;

var wallSmallTexture = new THREE.TextureLoader().load( 'img/texture/brick.jpg' );
wallSmallTexture.wrapS = THREE.RepeatWrapping;
wallSmallTexture.wrapT = THREE.RepeatWrapping;
wallSmallTexture.repeat.x = 1.875;

// Door texture
var doorTexture = new THREE.TextureLoader().load( 'img/texture/metal.jpg' );

// Decal textures
var decalWallDamage1Texture = new THREE.TextureLoader().load( 'img/texture/decal_wall_damage_1.png' );
var decalWallDamage2Texture = new THREE.TextureLoader().load( 'img/texture/decal_wall_damage_2.png' );
var decalCrack1Texture = new THREE.TextureLoader().load( 'img/texture/decal_crack_1.png' );
var decalRust1Texture = new THREE.TextureLoader().load( 'img/texture/decal_rust_1.png' );

// Sign textures
var signTogetherTexture = new THREE.TextureLoader().load( 'img/texture/sign_together.png' );
var signJerseyTexture = new THREE.TextureLoader().load( 'img/texture/sign_jersey.png' );
var signSarkTexture = new THREE.TextureLoader().load( 'img/texture/sign_sark.png' );
var signHermTexture = new THREE.TextureLoader().load( 'img/texture/sign_herm.png' );

// Flag textures
var flagJerseyTexture = new THREE.TextureLoader().load( 'img/texture/flag_jersey.png' );

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
$( "#button_exit" ).click( function() { $( "#menu_main" ).fadeIn( 400 ) } );

addPointerlockElement("button_play", null, function() {
	$( "#menu_pause" ).show();
});

addPointerlockElement("button_resume", function() {
	$( "#menu_pause" ).hide();
});

function play() {
	$( "#menu_main" ).fadeOut( 400 );
}

function showLeaderboard() {
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
	//var testRoom = new PUZODER.ButtonLockRoom(new THREE.Vector2(0, 0), 0);
	//testRoom.addToScene();
}, 100);

//player.setRoom( new THREE.Vector2(1, 1) );