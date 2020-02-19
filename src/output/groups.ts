import {Scene, Sprite, Group} from 'spritejs';
(async function () {
  /* globals dat */
  const container = document.getElementById('stage');
  const scene = new Scene({
    container,
    width: 1200,
    height: 1200,
  });

  await scene.preload([
    '//p.ssl.qhimg.com/t01293283c63b01af00.png',
    '//s.ssl.qhres.com/static/ee4e193568c3ffcb.json',
  ]);

  const layer = scene.layer('fglayer');
  (layer.canvas as HTMLCanvasElement).style.backgroundColor = '#FFFDCC';

  const group = new Group();
  group.name = 'group';
  group.attr({
    pos: [380, 460],
  });
  layer.append(group);

  const guanguan = new Sprite('guanguan.png');
  guanguan.name = 'guanguan';
  guanguan.attr({
    pos: [200, 10],
  });
  group.append(guanguan);

  const lemon = new Sprite('lemon.png');
  lemon.name = 'lemon';
  lemon.attr({
    pos: [10, 80],
    scale: 0.5,
  });
  group.append(lemon);
}());