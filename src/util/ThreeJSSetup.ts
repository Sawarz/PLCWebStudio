import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	1,
	500
);
camera.position.set(30, 30, 70);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0x404040, 70); // soft white light
scene.add(light);

function loadPlayerModel(scene: any, modelPath: any, playerModel: any) {
	const loader = new GLTFLoader();

	loader.load(
		modelPath,
		function (gltf) {
			let model = gltf.scene;
			model.position.set(0, -30, 25);
			model.scale.set(4, 4, 4);
			scene.add(model);
			playerModel.push(model);
			playerModel.push(gltf);
		},
		function (xhr) {},
		function (error) {
			console.error(error);
		}
	);
}

const controls = new OrbitControls(camera, renderer.domElement);

const playerModel: any = [];
loadPlayerModel(scene, "/scene.glb", playerModel);

export function animate() {
	requestAnimationFrame(animate);

	controls.update();

	renderer.render(scene, camera);
}