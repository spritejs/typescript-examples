import {Scene, Sprite, Layer} from 'spritejs';

const container = document.querySelector('#stage');
const scene = new Scene({container, width: 1540, height: 400, mode: 'stickyTop'});

const layer: Layer = scene.layer();

const robot: Sprite = new Sprite('https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png');

robot.attr({
  anchor: [0, 0.5],
  pos: [0, 0],
  scale: 0.5,
});

robot.animate([
  {pos: [0, 300]},
  {pos: [0, 450]},
  {pos: [1350, 450]},
  {pos: [1350, 300]},
], {
  duration: 5000,
  iterations: Infinity,
  direction: 'alternate',
});

layer.append(robot);