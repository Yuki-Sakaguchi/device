/**
 * デバイスの動作テスト　
 */
const requestDeviceMotionPermission = async () => {
    // ジャイロセンサーが使えるかどうか
    if (window.DeviceOrientationEvent) {
        // ios13以上
        if (DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function') {
            const permission = await DeviceMotionEvent.requestPermission()
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

let alpha = 0, beta = 0, gamma = 0
let acceleration = { x: 0, y: 0, z: 0 }

const deviceorientation = (dat) => {
    // iphoneとandroidで向きが逆なので-1を掛けて任意に修正
    alpha = dat.alpha * -1
    beta = dat.beta * -1
    gamma = dat.gamma * -1
}

const devicemotion = (e) => acceleration = e.acceleration

const handlePress = async () => {
    try {
        await requestDeviceMotionPermission()
    } catch (e) {
        console.error(e)
        window.alert('対応していません')
    }

    const txt = document.getElementById('txt')
    const timer = window.setInterval(() => {
        txt.innerHTML = `alpha: ${alpha}<br>
                         beta: ${beta}<br>
                         gamma: ${gamma}<br>
                         acceleration.x: ${acceleration.x}<br>
                         acceleration.y: ${acceleration.y}<br>
                         acceleration.z: ${acceleration.z}
                        `
    })
}

const button = document.querySelector('#button')
button.addEventListener('click', handlePress)