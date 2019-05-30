if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}
var container, stats, clock, gui, mixer, actions, activeAction, previousAction, focalPoint;
var camera, scene, renderer, model, face, controls, cameraSetX, cameraSetY, cameraSetZ, cameraLookAtY, cameraLookAtZ;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var dialogCount = 0;

function checkDeviceSize(x) {
  if (x.matches) { // If media query matches
    cameraSetY = 3;
    cameraSetZ = 32;
    cameraLookAtY = 4;
    cameraLookAtZ = 20;
    focalPoint = 30;
  } else {
    cameraSetY = 3;
    cameraSetZ = 10;
    cameraLookAtY = 2;
    cameraLookAtZ = 0;
    focalPoint = 60;
  }
}

var x = window.matchMedia("(min-width: 992px)")
checkDeviceSize(x) // Call listener function at run time
x.addListener(checkDeviceSize) // Attach listener function on state changes

var mouseX = 0;
var mouseXOnMouseDown = 0;
var api = { state: 'Idle' };
init();
animate();
function init() {
  container = document.createElement( 'div' );
  document.getElementById('robot').appendChild( container );
  camera = new THREE.PerspectiveCamera( focalPoint, window.innerWidth / window.innerHeight, 0.25, 100 );
  camera.position.set( - 5, 3, cameraSetZ );
  camera.lookAt( new THREE.Vector3( 0, cameraLookAtY, cameraLookAtZ ) );
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );
  scene.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );
  clock = new THREE.Clock();
  // lights
  var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
  // light.castShadow = true; 
  light.position.set( 0, 20, 0 );
  scene.add( light );
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 20, 10 );
  scene.add( light );


  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  
  function onDocumentMouseDown( event ) {
    event.preventDefault();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
  }

  function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
  }

  function onDocumentMouseUp() {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
  }
  function onDocumentMouseOut() {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
  }

  function onDocumentTouchStart( event ) {
    if ( event.touches.length == 1 ) {
      event.preventDefault();
      mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
      targetRotationOnMouseDown = targetRotation;
    }
  }
  function onDocumentTouchMove( event ) {
    if ( event.touches.length == 1 ) {
      event.preventDefault();
      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
    }
  }

  
  var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
  mesh.rotation.x = - Math.PI / 2;
  scene.add( mesh );
  var grid = new THREE.GridHelper( 200, 40, 0x000000, 0x000000 );
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add( grid );
  
  
  
  // model
  var loader = new THREE.GLTFLoader();
  loader.load( 'js/models/gltf/RobotExpressive/RobotExpressive.glb', function( gltf ) {
    model = gltf.scene;
    scene.add( model );
    initRobot( model, gltf.animations );
  }, undefined, function( e ) {
    console.error( e );
  } );
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;
  container.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
}



function initRobot( model, animations ) {
  var states = [ 'Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing' ];
  var emotes = [ 'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp' ];
  mixer = new THREE.AnimationMixer( model );
  actions = {};
  unlimitedActions = {};
  for ( var i = 0; i < animations.length; i++ ) {
    var clip = animations[ i ];
    var action = mixer.clipAction( clip );
    // var infAction = mixer.clipAction( clip );
    actions[ clip.name ] = action;
    // if ( emotes.indexOf( clip.name ) >= 0 || states.indexOf( clip.name ) >= 4 ) {
    //   action.clampWhenFinished = true;
    //   action.loop = THREE.LoopOnce;
    // }
  }

  face = model.getObjectByName( 'Head_2' );
  var expressions = Object.keys( face.morphTargetDictionary );
  activeAction = actions['Idle'];
  activeAction.play();

  

  document.getElementById('dialog-bubble').addEventListener('click', function() {
    dialogCount++;
    changeMotion(dialogCount);
  });

  var changeMotion = function (dialogCount) {
    switch (dialogCount) {
      case 0:
        fadeToAction( 'Wave', 0.2 );
        mixer.addEventListener( 'finished', restoreState );
        activeAction.play();
        return;
      case 1:
        fadeToAction( 'Dance', 0.2 );
        mixer.addEventListener( 'finished', restoreState );
        activeAction.play();
        return;
      case 2:
        fadeToAction( 'Idle', 0.2 );
        mixer.addEventListener( 'finished', restoreState );
        activeAction.play();
        face.morphTargetInfluences = [1.5, 0, 0];
        return;
      case 3:
        face.morphTargetInfluences = [0, 0, 0];
        fadeToAction( 'ThumbsUp', 0.2 );
        mixer.addEventListener( 'finished', restoreState );
        activeAction.play();
        return;
      case 4:
        fadeToAction( 'Dance', 0.2 );
        mixer.addEventListener( 'finished', restoreState );
        activeAction.play();
        return;
      case 5:
        fadeToAction( 'Idle', 0.2 );
        mixer.addEventListener( 'finished', restoreState );
        activeAction.play();
        return;
    }
  }
  changeMotion(dialogCount);

  document.getElementById('wave').addEventListener('click', function() {
    fadeToAction( 'Wave', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('dance').addEventListener('click', function() {
    fadeToAction( 'Dance', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('run').addEventListener('click', function() {
    fadeToAction( 'Running', 0.2 );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('walk').addEventListener('click', function() {
    fadeToAction( 'Walking', 0.2 );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('angry').addEventListener('click', function() {
    face.morphTargetInfluences = [1.5, 0, 0];
  });

  document.getElementById('happy').addEventListener('click', function() {
    face.morphTargetInfluences = [0, 0, 0];
  });

  document.getElementById('surprised').addEventListener('click', function() {
    face.morphTargetInfluences = [0, 1, 0];
  });

  document.getElementById('sad').addEventListener('click', function() {
    face.morphTargetInfluences = [0, 0.5, 1.5];
  });

  document.getElementById('idle').addEventListener('click', function() {
    fadeToAction( 'Idle', 0.2 );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('robot').addEventListener('click', function() {
    fadeToAction( 'Death', 0.2 );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('punch').addEventListener('click', function() {
    fadeToAction( 'Punch', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('sitting').addEventListener('click', function() {
    fadeToAction( 'Sitting', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('standing').addEventListener('click', function() {
    fadeToAction( 'Standing', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('jump').addEventListener('click', function() {
    fadeToAction( 'Jump', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('yes').addEventListener('click', function() {
    fadeToAction( 'Yes', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('no').addEventListener('click', function() {
    fadeToAction( 'No', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  document.getElementById('thumbsup').addEventListener('click', function() {
    fadeToAction( 'ThumbsUp', 0.2, true );
    mixer.addEventListener( 'finished', restoreState );
    activeAction.play();
  });

  function restoreState() {
    mixer.removeEventListener( 'finished', restoreState );
    fadeToAction( api.state, 0.2 );
  }

  function fadeToAction( name, duration, loop ) {
    previousAction = activeAction;
    activeAction = actions[ name ];
    if ( previousAction !== activeAction ) {
      previousAction.fadeOut( duration );
    }
    if (loop) {
      activeAction.clampWhenFinished = true;
      activeAction.loop = THREE.LoopOnce;
    }
    activeAction
      .reset()
      .setEffectiveTimeScale( 1 )
      .setEffectiveWeight( 1 )
      .fadeIn( duration )
      .play();
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  var dt = clock.getDelta();
  if ( mixer ) mixer.update( dt );
  if (model) {
    model.rotation.y += ( targetRotation - model.rotation.y ) * 0.05;
  }
  // console.log(model);
  // controls.update( dt );
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
