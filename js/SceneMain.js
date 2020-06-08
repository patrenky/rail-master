const hexColor = {
    RED: 0xFF0000,
    BLUE: 0x2859B8,
    GREEN: 0x008000,
    YELLOW: 0xFFFF00,
    SILVER: 0xC0C0C0,
    PURPLE: 0x7B15B4,
    ORANGE: 0xFFA500,
};

const DEGREE_90 = 1.57;


const semType = {
    PRE: 'PRE', // predzvest
    IN: 'IN', // vjezdove
    OUT: 'OUT', // vyjezdove
    SORT: 'SORT' // serazovaci
}

// only for semType==IN
const semStateIn = {
    STOP: 'STOP',
    WARN: 'WARN',
    GO: 'GO'
};

const semStateDefault = {
    STOP: 'STOP',
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
        x: 8,
        y: 20,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.PRE,
        position: spritePosition.R
    },
    {
        x: 8,
        y: 16,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateIn.GO,
        type: semType.IN,
        position: spritePosition.R
    },
    {
        x: 15,
        y: 10,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 15,
        y: 12,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 15,
        y: 14,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 15,
        y: 16,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 23,
        y: 10,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 24,
        y: 12,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 23,
        y: 14,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 24,
        y: 16,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 37,
        y: 7,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.PRE,
        position: spritePosition.R
    },
    {
        x: 44,
        y: 8,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 44,
        y: 10,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 44,
        y: 14,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 44,
        y: 16,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 51,
        y: 2,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.PRE,
        position: spritePosition.T
    },
    {
        x: 49,
        y: 20,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.STOP,
        type: semType.SORT,
        position: spritePosition.T
    },
    {
        x: 56,
        y: 19,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.STOP,
        type: semType.SORT,
        position: spritePosition.L
    },
    {
        x: 52,
        y: 23,
        reversed: true,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.R
    },
    {
        x: 54,
        y: 23,
        reversed: true,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.R
    },
    {
        x: 56,
        y: 23,
        reversed: true,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.R
    },
    {
        x: 50,
        y: 25,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.STOP,
        type: semType.SORT,
        position: spritePosition.R
    },
    {
        x: 52,
        y: 27,
        reversed: false,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.L
    },
    {
        x: 54,
        y: 27,
        reversed: false,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.L
    },
    {
        x: 56,
        y: 27,
        reversed: false,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.L
    },
    {
        x: 54,
        y: 33,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.IN,
        position: spritePosition.R
    },
    {
        x: 54,
        y: 37,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.PRE,
        position: spritePosition.R
    },
    {
        x: 41,
        y: 4,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 41,
        y: 6,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 45,
        y: 4,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 45,
        y: 6,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semStateDefault.GO,
        type: semType.OUT,
        position: spritePosition.B
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
    {
        enabled: true,
        route: [
            { x: 37, y: 12 },
            { x: 37, y: 4 },
            { x: 40, y: 4 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 40, y: 4 },
            { x: 46, y: 4 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 40, y: 4 },
            { x: 40, y: 6 },
            { x: 46, y: 6 },
            { x: 46, y: 4 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 46, y: 4 },
            { x: 49, y: 4 },
            { x: 49, y: 2 },
            { x: 55, y: 2 },
            { x: 55, y: 7 },
            { x: 54, y: 7 },
            { x: 54, y: 19 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 37, y: 12 },
            { x: 43, y: 12 },
            { x: 43, y: 10 },
            { x: 48, y: 10 },
            { x: 48, y: 14 },
            { x: 43, y: 14 },
            { x: 43, y: 12 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 43, y: 10 },
            { x: 43, y: 8 },
            { x: 50, y: 8 },
            { x: 50, y: 16 },
            { x: 43, y: 16 },
            { x: 43, y: 14 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 54, y: 19 },
            { x: 52, y: 19 },
            { x: 52, y: 21 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 54, y: 19 },
            { x: 54, y: 21 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 52, y: 21 },
            { x: 52, y: 24 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 52, y: 21 },
            { x: 50, y: 21 },
            { x: 50, y: 18 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 52, y: 24 },
            { x: 52, y: 28 },
            { x: 54, y: 28 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 52, y: 24 },
            { x: 50, y: 24 },
            { x: 50, y: 28 },
            { x: 50, y: 36 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 54, y: 21 },
            { x: 54, y: 39 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 54, y: 21 },
            { x: 56, y: 21 },
        ]
    },
    {
        enabled: false,
        route: [
            { x: 56, y: 21 },
            { x: 56, y: 18 },
        ]
    },
    {
        enabled: true,
        route: [
            { x: 56, y: 21 },
            { x: 56, y: 30 },
            { x: 54, y: 30 },
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
    {
        x: 37,
        y: 12,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.B
    },
    {
        x: 43,
        y: 10,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.L
    },
    {
        x: 40,
        y: 4,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.T
    },
    {
        x: 54,
        y: 19,
        reversed: false,
        state: spriteDirection.RIGHT,
        position: spritePosition.TL
    },
    {
        x: 52,
        y: 21,
        reversed: false,
        state: spriteDirection.RIGHT,
        position: spritePosition.R
    },
    {
        x: 52,
        y: 24,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.R
    },
    {
        x: 54,
        y: 21,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.TR
    },
    {
        x: 56,
        y: 21,
        reversed: false,
        state: spriteDirection.RIGHT,
        position: spritePosition.R
    },
];

const destinationRails = [
    { x: 29, y: 24 },
    { x: 54, y: 39 },
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

const getSemSprite = (semaphoreState, semaphoreType) => {
    switch (semaphoreState) {
        case (semStateDefault.GO || semStateIn.GO):
            return semaphoreType + '_semGreen';
        case (semStateDefault.WARN || semStateIn.WARN):
            return semaphoreType + '_semYellow';
        default:
            return semaphoreType + '_semRed';
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

        // Semaphores
        // IN
        this.load.image('IN_semRed', 'assets/semaphores/sem_in_red.png');
        this.load.image('IN_semYellow', 'assets/semaphores/sem_in_yellow.png');
        this.load.image('IN_semGreen', 'assets/semaphores/sem_in_green.png');

        // OUT
        this.load.image('OUT_semRed', 'assets/semaphores/sem_out_red.png');
        this.load.image('OUT_semGreen', 'assets/semaphores/sem_out_green.png');

        // PRE 
        this.load.image('PRE_semRed', 'assets/semaphores/sem_warn_yellow.png');
        this.load.image('PRE_semGreen', 'assets/semaphores/sem_warn_green.png');

        // SORT - used the same signalisation for algorithm switch (red=blue & green=white)
        this.load.image('SORT_semRed', 'assets/semaphores/sem_move_blue.png');
        this.load.image('SORT_semGreen', 'assets/semaphores/sem_move_white.png');

        // Switches
        this.load.image('swLeft', 'assets/switches/switch_left.png');
        this.load.image('swRight', 'assets/switches/switch_right.png');

        this.load.image('rotate', 'assets/rotate.png');

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
        // map.createStaticLayer('Semaphores', tileset);
        // map.createStaticLayer('Switches', tileset);

        this.cameras.main.setBackgroundColor(hexColor.GREEN);

        // show grid (dev/debug)
        this.grid = new AlignGrid(gridConfig);
        this.grid.showNumbers();

        // render semaphores
        semaphores.forEach(sem => {
            const semPosition = getSpriteCoords(sem.x, sem.y, sem.position);

            const semImg = this.add.sprite(
                gridToPx(semPosition.x), 
                gridToPx(semPosition.y), 
                getSemSprite(sem.state, sem.type)).setInteractive({ useHandCursor: true });
            semImg.displayWidth = game.config.width / gridConfig.cols;
            semImg.scaleY = semImg.scaleX = 1.5 * semImg.scaleX;

            if (sem.face === spriteDirection.RIGHT) {
                semImg.flipX = true;
            }

            semImg.on('pointerdown', () => {
                // switch semaphore state
                var stateByType = semStateDefault;
                if (sem.type == semType.IN) {
                    stateByType = semStateIn;
                }
                sem.state = getNextState(Object.keys(stateByType), sem.state);
                semImg.setTexture(getSemSprite(sem.state, sem.type));
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
            const pathArray = train.reversed ? path.route.slice().reverse() : path.route;

            if (pathArray[0].x === pxToGrid(this[trainSelector].x) && pathArray[0].y === pxToGrid(this[trainSelector].y)) {
                if (path.enabled) {
                    return true;
                }
            }
        });

        if (!foundPath || !foundPath.route) {
            return null;
        }

        return train.reversed ? foundPath.route.slice().reverse() : foundPath.route;
    }

    getNextMove(trainSelector) {
        const actualPosition = { x: pxToGrid(this[trainSelector].x), y: pxToGrid(this[trainSelector].y) };

        const nextMove = {};

        if (!this[trainSelector].actualPath) {
            return nextMove;
        }

        const actualPath = this[trainSelector].actualPath;

        for (let i = 0; i < actualPath.length - 1; i++) {
            // horizontal match -> move on x
            if (actualPath[i].y === actualPosition.y && actualPath[i + 1].y === actualPosition.y) {
                // console.log(`horizontal match ${gridToPx(actualPath[i + 1].x)} (${actualPath[i + 1].x}) - ${this[trainSelector].x} -> ${gridToPx(actualPath[i + 1].x) - this[trainSelector].x}`);
                nextMove.x = gridToPx(actualPath[i + 1].x) - this[trainSelector].x;
            }

            // vertical match -> move on y
            else if (actualPath[i].x === actualPosition.x && actualPath[i + 1].x === actualPosition.x) {
                // console.log(`vertical match ${gridToPx(actualPath[i + 1].y)} (${actualPath[i + 1].y}) - ${this[trainSelector].y} -> ${gridToPx(actualPath[i + 1].y) - this[trainSelector].y}`);
                nextMove.y = gridToPx(actualPath[i + 1].y) - this[trainSelector].y;
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
            const baseMoveStep = 1;

            // horizontal move
            if (nextMove.x) {

                // train rotation
                if (nextMove.x < 0) {
                    // to left
                    this[trainSelector].rotation = -DEGREE_90;
                } else {
                    // to right
                    this[trainSelector].rotation = DEGREE_90;
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
                    this[trainSelector].rotation = 0;
                } else {
                    // to bottom
                    this[trainSelector].rotation = 2 * DEGREE_90;
                }

                // movement
                const moveSign = nextMove.y / Math.abs(nextMove.y);
                const moveStep = Math.abs(nextMove.y) > baseMoveStep ? moveSign * baseMoveStep : nextMove.y;
                this[trainSelector].y += moveStep;
            }

            // get next path
            else {
                this[trainSelector].actualPath = this.getActualPath(train);

                // train is on destination rail or collide with wrong switched rails
                if (!this[trainSelector].actualPath) {

                    // if train is on destination rail
                    const trainOnDestination = destinationRails.find(rail => {
                        if (rail.x === trainPosition.x && rail.y === trainPosition.y) {
                            if (!rail.shown) {
                                rail.shown = true;
                                return true;
                            }
                        }
                    });

                    if (trainOnDestination) {
                        const rotateImg = this.add.sprite(gridToPx(trainOnDestination.x), gridToPx(trainOnDestination.y), 'rotate').setInteractive({ useHandCursor: true });
                        rotateImg.destroyOnClick = true;

                        rotateImg.on('pointerdown', () => {
                            train.reversed = !train.reversed;
                            trainOnDestination.shown = false;
                            rotateImg.destroy();
                        });
                    }

                    // else train collide with wrong switched rails (or destination rail, but still not rotated)
                    else {
                        console.log("TODO wrong switched rails");
                    }
                }
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
