class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        for (const rt in railType) {
            this.load.image(rt, "assets/rails/" + rt.toLowerCase() + ".png");
        }
        for (const sem in semType) {
            this.load.spritesheet(sem, "assets/semaphores/" + sem.toLowerCase() + ".png", { frameWidth: 100, frameHeight: 300 });
        }
    }

    create() {
        const grid = 20;

        const gridConfig = {
            'scene': this,
            'cols': grid,
            'rows': grid
        }

        this.cameras.main.setBackgroundColor('#008100');
        this.aGrid = new AlignGrid(gridConfig);
        this.aGrid.showNumbers();

        rails.forEach(rail => {
            // render railway
            const rimg = this.add.image(0, 0, rail.type).setInteractive();
            this.aGrid.placeAt(rail.x, rail.y, rimg);

            rimg.displayWidth = game.config.width / grid;
            rimg.scaleY = rimg.scaleX;

            rimg.isSelected = false;

            rimg.on('pointerdown', () => {
                rimg.isSelected ? rimg.clearTint() : rimg.setTint(0xaaaaaa);
                rimg.isSelected = !rimg.isSelected;
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
                this.aGrid.placeAt(rail.sem.x, rail.sem.y, semimg);

                semimg.displayHeight = game.config.height / grid;
                semimg.scaleX = semimg.scaleY;
            }
        });
    }

    update() { }
}
