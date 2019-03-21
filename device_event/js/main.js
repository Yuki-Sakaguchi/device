/**
 * DeviceOrientationEvent
 *      傾き
 */

(function () {
    if (!DeviceOrientationEvent in window) {
        // 入っていなければ使えない
        console.warn('傾きセンサーが入っていません')
        return
    } else {
        console.log('さあ傾くぞー')
    }
    
    // --------------------------------------------------

    const elResult = document.querySelector('#result')

    const position = {
        beta: 0,
        gamma: 0,
    }

    const motion = {
        x: 0,
        y: 0,
        z: 0,
    }

    /**
     * 画面に描写
     */
    function resultRender () {
        elResult.innerHTML = `上下: ${position.beta}<br>左右: ${position.gamma}`
    }

    /**
     * 傾きを取得
     */
    window.addEventListener('deviceorientation', e => {
        position.beta = e.beta
        position.gamma = e.gamma
    })

    /**
     * 加速度を取得
     */
    window.addEventListener('devicemotion', e => {
        motion.x = e.acceleration.x
        motion.y = e.acceleration.y
        motion.z = e.acceleration.z
    })

    // --------------------------------------------------
    
    var game = new Leonardo()
    
    game.init = function () {
        const _this = this
        const radius = 20
        this.shapeList = []

        const Obj = function () {
            this.shape = new createjs.Shape()
            this.shape.graphics.beginFill("DarkRed").drawCircle(0, 0, radius)
            this.shape.x = window.innerWidth / 2
            this.shape.y = window.innerHeight / 4
            _this.stage.addChild(this.shape)

            this.vx = 0
            this.vy = 0
        }

        Obj.prototype.move = function () {
            // 加速度
            this.vx += Math.floor(position.gamma)/100
            this.vy += Math.floor(position.beta)/100

            // 摩擦をかける
            this.vx *= 0.98;
            this.vy *= 0.98;

            // 移動
            this.shape.x += this.vx
            this.shape.y += this.vy

            // 端っこからは出ない
            if (this.shape.y - radius < 0) this.shape.y = radius
            if (this.shape.y + radius > _this.divisionRetina(_this.stage.canvas.height)) this.shape.y = _this.divisionRetina(_this.stage.canvas.height) - radius
            if (this.shape.x + radius > _this.divisionRetina(_this.stage.canvas.width)) this.shape.x = _this.divisionRetina(_this.stage.canvas.width) - radius
            if (this.shape.x - radius < 0) this.shape.x = radius
        }

        /**
         * シェイクしたかどうか
         */
        let isShake = false
        this.shake = function () {
            if (isShake) return false
            if (motion.x > 10 || motion.y > 10 || motion.z > 10) {
                isShake = true
                console.log('振ったら増えるよ')
                _this.shapeList.push(new Obj())
                setTimeout(function () {
                    isShake = false
                }, 300)
            }
        }
    }

    game.update = function () {
        for (var i = 0; i < this.shapeList.length; i++) {
            this.shapeList[i].move()
        }
        this.shake()
        resultRender()
    }

    game.play()
})()