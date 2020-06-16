const DEGREE_90 = 1.57;
const BASE_SPEED = 1;
const SLOW_SPEED = 0.5;
const BACKOFF_TIME = 50;
const TILE_WIDTH = 16;

const gridToPx = grid_number => (grid_number * TILE_WIDTH + TILE_WIDTH / 2);

const pxToGrid = px => Math.floor(px / TILE_WIDTH);

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

const getSemSprite = (semaphoreType, semaphoreState) => {
    return { sprite: semaphoreType + "_" + semaphoreState, animated: semaphoreState === semState.WARN_FLASH };
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

    return array[0];
}


class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        const semSpritesheetConfig = {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 1
        };

        // background tilemap
        this.load.image('tileset', 'assets/tileset.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json');

        // semaphores IN
        this.load.image(`${semType.IN}_${semState.STOP}`, 'assets/semaphores/sem_in_red.png');
        this.load.image(`${semType.IN}_${semState.WARN}`, 'assets/semaphores/sem_in_yellow.png');
        this.load.image(`${semType.IN}_${semState.GO}`, 'assets/semaphores/sem_in_green.png');
        this.load.image(`${semType.IN}_${semState.WARN_WARN}`, 'assets/semaphores/sem_in_switch_both.png');
        this.load.spritesheet(`${semType.IN}_${semState.WARN_FLASH}`, 'assets/semaphores/sem_in_switch_dual.png', semSpritesheetConfig);

        // semaphores OUT
        this.load.image(`${semType.OUT}_${semState.STOP}`, 'assets/semaphores/sem_out_red.png');
        this.load.image(`${semType.OUT}_${semState.GO}`, 'assets/semaphores/sem_out_green.png');
        this.load.image(`${semType.OUT}_${semState.GO_WARN}`, 'assets/semaphores/sem_out_switch_green.png');

        // semaphores PRE 
        this.load.image(`${semType.PRE}_${semState.WARN}`, 'assets/semaphores/sem_warn_yellow.png');
        this.load.image(`${semType.PRE}_${semState.GO}`, 'assets/semaphores/sem_warn_green.png');
        this.load.spritesheet(`${semType.PRE}_${semState.WARN_FLASH}`, 'assets/semaphores/sem_warn_switch_dual.png', semSpritesheetConfig);

        // semaphores SORT (red=blue, green=white)
        this.load.image(`${semType.SORT}_${semState.STOP}`, 'assets/semaphores/sem_move_blue.png');
        this.load.image(`${semType.SORT}_${semState.GO}`, 'assets/semaphores/sem_move_white.png');

        // switches
        this.load.image('swLeft', 'assets/switches/switch_left.png');
        this.load.image('swRight', 'assets/switches/switch_right.png');

        // station boards
        this.load.image('st1', 'assets/stations/kurim.png');
        this.load.image('st2', 'assets/stations/bityska.png');

        // actions
        this.load.image('rotate', 'assets/actions/rotate.png');
        this.load.image('warning', 'assets/actions/warning.png');
        this.load.image('checkbox_on', 'assets/actions/checkbox_on.png');
        this.load.image('checkbox_off', 'assets/actions/checkbox_off.png');

        // train
        this.load.spritesheet('train', "assets/train.png", {
            frameWidth: 256,
            frameHeight: 256,
            startFrame: 0,
            endFrame: 3
        });

        // explosion
        this.load.spritesheet('boom', "assets/explosion.png", {
            frameWidth: 256,
            frameHeight: 256,
            startFrame: 0,
            endFrame: 4
        });
    }

    create() {
        // train animation
        this.anims.create({
            key: 'train_animation',
            frames: this.anims.generateFrameNames('train', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });

        // explosion animation
        this.anims.create({
            key: 'boom_animation',
            frames: this.anims.generateFrameNames('boom', { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });

        // blink animation for each semaphore type flash
        [`${semType.IN}_${semState.WARN_FLASH}`, `${semType.PRE}_${semState.WARN_FLASH}`].forEach(semSwitchType => {
            this.anims.create({
                key: `${semSwitchType}_animation`,
                frames: this.anims.generateFrameNames(semSwitchType, { start: 0, end: 1 }),
                frameRate: 0.9,
                repeat: -1
            });
        });

        // render backgorund
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('tileset', 'tileset');
        map.createStaticLayer('Rails', tileset);

        this.cameras.main.setBackgroundColor(hexColor.GREEN);

        // show grid
        this.grid = new AlignGrid({
            scene: this,
            cols: 60,
            rows: 40
        });

        // add static images for stations
        const st1 = this.add.sprite(gridToPx(20), gridToPx(7), 'st1');
        st1.displayWidth = TILE_WIDTH;
        st1.scaleY = st1.scaleX = 4 * st1.scaleX;

        const st2 = this.add.sprite(gridToPx(47), gridToPx(25), 'st2');
        st2.displayWidth = 2 * TILE_WIDTH;
        st2.scaleY = st2.scaleX = 3.5 * st2.scaleX;
        st2.rotation = -DEGREE_90;

        // game options
        const OPT_TEXT_MARGIN_TOP = 35;
        const OPT_TEXT_MARGIN_RIGHT = 50;
        const OPT_TEXT_CONFIG = { fontFamily: 'Arial', fontSize: '12px' };

        // game options - render switched paths
        this.optionSwitches = this.add.sprite(gridToPx(2), gridToPx(2), 'checkbox_on').setInteractive({ useHandCursor: true });
        this.optionSwitches.optionEnabled = true;
        this.add.text(OPT_TEXT_MARGIN_RIGHT, OPT_TEXT_MARGIN_TOP, 'Zobrazit smer vyhybek', OPT_TEXT_CONFIG);

        this.optionSwitches.on('pointerdown', () => {
            this.optionSwitches.optionEnabled = !this.optionSwitches.optionEnabled;
            this.optionSwitches.setTexture(this.optionSwitches.optionEnabled ? 'checkbox_on' : 'checkbox_off');

            if (this.optionSwitches.optionEnabled) {
                this.renderSwitchedPaths();
            } else {
                if (this.switchDebug) {
                    this.switchDebug.destroy();
                }
            }
        });

        // game options - render grid
        this.optionGrid = this.add.sprite(gridToPx(2), gridToPx(3), 'checkbox_off').setInteractive({ useHandCursor: true });
        this.optionGrid.optionEnabled = false;
        this.add.text(OPT_TEXT_MARGIN_RIGHT, OPT_TEXT_MARGIN_TOP + TILE_WIDTH, 'Zobrazit mrizku', OPT_TEXT_CONFIG);

        this.optionGrid.on('pointerdown', () => {
            this.optionGrid.optionEnabled = !this.optionGrid.optionEnabled;
            this.optionGrid.setTexture(this.optionGrid.optionEnabled ? 'checkbox_on' : 'checkbox_off');

            if (this.optionGrid.optionEnabled) {
                this.grid.showNumbers();
            } else {
                this.grid.hide();
            }
        });

        // render semaphores
        semaphores.forEach((sem, idx) => {
            const semSelector = sem.semSelector = `sem${idx}`;
            const semPosition = getSpriteCoords(sem.x, sem.y, sem.position);
            const semaphoreSprite = getSemSprite(sem.type, sem.state)

            this[semSelector] = this.add.sprite(gridToPx(semPosition.x), gridToPx(semPosition.y), semaphoreSprite.sprite);
            this[semSelector].displayWidth = TILE_WIDTH;
            this[semSelector].scaleY = this[semSelector].scaleX = 1.5 * this[semSelector].scaleX;

            if (sem.face === spriteDirection.RIGHT) {
                this[semSelector].flipX = true;
            }

            if (sem.rotated) {
                this[semSelector].rotation = 2 * DEGREE_90;
            }

            if (sem.type !== semType.PRE) {
                this[semSelector].setInteractive({ useHandCursor: true });
                this[semSelector].on('pointerdown', () => {
                    this.switchSemaphoreState(sem);
                });
            }
        });

        // render trains and their paths
        trains.forEach(train => {
            const trainSelector = train.trainSelector;
            train.reversedDelay = 0;
            train.stopDelay = 0;
            train.moveSpeed = BASE_SPEED;

            this[trainSelector] = this.add.sprite(gridToPx(train.startPosition.x), gridToPx(train.startPosition.y), 'train').play('train_animation');
            this[trainSelector].displayHeight = 2 * TILE_WIDTH;
            this[trainSelector].scaleX = this[trainSelector].scaleY;
            this[trainSelector].setTint(train.trainColor);

            this[trainSelector].actualPath = this.getActualPath(train);
        });

        // render switches
        switches.forEach(sw => {
            const swPosition = getSpriteCoords(sw.x, sw.y, sw.position);

            const swImg = this.add.sprite(gridToPx(swPosition.x), gridToPx(swPosition.y), getSwitchSprite(sw.state)).setInteractive({ useHandCursor: true });
            swImg.displayWidth = TILE_WIDTH;
            swImg.scaleY = swImg.scaleX;

            swImg.on('pointerdown', () => {
                // switch rail switch state
                sw.state = getNextState(Object.keys(spriteDirection), sw.state);
                swImg.setTexture(getSwitchSprite(sw.state));

                // switch enabled/disabled paths affected by current rail switch
                paths.forEach(path => {
                    const routeSelector = sw.reversed ? path.route.length - 1 : 0;

                    if (path.route[routeSelector].x === sw.x && path.route[routeSelector].y === sw.y) {
                        path.activated = !path.activated;
                    }
                });

                // re-render paths
                if (this.optionSwitches.optionEnabled) {
                    this.renderSwitchedPaths();
                }
            });
        });

        if (this.optionSwitches.optionEnabled) {
            this.renderSwitchedPaths();
        }

        if (this.optionGrid.optionEnabled) {
            this.grid.showNumbers();
        }
    }

    findNextOutSemaphore(next) {
        if (next.object === 'switch') {
            const currentSwitch = switches.find(sw => {
                if (sw.x === next.x && sw.y === next.y) {
                    return true;
                }
            });

            if (currentSwitch.state && next[currentSwitch.state]) {
                return this.findNextOutSemaphore(next[currentSwitch.state]);
            }
        } else if (next.object === 'semaphore') {
            const currentSemaphore = semaphores.find(sem => {
                if (sem.x === next.x && sem.y === next.y) {
                    return true;
                }
            });

            if (currentSemaphore) {
                return currentSemaphore;
            }
        }

        return null;
    }

    switchSemaphoreState(semaphore, requestedState) {
        let nextState = undefined;

        // set requested state
        if (requestedState) {
            nextState = Array.isArray(requestedState) ? getNextState(requestedState, semaphore.state) : requestedState;
        }

        // find next state
        else {
            // if state is not STOP, set to STOP
            if (semaphore.state !== semState.STOP) {
                nextState = semState.STOP;
            }

            // if semaphore is IN
            else if (semaphore.type === semType.IN) {

                // find active OUT for current IN
                if (semaphore.next) {
                    const nextOut = this.findNextOutSemaphore(semaphore.next);

                    if (!nextOut) {
                        return;
                    }

                    // decide IN state based on active OUT
                    switch (nextOut.state) {
                        case (semState.STOP):
                            if (nextOut.straight) {
                                nextState = semState.WARN;
                            } else {
                                nextState = semState.WARN_WARN;
                            }
                            break;
                        case (semState.GO):
                        case (semState.GO_WARN):
                            if (nextOut.straight) {
                                nextState = semState.GO;
                            } else {
                                nextState = semState.WARN_FLASH;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }

            // if semaphore is OUT
            else if (semaphore.type === semType.OUT) {
                if (!semaphore.straight) {
                    nextState = semState.GO_WARN;
                } else {
                    nextState = semState.GO;
                }
            }

            // else (SORT only)
            else {
                nextState = semState.GO;
            }
        }

        // set state to semaphore
        if (nextState) {
            semaphore.state = nextState;
            const semaphoreSprite = getSemSprite(semaphore.type, semaphore.state);
            this[semaphore.semSelector].setTexture(semaphoreSprite.sprite);

            // handle animation
            if (this[semaphore.semSelector].anims) {
                this[semaphore.semSelector].anims.stop();
            }

            if (semaphoreSprite.animated) {
                this[semaphore.semSelector].play(`${semaphore.type}_${semaphore.state}_animation`);
            }

            // if current semaphore is IN set it's PRE recursively
            if (semaphore.type === semType.IN && semaphore.previous) {
                // find previous PRE
                const prevSem = semaphores.find(pSem => {
                    if (pSem.x === semaphore.previous.x && pSem.y === semaphore.previous.y) {
                        return true;
                    }
                });

                switch (semaphore.state) {
                    case (semState.GO):
                        this.switchSemaphoreState(prevSem, semState.GO);
                        break;
                    case (semState.WARN):
                        this.switchSemaphoreState(prevSem, semState.GO);
                        break;
                    case (semState.STOP):
                        this.switchSemaphoreState(prevSem, semState.WARN);
                        break;
                    case (semState.WARN_WARN):
                    case (semState.WARN_FLASH):
                        this.switchSemaphoreState(prevSem, semState.WARN_FLASH);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    getActualPath(train) {
        const trainSelector = train.trainSelector;

        const foundPath = paths.find(path => {
            const pathArray = train.reversed ? path.route.slice().reverse() : path.route;

            if (pathArray[0].x === pxToGrid(this[trainSelector].x) && pathArray[0].y === pxToGrid(this[trainSelector].y)) {
                if (!path.hasOwnProperty('activated') || path.activated) {
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
                nextMove.x = gridToPx(actualPath[i + 1].x) - this[trainSelector].x;
            }

            // vertical match -> move on y
            else if (actualPath[i].x === actualPosition.x && actualPath[i + 1].x === actualPosition.x) {
                nextMove.y = gridToPx(actualPath[i + 1].y) - this[trainSelector].y;
            }

            if (nextMove.x || nextMove.y) break;
        }

        return nextMove;
    }

    renderSwitchedPaths() {
        // display enabled paths based on switches
        if (this.switchDebug) {
            this.switchDebug.destroy();
        }

        this.switchDebug = this.add.graphics();
        this.switchDebug.lineStyle(2, hexColor.WHITE, 1);

        paths.forEach(path => {
            if (path.activated) {
                const p = new Phaser.Curves.Path(gridToPx(path.route[0].x), gridToPx(path.route[0].y));
                path.route.forEach(position => {
                    p.lineTo(gridToPx(position.x), gridToPx(position.y));
                });
                p.draw(this.switchDebug, 128);
            }
        });
    }

    removeSwitchWarning(trainSelector) {
        if (this[trainSelector].wrongSwitch) {
            this[trainSelector].wrongSwitch.destroy();
            this[trainSelector].wrongSwitch = false;
        }
    }

    update() {
        // check whether trains collide with semaphores or final rails
        trains.forEach(train => {
            const trainSelector = train.trainSelector;
            const trainPosition = { x: pxToGrid(this[trainSelector].x), y: pxToGrid(this[trainSelector].y) };

            train.reversedDelay -= 1;
            train.stopDelay -= 1;

            // check if train collides with switch reverse rails (circuit)
            const trainOnReverseRail = switchReverseRails.find(rail => {
                if (rail.x === trainPosition.x && rail.y === trainPosition.y) {
                    return true;
                }
            });

            if (trainOnReverseRail && train.reversedDelay < 1) {
                train.reversedDelay = BACKOFF_TIME;
                train.reversed = !train.reversed;
            }

            // check if train collides with other train
            trains.forEach(otherTrain => {
                const otherTrainPosition = { x: pxToGrid(this[otherTrain.trainSelector].x), y: pxToGrid(this[otherTrain.trainSelector].y) };

                if (train.trainSelector !== otherTrain.trainSelector && !train.collides) {
                    if (trainPosition.x === otherTrainPosition.x && trainPosition.y === otherTrainPosition.y) {
                        const boomImg = this.add.sprite(gridToPx(trainPosition.x), gridToPx(trainPosition.y), 'boom').play('boom_animation');
                        boomImg.displayHeight = 40;
                        boomImg.scaleX = boomImg.scaleY;

                        train.collides = true;

                        train.moveSpeed = 0;
                        otherTrain.moveSpeed = 0;
                    }
                }
            });

            // if train is on rail where semaphore is placed
            const trainOnSemaphore = semaphores.find(sem => {
                if (sem.x === trainPosition.x && sem.y === trainPosition.y) {
                    return true;
                }
            });

            // train action based on semaphore state
            if (trainOnSemaphore && trainOnSemaphore.reversed === train.reversed) {
                switch (trainOnSemaphore.state) {
                    case (semState.WARN):
                    case (semState.GO_WARN):
                    case (semState.WARN_WARN):
                    case (semState.WARN_FLASH):
                        train.moveSpeed = SLOW_SPEED;
                        break;
                    case (semState.STOP):
                        if (train.stopDelay < 1) {
                            train.moveSpeed = 0;
                        }
                        break;
                    default:
                        train.moveSpeed = BASE_SPEED;
                        break;
                }
            }

            // switch semaphore to red when train pass through
            if (trainOnSemaphore && trainOnSemaphore.type !== semType.PRE && train.stopDelay < 1) {
                if (train.reversed === trainOnSemaphore.reversed) {
                    train.stopDelay = BACKOFF_TIME;
                    this.switchSemaphoreState(trainOnSemaphore, semState.STOP);
                }
            }

            // count and execute next move
            const nextMove = this.getNextMove(trainSelector);

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
                const moveStep = Math.abs(nextMove.x) > train.moveSpeed ? moveSign * train.moveSpeed : nextMove.x;
                this[trainSelector].x += moveStep;

                // remove warning if any
                this.removeSwitchWarning(trainSelector);
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
                const moveStep = Math.abs(nextMove.y) > train.moveSpeed ? moveSign * train.moveSpeed : nextMove.y;
                this[trainSelector].y += moveStep;

                // remove warning if any
                this.removeSwitchWarning(trainSelector);
            }

            // get next path
            else {
                this[trainSelector].actualPath = this.getActualPath(train);

                // train is on destination rail or collide with wrong switched rails
                if (!this[trainSelector].actualPath) {

                    // if train is on destination rail
                    const trainOnDestination = destinationRails.find(rail => {
                        if (rail.x === trainPosition.x && rail.y === trainPosition.y) {
                            return true;
                        }
                    });

                    if (trainOnDestination) {
                        // show only once
                        if (!trainOnDestination.shown) {
                            trainOnDestination.shown = true;
                            const rotateImg = this.add.sprite(this[trainSelector].x, this[trainSelector].y, 'rotate').setInteractive({ useHandCursor: true });

                            rotateImg.on('pointerdown', () => {
                                train.reversed = !train.reversed;
                                trainOnDestination.shown = false;
                                rotateImg.destroy();
                            });
                        }
                    }

                    // else train collide with wrong switched rails
                    else {
                        // show only once
                        if (!this[trainSelector].wrongSwitch) {
                            const warnImg = this.add.sprite(this[trainSelector].x, this[trainSelector].y, 'warning');
                            warnImg.scaleX = warnImg.scaleY = 1.5 * warnImg.scaleX;
                            this[trainSelector].wrongSwitch = warnImg;
                        }
                    }
                }
            }
        });
    }
}
