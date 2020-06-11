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
        state: semState.WARN,
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
        state: semState.WARN,
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
        state: semState.WARN,
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
        state: semState.WARN,
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
        state: semState.WARN,
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
        state: semState.WARN,
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
