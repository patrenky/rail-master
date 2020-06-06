const semState = {
    STOP: 'STOP',
    GO: 'GO'
};

const spritePosition = {
    ABOVE: 'ABOVE',
    RIGHT: 'RIGHT'
};

const semaphores = [
    {
        x: 19,
        y: 24,
        state: semState.STOP,
        position: spritePosition.ABOVE
    }
];

const paths = {
    29: {
        24: [
            {
                enabled: true,
                route: [
                    { x: 29, y: 24 },
                    { x: 8, y: 24 },
                    { x: 8, y: 12 },
                    { x: 11, y: 12 },
                ]
            }
        ]
    },
    11: {
        12: [
            {
                enabled: true,
                route: [
                    { x: 11, y: 12 },
                    { x: 14, y: 12 },
                ]
            },
            {
                enabled: false,
                route: [
                    { x: 11, y: 12 },
                    { x: 11, y: 14 },
                    { x: 14, y: 14 },
                ]
            }
        ]
    }
};

const switches = [
    {
        x: 11,
        y: 12,
        position: spritePosition.ABOVE
    },
];


const trains = [
    {
        trainSelector: 'ruske_drahy',
        trainColor: 0x2859B8,
        startPosition: { x: 29, y: 24 },
        startRotation: 90,
    },
];

const gridToPx = grid_number => {
    const tile_width = 16;
    return (grid_number * tile_width + tile_width / 2);
}


class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image('tileset', 'assets/tileset.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap_extra.json');

        this.load.image('semRed', 'assets/semaphores/red.png');
        this.load.image('semGreen', 'assets/semaphores/green.png');

        this.load.spritesheet('train', "assets/train.png", {
            frameWidth: 256,
            frameHeight: 256,
            startFrame: 0,
            endFrame: 3
        });
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

        // show grid (dev/debug)
        this.grid = new AlignGrid(gridConfig);
        this.grid.showNumbers();

        // render semaphores
        semaphores.forEach(sem => {
            const semPositionX = sem.position === spritePosition.RIGHT ? sem.x + 1 : sem.x;
            const semPositionY = sem.position === spritePosition.ABOVE ? sem.y - 1 : sem.y;
            const semStateColor = sem.state === semState.GO ? 'semGreen' : 'semRed';

            const semImg = this.add.sprite(gridToPx(semPositionX), gridToPx(semPositionY), semStateColor).setInteractive({ useHandCursor: true });
            semImg.displayWidth = game.config.width / gridConfig.cols;
            semImg.scaleY = semImg.scaleX;

            semImg.on('pointerdown', () => {
                // switch semaphore state
                sem.state = sem.state === semState.GO ? semState.STOP : semState.GO;
                const newSemStateColor = sem.state === semState.GO ? 'semGreen' : 'semRed';
                semImg.setTexture(newSemStateColor);
            });
        });

        // train animation
        this.anims.create({
            key: 'train_animation',
            frames: this.anims.generateFrameNames('train', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });

        // render trains and their paths
        trains.forEach(train => {
            const trainSelector = train.trainSelector;
            const path = new Phaser.Curves.Path(gridToPx(train.startPosition.x), gridToPx(train.startPosition.y));

            this[trainSelector] = this.add.follower(path, gridToPx(train.startPosition.x), gridToPx(train.startPosition.y), 'train').play('train_animation');
            this[trainSelector].displayHeight = game.config.height / gridConfig.rows * 2;
            this[trainSelector].scaleX = this[trainSelector].scaleY;
            this[trainSelector].pathColoring = this.add.graphics();
            this[trainSelector].setTint(train.trainColor);

            this.updatePaths();

            this[trainSelector].startFollow({
                rotateToPath: true,
                rotationOffset: train.startRotation ? train.startRotation : 0,
                verticalAdjust: true,
                duration: 5000,
                yoyo: true,
                repeat: -1,
            });
        });

        // render switches
        switches.forEach(sw => {
            const swImg = this.add.sprite(gridToPx(sw.x), gridToPx(sw.y - 1), 'semRed').setInteractive({ useHandCursor: true });
            swImg.displayWidth = game.config.width / gridConfig.cols;
            swImg.scaleY = swImg.scaleX;

            swImg.on('pointerdown', () => {
                // switch enabled/disabled paths affected by current rail switch
                if (paths[sw.x] && paths[sw.x][sw.y]) {
                    paths[sw.x][sw.y].forEach(path => {
                        path.enabled = !path.enabled;
                    })
                }

                // re-render paths
                this.updatePaths();
            });
        });
    }

    updatePaths() {
        trains.forEach(train => {
            const trainSelector = train.trainSelector;

            // clear the old path
            this[trainSelector].path.curves.length = 0;
            this[trainSelector].path.cacheLengths.length = 0;

            const newPath = [];
            let lastPosition = { x: train.startPosition.x, y: train.startPosition.y };
            newPath.push(lastPosition);

            // find full path for train:
            // in every lastPosition append array of new positions when path is ENABLED
            while (true) {
                if (paths[lastPosition.x] && paths[lastPosition.x][lastPosition.y]) {
                    const foundPath = paths[lastPosition.x][lastPosition.y].find(possiblePath => {
                        if (possiblePath.enabled) {
                            return true;
                        }
                    });

                    if (foundPath) {
                        newPath.push(...foundPath.route);
                        lastPosition = foundPath.route[foundPath.route.length - 1];
                        continue;
                    }
                } else {
                    break;
                }
            }

            newPath.forEach(position => {
                this[trainSelector].path.lineTo(gridToPx(position.x), gridToPx(position.y));
            });


            // display paths (dev/debug)
            this[trainSelector].pathColoring.clear();
            this[trainSelector].pathColoring.lineStyle(2, train.trainColor, 1);
            this[trainSelector].path.draw(this[trainSelector].pathColoring, 128);
        });
    }

    update() {
        // check whether trains collide with semaphores
        trains.forEach(train => {
            const trainSelector = train.trainSelector;
            const trainPosition = this.grid.getCellCoord(this[trainSelector].x, this[trainSelector].y);

            const trainOnSemaphore = semaphores.find(sem => {
                if (sem.x === trainPosition.x && sem.y === trainPosition.y) {
                    return true;
                }
            });

            // if train is on rail where semaphore is placed
            if (trainOnSemaphore) {
                switch (trainOnSemaphore.state) {
                    case (semState.STOP):
                        // this[trainSelector].anims.pause(this[trainSelector].anims.currentAnim.frames[0]);
                        this[trainSelector].pauseFollow();
                        break;
                    case (semState.GO): {
                        // this[trainSelector].anims.play();
                        this[trainSelector].resumeFollow();
                        break;
                    }
                    default:
                        break;
                }
            }
        });
    }
}
