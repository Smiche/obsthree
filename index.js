var texture = new THREE.TextureLoader().load("textures/ville-kanerva.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

uniforms = {
    amplitude: { value: 5.0 },
    opacity: { value: 0.3 },
    color: { value: new THREE.Color(0xff0000) }
};
var shaderMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true
});


var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    map: texture
});

var material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

var cube = new THREE.Mesh(geometry, material2);
//scene.add(cube);

var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

var controls = new THREE.OrbitControls(camera);
camera.position.set(0, 1, 5);

controls.update();

var loader = new THREE.ObjectLoader();

// load a resource
loader.load(
    // resource URL
    'models/emptyframe.json',

    // onLoad callback
    function(geometry2) {
        //var material = materials[0];
        geometry2.traverse(function(child) {

            if (child instanceof THREE.Mesh) {

                child.material = material;

            }

        });
        scene.add(geometry2);
    },

    // onProgress callback
    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },

    // onError callback
    function(err) {
        console.log('An error happened');
    }
);


var animate = function() {
    requestAnimationFrame(animate);

    controls.update();
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
};

animate();