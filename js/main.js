var isDebug = false;

PUZODER.Rooms = [];

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x87CEFA );

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3500 );
//var controls = new THREE.OrbitControls(camera);

// Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//TODO: Check all below are required
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMapSoft = true;

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
var groundPlaneTexture = new THREE.TextureLoader().load( 'img/texture/default.png' );
groundPlaneTexture.wrapS = THREE.RepeatWrapping;
groundPlaneTexture.wrapT = THREE.RepeatWrapping;
groundPlaneTexture.repeat = new THREE.Vector2(16, 16);

// Door texture
var doorTexture = new THREE.TextureLoader().load( 'img/texture/metal.jpg' );

/*var groundPlaneMaterial = new THREE.MeshPhongMaterial( { map: groundPlaneTexture } );
var groundPlaneGeometry = new THREE.PlaneBufferGeometry( 96, 96, 1, 1 );
groundPlaneGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
var groundPlane = new THREE.Mesh( groundPlaneGeometry, groundPlaneMaterial );
groundPlane.castShadow = false;
groundPlane.receiveShadow = true;
scene.add( groundPlane );*/

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

		scene.add(skydome);
	} );
} );

// Walls
var wallTexture = new THREE.TextureLoader().load( 'img/texture/brick.jpg' );
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.x = 5;

//
//
//

function animate () {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
}

// Adjust viewport on window resize
$( window ).resize(function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

//
//
//
var controls = new THREE.PointerLockControls( camera );
scene.add( controls.getObject() );

controls.getObject().position.set(0, 12, 35);

addPointerlockElement("play_button", null, function() {
	$( "#menu_pause" ).show();
});
addPointerlockElement("menu_pause", function() {
	$( "#menu_pause" ).hide();
});
//
//
//
animate();

//
//
//
$( "#play_button" ).click( function() { play() } );

function play() {
	$( "#menu_main" ).fadeOut( 400 );
}

if (isDebug) {
	play();
}

//
//
//
new PUZODER.StartingRoom(new THREE.Vector2(0, 0), 0);
new PUZODER.TwoDoorRoom(new THREE.Vector2(0, -1), 2);