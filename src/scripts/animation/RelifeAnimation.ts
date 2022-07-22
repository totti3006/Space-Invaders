import { Player } from '../objects/player'

class RelifeAnimation {
  private goUpTween: Phaser.Tweens.Tween
  private blinkTween: Phaser.Tweens.Tween
  private target: Phaser.GameObjects.GameObject
  private scene: Phaser.Scene

  constructor(target: Phaser.GameObjects.GameObject) {
    this.target = target
    this.scene = target.scene

    this.createGoUpTween()
    this.createBlinkTween()
  }

  private createGoUpTween(): void {
    if (!(this.target instanceof Player)) return

    this.goUpTween = this.scene.add.tween({
      targets: this.target,
      ease: 'Power1',
      y: { from: this.scene.sys.canvas.height + 10, to: this.scene.sys.canvas.height - 40 },
      duration: 2000,
      repeat: 0,
      paused: true
    })
  }

  private createBlinkTween(): void {
    if (!(this.target instanceof Player)) return

    this.blinkTween = this.scene.add.tween({
      targets: this.target,
      alpha: 0,
      duration: 500,
      repeat: 2,
      yoyo: true,
      paused: true
    })
  }

  public playGoUpTween(): void {
    this.goUpTween.play()
  }

  public playBlinkTween(): void {
    this.blinkTween.play()
  }

  public play(): void {
    this.playGoUpTween()
    this.playBlinkTween()
  }
}

export default RelifeAnimation
