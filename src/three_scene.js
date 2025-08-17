import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function initThreeScene() {
  // Procedural texture generation functions
  function createProceduralNormalMap(objectName) {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(size, size);
    
    for (let i = 0; i < imageData.data.length; i += 4) {
      let intensity;
      
      if (objectName.includes('floor')) {
        // Stone/concrete texture
        intensity = Math.random() * 0.3 + 0.35;
      } else if (objectName.includes('boulder')) {
        // Rock texture - more variation
        intensity = Math.random() * 0.4 + 0.3;
      } else if (objectName.includes('doors') || objectName.includes('doorPanel')) {
        // Wood grain texture
        intensity = Math.sin(i * 0.01) * 0.1 + 0.45 + Math.random() * 0.1;
      } else {
        // Default subtle texture
        intensity = Math.random() * 0.2 + 0.4;
      }
      
      imageData.data[i] = intensity * 255;     // R
      imageData.data[i + 1] = intensity * 255; // G  
      imageData.data[i + 2] = 128;             // B (neutral normal)
      imageData.data[i + 3] = 255;             // A
    }
    
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }
  
  function createProceduralRoughnessMap(objectName) {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(size, size);
    
    for (let i = 0; i < imageData.data.length; i += 4) {
      let roughness;
      
      if (objectName.includes('floor')) {
        roughness = Math.random() * 0.3 + 0.6; // Varied roughness for floor
      } else if (objectName.includes('railing')) {
        roughness = Math.random() * 0.1 + 0.1; // Smooth metal
      } else if (objectName.includes('doors')) {
        roughness = Math.random() * 0.2 + 0.3; // Wood variation
      } else {
        roughness = Math.random() * 0.2 + 0.4;
      }
      
      const value = roughness * 255;
      imageData.data[i] = value;     // R
      imageData.data[i + 1] = value; // G  
      imageData.data[i + 2] = value; // B
      imageData.data[i + 3] = 255;   // A
    }
    
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }
  
  function createProceduralAOMap(objectName) {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Create subtle AO pattern
    const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    gradient.addColorStop(0, 'rgb(255,255,255)');
    gradient.addColorStop(1, 'rgb(180,180,180)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Add some noise
    const imageData = ctx.getImageData(0, 0, size, size);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = Math.random() * 30 - 15;
      imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise));
      imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + noise));
      imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  const container = document.getElementById('three-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 1, 3);

  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance

  // ✅ Updated renderer settings for Three.js r150+ with better tone mapping
  renderer.outputColorSpace = THREE.SRGBColorSpace; // Updated from outputEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.8; // Increased from 1.0 for brighter interior
  
  // Enable shadows for more realism
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // ✅ Enhanced environment setup
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  
  const roomEnvironment = new RoomEnvironment();
  const environmentTexture = pmremGenerator.fromScene(roomEnvironment).texture;
  scene.environment = environmentTexture;
  scene.background = environmentTexture; // Add background for better ambiance
  
  // Clean up
  roomEnvironment.dispose();

  // ✅ Improved lighting setup for interior scenes
  // Very low ambient light to let environment lighting work
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.05);
  scene.add(hemisphereLight);

  // Add multiple directional lights for better interior lighting
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
  keyLight.position.set(5, 10, 7.5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  // Add fill light from opposite side
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -7.5);
  scene.add(fillLight);

  // Add rim light for better definition
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
  rimLight.position.set(0, -5, 10);
  scene.add(rimLight);

  // DRACO + GLTF loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    "https://freight.cargo.site/m/S2506763425080988685314661109729/room3.glb",
    (gltf) => {
      const model = gltf.scene;
      
      // ✅ Enhanced material processing with detailed debugging
      model.traverse((child) => {
        if (child.isMesh) {
          // Enable shadow casting/receiving
          child.castShadow = true;
          child.receiveShadow = true;
          
          const mat = child.material;
          if (mat) {
            // Handle both single materials and material arrays
            const materials = Array.isArray(mat) ? mat : [mat];
            
            materials.forEach((material) => {
              if (material.isMeshStandardMaterial || material.isMeshPhysicalMaterial) {
                // Log current material properties for debugging
                console.log(`Material: ${child.name}`, {
                  roughness: material.roughness,
                  metalness: material.metalness,
                  hasNormalMap: !!material.normalMap,
                  hasRoughnessMap: !!material.roughnessMap,
                  hasMetalnessMap: !!material.metalnessMap,
                  color: material.color.getHexString(),
                  envMapIntensity: material.envMapIntensity
                });
                
                // Apply environment mapping
                material.envMap = scene.environment;
                
                // Fix materials based on your specific objects
                if (child.name.includes('glass') || child.name.includes('Windows')) {
                  // Glass should be reflective and transparent
                  material.envMapIntensity = 3.0;
                  material.roughness = 0.05;
                  material.metalness = 0.0;
                  material.transparent = true;
                  material.opacity = 0.8;
                } else if (child.name.includes('railing') || child.name.includes('skylight_ring')) {
                  // Metal railings should be more reflective
                  material.envMapIntensity = 2.0;
                  material.roughness = 0.2;
                  material.metalness = 0.8;
                } else if (child.name.includes('floor')) {
                  // Floor should have some reflection but stay matte
                  material.envMapIntensity = 1.0;
                  material.roughness = 0.6; // Reduced from 1.0
                  material.metalness = 0.1; // Add slight metalness
                } else if (child.name.includes('doors') || child.name.includes('doorPanel')) {
                  // Doors should have some reflection
                  material.envMapIntensity = 1.5;
                  material.roughness = 0.4; // Much less rough
                  material.metalness = 0.2;
                } else if (child.name.includes('boulder')) {
                  // Rock/stone should be less reflective but not completely matte
                  material.envMapIntensity = 0.8;
                  material.roughness = 0.7; // Reduced from 1.0
                  material.metalness = 0.0;
                } else if (child.name.includes('Cube') || child.name.includes('Skylight')) {
                  // General objects - make less matte
                  material.envMapIntensity = 1.5;
                  material.roughness = 0.3; // Much less rough than 1.0
                  material.metalness = 0.1;
                } else if (child.name.includes('LightBeam')) {
                  // Light beam should be emissive and transparent
                  material.envMapIntensity = 0.5;
                  material.transparent = true;
                  material.opacity = 0.3;
                  material.emissive.setHex(0xffffaa);
                  material.emissiveIntensity = 0.5;
                } else {
                  // Default: make everything less matte than roughness = 1.0
                  material.envMapIntensity = 1.0;
                  material.roughness = Math.min(material.roughness, 0.5);
                  if (material.metalness === 0 && material.roughness > 0.8) {
                    material.metalness = 0.1; // Add slight metalness to very rough materials
                  }
                }
                
                // Ensure proper color space for all texture maps
                const textureProps = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'emissiveMap', 'aoMap'];
                textureProps.forEach(prop => {
                  if (material[prop]) {
                    if (prop === 'map' || prop === 'emissiveMap') {
                      material[prop].colorSpace = THREE.SRGBColorSpace;
                    } else {
                      material[prop].colorSpace = THREE.NoColorSpace; // For data textures
                    }
                    material[prop].flipY = false; // Common GLTF requirement
                  }
                });
                
                // Enable double-sided rendering for glass and thin materials
                if (child.name.includes('glass') || child.name.includes('LightBeam')) {
                  material.side = THREE.DoubleSide;
                  material.transparent = true;
                  if (child.name.includes('glass')) {
                    material.opacity = 0.8;
                  }
                }
                
                material.needsUpdate = true;
              }
            });
          }
        }
      });

      scene.add(model);

      // Debug information
      console.log("Scene children:", model.children.map(c => c.name));
      
      const gltfLights = [];
      model.traverse(o => { 
        if (o.isLight) gltfLights.push(o); 
      });
      console.log("Lights in GLTF:", gltfLights.map(l => `${l.type} ${l.name || ''} intensity=${l.intensity}`));

      // Count materials for debugging
      const materials = new Set();
      model.traverse(child => {
        if (child.isMesh && child.material) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(mat => materials.add(mat.type));
        }
      });
      console.log("Material types in model:", Array.from(materials));

      // --- Camera setup ---
      const namedCamera = model.getObjectByName("mainView");
      if (namedCamera && namedCamera.isCamera) {
        console.log("Using GLTF camera:", namedCamera);

        // Copy projection
        if (namedCamera.isPerspectiveCamera && camera.isPerspectiveCamera) {
          camera.fov = namedCamera.fov;
          camera.near = namedCamera.near;
          camera.far = namedCamera.far;
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
    (progress) => {
      console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
    },
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

  // ✅ Enhanced animation loop with debug info
  let frameCount = 0;
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    
    // Log some debug info occasionally
    if (frameCount === 60) { // After 1 second at 60fps
      console.log("Rendering info:", renderer.info);
    }
    frameCount++;
  }

  animate();

  // ✅ Add debugging helper (remove in production)
  window.debugScene = {
    scene,
    camera,
    renderer,
    controls,
    toggleWireframe: () => {
      scene.traverse(child => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(mat => {
            mat.wireframe = !mat.wireframe;
          });
        }
      });
    },
    adjustLighting: (intensity = 1.0) => {
      renderer.toneMappingExposure = intensity;
      console.log(`Tone mapping exposure set to: ${intensity}`);
    },
    showMaterialStats: () => {
      const stats = {};
      scene.traverse(child => {
        if (child.isMesh && child.material) {
          const mat = child.material;
          stats[child.name] = {
            roughness: mat.roughness,
            metalness: mat.metalness,
            envMapIntensity: mat.envMapIntensity,
            hasTextures: {
              diffuse: !!mat.map,
              normal: !!mat.normalMap,
              roughness: !!mat.roughnessMap,
              metalness: !!mat.metalnessMap,
              ao: !!mat.aoMap
            },
            color: '#' + mat.color.getHexString(),
            transparent: mat.transparent,
            opacity: mat.opacity
          };
        }
      });
      console.table(stats);
      return stats;
    },
    testEnvIntensity: (intensity = 1.0) => {
      scene.traverse(child => {
        if (child.isMesh && child.material && child.material.isMeshStandardMaterial) {
          child.material.envMapIntensity = intensity;
          child.material.needsUpdate = true;
        }
      });
      console.log(`Environment map intensity set to: ${intensity}`);
    }
  };
}