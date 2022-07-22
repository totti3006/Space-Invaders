import { Enemy } from '../objects/enemy'
import { Player } from '../objects/player'

class HitAnimation {
  private upTween: Phaser.Tweens.Tween
  private downTween: Phaser.Tweens.Tween
  private target: Phaser.GameObjects.GameObject
  private scene: Phaser.Scene

  constructor(target: Phaser.GameObjects.GameObject) {
    this.target = target
    this.scene = target.scene

    this.createDownTween()
    this.createUpTween()
  }

  private createUpTween(): void {
    if (!(this.target instanceof Enemy || this.target instanceof Player)) return

    this.upTween = this.scene.add.tween({
      targets: this.target,
      y: { from: this.target.y, to: this.target.y - 7 },
      duration: 200,
      paused: true,
      yoyo: true,
      repeat: 0
    })
  }

  private createDownTween(): void {
    if (!(this.target instanceof Enemy || this.target instanceof Player)) return

    this.downTween = this.scene.add.tween({
      targets: this.target,
      y: { from: this.target.y, to: this.target.y + 7 },
      duration: 200,
      paused: true,
      yoyo: true,
      repeat: 0
    })
  }

  public playHitUp(): void {
    this.upTween.play()
  }

  public playHitDown(): void {
    this.downTween.play()
  }
}

export default HitAnimation
