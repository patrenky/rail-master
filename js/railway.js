const railType = {
    HORIZONTAL: 'HORIZONTAL',
    VERTICAL: 'VERTICAL',
    LB: 'LB'
};

const semType = {
    NORMAL: 'NORMAL',
    BLINK: 'BLINK'
};

const semPosition = {
    TOP: 'TOP',
    RIGHT: 'RIGHT',
}

const rails = [
    {
        x: 2,
        y: 2,
        type: railType.HORIZONTAL,
        final: true
    },
    {
        x: 3,
        y: 2,
        type: railType.HORIZONTAL,
        sem: {
            pos: semPosition.TOP,
            type: semType.NORMAL,
        }
    },
    {
        x: 4,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 5,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 6,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 7,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 8,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 9,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 10,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 11,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 12,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 13,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 14,
        y: 2,
        type: railType.HORIZONTAL
    },
    {
        x: 15,
        y: 2,
        type: railType.LB
    },
    {
        x: 15,
        y: 3,
        type: railType.VERTICAL
    },
    {
        x: 15,
        y: 4,
        type: railType.VERTICAL
    },
    {
        x: 15,
        y: 5,
        type: railType.VERTICAL
    },
    {
        x: 15,
        y: 6,
        type: railType.VERTICAL
    },
    {
        x: 15,
        y: 7,
        type: railType.VERTICAL,
        sem: {
            pos: semPosition.RIGHT,
            type: semType.BLINK,
        }
    },
    {
        x: 15,
        y: 8,
        type: railType.VERTICAL
    },
    {
        x: 15,
        y: 9,
        type: railType.VERTICAL,
        final: true
    },
];
