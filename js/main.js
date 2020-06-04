const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 960, // window.innerWidth - 100,
    height: 640, // window.innerHeight - 100,
    parent: 'app-canvas',
    scene: [SceneMain],
    scale: {
        zoom: 2
    }
});
