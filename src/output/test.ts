import {Scene, Sprite, Layer, Node} from 'spritejs';

const container = document.getElementById('stage');
const scene = new Scene({
  container,
  displayRatio: 2,
});

const layer: Layer = scene.layer();
const s = new Sprite({
  size: [100, 100],
  pos: [256, 256],
  anchor: 0.5,
  bgcolor: 'red',
});

layer.appendChild(s);

const c: CanvasRenderingContext2D = layer.renderer.canvasRenderer as CanvasRenderingContext2D;
console.log(c);

const d: Node = layer.querySelector('*') as Node;
console.log(d);