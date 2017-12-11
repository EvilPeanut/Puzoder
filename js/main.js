var isDebug = true;

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

/*var wallA = new PUZODER.Wall(new THREE.Vector3(0, 8, 48), new THREE.Vector3(96, 16, 1), 0);
var wallB = new PUZODER.Wall(new THREE.Vector3(-30, 8, -48), new THREE.Vector3(36, 16, 1), 0);
var wallB2 = new PUZODER.Wall(new THREE.Vector3(30, 8, -48), new THREE.Vector3(36, 16, 1), 0);
var wallC = new PUZODER.Wall(new THREE.Vector3(-48, 8, 0), new THREE.Vector3(96, 16, 1), -Math.PI / 2);
var wallD = new PUZODER.Wall(new THREE.Vector3(48, 8, 0), new THREE.Vector3(96, 16, 1), -Math.PI / 2);*/

//
//
//
var composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

var postProcessor = new PUZODER.PostProcessor();

var blurIntensity = 0.1; //0.002

postProcessor.add("horizontalBlur", THREE.HorizontalBlurShader);
postProcessor.add("verticalBlur", THREE.VerticalBlurShader, true);

postProcessor.setUniform("horizontalBlur", "h", blurIntensity);
postProcessor.setUniform("verticalBlur", "v", blurIntensity);
//
//
//

function animate () {
	requestAnimationFrame( animate );
	renderer.render(scene, camera);

	composer.render();
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

var instructions = document.getElementById("pointerlockinstructions");//$("#pointerlockinstructions");
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
if ( havePointerLock ) {
	var element = document.body;
	var pointerlockchange = function ( event ) {
		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
			controls.enabled = true;
			instructions.style.display = 'none';
		} else {
			controls.enabled = false;
			instructions.style.display = 'block';
		}
		JOYPAD.options.enabled = controls.enabled;
	};
	var pointerlockerror = function ( event ) {
		//instructions.style.display = '';
	};
	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
	instructions.addEventListener( 'click', function ( event ) {
		instructions.style.display = 'none';
		// Ask the browser to lock the pointer
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		if ( /Firefox/i.test( navigator.userAgent ) ) {
			var fullscreenchange = function ( event ) {
				if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
					document.removeEventListener( 'fullscreenchange', fullscreenchange );
					document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
					element.requestPointerLock();
				}
			};
			document.addEventListener( 'fullscreenchange', fullscreenchange, false );
			document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
			element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
			element.requestFullscreen();
		} else {
			element.requestPointerLock();
		}
	}, false );
} else {
	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
}
//
//
//
animate();

//
//
//
$( "#play-button" ).click( function() { play() } );

function play() {
	unblur(350);
	$( "#mainmenu" ).fadeOut( 400, function() {
		postProcessor.disable("verticalBlur");
		$( "#pointerlockinstructions" ).fadeIn( 200 );
	});
}

if (isDebug) {
	play();
}

function unblur(speed) {
	var step = blurIntensity / speed;

	for (var i = 0; i < speed; i++) {
		setTimeout(function() {
			blurIntensity -= step;

			postProcessor.setUniform("horizontalBlur", "h", blurIntensity);
			postProcessor.setUniform("verticalBlur", "v", blurIntensity);
		}, i);
	}
}

//
//
//
new PUZODER.StartingRoom(new THREE.Vector2(0, 0), 0);
new PUZODER.TwoDoorRoom(new THREE.Vector2(0, -1), 2);