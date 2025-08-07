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

  // Lighting
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  // ✅ Declare and set up DRACO and GLTF loaders
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  // Load the GLB
  loader.load(
    'https://freight.cargo.site/m/S2490051856888440866342665801697/landscape.glb',
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Optional: center model
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      // Try to find a added objects

      console.log('Available cameras:', gltf.cameras?.map(cam => cam.name));
      console.log('Scene lights:', scene.children.filter(obj => obj.isLight));

      let namedCamera = gltf.cameras?.find(cam => cam.name === 'mainView');

      if (!namedCamera) {
        // fallback: search scene graph
        namedCamera = model.getObjectByName('mainView');
        if (namedCamera && !namedCamera.isCamera) namedCamera = null;
      }
      if (namedCamera) {
        camera.copy(namedCamera);
        camera.updateProjectionMatrix();
        
        // Extract camera world position
        const camWorldPos = new THREE.Vector3();
        namedCamera.getWorldPosition(camWorldPos);

        // Extract camera world direction (normalized)
        const camWorldDir = new THREE.Vector3();
        namedCamera.getWorldDirection(camWorldDir);

        // Calculate a target point some distance ahead along the direction vector
        const targetDistance = 10; // adjust as needed
        const camTarget = camWorldPos.clone().add(camWorldDir.multiplyScalar(targetDistance));
        controls.object = camera;
        controls.target.copy(camTarget);
        controls.update();
        
      } else {
        console.warn('Named camera not found in glTF file.');
      }

      dracoLoader.dispose();
    },
    undefined,
    (error) => {
      console.error('Error loading GLB:', error);
    }
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
