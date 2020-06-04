let isMobile = navigator.userAgent.indexOf("Mobile");

if (isMobile == -1) {
    isMobile = navigator.userAgent.indexOf("Tablet");
}

const config = {
    type: Phaser.AUTO,
    width: 960, // window.innerWidth - 100,
    height: 640, // window.innerHeight - 100,
    parent: 'app-canvas',
    scene: [SceneMain],
};

if (isMobile != -1) {
    config.width = 480;
    config.height = 640;
}

const game = new Phaser.Game(config);
