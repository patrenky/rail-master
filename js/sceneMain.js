class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image('train', "assets/actions/train.png",);
        this.load.multiatlas('rails', 'assets/rails.json', 'assets');
        for (const sem in semType) {
            this.load.spritesheet(sem, "assets/semaphores/" + sem.toLowerCase() + ".png", { frameWidth: 100, frameHeight: 300 });
        }
    }

    create() {
        const gridConfig = {
            scene: this,
            cols: 20,
            rows: 20
        }

        this.cameras.main.setBackgroundColor('#008100');
        this.grid = new AlignGrid(gridConfig);
        this.grid.showNumbers();

        // render railway
        rails.forEach(rail => {
            const rimg = this.add.image(0, 0, 'rails', rail.type).setInteractive();
            this.grid.placeAt(rail.x, rail.y, rimg);

            rimg.displayWidth = game.config.width / gridConfig.cols;
            rimg.scaleY = rimg.scaleX;

            rail.isSelected = false;

            rimg.on('pointerdown', () => {
                rail.isSelected ? rimg.clearTint() : rimg.setTint(0xaaaaaa);
                rail.isSelected = !rail.isSelected;
            });

            // render semaphore
            if (rail.sem) {
                const animName = rail.sem.type + 'light';

                this.anims.create({
                    key: animName,
                    frames: this.anims.generateFrameNames(rail.sem.type, { start: 1, end: 3 }),
                    frameRate: 3,
                    repeat: -1
                });

                const semimg = this.add.sprite(0, 0, rail.sem.type).play(animName);


                rail.sem.x = rail.sem.pos === semPosition.RIGHT ? rail.x + 1 : rail.x;
                rail.sem.y = rail.sem.pos === semPosition.TOP ? rail.y - 1 : rail.y;
                this.grid.placeAt(rail.sem.x, rail.sem.y, semimg);

                semimg.displayHeight = game.config.height / gridConfig.rows;
                semimg.scaleX = semimg.scaleY;
            }
        });

        // render train
        this.train = this.add.sprite(0, 0, 'train');
        this.grid.placeAt(2, 2, this.train);

        this.train.displayHeight = game.config.height / gridConfig.rows;
        this.train.scaleX = this.train.scaleY;
    }

    update() {
        const trainPosition = this.grid.getCellCoord(this.train.x, this.train.y);

        const currentRail = rails.find(rail => {
            if (rail.x === trainPosition.x && rail.y === trainPosition.y) {
                return true;
            }
        });

        // if train is on rail and rail is selected, continue movement
        if (currentRail && currentRail.type && currentRail.isSelected) {
            switch (currentRail.type) {
                case (railType.HORIZONTAL):
                    this.train.x += 2;
                    break;
                case (railType.VERTICAL): {
                    this.train.y += 2;
                    break;
                }
                case (railType.LB): {
                    this.train.x += 1;
                    this.train.y += 1;
                    break;
                }
                default:
                    break;
            }
        }
    }
}
