const THREE = require("three")
const MicroModal = require("micromodal")
const { generateWorld } = require("./world/generate")
const { getCameraHeight } = require("./world/generate")
const { showProjects, showAbout, removeMargin, isHidden } = require("./dom/pages")
const { OrbitControls } = require("three/examples/jsm/controls/OrbitControls")

let intro = false
let camera, renderer, scene, controls
let world, cameraHeightStart

const fogDensity = 0.00048
const cameraAboveGround = 275
const cameraSpeed = 0.2
const camOffsetY = 300

const raycaster = new THREE.Raycaster()

const init = () => {
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        10,
        5000
    )
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff) // 0xefd1b5
    scene.fog = new THREE.FogExp2(0xffffff, fogDensity) // 0xefd1b5

    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    world = generateWorld()
    scene.add(world)

    cameraHeightStart = getCameraHeight(camOffsetY)
    camera.position.z = 3850
    camera.position.y = cameraHeightStart

    //controls = new OrbitControls( camera, renderer.domElement );

    window.addEventListener("resize", onWindowResize, false)
    window.addEventListener("wheel", onMouseWheel, false)
}

const cameraMovement = () => {
    if (!intro) {
        camera.position.lerp(
            new THREE.Vector3(
                camera.position.x,
                cameraHeightStart,
                camera.position.z
            ),
            0.001
        )
        /*if (camera.position.y === cameraHeightStart) {
            intro = true
        }*/
    }

    if (camera.position.z < -3500) {
        camera.position.y = cameraHeightStart
        camera.position.z = 3850
    }

    camera.position.z -= cameraSpeed
}

const onMouseWheel = event => {
    if (!isHidden()) {
        if (event.deltaY === 3 || event.deltaY === -3) {
            camera.position.y -= event.deltaY * 1.5
        } else {
            camera.position.y -= event.deltaY * 0.05
        }
    }
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const animate = () => {
    requestAnimationFrame(animate)
    //controls.update();
    render()
}

const render = () => {
    cameraMovement()

    renderer.render(scene, camera)
}

init()
animate()

handleProjects = () => showProjects()

handleAbout = () => showAbout()

handleMargin = () => removeMargin()

MicroModal.default.init({
    awaitCloseAnimation: true
})
