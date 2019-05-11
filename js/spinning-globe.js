(function () {
  var mousePos = {x:.5,y:.5};
  document.addEventListener('mousemove', function (event) {  mousePos = {x:event.clientX/window.innerWidth, y:event.clientY/window.innerHeight};});
  var phase = 0;

  var focalPoint = 55;

  function myFunction(x) {
    if (x.matches) { // If media query matches
      focalPoint = 55;
    } else {
      focalPoint = 75;
    }
  }

  var x = window.matchMedia("(min-width: 992px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes

  var camera, drawStars, fillLight, mesh, renderer, scene;

  camera = mesh = scene = renderer = fillLight = void 0;

  

  window.onload = function () {
    var animate, base, baseMat, e, geometryBase, highTerran, highTerranMat, light, material, terran, terranGeom, terranHighGeom;
    // drawStars();
    camera = new THREE.PerspectiveCamera(focalPoint, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff ).setStyle( {style: "rgba(255, 255, 255, 0)"} );
    geometryBase = new THREE.SphereGeometry(400, 50, 56);
    terranGeom = new THREE.SphereGeometry(398, 30, 30);
    terranHighGeom = new THREE.SphereGeometry(390, 20, 20);
    baseMat = new THREE.MeshLambertMaterial({
      color: 0x76acda,
      shading: THREE.FlatShading });

    material = new THREE.MeshLambertMaterial({
      color: 0xb8b658,
      shading: THREE.FlatShading });

    highTerranMat = new THREE.MeshLambertMaterial({
      color: 0xe3c97f,
      shading: THREE.FlatShading });

    geometryBase.vertices.forEach(function (v) {
      return v[["x", "y", "z"][~~(Math.random() * 3)]] += Math.random() * 10;
    });
    [terranHighGeom.vertices, terranGeom.vertices].forEach(function (g) {
      return g.forEach(function (v) {
        return v[["x", "y", "z"][~~(Math.random() * 3)]] += Math.random() * 40;
      });
    });
    base = new THREE.Mesh(geometryBase, baseMat);
    terran = new THREE.Mesh(terranGeom, material);
    highTerran = new THREE.Mesh(terranHighGeom, highTerranMat);
    scene.add(base);
    base.add(terran);
    base.add(highTerran);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    fillLight = new THREE.AmbientLight(0x2e1527);
    scene.add(fillLight);
    try {
      renderer = new THREE.WebGLRenderer();
    } catch (error) {
      e = error;
      renderer = new THREE.CanvasRenderer();
      alert("come back in chrome or firefox! or enable webgl");
    }
    renderer.setSize(window.innerWidth/2.5, window.innerHeight/2.5);
    document.getElementById('3js-globe').appendChild(renderer.domElement);
    animate = function () {
      phase += 0.002;
      // base.rotation.y += 0.00125;
      base.rotation.y = phase;
      base.rotation.x = (mousePos.y-0.5) * Math.PI;
      base.rotation.z = (mousePos.x-0.5) * Math.PI;
      requestAnimationFrame(animate);
      return renderer.render(scene, camera);
    };
    return animate();
  };

}).call(this);
