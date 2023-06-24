window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = innerWidth;
  const height = innerHeight;
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas'),
    alpha:true
  });
  document.body.appendChild( renderer.domElement );
  renderer.setSize(width,height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xaaaaaa);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  

  const camera = new THREE.PerspectiveCamera(75,width/height,0.01,100);
  camera.position.set(0,-6.5,6);
  camera.rotation.x = 1;

  const geometry = new THREE.SphereGeometry(1,6,3);
  const material = new THREE.MeshStandardMaterial({color: 0x8b23ea,metalness:0.8, roughness:0, opacity:0.7, transparent:true, side:THREE.DoubleSide});
  const box = new THREE.Mesh(geometry, material);
  const wiremat = new THREE.MeshToonMaterial({color:0xab43fa, wireframe:true});
  const wire = new THREE.Mesh(geometry,wiremat);
  const planegeo = new THREE.PlaneGeometry(10,10);
  const texture = new THREE.TextureLoader().load('chrome.jpg');
  const pixelmat = new THREE.MeshStandardMaterial({map:texture, metalness:0.7});
  const plane = new THREE.Mesh(planegeo,pixelmat);

  let group = new THREE.Group;
  box.castShadow = true;
  plane.receiveShadow = true;
  group.add(box);
  group.add(wire);
  scene.add(group);
  scene.add(plane);
  
  group.position.set(0,0,3);
  
  const light1 = new THREE.DirectionalLight(0xffffff,2);
  const sun = new THREE.AmbientLight(0xffffff,0.5);
  light1.castShadow = true;
  light1.shadow.radius = 5;
  light1.position.set(4,-4,10);

  scene.add(light1);
  scene.add(sun);

  let mode = 0;
  
  renderer.setAnimationLoop(loop);

  function loop(){
    switch(mode){
      case 0:
        group.position.z += 0.05;
        break;
      case 1:
        group.position.z -= 0.05;
        break;
    }
    group.position.z = Math.round(group.position.z * 100) / 100;
    if (group.position.z >= 5.5 || group.position.z <= 1){
      switch(mode){
        case 0:
          mode = 1;
          break;
        case 1:
          mode = 0;
          break;
      }
    }
    console.log(mode,group.position.z);

    group.rotation.x += 0.025;
    group.rotation.y += 0.025;

    renderer.render(scene, camera);
  }
}

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}