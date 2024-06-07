import * as THREE from 'three';

const _WIDTH = 800;
const _HEIGHT = 600;

let _SCENE, _CAMERA, _RENDERER;

/**
 * Set up basic three.js objects for with simple camera
 * If there is a need, would add camera controller here
 * as well as other objects for the scene
 * 
 */
export const setThreeBasics = () => {
    const renderer = new THREE.WebGLRenderer();
    const camera = new THREE.PerspectiveCamera(
        45, _WIDTH / _HEIGHT, 1, 1000
    );
    const scene = new THREE.Scene();

    renderer.setSize(_WIDTH, _HEIGHT);
    renderer.setClearColor(0x000000, .1);

    camera.position.set(0, 0, 80);
    camera.lookAt(0, 0, 0);

    document.body.appendChild(renderer.domElement);

    _SCENE = scene;
    _CAMERA = camera;
    _RENDERER = renderer;
}
/**
 * All materials getters
 * 
 * @param {*} color 
 * @returns material
 * 
 */
export const getBasicLineMaterial = (color) => {
    return new THREE.LineBasicMaterial({ color });
}



/**
 * 
 */
export const buildSimplePoly = (data) => {
    const material = getBasicLineMaterial(0xeb6b34);
    const points = [];

    data.map((item) => {
        points.push(new THREE.Vector3(item.x, item.y, 0));
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);

    _SCENE.add(line);
    _RENDERER.render(_SCENE, _CAMERA);

    return line;
}


const createFloorScene = (data) => {
    const poly = buildSimplePoly(data);

    const isInside = (point, bPoints) => {

        var x = point.x,
            y = point.y;

        var inside = false;

        for (var i = 0, j = bPoints.length - 1; i < bPoints.length; j = i++) {
            var xi = bPoints[i].x,
                yi = bPoints[i].y;
            var xj = bPoints[j].x,
                yj = bPoints[j].y;

            var between = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if (between) inside = !inside;
        }
        return inside;
    }
    const handleClickEvent = (event) => {

        const sceneContainer = _RENDERER.domElement.getBoundingClientRect();
        const mouseX = event.clientX - sceneContainer.left;
        const mouseY = event.clientY - sceneContainer.top;

        const mouse = new THREE.Vector3(
            (mouseX / _RENDERER.domElement.width) * 2 - 1,
            -(mouseY / _RENDERER.domElement.height) * 2 + 1,
            0.5
        );

        mouse.unproject(_CAMERA);

        const intersection = new THREE.Vector3();
        const raycaster = new THREE.Raycaster(
            _CAMERA.position,
            mouse.sub(_CAMERA.position).normalize()
        );
        raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), intersection);

        document.getElementById("insideBool").value = isInside(intersection, data);

    };
    document.addEventListener('mousemove', handleClickEvent);
}


setThreeBasics();
// createFloorScene([
//     { x: -10, y: 0 },
//     { x: 0, y: 10 },
//     { x: 20, y: 10 },
//     { x: 20, y: 8 },
//     { x: 10, y: 8 },
//     { x: 10, y: 6 },
//     { x: 20, y: 6 },
//     { x: 20, y: 4 },
//     { x: 10, y: 4 },
//     { x: 10, y: -20 },
//     { x: 5, y: -20 },
//     { x: -5, y: -15 },
//     { x: -5, y: -10 },
//     { x: -10, y: -5 },
//     { x: -10, y: 0 }
// ]);
createFloorScene([
    { x: -20, y: -20 },
    { x: -20, y: 20 },
    { x: 20, y: 20 },
    { x: 20, y: 2 },
    { x: 15, y: 2 },
    { x: 15, y: 15 },
    { x: -15, y: 15 },
    { x: -15, y: -15 },
    { x: 15, y: -15  },
    { x: 15, y: -2 },
    { x: 20, y: -2 },
    { x: 20, y: -20 },
    { x: -20, y: -20 },
]);
