/**
 * ブラウザから音声を取得して音量を取得する
 */
function play () {
	window.AudioContext = window.AudioContext || window.webkitAudioContext
  const context = new AudioContext()
  
	//AnalyserNodeオブジェクト(音声解析用クラス)のインスタンス化
  const analyser = context.createAnalyser()
  
	//音声の音量を取得した要素分格納する変数
  const frequencies = new Uint8Array(analyser.frequencyBinCount)
  
	// 音量を表示するためのdiv要素を取得
	const elVol = document.getElementById('vol')
  const elEffect = document.getElementById('vol-effect')
  const elBtn = document.querySelector('.btn')
  elBtn.remove()
  let volume = 0

  /**
   * マイクの初期化
   */
  function init () {
    //端末のaudio(マイク)にアクセスする
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        window.hackForMozzila = stream
        //音声の入力点(createMediaStreamSource)にマイク入力(stream)を設定し,
        //出力点であるAnayserNodeオブジェクト(analyser)と接続(connect)させる。
        context.createMediaStreamSource(stream).connect(analyser)
      })
      //マイクにアクセスできなかったorユーザーがマイクの利用を許可しなかった場合はエラーを表示
      .catch(function (err) {
        alert(err.message)
      })
  }

  /**
   * ボニューム取得
   */
	function update () {
		//マイクに入力されている音声の音量を取得、表示
		volume = Math.floor(getFrequency())
		elVol.innerHTML = volume
		elEffect.style.width = volume+"%"
		requestAnimationFrame(update)
  }

  /**
   * マイクの入力音声の振幅(音量)を取得する関数
   */
	function getFrequency () {
		//周波数ごとの振幅を取得して配列に格納
		analyser.getByteFrequencyData(frequencies)
    return frequencies.reduce(function (previous, current) {
      return previous + current
    })/analyser.frequencyBinCount
  }

  init()
  update()

  // --------------------------------------------------

  const game = new Leonardo()

  game.init = function () {
    const _this = this

    const radius = 50
    this.shape = new createjs.Shape()
    this.shape.graphics.beginFill("DarkRed").drawCircle(0, 0, radius)
    this.shape.x = this.divisionRetina(this.stage.canvas.width)/2
    this.shape.y = this.divisionRetina(this.stage.canvas.height)/2
    this.stage.addChild(this.shape)

    let vy = 0

    this.move = function () {
      vy += 1 - (volume > 15 ? (volume/15) : 0)
      vy *= 0.6;

      _this.shape.y += vy

      if (_this.shape.y - radius < 0) {
        _this.shape.y = radius
      }

      if (_this.shape.y + radius > _this.divisionRetina(_this.stage.canvas.height)) {
        _this.shape.y = _this.divisionRetina(_this.stage.canvas.height) - radius
      }
    }
  }

  game.update = function () {
    this.move()
  }

  game.play()
}