class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image('tileset', 'assets/tileset.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json');

        this.load.image('train', "assets/train.png");

        // this.load.multiatlas('rails', 'assets/rails.json', 'assets');
        // for (const sem in semType) {
        //     this.load.spritesheet(sem, "assets/semaphores/" + sem.toLowerCase() + ".png", { frameWidth: 100, frameHeight: 300 });
        // }
    }

    gridToPx(grid_number) {
        const tile_width = 16;
        return (grid_number * tile_width + tile_width / 2);
    }

    create() {
        const gridConfig = {
            scene: this,
            cols: 60,
            rows: 40
        }

        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('tileset', 'tileset');

        map.createStaticLayer('Rails', tileset);

        this.cameras.main.setBackgroundColor('#008100');
        this.grid = new AlignGrid(gridConfig);
        this.grid.showNumbers();

        // // render railway (old way)
        // rails.forEach(rail => {
        //     const rimg = this.add.image(0, 0, 'rails', rail.type).setInteractive();
        //     this.grid.placeAt(rail.x, rail.y, rimg);

        //     rimg.displayWidth = game.config.width / gridConfig.cols;
        //     rimg.scaleY = rimg.scaleX;

        //     rail.isSelected = false;

        //     rimg.on('pointerdown', () => {
        //         rail.isSelected ? rimg.clearTint() : rimg.setTint(0xaaaaaa);
        //         rail.isSelected = !rail.isSelected;
        //     });

        //     // render semaphore
        //     if (rail.sem) {
        //         const animName = rail.sem.type + 'light';

        //         this.anims.create({
        //             key: animName,
        //             frames: this.anims.generateFrameNames(rail.sem.type, { start: 1, end: 3 }),
        //             frameRate: 3,
        //             repeat: -1
        //         });

        //         const semimg = this.add.sprite(0, 0, rail.sem.type).play(animName);


        //         rail.sem.x = rail.sem.pos === semPosition.RIGHT ? rail.x + 1 : rail.x;
        //         rail.sem.y = rail.sem.pos === semPosition.TOP ? rail.y - 1 : rail.y;
        //         this.grid.placeAt(rail.sem.x, rail.sem.y, semimg);

        //         semimg.displayHeight = game.config.height / gridConfig.rows;
        //         semimg.scaleX = semimg.scaleY;
        //     }
        // });

        
        // train 1
        const path1 = new Phaser.Curves.Path(this.gridToPx(17), this.gridToPx(8));
        path1.lineTo(this.gridToPx(17), this.gridToPx(2));
        path1.lineTo(this.gridToPx(2), this.gridToPx(2));
        path1.lineTo(this.gridToPx(2), this.gridToPx(5));
        path1.lineTo(this.gridToPx(5), this.gridToPx(5));
        path1.lineTo(this.gridToPx(5), this.gridToPx(2));
        path1.lineTo(this.gridToPx(17), this.gridToPx(2));
        path1.lineTo(this.gridToPx(17), this.gridToPx(8));

        this.train1 = this.add.follower(path1, this.gridToPx(17), this.gridToPx(8), 'train');
        this.train1.displayHeight = game.config.height / gridConfig.rows;
        this.train1.scaleX = this.train1.scaleY;

        this.train1.startFollow({
            duration: 5000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });

        // train 2
        const path2 = new Phaser.Curves.Path(this.gridToPx(11), this.gridToPx(8));
        path2.lineTo(this.gridToPx(11), this.gridToPx(2));
        path2.lineTo(this.gridToPx(2), this.gridToPx(2));
        path2.lineTo(this.gridToPx(2), this.gridToPx(5));
        path2.lineTo(this.gridToPx(5), this.gridToPx(5));
        path2.lineTo(this.gridToPx(5), this.gridToPx(2));
        path2.lineTo(this.gridToPx(11), this.gridToPx(2));
        path2.lineTo(this.gridToPx(11), this.gridToPx(8));

        this.train2 = this.add.follower(path2, this.gridToPx(11), this.gridToPx(8), 'train');
        this.train2.displayHeight = game.config.height / gridConfig.rows;
        this.train2.scaleX = this.train2.scaleY;

        this.train2.startFollow({
            duration: 5000,
            yoyo: true,
            repeat: -1,
            rotateToPath: true,
            verticalAdjust: true
        });

        // display paths
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFF00, 1);
        path1.draw(graphics, 128);
        path2.draw(graphics, 128);
    }

    update() {
        //     const trainPosition = this.grid.getCellCoord(this.train.x, this.train.y);

        //     const currentRail = rails.find(rail => {
        //         if (rail.x === trainPosition.x && rail.y === trainPosition.y) {
        //             return true;
        //         }
        //     });

        //     // if train is on rail and rail is selected, continue movement
        //     if (currentRail && currentRail.type && currentRail.isSelected) {
        //         switch (currentRail.type) {
        //             case (railType.HORIZONTAL):
        //                 this.train.x += 2;
        //                 break;
        //             case (railType.VERTICAL): {
        //                 this.train.y += 2;
        //                 break;
        //             }
        //             case (railType.LB): {
        //                 this.train.x += 1;
        //                 this.train.y += 1;
        //                 break;
        //             }
        //             default:
        //                 break;
        //         }
        //     }
    }
}
