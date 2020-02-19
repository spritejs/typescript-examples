import {Scene, Path, Gradient} from 'spritejs';

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

class Animator {
  public duration: number;
  public update: Function;
  public easing: Function|undefined;
  public cancel: Function|undefined;
  public constructor(duration: number, update: Function, easing?: Function) {
    this.duration = duration
    this.update = update
    this.easing = easing
  }
  public animate(startTime: number = 0) {
    const duration = this.duration,
      update = this.update,
      easing = this.easing,
      self = this

    return new Promise(((resolve) => {
      let qId = 0
      function step(timestamp: number) {
        startTime = startTime || timestamp
        const p = Math.min(1.0, (timestamp - startTime) / duration)

        update.call(self, easing ? easing(p) : p, p)

        if(p < 1.0) {
          qId = requestAnimationFrame(step)
        } else {
          resolve(startTime + duration)
        }
      }

      self.cancel = function () {
        cancelAnimationFrame(qId)
        update.call(self, 0, 0)
        resolve(startTime + duration)
      }
      qId = requestAnimationFrame(step)
    }))
  }
  ease(easing: Function) {
    return new Animator(this.duration, this.update, easing)
  }
}

(async function () {
  const container = document.getElementById('stage');
  const scene = new Scene({
    container,
    width: 1600,
    height: 1200,
    mode: 'stickyWidth',
  });

  async function ray() {
    const s = new Path();

    const pos = [200 + 1200 * Math.random(), 200 + 800 * Math.random()];
    const rotate = 360 * Math.random();
    const controller = Math.random() * 340 + 10;

    const color = [127 + 128 * Math.random(), 255 * Math.random(), 128 * Math.random()].map(Math.round);

    s.attr({
      pos,
      rotate,
      lineWidth: 6,
      d: `M10,80 q${controller},-80 350,0`,
    });

    scene.layer().append(s);

    const a1 = new Animator(3000, (p: number) => {
      let q = 0;

      if(p > 0.618) {
        q = 1 - (1 - p) / 0.382;
      }

      p = Math.min(p / 0.7, 1);

      const colors = [
        {offset: 0, color: `rgba(${color[0]},${color[1]},${color[2]},0)`},
        {offset: q, color: `rgba(${color[0]},${color[1]},${color[2]},0)`},
        {offset: p, color: `rgba(${color[0]},${color[1]},${color[2]},1)`},
        {offset: Math.min(p + 0.06, 1), color: `rgba(${color[0]},${color[1]},${color[2]},0)`},
      ];

      const len = s.getPathLength();
      const [x, y] = s.getPointAtLength(p * len);
      const vector = [0, 0, x + 5, y];

      const gradient = new Gradient({
        vector,
        colors,
      });

      s.attr({strokeColor: gradient});
    });

    await a1.animate();
    s.remove();
  }

  do {
    ray();
    const delay = Math.random() * 500 + 200;
    await sleep(delay); // eslint-disable-line no-await-in-loop
  } while(1);
}());