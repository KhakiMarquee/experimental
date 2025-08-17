import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function initThreeScene() {
  const container = document.getElementById('three-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 1, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // ✅ Renderer config for realistic GLTF / PBR materials
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.physicallyCorrectLights = true;

  // ✅ Fallback environment for realistic reflections/ambient
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

  // (Optional) keep these if you want guaranteed minimum lighting
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.3));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  // DRACO + GLTF loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  loader.load(
  "https://freight.cargo.site/m/S2506763425080988685314661109729/room3.glb",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Debug
    console.log("Scene children:", model.children.map(c => c.name));
    const gltfLights = [];
    model.traverse(o => { if (o.isLight) gltfLights.push(o); });
    console.log("Lights in GLTF:", gltfLights.map(l => `${l.type} ${l.name || ''} i=${l.intensity}`));

    // Traverse all meshes to ensure PBR materials are using the environment map
    model.traverse((child) => {
      if (child.isMesh) {
        const mat = child.material;
        if (mat && mat.isMeshStandardMaterial) {
          mat.envMap = scene.environment;
          mat.envMapIntensity = 1.0;
          mat.needsUpdate = true;
        }
      }
    });

    // --- Camera setup ---
    const namedCamera = model.getObjectByName("mainView");
    if (namedCamera && namedCamera.isCamera) {
      console.log("Using GLTF camera:", namedCamera);

      // Copy projection
      if (namedCamera.isPerspectiveCamera && camera.isPerspectiveCamera) {
        camera.fov = namedCamera.fov;
        camera.near = namedCamera.near;
        camera.far  = namedCamera.far;
      }

      // Copy world transform
      namedCamera.updateWorldMatrix(true, true);
      camera.matrix.copy(namedCamera.matrixWorld);
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);

      // Keep aspect ratio
      camera.aspect = container.clientWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      // OrbitControls target
      controls.object = camera;
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
      const camTarget = camera.position.clone().add(forward.multiplyScalar(10));
      controls.target.copy(camTarget);
      controls.update();
    } else {
      console.warn("Camera 'mainView' not found or not a camera.");
    }
  },
  undefined,
  (error) => console.error("Error loading GLB:", error)
);

  // Resize handling
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

  // Animate
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
