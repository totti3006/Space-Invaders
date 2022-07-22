import BulletAnimation from '../animation/BulletAnimation'
import { IBulletConstructor } from '../interfaces/bullet.interface'

export class Bullet extends Phaser.GameObjects.Image {
  body: Phaser.Physics.Arcade.Body

  private bulletSpeed: number
  private bulletAnimation: BulletAnimation

  constructor(aParams: IBulletConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture)

    this.initVariables(aParams)
    this.initImage()
    this.initPhysics()

    this.scene.add.existing(this)
  }

  private initVariables(aParams: IBulletConstructor): void {
    this.bulletSpeed = aParams.bulletProperties.speed
    this.bulletAnimation = new BulletAnimation(this)
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5)
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this)
    this.body.setVelocityY(this.bulletSpeed)
    this.body.setSize(1, 8)
  }

  update(): void {
    if (this.y < 0 || this.y > this.scene.sys.canvas.height) {
      this.destroy()
    }
  }

  public explode(): void {
    this.stopBullet()
    this.bulletAnimation.playHitEmitter()
    this.scene.time.delayedCall(500, () => {
      this.destroy()
    })
  }

  private stopBullet(): void {
    this.body.setVelocity(0, 0)
    this.scene.physics.world.disable(this)
    this.setVisible(false)
  }
}
