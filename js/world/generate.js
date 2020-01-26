const THREE = require("three")
const { ImprovedNoise } = require("three/examples/jsm/math/ImprovedNoise")

const worldWidth = 256,
    worldDepth = 256

let cameraHeightStart = 0
let middlePath = []

export const generateWorld = () => {
    let world = new THREE.Mesh(
        new THREE.BufferGeometry(),
        new THREE.MeshBasicMaterial()
    )
    let data = generateHeight(worldWidth, worldDepth)

    let plane = new THREE.PlaneBufferGeometry(
        7500,
        7500,
        worldWidth - 1,
        worldDepth - 1
    )
    plane.rotateX(-Math.PI / 2)
    let vertices = plane.attributes.position.array
    let l = vertices.length
    let highestPoint = 0
    
    for (let x = 0,i = 0, y = 1, z = 2; x < l; i++, x += 3, y += 3, z += 3) {
        vertices[y] = data[i] * 10
        if (vertices[x] < 20 && vertices[x] > -20) {
            middlePath.push(new THREE.Vector3(vertices[x], vertices[y], vertices[z]))
            if (vertices[y] > highestPoint) highestPoint = vertices[y] + 100
        }
    }

    //let curve = new THREE.CatmullRomCurve3(middlePath)

    //let catmullCurve = new THREE.TubeBufferGeometry(curve, 150, 10, 10, false)
    //let curveObject = new THREE.Mesh(
    //    catmullCurve,
    //    new THREE.MeshToonMaterial()
    //)

    //world.add(curveObject)

    cameraHeightStart = highestPoint
    generateLight(world, highestPoint)

    let terrain = new THREE.Mesh(
        plane,
        new THREE.MeshLambertMaterial()
    )

    world.add(terrain)
    return world
}

const generateHeight = (width, height) => {
    let size = width * height,
        data = new Uint8Array(size),
        perlin = new ImprovedNoise(),
        quality = 1,
        z = Math.random() * 100

    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < size; i++) {
            let x = i % width,
                y = ~~(i / width)
            data[i] += Math.abs(
                perlin.noise(x / quality, y / quality, z) * quality * 1.75
            )
        }
        quality *= 5
    }

    return data
}

const generateLight = (world, highestPoint) => {
    let color = new THREE.Color()
    color.setHSL(Math.random(), 0.8, Math.random() * 0.6 + 0.05)
    let pointLight1 = new THREE.PointLight(color, 0.8)
    pointLight1.position.set(
        Math.floor(Math.random() * (200 - -200)) + -200,
        highestPoint,
        3500
    )
    world.add(pointLight1)
}

export const getCameraHeight = offset => {
    return cameraHeightStart + offset
}
