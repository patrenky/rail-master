const hexColor = {
    WHITE: 0xFFFFFF,
    RED: 0xFF0000,
    BLUE: 0x2859B8,
    GREEN: 0x008000,
    YELLOW: 0xFFFF00,
    SILVER: 0xC0C0C0,
    PURPLE: 0x7B15B4,
    ORANGE: 0xFFA500,
};

const DEGREE_90 = 1.57;
const BASE_SPEED = 1;
const SLOW_SPEED = 0.5;
const BACKOFF_TIME = 50;
const TILE_WIDTH = 16;

const semType = {
    PRE: 'PRE', // predzvest
    IN: 'IN', // vjezdove
    OUT: 'OUT', // vyjezdove
    SORT: 'SORT' // serazovaci
}

const semState = {
    GO: 'GO',
    WARN: 'WARN',
    STOP: 'STOP',
    GO_WARN: 'GO_WARN',
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
        rotated: false,
        face: spriteDirection.LEFT,
        state: semState.WARN,
        type: semType.PRE,
        position: spritePosition.R
    },
    {
        x: 8,
        y: 16,
        reversed: false,
        rotated: false,
        previous: { x: 8, y: 20 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.IN,
        position: spritePosition.R,
        next: {
            object: 'switch',
            x: 11, y: 12,
            'LEFT': {
                object: 'switch',
                x: 14, y: 12,
                'LEFT': {
                    object: 'semaphore',
                    x: 23, y: 10
                },
                'RIGHT': {
                    object: 'semaphore',
                    x: 23, y: 12
                }
            },
            'RIGHT': {
                object: 'switch',
                x: 14, y: 14,
                'LEFT': {
                    object: 'semaphore',
                    x: 23, y: 14
                },
                'RIGHT': {
                    object: 'semaphore',
                    x: 23, y: 16
                }
            }
        }
    },
    {
        x: 15,
        y: 10,
        reversed: true,
        rotated: false,
        previous: { x: 30, y: 12 },
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 15,
        y: 12,
        reversed: true,
        rotated: false,
        straight: true,
        previous: { x: 30, y: 12 },
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 15,
        y: 14,
        reversed: true,
        rotated: false,
        previous: { x: 30, y: 12 },
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 15,
        y: 16,
        reversed: true,
        rotated: false,
        previous: { x: 30, y: 12 },
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 23,
        y: 10,
        reversed: false,
        rotated: false,
        previous: { x: 8, y: 16 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 23,
        y: 12,
        reversed: false,
        rotated: false,
        straight: true,
        previous: { x: 8, y: 16 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 23,
        y: 14,
        reversed: false,
        rotated: false,
        previous: { x: 8, y: 16 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 23,
        y: 16,
        reversed: false,
        rotated: false,
        previous: { x: 8, y: 16 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 30,
        y: 12,
        reversed: true,
        previous: { x: 34, y: 12 },
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.IN,
        position: spritePosition.T,
        next: {
            object: 'switch',
            x: 27, y: 12,
            'LEFT': {
                object: 'switch',
                x: 25, y: 14,
                'LEFT': {
                    object: 'semaphore',
                    x: 15, y: 16
                },
                'RIGHT': {
                    object: 'semaphore',
                    x: 15, y: 14
                }
            },
            'RIGHT': {
                object: 'switch',
                x: 25, y: 12,
                'LEFT': {
                    object: 'semaphore',
                    x: 15, y: 12
                },
                'RIGHT': {
                    object: 'semaphore',
                    x: 15, y: 10
                }
            }
        }
    },
    {
        x: 34,
        y: 12,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semState.WARN,
        type: semType.PRE,
        position: spritePosition.T
    },
    {
        x: 37,
        y: 9,
        reversed: false,
        face: spriteDirection.LEFT,
        state: semState.WARN,
        type: semType.PRE,
        position: spritePosition.R
    },
    {
        x: 37,
        y: 6,
        previous: { x: 37, y: 9 },
        reversed: false,
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.IN,
        position: spritePosition.R,
        next: {
            object: 'switch',
            x: 40, y: 4,
            'LEFT': {
                object: 'semaphore',
                x: 45, y: 4
            },
            'RIGHT': {
                object: 'semaphore',
                x: 45, y: 6
            }
        }
    },
    {
        x: 42,
        y: 9,
        reversed: true,
        rotated: false,
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 42,
        y: 11,
        reversed: true,
        rotated: false,
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 42,
        y: 15,
        reversed: true,
        rotated: false,
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 42,
        y: 17,
        reversed: true,
        rotated: false,
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 53,
        y: 2,
        reversed: true,
        face: spriteDirection.RIGHT,
        state: semState.WARN,
        type: semType.PRE,
        position: spritePosition.T
    },
    {
        x: 50,
        y: 2,
        reversed: true,
        rotated: false,
        previous: { x: 53, y: 2 },
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.IN,
        position: spritePosition.T,
        next: {
            object: 'switch',
            x: 46, y: 4,
            'LEFT': {
                object: 'semaphore',
                x: 41, y: 6
            },
            'RIGHT': {
                object: 'semaphore',
                x: 41, y: 4
            }
        }
    },
    {
        x: 50,
        y: 20,
        reversed: false,
        rotated: true,
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.SORT,
        position: spritePosition.L
    },
    {
        x: 56,
        y: 20,
        reversed: false,
        rotated: true,
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.SORT,
        position: spritePosition.L
    },
    {
        x: 52,
        y: 22,
        reversed: true,
        rotated: false,
        previous: { x: 54, y: 33 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.R
    },
    {
        x: 54,
        y: 22,
        reversed: true,
        rotated: false,
        straight: true,
        previous: { x: 54, y: 33 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.R
    },
    {
        x: 56,
        y: 22,
        reversed: true,
        rotated: false,
        previous: { x: 54, y: 33 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.R
    },
    {
        x: 50,
        y: 25,
        reversed: true,
        rotated: false,
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.SORT,
        position: spritePosition.R
    },
    {
        x: 54,
        y: 11,
        reversed: false,
        rotated: true,
        face: spriteDirection.LEFT,
        state: semState.WARN,
        type: semType.PRE,
        position: spritePosition.L
    },
    {
        x: 54,
        y: 15,
        reversed: false,
        rotated: true,
        previous: { x: 54, y: 11 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.IN,
        position: spritePosition.L,
        next: {
            object: 'switch',
            x: 54, y: 19,
            'LEFT': {
                object: 'switch',
                x: 54, y: 21,
                'LEFT': {
                    object: 'semaphore',
                    x: 54, y: 27
                },
                'RIGHT': {
                    object: 'switch',
                    x: 56, y: 21,
                    'RIGHT': {
                        object: 'semaphore',
                        x: 56, y: 27
                    }
                }
            },
            'RIGHT': {
                object: 'switch',
                x: 52, y: 21,
                'LEFT': {
                    object: 'switch',
                    x: 52, y: 24,
                    'LEFT': {
                        object: 'semaphore',
                        x: 52, y: 27
                    }
                }
            }
        }
    },
    {
        x: 52,
        y: 27,
        reversed: false,
        rotated: true,
        previous: { x: 54, y: 15 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.L
    },
    {
        x: 54,
        y: 27,
        reversed: false,
        rotated: true,
        straight: true,
        previous: { x: 54, y: 15 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.L
    },
    {
        x: 56,
        y: 27,
        reversed: false,
        rotated: true,
        previous: { x: 54, y: 15 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.L
    },
    {
        x: 54,
        y: 33,
        reversed: true,
        rotated: false,
        previous: { x: 54, y: 37 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.IN,
        position: spritePosition.R,
        next: {
            object: 'switch',
            x: 54, y: 30,
            'LEFT': {
                object: 'switch',
                x: 54, y: 28,
                'LEFT': {
                    object: 'switch',
                    x: 52, y: 24,
                    'LEFT': {
                        object: 'semaphore',
                        x: 52, y: 22
                    }
                },
                'RIGHT': {
                    object: 'semaphore',
                    x: 54, y: 22
                }
            },
            'RIGHT': {
                object: 'semaphore',
                x: 56, y: 22
            }
        }
    },
    {
        x: 54,
        y: 37,
        reversed: true,
        face: spriteDirection.LEFT,
        state: semState.WARN,
        type: semType.PRE,
        position: spritePosition.R
    },
    {
        x: 41,
        y: 4,
        reversed: true,
        rotated: false,
        straight: true,
        previous: { x: 50, y: 2 },
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 41,
        y: 6,
        reversed: true,
        rotated: false,
        previous: { x: 50, y: 2 },
        face: spriteDirection.RIGHT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.T
    },
    {
        x: 45,
        y: 4,
        reversed: false,
        rotated: false,
        straight: true,
        previous: { x: 37, y: 6 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.B
    },
    {
        x: 45,
        y: 6,
        reversed: false,
        rotated: false,
        previous: { x: 37, y: 6 },
        face: spriteDirection.LEFT,
        state: semState.STOP,
        type: semType.OUT,
        position: spritePosition.B
    }
];

const paths = [
    // lavy prijazd
    {
        route: [
            { x: 29, y: 24 },
            { x: 8, y: 24 },
            { x: 8, y: 12 },
            { x: 11, y: 12 },
        ]
    },
    // lave mesto
    {
        activated: true,
        route: [
            { x: 11, y: 12 },
            { x: 12, y: 12 },
        ]
    },
    {
        route: [
            { x: 12, y: 12 },
            { x: 14, y: 12 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 11, y: 12 },
            { x: 11, y: 13 },
        ]
    },
    {
        route: [
            { x: 11, y: 13 },
            { x: 11, y: 14 },
            { x: 14, y: 14 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 14, y: 12 },
            { x: 14, y: 11 },
        ]
    },
    {
        route: [
            { x: 14, y: 11 },
            { x: 14, y: 10 },
            { x: 25, y: 10 },
            { x: 25, y: 11 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 25, y: 11 },
            { x: 25, y: 12 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 14, y: 12 },
            { x: 15, y: 12 },
        ]
    },
    {
        route: [
            { x: 15, y: 12 },
            { x: 24, y: 12 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 24, y: 12 },
            { x: 25, y: 12 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 14, y: 14 },
            { x: 15, y: 14 },
        ]
    },
    {
        route: [
            { x: 15, y: 14 },
            { x: 24, y: 14 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 24, y: 14 },
            { x: 25, y: 14 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 14, y: 14 },
            { x: 14, y: 15 },
        ]
    },
    {
        route: [
            { x: 14, y: 15 },
            { x: 14, y: 16 },
            { x: 25, y: 16 },
            { x: 25, y: 15 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 25, y: 15 },
            { x: 25, y: 14 },
        ]
    },
    {
        route: [
            { x: 25, y: 12 },
            { x: 26, y: 12 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 26, y: 12 },
            { x: 27, y: 12 },
        ]
    },
    {
        route: [
            { x: 25, y: 14 },
            { x: 27, y: 14 },
            { x: 27, y: 13 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 27, y: 13 },
            { x: 27, y: 12 },
        ]
    },
    // lave mesto - vyhybka k okruhu a nahor
    {
        route: [
            { x: 27, y: 12 },
            { x: 37, y: 12 },
        ]
    },
    // k okruhu
    {
        activated: false,
        route: [
            { x: 37, y: 12 },
            { x: 38, y: 12 },
        ]
    },
    {
        route: [
            { x: 38, y: 12 },
            { x: 39, y: 12 },
            { x: 39, y: 13 },
            { x: 41, y: 13 },
        ]
    },
    {
        route: [
            { x: 41, y: 13 },
            { x: 41, y: 11 },
        ]
    },
    {
        route: [
            { x: 41, y: 13 },
            { x: 41, y: 15 },
        ]
    },
    // maly okruh
    {
        route: [
            { x: 41, y: 15 },
            { x: 46, y: 15 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 41, y: 11 },
            { x: 42, y: 11 },
        ]
    },
    {
        route: [
            { x: 42, y: 11 },
            { x: 46, y: 11 },
            { x: 46, y: 15 },
        ]
    },
    // velky okruh
    {
        route: [
            { x: 41, y: 15 },
            { x: 41, y: 17 },
            { x: 48, y: 17 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 41, y: 11 },
            { x: 41, y: 10 },
        ]
    },
    {
        route: [
            { x: 41, y: 10 },
            { x: 41, y: 9 },
            { x: 48, y: 9 },
            { x: 48, y: 17 },
        ]
    },
    // k pravemu mestu
    {
        activated: true,
        route: [
            { x: 37, y: 12 },
            { x: 37, y: 11 },
        ]
    },
    {
        route: [
            { x: 37, y: 11 },
            { x: 37, y: 4 },
            { x: 40, y: 4 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 40, y: 4 },
            { x: 41, y: 4 },
        ]
    },
    {
        route: [
            { x: 41, y: 4 },
            { x: 45, y: 4 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 45, y: 4 },
            { x: 46, y: 4 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 40, y: 4 },
            { x: 40, y: 5 },
        ]
    },
    {
        route: [
            { x: 40, y: 5 },
            { x: 40, y: 6 },
            { x: 46, y: 6 },
            { x: 46, y: 5 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 46, y: 5 },
            { x: 46, y: 4 },
        ]
    },
    {
        route: [
            { x: 46, y: 4 },
            { x: 49, y: 4 },
            { x: 49, y: 2 },
            { x: 55, y: 2 },
        ]
    },
    {
        route: [
            { x: 55, y: 2 },
            { x: 55, y: 7 },
            { x: 54, y: 7 },
            { x: 54, y: 19 },
        ]
    },
    // prave mesto
    {
        activated: false,
        route: [
            { x: 54, y: 19 },
            { x: 53, y: 19 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 54, y: 19 },
            { x: 54, y: 20 },
        ]
    },
    {
        route: [
            { x: 54, y: 20 },
            { x: 54, y: 21 },
        ]
    },
    {
        route: [
            { x: 53, y: 19 },
            { x: 52, y: 19 },
            { x: 52, y: 20 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 52, y: 20 },
            { x: 52, y: 21 },
        ]
    },
    {
        route: [
            { x: 50, y: 18 },
            { x: 50, y: 21 },
            { x: 51, y: 21 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 51, y: 21 },
            { x: 52, y: 21 },
        ]
    },
    {
        route: [
            { x: 52, y: 21 },
            { x: 52, y: 22 },
        ]
    },
    {
        route: [
            { x: 52, y: 22 },
            { x: 52, y: 24 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 52, y: 24 },
            { x: 51, y: 24 },
        ]
    },
    {
        route: [
            { x: 51, y: 24 },
            { x: 50, y: 24 },
            { x: 50, y: 36 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 52, y: 24 },
            { x: 52, y: 25 },
        ]
    },
    {
        route: [
            { x: 52, y: 25 },
            { x: 52, y: 28 },
            { x: 53, y: 28 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 53, y: 28 },
            { x: 54, y: 28 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 54, y: 21 },
            { x: 54, y: 22 },
        ]
    },
    {
        route: [
            { x: 54, y: 22 },
            { x: 54, y: 27 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 54, y: 27 },
            { x: 54, y: 28 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 54, y: 21 },
            { x: 55, y: 21 },
        ]
    },
    {
        route: [
            { x: 55, y: 21 },
            { x: 56, y: 21 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 56, y: 21 },
            { x: 56, y: 20 },
        ]
    },
    {
        route: [
            { x: 56, y: 20 },
            { x: 56, y: 18 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 56, y: 21 },
            { x: 56, y: 22 },
        ]
    },
    {
        route: [
            { x: 56, y: 22 },
            { x: 56, y: 30 },
        ]
    },
    {
        route: [
            { x: 56, y: 30 },
            { x: 55, y: 30 },
        ]
    },
    {
        activated: false,
        route: [
            { x: 55, y: 30 },
            { x: 54, y: 30 },
        ]
    },
    {
        route: [
            { x: 54, y: 28 },
            { x: 54, y: 29 },
        ]
    },
    {
        activated: true,
        route: [
            { x: 54, y: 29 },
            { x: 54, y: 30 },
        ]
    },
    {
        route: [
            { x: 54, y: 30 },
            { x: 54, y: 39 },
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
        state: spriteDirection.RIGHT,
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
        position: spritePosition.TR
    },
    {
        x: 25,
        y: 14,
        reversed: true,
        state: spriteDirection.RIGHT,
        position: spritePosition.BR
    },
    {
        x: 27,
        y: 12,
        reversed: true,
        state: spriteDirection.RIGHT,
        position: spritePosition.BR
    },
    {
        x: 37,
        y: 12,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.B
    },
    {
        x: 41,
        y: 11,
        reversed: false,
        state: spriteDirection.RIGHT,
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
        x: 46,
        y: 4,
        reversed: true,
        state: spriteDirection.RIGHT,
        position: spritePosition.T
    },
    {
        x: 54,
        y: 19,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.TL
    },
    {
        x: 52,
        y: 21,
        reversed: true,
        state: spriteDirection.RIGHT,
        position: spritePosition.BL
    },
    {
        x: 52,
        y: 24,
        reversed: false,
        state: spriteDirection.RIGHT,
        position: spritePosition.R
    },
    {
        x: 54,
        y: 21,
        reversed: false,
        state: spriteDirection.LEFT,
        position: spritePosition.L
    },
    {
        x: 56,
        y: 21,
        reversed: false,
        state: spriteDirection.RIGHT,
        position: spritePosition.R
    },
    {
        x: 54,
        y: 28,
        reversed: true,
        state: spriteDirection.RIGHT,
        position: spritePosition.BL
    },
    {
        x: 54,
        y: 30,
        reversed: true,
        state: spriteDirection.LEFT,
        position: spritePosition.BR
    },
];

const destinationRails = [
    { x: 29, y: 24 },
    { x: 50, y: 18 },
    { x: 56, y: 18 },
    { x: 50, y: 36 },
    { x: 54, y: 39 },
];

const switchReverseRails = [
    { x: 46, y: 13 },
    { x: 48, y: 13 },
];

const trains = [
    {
        trainSelector: 'ruske_drahy',
        trainColor: hexColor.ORANGE,
        startPosition: { x: 29, y: 24 },
        reversed: false,
    },
    {
        trainSelector: 'svicarske_drahy',
        trainColor: hexColor.BLUE,
        startPosition: { x: 54, y: 39 },
        reversed: true,
    },
    {
        trainSelector: 'slovenska_strela',
        trainColor: hexColor.RED,
        startPosition: { x: 50, y: 18 },
        reversed: false,
    },
];

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

const getSemSprite = (semaphoreState, semaphoreType) => {
    switch (semaphoreState) {
        case (semState.GO):
            return semaphoreType + '_semGreen';
        case (semState.WARN):
            return semaphoreType + '_semYellow';
        case (semState.GO_WARN):
            return semaphoreType + '_semGreenWarn';
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

    return array[0];
}


class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        // background tilemap
        this.load.image('tileset', 'assets/tileset.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/tilemap.json');

        // Semaphores
        // IN
        this.load.image('IN_semRed', 'assets/semaphores/sem_in_red.png');
        this.load.image('IN_semYellow', 'assets/semaphores/sem_in_yellow.png');
        this.load.image('IN_semGreen', 'assets/semaphores/sem_in_green.png');
        // when the following OUT has green, but train has to go through a switch on a side rail
        this.load.image('IN_semGreenWarn', 'assets/semaphores/sem_in_switch.png');

        // OUT
        this.load.image('OUT_semRed', 'assets/semaphores/sem_out_red.png');
        this.load.image('OUT_semGreen', 'assets/semaphores/sem_out_green.png');

        // PRE 
        this.load.image('PRE_semYellow', 'assets/semaphores/sem_warn_yellow.png');
        this.load.image('PRE_semGreen', 'assets/semaphores/sem_warn_green.png');

        // SORT - used the same signalisation for algorithm switch (red=blue & green=white)
        this.load.image('SORT_semRed', 'assets/semaphores/sem_move_blue.png');
        this.load.image('SORT_semGreen', 'assets/semaphores/sem_move_white.png');

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

        // render backgorund
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('tileset', 'tileset');
        map.createStaticLayer('Rails', tileset);
        // map.createStaticLayer('Semaphores', tileset);
        // map.createStaticLayer('Switches', tileset);

        this.cameras.main.setBackgroundColor(hexColor.GREEN);

        // show grid
        this.grid = new AlignGrid({
            scene: this,
            cols: 60,
            rows: 40
        });
        this.grid.showNumbers(1);

        // add static images for stations
        const st1 = this.add.sprite(gridToPx(20), gridToPx(7), 'st1');
        st1.displayWidth = TILE_WIDTH;
        st1.scaleY = st1.scaleX = 4 * st1.scaleX;

        const st2 = this.add.sprite(gridToPx(45), gridToPx(25), 'st2');
        st2.displayWidth = 2 * TILE_WIDTH;
        st2.scaleY = st2.scaleX = 3.5 * st2.scaleX;
        st2.rotation = -DEGREE_90;

        // game options - render switched paths
        this.optionSwitches = this.add.sprite(gridToPx(2), gridToPx(2), 'checkbox_on').setInteractive({ useHandCursor: true });
        this.optionSwitches.optionEnabled = true;
        this.add.text(50, 35, 'Zobrazit smer vyhybiek', { fontFamily: 'Arial', fontSize: '12px' });

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

        // render semaphores
        semaphores.forEach((sem, idx) => {
            const semSelector = sem.semSelector = `sem${idx}`;
            const semPosition = getSpriteCoords(sem.x, sem.y, sem.position);

            this[semSelector] = this.add.sprite(gridToPx(semPosition.x), gridToPx(semPosition.y), getSemSprite(sem.state, sem.type));
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
                    // switch semaphore state
                    this.switchSemaphoreState(sem, [semState.GO, semState.STOP]);
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

                this.rerenderSemaphoresOnSwitch(sw);

                // re-render paths
                if (this.optionSwitches.optionEnabled) {
                    this.renderSwitchedPaths();
                }
            });
        });

        if (this.optionSwitches.optionEnabled) {
            this.renderSwitchedPaths();
        }
    }

    switchAffectSemaphore(next, updatedSwitch) {
        if (next.object === 'switch') {
            const currentSwitch = switches.find(sw => {
                if (sw.x === next.x && sw.y === next.y) {
                    return true;
                }
            });

            if (currentSwitch.x === updatedSwitch.x && currentSwitch.y === updatedSwitch.y) {
                return true;
            }

            if (currentSwitch.state && next[currentSwitch.state]) {
                return this.switchAffectSemaphore(next[currentSwitch.state], updatedSwitch);
            }
        }

        return false;
    }

    rerenderSemaphoresOnSwitch(updatedSwitch) {
        // find which semaphores are affected with the switch
        semaphores.forEach(sem => {
            if (sem.type === semType.IN) {
                const affectedSemaphore = this.switchAffectSemaphore(sem.next, updatedSwitch);

                if (affectedSemaphore) {
                    const nextOut = this.findNextOutSemaphore(sem.next);

                    if (nextOut) {
                        this.switchSemaphoreState(nextOut, nextOut.state);
                    }
                }
            }
        });
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

    switchSemaphoreState(semaphore, nextState) {
        semaphore.state = Array.isArray(nextState) ? getNextState(nextState, semaphore.state) : nextState;
        this[semaphore.semSelector].setTexture(getSemSprite(semaphore.state, semaphore.type));

        // if semaphore has previous semaphore, call switch recursively
        if (semaphore.previous) {
            if (semaphore.previous.x && semaphore.previous.y) {
                // find child semaphore
                const prevSem = semaphores.find(pSem => {
                    if (pSem.x === semaphore.previous.x && pSem.y === semaphore.previous.y) {
                        return true;
                    }
                });

                if (!prevSem) {
                    return;
                }

                // if child semaphore is IN
                if (prevSem.type === semType.IN) {
                    const nextOut = this.findNextOutSemaphore(prevSem.next);

                    if (!nextOut) {
                        return;
                    } else {
                        switch (nextOut.state) {
                            case (semState.STOP):
                                this.switchSemaphoreState(prevSem, semState.WARN);
                                break;
                            case (semState.GO):
                                if (nextOut.straight) {
                                    this.switchSemaphoreState(prevSem, semState.GO);
                                } else {
                                    this.switchSemaphoreState(prevSem, semState.GO_WARN);
                                }
                                break;
                            default:
                                return;
                        }
                    }
                }

                // decide others child semaphores state
                else {
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
                        case (semState.GO_WARN):
                            this.switchSemaphoreState(prevSem, semState.GO);
                            break;
                        default:
                            return;
                    }
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
                    case (semState.GO):
                        train.moveSpeed = BASE_SPEED;
                        break;
                    case (semState.WARN):
                        train.moveSpeed = SLOW_SPEED;
                        break;
                    case (semState.GO_WARN):
                        train.moveSpeed = SLOW_SPEED;
                        break;
                    case (semState.STOP):
                        if (train.stopDelay < 1) {
                            train.moveSpeed = 0;
                        }
                        break;
                    default:
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
                        const rotateImg = this.add.sprite(this[trainSelector].x, this[trainSelector].y, 'rotate').setInteractive({ useHandCursor: true });

                        rotateImg.on('pointerdown', () => {
                            train.reversed = !train.reversed;
                            trainOnDestination.shown = false;
                            rotateImg.destroy();
                        });
                    }

                    // else train collide with wrong switched rails (or destination rail, but still not rotated)
                    else {
                        // console.log("TODO wrong switched rails");
                    }
                }
            }
        });
    }
}
