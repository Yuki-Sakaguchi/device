# デバイスの機能を使ったインタラクティブ
スマホの傾きや加速度などを使って面白そうなことをやる検証

## [デバイスの加速度と傾きを使ったサンプル](https://yuki-sakaguchi.github.io/device/device_event/) 
<details>
  <summary>🎥 動画を見る</summary>
  <div>
    <video src="https://user-images.githubusercontent.com/16290220/232320470-25a6cd4d-324f-469c-8fe8-32dd802482ac.mov" />
  </div>
</details>

* スマホを振ると玉が生成されます（加速度センサー）
* スマホの傾きに合わせて玉が転がります（傾きセンサー）

## [デバイスのマイクに息を吹きかけるとアニメーションするサンプル](https://yuki-sakaguchi.github.io/device/device_mic/) 

<details>
  <summary>🎥 動画を見る</summary>
  <div>
    <video src="https://user-images.githubusercontent.com/16290220/232320532-6e7ba61d-8826-4822-9aaa-e361147fc86b.mov" />
  </div>
</details>

* これはPCでも動きます
* マイクに大きな音を加えると玉が浮きます（息を吹きかけるのが効率がよさそう）

## [デバイスを横向きだけで動かすサンプル](https://yuki-sakaguchi.github.io/device/device_direction/)
<details>
  <summary>🎥 動画を見る</summary>
  <div>
    <video src="https://user-images.githubusercontent.com/16290220/232320539-9bbdff65-57a2-42f0-bcef-039f6cdd83a0.mov" />
  </div>
</details>

* デバイスが縦向きだと画面を覆う表示が出て閲覧できません。
* デバイスを横向きにすると傾けるとコンテンツが表示される
* 横向きの状態で左右に傾けると表示が「左」「右」と変わる（Switchのコントローラーみたいなのを意識した）
  * これを使って　websoket とかでPCのモニターと連動させてコントローラーとかにしたら面白そう

# その他

## ios13, 14 で動かなくなった
以下の記事を参考にしたら動くようになった。  
ユーザー操作による許可は必要そう  
https://gitpress.io/@fukke0906/2020-05-23

一度でも許可していたら２度目は聞かれないらしい...  
勝手に動くようになったのでその場合の処理は考えないといけない。

## 改めて動くようになった！
一度UXが悪くなったけど、また前みたいにブラウザ上でのチェックなどをOKすれば比較的簡単に動くようになった！
