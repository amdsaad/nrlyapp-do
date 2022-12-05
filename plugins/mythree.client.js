import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl')
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
// Scene
const scene = new THREE.Scene()

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  1,
  1000
)

camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const light = new THREE.DirectionalLight(0xffffff, 1, Infinity)
light.position.set(0, 0, 1)
camera.add(light)

scene.add(camera)

const geomatery = new THREE.PlaneGeometry(1, 1)
// videos

const vids = document.querySelectorAll('video')
console.log('vids', vids)

for (let i = 0; i < vids.length; i++) {
  const vTexture = new THREE.VideoTexture(vids[i])
  const material = new THREE.MeshBasicMaterial({
    map: vTexture,
  })

  const vido = new THREE.Mesh(geomatery, material)
  vido.position.set(0, -i * 1.05)
  vido.userData = {
    type: 'video',
    src: vids[i].currentSrc,
    id: i + 1,
  }

  scene.add(vido)
  scene.name = `vids${i + 1}`
}
// for (let i = 0; i < 4; i++) {
//   const material = new THREE.MeshBasicMaterial({
//     map: Texture.load(`/middle/v${i + 1}.mp4`),
//   })
//   const image = new THREE.Mesh(imageGeomatery, material)
//   image.position.set(0, i * 1.35)

//   scene.add(image)
// }
// for (let i = 0; i < 8; i++) {
//   const material = new THREE.MeshBasicMaterial({
//     map: Texture.load(`/images/${i + 1}.jpg`),
//   })
//   console.log('image i', i)
//   const image = new THREE.Mesh(imageGeomatery, material)
//   image.position.set(-1, (i + 7) * 1.35)

//   scene.add(image)
// }
// for (let i = 0; i < 8; i++) {
//   const material = new THREE.MeshBasicMaterial({
//     map: Texture.load(`/images/${i + 1}.jpg`),
//   })
//   console.log('image i', i)
//   const image = new THREE.Mesh(imageGeomatery, material)
//   image.position.set(0, i * 1)

//   scene.add(image)
// }
// Lights

// const pointLight = new THREE.PointLight(0x000000, 0.1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

// gui.add(camera.position, 'y').min(-8).max(8)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
/// get all videos for
const vidoObject = []
scene.traverse((object) => {
  if (object.isMesh)
    if (object.userData.type === 'video') vidoObject.push(object)
})

// mouse
window.addEventListener('wheel', onMouseWheel)

let y = 0
let position = 0

// Raycaster
const raycaster = new THREE.Raycaster()

const mouse = new THREE.Vector2()

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1
  mouse.y = -(event.clientY / sizes.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(vidoObject)
  if (intersects.length > 0) {
    console.log('intersects', intersects)
  }
})
window.addEventListener('wheel', (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1
  mouse.y = -(event.clientY / sizes.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(vidoObject)
  if (intersects.length > 0) {
    console.log('intersects', intersects[0].object)
  }
})

function onMouseWheel(event) {
  console.log('event', event)
  y = event.deltaY * 0.0007
  // const intersects = raycaster.intersectObjects(vidoObject)
  // if (intersects.length > 0) {
  //   console.log('intersects', intersects[0].object.userData.id)
  // }
}

console.log('vidoObject', vidoObject)

const tick = () => {
  // Update objects
  position += y
  y *= 0.9
  camera.position.y = position

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
