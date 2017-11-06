var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x87CEFA );

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//var controls = new THREE.OrbitControls(camera);

// Renderer
var renderer = new THREE.WebGLRenderer({ antialias: true }); //TODO: Test antialias works
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

// Ground plane
var groundPlaneTexture = new THREE.TextureLoader().load( 'img/texture/default.png' );
groundPlaneTexture.wrapS = THREE.RepeatWrapping;
groundPlaneTexture.wrapT = THREE.RepeatWrapping;
groundPlaneTexture.repeat = new THREE.Vector2(16, 16);

var groundPlaneMaterial = new THREE.MeshPhongMaterial( { map: groundPlaneTexture } );
var groundPlaneGeometry = new THREE.PlaneBufferGeometry( 96, 96, 1, 1 );
groundPlaneGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
var groundPlane = new THREE.Mesh( groundPlaneGeometry, groundPlaneMaterial );
groundPlane.castShadow = false;
groundPlane.receiveShadow = true;
scene.add( groundPlane );

// Walls
var wallTexture = new THREE.TextureLoader().load( 'img/texture/brick.jpg' );
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.x = 5;

var wallMaterial = new THREE.MeshPhongMaterial( { map: wallTexture } );
var wallGeometry = new THREE.BoxBufferGeometry( 96, 16, 1 );

var wallAMesh = new THREE.Mesh( wallGeometry, wallMaterial );
wallAMesh.position.y = 8;
wallAMesh.position.z = 48;
wallAMesh.castShadow = true;
wallAMesh.receiveShadow = true;
scene.add( wallAMesh );

var wallBMesh = new THREE.Mesh( wallGeometry, wallMaterial );
wallBMesh.position.y = 8;
wallBMesh.position.z = -48;
wallBMesh.castShadow = true;
wallBMesh.receiveShadow = true;
scene.add( wallBMesh );

var wallCMesh = new THREE.Mesh( wallGeometry, wallMaterial );
wallCMesh.applyMatrix( new THREE.Matrix4().makeRotationY( -Math.PI / 2 ) );
wallCMesh.position.y = 8;
wallCMesh.position.x = -48;
wallCMesh.castShadow = true;
wallCMesh.receiveShadow = true;
scene.add( wallCMesh );

var wallDMesh = new THREE.Mesh( wallGeometry, wallMaterial );
wallDMesh.applyMatrix( new THREE.Matrix4().makeRotationY( -Math.PI / 2 ) );
wallDMesh.position.y = 8;
wallDMesh.position.x = 48;
wallDMesh.castShadow = true;
wallDMesh.receiveShadow = true;
scene.add( wallDMesh );

// Player mesh
var playerGeometry = new THREE.SphereGeometry( 5, 32, 32 );
var playerMaterial = new THREE.MeshPhongMaterial( {color: 0xffff00} );
var playerMesh = new THREE.Mesh( playerGeometry, playerMaterial );
playerMesh.position.y = 14;
playerMesh.castShadow = true;
playerMesh.receiveShadow = true;
scene.add( playerMesh );

// Default camera position
camera.position.y += 15;
camera.position.z += 35;

function animate () {
	playerMesh.position.copy(camera.position);
	requestAnimationFrame( animate );
	renderer.render(scene, camera);
}

animate();

// Adjust viewport on window resize
$( window ).resize(function() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});