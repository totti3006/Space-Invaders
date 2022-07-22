import { Enemy } from '../objects/enemy'
import { Player } from '../objects/player'
import { Bullet } from '../objects/bullet'

type GameObj = Phaser.Types.Physics.Arcade.GameObjectWithBody

export class GameScene extends Phaser.Scene {
  private enemies: Phaser.GameObjects.Group
  private player: Player

  constructor() {
    super({
      key: 'GameScene'
    })
  }

  init(): void {
    this.enemies = this.add.group({ runChildUpdate: true })
  }

  create(): void {
    // create game objects
    this.player = new Player({
      scene: this,
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height + 10,
      texture: 'player'
    })

    // if you want to make it random:
    // let enemyTypes = ["octopus", "crab", "squid"];
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 10; x++) {
        let type
        if (y === 0) {
          type = 'squid'
        } else if (y === 1 || y === 2) {
          type = 'crab'
        } else {
          type = 'octopus'
        }
        // if you want to make it random:
        // let type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        this.enemies.add(
          new Enemy({
            scene: this,
            x: 20 + x * 15,
            y: 50 + y * 15,
            texture: type
          })
        )
      }
    }
  }

  update(): void {
    if (this.player.active) {
      this.player.update()

      this.enemies.children.each((enemy: Phaser.GameObjects.GameObject) => {
        if (!(enemy instanceof Enemy)) return

        enemy.update()
        if (enemy.getBullets().getLength() > 0) {
          this.physics.overlap(enemy.getBullets(), this.player, this.bulletHitPlayer)
        }
      }, this)

      this.checkCollisions()
    }

    if (this.registry.get('lives') < 0 || this.enemies.getLength() === 0) {
      this.scene.start('MenuScene')
      this.scene.stop('HUDScene')
    }
  }

  private checkCollisions(): void {
    this.physics.overlap(this.player.getBullets(), this.enemies, this.bulletHitEnemy)
  }

  private bulletHitEnemy = (bullet: GameObj, enemy: GameObj): void => {
    if (!(bullet instanceof Bullet && enemy instanceof Enemy)) return
    bullet.explode()
    enemy.gotHurt()
  }

  private bulletHitPlayer = (bullet: GameObj, player: GameObj): void => {
    if (!(bullet instanceof Bullet && player instanceof Player)) return
    bullet.explode()
    player.gotHurt()
  }
}
