import {
    Scene,
    MeshBasicMaterial,
    Mesh,
    WebGLRenderer,
    PerspectiveCamera,
    Group,
    AxesHelper,
    TextureLoader,
    PlaneGeometry,
    Quaternion,
    Vector3,
    LinearFilter,
    DirectionalLight,
    AmbientLight,
    MeshLambertMaterial
} from 'three';
import { OrbitControls } from './OrbitControls';
import { ColladaLoader } from './ColladaLoader';
import { STLLoader } from './STLLoader';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 99999);
camera.position.z = 15;
camera.position.x = 5;
camera.lookAt(new Vector3(0, 0, 0));

const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true;
orbit.enableKeys = true;
var loader = new ColladaLoader();
loader.load('model/Triple Bunk 2/model.dae', function (result) {
    scene.add(result.scene);
});

loader.load('model/bed/model.dae', function (result) {
    result.scene.position.set(3, 0, 0);
    scene.add(result.scene);
});

loader.load('model/N_Artificial Plant-020/model.dae', function (result) {
    result.scene.position.set(3, 0, 1);
    scene.add(result.scene);
});


var loader = new STLLoader();
loader.load('model/1020974_FLEX.stl', function (stlGeometry) {
    var mat = new MeshLambertMaterial({ color: 0x00ffff });
    var stlMesh = new Mesh(stlGeometry, mat);
    // geometry.center(); //居中显示
    stlMesh.position.set(0, 0, 0);
    stlMesh.scale.set(0.001, 0.001, 0.001);
    stlMesh.rotateX(90);
    scene.add(stlMesh);
});

// var dirLight = new DirectionalLight(0xffffff, 1.7);
// dirLight.position.set(100, 100, 50);
// scene.add(dirLight);
var ambLight = new AmbientLight(0xffffff);
scene.add(ambLight);

const render = () => {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(renderer.domElement);
}, false);

render();