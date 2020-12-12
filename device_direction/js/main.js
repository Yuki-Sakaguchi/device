/**
 * DeviceOrientationEvent
 *      傾き
 */

(function () {
    
    const requestDeviceMotionPermission = async () => {
        // ジャイロセンサーが使えるかどうか
        console.log('check!', window.DeviceOrientationEvent)
        if (window.DeviceOrientationEvent) {
            // ios13以上
            console.log('ios13以上', DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function')
            if (DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function') {
                const permission = await DeviceMotionEvent.requestPermission()
                console.log('permission', permission)
                if (permission === 'granted') {
                     window.addEventListener('deviceorientation', deviceorientation)
                     window.addEventListener('devicemotion', devicemotion)
                } else {
                    window.alert('許可されていません')
                }
            } else { // ios13未満
                window.addEventListener('deviceorientation', deviceorientation)
                window.addEventListener('devicemotion', devicemotion)
            }
        } else {
            window.alert('対応していません')
        }
    }

    const handlePress = async () => {
        try {
            await requestDeviceMotionPermission()
            txt.setAttribute('style', 'display: none;')
        } catch (e) {
            console.error(e)
            window.alert('対応していません')
        }
    }
    
    // --------------------------------------------------

    const elResult = document.querySelector('#result')
    const right = document.querySelector('.right')
    const center = document.querySelector('.center')
    const left = document.querySelector('.left')
    const limit = 20

    const position = {
        alpha: 0,
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
        elResult.innerHTML = `alpha: ${position.alpha}<br>
                              beta: ${position.beta}<br>
                              gamma: ${position.gamma}<br>
                              acceleration.x: ${motion.x}<br>
                              acceleration.y: ${motion.y}<br>
                              acceleration.z: ${motion.z}
                            `
    }

    /**
     * 傾きを取得
     */
    const deviceorientation = (e) => {
        position.alpha = e.alpha
        position.beta = e.beta
        position.gamma = e.gamma

        if (position.gamma > 0) {
            // 左が上
            if (position.beta > limit) {
                // 左
                left.classList.add('active')
                center.classList.remove('active')
                right.classList.remove('active')
            } else if (position.beta < -limit) {
                // 右
                left.classList.remove('active')
                center.classList.remove('active')
                right.classList.add('active')
            } else {
                // 真ん中
                left.classList.remove('active')
                center.classList.add('active')
                right.classList.remove('active')
            }
        } else {
            // 右が上
            if (position.beta < -limit) {
                // 左
                left.classList.add('active')
                center.classList.remove('active')
                right.classList.remove('active')
            } else if (position.beta > limit) {
                // 右
                left.classList.remove('active')
                center.classList.remove('active')
                right.classList.add('active')
            } else {
                // 真ん中
                left.classList.remove('active')
                center.classList.add('active')
                right.classList.remove('active')
            }
        }
    }

    /**
     * 加速度を取得
     */
    const devicemotion = (e) => {
        motion.x = e.acceleration.x
        motion.y = e.acceleration.y
        motion.z = e.acceleration.z
    }

    // --------------------------------------------------
    
    var game = new Leonardo()
    game.init = function () {}
    game.update = function () {
        resultRender()
    }
    game.play()

    // クリックされたらスタート
    const txt = document.querySelector('.text')
    const button = document.querySelector('#button')
    button.addEventListener('click', handlePress)
})()


$(function () {
    /**
     * 横向きの時に画像を表示
     */
    const $orientation = $(".orientation")

    function checkDirection () {
        var angle = (screen && screen.orientation && screen.orientation.angle) || window.orientation || 0
        if (angle % 180 !== 0) {
            // ヨコ
            setTimeout(() => {
                $orientation.hide()
            }, 300)
        } else {
            // タテ
            $orientation.show()
        }
    }

    window.addEventListener("orientationchange", checkDirection)
    checkDirection() // 初期表示のチェック
})