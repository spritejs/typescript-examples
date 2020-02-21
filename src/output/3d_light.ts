/* globals dat */
import {Scene} from 'spritejs';
import {Cube, shaders, Layer3d} from 'sprite-extend-3d';

const container = document.getElementById('stage');
const scene = new Scene({container});
const layer = scene.layer3d('fglayer', {
  ambientColor: '#ff000080',
  directionalLight: [1, 0, 0, 0.5],
  pointLightColor: 'blue',
  pointLightPosition: [5, 3, 6],
  camera: {
    fov: 35, // 相机的视野
    pos: [3, 3, 5], // 相机的位置
  },
}) as Layer3d;

const camera = layer.camera;
camera.lookAt([0, 0, 0]);

const program = layer.createProgram({
  ...shaders.NORMAL_GEOMETRY,
  cullFace: null,
});

const cube = new Cube(program, {
  colors: 'grey',
});
layer.append(cube);
layer.setOrbit();