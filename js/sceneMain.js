const semState = {
    STOP: 'STOP',
    GO: 'GO'
};

const semPosition = {
    ABOVE: 'ABOVE',
    RIGHT: 'RIGHT'
}

const semaphores = [
    {
        x: 13,
        y: 2,
        state: semState.STOP,
        position: semPosition.ABOVE
    },
    {
        x: 11,
        y: 4,
        state: semState.STOP,
        position: semPosition.RIGHT
    }
];

const rail_switches = [ 
    // all switches are numbered in direction from Kurim to Bityska
    // logic behind names is {station}_{rail: side_left_x - side_right_x - main}_ordering
    {
        name: "k_m_1",
    }
]

const trains = [
    {
        trainSelector: 'ruske_drahy',
        startPosition: { x: 29, y: 24 },
        pathPositions: [
            { x: 29, y: 24 },
            { x: 8, y: 24 },
            { x: 8, y: 12 },
            { x: 11, y: 12 },
            // prvni vyhybka

            // kurim - odstavna kolej
            /*{ x: 14, y: 12 },
            { x: 14, y: 10 },
            { x: 25, y: 10 },
            { x: 25, y: 12 },*/
            // kurim - spodni kolej

        ],
    },
    /*{
        trainSelector: 'train2',
        startPosition: { x: 11, y: 8 },
        pathPositions: [
            { x: 11, y: 2 },
            { x: 2, y: 2 },
            { x: 2, y: 5 },
            { x: 5, y: 5 },
            { x: 5, y: 2 },
            { x: 11, y: 2 },
            { x: 11, y: 8 },
        ],
    }*/
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
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json');

        this.load.image('train', "assets/train.png");

        this.load.image('semRed', 'assets/semaphores/red.png');
        this.load.image('semGreen', 'assets/semaphores/green.png');

        // TODO render semaphore with animation
        // for (const sem in semType) {
        //     this.load.spritesheet(sem, "assets/semaphores/" + sem.toLowerCase() + ".png", { frameWidth: 100, frameHeight: 300 });
        // }
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
        map.createStaticLayer('Rails', tileset);

        this.cameras.main.setBackgroundColor('#008100');

        // show grid (dev/debug)
        this.grid = new AlignGrid(gridConfig);
        this.grid.showNumbers();

        // render semaphores
        semaphores.forEach(sem => {
            const semPositionX = sem.position === semPosition.RIGHT ? sem.x + 1 : sem.x;
            const semPositionY = sem.position === semPosition.ABOVE ? sem.y - 1 : sem.y;
            const semStateColor = sem.state === semState.GO ? 'semGreen' : 'semRed';

            const semImg = this.add.sprite(gridToPx(semPositionX), gridToPx(semPositionY), semStateColor).setInteractive({ useHandCursor: true });
            semImg.displayWidth = game.config.width / gridConfig.cols;
            semImg.scaleY = semImg.scaleX;

            semImg.on('pointerdown', () => {
                sem.state = sem.state === semState.GO ? semState.STOP : semState.GO;
                const newSemStateColor = sem.state === semState.GO ? 'semGreen' : 'semRed';
                semImg.setTexture(newSemStateColor);
            });
        });


        // TODO render semaphore with animation
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


        // display paths (dev/debug)
        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFFFF00, 1);

        // render trains and their paths
        trains.forEach(train => {
            const trainSelector = train.trainSelector;
            const path = new Phaser.Curves.Path(gridToPx(train.startPosition.x), gridToPx(train.startPosition.y));

            train.pathPositions.forEach(position => {
                path.lineTo(gridToPx(position.x), gridToPx(position.y));
            });

            this[trainSelector] = this.add.follower(path, gridToPx(train.startPosition.x), gridToPx(train.startPosition.y), 'train');
            this[trainSelector].displayHeight = game.config.height / gridConfig.rows;
            this[trainSelector].scaleX = this[trainSelector].scaleY;

            this[trainSelector].startFollow({
                duration: 5000,
                yoyo: true,
                repeat: -1,
                rotateToPath: true,
                verticalAdjust: true
            });

            path.draw(graphics, 128);
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
                        this[trainSelector].pauseFollow();
                        break;
                    case (semState.GO): {
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
