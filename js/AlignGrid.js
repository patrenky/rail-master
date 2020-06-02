class AlignGrid {
    constructor(config) {
        if (!config.scene) {
            console.log("missing scene!");
            return;
        }

        if (!config.rows) config.rows = 3;
        if (!config.cols) config.cols = 3;
        if (!config.width) config.width = game.config.width;
        if (!config.height) config.height = game.config.height;

        this.gridColor = "0x000";

        this.h = config.height;
        this.w = config.width;
        this.rows = config.rows;
        this.cols = config.cols;

        // cw cell width is the scene width divided by the number of columns
        this.cw = this.w / this.cols;

        // ch cell height is the scene height divided the number of rows
        this.ch = this.h / this.rows;

        this.scene = config.scene;

    }

    // create a visual representation of the grid
    show(a = 1) {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(1, this.gridColor, a);

        // this.graphics.beginPath();
        for (var i = 0; i < this.w; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.h);
        }
        for (var i = 0; i < this.h; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.w, i);
        }
        this.graphics.strokePath();
    }

    showNumbers(a = 1) {
        this.show(a);
        var n = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                if (i == 0 || j == 0) {
                    var numText = this.scene.add.text(0, 0, n, {
                        color: this.gridColor
                    });
                    numText.setOrigin(0.5, 0.5);
                    this.placeAt(j, i, numText);
                    n++;
                    if (n >= this.rows) {
                        n = 1;
                    }
                }
            }
        }
    }

    // place an object in relation to the grid x, y position (centered)
    placeAt(xx, yy, obj) {
        var xc = this.cw * xx + this.cw / 2;
        var yc = this.ch * yy + this.ch / 2;
        obj.x = xc;
        obj.y = yc;
    }

    // from the canvas x, y position count cell position
    getCellCoord(x, y) {
        var cx = Math.floor(x / this.cw);
        var cy = Math.floor(y / this.cw);
        var obj = {};
        obj.x = cx;
        obj.y = cy;
        return obj;
    }
}