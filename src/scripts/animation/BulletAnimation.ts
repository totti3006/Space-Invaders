class BulletAnimation {
  private scene: Phaser.Scene
  private source: Phaser.GameObjects.Image

  private hitEmitterManager: Phaser.GameObjects.Particles.ParticleEmitterManager
  private hitEmitter: Phaser.GameObjects.Particles.ParticleEmitter

  constructor(source: Phaser.GameObjects.Image) {
    this.source = source
    this.scene = source.scene

    this.initEmitter()

    this.createHitEmitter()
  }

  private initEmitter(): void {
    this.hitEmitterManager = this.scene.add.particles('blue')
  }

  private createHitEmitter(): void {
    this.hitEmitter = this.hitEmitterManager.createEmitter({
      speed: { min: 100, max: 200 },
      angle: { start: 0, end: 360, steps: 30 },
      scale: {
        start: 0.1,
        end: 0
      },
      lifespan: 300,
      blendMode: 'ADD',
      on: false
    })
  }

  public playHitEmitter(): void {
    let x: number = this.source.x
    let y: number = this.source.y

    this.hitEmitter.explode(30, x, y)
  }
}

export default BulletAnimation
