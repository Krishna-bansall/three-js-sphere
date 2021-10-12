import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Scene } from 'three'

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('textures/NormalMap.png')
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
    const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
// material.wireframe = true
material.roughness = 0.2
material.metalness = 0.7
material.normalMap = normalTexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


const superLight = new THREE.PointLight(0xff0000, 2)
superLight.position.set(-1.86,1,-1.65)
superLight.intensity = 10
scene.add(superLight)

const blueLight = new THREE.PointLight(0xe1ff, 2)
blueLight.position.set(2.13,-3,-1.98)
blueLight.intensity = 10
scene.add(blueLight)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onMouseMove (event) {
    mouseX = (event.clientX - windowHalfX) / 2
    mouseY = (event.clientY - windowHalfY) / 2
}

document.addEventListener("mousemove", onMouseMove)


const updateScroll = (event) => {
    sphere.position.y = window.scrollY * 0.003
    sphere.scale.x = 1 + window.scrollY * 0.001
}
window.addEventListener('scroll', updateScroll)

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .9 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.position.z += -.5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()