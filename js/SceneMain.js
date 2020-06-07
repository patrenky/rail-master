const hexColor = {
    RED: 0xFF0000,
    BLUE: 0x2859B8,
    GREEN: 0x008000,
    YELLOW: 0xFFFF00,
    SILVER: 0xC0C0C0,
    PURPLE: 0x7B15B4,
    ORANGE: 0xFFA500,
};

const semState = {
    STOP: 'STOP',
    WARN: 'WARN',
    GO: 'GO'
};

const spriteDirection = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

const spritePosition = {
    T: 'T',
    B: 'B',
    R: 'R',
    L: 'L',
    TR: 'TR',
    TL: 'TL',
    BR: 'BR',
    BL: 'BL',
};

const semaphores = [
    {
        x: 26,
        y: 24,
        reversed: false,
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        position: spritePosition.T
    },
    {
        x: 18,
        y: 24,
        reversed: true,
        face: spriteDirection.LEFT,
        state: semState.STOP,
        position: spritePosition.T
    }
];

const paths = [
    {
        enabled: true,
        route: [
            { x: 29, y: 24 },
            { x: 8, y: 24 },
            { x: 8, y: 12 },
            { x: 11, y: 12 },
        ]
    },
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
    },
    {
        enabled: false,
        route: [
            { x: 14, y: 12 },
            { x: 14, y: 10 },
            { x: 25, y: 10 },
            { x: 25, y: 12 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 14, y: 12 },
            { x: 25, y: 12 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 14, y: 14 },
            { x: 25, y: 14 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 14, y: 14 },
            { x: 14, y: 16 },
            { x: 25, y: 16 },
            { x: 25, y: 14 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 25, y: 12 },
            { x: 27, y: 12 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 25, y: 14 },
            { x: 27, y: 14 },
            { x: 27, y: 12 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 27, y: 12 },
            { x: 37, y: 12 },
        ]
    },
];

const switches = [
    {
        x: 11,
        y: 12,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.BL
    },
    {
        x: 14,
        y: 12,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.TL
    },
    {
        x: 14,
        y: 14,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.BL
    },
    {
        x: 25,
        y: 12,
        reversed: true,
        state: spriteDirection.LEFT,
        position: spritePosition.TL
    },
    {
        x: 25,
        y: 14,
        reversed: true,
        state: spriteDirection.LEFT,
        position: spritePosition.BL
    },
    {
        x: 27,
        y: 12,
        reversed: true,
        state: spriteDirection.LEFT,
        position: spritePosition.T
    },
];


const trains = [
    {
        trainSelector: 'ruske_drahy',
        trainColor: hexColor.ORANGE,
        startPosition: { x: 29, y: 24 },
        startRotation: 90,
        reversed: false,
    },
];

const gridToPx = grid_number => {
    const tile_width = 16;
    return (grid_number * tile_width + tile_width / 2);
}

const pxToGrid = px => {
    const tile_width = 16;
    return Math.floor(px / tile_width);
}

const getSpriteCoords = (x, y, position) => {
    switch (position) {
        case (spritePosition.T):
            return { x, y: y - 1 };
        case (spritePosition.B):
            return { x, y: y + 1 };
        case (spritePosition.R):
            return { x: x + 1, y };
        case (spritePosition.L):
            return { x: x - 1, y };
        case (spritePosition.TR):
            return { x: x + 1, y: y - 1 };
        case (spritePosition.TL):
            return { x: x - 1, y: y - 1 };
        case (spritePosition.BR):
            return { x: x + 1, y: y + 1 };
        case (spritePosition.BL):
            return { x: x - 1, y: y + 1 };
        default:
            return { x, y };
    }
}

const getSemSprite = semaphoreState => {
    switch (semaphoreState) {
        case (semState.GO):
            return 'semGreen';
        case (semState.WARN):
            return 'semYellow';
        default:
            return 'semRed';
    }
}

const getSwitchSprite = swState => {
    switch (swState) {
        case (spriteDirection.RIGHT):
            return 'swRight';
        default:
            return 'swLeft';
    }
}

const getNextState = (array, actual) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === actual) {
            return array[(i + 1) % array.length]
        }
    }
}


class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image('tileset', 'assets/tileset.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json');

        this.load.image('semRed', 'assets/semaphores/sem_red.png');
        this.load.image('semYellow', 'assets/semaphores/sem_yellow.png');
        this.load.image('semGreen', 'assets/semaphores/sem_green.png');

        this.load.image('swLeft', 'assets/switches/switch_left.png');
        this.load.image('swRight', 'assets/switches/switch_right.png');

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
        map.createStaticLayer('Semaphores', tileset);
        map.createStaticLayer('Switches', tileset);

        this.cameras.main.setBackgroundColor(hexColor.GREEN);

        // show grid (dev/debug)
        this.grid = new AlignGrid(gridConfig);
        this.grid.showNumbers();

        // render semaphores
        semaphores.forEach(sem => {
            const semPosition = getSpriteCoords(sem.x, sem.y, sem.position);

            const semImg = this.add.sprite(gridToPx(semPosition.x), gridToPx(semPosition.y), getSemSprite(sem.state)).setInteractive({ useHandCursor: true });
            semImg.displayWidth = game.config.width / gridConfig.cols;
            semImg.scaleY = semImg.scaleX;

            if (sem.face === spriteDirection.RIGHT) {
                semImg.flipX = true;
            }

            semImg.on('pointerdown', () => {
                // switch semaphore state
                sem.state = getNextState(Object.keys(semState), sem.state);
                semImg.setTexture(getSemSprite(sem.state));
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

            this[trainSelector] = this.add.sprite(gridToPx(train.startPosition.x), gridToPx(train.startPosition.y), 'train').play('train_animation');
            this[trainSelector].displayHeight = game.config.height / gridConfig.rows * 2;
            this[trainSelector].scaleX = this[trainSelector].scaleY;
            this[trainSelector].setTint(train.trainColor);

            this[trainSelector].actualPath = this.getActualPath(train);
        });

        // render switches
        switches.forEach(sw => {
            const swPosition = getSpriteCoords(sw.x, sw.y, sw.position);

            const swImg = this.add.sprite(gridToPx(swPosition.x), gridToPx(swPosition.y), getSwitchSprite(sw.state)).setInteractive({ useHandCursor: true });
            swImg.displayWidth = game.config.width / gridConfig.cols;
            swImg.scaleY = swImg.scaleX;

            swImg.on('pointerdown', () => {
                // switch rail switch state
                sw.state = getNextState(Object.keys(spriteDirection), sw.state);
                swImg.setTexture(getSwitchSprite(sw.state));

                // switch enabled/disabled paths affected by current rail switch
                paths.forEach(path => {
                    const routeSelector = sw.reversed ? path.route.length - 1 : 0;

                    if (path.route[routeSelector].x === sw.x && path.route[routeSelector].y === sw.y) {
                        path.enabled = !path.enabled;
                    }
                });

                // re-render paths
                this.renderPaths();
            });
        });

        this.renderPaths();
    }

    getActualPath(train) {
        const trainSelector = train.trainSelector;

        const foundPath = paths.find(path => {
            const pathArray = train.reversed ? path.route.reverse() : path.route;

            if (pathArray[0].x === pxToGrid(this[trainSelector].x) && pathArray[0].y === pxToGrid(this[trainSelector].y)) {
                if (path.enabled) {
                    return true;
                }
            }
        });

        // console.log(foundPath);

        return foundPath;
    }

    getNextMove(trainSelector) {
        const actualPosition = { x: pxToGrid(this[trainSelector].x), y: pxToGrid(this[trainSelector].y) };
        const actualPath = this[trainSelector].actualPath.route;

        const nextMove = {};

        for (let i = 0; i < actualPath.length; i++) {
            const nextSelector = (i + 1) % actualPath.length;

            // horizontal match -> move on x
            if (actualPath[i].y === actualPosition.y && actualPath[nextSelector].y === actualPosition.y) {
                // console.log(`horizontal match ${gridToPx(actualPath[nextSelector].x) - this[trainSelector].x}`);
                nextMove.x = gridToPx(actualPath[nextSelector].x) - this[trainSelector].x;
            }

            // vertical match -> move on y
            else if (actualPath[i].x === actualPosition.x && actualPath[nextSelector].x === actualPosition.x) {
                // console.log(`vertical match ${gridToPx(actualPath[nextSelector].y) - this[trainSelector].y}`);
                nextMove.y = gridToPx(actualPath[nextSelector].y) - this[trainSelector].y;
            }

            if (nextMove.x || nextMove.y) break;
        }

        return nextMove;
    }

    renderPaths() {
        // display enabled/disabled paths (dev/debug)
        const gdisabled = this.add.graphics();
        gdisabled.lineStyle(2, hexColor.RED, 1);

        const genabled = this.add.graphics();
        genabled.lineStyle(2, hexColor.BLUE, 1);

        paths.forEach(path => {
            const p = new Phaser.Curves.Path(gridToPx(path.route[0].x), gridToPx(path.route[0].y));
            path.route.forEach(position => {
                p.lineTo(gridToPx(position.x), gridToPx(position.y));
            });
            p.draw(path.enabled ? genabled : gdisabled, 128);
        });
    }

    update() {
        // check whether trains collide with semaphores or final rails
        trains.forEach(train => {
            const trainSelector = train.trainSelector;
            const trainPosition = { x: pxToGrid(this[trainSelector].x), y: pxToGrid(this[trainSelector].y) };

            // // if train is on rail where semaphore is placed
            // const trainOnSemaphore = semaphores.find(sem => {
            //     if (sem.x === trainPosition.x && sem.y === trainPosition.y) {
            //         return true;
            //     }
            // });

            // if (trainOnSemaphore && trainOnSemaphore.reversed === train.reversed) {
            //     switch (trainOnSemaphore.state) {
            //         case (semState.STOP):
            //             // this[trainSelector].anims.pause(this[trainSelector].anims.currentAnim.frames[0]);
            //             this[trainSelector].pauseFollow();
            //             break;
            //         case (semState.GO): {
            //             // this[trainSelector].anims.play();
            //             this[trainSelector].resumeFollow();
            //             break;
            //         }
            //         default:
            //             break;
            //     }
            // }

            // count and execute next move
            const nextMove = this.getNextMove(trainSelector);
            const baseMoveStep = 5;

            // horizontal move
            if (nextMove.x) {

                // train rotation
                if (nextMove.x < 0) {
                    // to left
                } else {
                    // to right
                }

                // movement
                const moveSign = nextMove.x / Math.abs(nextMove.x);
                const moveStep = Math.abs(nextMove.x) > baseMoveStep ? moveSign * baseMoveStep : nextMove.x;
                this[trainSelector].x += moveStep;
            }

            // vertical move
            else if (nextMove.y) {

                // train rotation
                if (nextMove.y < 0) {
                    // to top
                } else {
                    // to bottom
                }

                // movement
                const moveSign = nextMove.y / Math.abs(nextMove.y);
                const moveStep = Math.abs(nextMove.y) > baseMoveStep ? moveSign * baseMoveStep : nextMove.y;
                this[trainSelector].y += moveStep;
            }

            // get next path
            else {
                console.log("get next path");
                this[trainSelector].actualPath = this.getActualPath(train);
            }

            // // if train is on final rail - reverse train & it's path
            // const trainOnFinalRail = train.finalRails.find(frail => {
            //     if (frail.x === trainPosition.x && frail.y === trainPosition.y) {
            //         if (frail.x !== train.lastReverse.x && frail.y !== train.lastReverse.y) {
            //             train.lastReverse = frail;
            //             return true;
            //         }
            //     }
            // });

            // if (trainOnFinalRail) {
            //     // this[trainSelector].pauseFollow();
            //     train.reversed = !train.reversed;
            //     console.log(`train is on final rail (${trainOnFinalRail.x}, ${trainOnFinalRail.y}), reverse: ${train.reversed}`);
            // }
        });
    }
}
