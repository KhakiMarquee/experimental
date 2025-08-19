import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

    // Create sunlight
  const sun = new THREE.DirectionalLight(0xffffff, 1); // white light, intensity 1
  sun.position.set(10, 20, 10); // position in world space
  sun.castShadow = true;        // enable shadows if needed

    // Optional: tweak shadow properties for better quality
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;

    // Add to scene
    scene.add(sun);
      

  // ✅ Declare and set up DRACO and GLTF loaders
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

// Configure renderer for realistic GLTF materials
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.1;
scene.background = new THREE.Color(0x111111);

// Load the GLB
loader.load(
  "https://freight.cargo.site/m/Q2507915910855053767197342388193/triple_base_seats_cyan.glb",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Debug
    console.log("Scene children:", model.children.map(c => c.name));
    const gltfLights = [];
    model.traverse(o => { if (o.isLight) gltfLights.push(o); });
    console.log("Lights in GLTF:", gltfLights.map(l => `${l.type} ${l.name || ''} i=${l.intensity}`));

    // Dim all lights in the GLTF
    model.traverse((obj) => {
      if (obj.isLight) {
        console.log(`Dim light: ${obj.type} ${obj.name} from ${obj.intensity}`);
        obj.intensity *= 0.05; // reduce intensity to 5%
        console.log(`New intensity: ${obj.intensity}`);
      }
    });

    // --- Camera setup: COPY into existing camera (do NOT reassign the const) ---
    const namedCamera = model.getObjectByName("Radial_cam"); //camera name
    if (namedCamera && namedCamera.isCamera) {
      console.log("Using GLTF camera:", namedCamera);

      // 1) Copy projection if it's a PerspectiveCamera (common in glTF)
      if (namedCamera.isPerspectiveCamera && camera.isPerspectiveCamera) {
        camera.fov = namedCamera.fov;
        camera.near = namedCamera.near;
        camera.far  = namedCamera.far;
      }
      // (Optional) handle orthographic → perspective mismatch here if needed

      // 2) Copy world transform (position + rotation) from the GLTF camera
      namedCamera.updateWorldMatrix(true, true);
      camera.matrix.copy(namedCamera.matrixWorld);
      camera.matrix.decompose(camera.position, camera.quaternion, camera.scale);

      // 3) Keep your app's aspect ratio
      camera.aspect = (container.clientWidth) / (window.innerHeight);
      camera.updateProjectionMatrix();

      // 4) Update OrbitControls to use (the same) camera, with a target in front
      controls.object = camera;
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
      const camTarget = camera.position.clone().add(forward.multiplyScalar(10)); // adjust distance if needed
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


