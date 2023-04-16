/**
 * DeviceOrientationEvent
 *      傾き
 */

(function () {
  const requestDeviceMotionPermission = async () => {
    // ジャイロセンサーが使えるかどうか
    console.log("check!", window.DeviceOrientationEvent);
    if (window.DeviceOrientationEvent) {
      // ios13以上
      console.log(
        "ios13以上",
        DeviceOrientationEvent.requestPermission &&
          typeof DeviceOrientationEvent.requestPermission === "function"
      );
      if (
        DeviceOrientationEvent.requestPermission &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        const permission = await DeviceMotionEvent.requestPermission();
        console.log("permission", permission);
        if (permission === "granted") {
          window.addEventListener("deviceorientation", deviceorientation);
          window.addEventListener("devicemotion", devicemotion);
        } else {
          window.alert("許可されていません");
        }
      } else {
        // ios13未満
        window.addEventListener("deviceorientation", deviceorientation);
        window.addEventListener("devicemotion", devicemotion);
      }
    } else {
      window.alert("対応していません");
    }
  };

  const handlePress = async () => {
    try {
      await requestDeviceMotionPermission();
      button.setAttribute("style", "display: none;");
    } catch (e) {
      console.error(e);
      window.alert("対応していません");
    }
  };

  // --------------------------------------------------

  const elResult = document.querySelector("#result");

  const position = {
    alpha: 0,
    beta: 0,
    gamma: 0,
  };

  const motion = {
    x: 0,
    y: 0,
    z: 0,
  };

  /**
   * 画面に描写
   */
  function resultRender() {
    elResult.innerHTML = `alpha: ${position.alpha}<br>
                              beta: ${position.beta}<br>
                              gamma: ${position.gamma}<br>
                              acceleration.x: ${motion.x}<br>
                              acceleration.y: ${motion.y}<br>
                              acceleration.z: ${motion.z}
                            `;
  }

  /**
   * 傾きを取得
   */
  const deviceorientation = (e) => {
    position.alpha = e.alpha;
    position.beta = e.beta;
    position.gamma = e.gamma;
  };

  /**
   * 加速度を取得
   */
  const devicemotion = (e) => {
    motion.x = e.acceleration.x;
    motion.y = e.acceleration.y;
    motion.z = e.acceleration.z;
  };

  // --------------------------------------------------

  //   var game = new Leonardo();

  //   game.init = function () {
  //     const _this = this;
  //     const radius = 20;
  //     this.shapeList = [];

  //     const Obj = function () {
  //       this.shape = new createjs.Shape();
  //       this.shape.graphics.beginFill("DarkRed").drawCircle(0, 0, radius);
  //       this.shape.x = window.innerWidth / 2;
  //       this.shape.y = window.innerHeight / 4;
  //       _this.stage.addChild(this.shape);

  //       this.vx = 0;
  //       this.vy = 0;
  //     };

  //     Obj.prototype.move = function () {
  //       // 加速度
  //       this.vx += Math.floor(position.gamma) / 100;
  //       this.vy += Math.floor(position.beta) / 100;

  //       // 摩擦をかける
  //       this.vx *= 0.98;
  //       this.vy *= 0.98;

  //       let isObjectHit = false;
  //       for (let i = 0; i < _this.shapeList.length; i++) {
  //         const target = _this.shapeList[i];
  //         console.log(target, this, target === this);
  //         if (this === target) continue;
  //         const point = this.shape.localToLocal(0, 0, target.shape);
  //         const isHit = target.shape.hitTest(point.x, point.y);
  //         if (isHit) {
  //           //   this.shape.graphics
  //           //     .clear()
  //           //     .beginFill("DarkGreen")
  //           //     .drawCircle(0, 0, radius);
  //           isObjectHit = true;
  //           break;
  //         } else {
  //           //   this.shape.graphics
  //           //     .clear()
  //           //     .beginFill("DarkRed")
  //           //     .drawCircle(0, 0, radius);
  //           // 移動
  //         }
  //       }

  //       if (!isObjectHit) {
  //         this.shape.x += this.vx;
  //         this.shape.y += this.vy;
  //       }

  //       // 端っこからは出ない
  //       if (this.shape.y - radius < 0) this.shape.y = radius;
  //       if (
  //         this.shape.y + radius >
  //         _this.divisionRetina(_this.stage.canvas.height)
  //       )
  //         this.shape.y = _this.divisionRetina(_this.stage.canvas.height) - radius;
  //       if (
  //         this.shape.x + radius >
  //         _this.divisionRetina(_this.stage.canvas.width)
  //       )
  //         this.shape.x = _this.divisionRetina(_this.stage.canvas.width) - radius;
  //       if (this.shape.x - radius < 0) this.shape.x = radius;
  //     };

  //     /**
  //      * シェイクしたかどうか
  //      */
  //     let isShake = false;
  //     this.shake = function () {
  //       if (isShake) return false;
  //       if (motion.x > 10 || motion.y > 10 || motion.z > 10) {
  //         isShake = true;
  //         console.log("振ったら増えるよ");
  //         _this.shapeList.push(new Obj());
  //         setTimeout(function () {
  //           isShake = false;
  //         }, 300);
  //       }
  //     };
  //   };

  //   game.update = function () {
  //     for (var i = 0; i < this.shapeList.length; i++) {
  //       this.shapeList[i].move();
  //     }
  //     this.shake();
  //     resultrender();
  //   };

  //   game.play();

  let sw = window.innerWidth;
  let sh = window.innerHeight;
  let itemList = [];
  let colorList = [0xf64c4c, 0xf6844c, 0xd0f64c, 0x4cc8f6];

  let renderer = new PIXI.CanvasRenderer({
    width: sw,
    height: sh,
    autoResize: true,
  });
  renderer.backgroundColor = 0xffffff;
  document.getElementById("stage").appendChild(renderer.view);
  let stage = new PIXI.Container();

  // Create a physics world, where bodies and constraints live
  var world = new p2.World({
    gravity: [0, 0], // gravity: [0, -9.82],
  });

  createWall(sw / 2, sh, sw, 20, Math.PI);
  createWall(sw / 2, 0, sw, 20, Math.PI);
  createWall(0, sh / 2, 20, sh, Math.PI);
  createWall(sw, sh / 2, 20, sh, Math.PI);

  // To animate the bodies, we must step the world forward in time, using a fixed time step size.
  // The World will run substeps and interpolate automatically for us, to get smooth animation.
  var fixedTimeStep = 1 / 60; // seconds

  // Animation loop
  function animate(time) {
    requestAnimationFrame(animate);
    world.step(fixedTimeStep);
    render();
    resultRender();
  }

  let isShake = false;
  function render() {
    if (!isShake) {
      if (motion.x > 10 || motion.y > 10 || motion.z > 10) {
        isShake = true;
        console.log("振ったら増えるよ");
        createBall();
        setTimeout(function () {
          isShake = false;
        }, 300);
      }
    }

    world.gravity[0] = position.gamma / 10;
    world.gravity[1] = -position.beta / 10;

    for (var i = itemList.length - 1; i >= 0; i--) {
      var graphic = itemList[i];
      if (graphic.body.world && graphic.shape.type == p2.Shape.CIRCLE) {
        var x = p2ToPixiX(graphic.body.position[0]);
        var y = p2ToPixiY(graphic.body.position[1]);
        if (y > sh + 50) {
          world.removeBody(graphic.body);
          stage.removeChild(graphic);
          itemList.splice(i, 1);
          graphic.destroy();
        }

        graphic.x = x;
        graphic.y = y;
      }
    }

    renderer.render(stage);
  }

  function resize(evt) {
    sw = window.innerWidth;
    sh = window.innerHeight;
  }

  function createBall() {
    var baseX = sw / 2;
    var baseY = sh / 4;
    var xx = pixiToP2X(baseX);
    var yy = pixiToP2Y(baseY);
    var radius = 20;
    var ballShape = new p2.Circle({ radius: pixiToP2Value(radius) });
    var ballBody = new p2.Body({
      mass: 1.0,
      position: [xx, yy],
    });
    var colorID = Math.floor(Math.random() * colorList.length);
    var color = colorList[colorID];
    ballBody.color = color;
    ballBody.addShape(ballShape);
    world.addBody(ballBody);

    var graphic = new PIXI.Graphics();
    graphic.beginFill(color);
    graphic.drawCircle(0, 0, radius);
    graphic.endFill();
    graphic.pivot.set(0.5, 0.5);
    graphic.x = baseX;
    graphic.y = baseY;
    stage.addChild(graphic);
    graphic.body = ballBody;
    graphic.shape = ballShape;
    itemList.push(graphic);
  }

  function createWall(x, y, w, h, rotation) {
    var p2X = pixiToP2X(x);
    var p2Y = pixiToP2Y(y);
    var p2W = pixiToP2Value(w);
    var p2H = pixiToP2Value(h);
    var shape = new p2.Box({
      width: p2W,
      height: p2H,
    });
    var body = new p2.Body({
      mass: 0,
      position: [p2X, p2Y],
      angle: -rotation,
    });
    body.addShape(shape);
    world.addBody(body);

    var graphic = new PIXI.Graphics();
    graphic.beginFill(0x666666);
    console.log("x:" + x + " y:" + y + " w:" + w + " h:" + h);
    graphic.drawRect(-w / 2, -h / 2, w, h);
    //graphic.drawCircle(0, 0, 10);
    graphic.endFill();
    graphic.pivot.set(0.5, 0.5);
    graphic.x = x;
    graphic.y = y;
    graphic.rotation = rotation;
    stage.addChild(graphic);
    graphic.body = body;
    graphic.shape = shape;
  }

  // Start the animation loop
  requestAnimationFrame(animate);

  function drawCircle(body, shape) {}

  function drawBox(body, shape) {}

  // p2→pixi
  function p2ToPixiX(p2X) {
    return p2X * 100;
  }
  function p2ToPixiY(p2Y) {
    return -(p2Y * 100);
  }
  function p2ToPixiValue(p2Value) {
    return p2Value * 100;
  }

  // pixi→p2
  function pixiToP2X(pixiX) {
    return pixiX / 100;
  }
  function pixiToP2Y(pixiY) {
    return -(pixiY / 100);
  }
  function pixiToP2Value(pixiValue) {
    return pixiValue / 100;
  }

  // クリックされたらスタート
  const button = document.querySelector("#button");
  button.addEventListener("click", handlePress);
})();
